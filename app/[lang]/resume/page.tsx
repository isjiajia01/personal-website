import { Metadata } from "next";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

import { getDictionary, type Language } from "@/dictionaries";
import { getAlternateLanguages } from "@/lib/metadata";
import { resumeContent } from "@/lib/resume";

const routePath = (lang: Language) => `/${lang}/resume`;

export async function generateMetadata(
  props: {
    params: Promise<{ lang: Language }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const content = resumeContent[params.lang];
  const canonical = new URL(routePath(params.lang), dictionary.meta.baseUrl).href;

  return {
    metadataBase: new URL(dictionary.meta.baseUrl),
    title: `${content.pageTitle} - ${dictionary.meta.websiteName}`,
    description: content.summary,
    keywords: dictionary.meta.fillKeywords(["resume", "cv"]),
    openGraph: {
      type: "website",
      url: canonical,
      siteName: dictionary.meta.websiteName,
      title: content.pageTitle,
      description: content.summary,
    },
    twitter: {
      title: content.pageTitle,
      description: content.summary,
      site: "@isjiajia01",
      card: "summary_large_image",
    },
    alternates: {
      canonical,
      languages: await getAlternateLanguages((_, lang) => routePath(lang)),
    },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
  };
}

export default async function ResumePage(
  props: {
    params: Promise<{
      lang: Language;
    }>;
  }
) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const content = resumeContent[params.lang];

  return (
    <div>
      <h1 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
        {content.pageTitle}
      </h1>

      <div className="mt-4">
        <h2 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
          {content.name}
        </h2>
        <p className="mt-2 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
          {content.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {content.contacts.map((contact) => {
            const isExternal = contact.href.startsWith("https://");
            const isMail = contact.href.startsWith("mailto:");
            return (
              <a
                key={contact.label}
                href={contact.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <span className="text-zinc-600 dark:text-zinc-400">
                  {contact.label}:{" "}
                </span>
                <span className="text-zinc-900 underline decoration-zinc-400 underline-offset-[3px] dark:text-zinc-100 dark:decoration-zinc-500">
                  {contact.value}
                </span>
                {isExternal && !isMail && (
                  <>
                    <span
                      aria-hidden="true"
                      className="ml-0.5 inline-block text-zinc-400 dark:text-zinc-500"
                    >
                      ↗
                    </span>
                    <span className="sr-only">
                      {" "}
                      {dictionary.labels.opensInNewTab}
                    </span>
                  </>
                )}
              </a>
            );
          })}
        </div>
      </div>

      {/* Preferences section */}
      <section className="mt-16">
        <h2 className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {content.sectionLabels.preferences}
        </h2>
        <div className="mt-4 space-y-3">
          {content.preferenceGroups.map((group) => (
            <div
              key={group.label}
              className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4"
            >
              <span className="w-32 shrink-0 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
                {group.label}
              </span>
              <span className="text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
                {group.items.join(" · ")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience section */}
      <section className="mt-16">
        <h2 className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {content.sectionLabels.experience}
        </h2>
        <div className="mt-6 space-y-8">
          {content.experiences.map((experience) => (
            <div
              key={`${experience.role}-${experience.period}`}
              className="border-t border-zinc-200 pt-6 first:border-t-0 first:pt-0 dark:border-zinc-800"
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
                    {experience.role}
                  </h3>
                  <p className="mt-0.5 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
                    {experience.organization}
                    {experience.location ? ` · ${experience.location}` : ""}
                  </p>
                </div>
                <span className="text-[13px] tabular-nums text-zinc-600 dark:text-zinc-400">
                  {experience.period}
                </span>
              </div>

              <p className="mt-2 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
                {experience.summary}
              </p>

              <div className="mt-4 space-y-4">
                {experience.projects.map((project) => (
                  <div key={project.name}>
                    <div className="flex items-baseline gap-2">
                      {project.href ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[15px] font-medium text-zinc-900 underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:text-zinc-100 dark:decoration-zinc-500 dark:hover:text-zinc-100"
                        >
                          {project.name}
                          <span
                            aria-hidden="true"
                            className="ml-0.5 inline-block text-zinc-400 dark:text-zinc-500"
                          >
                            ↗
                          </span>
                          <span className="sr-only">
                            {" "}
                            {dictionary.labels.opensInNewTab}
                          </span>
                        </a>
                      ) : (
                        <span className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
                          {project.name}
                        </span>
                      )}
                      {project.note && (
                        <span className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
                          {project.note}
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
                      {project.description}
                    </p>

                    <p className="mt-1 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
                      {project.stack.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills section */}
      <section className="mt-16">
        <h2 className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {content.sectionLabels.skills}
        </h2>
        <div className="mt-4 space-y-3">
          {content.skillGroups.map((group) => (
            <div
              key={group.label}
              className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4"
            >
              <span className="w-32 shrink-0 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
                {group.label}
              </span>
              <span className="text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
                {group.items.join(" · ")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Education section */}
      <section className="mt-16">
        <h2 className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          {content.sectionLabels.education}
        </h2>
        <div className="mt-4 flex items-baseline justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <div>
            <h3 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
              {content.education.school}
            </h3>
            <p className="mt-0.5 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
              {content.education.degree}
              {content.education.location ? ` · ${content.education.location}` : ""}
            </p>
          </div>
          <span className="text-[13px] tabular-nums text-zinc-600 dark:text-zinc-400">
            {content.education.period}
          </span>
        </div>
      </section>
    </div>
  );
}
