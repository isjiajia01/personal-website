import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getDictionary, type Language } from "@/dictionaries";
import { getAlternateLanguages } from "@/lib/metadata";

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

export default async function AfgangCasePage(
  props: {
    params: Promise<{ lang: Language }>;
  },
) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const project = dictionary.afgangCase;

  const sources = [
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
  ];

  return (
    <article>
      {/* Back link */}
      <Link
        href={dictionary.urls.works}
        className="text-[13px] leading-5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← {project.backToWorks}
      </Link>

      {/* Eyebrow */}
      <p className="mt-8 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
        {project.eyebrow}
      </p>

      {/* Title */}
      <h1 className="mt-1 text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
        {project.title}
      </h1>

      {/* Summary */}
      <p className="mt-3 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
        {project.summary}
      </p>

      {/* Status joined ' · ' */}
      <p className="mt-3 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
        {project.status.join(" · ")}
      </p>

      {/* Hero figure */}
      <figure className="mt-8">
        <Image
          src="/images/projects/afgang/reachability-desktop.webp"
          width={1440}
          height={900}
          sizes="(max-width: 640px) 100vw, 576px"
          priority
          alt={project.imageAlts.reachabilityDesktop}
          className="h-auto w-full rounded-md border border-zinc-200 dark:border-zinc-800"
        />
        <figcaption className="mt-2 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {project.imageCaptions.reachability}
        </figcaption>
      </figure>

      {/* Metrics DL grid */}
      <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-zinc-200 py-4 dark:border-zinc-800 sm:grid-cols-4">
        {project.metrics.map((metric) => (
          <div key={metric.label}>
            <dt className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
              {metric.label}
            </dt>
            <dd className="mt-1 text-[15px] font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Outcome section */}
      <section className="mt-16">
        <h2 className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {project.sectionLabels.outcome}
        </h2>
        <div className="mt-4 space-y-4 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
          {project.outcome.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* System section */}
      <section className="mt-16">
        <h2 className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {project.sectionLabels.system}
        </h2>
        <p className="mt-4 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
          {project.systemIntro}
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-4 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
          {project.systemFlow.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      {/* Decisions section */}
      <section className="mt-16">
        <h2 className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {project.sectionLabels.decisions}
        </h2>
        <div className="mt-6 space-y-6">
          {project.decisions.map((decision) => (
            <div key={decision.title}>
              <h3 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
                {decision.title}
              </h3>
              <p className="mt-2 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
                {decision.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Lifecycle section */}
      <section className="mt-16">
        <h2 className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {project.sectionLabels.lifecycle}
        </h2>
        <p className="mt-4 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
          {project.lifecycleIntro}
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-4 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
          {project.lifecycle.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      {/* Validation section */}
      <section className="mt-16">
        <h2 className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {project.sectionLabels.validation}
        </h2>
        <div className="mt-4 space-y-4 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
          <p>{project.validationIntro}</p>
          <p>{project.validationDetail}</p>
        </div>
      </section>

      {/* Interface section */}
      <section className="mt-16">
        <h2 className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {project.sectionLabels.interface}
        </h2>
        <p className="mt-4 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
          {project.interfaceBody}
        </p>
        <div className="mt-6 space-y-6">
          <figure>
            <Image
              src="/images/projects/afgang/commute-desktop.webp"
              width={1440}
              height={900}
              sizes="(max-width: 640px) 100vw, 576px"
              alt={project.imageAlts.commuteDesktop}
              className="h-auto w-full rounded-md border border-zinc-200 dark:border-zinc-800"
            />
            <figcaption className="mt-2 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
              {project.imageCaptions.commute}
            </figcaption>
          </figure>
          <figure>
            <Image
              src="/images/projects/afgang/reachability-mobile.webp"
              width={390}
              height={844}
              sizes="(max-width: 640px) 70vw, 240px"
              alt={project.imageAlts.reachabilityMobile}
              className="mx-auto h-auto w-full max-w-[16rem] rounded-md border border-zinc-200 dark:border-zinc-800"
            />
            <figcaption className="mt-2 text-center text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
              {project.imageCaptions.mobile}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Boundaries section */}
      <section className="mt-16">
        <h2 className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {project.sectionLabels.boundaries}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-4 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
          {project.limits.map((limit, index) => (
            <li key={index}>{limit}</li>
          ))}
        </ul>
      </section>

      {/* Sources section */}
      <section className="mt-16">
        <h2 className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {project.sectionLabels.sources}
        </h2>
        <p className="mt-4 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
          {project.sourceIntro}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {sources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] leading-5 underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
            >
              {source.label}
              <span aria-hidden="true">↗</span>
              <span className="sr-only">
                {" "}
                {dictionary.labels.opensInNewTab}
              </span>
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
