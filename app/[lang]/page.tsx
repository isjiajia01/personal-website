import { getDictionary, Language } from "@/dictionaries";
import Link from "next/link";
import { OrgLink } from "@/components/org-link";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export default async function Home(props: {
  params: Promise<{
    lang: Language;
  }>;
}) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const featuredWorks = dictionary.works.filter((work) => work.homeFeatured);

  return (
    <div>
      <h1 className="page-title">{dictionary.meta.authorName}</h1>

      {/* Positioning + bio */}
      <div className="mt-10 space-y-5 text-[16px] leading-(--leading-body) text-stone-600 dark:text-zinc-300 sm:mt-12">
        <p className="text-stone-800 dark:text-zinc-100">{dictionary.meta.motto}</p>
        {dictionary.homepage.bioParagraphs.map((paragraph, pIdx) => (
          <p key={pIdx}>
            {paragraph.map((token, tIdx) => {
              if (token.type === "org") {
                return (
                  <OrgLink
                    key={token.id || tIdx}
                    id={token.id}
                    name={token.name}
                    href={token.href}
                    description={token.description}
                    opensInNewTab={dictionary.labels.opensInNewTab}
                  />
                );
              }
              return <span key={tIdx}>{token.value}</span>;
            })}
          </p>
        ))}
      </div>

      {/* Work index: title · dotted leader · year, then the real summary. Rows own their stagger. */}
      <section className="rise-own mt-14" aria-labelledby="home-work">
        <h2 id="home-work" className="sr-only">
          {dictionary.labels.works}
        </h2>
        <ul className="-mx-3 space-y-1">
          {featuredWorks.map((work, index) => {
            const isExternal = work.link.startsWith("http");
            const rowClass =
              "work-row group block rounded-md px-3 py-3 hover:bg-stone-50 dark:hover:bg-zinc-800/60";
            const rowContent = (
              <>
                <span className="flex items-baseline gap-3">
                  <span className="work-title project-title text-stone-800 dark:text-zinc-100">
                    {work.name}
                    {isExternal && (
                      <>
                        <span
                          aria-hidden="true"
                          className="link-arrow ml-1 text-[0.7em] text-stone-400 dark:text-zinc-500"
                        >
                          ↗
                        </span>
                        <span className="sr-only">
                          {" "}
                          {dictionary.labels.opensInNewTab}
                        </span>
                      </>
                    )}
                  </span>
                  <span className="leader" aria-hidden="true" />
                  <span className="text-[14px] tabular-nums text-stone-500 dark:text-zinc-400">
                    {work.year}
                  </span>
                </span>
                <span className="mt-1 block text-[14px] leading-6 text-stone-500 dark:text-zinc-400">
                  {work.summary}
                </span>
              </>
            );
            const style = { "--i": 4 + index } as React.CSSProperties;

            return (
              <li key={work.slug || work.name} className="rise" style={style}>
                {isExternal ? (
                  <a
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={rowClass}
                  >
                    {rowContent}
                  </a>
                ) : (
                  <Link href={work.link} className={rowClass}>
                    {rowContent}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div
          className="rise mt-5"
          style={{ "--i": 4 + featuredWorks.length } as React.CSSProperties}
        >
          <Link
            href={dictionary.urls.works}
            className="group press inline-block px-2 py-2 -mx-2 text-[14px] leading-5 text-stone-500 underline decoration-stone-300 underline-offset-[3px] hover:text-(--rose) hover:decoration-(--rose) active:text-(--rose) dark:text-zinc-400 dark:decoration-zinc-600"
          >
            {dictionary.labels.viewAllWorkEvidence}
            <span aria-hidden="true" className="link-arrow ml-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
