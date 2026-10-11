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
    <main className="mx-auto max-w-xl px-6 py-16 sm:py-24">
      <article>
        <p className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          ThreadLite
        </p>
        <h1 className="mt-1 text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
          Support &amp; FAQ
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
          Need help setting up or troubleshooting ThreadLite for Safari? Here are
          answers to common questions.
        </p>

        <div className="mt-12 space-y-12">
          {faqs.map((faq) => (
            <section key={faq.q}>
              <h2 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
                {faq.q}
              </h2>
              <p className="mt-2 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
                {faq.a}
              </p>
            </section>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
            Contact Support
          </h2>
          <p className="mt-2 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
            For direct assistance, email{" "}
            <a
              className="underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail}
            </a>
            . We typically respond within 1–2 business days.
          </p>
        </section>

        <div className="mt-16 flex flex-wrap gap-4 border-t border-zinc-200 pt-6 text-[13px] leading-5 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <Link
            className="underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
            href="/threadlite/privacy/"
          >
            Privacy Policy
          </Link>
          <Link
            className="underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
            href="/"
          >
            Jiajia Zhang
          </Link>
        </div>
      </article>
    </main>
  );
}
