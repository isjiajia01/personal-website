import { getDictionary } from "../../dictionaries";
import { SiteShell } from "../../components/site-shell";
import { SharedRootLayout } from "../shared-root-layout";

export const metadata = {
  title: "Jiajia Zhang",
  description: "Junior product/full-stack candidate for internal tools and workflow systems.",
};

export default async function DefaultRootLayout({ children }: { children: React.ReactNode }) {
  const dictionary = await getDictionary("en");
  return (
    <SharedRootLayout lang="en">
      <SiteShell
        lang="en"
        authorName={dictionary.meta.authorName}
        labels={{ skipToContent: dictionary.labels.skipToContent, home: dictionary.labels.home, works: dictionary.labels.works, resume: dictionary.labels.resume, about: dictionary.labels.about, opensInNewTab: dictionary.labels.opensInNewTab }}
        urls={{ home: dictionary.urls.home, works: dictionary.urls.works, resume: dictionary.urls.resume, about: dictionary.urls.about }}
        contacts={dictionary.contacts.map((contact) => ({ label: contact.label, link: contact.link }))}
      >
        {children}
      </SiteShell>
    </SharedRootLayout>
  );
}
