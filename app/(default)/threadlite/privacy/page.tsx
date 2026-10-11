import type { Metadata } from "next";
import Link from "next/link";

const contactEmail = "isjiajiazhang@gmail.com";

export const metadata: Metadata = {
  title: "ThreadLite Privacy Policy",
  description: "Privacy information for the ThreadLite Safari extension.",
  alternates: {
    canonical: "https://me.zhangjiajia.me/threadlite/privacy/",
  },
};

const sections = [
  {
    title: "Zero Data Collection",
    body: [
      "ThreadLite does not collect, transmit, store, or sell any personal data, chat content, prompt inputs, model responses, or conversation history.",
      "All rendering optimizations (such as applying content-visibility to offscreen turns) are computed entirely locally in memory within your Safari browser session.",
      "No external network requests, analytics SDKs, crash trackers, or third-party monitoring services are embedded in ThreadLite.",
    ],
  },
  {
    title: "Safari Extension Permissions",
    body: [
      "ThreadLite requires access only to chatgpt.com to inspect DOM layout and offscreen viewport elements during your conversation.",
      "It uses browser local storage solely to remember your preferred optimization mode (e.g. Automatic, Gentle, Maximum, or Paused) locally on your Mac. These settings never leave your device.",
    ],
  },
  {
    title: "Reversibility & Content Integrity",
    body: [
      "ThreadLite operates with zero destructive actions. It never deletes turns, edits text, or alters data stored in your OpenAI account.",
      "You can pause or disable ThreadLite at any time in Safari Settings, which immediately restores native browser rendering.",
    ],
  },
  {
    title: "Tracking and Advertising",
    body: [
      "ThreadLite does not display advertisements, track your web browsing activity, or share data with data brokers or advertising networks.",
    ],
  },
];

export default function ThreadLitePrivacyPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16 sm:py-24">
      <article>
        <p className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          ThreadLite
        </p>
        <h1 className="mt-1 text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
          Privacy Policy
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
          ThreadLite is designed with a strict privacy-first principle. It keeps
          your AI conversations fast and light without ever inspecting or
          storing your private conversations.
        </p>

        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
                {section.title}
              </h2>
              <div className="mt-2 space-y-3 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
            Contact
          </h2>
          <p className="mt-2 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
            For privacy inquiries or technical questions regarding ThreadLite,
            contact{" "}
            <a
              className="underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail}
            </a>
            .
          </p>
        </section>

        <div className="mt-16 flex flex-wrap gap-4 border-t border-zinc-200 pt-6 text-[13px] leading-5 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <Link
            className="underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
            href="/threadlite/support/"
          >
            ThreadLite Support
          </Link>
          <Link
            className="underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
            href="/"
          >
            Jiajia Zhang
          </Link>
        </div>

        <p className="mt-4 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          Effective September 11, 2026
        </p>
      </article>
    </main>
  );
}
