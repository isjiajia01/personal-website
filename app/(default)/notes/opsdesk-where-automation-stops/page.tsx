import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const url = "https://me.isjia.page/notes/opsdesk-where-automation-stops/";
const title = "OpsDesk: where automation should stop";
const description =
  "Why OpsDesk treats an empty customer draft as a valid triage outcome, and how the run trace and policy gates sit around it.";
const image = { url: "https://me.isjia.page/images/projects/opsdesk/opsdesk-1200.webp", width: 1200, height: 750, alt: "OpsDesk ticket view: raw intake turned into a structured package, with an AI run trace and a policy gate" };

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
        Most support-AI demos assume every ticket ends with a drafted reply. When I built OpsDesk, the trickier question was how to handle the cases where the model shouldn&apos;t write a reply at all.
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
          Ticket TCK-1060 in OpsDesk: structured intake on the left, run trace and gates on the right.
        </figcaption>
      </figure>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className={h2}>Making &ldquo;no draft&rdquo; look intentional</h2>
          <p className={p}>
            Take ticket TCK-1060 (Harbor Analytics, marked urgent from Intercom): the customer says the receipt amount, date, and merchant alias all match, yet the matching job skipped the transaction. That&apos;s a{" "}
            <code>PRODUCT_BUG</code> with high risk, not a question you smooth over with a polite template. Guessing at a reason in a customer reply creates more cleanup later.
          </p>
          <p className={p}>
            So OpsDesk routes it to an engineering escalation with SQL evidence, logs, and reproduction steps, and sets the outcome to <code>No draft / escalation</code>. Early on, leaving the draft area blank felt broken—like the run had silently failed. Adding an explicit callout (&ldquo;No customer draft generated: this is an intentional safety outcome, not a generation failure&rdquo;) fixed that ambiguity for whoever is reviewing the queue.
          </p>
        </section>

        <section>
          <h2 className={h2}>Putting the run trace next to the ticket</h2>
          <p className={p}>
            If a tool tells an operator not to reply, they need to see why in a few seconds. The right-hand panel keeps the run trace visible: which provider and model ran, whether a verifier checked it, whether it fell back, how long it took (24 ms here), and a short summary of the prompt context (DB context pack, ticket, customer, and recent operational context).
          </p>
          <p className={p}>
            In the public demo, the provider is set to <code>fake-deterministic</code> and the verifier says <code>Not checked</code>. I wanted those states shown plainly rather than hidden behind a generic spinner or a &ldquo;verified&rdquo; badge—if a step didn&apos;t run, the UI shouldn&apos;t pretend it did.
          </p>
        </section>

        <section>
          <h2 className={h2}>Keeping the heavy panels collapsed</h2>
          <p className={p}>
            Below the trace sit four collapsed panels: Policy gate (approval and blocked claims), Evidence (2 sources, 0 missing), Eval loop, and Claim-source map. On a normal pass through the queue, you mostly just want the structured package and the escalation decision. Those panels stay out of the way until a reviewer needs to audit where a claim came from or approve a sensitive action.
          </p>
        </section>

        <section>
          <h2 className={h2}>Scope</h2>
          <p className={p}>
            OpsDesk is a small deployed demo for exploring these support-ops guardrails, not a production helpdesk. You can click through it on{" "}
            <a className={link} href="https://jobops.zhangjiajia.me/opsdesk" target="_blank" rel="noopener noreferrer">
              the live demo
            </a>{" "}
            or read the overview on the{" "}
            <Link href="/en/projects/opsdesk/" className={link}>
              OpsDesk project page
            </Link>
            .
          </p>
        </section>

      </div>
    </article>
  );
}
