"use client";

import { useEffect, useRef, useState } from "react";

interface HalftoneBackgroundProps {
  className?: string;
  resolvedMode?: "light" | "dark";
}

export default function HalftoneBackground({
  className = "",
  resolvedMode,
}: HalftoneBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const isDarkRef = useRef<boolean>(false);
  const drawRef = useRef<(() => void) | null>(null);

  // Sync resolvedMode prop immediately
  useEffect(() => {
    const nextIsDark = resolvedMode
      ? resolvedMode === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDarkRef.current !== nextIsDark) {
      isDarkRef.current = nextIsDark;
      drawRef.current?.();
    }
  }, [resolvedMode]);

  useEffect(() => {
    const reducedMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionMq.matches) {
      setMounted(true);
    } else {
      // 400-600ms fade-in on mount (M1)
      const timer = window.setTimeout(() => setMounted(true), 40);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const pitch = 10; // Hexagonal lattice pitch in CSS px (D5: 8-12px)
    const count = 4; // 4 wandering Lissajous metaballs (D8: 3-5 blobs)
    const reducedMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const darkModeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const narrowMq = window.matchMedia("(max-width: 896px)"); // 896px = SiteShell max-w-4xl

    // Initial dark mode detection
    isDarkRef.current = resolvedMode
      ? resolvedMode === "dark"
      : darkModeMq.matches;

    let width = 0;
    let height = 0;
    let currentDpr = 0;
    let rows = 0;
    let columns = 0;
    let xEven = new Float32Array(0);
    let xOdd = new Float32Array(0);
    let attenEven = new Float32Array(0);
    let attenOdd = new Float32Array(0);
    let skipEvenStart = 0, skipEvenEnd = 0, skipOddStart = 0, skipOddEnd = 0;
    let frame = 0;
    let previous = 0;
    let lastDraw = 0;
    let elapsed = 0;
    let hasDrawnInitial = false;
    const maxRadius = pitch * 0.44; // 4.4px (D5)
    const tau = Math.PI * 2;
    const getColors = () => {
      if (isDarkRef.current) {
        return {
          base: "#0a0c12",
          dot: "rgba(208, 212, 224, 0.055)", // ink hue #d0d4e0 at 5.5%
        };
      }
      return {
        base: "#e0e0d8",
        dot: "rgba(44, 40, 36, 0.08)", // ink hue #2C2824 at 8%
      };
    };

    // Lissajous trajectories for organic, non-repeating slow drift (D8, M2)
    const paths = Array.from({ length: count }, (_, i) => ({
      ax: 0.5 + 0.35 * (((i * 7) % 5) / 5),
      ay: 0.4 + 0.45 * (((i * 3) % 4) / 4),
      fx: 0.05 + 0.025 * (((i * 5) % 3) / 2),
      fy: 0.04 + 0.025 * (((i * 2) % 4) / 3),
      phase: i * 1.57,
      radius: 0.22 + 0.1 * (((i * 4) % 3) / 3),
    }));

    const draw = () => {
      if (width <= 0 || height <= 0) return;
      hasDrawnInitial = true;
      const { base, dot } = getColors();

      // Solid background fill (D2)
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      const baseDim = Math.min(width, height);
      const halfW = width / 2;
      const halfH = height / 2;
      const spanW = width * 0.46;
      const spanH = height * 0.46;

      const r0 = paths[0].radius * baseDim;
      const c0x = halfW + Math.sin(elapsed * paths[0].fx + paths[0].phase) * paths[0].ax * spanW;
      const c0y = halfH + Math.cos(elapsed * paths[0].fy + paths[0].phase * 0.7) * paths[0].ay * spanH;
      const c0r2 = r0 * r0;

      const r1 = paths[1].radius * baseDim;
      const c1x = halfW + Math.sin(elapsed * paths[1].fx + paths[1].phase) * paths[1].ax * spanW;
      const c1y = halfH + Math.cos(elapsed * paths[1].fy + paths[1].phase * 0.7) * paths[1].ay * spanH;
      const c1r2 = r1 * r1;

      const r2 = paths[2].radius * baseDim;
      const c2x = halfW + Math.sin(elapsed * paths[2].fx + paths[2].phase) * paths[2].ax * spanW;
      const c2y = halfH + Math.cos(elapsed * paths[2].fy + paths[2].phase * 0.7) * paths[2].ay * spanH;
      const c2r2 = r2 * r2;

      const r3 = paths[3].radius * baseDim;
      const c3x = halfW + Math.sin(elapsed * paths[3].fx + paths[3].phase) * paths[3].ax * spanW;
      const c3y = halfH + Math.cos(elapsed * paths[3].fy + paths[3].phase * 0.7) * paths[3].ay * spanH;
      const c3r2 = r3 * r3;

      ctx.fillStyle = dot;
      ctx.beginPath();

      for (let row = 0; row < rows; row++) {
        const isOdd = (row & 1) === 1;
        const xRow = isOdd ? xOdd : xEven;
        const attenRow = isOdd ? attenOdd : attenEven;
        const y = row * pitch;
        // Precompute y-distance squared to blobs
        const dy0 = y - c0y; const dy0_sq = dy0 * dy0 + 1;
        const dy1 = y - c1y; const dy1_sq = dy1 * dy1 + 1;
        const dy2 = y - c2y; const dy2_sq = dy2 * dy2 + 1;
        const dy3 = y - c3y; const dy3_sq = dy3 * dy3 + 1;

        const skipStart = isOdd ? skipOddStart : skipEvenStart;
        const skipEnd = isOdd ? skipOddEnd : skipEvenEnd;
        for (let col = 0; col < columns; col++) {
          if (col >= skipStart && col < skipEnd) continue;
          const x = xRow[col];

          const dx0 = x - c0x;
          const dx1 = x - c1x;
          const dx2 = x - c2x;
          const dx3 = x - c3x;

          // Inverse-square metaball sum
          const v =
            c0r2 / (dx0 * dx0 + dy0_sq) +
            c1r2 / (dx1 * dx1 + dy1_sq) +
            c2r2 / (dx2 * dx2 + dy2_sq) +
            c3r2 / (dx3 * dx3 + dy3_sq);

          const t = Math.min(1, (v * 0.4 + 0.04) * attenRow[col]);
          const r = Math.sqrt(t) * maxRadius;

          // Drop sub-pixel dots to keep drawing clean and fast
          if (r < 0.4) continue;

          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, tau);
        }
      }

      ctx.fill();
    };

    drawRef.current = draw;

    const tick = (now: number) => {
      if (document.hidden) {
        frame = 0;
        return;
      }
      if (reducedMotionMq.matches || narrowMq.matches) {
        draw();
        frame = 0;
        return;
      }
      // Capped delta prevents leaps after tab blur (M3)
      if (previous > 0) {
        elapsed += Math.min((now - previous) / 1000, 0.08) * 0.7;
      }
      previous = now;

      // Throttle redraws (~20fps) for minimal main-thread overhead
      if (!hasDrawnInitial || now - lastDraw >= 48) {
        lastDraw = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };

    const startOrStop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      isDarkRef.current = resolvedMode
        ? resolvedMode === "dark"
        : darkModeMq.matches;

      // Pause completely when tab is hidden (M3)
      if (document.hidden) {
        return;
      }

      if (reducedMotionMq.matches || narrowMq.matches) {
        draw();
        return;
      }

      if (!hasDrawnInitial) {
        draw();
      }
      previous = performance.now();
      lastDraw = previous;
      frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const maxDpr = nextWidth < 768 ? 1 : 1.5;
      const nextDpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      if (
        nextWidth === width &&
        nextHeight === height &&
        nextDpr === currentDpr
      ) {
        return;
      }

      width = nextWidth;
      height = nextHeight;
      currentDpr = nextDpr;
      rows = Math.ceil(height / pitch) + 1;
      columns = Math.ceil(width / pitch) + 2;

      xEven = new Float32Array(columns);
      xOdd = new Float32Array(columns);
      attenEven = new Float32Array(columns);
      attenOdd = new Float32Array(columns);
      const sheetLeft = nextWidth > 896 ? (host.clientWidth - 896) / 2 : 0;
      const sheetRight = nextWidth > 896 ? sheetLeft + 896 : 0;
      skipEvenStart = columns;
      skipEvenEnd = columns;
      skipOddStart = columns;
      skipOddEnd = columns;

      // Center attenuation band (D6, STATES.mobile)
      const halfCenter = Math.min(width * 0.48, 504);
      const centerX = width / 2;

      for (let col = 0; col < columns; col++) {
        const xe = col * pitch;
        const xo = xe + pitch / 2;
        xEven[col] = xe;
        xOdd[col] = xo;
        if (nextWidth > 896) {
          if (xe - maxRadius >= sheetLeft && xe + maxRadius <= sheetRight) {
            skipEvenStart = Math.min(skipEvenStart, col);
            skipEvenEnd = col + 1;
          }
          if (xo - maxRadius >= sheetLeft && xo + maxRadius <= sheetRight) {
            skipOddStart = Math.min(skipOddStart, col);
            skipOddEnd = col + 1;
          }
        }
        const distE = Math.abs(xe - centerX);
        attenEven[col] =
          distE < halfCenter
            ? 0.35 + 0.65 * Math.pow(distE / halfCenter, 1.8)
            : 1.0;

        const distO = Math.abs(xo - centerX);
        attenOdd[col] =
          distO < halfCenter
            ? 0.35 + 0.65 * Math.pow(distO / halfCenter, 1.8)
            : 1.0;
      }

      canvas.width = Math.max(1, Math.floor(width * currentDpr));
      canvas.height = Math.max(1, Math.floor(height * currentDpr));
      ctx.setTransform(currentDpr, 0, 0, currentDpr, 0, 0);
      if (hasDrawnInitial && !document.hidden) {
        draw();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", startOrStop);
    reducedMotionMq.addEventListener("change", startOrStop);
    darkModeMq.addEventListener("change", startOrStop);
    narrowMq.addEventListener("change", startOrStop);

    resize();
    startOrStop();
    return () => {
      cancelAnimationFrame(frame);
      drawRef.current = null;
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", startOrStop);
      reducedMotionMq.removeEventListener("change", startOrStop);
      darkModeMq.removeEventListener("change", startOrStop);
      narrowMq.removeEventListener("change", startOrStop);
    };
  }, [resolvedMode]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`fixed inset-0 -z-10 pointer-events-none print:hidden select-none overflow-hidden motion-reduce:transition-none transition-opacity duration-500 ${
        mounted ? "opacity-100" : "opacity-0"
      } bg-[#e0e0d8] dark:bg-[#0a0c12] ${className}`}
      style={
        resolvedMode
          ? {
              backgroundColor: resolvedMode === "dark" ? "#0a0c12" : "#e0e0d8",
            }
          : undefined
      }
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
      />
    </div>
  );
}
