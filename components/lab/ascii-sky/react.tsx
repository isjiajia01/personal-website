"use client";
import { type CSSProperties, type ReactElement, useEffect, useRef, useState } from "react";
import { type MountedSky, type MountOptions, mountSky, SKY_HEIGHT, stillSky } from "./index.ts";

export type AsciiSkyProps = MountOptions & {
  // Keep the last drawn frame on screen instead of animating.
  held?: boolean;
  className?: string;
  style?: CSSProperties;
};

const FADE = "opacity 700ms";
const fill: CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%" };

export const AsciiSky = ({
  theme = "auto",
  assets,
  faintFrom,
  ignore,
  night,
  held = false,
  className,
  style,
}: AsciiSkyProps): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skyRef = useRef<MountedSky | undefined>(undefined);
  const [isDrawn, setIsDrawn] = useState<boolean>(false);
  const themeRef = useRef(theme);
  const heldRef = useRef(held);

  useEffect(() => {
    const element = canvasRef.current;
    if (!element) {
      return;
    }
    const mounted = mountSky(element, {
      theme: themeRef.current,
      assets,
      faintFrom,
      ignore,
      night,
    });
    skyRef.current = mounted;
    mounted.hold(heldRef.current);
    mounted.ready
      .then(() => {
        if (skyRef.current === mounted) {
          setIsDrawn(true);
        }
      })
      .catch(() => undefined);
    return (): void => {
      mounted.stop();
      skyRef.current = undefined;
      setIsDrawn(false);
    };
  }, [assets, faintFrom, ignore, night]);

  useEffect(() => {
    heldRef.current = held;
    skyRef.current?.hold(held);
  }, [held]);

  useEffect(() => {
    themeRef.current = theme;
    skyRef.current?.setTheme(theme);
  }, [theme]);

  const still = theme === "auto" ? undefined : stillSky(theme, assets);
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: SKY_HEIGHT,
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
        ...style,
      }}
    >
      {still !== undefined && (
        <div
          style={{ ...fill, ...still, opacity: isDrawn ? 0 : still.opacity, transition: FADE }}
        />
      )}
      <canvas
        ref={canvasRef}
        style={{ ...fill, display: "block", opacity: isDrawn ? 1 : 0, transition: FADE }}
      />
    </div>
  );
};
