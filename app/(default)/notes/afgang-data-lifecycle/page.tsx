import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const url = "https://me.isjia.page/notes/afgang-data-lifecycle/";
const title = "Afgang: updating timetable data without breaking the app";
const description =
  "How Afgang swaps a new GTFS and OpenStreetMap bundle into a running transport utility: isolated candidate, audits, atomic promotion and automatic rollback.";
const image = { url: "https://me.isjia.page/images/projects/afgang/reachability-desktop.webp", width: 1440, height: 900, alt: "Afgang desktop reachability map showing four scheduled travel-time contours from Nørreport Station" };

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: "article", url, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

const p = "mt-3 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400";
const h2 = "text-[15px] font-medium text-zinc-900 dark:text-zinc-100";

export default function Note() {
  return (
    <article>
      <Link
        href="/notes/"
        className="group press -mx-2 mb-6 inline-block px-2 py-2 text-[13px] leading-5 text-zinc-500 hover:text-(--rose) dark:text-zinc-400"
      >
        <span aria-hidden="true" className="mr-1">←</span>
        All notes
      </Link>
      <p className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
        Notes · 18 November 2026
      </p>
      <h1 className="page-title mt-1 text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
        {title}
      </h1>
      <p className="mt-3 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
        Afgang computes scheduled reachability from official timetable data. A feed update should never leave the app half-updated, so I treat each update as a transaction. This is how it works and why.
      </p>

      <figure className="mt-8">
        <Image
          src="/images/projects/afgang/reachability-desktop.webp"
          alt="Afgang desktop reachability map showing four scheduled travel-time contours from Nørreport Station"
          width={1440}
          height={900}
          sizes="(max-width: 640px) 100vw, 576px"
          className="h-auto w-full rounded-md border border-zinc-200 dark:border-zinc-800"
        />
        <figcaption className="mt-2 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          Scheduled reachability from Nørreport Station: the output that depends on one consistent data bundle.
        </figcaption>
      </figure>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className={h2}>The problem</h2>
          <p className={p}>
            The R5 network is built from GTFS, OpenStreetMap, a serialized network and a runtime JAR. If any of these changes in place, the app can serve results from a mix of old and new data, or from a timetable that has expired. Rebuilding the active data in place was therefore ruled out.
          </p>
        </section>

        <section>
          <h2 className={h2}>Data identity is a hard gate</h2>
          <p className={p}>
            GTFS, OSM, the network, the runtime JAR, engine versions, hashes and real service dates define one bundle identity. An invalid or expired identity fails closed. The app does not quietly extend timetable coverage.
          </p>
        </section>

        <section>
          <h2 className={h2}>Four steps per update</h2>
          <p className={p}>
            Prepare an isolated candidate without interrupting the active app. Build the R5 network and audit service dates, warnings, hashes and boundary evidence. Stop briefly and promote the whole bundle with atomic directory renames. Then run health and smoke checks; if they fail, restore the previous bundle and its freshness state automatically.
          </p>
        </section>

        <section>
          <h2 className={h2}>What it costs and what it buys</h2>
          <p className={p}>
            The cost is a short stop at promotion time and more bookkeeping than a simple rebuild. The gain is that a bad feed can only ever fail in the candidate stage or be rolled back. The full case study, including the verification numbers and the claim boundaries, is in the{" "}
            <Link href="/en/projects/afgang/" className="underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100">
              Afgang case study
            </Link>
            .
          </p>
        </section>

      </div>
    </article>
  );
}
