# Project Overview

## What this project is

This is a static-exported personal website built with `Next.js 16` App Router and deployed as plain files.

## Core stack

- `next@16.2.1`
- `react@19.2.4`
- `react-dom@19.2.4`
- `three`

## Rendering model

- `next.config.mjs` uses `output: "export"`
- production output is generated into `out/`
- no server runtime is required for the deployed site

## Main app structure

- `app/layout.js` — global metadata, fonts, theme bootstrap
- `app/page.js` — homepage entry
- `app/site-shell.js` — homepage behavior/state orchestration
- `app/home-sections.js` — homepage sections and content composition
- `app/hero-ascii-scene.js` — Three.js ASCII hero scene with small-screen/static fallback
- `app/cozy-window-shade.js` — canvas-based ambient window-shade light effect behind the hero
- `app/data/copy.js` — shared copy/content strings
- `app/data/projects.js` — project catalog and detail data
- `app/projects/[slug]/...` — project detail pages

## How to run

```bash
npm run dev
npm run build
```

## Validation

Primary validation for this repo is:

```bash
npm run build
```
