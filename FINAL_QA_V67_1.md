# WishingASR v67.1 — Final QA Report

**Status:** Source package checks passed; live visual-device verification remains outstanding.  
**Build:** `WishingASR v67.1 - Drone Show Performance & Visual Polish`  
**Live deployment:** Not changed by this ZIP build.

## Test results

| Test | Result |
|---|---|
| Runtime regression suites | PASS — 10/10 `qa_*.cjs` suites |
| Drone choreography | PASS — 45 occasion IDs, distinct motifs, choreography, profiles and named flight keyframes |
| Drone performance regression | PASS — standard and constrained budgets, Save-Data scaling, visibility pause/resume and reduced-motion rules |
| Main static QA | PASS |
| Security/static QA | PASS |
| Content-quality QA | PASS |
| CSS parse | PASS — 2,357 top-level rules, 0 parse errors |
| Local HTTP preview | PASS — 46/46 selected routes and assets returned HTTP 200 |
| Cache-busting audit | PASS — 81 CSS/JS references use `v=67.1` |

## Drone rendering behavior

Standard point caps remain 52 desktop / 34 tablet / 20 phone. When browser capability hints report Save-Data, device memory at or below 4 GB, or four or fewer logical CPU cores, caps reduce to 40 / 26 / 14 respectively. Missing browser hints do not force a low-power tier.

The drone groups retain one finite occasion-specific formation-entry animation. Lights retain one slow twinkle. The outer halo is static, SVG blur/drop-shadow filters are disabled in the final layer, and all motion is paused off-screen or while the tab is hidden. Reduced-motion users receive a static formation.

## Responsive visual changes

A static star field and orbit frame add depth without another animation loop. The caption and metadata are constrained to the stage width and wrap rather than extending beyond narrow viewports. The drone stage remains clipped to its rounded panel.

## Limits

The headless Chromium screenshot attempt did not complete in this environment. This report does not claim a screenshot/browser render, actual on-device overlap measurement, Android/iOS hardware test, Safari/Firefox test, frame-rate measurement, Lighthouse score or Core Web Vitals score. Those checks should be completed after deployment on the actual website.

## Deploy

1. Back up the current Vercel-connected repository.
2. Extract this ZIP and replace the repository files with the contents of `wishingasr_work/`.
3. Commit and wait for the Vercel deployment to complete.
4. Test the drone display on 320, 360, 390, 430, 600, 768, 1024 and 1440 CSS-pixel widths; include landscape, Data Saver / low-power mode if available, tab switching, scrolling off-screen and reduced-motion mode.
5. Verify all 45 occasion formations and the greeting creator, calendar, saved wishes and exports before requesting an AdSense review.
