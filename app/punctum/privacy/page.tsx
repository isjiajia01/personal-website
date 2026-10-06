import type { Metadata } from "next";
import Link from "next/link";

const contactEmail = "isjiajiazhang@gmail.com";

export const metadata: Metadata = {
  title: "Punctum Privacy Policy",
  description: "Privacy information for Punctum, the dot-matrix clock for iPhone, iPad, Apple Watch and Apple TV.",
  alternates: {
    canonical: "https://me.zhangjiajia.me/punctum/privacy/",
  },
};

const sections = [
  {
    title: "Weather and location",
    body: [
      "If you choose the Weather source, Punctum asks Apple WeatherKit for conditions at your approximate location. Location access is requested only when you first use that source, and the location is used on your device for this request. Punctum does not store it or send it to any server we operate.",
    ],
  },
  {
    title: "Calendar",
    body: [
      "If you choose the Next event source, Punctum reads upcoming events on your device in order to show them. Event data never leaves your device.",
    ],
  },
  {
    title: "Media",
    body: [
      "If you choose the Now Playing source, Punctum reads the current track title, artist and playback position on your device in order to show them. Nothing is sent anywhere.",
    ],
  },
  {
    title: "Notifications",
    body: [
      "If you allow notifications, Punctum schedules a local notification when a timer ends. It is created and delivered on your device.",
    ],
  },
  {
    title: "Purchases",
    body: [
      "Punctum Pro is a one-time purchase handled by Apple. Punctum only learns whether Punctum Pro is active; it receives no payment details.",
    ],
  },
  {
    title: "Settings and sync",
    body: [
      "Your preferences are stored on your device and shared between Punctum on your iPhone, Apple Watch and Apple TV, and with its widgets, through Apple's own on-device mechanisms.",
    ],
  },
  {
    title: "Tracking and advertising",
    body: [
      "Punctum has no accounts, analytics, advertising or tracking, and it does not sell personal data. Nothing is sent to a server operated by us.",
    ],
  },
];

export default function PunctumPrivacyPage() {
  return (
    <main className="min-h-screen bg-black px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#FFB028]/80">
          Punctum
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-white/70">
          Punctum does not collect, store or share any personal data.
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

        <section className="mt-6 rounded-2xl border border-[#FFB028]/20 bg-[#FFB028]/[0.06] p-6">
          <h2 className="font-serif text-2xl font-medium">Contact</h2>
          <p className="mt-3 leading-7 text-white/70">
            For privacy questions, email{" "}
            <a className="text-[#FFB028] underline underline-offset-4" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-sm">
          <Link className="text-[#FFB028] underline underline-offset-4" href="/punctum/support/">
            Punctum Support
          </Link>
          <Link className="text-white/65 underline underline-offset-4" href="/">
            Jiajia Zhang
          </Link>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-white/35">
          Last updated October 6, 2026
        </p>
      </article>
    </main>
  );
}
