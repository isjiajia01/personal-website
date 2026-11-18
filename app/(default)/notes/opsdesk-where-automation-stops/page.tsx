import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const url = "https://me.isjia.page/notes/opsdesk-where-automation-stops/";
const title = "OpsDesk: where automation should stop";
const description =
  "Design notes on OpsDesk, a support-operations demo: a case can end with no draft at all, and that is treated as a safe outcome rather than a failure.";
const image = { url: "https://me.isjia.page/images/projects/opsdesk/opsdesk-1200.webp", width: 1200, height: 750, alt: "OpsDesk ticket view: raw intake turned into a structured package, with an AI run trace and a policy gate" };

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
        OpsDesk is a demo that turns support cases into evidence, draft actions, approvals and replayable logs. The most useful design question was not what the model can write, but when it should write nothing.
      </p>

      <figure className="mt-8">
        <Image
          src="/images/projects/opsdesk/opsdesk-1200.webp"
          alt="OpsDesk ticket view: raw intake turned into a structured package, with an AI run trace and a policy gate"
          width={1200}
          height={750}
          sizes="(max-width: 640px) 100vw, 576px"
          className="h-auto w-full rounded-md border border-zinc-200 dark:border-zinc-800"
        />
        <figcaption className="mt-2 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
          A ticket in OpsDesk: structured package on the left, run trace and gates on the right.
        </figcaption>
      </figure>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className={h2}>No draft is a valid result</h2>
          <p className={p}>
            In the screenshot the customer reports a matching job that skipped a transaction. The suggested action is an engineering escalation with SQL evidence, logs and reproduction steps. The page says: no customer draft was generated, this is an intentional safety outcome, not a generation failure. A customer-facing reply would create risk, so the case is routed to the required workflow first.
          </p>
        </section>

        <section>
          <h2 className={h2}>Show how the run happened</h2>
          <p className={p}>
            Each run has a trace: provider, model, whether a verifier ran, whether a fallback was used, duration and a summary of the context. In the demo the provider is a deterministic one, and the page says so. A reviewer can see what produced the suggestion before trusting it.
          </p>
        </section>

        <section>
          <h2 className={h2}>Gates around the suggestion</h2>
          <p className={p}>
            Collapsed panels hold the policy gate (approval and blocked claims), the evidence count, the eval loop and a claim-to-source map. Suggestions stay reviewable, sensitive actions need approval and runs leave an audit trace.
          </p>
        </section>

        <section>
          <h2 className={h2}>Claim boundaries</h2>
          <p className={p}>
            This is a deployed demo, not an enterprise-scale production system, and I do not claim it is one. The point it makes is about guardrails: bounded automation, human review, and logs you can replay.
          </p>
        </section>

      </div>
    </article>
  );
}
