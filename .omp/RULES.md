# Project Rules

- This repository is a bilingual Next.js portfolio for Jiajia Zhang; keep user-facing content synchronized in `dictionaries/en.ts` and `dictionaries/zh.ts`.
- The primary positioning is junior product/full-stack work for internal tools, workflow automation with human review, data quality, and operational decision support.
- Prefer the existing Next.js, React, Tailwind, Remix Icon, and static-first architecture; do not add dependencies unless required.
- Keep support/privacy routes for shipped products unless a replacement route is explicitly added; remove dead portfolio UI and components only when no callers remain.
- Never run deployment commands or modify production workflows as part of site redesign work.
- Validate with `npm run lint` and `npm run build`; for UI changes also inspect both `/en` and `/zh` in a local dev server when runtime access is available.
