import { sharePreview } from "@/lib/share-preview";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, dictionaryKeys, type Language } from "@/dictionaries";

// Projects with a detail page. Afgang keeps its own dedicated route.
async function detailWorks(lang: Language) {
  const dictionary = await getDictionary(lang);
  return dictionary.works.filter((w) => "detail" in w && w.detail);
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of dictionaryKeys) {
    for (const w of await detailWorks(lang)) params.push({ lang, slug: w.slug });
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<{ lang: Language; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const dictionary = await getDictionary(lang);
  const work = (await detailWorks(lang)).find((w) => w.slug === slug);
  if (!work) return {};
  const url = new URL(`/${lang}/projects/${slug}/`, dictionary.meta.baseUrl).href;
  return {
    metadataBase: new URL(dictionary.meta.baseUrl),
    title: `${work.name} - ${dictionary.meta.websiteName}`,
    description: work.summary,
    openGraph: {
      ...sharePreview("home", lang),
      type: "article",
      url,
      siteName: dictionary.meta.websiteName,
      title: work.name,
      description: work.summary,
    },
    twitter: {
      ...sharePreview("home", lang),
      title: work.name,
      description: work.summary,
      site: "@jjmakesapps",
      card: "summary_large_image",
    },
    alternates: { canonical: url },
  };
}

export default async function ProjectPage(props: {
  params: Promise<{ lang: Language; slug: string }>;
}) {
  const { lang, slug } = await props.params;
  const dictionary = await getDictionary(lang);
  const work = (await detailWorks(lang)).find((w) => w.slug === slug);
  if (!work) notFound();

  const muted = "text-zinc-600 dark:text-zinc-400";
  return (
    <article>
      <Link
        href={dictionary.urls.home}
        className="text-[13px] leading-5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← {dictionary.labels.backToHome}
      </Link>

      <p className={`mt-8 text-[13px] leading-5 ${muted}`}>
        {work.roleFit} · {work.year}
      </p>
      <h1 className="page-title mt-1 text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
        {work.name}
      </h1>
      <p className="mt-3 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
        {work.summary}
      </p>

      {work.image && (
        <Image
          src={work.image.src}
          width={work.image.width}
          height={work.image.height}
          sizes="(max-width: 640px) 100vw, 576px"
          priority
          alt={work.image.alt}
          className="mt-8 h-auto w-full rounded-md border border-zinc-200 dark:border-zinc-800"
        />
      )}

      <ul className={`mt-8 list-disc space-y-2 pl-4 text-[15px] leading-7 ${muted}`}>
        {work.evidence.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>

      <p className={`mt-6 text-[13px] leading-5 ${muted}`}>{work.stack.join(" · ")}</p>

      {work.link && (
        <a
          href={work.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1 text-[14px] leading-5 underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
        >
          {dictionary.labels.openProject}
          <span aria-hidden="true">↗</span>
          <span className="sr-only"> {dictionary.labels.opensInNewTab}</span>
        </a>
      )}
    </article>
  );
}
