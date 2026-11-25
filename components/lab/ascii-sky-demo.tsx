"use client";

import { useState } from "react";
import { AsciiSky, type AsciiSkyProps } from "./ascii-sky/react";
import type { LabDemoProps } from "./demos";

type Theme = NonNullable<AsciiSkyProps["theme"]>;

const ASSETS = "/lab/ascii-sky/";

const THEMES: { id: Theme; label: string }[] = [
  { id: "light", label: "Day" },
  { id: "sunset", label: "Sunset" },
  { id: "dark", label: "Night" },
];

export function AsciiSkyDemo({ paused, near }: LabDemoProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const isTile = paused !== undefined;
  // Mount the sky the first time the tile comes near the screen, then keep it. Unmounting on
  // every scroll past would refetch the assets and rebuild the glyph atlas each time; the
  // engine already stops its own animation loop while the canvas is off screen, and holds
  // its last frame while the tile is not in play.
  const [hasShown, setHasShown] = useState(!isTile || !!near);
  if (near && !hasShown) setHasShown(true);

  return (
    // The tile sets its own aspect ratio; on the detail page the sky needs one of its own.
    <div className={`relative w-full overflow-hidden bg-[#1e488f] ${isTile ? "h-full" : "aspect-[2/1] max-sm:aspect-[4/3]"}`}>
      {hasShown && (
        <AsciiSky
          theme={theme}
          assets={ASSETS}
          held={!!paused}
          style={{
            position: "absolute",
            inset: 0,
            height: "100%",
            pointerEvents: isTile ? "none" : "auto",
          }}
        />
      )}
      {!isTile && (
        <div className="pointer-events-auto absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full bg-black/40 p-1 text-xs text-white/90 backdrop-blur-sm">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme(t.id)}
              className={`rounded-full px-2.5 py-1 transition-colors ${
                theme === t.id ? "bg-white/25 font-medium text-white" : "hover:bg-white/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
