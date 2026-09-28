import { getDictionary } from "@/dictionaries";
import Link from "next/link";
import {
  RiApps2Line as BriefcaseIcon,
  RiCheckLine as CheckIcon,
  RiFocus3Line as FocusIcon,
  RiMailLine as MailIcon,
  RiSparkling2Line as SparkIcon,
} from "@remixicon/react";
import {
  PrintedDivider,
  PrintedLabel,
  PrintedSection,
} from "@/components/printed-elements";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

function getRandomMotto(dictionary: Awaited<ReturnType<typeof getDictionary>>) {
  const mottos = dictionary.meta.mottos?.length
    ? dictionary.meta.mottos
    : [dictionary.meta.motto];
  return mottos[Math.floor(Math.random() * mottos.length)] ?? "";
}

export default async function Home(
  props: {
    params: Promise<{
      lang: string;
    }>;
  }
) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const motto = getRandomMotto(dictionary);
  const featuredWorks = dictionary.works.filter((work) => work.homeFeatured);

  return (
    <div>
      <PrintedSection>
        <div className="flex flex-col gap-5">
          <div>
            <PrintedLabel variant="accent">{dictionary.labels.roleFit}</PrintedLabel>
            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight text-printer-ink dark:text-printer-ink-dark sm:text-4xl">
              Jiajia Zhang
            </h1>
            <p className="mt-3 max-w-2xl font-serif text-lg font-medium leading-snug text-printer-ink dark:text-printer-ink-dark sm:text-xl">
              {dictionary.homepage.headline}
            </p>
            <p className="mt-3 max-w-2xl font-serif text-[15px] leading-relaxed text-printer-ink/80 dark:text-printer-ink-dark/80">
              {dictionary.homepage.subline}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Link
                href={dictionary.urls.resume}
                className="inline-flex min-h-9 items-center justify-center bg-printer-accent px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-white transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-printer-accent dark:bg-printer-accent-dark dark:text-printer-ink-dark"
              >
                {dictionary.labels.viewResume}
              </Link>
              <a
                href="mailto:isjiajiazhang@gmail.com"
                className="inline-flex min-h-9 items-center justify-center border border-printer-ink/25 px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-printer-ink transition-colors hover:border-printer-ink/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-printer-ink dark:border-printer-ink-dark/25 dark:text-printer-ink-dark"
              >
                {dictionary.labels.emailMe}
              </a>
              <Link
                href={dictionary.urls.works}
                className="inline-flex min-h-9 items-center px-1 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-printer-ink underline decoration-printer-ink/30 underline-offset-4 hover:decoration-printer-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-printer-ink dark:text-printer-ink-dark"
              >
                {dictionary.labels.seeWork} →
              </Link>
            </div>
            <p className="mt-4 max-w-2xl font-mono text-[10px] uppercase tracking-[0.22em] text-printer-ink/55 dark:text-printer-ink-dark/50">
              {motto}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {dictionary.contacts.map((contact) => (
              <a
                key={`${contact.label}-${contact.name}`}
                href={contact.link}
                target={contact.link.startsWith("mailto:") ? undefined : "_blank"}
                rel={contact.link.startsWith("mailto:") ? undefined : "noopener"}
                className="inline-flex items-center gap-1.5 border border-printer-ink/15 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-printer-ink/75 transition-colors hover:border-printer-accent/40 hover:text-printer-accent dark:border-printer-ink-dark/15 dark:text-printer-ink-dark/70 dark:hover:border-printer-accent-dark/40 dark:hover:text-printer-accent-dark"
              >
                <contact.icon className="h-3 w-3" />
                {contact.label}
              </a>
            ))}
          </div>
        </div>
      </PrintedSection>

      <PrintedDivider style="dotted" />

      <PrintedSection
        label={
          <span className="inline-flex items-center gap-1.5">
            <FocusIcon className="h-2.5 w-2.5" />
            <span className="label-text">{dictionary.labels.focus}</span>
          </span>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {dictionary.homepage.roleTargets.map((target) => (
            <div
              key={target}
              className="portfolio-card-motion flex items-start gap-2 rounded-md border border-printer-ink/8 bg-printer-ink/3 p-3 dark:border-printer-ink-dark/8 dark:bg-printer-ink-dark/3"
            >
              <SparkIcon className="mt-0.5 h-3 w-3 shrink-0 text-printer-accent dark:text-printer-accent-dark" />
              <span className="font-mono text-[11px] leading-relaxed text-printer-ink/75 dark:text-printer-ink-dark/70">
                {target}
              </span>
            </div>
          ))}
        </div>
      </PrintedSection>

      <PrintedDivider style="dashed" />

      <PrintedSection
        label={
          <span className="inline-flex items-center gap-1.5">
            <CheckIcon className="h-2.5 w-2.5" />
            <span className="label-text">{dictionary.labels.evidence}</span>
          </span>
        }
      >
        <div className="flex flex-col gap-2">
          {dictionary.homepage.proofPoints.map((point) => (
            <div key={point} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-printer-accent dark:bg-printer-accent-dark" />
              <p className="font-serif text-[15px] leading-relaxed text-printer-ink/80 dark:text-printer-ink-dark/80">
                {point}
              </p>
            </div>
          ))}
        </div>
      </PrintedSection>

      <PrintedDivider style="dashed" />

      <PrintedSection
        label={
          <span className="inline-flex items-center gap-1.5">
            <BriefcaseIcon className="h-2.5 w-2.5" />
            <span className="label-text">{dictionary.labels.works}</span>
          </span>
        }
      >
        <div className="grid gap-3">
          {featuredWorks.map((work) => {
            const card = (
              <div className="portfolio-card-motion group flex min-h-[150px] flex-col gap-3 border border-printer-ink/12 bg-printer-ink/[0.025] p-4 transition-colors hover:border-printer-accent/25 hover:bg-printer-accent/[0.035] dark:border-printer-ink-dark/12 dark:bg-printer-ink-dark/[0.025] dark:hover:border-printer-accent-dark/25">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-printer-ink/15 bg-printer-ink/5 font-mono text-sm font-bold text-printer-ink dark:border-printer-ink-dark/15 dark:bg-printer-ink-dark/5 dark:text-printer-ink-dark">
                    {work.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[15px] font-medium text-printer-ink transition-colors group-hover:text-printer-accent dark:text-printer-ink-dark dark:group-hover:text-printer-accent-dark">
                      {work.name}
                    </div>
                    <div className="mt-1 line-clamp-1 font-mono text-[11px] text-printer-ink/70 dark:text-printer-ink-dark/65">
                      {work.roleFit}
                    </div>
                  </div>
                </div>
                <p className="line-clamp-3 font-serif text-[14px] leading-relaxed text-printer-ink/85 dark:text-printer-ink-dark/80">
                  {work.summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {work.stack.slice(0, 3).map((item) => (
                    <span key={item} className="border border-printer-ink/15 px-2 py-1 font-mono text-[10px] text-printer-ink/75 dark:border-printer-ink-dark/15 dark:text-printer-ink-dark/70">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );

            if (work.link === "#") {
              return <div key={work.name}>{card}</div>;
            }

            if (work.link.startsWith("http")) {
              return (
                <a
                  key={work.name}
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {card}
                </a>
              );
            }

            return (
              <Link key={work.name} href={work.link} className="block">
                {card}
              </Link>
            );
          })}
        </div>
        <Link
          href={dictionary.urls.works}
          className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] tracking-wider text-printer-accent hover:underline dark:text-printer-accent-dark"
        >
          {dictionary.labels.viewAllWorkEvidence} →
        </Link>
      </PrintedSection>

      <PrintedDivider style="dashed" />

      <PrintedSection
        label={
          <span className="inline-flex items-center gap-1.5">
            <MailIcon className="h-2.5 w-2.5" />
            <span className="label-text">{dictionary.labels.contactMe}</span>
          </span>
        }
      >
        <p className="font-serif text-[15px] leading-relaxed text-printer-ink/80 dark:text-printer-ink-dark/80">
          {dictionary.homepage.note}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Link
            href={dictionary.urls.resume}
            className="inline-flex min-h-9 items-center justify-center bg-printer-accent px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-white hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-printer-accent dark:bg-printer-accent-dark dark:text-printer-ink-dark"
          >
            {dictionary.labels.viewResume}
          </Link>
          <a
            href="mailto:isjiajiazhang@gmail.com"
            className="inline-flex min-h-9 items-center justify-center border border-printer-ink/25 px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-printer-ink hover:border-printer-ink/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-printer-ink dark:border-printer-ink-dark/25 dark:text-printer-ink-dark"
          >
            {dictionary.labels.emailMe}
          </a>
          <Link
            href={dictionary.urls.works}
            className="inline-flex min-h-9 items-center px-1 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-printer-ink underline decoration-printer-ink/30 underline-offset-4 hover:decoration-printer-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-printer-ink dark:text-printer-ink-dark"
          >
            {dictionary.labels.seeWork} →
          </Link>
        </div>
      </PrintedSection>

      <div className="mt-8 border-t border-dotted border-printer-ink/10 pt-4 dark:border-printer-ink-dark/10">
        <div className="flex items-center justify-between">
          <div className="font-mono text-[9px] uppercase tracking-wider text-printer-ink-light dark:text-printer-ink-dark/30">
            {dictionary.labels.printedOn} {new Date().toISOString().split("T")[0]}
          </div>
          <PrintedLabel variant="muted">me.zhangjiajia.me</PrintedLabel>
        </div>
      </div>
    </div>
  );
}
