"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, summary, [role='button'], input, textarea, select, label";

// Dot follows the pointer; ring trails it (lerp in rAF). Fine pointers only,
// skipped under prefers-reduced-motion. Native cursor is hidden via html.has-custom-cursor.
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let raf = 0;
    let active = false;
    let tx = 0, ty = 0, rx = 0, ry = 0;
    let seen = false;

    const frame = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      if (!seen) {
        seen = true;
        rx = tx;
        ry = ty;
        document.documentElement.classList.add("cursor-ready");
      }
      const target = e.target as Element | null;
      document.documentElement.classList.toggle("cursor-hover", !!target?.closest?.(INTERACTIVE));
    };
    const onLeave = () => document.documentElement.classList.remove("cursor-ready");
    const onEnter = () => seen && document.documentElement.classList.add("cursor-ready");
    const onDown = () => document.documentElement.classList.add("cursor-down");
    const onUp = () => document.documentElement.classList.remove("cursor-down");

    const enable = () => {
      if (active) return;
      active = true;
      document.documentElement.classList.add("has-custom-cursor");
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      document.documentElement.addEventListener("pointerleave", onLeave);
      document.documentElement.addEventListener("pointerenter", onEnter);
      raf = requestAnimationFrame(frame);
    };
    const disable = () => {
      if (!active) return;
      active = false;
      cancelAnimationFrame(raf);
      const root = document.documentElement;
      root.classList.remove("has-custom-cursor", "cursor-ready", "cursor-hover", "cursor-down");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerenter", onEnter);
      seen = false;
    };
    const sync = () => (fine.matches && !reduced.matches ? enable() : disable());

    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      disable();
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-layer" aria-hidden="true">
        <div className="cursor-ring" />
      </div>
      <div ref={dotRef} className="cursor-layer" aria-hidden="true">
        <div className="cursor-dot" />
      </div>
    </>
  );
}
