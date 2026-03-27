# Project Conventions

## Editing guidance

- Keep changes minimal and scoped to the current request.
- Match the existing editorial/portfolio style rather than introducing new UI patterns.
- Prefer updating `app/data/copy.js` and `app/data/projects.js` for content changes instead of hardcoding strings in components.

## Homepage architecture

- `site-shell.js` owns interactive behavior:
  - theme mode
  - menu state
  - scroll compacting
  - hero snap behavior
  - reveal animation setup
- `home-sections.js` owns homepage markup/section composition.

## Hero section rules

- The hero is intentionally minimal.
- The current design keeps only CTA + scroll prompt below the ASCII scene.
- Be careful not to reintroduce removed headline/supporting text unless explicitly requested.
- `hero-ascii-scene.js` should preserve the static fallback for reduced-motion and compact viewports.

## Contact section rules

- Keep contact actions compact and simple.
- Current design uses two main buttons:
  - email
  - GitHub
- Do not add extra helper text or duplicate link rows unless requested.

## Content model

- Homepage/project text lives in `app/data/copy.js` and `app/data/projects.js`.
- Project detail pages consume the project catalog directly.

## Deployment model

- GitHub Actions deploy path:
  - `.github/workflows/deploy.yml`
- Local direct deploy path:
  - `scripts/deploy-via-ssh.sh`
- Remote build/publish helper:
  - `scripts/deploy-static-on-remote.sh`
