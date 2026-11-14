# WishingASR v67.1 — Drone Show Performance & Visual Polish

**Release date:** 14 November 2026  
**Base:** WishingASR v67.0 AdSense Core Quality package.

## Drone-show improvements

- Preserves all 45 occasion-specific formations, palettes, choreography profiles and flight keyframes.
- Adds adaptive point budgets based on device width, browser device-memory / CPU hints, and the Save-Data preference:
  - Standard desktop: up to 52 lights
  - Standard tablet: up to 34 lights
  - Standard phone: up to 20 lights
  - Constrained desktop: up to 40 lights
  - Constrained tablet: up to 26 lights
  - Constrained phone: up to 14 lights
- Uses shorter and softer motion profiles on small / constrained devices while keeping the selected occasion formation intact.
- Removes the continuously animated outer halo layer and per-drone SVG blur / drop-shadow filters. The finite formation arrival plus one slower light twinkle remain.
- Removes permanent `will-change` layer promotion from every drone.
- Pauses animation when the show is outside the viewport and when the browser tab is hidden; resumes when visible again.
- Adds a lightweight static star field and orbital frame to improve visual depth without introducing a canvas/WebGL loop or large media assets.
- Adds caption and meta-label wrapping / width safeguards for small phone screens.
- Honors reduced-motion preferences with a static, fully visible formation.

## Regression and QA

- 45/45 occasion formations are still covered by `qa_drone_runtime.cjs`.
- New `qa_drone_performance.cjs` covers standard and constrained device budgets, Save-Data scaling, tab visibility pause/resume, reduced filter use and reduced-motion support.
- All 10 runtime `qa_*.cjs` suites pass.
- `qa_static.py`, `qa_security_static.py` and `qa_content_quality.py` pass.
- CSS parser: 2,357 top-level rules, zero parse errors.
- Local preview smoke test: 46/46 selected routes and assets returned HTTP 200.
- 81 local CSS/JS versioned references use cache token `67.1`.

## Performance measurements (file transfer only)

| Asset | Source size | Gzip size |
|---|---:|---:|
| `app.js` | 222,182 B | 64,382 B |
| `styles.css` | 406,211 B | 82,946 B |

These are compression measurements, not frame-rate, Lighthouse or Core Web Vitals measurements.

## Known verification limit

A headless Chromium screenshot was attempted but the browser process did not complete in this environment. This release therefore does not claim screenshot-based overlap measurement, physical Android/iOS testing or cross-browser confirmation. After deployment, inspect at 320, 360, 390, 430, 600, 768, 1024 and 1440 CSS-pixel widths, in portrait and landscape, and test all 45 occasion selections. The live Vercel deployment has not been changed by building this ZIP.
