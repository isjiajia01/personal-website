import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const base = "/notes/claude-code-workshop";
const url = "https://me.isjia.page/notes/claude-code-workshop/";
const description =
  "Notes from a one-day Claude Code workshop: a story board that moves by itself, QA videos as evidence, and a human who accepts the work.";

export const metadata: Metadata = {
  title: "Claude Code workshop notes",
  description,
  alternates: { canonical: url },
  openGraph: { type: "article", url, title: "Claude Code workshop notes", description },
  twitter: { card: "summary", title: "Claude Code workshop notes", description },
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
    note: "The failure state is part of the criterion, so it is recorded too.",
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
        A one-day Claude Code workshop in Copenhagen, run by Zartis with Anthropic. The task was a
        small X (Twitter) clone built from written stories. This is what I took from it.
      </p>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className={h2}>The idea</h2>
          <p className={p}>
            A story goes through three Claude Code skills, and a person has the last word.
            <code> /implement-story</code> writes the tests and the code,{" "}
            <code>/review-pr</code> reviews the change with fresh eyes, and{" "}
            <code>/qa-evidence</code> records one video per acceptance criterion. A board moves the
            card at each step. Only a human can move it to Done.
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
          <h2 className={h2}>What I did</h2>
          <p className={p}>
            I built all ten stories earlier with a different coding agent. At the workshop I ran
            the same flow on a fresh clone for two stories, XC-5 and XC-8, then re-ran everything
            on my earlier build. It passes lint, 102 unit tests and 83 end-to-end tests. Every
            story has QA videos on the board.
          </p>
        </section>

        <section>
          <h2 className={h2}>What I learned</h2>
          <ul className="mt-3 list-disc space-y-3 pl-5 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong className="font-medium text-zinc-900 dark:text-zinc-100">
                Review reads code, QA runs it.
              </strong>{" "}
              The review approved XC-5. Recording the videos then failed, because the recorder adds
              a caption that matched a loose text selector. Only running the test showed it.
            </li>
            <li>
              <strong className="font-medium text-zinc-900 dark:text-zinc-100">
                Say where the spec and the system disagree.
              </strong>{" "}
              XC-8 asks for tweets from all users, but the API returns only your own and those you
              follow. Claude stopped and asked. I chose to test what the API gives and wrote the
              gap on the ticket, instead of faking data.
            </li>
            <li>
              <strong className="font-medium text-zinc-900 dark:text-zinc-100">
                The human step is the point.
              </strong>{" "}
              Videos make acceptance quick, but someone still has to watch them. Re-recording
              reused file names, so old comments opened the new videos. Worth knowing.
            </li>
            <li>
              <strong className="font-medium text-zinc-900 dark:text-zinc-100">
                A flaky test is not a fixed test.
              </strong>{" "}
              One test failed once and I could not reproduce it in eight reruns. I noted it
              rather than calling it done.
            </li>
            <li>
              <strong className="font-medium text-zinc-900 dark:text-zinc-100">
                Hooks and scoped rules are optional.
              </strong>{" "}
              The instructors said to drop them when short on time. I set up both anyway, and they
              work as guard rails, but the board and the videos carry the value.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={h2}>What this says about AI in a company</h2>
          <p className={p}>
            This is my reading, from one day and one small app, not a study. Many companies talk
            about AI transformation as buying a tool. The workshop made it look more like
            redesigning how work is checked.
          </p>
          <ul className="mt-3 list-disc space-y-3 pl-5 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong className="font-medium text-zinc-900 dark:text-zinc-100">
                Writing code gets cheap; deciding and checking do not.
              </strong>{" "}
              Claude built a story in minutes. The slow parts were a requirement that
              contradicted itself and a person accepting the result. Most real organisations
              have the same unclear requirements, only less visible.
            </li>
            <li>
              <strong className="font-medium text-zinc-900 dark:text-zinc-100">
                Process has to be written down before an agent can follow it.
              </strong>{" "}
              The skills, the board rules and the rule that only a person moves a card to Done
              are plain files. A team that runs on habit and hallway agreements has to make
              them explicit first. That work is useful even without AI.
            </li>
            <li>
              <strong className="font-medium text-zinc-900 dark:text-zinc-100">
                Evidence beats confidence.
              </strong>{" "}
              An agent says it is done. A video of the criterion passing is something a manager
              can check in thirty seconds. I would ask for this kind of proof in any AI-assisted
              workflow.
            </li>
            <li>
              <strong className="font-medium text-zinc-900 dark:text-zinc-100">
                The human role moves, it does not disappear.
              </strong>{" "}
              People spend less time typing and more time owning decisions: accepting a gap,
              judging a flaky test, noticing that old comments now open new videos. That needs
              judgement and accountability, so it is not a role to cut first.
            </li>
            <li>
              <strong className="font-medium text-zinc-900 dark:text-zinc-100">
                Shared systems pay for the speed.
              </strong>{" "}
              Fast automated runs left dozens of throwaway accounts on a shared API. Companies
              adopting agents will need the same hygiene: test data, rate limits, clean-up and
              clear ownership.
            </li>
          </ul>
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
