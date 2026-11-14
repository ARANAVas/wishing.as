# WishingASR v65.12 — Full-site QA Report

Date: 2 November 2026

## Scope

Reviewed all 30 HTML pages and the shared stylesheet, plus page-specific inline styles. The optimization targets site-wide mobile behavior and the action controls shown in the supplied Android screenshots while preserving the existing feature set and premium visual direction.

## Issues found and fixed

- The Tools page used flex-shrink sizing for 3–4 actions in one row. At common phone widths, controls collapsed to roughly 61–95 CSS pixels, causing labels such as “Copy message”, “Restore backup” and “Download invitation card” to wrap into narrow vertical stacks.
- `.tool-card` inherited `overflow-wrap:anywhere`, which allowed button labels to split at arbitrary character boundaries.
- Select-heavy form rows were cramped on narrow screens, especially the invitation theme and format controls.

## Changes delivered

- Applied word-boundary wrapping to buttons and action links throughout the site; long prose and URLs retain their existing wrapping behavior.
- Standardized Tools page actions to a two-column grid, with a full-width final action for odd-numbered groups.
- Switched Tools action groups to one column below 381 CSS pixels.
- Set clear touch heights, centered labels, safe minimum widths and consistent gaps for tool actions.
- Stacked select-heavy tool rows on narrow screens; retained side-by-side date/time rows when there is adequate space.
- Added min-width containment for cards, form controls and nested content to reduce intrinsic-width layout issues.
- Updated all 30 pages to request shared CSS/JS assets with cache version `65.12`.
- Preserved the existing 45 occasion-specific drone formations, calendar data, exports, backups, invite maker, saved wishes, language options, SEO pages and existing business/product pages.

## Responsive layout validation

- 30 HTML pages measured at 320, 360, 390, 430, 768, 1024 and 1440 CSS-pixel widths.
- Total: 210 page/viewport layout measurements.
- No document-level horizontal overflow was detected at the tested widths.
- The homepage occasion filter chips intentionally use a horizontally scrollable row; this does not increase document width.
- Tools action group checks confirmed two columns at 390–768+ px and one column at 320–360 px. Buttons use `overflow-wrap: normal` and `word-break: normal`.
- Captured and reviewed 390px layout previews for Home, Tools, Quotes, AA Group and Contact.
- Chromium layout testing used embedded HTML/CSS via `page.set_content`; external network and local file navigation are restricted in this environment. JavaScript was removed for these static layout snapshots, so these screenshots validate CSS layout, not runtime animations or live interactions.

## Automated regression results

- `qa_static.py`: PASS — HTML semantics/accessibility, local links, unique SEO metadata/canonicals, sitemap coverage, JSON-LD, JavaScript syntax, export/backup/planner logic, drone profiles, calendar and Vercel routing/security/cache rules.
- `qa_security_static.py`: PASS — 30 pages use the same-origin shared UI script; no executable inline scripts; explicit button types; viewport/image checks; security headers and immutable script caching.
- 8 Node runtime suites: PASS — calendar data, calendar rendering, 45 drone profiles, growth/copy helpers, shared site UI, export/reminder helpers, backup/restore/planner/invitation exports and wish/caption generation flows.
- `qa_canvas_layout.cjs`: PASS — all five tested export text/signature fit samples remain within safe width.
- CSS parsing: PASS — 2,313 top-level nodes, zero parse errors.
- Cache audit: PASS — all 30 HTML pages use asset version `65.12`.

## Verification boundaries

This is a source-package audit. It does not claim that the changes are already live on Vercel. Real Android/iOS device testing, browser-specific downloads/sharing, live AdSense verification, Lighthouse scores and Core Web Vitals still require post-deployment checks. The supplied screenshots guided the fixes; the measured viewport checks were performed in Chromium with static page markup/CSS.

## Deployment

Upload the contents of the `wishingasr_work` directory to the existing WishingASR Vercel project and redeploy. After publishing, hard-refresh the mobile browser so it fetches the `65.12` assets.
