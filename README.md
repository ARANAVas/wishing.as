# WishingASR v67.1 — Drone Show Performance & Visual Polish

WishingASR is a static HTML/CSS/JavaScript platform for thoughtful greetings, personalized greeting cards and occasion-based creative tools. This release preserves the current product identity and features while refining editorial quality, transparency, privacy explanations and responsive maintenance.

## Local preview

- Windows: double-click `START_LOCAL_PREVIEW.bat`.
- Open the localhost URL printed in the command window.
- Keep the command window open while testing. Press Ctrl+C to stop.

## v67.1 drone-show improvements

- Responsive drone-point budgets now adapt to device memory, CPU concurrency and the browser's Save-Data preference.
- Animation layers are paused while the display is off-screen or the browser tab is hidden.
- Removed per-drone continuous halo animation and expensive SVG blur/drop-shadow filters; one subtle light twinkle remains.
- Added a lightweight static star field and orbital frame for visual depth.
- Caption and show label widths wrap safely on narrow screens.
- Added a dedicated performance regression suite for standard, constrained and data-saver devices.

## Validation

Install the one QA-only Python dependency, then run the following from this folder:

```bash
python -m pip install -r requirements-qa.txt
python qa_content_quality.py
python qa_static.py
python qa_security_static.py
```

Run each `qa_*.cjs` file with Node for its feature regression checks. A GitHub Actions workflow under `.github/workflows/quality-check.yml` repeats these checks on pushes and pull requests to `main`. The full recorded results and limits are in `FINAL_QA_V67_1.md` (with the prior content-quality remediation history retained in `FINAL_QA_V67.md`).

## Deployment

Deploy the **contents** of this `wishingasr_work` folder to the existing WishingASR Vercel project. This ZIP does not deploy itself. After deployment, verify the live homepage, all 20 guide pages, `/robots.txt`, `/sitemap.xml`, `/ads.txt`, canonical URLs and creator/tool interactions before requesting a new AdSense review.

See `DEPLOY_V67.txt` for the deployment checklist and `V67_RELEASE_NOTES.md` for the scope of this release.

## Important product and privacy notes

- Saved wishes and birthday/anniversary planner entries are stored locally in the browser. Export anything you want to keep before clearing browser storage.
- The planner exports `.ics` calendar files; it is not a background push-notification service.
- Photos selected in the greeting-card creator are processed in the browser for preview and export; the static creator does not upload them to a WishingASR server.
- Public shareable greeting pages require backend storage and explicit consent; they are not part of this static build.
- The existing publisher ID and `ads.txt` entry are preserved. `ads.txt` was already authorized in the supplied AdSense screenshot, so this release does not change it.
- Page-level AdSense loading is omitted from the contact, privacy, terms and AA Group parent-company utility pages; it remains on the primary product, guide, blog and tools pages.

## Review note

The content edits are intended to make individual guides more useful and less repetitive. They do not guarantee AdSense approval. Google reviews the complete live website, its original and useful content, navigation, user experience and policy compliance. Genuine user interest and continuing maintenance must be demonstrated after deployment; they cannot be proven by source-code checks.
