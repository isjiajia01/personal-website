import type { Metadata } from "next";
import Link from "next/link";

const contactEmail = "isjiajiazhang@gmail.com";

export const metadata: Metadata = {
  title: "Ordbro Privacy Policy",
  description: "Privacy information for Ordbro, the Safari extension that translates web pages and video subtitles.",
  alternates: {
    canonical: "https://me.isjia.page/undertekst/privacy/",
  },
};

const sections = [
  {
    title: "What Ordbro does",
    body: [
      "Ordbro is a Safari extension that translates web pages and video subtitles into the language you choose. It translates page text where you allow it, and on supported video sites it reads the subtitle track the site's own player already uses, translates the lines and shows them in a caption layer of its own.",
      "The developer operates no server for Ordbro. There is no account, no analytics, no advertising and no tracking, and the developer never receives your data.",
    ],
  },
  {
    title: "What leaves your Mac",
    body: [
      "Page translation sends the visible text of the page you asked Ordbro to translate, in batches, together with a little surrounding context (the page title, a nearby heading and previously translated lines) so names, pronouns and meaning stay consistent.",
      "Video subtitle translation sends the subtitle lines to be translated, in batches of up to 40 cues with a few preceding and following cues for context, plus the programme title and, where the site provides one, a short synopsis.",
      "In both cases the text goes to the translation service you selected in Ordbro's Settings — for example OpenAI, Google Gemini, Anthropic Claude, DeepSeek, DeepL, Google Cloud Translation, Azure Translator, Baidu, Youdao, Tencent, or a service or local model you configure yourself. Requests carry your own API key and are handled under that provider's terms and privacy policy.",
      "On a supported video site, the extension contacts the site's own subtitle services the same way its player does (for DRTV, dr-massive.com and DR's CDN). These requests are anonymous and carry no cookies. Ordbro does not send the site any information about you.",
      "Nothing else is transmitted. Ordbro does not collect or send your browsing history, identifiers, location or device information.",
    ],
  },
  {
    title: "What stays on your Mac",
    body: [
      "Your settings, your API key and the cache of translated pages and subtitles are stored locally in Safari's extension storage and IndexedDB on your Mac. The cache is limited in size and age and can be cleared at any time from the extension's Settings page. Removing the extension removes this data.",
      "Your API key is used only to authenticate requests to the provider you selected. It is never logged and never sent anywhere else.",
    ],
  },
  {
    title: "Permissions",
    body: [
      "Ordbro asks for access to the sites it recognises as video sites, so it can detect the player and read its subtitles, and to the hosts those players use for subtitle files. It asks for access to the translation provider hosts named in the extension so it can send your translation requests. It uses extension storage to keep your settings.",
      "It reads other websites only when you grant access to them, and it does not read or change any site you have not allowed.",
    ],
  },
  {
    title: "Purchases",
    body: [
      "Ordbro Pro is bought through the App Store as an in-app purchase. Apple processes the payment; the developer receives no payment details and no information about who bought it. The app only checks, on your Mac, whether the current Apple Account owns the purchase.",
    ],
  },
  {
    title: "Children, tracking and advertising",
    body: [
      "Ordbro contains no advertising, no third-party analytics and no tracking technologies, and it does not knowingly collect any personal data from anyone, including children.",
    ],
  },
  {
    title: "Not affiliated with the sites it supports",
    body: [
      "Ordbro is an independent app. It is not affiliated with, endorsed by or sponsored by DR, YouTube, Netflix, Prime Video, Bilibili or Crunchyroll.",
    ],
  },
];

export default function OrdbroPrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0c10] px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-400/80">
          Ordbro
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-white/70">
          Ordbro is built so that the developer never sees your data. This policy explains exactly what is sent where.
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
            For privacy inquiries or technical questions regarding Ordbro, contact{" "}
            <a className="text-emerald-300 underline underline-offset-4" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-sm">
          <Link className="text-emerald-300 underline underline-offset-4" href="/undertekst/support/">
            Ordbro Support
          </Link>
          <Link className="text-white/65 underline underline-offset-4" href="/">
            Jiajia Zhang
          </Link>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-white/35">
          Effective October 24, 2026
        </p>
      </article>
    </main>
  );
}
