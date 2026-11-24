"use client";

import { useEffect, useRef } from "react";
import { ContourField } from "../lib/contours";

export function ContourBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const field = new ContourField(canvas);
    return () => field.destroy();
  }, []);

  return <canvas ref={canvasRef} className="contour-background" aria-hidden="true" />;
}
