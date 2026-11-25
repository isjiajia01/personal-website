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

// Value noise on a fixed 256×256 lattice of seeded random numbers. A table lookup is far
// cheaper than a sin()-based hash, which matters at 59k pixels × 5 octaves per frame.
const LATTICE = (() => {
  const t = new Float32Array(256 * 256);
  let s = 0x9e3779b9;
  for (let i = 0; i < t.length; i++) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    t[i] = s / 4294967296;
  }
  return t;
})();

function noise(x: number, y: number) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const x0 = xi & 255, x1 = (xi + 1) & 255, y0 = (yi & 255) << 8, y1 = ((yi + 1) & 255) << 8;
  const a = LATTICE[y0 + x0], b = LATTICE[y0 + x1], c = LATTICE[y1 + x0], d = LATTICE[y1 + x1];
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

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * W;
      pointer.y = ((e.clientY - r.top) / r.height) * H;
    };
    const onLeave = () => { pointer.x = pointer.y = -1; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    // One 32-bit write per pixel (ImageData is RGBA bytes; on little-endian that reads as ABGR).
    const pixels = new Uint32Array(img.data.buffer);
    const pack = ([r, g, b]: number[]) => ((255 << 24) | (b << 16) | (g << 8) | r) >>> 0;
    const skyPx = pack(SKY);
    const cloudPx = pack(CLOUD);
    const R = 44;
    let last = -Infinity;

    const draw = (t: number) => {
      if (!reduce) raf = requestAnimationFrame(draw);
      if (pausedRef.current && drawn) return;
      if (drawn && t - last < 1000 / 24) return; // the drift is slow: ~24fps is plenty, on 60 and 120Hz screens
      last = t;
      drawn = true;
      const drift = reduce ? 0 : t * 0.00004;
      const ox = drift * 6, oy = drift * 2;
      const px = pointer.x, py = pointer.y;
      for (let y = 0; y < H; y++) {
        const fy = y * 0.016 + oy;
        const dy = y - py;
        const row = y * W;
        const m = (y & 7) * 8;
        for (let x = 0; x < W; x++) {
          let d = fbm(x * 0.011 + ox, fy);
          d = d < 0.38 ? 0 : Math.min(1, (d - 0.38) * 2.2);
          const dx = x - px;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) d -= (1 - Math.sqrt(d2) / R) * 1.1; // pointer carves the cloud
          pixels[row + x] = d > matrix[m + (x & 7)] ? cloudPx : skyPx;
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
      className="block h-auto w-full"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
