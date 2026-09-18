# Repository Guidelines

## Project

Personal website for Jiajia Zhang: a bilingual (English/Chinese) Next.js content site
plus static support/privacy pages for the `Solis` and `ThreadLite` apps. Content is
first-party only; there is no CMS and no backend API of this repo's own.

## Production deployment warning

**This repository auto-deploys to production.** `.github/workflows/deploy.yml` runs on
`push` to `main` or `master` (and on `workflow_dispatch`), SSHes to an Oracle Cloud
instance, rebuilds the site, and verifies it over HTTPS. There is no separate staging
environment.

Therefore: never push to `main`/`master`. Do not merge to `main` yourself. Do not use
`npm run deploy` / `npm run upload` unless explicitly asked. See "Git Safety" below.

## Project Structure & Module Organization
- `app/`: Next.js App Router (with `app/[lang]/...` for i18n). Pages for posts, tools, works, sitemap, robots. `app/solis/` and `app/threadlite/` hold the app support and privacy pages.
- `components/`: Reusable React components (e.g., `profile-card.tsx`, `mdx-components.tsx`).
- `content/`: Source content. Posts live under `content/posts/YYYY-MM-DD title/` with `en.md`, `zh.md`, and assets alongside. `content/life-posts/`, `content/categories/`, `content/tags/`, and `content/life-categories.yml` follow the same convention defined in `velite.config.ts`.
- `dictionaries/`: i18n strings (`en.ts`, `zh.ts`, `index.ts`). Keep keys in sync.
- `lib/`: Utilities (dates, arrays, metadata helpers).
- `styles/`: Tailwind CSS globals (`styles/globals.css`).
- `scripts/`: Deployment/OCI helpers used by the GitHub Actions workflow and local runs.
- `public/`: Static assets (`public/images`, `public/static`).
- Root config: `next.config.mjs`, `open-next.config.ts`, `velite.config.ts`, `tailwind.config.js`, `wrangler.jsonc`, `.eslintrc.json`, `.editorconfig`.
- `DEPLOYMENT.md` documents the production deployment model and required secrets. Read it before touching deployment.

## Build, Test, and Development Commands
- `npm install`: Install dependencies.
- `npm run dev`: Start local dev server.
- `npm run lint`: Run ESLint (`next lint`).
- `npm run build`: Production build (`next build`). This is the real correctness gate.
- `npm start`: Serve an existing production build locally.
- `npm run preview`: Build with OpenNext and preview in the Cloudflare Workers runtime.
- `npm run deploy` / `npm run upload`: Build with OpenNext and push to Cloudflare Workers. **Not part of normal development — see the production deployment warning above.**
- `npm run cf-typegen`: Regenerate `cloudflare-env.d.ts` after changing `wrangler.jsonc` variables or bindings.

There is no lint/build CI gate in this repository. `.github/workflows/deploy.yml` is a
production deployment workflow, not a quality gate — a green run there means the site was
published, not that the change was reviewed. Run `npm run lint` and `npm run build`
locally before handing work back.

## Coding Style & Naming Conventions
- Language: TypeScript (strict mode). Framework: Next.js 15 App Router + React 19.
- Indentation: 2 spaces; LF line endings (`.editorconfig`).
- File naming: kebab-case for files (`flippable-card.tsx`), PascalCase for components, camelCase for variables.
- Styling: Tailwind CSS; prefer utility classes and `tailwind-merge` to resolve conflicts.
- Linting: ESLint (`next/core-web-vitals`). Fix warnings before PR.

## Testing Guidelines
- No formal test suite yet. Validate pages and content locally (`npm run dev`) and ensure production build passes.
- If adding tests, place unit tests next to modules or under `__tests__/` with `*.test.ts(x)` and keep them fast.

## Commit & Pull Request Guidelines
- Commits: Clear, imperative messages (e.g., "Update featured works", "Fix slug"). Group related changes.
- PRs must include: concise description, rationale, screenshots for UI changes, and links to issues (if any).
- i18n: Update both `en` and `zh` where applicable (content and `dictionaries/`).
- Content: For new posts, use folder pattern `content/posts/YYYY-MM-DD title/` with `en.md`, `zh.md`, and related images.
- Checks: Ensure `npm run lint` and `npm run build` succeed before requesting review.

## Git Safety

