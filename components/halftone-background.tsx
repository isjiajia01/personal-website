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
    if (resolvedMode) {
      const nextIsDark = resolvedMode === "dark";
      if (isDarkRef.current !== nextIsDark) {
        isDarkRef.current = nextIsDark;
        drawRef.current?.();
      }
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

    // Initial dark mode detection
    isDarkRef.current = resolvedMode
      ? resolvedMode === "dark"
      : document.documentElement.classList.contains("dark");

    const pitch = 10; // Hexagonal lattice pitch in CSS px (D5: 8-12px)
    const count = 4; // 4 wandering Lissajous metaballs (D8: 3-5 blobs)
    const reducedMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let frame = 0;
    let frameNumber = 0;
    let previous = 0;
    let elapsed = 0;

    // Palette per D2, D3, D4
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
      const { base, dot } = getColors();

      // Solid background fill (D2)
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      const baseDim = Math.min(width, height);
      const centres = paths.map((p) => {
        const r = p.radius * baseDim;
        return {
          x: width / 2 + Math.sin(elapsed * p.fx + p.phase) * p.ax * width * 0.46,
          y: height / 2 + Math.cos(elapsed * p.fy + p.phase * 0.7) * p.ay * height * 0.46,
          r2: r * r,
        };
      });

      ctx.fillStyle = dot;
      ctx.beginPath();

      const rows = Math.ceil(height / pitch) + 1;
      const columns = Math.ceil(width / pitch) + 2;
      const maxRadius = pitch * 0.44; // 4.4px (D5)

      // Center attenuation band (D6, STATES.mobile):
      // Printer shell is max-w-3xl (768px -> half is 384px) + 120px = 504px.
      // On narrow/mobile screens (<= 768px), the attenuation band covers the paper column width.
      const halfCenter = Math.min(width * 0.48, 504);

      for (let row = 0; row < rows; row++) {
        // Hexagonal lattice offset (D5)
        const offset = row % 2 ? pitch / 2 : 0;
        const y = row * pitch;

        // Precompute y-distance squared to blobs
        const dy0 = y - centres[0].y; const dy0_sq = dy0 * dy0;
        const dy1 = y - centres[1].y; const dy1_sq = dy1 * dy1;
        const dy2 = y - centres[2].y; const dy2_sq = dy2 * dy2;
        const dy3 = y - centres[3].y; const dy3_sq = dy3 * dy3;

        for (let col = 0; col < columns; col++) {
          const x = col * pitch + offset;

          const dx0 = x - centres[0].x;
          const dx1 = x - centres[1].x;
          const dx2 = x - centres[2].x;
          const dx3 = x - centres[3].x;

          // Inverse-square metaball sum
          const v =
            centres[0].r2 / (dx0 * dx0 + dy0_sq + 1) +
            centres[1].r2 / (dx1 * dx1 + dy1_sq + 1) +
            centres[2].r2 / (dx2 * dx2 + dy2_sq + 1) +
            centres[3].r2 / (dx3 * dx3 + dy3_sq + 1);

          // Central printer zone attenuation (D6):
          // Within 120px around printer column, dot coverage fades to at most 40% of peak.
          const distFromCenter = Math.abs(x - width / 2);
          const centerAttenuation =
            distFromCenter < halfCenter
              ? 0.35 + 0.65 * Math.pow(distFromCenter / halfCenter, 1.8)
              : 1.0;

          const t = Math.min(1, (v * 0.4 + 0.04) * centerAttenuation);
          const r = Math.sqrt(t) * maxRadius;

          // Drop sub-pixel dots to keep drawing clean and fast
          if (r < 0.4) continue;

          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, Math.PI * 2);
        }
      }

      ctx.fill();
    };

    drawRef.current = draw;

    const tick = (now: number) => {
      // Capped delta prevents leaps after tab blur (M3)
      elapsed += Math.min((now - previous) / 1000, 0.08) * 0.7;
      previous = now;

      // Capped to ~30fps for minimal CPU overhead (M2, A4)
      if (++frameNumber % 2 === 0) {
        draw();
      }
      frame = requestAnimationFrame(tick);
    };

    const startOrStop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      isDarkRef.current = resolvedMode
        ? resolvedMode === "dark"
        : document.documentElement.classList.contains("dark");
      draw();

      // Pause when hidden or reduced motion (M3, M5)
      if (!document.hidden && !reducedMotionMq.matches) {
        previous = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    // Watch dark mode class toggle on <html> (D9, M4)
    const observer = new MutationObserver(() => {
      const nextIsDark = document.documentElement.classList.contains("dark");
      if (nextIsDark !== isDarkRef.current) {
        isDarkRef.current = nextIsDark;
        draw();
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(host);

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", startOrStop);
    reducedMotionMq.addEventListener("change", startOrStop);

    resize();
    startOrStop();

    return () => {
      cancelAnimationFrame(frame);
      drawRef.current = null;
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", startOrStop);
      reducedMotionMq.removeEventListener("change", startOrStop);
    };
  }, [resolvedMode]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`fixed inset-0 z-0 pointer-events-none select-none overflow-hidden motion-reduce:transition-none transition-opacity duration-500 ${
        mounted ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{
        backgroundColor: resolvedMode === "dark" ? "#0a0c12" : "#e0e0d8",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
      />
    </div>
  );
}
