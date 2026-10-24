import { sharePreview } from "@/lib/share-preview";
import { Metadata } from "next";
import { getDictionary, dictionaryKeys, type Language } from "../../dictionaries";
import { getAlternateLanguages } from "@/lib/metadata";
import { generateWebSiteJsonLd } from "@/lib/json-ld";
import { SiteShell } from "../../components/site-shell";
import { SharedRootLayout } from "../shared-root-layout";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return dictionaryKeys.map((lang) => ({ lang }));
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  if (!dictionaryKeys.includes(params.lang as Language)) return {};
  const dictionary = await getDictionary(params.lang);
  return {
    metadataBase: new URL(dictionary.meta.baseUrl),
    title: dictionary.meta.websiteName,
    description: dictionary.meta.motto,
    keywords: dictionary.meta.fillKeywords([]),
    authors: [{ name: "Jiajia", url: dictionary.meta.baseUrl }],
    creator: "Jiajia",
    openGraph: {
      type: "website",
      url: new URL(dictionary.urls.home, dictionary.meta.baseUrl).href,
      siteName: dictionary.meta.websiteName,
      title: dictionary.meta.websiteName,
      description: dictionary.meta.motto,
      ...sharePreview("home", params.lang as Language),
    },
    twitter: {
      title: dictionary.meta.websiteName,
      description: dictionary.meta.motto,
      site: "@isjiajia01",
      card: "summary_large_image",
      ...sharePreview("home", params.lang as Language),
    },
    alternates: {
      canonical: new URL(dictionary.urls.home, dictionary.meta.baseUrl).href,
      languages: await getAlternateLanguages((dictionary) => dictionary.urls.home),
    },
  };
}

export default async function LocalizedRootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  if (!dictionaryKeys.includes(params.lang as Language)) notFound();
  const dictionary = await getDictionary(params.lang);
  return (
    <SharedRootLayout lang={params.lang === "zh" ? "zh-Hans" : "en"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebSiteJsonLd({
            name: dictionary.meta.websiteName,
            alternateName: "Jiajia Zhang",
            url: new URL(dictionary.urls.home, dictionary.meta.baseUrl).href,
            description: dictionary.meta.motto,
          })),
        }}
      />
      <SiteShell
        lang={params.lang}
        authorName={dictionary.meta.authorName}
        labels={{
          skipToContent: dictionary.labels.skipToContent,
          home: dictionary.labels.home,
          works: dictionary.labels.works,
          resume: dictionary.labels.resume,
          about: dictionary.labels.about,
          opensInNewTab: dictionary.labels.opensInNewTab,
        }}
        urls={{ home: dictionary.urls.home, works: dictionary.urls.works, resume: dictionary.urls.resume, about: dictionary.urls.about }}
        contacts={dictionary.contacts.map((c) => ({ label: c.label, link: c.link }))}
      >
        {props.children}
      </SiteShell>
    </SharedRootLayout>
  );
}
