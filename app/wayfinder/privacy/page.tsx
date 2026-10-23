import type { Metadata } from "next";
import Link from "next/link";

const contactEmail = "isjiajiazhang@gmail.com";

export const metadata: Metadata = {
  title: "Wayfinder Privacy Policy",
  description: "Privacy information for Wayfinder for Safari and Wayfinder for Chrome.",
  alternates: {
    canonical: "https://me.zhangjiajia.me/wayfinder/privacy/",
  },
};

const sections = [
  {
    title: "What Wayfinder does",
    body: [
      "Wayfinder is a browser extension (Safari on Mac, and Chrome) that lets you search your open tabs, saved pages and sessions from one command palette, save a window as a session and restore it later, and optionally replace the new tab page.",
      "The developer operates no server for Wayfinder. There is no account, no analytics, no advertising and no tracking, and the developer never receives your data.",
    ],
  },
  {
    title: "What stays on your device",
    body: [
      "Your sessions, saved pages, settings and the search index are stored locally in the browser's extension storage on your device. Wayfinder reads the titles and addresses of your tabs to list, search and restore them.",
      "Recording visits and indexing page text are off by default. When you turn indexing on, page text is stored only on your device, and private windows, sites you exclude and sensitive sites are never indexed. You can clear the data at any time in Settings; removing the extension removes it.",
    ],
  },
  {
    title: "What can leave your device",
    body: [
      "Site icons: by default Wayfinder asks Google's favicon service (www.google.com/s2/favicons) for a site's icon, which reveals the site's domain name to Google. You can turn this off in Settings (Remote site icons).",
      "Wallpapers: when the start page uses a daily wallpaper, images are downloaded from Wikimedia Commons (commons.wikimedia.org and upload.wikimedia.org). Nothing about you is sent beyond what any image request contains.",
      "Search suggestions: off by default. If you turn them on, the text you type is sent to the search engine you chose.",
      "Sync: off by default. If you turn on WebDAV sync, your data goes to the server you configure. On the Mac app, iCloud sync uses your own iCloud account. The optional synced index carries only a title, address and a short excerpt, never full page text.",
      "Nothing else is transmitted. Wayfinder does not load or run remote code.",
    ],
  },
  {
    title: "Permissions",
    body: [
      "Tabs: to list, switch to, open and restore your tabs and sessions. Access to all websites: to show the command palette on the page you are on and, only if you enable it, to read page text for the local index. Storage: to keep your data on your device. Alarms: for periodic snapshots and optional sync. Context menus and clipboard: for \"Save to Wayfinder\" and copying links. New tab override: for the optional start page.",
    ],
  },
  {
    title: "Children, tracking and advertising",
    body: [
      "Wayfinder contains no advertising, no third-party analytics and no tracking technologies, and it does not knowingly collect personal data from anyone, including children. Your data is not sold or used for purposes unrelated to the extension's single purpose.",
    ],
  },
];

export default function WayfinderPrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0c10] px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-400/80">
          Wayfinder
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-white/70">
          Wayfinder is built so that the developer never sees your data. This policy explains exactly what is stored and what is sent where.
        </p>

        <div className="mt-10 space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="font-serif text-2xl font-medium">{section.title}</h2>
              <div className="mt-3 space-y-3 text-[15px] leading-7 text-white/70">
                {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-6">
          <h2 className="font-serif text-2xl font-medium">Contact</h2>
          <p className="mt-3 leading-7 text-white/70">
            For privacy inquiries or technical questions regarding Wayfinder, contact{" "}
            <a className="text-emerald-300 underline underline-offset-4" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-sm">
          <Link className="text-emerald-300 underline underline-offset-4" href="/wayfinder/support/">
            Wayfinder Support
          </Link>
          <Link className="text-white/65 underline underline-offset-4" href="/">
            Jiajia Zhang
          </Link>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-white/35">
          Effective October 17, 2026
        </p>
      </article>
    </main>
  );
}
