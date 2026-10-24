"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Departure mask: a paper-coloured panel sweeps over the page, we navigate once it covers,
// then remove it ~60ms after the new pathname commits so the existing CSS entrance plays.
const COVER_MS = 360; // keep in sync with --motion-mask in globals.css
const SETTLE_MS = 60;
const FAILSAFE_MS = 3000; // after navigate(): never leave the mask up longer than this

type Direction = "next" | "prev";
type Phase = "preparing" | "covering";

const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
const LOCALE_RE = /^\/(en|zh)(?=\/|$)/;

// Section order Home < Works < Resume < About decides the sweep direction.
function rank(path: string): number {
  const rest = norm(path).replace(LOCALE_RE, "");
  const seg = rest.split("/")[1] ?? "";
  if (seg === "") return 0;
  if (seg === "works" || seg === "projects") return 1;
  if (seg === "resume") return 2;
  if (seg === "about") return 3;
  return -1;
}

function directionFor(from: string, to: string): Direction {
  const a = rank(from);
  const b = rank(to);
  return a >= 0 && b >= 0 && b < a ? "prev" : "next";
}

interface Run {
  href: string;
  startPath: string;
  navigated: boolean;
  navTimer?: number;
  settleTimer?: number;
  failTimer?: number;
  raf?: number;
}

export function RouteTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const [mask, setMask] = useState<{ dir: Direction; phase: Phase } | null>(null);
  const run = useRef<Run | null>(null);
  const routerRef = useRef(router);
  routerRef.current = router;

  const clearTimers = (r: Run) => {
    window.clearTimeout(r.navTimer);
    window.clearTimeout(r.settleTimer);
    window.clearTimeout(r.failTimer);
    if (r.raf) window.cancelAnimationFrame(r.raf);
  };

  const finish = useCallback((focusMain: boolean) => {
    const r = run.current;
    if (!r) return;
    clearTimers(r);
    run.current = null;
    setMask(null);
    if (focusMain) document.getElementById("main")?.focus({ preventScroll: true });
  }, []);

  const navigate = useCallback((r: Run) => {
    if (r.navigated) return;
    r.navigated = true;
    window.clearTimeout(r.navTimer);
    r.failTimer = window.setTimeout(() => finish(true), FAILSAFE_MS);
    routerRef.current.push(r.href);
  }, [finish]);

  // Pathname committed: schedule uncover. Never touches the navigate timer.
  useEffect(() => {
    const r = run.current;
    if (!r || !r.navigated || norm(pathname) === norm(r.startPath)) return;
    if (r.settleTimer) return;
    r.settleTimer = window.setTimeout(() => finish(true), SETTLE_MS);
  }, [pathname, finish]);

  // Reduced motion toggled mid-flight: navigate now, drop the mask, no delay.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      const r = run.current;
      if (!mq.matches || !r) return;
      navigate(r);
      finish(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [navigate, finish]);

  // Unmount (e.g. cross-root navigation): drop timers without touching state.
  useEffect(
    () => () => {
      const r = run.current;
      if (r) clearTimers(r);
      run.current = null;
    },
    [],
  );

  const onClickCapture = (e: React.MouseEvent<HTMLElement>) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    )
      return;
    const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!a || !e.currentTarget.contains(a)) return;
    if (a.hasAttribute("download") || (a.target && a.target !== "_self")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let url: URL;
    try {
      url = new URL(a.href, window.location.href);
    } catch {
      return;
    }
    if (url.origin !== window.location.origin) return;
    // Only portfolio pages: product/legal routes keep native navigation.
    if (!LOCALE_RE.test(norm(url.pathname))) return;
    // Same page or hash-only jump: native.
    if (norm(url.pathname) === norm(window.location.pathname)) return;

    e.preventDefault();
    if (run.current) return; // pending guard: swallow rapid repeat clicks

    const r: Run = {
      href: url.pathname + url.search + url.hash,
      startPath: window.location.pathname,
      navigated: false,
    };
    run.current = r;
    setMask({ dir: directionFor(r.startPath, url.pathname), phase: "preparing" });
    // Two frames so the off-screen start state is painted before transitioning to cover.
    r.raf = window.requestAnimationFrame(() => {
      r.raf = window.requestAnimationFrame(() => {
        r.raf = 0;
        if (run.current === r) setMask((m) => (m ? { ...m, phase: "covering" } : m));
      });
    });
    r.navTimer = window.setTimeout(() => navigate(r), COVER_MS);
  };

  return (
    <>
      <div className={className} onClickCapture={onClickCapture}>
        {children}
      </div>
      {mask && (
        <div
          aria-hidden="true"
          className="route-mask"
          data-dir={mask.dir}
          data-phase={mask.phase}
        />
      )}
    </>
  );
}
