import type { Metadata } from "next";
import { labEffects } from "../../../lib/lab-effects";
import { LabTile } from "../../../components/lab/lab-tile";

const url = "https://me.isjia.page/lab/";
const description = "Visual effects I rebuilt from things I liked. Each one has a live demo and the source.";
const ogImage = { url: "https://me.isjia.page/og/home-en-v1.png", width: 1200, height: 630, alt: "Lab" };

export const metadata: Metadata = {
  title: "Lab",
  description,
  alternates: { canonical: url },
  openGraph: { type: "website", url, title: "Lab", description, images: [ogImage] },
  twitter: { card: "summary_large_image", title: "Lab", description, images: [ogImage] },
};

export default function LabIndex() {
  return (
    <div>
      <h1 className="page-title text-[15px] font-medium text-zinc-900 dark:text-zinc-100">Lab</h1>
      <p className="mt-1 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">{description}</p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-stone-400 dark:text-zinc-500">
        {String(labEffects.length).padStart(2, "0")} experiments ·{" "}
        <span className="pointer-coarse:hidden">hover to play</span>
        <span className="hidden pointer-coarse:inline">scroll to play</span>
      </p>
      {/* Collage: wider than the text column on large screens, one column with alternating
          offsets on phones, a staggered 12-column grid from 640px (see layout in lib/lab-effects.ts). */}
      <ul className="rise-own mt-14 grid grid-cols-1 items-start gap-y-14 sm:grid-cols-12 sm:gap-x-6 sm:gap-y-16 lg:-mx-24">
        {labEffects.map((e, index) => (
          <li
            key={e.slug}
            className={`rise ${e.layout.cols.includes("max-sm:w-") ? "" : "max-sm:w-[92%]"} ${index % 2 ? "max-sm:ml-auto" : ""} ${e.layout.cols}`}
            style={{ "--i": 3 + index } as React.CSSProperties}
          >
            <LabTile slug={e.slug} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}
