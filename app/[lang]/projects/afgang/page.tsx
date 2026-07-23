import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  RiArrowLeftLine as ArrowLeftIcon,
  RiBusLine as BusIcon,
  RiDatabase2Line as DatabaseIcon,
  RiExternalLinkLine as ExternalLinkIcon,
  RiGitMergeLine as LifecycleIcon,
  RiMap2Line as MapIcon,
  RiRouteLine as RouteIcon,
  RiShieldCheckLine as ShieldIcon,
} from "@remixicon/react";
import { getDictionary, Language } from "@/dictionaries";
import { getAlternateLanguages } from "@/lib/metadata";
import {
  PrintedDivider,
  PrintedLabel,
  PrintedPageTitle,
  PrintedSection,
} from "@/components/printed-elements";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export async function generateMetadata(
  props: {
    params: Promise<{ lang: Language }>;
  },
): Promise<Metadata> {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const project = dictionary.afgangCase;

  return {
    metadataBase: new URL(dictionary.meta.baseUrl),
    title: `${project.title} - ${dictionary.meta.websiteName}`,
    description: project.metaDescription,
    keywords: dictionary.meta.fillKeywords([
      "Afgang",
      "GTFS",
      "R5",
      "transport accessibility",
      "geospatial engineering",
    ]),
    openGraph: {
      type: "article",
      url: new URL(dictionary.urls.afgang, dictionary.meta.baseUrl).href,
      siteName: dictionary.meta.websiteName,
      title: project.title,
      description: project.metaDescription,
      images: [
        {
          url: "/images/projects/afgang/reachability-desktop.webp",
          width: 1440,
          height: 900,
          alt: project.imageAlts.reachabilityDesktop,
        },
      ],
    },
    twitter: {
      title: project.title,
      description: project.metaDescription,
      site: "@isjiajia01",
      card: "summary_large_image",
      images: ["/images/projects/afgang/reachability-desktop.webp"],
    },
    alternates: {
      canonical: new URL(dictionary.urls.afgang, dictionary.meta.baseUrl).href,
      languages: await getAlternateLanguages(
        (alternateDictionary) => alternateDictionary.urls.afgang,
      ),
    },
  };
}

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: typeof MapIcon;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="h-2.5 w-2.5" />
      <span className="label-text">{children}</span>
    </span>
  );
}

function FigureCaption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="mt-2 font-mono text-[9px] leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/40">
      {children}
    </figcaption>
  );
}

