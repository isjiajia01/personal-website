"use client";

import { useEffect, useRef } from "react";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function mixColor(a, b, t) {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t))
  ];
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function CozyWindowShade() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!context) return;

    const offscreenCache = new Map();
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;
    let visible = !document.hidden;
    let lastTime = 0;
    let cachedTheme = document.documentElement.dataset.theme || "dark";

    const getCanvas = (key, canvasWidth, canvasHeight) => {
      const cached = offscreenCache.get(key);
      if (cached && cached.width === canvasWidth && cached.height === canvasHeight) {
        return cached;
      }

      const next = document.createElement("canvas");
      next.width = canvasWidth;
      next.height = canvasHeight;
      offscreenCache.set(key, next);
      return next;
    };

    const fit = () => {
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || Math.max(window.innerHeight * 0.72, 320);
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
    };

    const draw = (now) => {
      frameId = 0;
      if (!visible) return;

      const theme = document.documentElement.dataset.theme || "dark";
      const darkTheme = theme !== "light";
      if (theme !== cachedTheme) {
        cachedTheme = theme;
      }

      const dt = lastTime ? (now - lastTime) / 1000 : 0.016;
      lastTime = now;

      const t = reducedMotion ? 0.035 : ((now % 240000) / 240000) * 0.12;
      const open = reducedMotion ? 0.54 : 0.5 + Math.sin(now * 0.00006) * 0.04 + Math.sin(now * 0.00015) * 0.02;
      const easedT = t / 0.35;

      const shadowTarget = mixColor([223, 205, 187], [236, 224, 210], easedT);
      const shadowColor = darkTheme ? [10, 15, 24] : shadowTarget;
      const warmTarget = mixColor([255, 214, 156], [255, 230, 192], easedT);
      const baseSoft = lerp(12, 7, easedT);
      const skewX = lerp(0.34, 0.26, easedT);
      const skewY = lerp(0.13, 0.09, easedT);
      const stretch = lerp(1.88, 1.58, easedT);
      const warmAlpha = (darkTheme ? lerp(0.18, 0.12, easedT) : lerp(0.26, 0.16, easedT)) * (reducedMotion ? 0.88 : 1);

      context.clearRect(0, 0, width, height);

      if (!darkTheme) {
        context.fillStyle = `rgba(${shadowColor[0]}, ${shadowColor[1]}, ${shadowColor[2]}, 0.72)`;
        context.fillRect(0, 0, width, height);
      } else {
        const ambient = context.createRadialGradient(width * 0.34, height * 0.26, 0, width * 0.34, height * 0.26, width * 0.58);
        ambient.addColorStop(0, "rgba(255, 196, 124, 0.09)");
        ambient.addColorStop(0.5, "rgba(180, 118, 56, 0.045)");
        ambient.addColorStop(1, "rgba(8, 11, 16, 0)");
        context.fillStyle = ambient;
        context.fillRect(0, 0, width, height);
      }

      const projectWidth = Math.min(width * 0.62, 480) * stretch;
      const projectHeight = Math.min(height * 0.8, 560) * stretch * 0.8;
      const floatX = reducedMotion ? 0 : Math.sin(now * 0.00009) * 5 + Math.sin(now * 0.00025) * 2.5;
      const floatY = reducedMotion ? 0 : Math.cos(now * 0.00011) * 3.5 + Math.cos(now * 0.00022) * 1.8;
      const projectX = lerp(width * 0.1, width * 0.18, easedT) + floatX;
      const projectY = lerp(height * 0.015, height * 0.06, easedT) + floatY;
      const frameThickness = lerp(10, 7, easedT);
      const slatCount = 14;
      const innerHeight = projectHeight - frameThickness * 2;
      const spacing = innerHeight / slatCount;
      const slatThickness = spacing * lerp(0.88, 0.12, open);
      const gapHeight = spacing - slatThickness;

      if (gapHeight <= 0.35) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }

      context.save();
      context.translate(projectX, projectY);
      context.transform(1, skewY, skewX, 1, 0, 0);

      const offWidth = Math.ceil(projectWidth + 80);
      const offHeight = Math.ceil(projectHeight + 80);
      const maskCanvas = getCanvas("mask", offWidth, offHeight);
      const maskContext = maskCanvas.getContext("2d");
      maskContext.clearRect(0, 0, offWidth, offHeight);

      for (let i = 0; i < slatCount; i += 1) {
        const baseY = frameThickness + i * spacing + slatThickness;
        const wobble = reducedMotion ? 0 : Math.sin(now * 0.00008 + i * 0.53) * 1.1 + Math.sin(now * 0.00019 + i * 0.79) * 0.6;
        const slatY = baseY + wobble;
        const verticalPosition = i / slatCount;
        const slatSoft = baseSoft * (0.55 + verticalPosition);
        const distanceFromCenter = Math.abs(i - slatCount / 2) / (slatCount / 2);
        const slatAlpha = 1 - distanceFromCenter * 0.1;
        const padY = slatSoft * 1.2;
        const gradient = maskContext.createLinearGradient(0, slatY - padY, 0, slatY + gapHeight + padY);

        gradient.addColorStop(0, "rgba(255,255,255,0)");
        gradient.addColorStop(padY / (gapHeight + padY * 2), `rgba(255,255,255,${slatAlpha})`);
        gradient.addColorStop(1 - padY / (gapHeight + padY * 2), `rgba(255,255,255,${slatAlpha})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        maskContext.fillStyle = gradient;
        maskContext.fillRect(frameThickness, slatY - padY, projectWidth - frameThickness * 2, gapHeight + padY * 2);
      }

      maskContext.globalCompositeOperation = "destination-in";
      const horizontalVignette = maskContext.createLinearGradient(frameThickness, 0, projectWidth - frameThickness, 0);
      horizontalVignette.addColorStop(0, "rgba(255,255,255,0.08)");
      horizontalVignette.addColorStop(0.08, "rgba(255,255,255,0.6)");
      horizontalVignette.addColorStop(0.18, "rgba(255,255,255,1)");
      horizontalVignette.addColorStop(0.5, "rgba(255,255,255,1)");
      horizontalVignette.addColorStop(0.78, "rgba(255,255,255,0.82)");
      horizontalVignette.addColorStop(0.92, "rgba(255,255,255,0.18)");
      horizontalVignette.addColorStop(1, "rgba(255,255,255,0.02)");
      maskContext.fillStyle = horizontalVignette;
      maskContext.fillRect(0, 0, offWidth, offHeight);

      const verticalVignette = maskContext.createLinearGradient(0, frameThickness, 0, projectHeight - frameThickness);
      verticalVignette.addColorStop(0, "rgba(255,255,255,0.08)");
      verticalVignette.addColorStop(0.08, "rgba(255,255,255,0.62)");
      verticalVignette.addColorStop(0.18, "rgba(255,255,255,1)");
      verticalVignette.addColorStop(0.78, "rgba(255,255,255,0.84)");
      verticalVignette.addColorStop(0.92, "rgba(255,255,255,0.16)");
      verticalVignette.addColorStop(1, "rgba(255,255,255,0.02)");
      maskContext.fillStyle = verticalVignette;
      maskContext.fillRect(0, 0, offWidth, offHeight);
      maskContext.globalCompositeOperation = "source-over";

      const warmCanvas = getCanvas("warm", offWidth, offHeight);
      const warmContext = warmCanvas.getContext("2d");
      warmContext.clearRect(0, 0, offWidth, offHeight);
      const warmGradient = warmContext.createRadialGradient(projectWidth * 0.4, projectHeight * 0.46, 0, projectWidth * 0.4, projectHeight * 0.46, projectWidth * 0.82);
      warmGradient.addColorStop(0, `rgba(${warmTarget[0]}, ${warmTarget[1]}, ${warmTarget[2]}, ${warmAlpha})`);
      warmGradient.addColorStop(0.54, `rgba(${warmTarget[0]}, ${warmTarget[1]}, ${warmTarget[2]}, ${warmAlpha * (darkTheme ? 0.42 : 0.58)})`);
      warmGradient.addColorStop(1, `rgba(${warmTarget[0]}, ${warmTarget[1]}, ${warmTarget[2]}, 0)`);
      warmContext.fillStyle = warmGradient;
      warmContext.fillRect(0, 0, offWidth, offHeight);
      warmContext.globalCompositeOperation = "destination-in";
      warmContext.drawImage(maskCanvas, 0, 0);
      warmContext.globalCompositeOperation = "source-over";

      if (!darkTheme) {
        context.globalCompositeOperation = "destination-out";
        context.drawImage(maskCanvas, 0, 0);
        context.globalCompositeOperation = "source-over";
      }

      context.globalCompositeOperation = darkTheme ? "screen" : "source-over";
      context.drawImage(warmCanvas, 0, 0);

      const glowCanvas = getCanvas("glow", offWidth, offHeight);
      const glowContext = glowCanvas.getContext("2d");
      glowContext.clearRect(0, 0, offWidth, offHeight);
      const glow = glowContext.createRadialGradient(projectWidth * 0.38, projectHeight * 0.42, 0, projectWidth * 0.38, projectHeight * 0.42, projectWidth * 0.7);
      glow.addColorStop(0, darkTheme ? "rgba(255,210,142,0.14)" : "rgba(255,220,160,0.1)");
      glow.addColorStop(0.56, darkTheme ? "rgba(255,214,156,0.06)" : "rgba(255,228,180,0.04)");
      glow.addColorStop(1, "rgba(255,235,200,0)");
      glowContext.fillStyle = glow;
      glowContext.fillRect(0, 0, offWidth, offHeight);
      glowContext.globalCompositeOperation = "destination-in";
      glowContext.drawImage(maskCanvas, 0, 0);
      glowContext.globalCompositeOperation = "source-over";
      context.drawImage(glowCanvas, 0, 0);
      context.globalCompositeOperation = "source-over";

      context.restore();

      const veilOpacity = darkTheme ? 0.18 : 0.1;
      const veil = context.createLinearGradient(0, 0, 0, height);
      veil.addColorStop(0, `rgba(0,0,0,${darkTheme ? 0.02 : 0})`);
      veil.addColorStop(0.36, `rgba(0,0,0,${veilOpacity * 0.25})`);
      veil.addColorStop(1, `rgba(0,0,0,${veilOpacity})`);
      context.fillStyle = veil;
      context.fillRect(0, 0, width, height);

      const nextFrameDelay = reducedMotion ? 1000 / 10 : darkTheme ? 1000 / 18 : 1000 / 24;
      if (dt * 1000 < nextFrameDelay * 0.45) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }

      frameId = window.requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      visible = !document.hidden;
      if (visible && !frameId) {
        lastTime = 0;
        frameId = window.requestAnimationFrame(draw);
      }
    };

    const handleReducedMotionChange = (event) => {
      reducedMotion = event.matches;
    };

    fit();
    frameId = window.requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(() => {
      fit();
    });

    resizeObserver.observe(canvas);
    window.addEventListener("resize", fit);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", fit);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      window.cancelAnimationFrame(frameId);
      offscreenCache.clear();
    };
  }, []);

  return <canvas aria-hidden="true" className="cozy-window-shade" ref={canvasRef} />;
}
