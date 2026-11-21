"use client";

import { useEffect, useRef } from "react";

// Halftone: a grid of dots whose radius follows a moving brightness field.
// The pointer swells the dots around it.

const W = 600;
const H = 400;
const STEP = 14;
const PAPER = "#f3ede3";
const INK = "#9f1d2c";

export function HalftoneDemo({ paused = false }: { paused?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -999, y: -999 };
    let raf = 0;
    let drawn = false;

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * W;
      pointer.y = ((e.clientY - r.top) / r.height) * H;
    };
    const onLeave = () => { pointer.x = pointer.y = -999; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const draw = (t: number) => {
      if (!reduce) raf = requestAnimationFrame(draw);
      if (pausedRef.current && drawn) return;
      drawn = true;
      const time = reduce ? 0 : t * 0.0006;
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = INK;
      for (let gy = 0; gy < H / STEP; gy++) {
        for (let gx = 0; gx < W / STEP; gx++) {
          const cx = gx * STEP + STEP / 2;
          const cy = gy * STEP + STEP / 2;
          let v = 0.5 + 0.5 * Math.sin(cx * 0.018 + time) * Math.cos(cy * 0.022 - time * 0.8);
          v += 0.25 * Math.sin((cx + cy) * 0.01 + time * 1.3);
          v += Math.max(0, 1 - Math.hypot(cx - pointer.x, cy - pointer.y) / 90) * 0.8;
          const r = Math.min(1, Math.max(0, v)) * STEP * 0.62;
          if (r < 0.4) continue;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      width={W}
      height={H}
      role="img"
      aria-label="A grid of red dots that grow and shrink in waves; moving the pointer swells the dots near it"
      className="block h-auto w-full rounded-md"
    />
  );
}
