import type { Metadata } from "next";
import Link from "next/link";

const contactEmail = "isjiajiazhang@gmail.com";

export const metadata: Metadata = {
  title: "Undertekst Privacy Policy",
  description: "Privacy information for the Undertekst Safari extension.",
  alternates: {
    canonical: "https://me.isjia.page/undertekst/privacy/",
  },
};

const sections = [
  {
    title: "What Undertekst does",
    body: [
      "Undertekst is a Safari extension for DRTV (dr.dk/drtv). It reads the Danish subtitle file of the programme you are watching, translates the text with a translation service that you choose, and shows the result over the video.",
      "The developer operates no server for Undertekst. There is no account, no analytics, no advertising and no tracking, and the developer never receives your data.",
    ],
  },
  {
    title: "What leaves your Mac",
    body: [
      "Subtitle text of the programme you are watching (in batches of up to 40 lines plus a few lines of surrounding context), the programme title and a short synopsis are sent to the translation provider you select in Settings (for example OpenAI, Google Gemini, Anthropic, DeepSeek, or a service or local model you configure). They are sent with your own API key and are handled under that provider's terms and privacy policy.",
      "To find the subtitles, the extension contacts DR's own services (dr-massive.com and DR's CDN) in the same way the DRTV player does. These requests are anonymous and carry no cookies. Undertekst does not send DR any information about you.",
      "Nothing else is transmitted. Undertekst does not collect or send your browsing history, identifiers, location or device information.",
    ],
  },
  {
    title: "What stays on your Mac",
    body: [
      "Your settings, your API key and the cache of translated subtitles are stored locally in Safari's extension storage and IndexedDB on your Mac. The cache is limited in size and age and can be cleared at any time from the extension's Settings page. Removing the extension removes this data.",
      "Your API key is used only to authenticate requests to the provider you selected. It is never logged and never sent anywhere else.",
    ],
  },
  {
    title: "Permissions",
    body: [
      "Undertekst asks for access to dr.dk to detect the player and show subtitles; to DR's API and CDN hosts to read subtitle files; and to the translation provider hosts listed in the extension so it can send translation requests. It uses extension storage to keep your settings. It does not read or change any other website.",
    ],
  },
  {
    title: "Children, tracking and advertising",
    body: [
      "Undertekst contains no advertising, no third-party analytics and no tracking technologies, and it does not knowingly collect any personal data from anyone, including children.",
    ],
  },
  {
    title: "Not affiliated with DR",
    body: [
      "Undertekst is an independent app. It is not affiliated with, endorsed by or sponsored by DR (Danmarks Radio).",
    ],
  },
];

export default function UndertekstPrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0c10] px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-400/80">
          Undertekst
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-white/70">
          Undertekst is built so that the developer never sees your data. This policy explains exactly what is sent where.
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
            For privacy inquiries or technical questions regarding Undertekst, contact{" "}
            <a className="text-emerald-300 underline underline-offset-4" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-sm">
          <Link className="text-emerald-300 underline underline-offset-4" href="/undertekst/support/">
            Undertekst Support
          </Link>
          <Link className="text-white/65 underline underline-offset-4" href="/">
            Jiajia Zhang
          </Link>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-white/35">
          Effective October 7, 2026
        </p>
      </article>
    </main>
  );
}
