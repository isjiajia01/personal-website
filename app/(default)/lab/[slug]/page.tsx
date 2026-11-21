import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { labEffects } from "../../../../lib/lab-effects";
import { labDemos } from "../../../../components/lab/demos";
import { DemoTabs } from "../../../../components/lab/demo-tabs";

export const dynamicParams = false;

export function generateStaticParams() {
  return labEffects.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = labEffects.find((x) => x.slug === slug);
  if (!e) return {};
  const url = `https://me.isjia.page/lab/${slug}/`;
  const ogImage = { url: "https://me.isjia.page/og/home-en-v1.png", width: 1200, height: 630, alt: e.title };
  return {
    title: e.title,
    description: e.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: e.title, description: e.summary, images: [ogImage] },
    twitter: { card: "summary_large_image", title: e.title, description: e.summary, images: [ogImage] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = labEffects.find((x) => x.slug === slug);
  const Demo = labDemos[slug];
  if (!e || !Demo) notFound();
  // The code shown is the file that runs, read at build time, so they cannot drift.
  const code = readFileSync(join(process.cwd(), e.file), "utf8");
  return (
    <article>
      <p className="text-[13px] text-stone-500 dark:text-zinc-400">
        <Link href="/lab/" className="hover:text-rose-700 dark:hover:text-rose-400">← Lab</Link>
      </p>
      <h1 className="page-title mt-4 text-[15px] font-medium text-zinc-900 dark:text-zinc-100">{e.title}</h1>
      <p className="mt-1 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">{e.summary}</p>
      <div className="mt-8">
        <DemoTabs demo={<Demo />} code={code} filename={e.file} />
      </div>
      <h2 className="mt-10 text-[15px] font-medium text-zinc-900 dark:text-zinc-100">How it works</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-[14px] leading-6 text-stone-600 dark:text-zinc-400">
        {e.how.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </article>
  );
}
