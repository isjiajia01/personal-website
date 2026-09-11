import type { Metadata } from "next";
import Link from "next/link";

const contactEmail = "isjiajiazhang@gmail.com";

export const metadata: Metadata = {
  title: "ThreadLite Support",
  description: "Customer support, troubleshooting, and setup for ThreadLite for Safari.",
  alternates: {
    canonical: "https://me.zhangjiajia.me/threadlite/support/",
  },
};

const faqs = [
  {
    q: "How do I activate ThreadLite in Safari?",
    a: "Open Safari -> Settings (or press Cmd+,) -> Extensions tab -> check ThreadLite to enable it. Then make sure website access to chatgpt.com is allowed.",
  },
  {
    q: "Does ThreadLite delete or modify my chat history?",
    a: "Never. ThreadLite only instructs Safari to skip rendering offscreen turns while you are scrolling or typing. Your complete history, prompts, code blocks, and responses remain intact in your conversation.",
  },
  {
    q: "Does Find-in-Page (Cmd+F) still work?",
    a: "Yes. Native browser content-visibility preserves Safari's native page search, text selection, and screen reader access.",
  },
  {
    q: "What optimization modes are available?",
    a: "ThreadLite offers Automatic (recommended for best balance of smoothness and memory efficiency), Gentle, Maximum, and Pause. You can switch modes anytime via the extension toolbar popup in Safari.",
  },
  {
    q: "How can I report an issue or suggest a feature?",
    a: "Email isjiajiazhang@gmail.com with your macOS version, Safari version, and a brief description of the observed behavior.",
  },
];

export default function ThreadLiteSupportPage() {
  return (
    <main className="min-h-screen bg-[#0a0c10] px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-400/80">
          ThreadLite
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Support & FAQ
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-white/70">
          Need help setting up or troubleshooting ThreadLite for Safari? Here are answers to common questions.
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
          <Link className="text-emerald-300 underline underline-offset-4" href="/threadlite/privacy/">
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
