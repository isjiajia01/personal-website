import Home from "./[lang]/page";
import { SiteShell } from "../components/site-shell";
import { defaultLanguage, getDictionary } from "../dictionaries";

export default async function RootPage() {
  const dictionary = await getDictionary(defaultLanguage);

  return (
    <SiteShell
      lang={defaultLanguage}
      authorName={dictionary.meta.authorName}
      labels={{
        skipToContent: dictionary.labels.skipToContent,
        home: dictionary.labels.home,
        works: dictionary.labels.works,
        resume: dictionary.labels.resume,
        about: dictionary.labels.about,
        opensInNewTab: dictionary.labels.opensInNewTab,
      }}
      urls={{
        home: dictionary.urls.home,
        works: dictionary.urls.works,
        resume: dictionary.urls.resume,
        about: dictionary.urls.about,
      }}
      contacts={dictionary.contacts.map((c) => ({
        label: c.label,
        link: c.link,
      }))}
    >
      <Home params={Promise.resolve({ lang: defaultLanguage })} />
    </SiteShell>
  );
}
