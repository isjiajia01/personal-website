import { sharePreview } from "@/lib/share-preview";
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

import { getDictionary, type Language } from "@/dictionaries";
import { Metadata } from "next";
import Link from "next/link";
import { getAlternateLanguages } from "@/lib/metadata";

export async function generateMetadata(
  props: {
    params: Promise<{ lang: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);

  return {
    metadataBase: new URL(dictionary.meta.baseUrl),
    title: `${dictionary.labels.works} - ${dictionary.meta.websiteName}`,
    description: dictionary.labels.noocWorks,
    keywords: dictionary.meta.fillKeywords(["portfolio", "projects", "work evidence"]),
    openGraph: {
      ...sharePreview("works", params.lang as Language),
      type: "website",
      url: new URL(dictionary.urls.works, dictionary.meta.baseUrl).href,
      siteName: dictionary.meta.websiteName,
      title: dictionary.labels.works,
      description: dictionary.labels.noocWorks,
    },
    twitter: {
      ...sharePreview("works", params.lang as Language),
      title: dictionary.labels.works,
      description: dictionary.labels.noocWorks,
      site: "@jjmakesapps",
      card: "summary_large_image",
    },
    alternates: {
      canonical: new URL(dictionary.urls.works, dictionary.meta.baseUrl).href,
      languages: await getAlternateLanguages(
        (alternateDictionary) => alternateDictionary.urls.works,
      ),
    },
  };
}

function WorkArticle({
  work,
  labels,
}: {
  work: {
    slug: string;
    name: string;
    year: string;
    summary: string;
    roleFit: string;
    evidence: string[];
    stack: string[];
    link: string;
  };
  labels: {
    openProject: string;
    opensInNewTab: string;
  };
}) {
  const isExternal = work.link.startsWith("http");

  return (
    <article
      id={work.slug}
      className="scroll-mt-24 border-t border-zinc-200 py-8 dark:border-zinc-800"
    >
      <div className="flex items-baseline justify-between">
        <h3 className="project-title text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
          {work.name}
        </h3>
        <span className="text-[13px] tabular-nums text-zinc-600 dark:text-zinc-400">
          {work.year}
        </span>
      </div>

      <p className="mt-2 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
        {work.summary}
      </p>

      <p className="mt-1 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
        {work.roleFit}
      </p>

      <ul className="mt-3 list-disc space-y-1 pl-4 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
        {work.evidence.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      <p className="mt-3 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
        {work.stack.join(" · ")}
      </p>

      <div className="mt-4">
        {isExternal ? (
          <a
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[13px] leading-5 underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
          >
            {labels.openProject}
            <span aria-hidden="true">↗</span>
            <span className="sr-only"> {labels.opensInNewTab}</span>
          </a>
        ) : (
          <Link
            href={work.link}
            className="inline-flex items-center gap-1 text-[13px] leading-5 underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
          >
            {labels.openProject}
          </Link>
        )}
      </div>
    </article>
  );
}

export default async function WorksPage(
  props: {
    params: Promise<{ lang: Language }>;
  }
) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);

  const coreWorks = dictionary.works.filter((work) => work.primary);
  const supportingWorks = dictionary.works.filter((work) => !work.primary);

  return (
    <div>
      <h1 className="page-title text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
        {dictionary.labels.works}
      </h1>
      <p className="mt-2 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
        {dictionary.labels.noocWorks}
      </p>

      {/* Featured section */}
      <section className="mt-12">
        <h2 className="mb-4 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {dictionary.labels.featured}
        </h2>
        <div>
          {coreWorks.map((work) => (
            <WorkArticle
              key={work.slug || work.name}
              work={work}
              labels={{
                openProject: dictionary.labels.openProject,
                opensInNewTab: dictionary.labels.opensInNewTab,
              }}
            />
          ))}
        </div>
      </section>

      {/* Archive section */}
      {supportingWorks.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
            {dictionary.labels.archive}
          </h2>
          <div>
            {supportingWorks.map((work) => (
              <WorkArticle
                key={work.slug || work.name}
                work={work}
                labels={{
                  openProject: dictionary.labels.openProject,
                  opensInNewTab: dictionary.labels.opensInNewTab,
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
