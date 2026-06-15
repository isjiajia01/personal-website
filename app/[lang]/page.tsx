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
  const featuredWorks = dictionary.works.filter((work) => work.primary).slice(0, 4);

  return (
    <div>
      <PrintedSection>
        <div className="flex flex-col gap-5">
          <div>
            <PrintedLabel variant="accent">{dictionary.labels.roleFit}</PrintedLabel>
            <h1 className="mt-4 font-serif text-2xl font-bold leading-tight tracking-tight text-printer-ink dark:text-printer-ink-dark sm:text-3xl">
              Jiajia Zhang
            </h1>
            <p className="mt-3 max-w-2xl font-serif text-sm leading-relaxed text-printer-ink dark:text-printer-ink-dark/80">
              {dictionary.homepage.headline}
            </p>
            <p className="mt-2 max-w-2xl font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55">
              {dictionary.homepage.subline}
            </p>
            <p className="mt-3 max-w-2xl font-mono text-[10px] uppercase tracking-[0.22em] text-printer-ink-light dark:text-printer-ink-dark/40">
              {motto}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {dictionary.contacts.map((contact) => (
              <a
                key={`${contact.label}-${contact.name}`}
                href={contact.link}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 rounded-sm border border-printer-ink/8 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-printer-ink-light transition-colors hover:border-printer-accent/20 hover:text-printer-accent dark:border-printer-ink-dark/8 dark:text-printer-ink-dark/50 dark:hover:border-printer-accent-dark/20 dark:hover:text-printer-accent-dark"
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
              className="flex items-start gap-2 rounded-md border border-printer-ink/8 bg-printer-ink/3 p-3 dark:border-printer-ink-dark/8 dark:bg-printer-ink-dark/3"
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
              <p className="font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55">
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
        <div className="grid gap-3 sm:grid-cols-2">
          {featuredWorks.map((work) => (
            <a
              key={work.name}
              href={work.link}
              target="_blank"
              rel="noopener"
              className="group flex min-h-[132px] flex-col gap-3 rounded-md border border-printer-ink/8 bg-printer-ink/[0.025] p-3 transition-colors hover:border-printer-accent/25 hover:bg-printer-accent/[0.035] dark:border-printer-ink-dark/8 dark:bg-printer-ink-dark/[0.025] dark:hover:border-printer-accent-dark/25"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-printer-accent/20 bg-printer-accent/10 font-mono text-sm font-bold text-printer-accent dark:border-printer-accent-dark/20 dark:bg-printer-accent-dark/10 dark:text-printer-accent-dark">
                  {work.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-sm font-medium text-printer-ink transition-colors group-hover:text-printer-accent dark:text-printer-ink-dark dark:group-hover:text-printer-accent-dark">
                    {work.name}
                  </div>
                  <div className="mt-0.5 line-clamp-1 font-mono text-[10px] text-printer-ink-light dark:text-printer-ink-dark/40">
                    {work.roleFit}
                  </div>
                </div>
              </div>
              <p className="line-clamp-3 font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55">
                {work.summary}
              </p>
            </a>
          ))}
        </div>
        <Link
          href={dictionary.urls.works}
          className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] tracking-wider text-printer-accent hover:underline dark:text-printer-accent-dark"
        >
          {params.lang === "zh" ? "查看完整项目证据" : "VIEW PROJECT EVIDENCE"} →
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
        <p className="font-serif text-xs leading-relaxed text-printer-ink-light dark:text-printer-ink-dark/55">
          {dictionary.homepage.note}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href={dictionary.urls.resume}>
            <PrintedLabel variant="accent">{dictionary.labels.resume}</PrintedLabel>
          </Link>
          <Link href={dictionary.urls.about}>
            <PrintedLabel variant="default">{dictionary.labels.about}</PrintedLabel>
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