- Before editing: run `git branch --show-current` and `git status --short`.
- Protected branch: `main` (and `master`). **Never develop directly on it** — create a task branch first (`feat/…`, `fix/…`, `ui/…`, `refactor/…`, `chore/…`, `docs/…`; concise kebab-case, not `test`/`new`/`temp`).
- **Never merge into `main`/`master`, never push to them, never force push, never rewrite their history.** Pushing `main` triggers a production deploy.
- Dirty worktree: preserve unrelated changes exactly. Do not stash, revert, or commit them. If your change would mix with them, stop and report what conflicts.
- Commits: include only files belonging to the requested task; use `feat:`, `fix:`, `ui:`, `refactor:`, `test:`, `docs:`, `chore:`. Never amend existing user commits.
- Never run `git reset --hard`, `git clean -fd`, `git checkout -- .`, or `git restore .`.
- Do not delete branches or untracked user files.

## Project-Specific Rules

- **Bilingual by default.** Any user-facing string, post, or dictionary key must exist in both `en` and `zh` (`dictionaries/en.ts` + `dictionaries/zh.ts`, and content folders with `en.md` + `zh.md`). A one-language change is incomplete.
- **Content is data, not code.** Adding a post means adding a folder under `content/posts/` (or `content/life-posts/`) using the `YYYY-MM-DD title` pattern with `en.md`, `zh.md`, and assets alongside it. Do not restructure `content/` to make editing easier.
- Follow `velite.config.ts` as the schema source of truth for front matter. The collections are `categories/*.yml`, `tags/index.yml`, `posts/**/*.md`, `life-categories.yml`, and `life-posts/**/*.md` under the `content` root. Markdown image assets are emitted to `public/static/posts` as `[name]-[hash:6].[ext]` — never hand-place post images there.
- The `content/posts/` and `content/life-posts/` directories exist but currently hold no content; the convention above still applies.
- Reuse existing components in `components/` and the Tailwind tokens/utilities already in use. Do not introduce a second design system, a component library, or a CSS-in-JS solution.
- Keep the site static-first. Do not add a database, auth, or server-side API routes without an explicit request.
- The Cloudflare/OpenNext path (`open-next.config.ts`, `wrangler.jsonc`) and the Oracle Cloud CI path in `DEPLOYMENT.md` are separate deployment models. Do not "unify" them or migrate the live site as a side effect of another task.
- Do not edit `scripts/oci-temporary-ssh-rule.sh` (it opens and revokes real NSG ingress for the CI runner) or `scripts/deploy-static-on-remote.sh` (it builds and publishes on the production host) without reading `DEPLOYMENT.md` first and without explicit authorization.
- Third-party brand marks are used in an "open source" presentation context; keep `public/static` assets as they are unless asked to change them.

## Dependencies

- `package-lock.json` is committed. Do not modify it unless the task requires a dependency change.
- Do not add a dependency when the Next.js/React/Tailwind stack already covers the need.
- Do not perform broad upgrades of Next, React, Tailwind, or `@opennextjs/cloudflare`; a version change couples the Cloudflare and Oracle deployment paths.
- No `engines` field or `.nvmrc` is present. Match the version used by CI and confirm locally before reporting; do not assume a Node version.

## Safety

- Never commit secrets, tokens, SSH keys, or `known_hosts` content. Deployment credentials live only in GitHub Actions secrets (`DEPLOYMENT.md` lists them).
- Do not run `npm run deploy`, `npm run upload`, or the OCI scripts unless explicitly authorized: they publish or mutate production infrastructure.
- Do not modify DNS, firewall/NSG rules, or the target instance as part of a site change.
- `.env*` files and local Cloudflare/Wrangler credentials must stay untracked. If a secret is already tracked, report the file path without reproducing the value.

## Definition of Done

Before reporting completion:

- confirm you are on the intended task branch, not `main`;
- review `git status` and `git diff` and confirm no unrelated file changed;
- run `npm run lint` and `npm run build` (the build is the only real correctness gate here);
- for UI changes, run `npm run dev` and check the page in both `en` and `zh`;
- for content changes, confirm both language files exist and front matter satisfies `velite.config.ts`;
- state exactly which commands ran and which did not;
- leave `main` untouched, do not merge, do not push.

## Handoff

Report concisely:

- **Completed** — what changed and why.
- **Validation** — exact commands and results; note anything unverified.
- **Git** — branch, commit(s), whether the work is committed (and not pushed).
- **Files changed** — important paths.
- **Remaining issues** — known breakage, unverified behavior, stale docs.
- **Next action** — review, merge, or deploy decision for the owner.

Never report "done" because code was written. Green requires a command that actually ran.
