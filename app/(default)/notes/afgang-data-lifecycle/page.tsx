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

const link =
  "underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100";
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
        Afgang computes Copenhagen reachability maps locally from Rejseplanen&apos;s static GTFS and Denmark OpenStreetMap data. Once the routing worked, the more annoying problem was updating those feeds without ever leaving the app half-updated or quietly serving an expired timetable.
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
          Scheduled reachability from Nørreport Station: all four contour layers come from one consistent GTFS and R5 bundle.
        </figcaption>
      </figure>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className={h2}>Why in-place rebuilds don&apos;t work</h2>
          <p className={p}>
            At startup, one FastAPI lifespan loads an in-process R5 network (via r5py 1.1.7 / R5 7.5.1) built from the GTFS feed, the Denmark OSM extract, a serialized network file, and a runtime JAR. If you overwrite any of those files in place while the server is running—or if a build fails halfway—the app can end up mixing old and new artifacts. Worse, if a feed expires and the tool quietly falls back to older schedule dates, commute leave times still look plausible even though the timetable underneath is stale.
          </p>
        </section>

        <section>
          <h2 className={h2}>Binding the bundle to one manifest</h2>
          <p className={p}>
            Instead of treating the files as loose inputs, Afgang ties the GTFS archive, OSM data, serialized network, runtime JAR, engine versions, file hashes, and actual service dates into a single manifest. If a hash doesn&apos;t match or the service dates have expired, startup fails closed rather than stretching old timetable coverage.
          </p>
        </section>

        <section>
          <h2 className={h2}>Candidate, audit, promote, rollback</h2>
          <p className={p}>
            Each feed update runs outside the live directory:
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
            <li>Prepare an isolated candidate directory while the current app keeps serving requests.</li>
            <li>Build the R5 network and audit the service dates, build warnings, hashes, and the 12 representative rail and bus boundary checks (verifying the 250 m hex surface doesn&apos;t produce optimistic contour buckets).</li>
            <li>Take a brief stop and swap the whole bundle in using atomic directory renames.</li>
            <li>Run health and smoke checks right after startup; if anything fails, restore the previous bundle and its freshness state automatically.</li>
          </ol>
        </section>

        <section>
          <h2 className={h2}>The trade-off</h2>
          <p className={p}>
            You do pay a short pause during the directory rename, and you keep extra manifest bookkeeping and disk space for the candidate and fallback bundles. For a local transport utility, that&apos;s an easy trade: a broken or expired feed can only fail in the candidate stage or roll straight back, never half-break the running app. The verification numbers and claim boundaries are in the{" "}
            <Link href="/en/projects/afgang/" className={link}>
              Afgang case study
            </Link>
            .
          </p>
        </section>

      </div>
    </article>
  );
}
