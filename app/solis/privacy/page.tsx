import type { Metadata } from "next";
import Link from "next/link";

const contactEmail = "isjiajiazhang@gmail.com";

export const metadata: Metadata = {
  title: "Solis Privacy Policy",
  description: "Privacy information for the Solis daylight and astronomy app.",
  alternates: {
    canonical: "https://me.zhangjiajia.me/solis/privacy/",
  },
};

const sections = [
  {
    title: "Location and place information",
    body: [
      "Solis can use your current location when you explicitly grant When In Use permission. You can instead choose a city manually and use the main experience without granting device-location access.",
      "Location and place inputs may be processed by Apple services used by Solis, including Location Services, Maps place search and reverse geocoding, WeatherKit, and time-zone services. Solis uses those results for local daylight, astronomy, weather context, place names, and compass-aligned Sky AR.",
      "Saved places and preferences are stored on your device and may be shared with the Solis iPhone widget through an app-group container. The selected place, latitude, longitude, time zone, whether it represents the current location, and an update timestamp may be included in that shared local payload.",
    ],
  },
  {
    title: "Camera and Sky AR",
    body: [
      "Sky AR requests camera access only when you open that feature. Camera imagery is used to place Sun and Moon guidance over the live view. Solis does not upload or retain camera imagery.",
      "Sky AR may use location, heading, and device-orientation information for alignment. The rest of Solis does not require camera access.",
    ],
  },
  {
    title: "Astronomy, weather, and Apple services",
    body: [
      "Solar, lunar, and planetary calculations are performed on device where supported by the feature. Some weather context, place lookup, geocoding, time-zone, iCloud synchronization, and purchase functions use Apple platform services and are subject to Apple's privacy practices.",
    ],
  },
  {
    title: "Purchases",
    body: [
      "Solis uses Apple's StoreKit to offer an optional non-consumable lifetime purchase and to restore eligible purchases. Apple processes payment and transaction-account information. Solis stores only the entitlement state needed to unlock purchased functionality and does not receive full payment-card details.",
    ],
  },
  {
    title: "Data stored by Solis",
    body: [
      "Solis may store saved locations, the selected place, display and accessibility preferences, onboarding and feature settings, cached daylight, astronomy, weather and widget data, and StoreKit entitlement state on your device or in its shared app-group container.",
      "Removing the iPhone app may not immediately remove every locally cached preference or widget payload. Related app-group data may need to be managed through iPhone settings."
    ],
  },
  {
    title: "Tracking and advertising",
    body: [
      "Solis does not sell personal data, use advertising SDKs, request permission for cross-app tracking, or use data to track you across apps or websites owned by other companies.",
    ],
  },
  {
    title: "Children and sensitive content",
    body: [
      "Solis is a general-audience utility and is not designed to collect information from children. It does not provide social, gambling, medical-treatment, or user-generated-content features.",
    ],
  },
];

export default function SolisPrivacyPage() {
  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-amber-300/75">
          Solis
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-white/70">
          Solis is a daylight and astronomy companion. It is not designed for
          advertising or cross-app tracking, and it does not sell personal data.
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

        <section className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
          <h2 className="font-serif text-2xl font-medium">Contact</h2>
          <p className="mt-3 leading-7 text-white/70">
            For privacy questions, email{" "}
            <a className="text-amber-300 underline underline-offset-4" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-sm">
          <Link className="text-amber-300 underline underline-offset-4" href="/solis/support/">
            Solis Support
          </Link>
          <Link className="text-white/65 underline underline-offset-4" href="/">
            Jiajia Zhang
          </Link>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-white/35">
          Effective September 9, 2026
        </p>
      </article>
    </main>
  );
}
