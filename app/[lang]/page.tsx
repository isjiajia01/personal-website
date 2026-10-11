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
      <h1 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
        {dictionary.meta.authorName}
      </h1>
      <p className="mt-1 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
        {dictionary.meta.motto}
      </p>

      {/* Bio paragraphs */}
      <div className="mt-8 space-y-4 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
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

      {/* Works section */}
      <section className="mt-12">
        <h2 className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {dictionary.labels.works}
        </h2>
        <ul className="mt-3 space-y-0.5">
          {featuredWorks.map((work) => {
            const isExternal = work.link.startsWith("http");
            const rowContent = (
              <>
                <span className="text-[15px] text-zinc-900 dark:text-zinc-100">
                  {work.name}
                  {isExternal && (
                    <>
                      <span
                        aria-hidden="true"
                        className="ml-1 inline-block text-zinc-400 dark:text-zinc-500"
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
                <span className="text-[13px] tabular-nums text-zinc-600 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-400">
                  {work.year}
                </span>
              </>
            );

            return (
              <li key={work.slug || work.name}>
                {isExternal ? (
                  <a
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -mx-2 flex items-baseline justify-between rounded-md px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    {rowContent}
                  </a>
                ) : (
                  <Link
                    href={work.link}
                    className="group -mx-2 flex items-baseline justify-between rounded-md px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    {rowContent}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mt-4">
          <Link
            href={dictionary.urls.works}
            className="text-[13px] leading-5 text-zinc-600 underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:text-zinc-400 dark:decoration-zinc-500 dark:hover:text-zinc-100"
          >
            {dictionary.labels.viewAllWorkEvidence}
          </Link>
        </div>
      </section>
    </div>
  );
}
