"use client";

import { useEffect, useRef } from "react";

// Earlier standalone pieces run in an iframe. In a tile the frame ignores the
// pointer (the tile is a link, and an iframe would swallow pointer events and
// freeze the custom cursor). On a detail page the frame is interactive, so the
// custom cursor steps aside while the pointer is over it.
//
// In a tile the frame is mounted while it is near the screen and held on its last
// frame unless the tile is in play (see public/lab-embed/hold.js). Several animated
// iframes at once are what make Safari stutter.
export function EmbedDemo({
  src,
  title,
  tile = false,
  paused = false,
  near = true,
}: {
  src: string;
  title: string;
  tile?: boolean;
  paused?: boolean;
  near?: boolean;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const lab = paused ? "hold" : "play";
  const tell = () => frame.current?.contentWindow?.postMessage({ lab }, location.origin);
  // Tell the frame whenever play state changes; onLoad covers a frame that mounts later.
  useEffect(() => {
    if (tile && near) frame.current?.contentWindow?.postMessage({ lab }, location.origin);
  }, [tile, near, lab]);
  const root = () => document.documentElement;
  return (
    <div
      className={tile ? "h-full w-full bg-stone-200 dark:bg-zinc-800" : "aspect-[3/2] w-full overflow-hidden"}
      onPointerEnter={tile ? undefined : () => root().classList.remove("cursor-ready")}
      onPointerLeave={tile ? undefined : () => root().classList.add("cursor-ready")}
    >
      {!(tile && !near) && (
      <iframe
        ref={frame}
        src={src}
        title={title}
        loading={tile ? "eager" : "lazy"}
        tabIndex={tile ? -1 : undefined}
        aria-hidden={tile || undefined}
        onLoad={tile ? tell : undefined}
        className={`h-full w-full border-0 ${tile ? "pointer-events-none" : ""}`}
      />
      )}
    </div>
  );
}
