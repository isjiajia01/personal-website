import type { Metadata } from "next";
import Link from "next/link";

const contactEmail = "isjiajiazhang@gmail.com";

export const metadata: Metadata = {
  title: "Solis Support",
  description: "Support, troubleshooting, and purchase restoration help for Solis.",
  alternates: {
    canonical: "https://me.zhangjiajia.me/solis/support/",
  },
};

export default function SolisSupportPage() {
  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-amber-300/75">
          Solis
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Support
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-white/70">
          Help with daylight, Moon, Earthlight, saved places, widgets, Sky AR,
          and Solis Full purchases.
        </p>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="font-serif text-2xl font-medium">Contact</h2>
          <p className="mt-3 leading-7 text-white/70">
            Email{" "}
            <a className="text-amber-300 underline underline-offset-4" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            . Include your device model, OS version, Solis version, and the steps
            that led to the problem. Do not send passwords, payment-card details,
            or precise location coordinates.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="font-serif text-2xl font-medium">Location and saved places</h2>
          <p className="mt-3 leading-7 text-white/70">
            Solis can be used without device-location permission. Choose a city
            manually from onboarding or the Location screen. If current location
            is unavailable, check Settings → Privacy &amp; Security → Location
            Services → Solis and select While Using the App.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="font-serif text-2xl font-medium">Sky AR</h2>
          <p className="mt-3 leading-7 text-white/70">
            Sky AR requires a supported iPhone, camera permission, and
            location/heading information. Camera permission is requested only
            when Sky AR is opened. The rest of Solis works without camera access.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="font-serif text-2xl font-medium">Solis Full and Restore Purchase</h2>
          <p className="mt-3 leading-7 text-white/70">
            Solis Full is an optional one-time purchase, not a subscription. If
            an eligible purchase is not recognized, open Solis → More → Restore.
            Use the same Apple Account that made the purchase and ensure the App
            Store is reachable. Apple handles billing and refunds.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="font-serif text-2xl font-medium">Widgets and saved places</h2>
          <p className="mt-3 leading-7 text-white/70">
            Open Solis on iPhone after changing the selected place so widgets can
            refresh. Widget refresh timing is managed by the operating system.
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-sm">
          <Link className="text-amber-300 underline underline-offset-4" href="/solis/privacy/">
            Privacy Policy
          </Link>
          <Link className="text-white/65 underline underline-offset-4" href="/">
            Jiajia Zhang
          </Link>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-white/35">
          Last updated September 9, 2026
        </p>
      </article>
    </main>
  );
}
