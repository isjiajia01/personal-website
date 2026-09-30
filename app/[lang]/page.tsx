import { Dictionary, getDictionary } from "@/dictionaries";
import Link from "next/link";
import {
  RiApps2Line as BriefcaseIcon,
  RiCheckLine as CheckIcon,
  RiMailLine as MailIcon,
} from "@remixicon/react";
import {
  PrintedDivider,
  PrintedLabel,
  PrintedSection,
} from "@/components/printed-elements";
import ProjectShot from "@/components/project-shot";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

function getRandomMotto(dictionary: Dictionary) {
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
            <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-printer-ink dark:text-printer-ink-dark sm:text-4xl">
              Jiajia Zhang
            </h1>
            <p className="mt-2 font-mono text-[13px] uppercase tracking-[0.12em] text-printer-ink-muted dark:text-printer-ink-muted-dark">
              {dictionary.labels.brandTagline}
            </p>
            <p className="mt-3 max-w-2xl font-serif text-lg font-medium leading-snug text-printer-ink dark:text-printer-ink-dark sm:text-xl">
              {dictionary.homepage.headline}
            </p>
            <p className="mt-3 max-w-2xl font-serif text-[15px] leading-relaxed text-printer-ink/80 dark:text-printer-ink-dark/80">
              {dictionary.homepage.subline}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Link
                href={dictionary.urls.resume}
                className="inline-flex min-h-11 sm:min-h-9 min-w-11 items-center justify-center bg-printer-accent px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-printer-ink transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-printer-ink dark:bg-printer-accent-dark"
              >
                {dictionary.labels.viewResume}
              </Link>
              <a
                href="mailto:isjiajiazhang@gmail.com"
                className="inline-flex min-h-11 sm:min-h-9 min-w-11 items-center justify-center border border-printer-ink/25 px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-printer-ink transition-colors hover:border-printer-ink/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-printer-ink dark:border-printer-ink-dark/25 dark:text-printer-ink-dark"
              >
                {dictionary.labels.emailMe}
              </a>
              <Link
                href={dictionary.urls.works}
                className="inline-flex min-h-11 sm:min-h-9 min-w-11 items-center px-2 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-printer-ink underline decoration-printer-ink/30 underline-offset-4 hover:decoration-printer-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-printer-ink dark:text-printer-ink-dark"
              >
                {dictionary.labels.seeWork} →
              </Link>
            </div>
            <p className="mt-4 max-w-2xl font-mono text-[11px] uppercase tracking-[0.12em] text-printer-ink-muted dark:text-printer-ink-muted-dark">
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
                className="inline-flex min-h-11 sm:min-h-9 min-w-11 items-center gap-1.5 border border-printer-ink/15 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-printer-ink-muted transition-colors hover:border-printer-accent/40 hover:text-printer-accent-text dark:border-printer-ink-dark/15 dark:text-printer-ink-muted-dark dark:hover:border-printer-accent-dark/40 dark:hover:text-printer-accent-text-dark"
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
            <BriefcaseIcon className="h-2.5 w-2.5" />
            <h2 className="label-text">{dictionary.labels.works}</h2>
          </span>
        }
      >
        <div className="grid gap-3">
          {featuredWorks.map((work) => {
            const card = (
              <div className="portfolio-card-motion group flex min-h-[150px] flex-col gap-3 border border-printer-ink/12 bg-printer-ink/[0.025] p-4 transition-colors hover:border-printer-accent/25 hover:bg-printer-accent/[0.035] dark:border-printer-ink-dark/12 dark:bg-printer-ink-dark/[0.025] dark:hover:border-printer-accent-dark/25">
                {work.image && (
                  <ProjectShot
                    image={work.image}
                    domain={work.domain}
                    priority
                  />
                )}
                <div className="flex items-start gap-3">
                  {!work.image && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-printer-ink/15 bg-printer-ink/5 font-mono text-sm font-bold text-printer-ink dark:border-printer-ink-dark/15 dark:bg-printer-ink-dark/5 dark:text-printer-ink-dark">
                      {work.name[0]}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-mono text-[15px] font-medium text-printer-ink transition-colors group-hover:text-printer-accent-text dark:text-printer-ink-dark dark:group-hover:text-printer-accent-text-dark">
                      {work.name}
                    </h3>
                    <div className="mt-1 line-clamp-1 font-mono text-[11px] text-printer-ink-muted dark:text-printer-ink-muted-dark">
                      {work.roleFit}
                    </div>
                  </div>
                </div>
                <p className="line-clamp-3 font-serif text-[14px] leading-relaxed text-printer-ink/85 dark:text-printer-ink-dark/80">
                  {work.summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {work.stack.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="border border-printer-ink/15 px-2 py-1 font-mono text-[11px] text-printer-ink/75 dark:border-printer-ink-dark/15 dark:text-printer-ink-dark/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );

            if (!work.link || work.link === "#") {
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
          className="mt-4 inline-flex min-h-11 sm:min-h-9 items-center gap-1 font-mono text-[11px] tracking-wider text-printer-accent-text hover:underline dark:text-printer-accent-text-dark"
        >
          {dictionary.labels.viewAllWorkEvidence} →
        </Link>
      </PrintedSection>

      <PrintedDivider style="dashed" />

      <PrintedSection
        label={
          <span className="inline-flex items-center gap-1.5">
            <CheckIcon className="h-2.5 w-2.5" />
            <h2 className="label-text">{dictionary.labels.evidence}</h2>
          </span>
        }
      >
        <p className="mb-4 font-serif text-[14px] leading-relaxed text-printer-ink/85 dark:text-printer-ink-dark/80">
          {dictionary.homepage.evidenceLead}
        </p>
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
            <MailIcon className="h-2.5 w-2.5" />
            <h2 className="label-text">{dictionary.labels.contactMe}</h2>
          </span>
        }
      >
        <p className="font-serif text-[15px] leading-relaxed text-printer-ink/80 dark:text-printer-ink-dark/80">
          {dictionary.homepage.note}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Link
            href={dictionary.urls.resume}
            className="inline-flex min-h-11 sm:min-h-9 min-w-11 items-center justify-center bg-printer-accent px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-printer-ink transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-printer-ink dark:bg-printer-accent-dark"
          >
            {dictionary.labels.viewResume}
          </Link>
          <a
            href="mailto:isjiajiazhang@gmail.com"
            className="inline-flex min-h-11 sm:min-h-9 min-w-11 items-center justify-center border border-printer-ink/25 px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-printer-ink transition-colors hover:border-printer-ink/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-printer-ink dark:border-printer-ink-dark/25 dark:text-printer-ink-dark"
          >
            {dictionary.labels.emailMe}
          </a>
          <Link
            href={dictionary.urls.works}
            className="inline-flex min-h-11 sm:min-h-9 min-w-11 items-center px-2 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-printer-ink underline decoration-printer-ink/30 underline-offset-4 hover:decoration-printer-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-printer-ink dark:text-printer-ink-dark"
          >
            {dictionary.labels.seeWork} →
          </Link>
        </div>
      </PrintedSection>

      <div className="mt-8 border-t border-dotted border-printer-ink/10 pt-4 dark:border-printer-ink-dark/10">
        <div className="flex items-center justify-between">
          <div className="font-mono text-[11px] uppercase tracking-wider text-printer-ink-muted dark:text-printer-ink-muted-dark">
            {dictionary.labels.printedOn} {new Date().toISOString().split("T")[0]}
          </div>
          <PrintedLabel variant="muted">me.zhangjiajia.me</PrintedLabel>
        </div>
      </div>
    </div>
  );
}
