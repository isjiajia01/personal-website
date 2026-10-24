## Jiajia Zhang's Homepage

[中文](./README.zh.md)

This is the source code of My Homepage.

## Stack

- [React](https://react.dev)
- [Next.js](https://nextjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [Velite](https://velite.js.org)

## Share previews

Open Graph and Twitter Card metadata use 1200×630 PNG covers in `public/og/`, with English and Chinese variants for home, work, resume, about and Afgang. Regenerate them with `node scripts/generate-share-images.mjs` (downloads open font data, using the existing Next.js renderer). The generated files are committed, so regular builds and link crawlers do not need those font downloads. After changing a cover, bump its filename version in the generator and `lib/share-preview.ts` to refresh cached image URLs.

## Deploy

Deployed to GitHub Pages at https://me.isjia.page by `.github/workflows/pages.yml` on every push to `main` (static export to `out/`, custom domain via `public/CNAME`).
