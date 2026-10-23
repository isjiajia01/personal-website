import type { Metadata } from "next";
import Link from "next/link";

const contactEmail = "isjiajiazhang@gmail.com";

export const metadata: Metadata = {
  title: "Wayfinder Support",
  description: "Setup, troubleshooting and support for Wayfinder for Safari and Chrome.",
  alternates: {
    canonical: "https://me.zhangjiajia.me/wayfinder/support/",
  },
};

const faqs = [
  {
    q: "How do I turn Wayfinder on in Safari?",
    a: "Open the Wayfinder app once, then go to Safari -> Settings (Cmd+,) -> Extensions, check Wayfinder and allow it on all websites. Press Cmd+Shift+K on a page to open the palette.",
  },
  {
    q: "How do I use it in Chrome?",
    a: "Install Wayfinder from the Chrome Web Store, then press Ctrl+Shift+K (Cmd+Shift+K on Mac) on a web page. Shortcuts can be changed at chrome://extensions/shortcuts.",
  },
  {
    q: "The palette is empty or the shortcut does nothing.",
    a: "Reload the page. Pages that were open before Wayfinder was installed or updated need a reload to reconnect. The palette cannot open on browser-internal pages.",
  },
  {
    q: "How do I save and restore a window?",
    a: "Open the palette and choose \"Save this window as a session\". Open the Session Manager from the palette or the toolbar button and press Resume. Sessions keep a version history.",
  },
  {
    q: "Why can't I find a page I visited?",
    a: "Recording visits and page-text indexing are off by default. Turn them on in Settings > Recall & Privacy. Pages you save, tabs and sessions are searchable without it.",
  },
  {
    q: "Does Wayfinder collect my data?",
    a: "No. Everything stays on your device unless you turn on sync. See the privacy policy for the few optional network requests.",
  },
  {
    q: "How can I report an issue or suggest a feature?",
    a: "Email isjiajiazhang@gmail.com with your browser and OS version and a short description.",
  },
];

export default function WayfinderSupportPage() {
  return (
    <main className="min-h-screen bg-[#0a0c10] px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-400/80">
          Wayfinder
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Support & FAQ
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-white/70">
          Need help setting up or troubleshooting Wayfinder? Here are answers to common questions.
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
            . We typically respond within 1-2 business days.
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-sm">
          <Link className="text-emerald-300 underline underline-offset-4" href="/wayfinder/privacy/">
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
