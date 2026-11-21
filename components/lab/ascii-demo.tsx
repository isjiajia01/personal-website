"use client";

import { useEffect, useRef } from "react";

// ASCII waves: a sum of sine waves is quantised into a ramp of characters,
// from empty to dense. The pointer sends out ripples.

const W = 600;
const H = 400;
const CW = 8;
const CH = 14;
const RAMP = " .:-=+*#%@";
const PAPER = "#f3ede3";
const INK = "#2b2622";

export function AsciiDemo({ paused = false }: { paused?: boolean }) {
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
      const time = reduce ? 0 : t * 0.001;
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = INK;
      ctx.font = "12px ui-monospace, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let row = 0; row < H / CH; row++) {
        for (let col = 0; col < W / CW; col++) {
          const x = col * CW + CW / 2;
          const y = row * CH + CH / 2;
          let v = Math.sin(x * 0.03 + time) + Math.sin(y * 0.05 - time * 1.2) + Math.sin((x + y) * 0.02 + time * 0.7);
          const d = Math.hypot(x - pointer.x, y - pointer.y);
          v += Math.sin(d * 0.15 - time * 6) * Math.exp(-d / 90) * 2;
          const n = Math.min(1, Math.max(0, (v + 3) / 6));
          const ch = RAMP[Math.floor(n * (RAMP.length - 1))];
          if (ch !== " ") ctx.fillText(ch, x, y);
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
      aria-label="Rolling waves drawn with text characters; moving the pointer makes ripples"
      className="block h-auto w-full rounded-md"
    />
  );
}
