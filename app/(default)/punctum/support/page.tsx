import type { Metadata } from "next";
import Link from "next/link";

const contactEmail = "isjiajiazhang@gmail.com";

export const metadata: Metadata = {
  title: "Punctum Support",
  description: "Support, troubleshooting and purchase restoration help for Punctum.",
  alternates: {
    canonical: "https://me.isjia.page/punctum/support/",
  },
};

const topics = [
  {
    title: "Weather",
    body: "Weather is a Punctum Pro source and needs location permission. If it shows nothing, open Settings → Privacy & Security → Location Services → Punctum and choose While Using the App, then pick the Weather source again.",
  },
  {
    title: "Calendar and Now Playing",
    body: "Next event needs Calendar access and Now Playing needs Media & Apple Music access. Each is requested only when you first choose that source. You can change them later in Settings → Punctum.",
  },
  {
    title: "Full Display and StandBy",
    body: "Full Display fills the screen with a dimmed clock and keeps the screen awake while it is on. It can start by itself when your iPhone charges in landscape. StandBy is the system feature: it shows Punctum's widgets while your locked iPhone charges in landscape.",
  },
  {
    title: "Widgets, Apple Watch and Apple TV",
    body: "Open Punctum after changing a setting so widgets can refresh; refresh timing is managed by the operating system. Settings and your Pro purchase are shared with Punctum on Apple Watch and Apple TV signed in to the same Apple Account.",
  },
  {
    title: "Punctum Pro and Restore Purchases",
    body: "Punctum Pro is an optional one-time purchase, not a subscription, and Family Sharing is on. If an eligible purchase is not recognised, open Settings → Punctum Pro → Restore Purchases, using the Apple Account that made the purchase. Apple handles billing and refunds.",
  },
];

export default function PunctumSupportPage() {
  return (
    <main className="min-h-screen bg-black px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#FFB028]/80">
          Punctum
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Support
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-white/70">
          Help with the display, sources, Full Display, widgets, Apple Watch,
          Apple TV and Punctum Pro.
        </p>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="font-serif text-2xl font-medium">Contact</h2>
          <p className="mt-3 leading-7 text-white/70">
            Email{" "}
            <a className="text-[#FFB028] underline underline-offset-4" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            . Include your device model, OS version, Punctum version, and the steps that led to
            the problem. Do not send passwords or payment-card details.
          </p>
        </section>

        {topics.map((topic) => (
          <section key={topic.title} className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="font-serif text-2xl font-medium">{topic.title}</h2>
            <p className="mt-3 leading-7 text-white/70">{topic.body}</p>
          </section>
        ))}

        <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-sm">
          <Link className="text-[#FFB028] underline underline-offset-4" href="/punctum/privacy/">
            Privacy Policy
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
