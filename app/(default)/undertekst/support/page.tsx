import type { Metadata } from "next";
import Link from "next/link";

const contactEmail = "isjiajiazhang@gmail.com";

export const metadata: Metadata = {
  title: "Ordbro Support",
  description: "Setup, troubleshooting and support for Ordbro, the Safari extension that translates web pages and video subtitles.",
  alternates: {
    canonical: "https://me.isjia.page/undertekst/support/",
  },
};

const faqs = [
  {
    q: "How do I turn Ordbro on in Safari?",
    a: "Open Safari -> Settings (Cmd+,) -> Extensions, tick Ordbro, then allow it on the sites you want to translate. On a site you have allowed, click the Ordbro toolbar button and choose Always Allow on This Website to keep access next time.",
  },
  {
    q: "Do I need an account or a subscription?",
    a: "No account, and no subscription. Web page translation is free. Video subtitle translation is part of Ordbro Pro, a one-time in-app purchase with no recurring charge; Family Sharing is on. Purchase or restore it in the Ordbro app on your Mac, not in the Safari extension.",
  },
  {
    q: "What do I need before it translates?",
    a: "A translation service. Ordbro has no servers of its own, so it uses either your own API key for an AI provider (OpenAI, Google Gemini, Anthropic Claude, DeepSeek, any OpenAI-compatible endpoint including a local Ollama model) or a machine-translation service (DeepL, Google Cloud Translation, Azure Translator, Baidu, Youdao, Tencent). The built-in Google (Web free) engine needs no key at all. Set it up in Ordbro's Settings under Engines and press Check connection to confirm the key works.",
  },
  {
    q: "Nothing appears on a video. What should I check?",
    a: "Open the toolbar popup: its status line says what is wrong. Check that the video has subtitles, that Ordbro is allowed on that site, and that the page was reloaded after you enabled the extension. If it says the subtitles could not be loaded, press Try again. Video subtitle translation also requires Ordbro Pro.",
  },
  {
    q: "Do I need to switch on the site's own subtitles?",
    a: "No. Ordbro reads the subtitle track the player already uses and draws its own caption layer over the video, so the site's captions can stay off.",
  },
  {
    q: "Which sites are supported?",
    a: "Ordbro has dedicated support for YouTube, DRTV (dr.dk/drtv), Netflix, Prime Video, Bilibili and Crunchyroll. On other sites it reads the subtitles the player fetches whenever it uses a subtitle track, a subtitle file or an HLS/DASH manifest, so many players work without site-specific code. Web pages can be translated anywhere you allow the extension.",
  },
  {
    q: "Does it work outside Denmark or without a DR login?",
    a: "DRTV itself is available in Denmark and needs a free DR login to play. Ordbro does not change that and does not bypass either requirement. YouTube and the other supported sites have no such restriction.",
  },
  {
    q: "Which languages can it translate into?",
    a: "26 target languages, including Simplified Chinese (the default), Traditional Chinese, English, Danish, German, Swedish, French, Spanish, Japanese, Korean and more. The source language is detected; you can also set it yourself. Change the target language in the toolbar popup.",
  },
  {
    q: "How do I move Ordbro Pro to another Mac?",
    a: "Install Ordbro from the App Store on the other Mac, then press Restore Purchases in the app while signed in with the same Apple Account. The unlock is tied to your Apple Account, not to the device.",
  },
  {
    q: "What happens to my data?",
    a: "Text you translate is sent only to the translation service you chose, with your own key. Your key, your settings and the translation cache stay on your Mac. No account, no analytics, no tracking. See the privacy policy for the details.",
  },
  {
    q: "How can I report an issue or suggest a feature?",
    a: "Email isjiajiazhang@gmail.com with your macOS version, the Ordbro version from the app, the page or programme address and a short description. The status line in the toolbar popup is very helpful.",
  },
];

export default function OrdbroSupportPage() {
  return (
    <main className="min-h-screen bg-[#0a0c10] px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-400/80">
          Ordbro
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Support &amp; FAQ
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-white/70">
          Need help setting up or troubleshooting Ordbro? Here are answers to the common questions.
        </p>

        <div className="mt-10 space-y-6">
          {faqs.map((faq) => (
            <section key={faq.q} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="font-serif text-xl font-medium text-white">{faq.q}</h2>
              <p className="mt-3 text-[15px] leading-7 text-white/70">{faq.a}</p>
            </section>
          ))}
        </div>

        <section className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-6">
          <h2 className="font-serif text-2xl font-medium">Contact Support</h2>
          <p className="mt-3 leading-7 text-white/70">
            For direct assistance, email{" "}
            <a className="text-emerald-300 underline underline-offset-4" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            . We typically respond within 1–2 business days.
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-sm">
          <Link className="text-emerald-300 underline underline-offset-4" href="/undertekst/privacy/">
            Privacy Policy
          </Link>
          <Link className="text-white/65 underline underline-offset-4" href="/">
            Jiajia Zhang
          </Link>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-white/35">
          Ordbro is an independent app. It is not affiliated with, endorsed by or sponsored by DR, YouTube,
          Netflix, Prime Video, Bilibili or Crunchyroll.
        </p>
      </article>
    </main>
  );
}
