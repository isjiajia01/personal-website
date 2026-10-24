import type { Metadata } from "next";
import Link from "next/link";

const contactEmail = "isjiajiazhang@gmail.com";

export const metadata: Metadata = {
  title: "Undertekst Support",
  description: "Setup, troubleshooting and support for Undertekst for Safari.",
  alternates: {
    canonical: "https://me.isjia.page/undertekst/support/",
  },
};

const faqs = [
  {
    q: "How do I turn Undertekst on in Safari?",
    a: "Open Safari -> Settings (Cmd+,) -> Extensions, check Undertekst, then allow it on dr.dk (click the Undertekst toolbar button on a dr.dk page and choose Always Allow on This Website).",
  },
  {
    q: "What do I need to add before it translates?",
    a: "A translation API key. Click the Undertekst toolbar button, open Settings, choose a provider (OpenAI, Google Gemini, Anthropic, DeepSeek, or a custom OpenAI-compatible endpoint such as a local Ollama), paste your key and press Test connection. Undertekst has no servers and no subscription; the provider bills you directly.",
  },
  {
    q: "Nothing appears on DRTV. What should I check?",
    a: "Open the toolbar popup: it shows the current status. Make sure the programme has Danish subtitles, that the extension is allowed on dr.dk, and that the page was reloaded after enabling the extension. If it says the subtitles could not be loaded, press Try again.",
  },
  {
    q: "Do I need to switch on DR's own subtitles?",
    a: "No. Undertekst reads the subtitle file directly. You can leave DR's own captions off.",
  },
  {
    q: "Does it work outside Denmark or without a DR login?",
    a: "DRTV itself is available in Denmark and needs a free DR login to play. Undertekst does not change that and does not bypass either requirement.",
  },
  {
    q: "Which languages are supported?",
    a: "Danish subtitles can be translated into Simplified Chinese (default), Traditional Chinese, English, Japanese, Korean, German, French, Spanish and Swedish. Change it in the toolbar popup.",
  },
  {
    q: "What happens to my data?",
    a: "Subtitle text is sent only to the translation provider you chose. Settings, your key and the translation cache stay on your Mac. See the privacy policy for details.",
  },
  {
    q: "How can I report an issue or suggest a feature?",
    a: "Email isjiajiazhang@gmail.com with your macOS version, Safari version, the DRTV programme address and a short description. The status line in the toolbar popup is very helpful.",
  },
];

export default function UndertekstSupportPage() {
  return (
    <main className="min-h-screen bg-[#0a0c10] px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-400/80">
          Undertekst
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Support & FAQ
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-white/70">
          Need help setting up or troubleshooting Undertekst for Safari? Here are answers to common questions.
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
      </article>
    </main>
  );
}
