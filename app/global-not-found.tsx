import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { SiteShell } from "../components/site-shell";
import { SharedRootLayout } from "./shared-root-layout";
import NotFound from "./(default)/not-found";

export const metadata: Metadata = {
  title: "Page not found - Jiajia Zhang",
  robots: { index: false },
};

// Used for every unmatched URL (and 404.html on the static export), which would
// otherwise fall back to Next's plain default because the site has no single root layout.
export default async function GlobalNotFound() {
  const dictionary = await getDictionary("en");
  return (
    <SharedRootLayout lang="en">
      <SiteShell
        lang="en"
        hideLanguageSwitch
        authorName={dictionary.meta.authorName}
        labels={{ skipToContent: dictionary.labels.skipToContent, home: dictionary.labels.home, about: dictionary.labels.about, opensInNewTab: dictionary.labels.opensInNewTab }}
        urls={{ home: dictionary.urls.home, about: dictionary.urls.about }}
        contacts={dictionary.contacts.map((contact) => ({ label: contact.label, link: contact.link }))}
      >
        <NotFound />
      </SiteShell>
    </SharedRootLayout>
  );
}
