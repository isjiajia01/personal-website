"use client";

// Earlier standalone pieces run in an iframe. In a tile the frame ignores the
// pointer (the tile is a link, and an iframe would swallow pointer events and
// freeze the custom cursor). On a detail page the frame is interactive, so the
// custom cursor steps aside while the pointer is over it.
export function EmbedDemo({ src, title, tile = false }: { src: string; title: string; tile?: boolean }) {
  const root = () => document.documentElement;
  return (
    <div
      className={tile ? "h-full w-full bg-stone-200 dark:bg-zinc-800" : "aspect-[3/2] w-full overflow-hidden rounded-md border border-stone-200 dark:border-zinc-700"}
      onPointerEnter={tile ? undefined : () => root().classList.remove("cursor-ready")}
      onPointerLeave={tile ? undefined : () => root().classList.add("cursor-ready")}
    >
      <iframe
        src={src}
        title={title}
        loading={tile ? "eager" : "lazy"}
        tabIndex={tile ? -1 : undefined}
        aria-hidden={tile || undefined}
        className={`h-full w-full border-0 ${tile ? "pointer-events-none" : ""}`}
      />
    </div>
  );
}
