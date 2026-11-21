import type { Metadata } from "next";
import Link from "next/link";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DitherDemo } from "../../../../components/lab/dither-demo";
import { DemoTabs } from "../../../../components/lab/demo-tabs";

const url = "https://me.isjia.page/lab/dither-clouds/";
const description = "Procedural clouds reduced to two colours with an 8×8 Bayer matrix. Live demo and source.";
const ogImage = { url: "https://me.isjia.page/og/home-en-v1.png", width: 1200, height: 630, alt: "Dither clouds" };

export const metadata: Metadata = {
  title: "Dither clouds",
  description,
  alternates: { canonical: url },
  openGraph: { type: "article", url, title: "Dither clouds", description, images: [ogImage] },
  twitter: { card: "summary_large_image", title: "Dither clouds", description, images: [ogImage] },
};

export default function Page() {
  // The code shown is the file that runs, read at build time, so they cannot drift.
  const code = readFileSync(join(process.cwd(), "components/lab/dither-demo.tsx"), "utf8");
  return (
    <article>
      <p className="text-[13px] text-stone-500 dark:text-zinc-400">
        <Link href="/lab/" className="hover:text-rose-700 dark:hover:text-rose-400">← Lab</Link>
      </p>
      <h1 className="page-title mt-4 text-[15px] font-medium text-zinc-900 dark:text-zinc-100">Dither clouds</h1>
      <p className="mt-1 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">{description}</p>
      <div className="mt-8">
        <DemoTabs demo={<DitherDemo />} code={code} filename="components/lab/dither-demo.tsx" />
      </div>
      <h2 className="mt-10 text-[15px] font-medium text-zinc-900 dark:text-zinc-100">How it works</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-[14px] leading-6 text-stone-600 dark:text-zinc-400">
        <li>Fractal noise gives a cloud density between 0 and 1 for every pixel.</li>
        <li>An 8×8 Bayer matrix gives each pixel a fixed threshold. Density above the threshold means a cloud dot, otherwise sky.</li>
        <li>Dense areas turn almost all white, thin areas stay blue, and the regular grid texture comes from the matrix.</li>
        <li>Near the pointer the density is lowered, so the dots thin out. Nothing is a particle; it is one threshold per pixel.</li>
      </ol>
    </article>
  );
}
