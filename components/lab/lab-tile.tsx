"use client";

import Link from "next/link";
import { useState } from "react";
import { labEffects } from "../../lib/lab-effects";
import { labDemos } from "./demos";

// One bento tile: a live canvas that only animates while hovered or focused.
export function LabTile({ slug }: { slug: string }) {
  const [active, setActive] = useState(false);
  const effect = labEffects.find((e) => e.slug === slug);
  const Demo = labDemos[slug];
  if (!effect || !Demo) return null;

  return (
    <Link
      href={`/lab/${slug}/`}
      aria-label={`${effect.title}: ${effect.summary}`}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={`group relative block h-full overflow-hidden rounded-lg border border-stone-200 bg-stone-100 transition-transform duration-150 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-800 ${effect.span}`}
    >
      <div className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full [&>canvas]:rounded-none [&>canvas]:object-cover">
        <Demo paused={!active} />
      </div>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-2.5 pt-8 text-white">
        <span className="block text-[13px] font-medium leading-4">{effect.title}</span>
        <span className="block font-mono text-[10px] leading-4 text-white/75">{effect.tags}</span>
      </span>
    </Link>
  );
}
