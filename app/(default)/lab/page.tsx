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
      <ul className="rise-own mt-10 grid auto-rows-[9rem] grid-flow-dense grid-cols-2 gap-2 sm:grid-cols-4">
        {labEffects.map((e, index) => (
          <li
            key={e.slug}
            className={`rise ${e.span}`}
            style={{ "--i": 2 + index } as React.CSSProperties}
          >
            <LabTile slug={e.slug} />
          </li>
        ))}
      </ul>
    </div>
  );
}
