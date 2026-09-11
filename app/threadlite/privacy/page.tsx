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
    <main className="min-h-screen bg-[#0a0c10] px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-400/80">
          ThreadLite
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-white/70">
          ThreadLite is designed with a strict privacy-first principle. It keeps your AI conversations fast and light without ever inspecting or storing your private conversations.
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
            For privacy inquiries or technical questions regarding ThreadLite, contact{" "}
            <a className="text-emerald-300 underline underline-offset-4" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-sm">
          <Link className="text-emerald-300 underline underline-offset-4" href="/threadlite/support/">
            ThreadLite Support
          </Link>
          <Link className="text-white/65 underline underline-offset-4" href="/">
            Jiajia Zhang
          </Link>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-white/35">
          Effective September 11, 2026
        </p>
      </article>
    </main>
  );
}
