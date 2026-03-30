"use client";

import { useEffect, useRef } from "react";

const BASE_PARTICLE_COUNT = 28;
const TRAIL_LENGTH = 72;
const DRAG = 0.988;
const SWIRL = 0.0034;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticle(width, height, centerX, centerY, compact) {
  const edge = Math.floor(Math.random() * 3);
  const margin = 36;
  let x = centerX;
  let y = centerY;

  if (edge === 0) {
    x = randomBetween(width * 0.08, width * 0.28);
    y = randomBetween(height * 0.2, height * 0.72);
  } else if (edge === 1) {
    x = randomBetween(width * 0.72, width * 0.92);
    y = randomBetween(height * 0.16, height * 0.7);
  } else {
    x = randomBetween(width * 0.28, width * 0.72);
    y = randomBetween(-margin, height * 0.16);
  }

  const angle = Math.atan2(centerY - y, centerX - x) + randomBetween(-0.34, 0.34);
  const speed = compact ? randomBetween(0.34, 0.62) : randomBetween(0.44, 0.92);

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: randomBetween(0.7, 1.05),
    decay: randomBetween(0.0022, 0.005),
    radius: randomBetween(0.7, 1.8),
    charge: Math.random() < 0.5 ? -1 : 1,
    trail: []
  };
}

export default function HeroSparkField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.innerWidth < 768;
    const particles = [];
    let frameId = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let centerX = 0;
    let centerY = 0;
    let theme = document.documentElement.dataset.theme || "dark";
    let lastTime = performance.now();
    let pointerX = 0;
    let pointerY = 0;
    let pointerActive = false;

    const particleTarget = prefersReducedMotion ? 0 : compact ? 14 : BASE_PARTICLE_COUNT;

    const setSize = () => {
      width = canvas.clientWidth || 1000;
      height = canvas.clientHeight || 560;
      dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      centerX = width * 0.5;
      centerY = height * 0.42;
    };

    const syncTheme = () => {
      theme = document.documentElement.dataset.theme || "dark";
    };

    const refillParticles = () => {
      while (particles.length < particleTarget) {
        particles.push(createParticle(width, height, centerX, centerY, compact));
      }
    };

    const drawTrail = (particle, alphaMultiplier, palette) => {
      if (particle.trail.length < 2) return;

      for (let i = 1; i < particle.trail.length; i += 1) {
        const point = particle.trail[i];
        const previous = particle.trail[i - 1];
        const progress = i / particle.trail.length;
        const fade = progress * alphaMultiplier;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${palette.r}, ${palette.g}, ${palette.b}, ${fade.toFixed(4)})`;
        ctx.lineWidth = particle.radius * (0.3 + progress * 1.3);
        ctx.moveTo(previous.x, previous.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
    };

    const render = (now) => {
      frameId = 0;
      if (!visible) return;

      const delta = clamp((now - lastTime) / 16.6667, 0.8, 1.8);
      lastTime = now;
      syncTheme();

      const darkTheme = theme !== "light";
      const bgAlpha = darkTheme ? 0.18 : 0.07;
      const primary = darkTheme
        ? { r: 248, g: 194, b: 108 }
        : { r: 164, g: 118, b: 68 };
      const secondary = darkTheme
        ? { r: 184, g: 132, b: 84 }
        : { r: 184, g: 150, b: 112 };

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(7, 7, 10, ${bgAlpha})`;
      ctx.fillRect(0, 0, width, height);

      const radialGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.42);
      if (darkTheme) {
        radialGlow.addColorStop(0, "rgba(224, 154, 78, 0.18)");
        radialGlow.addColorStop(0.28, "rgba(148, 96, 46, 0.12)");
        radialGlow.addColorStop(0.56, "rgba(82, 56, 32, 0.05)");
        radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        radialGlow.addColorStop(0, "rgba(186, 136, 74, 0.08)");
        radialGlow.addColorStop(0.4, "rgba(186, 136, 74, 0.03)");
        radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      refillParticles();
      ctx.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const dist = Math.max(Math.hypot(dx, dy), 1);
        const inward = darkTheme ? 0.015 : 0.01;
        const pointerPull = pointerActive
          ? clamp(1 - Math.hypot(pointerX - particle.x, pointerY - particle.y) / Math.max(width, height), 0, 1) * 0.01
          : 0;

        particle.vx += (dx / dist) * (inward + pointerPull) * delta;
        particle.vy += (dy / dist) * (inward + pointerPull) * delta;

        const swirlStrength = SWIRL * particle.charge * (darkTheme ? 1 : 0.75) * delta;
        const nextVx = particle.vx + -dy * swirlStrength;
        const nextVy = particle.vy + dx * swirlStrength;
        particle.vx = nextVx * DRAG;
        particle.vy = nextVy * DRAG;

        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.life -= particle.decay * delta;

        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > TRAIL_LENGTH) particle.trail.shift();

        const alphaMultiplier = clamp(particle.life, 0, 1) * (darkTheme ? 0.19 : 0.075);
        drawTrail(particle, alphaMultiplier, particle.charge > 0 ? primary : secondary);

        if (
          particle.life <= 0 ||
          particle.x < -80 ||
          particle.x > width + 80 ||
          particle.y < -80 ||
          particle.y > height + 80 ||
          dist < 22
        ) {
          particles.splice(i, 1);
        }
      }

      ctx.globalCompositeOperation = "source-over";

      const veil = ctx.createLinearGradient(0, 0, 0, height);
      veil.addColorStop(0, darkTheme ? "rgba(9, 9, 9, 0.1)" : "rgba(243, 235, 222, 0.06)");
      veil.addColorStop(0.24, "rgba(0, 0, 0, 0)");
      veil.addColorStop(0.78, "rgba(0, 0, 0, 0)");
      veil.addColorStop(1, darkTheme ? "rgba(9, 9, 9, 0.14)" : "rgba(243, 235, 222, 0.1)");
      ctx.fillStyle = veil;
      ctx.fillRect(0, 0, width, height);

      frameId = window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      setSize();
      refillParticles();
    };

    const handleVisibility = () => {
      visible = !document.hidden;
      if (visible && !frameId) {
        lastTime = performance.now();
        frameId = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      pointerActive = true;
    };

    const handlePointerLeave = () => {
      pointerActive = false;
    };

    setSize();
    refillParticles();
    frameId = window.requestAnimationFrame(render);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
    canvas.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas aria-hidden="true" className="hero-spark-field" ref={canvasRef} />;
}
