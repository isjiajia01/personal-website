"use client";

import { useEffect, useState } from "react";

// Earlier standalone pieces run in an iframe. In a tile the frame only loads
// while the tile is hovered, so several WebGL scenes never run at once.
export function EmbedDemo({ src, title, paused = false, tile = false }: { src: string; title: string; paused?: boolean; tile?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { if (!paused) setLoaded(true); }, [paused]);
  const show = tile ? !paused : true;
  return (
    <div className={tile ? "h-full w-full bg-stone-200 dark:bg-zinc-800" : "aspect-[3/2] w-full overflow-hidden rounded-md border border-stone-200 dark:border-zinc-700"}>
      {show && loaded || !tile ? (
        <iframe src={src} title={title} loading="lazy" className="h-full w-full border-0" />
      ) : null}
    </div>
  );
}
