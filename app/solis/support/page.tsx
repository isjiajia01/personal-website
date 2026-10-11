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
    <main className="mx-auto max-w-xl px-6 py-16 sm:py-24">
      <article>
        <p className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          Solis
        </p>
        <h1 className="mt-1 text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
          Support
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
          Help with daylight, Moon, Earthlight, saved places, widgets, Sky AR,
          and Solis Full purchases.
        </p>

        <div className="mt-12 space-y-12">
          <section>
            <h2 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
              Contact
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
              Email{" "}
              <a
                className="underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>
              . Include your device model, OS version, Solis version, and the
              steps that led to the problem. Do not send passwords, payment-card
              details, or precise location coordinates.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
              Location and saved places
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
              Solis can be used without device-location permission. Choose a
              city manually from onboarding or the Location screen. If current
              location is unavailable, check Settings → Privacy &amp; Security →
              Location Services → Solis and select While Using the App.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
              Sky AR
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
              Sky AR requires a supported iPhone, camera permission, and
              location/heading information. Camera permission is requested only
              when Sky AR is opened. The rest of Solis works without camera access.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
              Solis Full and Restore Purchase
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
              Solis Full is an optional one-time purchase, not a subscription. If
              an eligible purchase is not recognized, open Solis → More → Restore.
              Use the same Apple Account that made the purchase and ensure the
              App Store is reachable. Apple handles billing and refunds.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
              Widgets and saved places
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
              Open Solis on iPhone after changing the selected place so widgets
              can refresh. Widget refresh timing is managed by the operating
              system.
            </p>
          </section>
        </div>

        <div className="mt-16 flex flex-wrap gap-4 border-t border-zinc-200 pt-6 text-[13px] leading-5 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <Link
            className="underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
            href="/solis/privacy/"
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

        <p className="mt-4 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          Last updated September 9, 2026
        </p>
      </article>
    </main>
  );
}