export default async function AfgangCasePage(
  props: {
    params: Promise<{ lang: Language }>;
  },
) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const project = dictionary.afgangCase;

  return (
    <article>
      <Link
        href={dictionary.urls.works}
        className="mb-5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-printer-ink-light transition-colors hover:text-printer-accent dark:text-printer-ink-dark/45 dark:hover:text-printer-accent-dark"
      >
        <ArrowLeftIcon className="h-3 w-3" />
        {project.backToWorks}
      </Link>

      <PrintedSection>
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-printer-accent dark:text-printer-accent-dark">
          {project.eyebrow}
        </p>
        <PrintedPageTitle icon={BusIcon}>{project.title}</PrintedPageTitle>
        <p className="mt-3 max-w-2xl font-serif text-sm leading-relaxed text-printer-ink dark:text-printer-ink-dark/80">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.status.map((status, index) => (
            <PrintedLabel key={status} variant={index === 0 ? "accent" : "default"}>
              {status}
            </PrintedLabel>
          ))}
        </div>
      </PrintedSection>

      <figure className="mb-8">
        <Image
          src="/images/projects/afgang/reachability-desktop.webp"
          width={1440}
          height={900}
          sizes="(max-width: 760px) 100vw, 720px"
          priority
          alt={project.imageAlts.reachabilityDesktop}
          className="h-auto w-full border border-printer-ink/10 dark:border-printer-ink-dark/10"
        />
        <FigureCaption>{project.imageCaptions.reachability}</FigureCaption>
      </figure>

      <div className="mb-8 grid grid-cols-2 border-y border-printer-ink/10 dark:border-printer-ink-dark/10 sm:grid-cols-4">
        {project.metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`px-3 py-4 ${index % 2 === 0 ? "border-r" : ""} ${index > 1 ? "border-t sm:border-t-0" : ""} border-printer-ink/10 dark:border-printer-ink-dark/10 sm:border-r sm:last:border-r-0`}
          >
            <div className="font-mono text-xl font-semibold text-printer-accent dark:text-printer-accent-dark">
              {metric.value}
            </div>
            <div className="mt-1 font-serif text-[11px] leading-snug text-printer-ink-light dark:text-printer-ink-dark/50">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      <PrintedSection
        label={<SectionLabel icon={RouteIcon}>{project.sectionLabels.outcome}</SectionLabel>}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {project.outcome.map((paragraph) => (
            <p
              key={paragraph}
              className="font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </PrintedSection>

      <PrintedDivider style="dashed" />

      <PrintedSection
        label={<SectionLabel icon={DatabaseIcon}>{project.sectionLabels.system}</SectionLabel>}
      >
        <p className="max-w-2xl font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55">
          {project.systemIntro}
        </p>
        <ol className="mt-5 border-y border-printer-ink/10 dark:border-printer-ink-dark/10">
          {project.systemFlow.map((step, index) => (
            <li
              key={step}
              className="flex items-center gap-3 border-b border-printer-ink/8 py-3 last:border-b-0 dark:border-printer-ink-dark/8"
            >
              <span className="font-mono text-[9px] text-printer-accent dark:text-printer-accent-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[11px] leading-relaxed text-printer-ink/75 dark:text-printer-ink-dark/70">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </PrintedSection>

      <PrintedSection
        label={<SectionLabel icon={ShieldIcon}>{project.sectionLabels.decisions}</SectionLabel>}
      >
        <div className="border-y border-printer-ink/10 dark:border-printer-ink-dark/10">
          {project.decisions.map((decision) => (
            <div
              key={decision.title}
              className="grid gap-2 border-b border-printer-ink/8 py-4 last:border-b-0 dark:border-printer-ink-dark/8 sm:grid-cols-[12rem_1fr] sm:gap-5"
            >
              <h2 className="font-mono text-[11px] font-semibold leading-relaxed text-printer-ink dark:text-printer-ink-dark">
                {decision.title}
              </h2>
              <p className="font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55">
                {decision.body}
              </p>
            </div>
          ))}
        </div>
      </PrintedSection>

      <PrintedSection
        label={<SectionLabel icon={LifecycleIcon}>{project.sectionLabels.lifecycle}</SectionLabel>}
      >
        <p className="font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55">
          {project.lifecycleIntro}
        </p>
        <ol className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
          {project.lifecycle.map((step, index) => (
            <li key={step} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-printer-accent/25 font-mono text-[9px] text-printer-accent dark:border-printer-accent-dark/25 dark:text-printer-accent-dark">
                {index + 1}
              </span>
              <span className="font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </PrintedSection>

      <PrintedDivider style="dotted" />

      <PrintedSection
        label={<SectionLabel icon={ShieldIcon}>{project.sectionLabels.validation}</SectionLabel>}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <p className="font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55">
            {project.validationIntro}
          </p>
          <p className="border-l-2 border-printer-accent pl-4 font-serif text-xs leading-relaxed text-printer-ink dark:border-printer-accent-dark dark:text-printer-ink-dark/75">
            {project.validationDetail}
          </p>
        </div>
      </PrintedSection>

      <PrintedSection
        label={<SectionLabel icon={MapIcon}>{project.sectionLabels.interface}</SectionLabel>}
      >
        <p className="mb-5 max-w-2xl font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55">
          {project.interfaceBody}
        </p>
        <div className="grid items-start gap-5 sm:grid-cols-[1fr_13rem]">
          <figure>
            <Image
              src="/images/projects/afgang/commute-desktop.webp"
              width={1440}
              height={900}
              sizes="(max-width: 640px) 100vw, 500px"
              alt={project.imageAlts.commuteDesktop}
              className="h-auto w-full border border-printer-ink/10 dark:border-printer-ink-dark/10"
            />
            <FigureCaption>{project.imageCaptions.commute}</FigureCaption>
          </figure>
          <figure>
            <Image
              src="/images/projects/afgang/reachability-mobile.webp"
              width={390}
              height={844}
              sizes="(max-width: 640px) 70vw, 208px"
              alt={project.imageAlts.reachabilityMobile}
              className="mx-auto h-auto w-full max-w-[17rem] border border-printer-ink/10 dark:border-printer-ink-dark/10"
            />
            <FigureCaption>{project.imageCaptions.mobile}</FigureCaption>
          </figure>
        </div>
      </PrintedSection>

      <PrintedDivider style="solid" />

      <PrintedSection
        label={<SectionLabel icon={ShieldIcon}>{project.sectionLabels.boundaries}</SectionLabel>}
      >
        <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {project.limits.map((limit) => (
            <li key={limit} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 bg-printer-accent dark:bg-printer-accent-dark" />
              <span className="font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55">
                {limit}
              </span>
            </li>
          ))}
        </ul>
      </PrintedSection>

      <PrintedSection
        label={<SectionLabel icon={DatabaseIcon}>{project.sectionLabels.sources}</SectionLabel>}
      >
        <p className="font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55">
          {project.sourceIntro}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {[
            {
              label: project.sourceLinks.rejseplanen,
              href: "https://labs.rejseplanen.dk/hc/en-us/articles/21639730766877-Om-GTFS-Schedule-Static",
            },
            {
              label: project.sourceLinks.openStreetMap,
              href: "https://www.openstreetmap.org/copyright",
            },
            {
              label: project.sourceLinks.openFreeMap,
              href: "https://openfreemap.org/",
            },
            {
              label: project.sourceLinks.openMapTiles,
              href: "https://openmaptiles.org/",
            },
          ].map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] text-printer-accent hover:underline dark:text-printer-accent-dark"
            >
              {source.label}
              <ExternalLinkIcon className="h-3 w-3" />
            </a>
          ))}
        </div>
      </PrintedSection>
    </article>
  );
}
