import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { labEffects } from "../../../../lib/lab-effects";
import { labDemos } from "../../../../components/lab/demos";

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
  const i = labEffects.findIndex((x) => x.slug === slug);
  const Demo = labDemos[slug];
  if (i < 0 || !Demo) notFound();
  const e = labEffects[i];
  const prev = labEffects[(i - 1 + labEffects.length) % labEffects.length];
  const next = labEffects[(i + 1) % labEffects.length];
  const linkClass = "hover:text-rose-700 dark:hover:text-rose-400";
  return (
    <article>
      <p className="text-[13px] text-stone-500 dark:text-zinc-400">
        <Link href="/lab/" className={linkClass}>← Lab</Link>
      </p>
      <div className="mt-4 overflow-hidden rounded-lg border border-stone-200 dark:border-zinc-700">
        <Demo />
      </div>
      <div className="mt-5 flex items-baseline gap-3">
        <h1 className="page-title text-[15px] font-medium text-zinc-900 dark:text-zinc-100">{e.title}</h1>
        <span className="font-mono text-[12px] text-stone-400 dark:text-zinc-500">{e.tags}</span>
        <span className="ml-auto text-[13px] tabular-nums text-stone-500 dark:text-zinc-400">{e.date}</span>
      </div>
      <p className="mt-1 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">{e.summary}</p>
      <p className="mt-4 text-[13px]">
        <a href={e.repo} target="_blank" rel="noopener noreferrer" className={`text-stone-600 dark:text-zinc-300 ${linkClass}`}>
          Source on GitHub<span aria-hidden="true"> ↗</span>
        </a>
      </p>
      <nav className="mt-10 flex justify-between border-t border-stone-200 pt-4 text-[13px] text-stone-500 dark:border-zinc-700 dark:text-zinc-400" aria-label="More effects">
        <Link href={`/lab/${prev.slug}/`} className={linkClass}>← {prev.title}</Link>
        <Link href={`/lab/${next.slug}/`} className={linkClass}>{next.title} →</Link>
      </nav>
    </article>
  );
}
