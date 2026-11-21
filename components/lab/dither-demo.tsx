"use client";

import { useEffect, useRef } from "react";

// Ordered (Bayer 8x8) dithering of procedural clouds into two colours.
// The pointer carves a hole: inside it the threshold is pushed up, so the
// dots thin out and the sky shows through.

const W = 296; // low-res buffer; CSS scales it up with pixelated rendering
const H = 200;
const SKY = [43, 78, 224];
const CLOUD = [244, 247, 255];

function bayer8() {
  let m = [[0, 2], [3, 1]];
  for (let n = 2; n < 8; n *= 2) {
    const next: number[][] = Array.from({ length: n * 2 }, () => new Array(n * 2).fill(0));
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++) {
        const v = m[y][x] * 4;
        next[y][x] = v;
        next[y][x + n] = v + 2;
        next[y + n][x] = v + 3;
        next[y + n][x + n] = v + 1;
      }
    m = next;
  }
  return m.flat().map((v) => (v + 0.5) / 64);
}

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

function fbm(x: number, y: number) {
  let sum = 0, amp = 0.5;
  for (let i = 0; i < 5; i++) {
    sum += amp * noise(x, y);
    x *= 2; y *= 2; amp *= 0.5;
  }
  return sum;
}

export function DitherDemo({ paused = false }: { paused?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const matrix = bayer8();
    const img = ctx.createImageData(W, H);
    const pointer = { x: -1, y: -1 };
    let raf = 0;
    let drawn = false;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * W;
      pointer.y = ((e.clientY - r.top) / r.height) * H;
    };
    const onLeave = () => { pointer.x = pointer.y = -1; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const draw = (t: number) => {
      if (!reduce) raf = requestAnimationFrame(draw);
      frame++;
      if (pausedRef.current && drawn) return;
      if (drawn && frame % 2) return; // ~30fps is plenty for slow drift
      drawn = true;
      const drift = reduce ? 0 : t * 0.00004;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          let d = fbm(x * 0.011 + drift * 6, y * 0.016 + drift * 2);
          d = Math.min(1, Math.max(0, (d - 0.38) * 2.2));
          const dist = Math.hypot(x - pointer.x, y - pointer.y);
          if (dist < 44) d -= (1 - dist / 44) * 1.1; // pointer carves the cloud
          const on = d > matrix[(y & 7) * 8 + (x & 7)];
          const c = on ? CLOUD : SKY;
          const i = (y * W + x) * 4;
          img.data[i] = c[0]; img.data[i + 1] = c[1]; img.data[i + 2] = c[2]; img.data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
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
      aria-label="Clouds rendered as a two-colour dither pattern; moving the pointer thins them out"
      className="block h-auto w-full rounded-md"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
