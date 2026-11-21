import type { Metadata } from "next";
import Link from "next/link";

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

const effects = [
  {
    href: "/lab/dither-clouds/",
    date: "Nov 2026",
    title: "Dither clouds",
    tags: "Canvas · ordered dithering",
    summary: "Procedural clouds reduced to two colours with a Bayer matrix. The pointer thins the dots out.",
  },
];

export default function LabIndex() {
  return (
    <div>
      <h1 className="page-title text-[15px] font-medium text-zinc-900 dark:text-zinc-100">Lab</h1>
      <p className="mt-1 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">{description}</p>
      <ul className="rise-own mt-10 -mx-3 space-y-1">
        {effects.map((e, index) => (
          <li key={e.href} className="rise" style={{ "--i": 2 + index } as React.CSSProperties}>
            <Link href={e.href} className="work-row group block rounded-md px-3 py-3 hover:bg-stone-50 dark:hover:bg-zinc-800/60">
              <span className="flex items-baseline gap-3">
                <span className="work-title project-title text-stone-800 dark:text-zinc-100">
                  {e.title}
                  <span aria-hidden="true" className="link-arrow ml-1 text-[0.7em] text-stone-400 dark:text-zinc-500">→</span>
                </span>
                <span className="leader" aria-hidden="true" />
                <span className="shrink-0 whitespace-nowrap text-[14px] tabular-nums text-stone-500 dark:text-zinc-400">{e.date}</span>
              </span>
              <span className="mt-1 block text-[14px] leading-6 text-stone-500 dark:text-zinc-400">{e.summary}</span>
              <span className="mt-1 block font-mono text-[12px] text-stone-400 dark:text-zinc-500">{e.tags}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
