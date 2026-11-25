"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { labEffects, labNumber } from "../../lib/lab-effects";
import { labDemos } from "./demos";

// One collage piece: a live demo mounted like a print taped onto the paper, pinned a little
// crooked, with a specimen caption underneath. Hover straightens and lifts it. The demo keeps
// running while on screen and pauses off screen.
export function LabTile({ slug, index }: { slug: string; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => setVisible(en.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const effect = labEffects.find((e) => e.slug === slug);
  const Demo = labDemos[slug];
  if (!effect || !Demo) return null;
  const { tilt, aspect } = effect.layout;
  // Tape leans against the print, and alternates side to side so it does not look stamped.
  const tape = `${(index % 2 ? 1 : -1) * (2 + (index % 3))}deg`;
  const tapeX = ["left-1/2", "left-[30%]", "left-[68%]"][index % 3];

  return (
    <Link
      ref={ref}
      href={`/lab/${slug}/`}
      aria-label={`${effect.title}: ${effect.summary}`}
      data-cursor="Open"
      className="group block rounded-sm"
      style={{ "--tilt": `${tilt}deg`, "--tape": tape } as React.CSSProperties}
    >
      <div className="relative rotate-(--tilt) bg-white p-1.5 shadow-[0_1px_2px_rgb(0_0_0/0.06),0_10px_24px_-12px_rgb(0_0_0/0.28)] transition-[rotate,translate,box-shadow,scale] duration-300 ease-snap group-hover:rotate-0 group-hover:-translate-y-1 group-hover:shadow-[0_2px_4px_rgb(0_0_0/0.06),0_22px_40px_-16px_rgb(0_0_0/0.35)] group-active:scale-[0.985] dark:bg-zinc-700/60 dark:shadow-[0_10px_28px_-12px_rgb(0_0_0/0.8)]">
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -top-2.5 z-10 h-5 w-16 -translate-x-1/2 rotate-(--tape) bg-[#ece3c8]/80 shadow-[0_1px_1px_rgb(0_0_0/0.06)] dark:bg-white/15 ${tapeX}`}
        />
        <div className={`relative overflow-hidden bg-stone-100 dark:bg-zinc-800 ${aspect}`}>
          <div className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full [&>canvas]:object-cover">
            <Demo paused={!visible} />
          </div>
        </div>
      </div>
      <div className="mt-4 px-0.5">
        <div className="flex items-baseline gap-x-2">
          <span className="font-mono text-[11px] tabular-nums text-stone-400 dark:text-zinc-500">{labNumber(slug)}</span>
          <span className="project-title text-stone-800 transition-colors group-hover:text-(--rose) dark:text-zinc-100">
            {effect.title}
            <span aria-hidden="true" className="link-arrow ml-1 text-[0.7em] text-stone-400 dark:text-zinc-500">↗</span>
          </span>
        </div>
        <p className="mt-0.5 font-mono text-[11px] leading-4 text-stone-400 dark:text-zinc-500">
          <span className="text-stone-500 dark:text-zinc-400">{effect.date}</span> · {effect.tags}
        </p>
      </div>
    </Link>
  );
}
