import { getDictionary, type Language } from "@/dictionaries";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

import { Metadata } from "next";
import { getAlternateLanguages } from "@/lib/metadata";
import { PostContent } from "@/components/post-content";

export async function generateMetadata(
  props: {
    params: Promise<{ lang: Language }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const subtitle = dictionary.labels.aboutSubtitle.trim();
  const description = subtitle || dictionary.labels.aboutTitle;

  return {
    metadataBase: new URL(dictionary.meta.baseUrl),
    title: `${dictionary.labels.aboutTitle} - ${dictionary.meta.websiteName}`,
    description,
    keywords: dictionary.meta.fillKeywords([]),
    openGraph: {
      type: "website",
      url: new URL(dictionary.urls.about, dictionary.meta.baseUrl).href,
      siteName: dictionary.meta.websiteName,
      title: dictionary.labels.aboutTitle,
      description,
    },
    twitter: {
      title: dictionary.labels.aboutTitle,
      description,
      site: "@isjiajia01",
      card: "summary_large_image",
    },
    alternates: {
      canonical: new URL(dictionary.urls.about, dictionary.meta.baseUrl).href,
      languages: await getAlternateLanguages(
        (alternateDictionary) => alternateDictionary.urls.about,
      ),
    },
  };
}

export default async function AboutPage(
  props: {
    params: Promise<{
      lang: Language;
    }>;
  }
) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const subtitle = dictionary.labels.aboutSubtitle.trim();

  // Convert markdown-like content to simple HTML
  const aboutHtml = dictionary.aboutContent
    .trim()
    .replace(/### (.+)/g, "<h3>$1</h3>")
    .replace(/## (.+)/g, "<h2>$1</h2>")
    .replace(/# (.+)/g, "<h1>$1</h1>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      `<a href="$2" target="_blank" rel="noopener noreferrer">$1<span aria-hidden="true" class="ml-0.5 inline-block">↗</span><span class="sr-only"> ${dictionary.labels.opensInNewTab}</span></a>`,
    )
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>")
    .replace(/<p><h([123])>/g, "<h$1>")
    .replace(/<\/h([123])><\/p>/g, "</h$1>")
    .replace(/<p><\/p>/g, "");

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="page-title text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
          {dictionary.labels.aboutTitle}
        </h1>
        {subtitle && (
          <p className="mt-1 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
        )}
      </div>

      {/* About content */}
      <div className="mt-10">
        <PostContent html={aboutHtml} />
      </div>

      {/* Footer */}
      <div className="mt-12 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
        {params.lang === "zh" ? "就酱～" : "That's about it~"}
      </div>
    </div>
  );
}
