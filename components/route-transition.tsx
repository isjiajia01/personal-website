"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Departure fade: the page's words (main + footer) fade out on the paper while the nav, the
// sheet and the contour map stay put; we navigate once they are gone, then clear the flag
// ~60ms after the new pathname commits so the existing CSS entrance (rise + stagger) plays.
const FADE_MS = 200; // keep in sync with --motion-leave in globals.css
const SETTLE_MS = 60;
const FAILSAFE_MS = 3000; // after navigate(): never leave the page faded longer than this

const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
const LOCALE_RE = /^\/(en|zh)(?=\/|$)/;

interface Run {
  href: string;
  startPath: string;
  navigated: boolean;
  navTimer?: number;
  settleTimer?: number;
  failTimer?: number;
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
  const [leaving, setLeaving] = useState(false);
  const run = useRef<Run | null>(null);
  const routerRef = useRef(router);
  routerRef.current = router;

  const clearTimers = (r: Run) => {
    window.clearTimeout(r.navTimer);
    window.clearTimeout(r.settleTimer);
    window.clearTimeout(r.failTimer);
  };

  const finish = useCallback((focusMain: boolean) => {
    const r = run.current;
    if (!r) return;
    clearTimers(r);
    run.current = null;
    setLeaving(false);
    if (focusMain) document.getElementById("main")?.focus({ preventScroll: true });
  }, []);

  const navigate = useCallback((r: Run) => {
    if (r.navigated) return;
    r.navigated = true;
    window.clearTimeout(r.navTimer);
    r.failTimer = window.setTimeout(() => finish(true), FAILSAFE_MS);
    routerRef.current.push(r.href);
  }, [finish]);

  // Pathname committed: schedule the fade-in. Never touches the navigate timer.
  useEffect(() => {
    const r = run.current;
    if (!r || !r.navigated || norm(pathname) === norm(r.startPath)) return;
    if (r.settleTimer) return;
    r.settleTimer = window.setTimeout(() => finish(true), SETTLE_MS);
  }, [pathname, finish]);

  // Reduced motion toggled mid-flight: navigate now, drop the fade, no delay.
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
    if (!LOCALE_RE.test(norm(url.pathname)) && !/^\/notes(\/|$)/.test(norm(url.pathname))) return;
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
    setLeaving(true);
    r.navTimer = window.setTimeout(() => navigate(r), FADE_MS);
  };

  return (
    <div className={className} data-leaving={leaving ? "" : undefined} onClickCapture={onClickCapture}>
      {children}
    </div>
  );
}
