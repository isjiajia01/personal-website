"use client";

import { useEffect, useRef } from "react";

// Flow field: particles follow the angle of a slowly changing noise field and
// leave fading trails. The pointer pulls nearby particles toward it.

const W = 600;
const H = 400;
const COUNT = 600;
const BG = "20, 17, 15";

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function noise(x: number, y: number) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

export function FlowDemo({ paused = false }: { paused?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -999, y: -999 };
    const px = Float32Array.from({ length: COUNT }, () => Math.random() * W);
    const py = Float32Array.from({ length: COUNT }, () => Math.random() * H);
    let time = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * W;
      pointer.y = ((e.clientY - r.top) / r.height) * H;
    };
    const onLeave = () => { pointer.x = pointer.y = -999; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    ctx.fillStyle = `rgb(${BG})`;
    ctx.fillRect(0, 0, W, H);

    const step = () => {
      ctx.fillStyle = `rgba(${BG}, 0.05)`;
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(240, 178, 122, 0.8)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < COUNT; i++) {
        const a = noise(px[i] * 0.004 + time, py[i] * 0.004) * Math.PI * 4;
        let vx = Math.cos(a) * 1.4;
        let vy = Math.sin(a) * 1.4;
        const dx = pointer.x - px[i], dy = pointer.y - py[i];
        const d = Math.hypot(dx, dy);
        if (d < 120) { vx += (dx / d) * 1.6; vy += (dy / d) * 1.6; }
        ctx.moveTo(px[i], py[i]);
        px[i] += vx;
        py[i] += vy;
        ctx.lineTo(px[i], py[i]);
        if (px[i] < 0 || px[i] > W || py[i] < 0 || py[i] > H) {
          px[i] = Math.random() * W;
          py[i] = Math.random() * H;
        }
      }
      ctx.stroke();
      time += 0.0015;
    };

    for (let i = 0; i < (reduce ? 400 : 150); i++) step(); // pre-run so the first frame already has trails
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!pausedRef.current) step();
    };
    if (!reduce) raf = requestAnimationFrame(loop);

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
      aria-label="Glowing lines flowing along a noise field; moving the pointer pulls them toward it"
      className="block h-auto w-full rounded-md"
    />
  );
}
