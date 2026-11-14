# WishingASR v66.1 — final profile link and responsive polish

WishingASR is a static HTML/CSS/JavaScript platform for thoughtful greetings, personalized greeting cards and occasion-based creative tools. This release preserves the current product identity and features while refining the editorial quality and reading experience of the public wish guides.

## Local preview

- Windows: double-click `START_LOCAL_PREVIEW.bat`.
- Open the localhost URL printed in the command window.
- Keep the command window open while testing. Press Ctrl+C to stop.

## Validation

Run `python qa_static.py` and `python qa_security_static.py` from this folder. Run each `qa_*.cjs` file with Node for the feature regression checks. See `QA_REPORT_V66.md` and `FINAL_QA_RUN.txt` for the current source-package test summary.

## Deployment

Deploy the **contents** of this `wishingasr_work` folder to the existing WishingASR Vercel project. This ZIP does not deploy itself. After deployment, verify the live homepage, several guide pages, `/robots.txt`, `/sitemap.xml`, `/ads.txt`, canonical URLs and card/tool interactions before requesting a new AdSense review.

See `V66_RELEASE_NOTES.md` for the changes in this release and `EDITORIAL_CONTENT_MAP_V66.md` for the revised guide pages. The previous v65.12 responsive work is preserved in the historical notes and existing test suites.

## Important product and privacy notes

- Saved wishes and birthday/anniversary planner entries are stored locally in the browser. Export anything you want to keep before clearing browser storage.
- The planner exports `.ics` calendar files; it is not a background push-notification service.
- Photos selected in the greeting-card creator are processed in the browser for preview and export; the static creator does not upload them to a WishingASR server.
- Public shareable greeting pages require backend storage and explicit consent; they are not part of this static build.
- The existing publisher ID and `ads.txt` entry are preserved. `ads.txt` was already authorized in the supplied AdSense screenshot, so this release does not change it.

## Review note

The content edits are intended to make individual guides more useful and less repetitive. They do not guarantee AdSense approval. Google reviews the complete live website, its original and useful content, navigation, user experience and policy compliance.
