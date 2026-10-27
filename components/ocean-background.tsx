"use client";

import { useEffect, useRef } from "react";
import { OceanEngine } from "../lib/ascii-ocean/engine";

export function OceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new OceanEngine(canvas);
    return () => engine.destroy();
  }, []);

  return <canvas ref={canvasRef} className="ocean-background" aria-hidden="true" />;
}
