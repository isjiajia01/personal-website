export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

import { getDictionary } from "@/dictionaries";
import { Metadata } from "next";
import Link from "next/link";
import { getAlternateLanguages } from "@/lib/metadata";
import {
  RiArchiveLine as ArchiveBoxIcon,
  RiApps2Line as BriefcaseIcon,
  RiArrowRightLine as ArrowRightIcon,
  RiExternalLinkLine as ExternalLinkIcon,
  RiShieldCheckLine as EvidenceIcon,
  RiStarLine as StarIcon,
  RiToolsLine as StackIcon,
} from "@remixicon/react";
import {
  PrintedDivider,
  PrintedLabel,
  PrintedPageTitle,
  PrintedSection,
} from "@/components/printed-elements";

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
      type: "website",
      url: new URL(dictionary.urls.works, dictionary.meta.baseUrl).href,
      siteName: dictionary.meta.websiteName,
      title: dictionary.labels.works,
      description: dictionary.labels.noocWorks,
    },
    twitter: {
      title: dictionary.labels.works,
      description: dictionary.labels.noocWorks,
      site: "@isjiajia01",
      card: "summary_large_image",
    },
    alternates: {
      canonical: new URL(dictionary.urls.works, dictionary.meta.baseUrl).href,
      languages: await getAlternateLanguages(
        (dictionary) => dictionary.urls.works,
      ),
    },
  };
}

function WorkMark({ name }: { name: string }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-printer-accent/20 bg-printer-accent/10 font-mono text-lg font-bold text-printer-accent dark:border-printer-accent-dark/20 dark:bg-printer-accent-dark/10 dark:text-printer-accent-dark">
      {name[0]}
    </div>
  );
}

function WorkCard({
  work,
  dictionary,
  compact = false,
}: {
  work: Awaited<ReturnType<typeof getDictionary>>["works"][number];
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  compact?: boolean;
}) {
  const isPlaceholder = work.link === "#";
  const isExternal = work.link.startsWith("http");

  const body = (
    <div className="portfolio-card-motion group rounded-md border border-printer-ink/8 bg-printer-ink/[0.025] p-4 transition-colors hover:border-printer-accent/25 hover:bg-printer-accent/[0.035] dark:border-printer-ink-dark/8 dark:bg-printer-ink-dark/[0.025] dark:hover:border-printer-accent-dark/25">
      <div className="flex items-start gap-3">
        <WorkMark name={work.name} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-mono text-sm font-semibold text-printer-ink transition-colors group-hover:text-printer-accent dark:text-printer-ink-dark dark:group-hover:text-printer-accent-dark">
              {work.name}
            </h2>
            {!isPlaceholder &&
              (isExternal ? (
                <ExternalLinkIcon className="h-3 w-3 text-printer-ink-light dark:text-printer-ink-dark/40" />
              ) : (
                <ArrowRightIcon className="h-3 w-3 text-printer-ink-light dark:text-printer-ink-dark/40" />
              ))}
          </div>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-printer-ink-light dark:text-printer-ink-dark/40">
            {work.roleFit}
          </p>
        </div>
      </div>

      <p className="mt-4 font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55">
        {work.summary}
      </p>

      {!compact && (
        <>
          <div className="mt-4">
            <div className="mb-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-printer-ink-light dark:text-printer-ink-dark/45">
              <EvidenceIcon className="h-2.5 w-2.5" />
              {dictionary.labels.evidence}
            </div>
            <div className="flex flex-col gap-1.5">
              {work.evidence.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-printer-accent dark:bg-printer-accent-dark" />
                  <span className="font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-printer-ink-light dark:text-printer-ink-dark/45">
              <StackIcon className="h-2.5 w-2.5" />
              {dictionary.labels.stack}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {work.stack.map((item) => (
                <PrintedLabel key={item} variant="default">
                  {item}
                </PrintedLabel>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  if (isPlaceholder) return body;

  if (isExternal) {
    return (
      <a href={work.link} target="_blank" rel="noopener noreferrer" className="block">
        {body}
      </a>
    );
  }

  return (
    <Link href={work.link} className="block">
      {body}
    </Link>
  );
}

export default async function WorksPage(
  props: {
    params: Promise<{ lang: string }>;
  }
) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);

  const coreWorks = dictionary.works.filter((work) => work.primary);
  const supportingWorks = dictionary.works.filter((work) => !work.primary);

  return (
    <div>
      <PrintedSection>
        <PrintedPageTitle icon={BriefcaseIcon}>
          {dictionary.labels.works}
        </PrintedPageTitle>
        <p className="max-w-2xl font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/50">
          {dictionary.labels.noocWorks}
        </p>
      </PrintedSection>

      <PrintedSection
        label={
          <span className="inline-flex items-center gap-1.5">
            <StarIcon className="h-2.5 w-2.5" />
            <span className="label-text">{dictionary.labels.featured}</span>
          </span>
        }
      >
        <div className="flex flex-col gap-4">
          {coreWorks.map((work) => (
            <WorkCard key={work!.name} work={work!} dictionary={dictionary} />
          ))}
        </div>
      </PrintedSection>

      {supportingWorks.length > 0 && (
        <>
          <PrintedDivider style="dashed" />
          <PrintedSection
            label={
              <span className="inline-flex items-center gap-1.5">
                <ArchiveBoxIcon className="h-2.5 w-2.5" />
                <span className="label-text">{dictionary.labels.archive}</span>
              </span>
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {supportingWorks.map((work) => (
                <WorkCard key={work.name} work={work} dictionary={dictionary} compact />
              ))}
            </div>
          </PrintedSection>
        </>
      )}
    </div>
  );
}
