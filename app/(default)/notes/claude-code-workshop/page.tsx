import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const base = "/notes/claude-code-workshop";
const url = "https://me.isjia.page/notes/claude-code-workshop/";
const description =
  "Notes from a one-day Claude Code workshop: a story board that moves by itself, QA videos as evidence, and a human who accepts the work.";

const ogImage = { url: "https://me.isjia.page/notes/claude-code-workshop/board.jpg", width: 1280, height: 720, alt: "The XC board with four epics and ten stories, all in Done" };

export const metadata: Metadata = {
  title: "Claude Code workshop notes",
  description,
  alternates: { canonical: url },
  openGraph: { type: "article", url, title: "Claude Code workshop notes", description, images: [ogImage] },
  twitter: { card: "summary_large_image", title: "Claude Code workshop notes", description, images: [ogImage] },
};

const videos = [
  {
    file: "xc-5-ac3",
    title: "XC-5 Sign up: invalid details show a clear message",
    note: "The first QA run failed here. The test's text match also hit the caption the recorder adds to the video. The fix was an exact match.",
  },
  {
    file: "xc-8-ac2",
    title: "XC-8 Home timeline: more tweets load as I scroll",
    note: "Infinite scroll, no next-page button.",
  },
  {
    file: "xc-10-ac3",
    title: "XC-10 Like: a failed save rolls the count back",
    note: "The like shows at once, then the count goes back and a message appears when the server refuses.",
  },
  {
    file: "xc-12-ac2",
    title: "XC-12 Reply: a reply that fails",
    note: "Testing the failure path as part of the acceptance criteria.",
  },
];

const link =
  "underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100";
const p = "mt-3 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400";
const h2 = "text-[15px] font-medium text-zinc-900 dark:text-zinc-100";

export default function ClaudeCodeWorkshopNotes() {
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
        Claude Code workshop notes
      </h1>
      <p className="mt-3 text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
        I spent a day at a Claude Code workshop in Copenhagen run by Zartis with Anthropic. The exercise was building a small X (Twitter) clone from written user stories, with a board and QA recordings built into the loop.
      </p>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className={h2}>How the workflow was set up</h2>
          <p className={p}>
            Each story goes through three Claude Code skills, and a person has the final say.
            <code> /implement-story</code> writes the tests and implementation,{" "}
            <code>/review-pr</code> reviews the diff in a fresh context, and{" "}
            <code>/qa-evidence</code> records one short video per acceptance criterion. The board
            moves the card at each stage, but only a human can move it to Done.
          </p>
          <Image
            src={`${base}/board.jpg`}
            alt="The XC board with four epics and ten stories, all in Done"
            width={1280}
            height={720}
            className="mt-4 w-full rounded border border-zinc-200 dark:border-zinc-800"
          />
          <p className="mt-2 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
            The board at the end: 4 epics, 10 stories, all Done.
          </p>
        </section>

        <section>
          <h2 className={h2}>What I actually ran</h2>
          <p className={p}>
            I had already built all ten stories earlier with a different coding agent. During the
            workshop I ran the three-skill flow on a fresh clone for two stories (XC-5 and XC-8),
            then re-ran the full pipeline on my earlier build. In the end it passed lint, 102
            unit tests, and 83 end-to-end tests, with QA videos attached to every story on the
            board.
          </p>
        </section>

        <section>
          <h2 className={h2}>Things I noticed</h2>
          <ul className="mt-3 list-disc space-y-3 pl-5 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
            <li>
              <code>/review-pr</code> approved XC-5, and then <code>/qa-evidence</code> failed
              immediately. The video recorder overlays a caption on the page, and that caption
              matched a loose text selector in the test. Reading the diff didn&apos;t catch it;
              actually running the recording did, and switching to an exact match fixed it.
            </li>
            <li>
              XC-8 asks for tweets from all users, whereas the API only returns your own tweets
              and people you follow. Claude stopped and asked how to handle it. Instead of faking
              data to make the story look green, I tested against what the API actually returns
              and wrote the mismatch down on the ticket.
            </li>
            <li>
              The QA videos make acceptance much faster, though you still have to watch them
              carefully. When I re-recorded a story, it reused the same file names, so older
              comments on the card ended up linking to the newer video.
            </li>
            <li>
              One test failed once and then passed eight reruns in a row. I left a note about it
              rather than pretending it wasn&apos;t flaky.
            </li>
            <li>
              The instructors suggested skipping hooks and scoped rules if we ran short on time. I
              set them up anyway—they&apos;re nice guard rails, though most of the real value
              came from the board states and the QA videos.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={h2}>What it looks like on a real team</h2>
          <p className={p}>
            What surprised me wasn&apos;t how fast Claude wrote a story—it did that in minutes. The
            slow parts were things like a spec contradicting the API and a person actually checking
            whether the result was acceptable. You don&apos;t get to skip writing down your
            workflow either: the skills, board transitions, and the rule that only a human moves a
            card to Done only work because someone put them in plain files instead of leaving them
            as unwritten team habits.
          </p>
          <p className={p}>
            Once an agent says &ldquo;done&rdquo;, a 20-second video of the acceptance criterion
            passing is much easier to trust than a green checkmark. That doesn&apos;t remove the
            human from the loop—someone still has to decide what to do about a spec mismatch, a
            flaky test, or stale links on a ticket—it just shifts the work from typing to
            reviewing.
          </p>
          <p className={p}>
            One practical headache: fast automated runs left dozens of throwaway test accounts on
            the shared API. If a team runs agents like this regularly, test-data cleanup, rate
            limits, and ownership stop being an afterthought.
          </p>
        </section>

        <section>
          <h2 className={h2}>Four QA videos</h2>
          <div className="mt-4 space-y-8">
            {videos.map((v) => (
              <figure key={v.file}>
                <video
                  controls
                  preload="metadata"
                  poster={`${base}/${v.file}.jpg`}
                  playsInline
                  className="w-full rounded border border-zinc-200 dark:border-zinc-800"
                >
                  <source src={`${base}/${v.file}.mp4`} type="video/mp4" />
                </video>
                <figcaption className="mt-2 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{v.title}.</span>{" "}
                  {v.note}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section>
          <h2 className={h2}>Source</h2>
          <p className={p}>
            The exercise is{" "}
            <a className={link} href="https://github.com/zartis-digital/x-clone-engineering" target="_blank" rel="noopener noreferrer">
              zartis-digital/x-clone-engineering
            </a>
            . The videos use test data, not real accounts.
          </p>
        </section>
      </div>
    </article>
  );
}
