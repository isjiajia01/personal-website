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
import ProjectShot from "@/components/project-shot";

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
    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-printer-ink/15 bg-printer-ink/5 font-mono text-lg font-bold text-printer-ink dark:border-printer-ink-dark/15 dark:bg-printer-ink-dark/5 dark:text-printer-ink-dark">
      {name[0]}
    </div>
  );
}

function WorkCard({
  work,
  dictionary,
  compact = false,
  priority = false,
}: {
  work: Awaited<ReturnType<typeof getDictionary>>["works"][number];
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  compact?: boolean;
  priority?: boolean;
}) {
  const isPlaceholder = !work.link || work.link === "#";
  const isExternal = !isPlaceholder && work.link.startsWith("http");
  const hasImage = Boolean(work.image && !compact);

  const cardClasses = isPlaceholder
    ? "border border-printer-ink/12 bg-printer-ink/[0.025] p-4 dark:border-printer-ink-dark/12 dark:bg-printer-ink-dark/[0.025]"
    : "portfolio-card-motion group border border-printer-ink/12 bg-printer-ink/[0.025] p-4 transition-colors hover:border-printer-accent/25 hover:bg-printer-accent/[0.035] dark:border-printer-ink-dark/12 dark:bg-printer-ink-dark/[0.025] dark:hover:border-printer-accent-dark/25";

  const body = (
    <div className={cardClasses}>
      {hasImage && (
        <div className="mb-3">
          <ProjectShot
            image={work.image!}
            domain={work.domain}
            priority={Boolean(work.primary && priority)}
          />
        </div>
      )}
      <div className="flex items-start gap-3">
        {!hasImage && <WorkMark name={work.name} />}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-mono text-sm font-semibold text-printer-ink transition-colors group-hover:text-printer-accent dark:text-printer-ink-dark dark:group-hover:text-printer-accent-dark">
              {work.name}
            </h3>
            {!isPlaceholder &&
              (isExternal ? (
                <ExternalLinkIcon className="h-3 w-3 text-printer-ink-muted dark:text-printer-ink-muted-dark" />
              ) : (
                <ArrowRightIcon className="h-3 w-3 text-printer-ink-muted dark:text-printer-ink-muted-dark" />
              ))}
          </div>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-printer-ink-muted dark:text-printer-ink-muted-dark">
            {work.roleFit}
          </p>
        </div>
      </div>

      <p className="mt-4 font-serif text-[14px] leading-relaxed text-printer-ink/85 dark:text-printer-ink-dark/80">
        {work.summary}
      </p>

      {!compact && (
        <>
          <div className="mt-4">
            <div className="mb-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-printer-ink-muted dark:text-printer-ink-muted-dark">
              <EvidenceIcon className="h-3 w-3" />
              {dictionary.labels.evidence}
            </div>
            <div className="flex flex-col gap-1.5">
              {work.evidence.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-printer-accent dark:bg-printer-accent-dark" />
                  <span className="font-serif text-[14px] leading-relaxed text-printer-ink/80 dark:text-printer-ink-dark/75">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-printer-ink-muted dark:text-printer-ink-muted-dark">
              <StackIcon className="h-3 w-3" />
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
      <PrintedSection className="!mb-8">
        <PrintedPageTitle icon={BriefcaseIcon}>
          {dictionary.labels.works}
        </PrintedPageTitle>
        <p className="max-w-2xl font-serif text-[14px] leading-relaxed text-printer-ink-muted dark:text-printer-ink-muted-dark">
          {dictionary.labels.noocWorks}
        </p>
      </PrintedSection>

      <PrintedSection
        label={
          <span className="inline-flex items-center gap-1.5">
            <StarIcon className="h-3 w-3" />
            <h2 className="label-text">{dictionary.labels.featured}</h2>
          </span>
        }
      >
        <div className="flex flex-col gap-4">
          {coreWorks.map((work) => (
            <WorkCard
              key={work.name}
              work={work}
              dictionary={dictionary}
              priority
            />
          ))}
        </div>
      </PrintedSection>

      {supportingWorks.length > 0 && (
        <>
          <PrintedDivider style="dashed" />
          <PrintedSection
            label={
              <span className="inline-flex items-center gap-1.5">
                <ArchiveBoxIcon className="h-3 w-3" />
                <h2 className="label-text">{dictionary.labels.archive}</h2>
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
