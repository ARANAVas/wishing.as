# WishingASR v65.12 — Full-site Responsive Optimization

## Release highlights

- Full responsive pass across all 30 HTML pages and the shared stylesheet.
- Fixed action-button text splitting and narrow 3–4 column button groups on the Tools page.
- Reworked tool action controls into consistent two-column groups, with one-column fallback for very narrow phones.
- Improved select-heavy forms, input containment, button label wrapping and touch sizing.
- Updated CSS/JS cache version to 65.12 on every HTML page.
- Preserved current product styling, page structure, SEO content, card exports, backup/restore, planner, calendar and drone features.

## QA summary

- 210 page/viewport measurements across 320, 360, 390, 430, 768, 1024 and 1440 CSS-pixel widths; zero document-level overflow findings.
- HTML/static SEO/accessibility and security suites passed.
- All 8 Node runtime regression suites passed.
- Canvas text/signature layout tests passed.
- CSS parser reported zero errors.

See `QA_REPORT.md` for scope, test methodology and limitations.

## Deployment

This ZIP is a source release and does not deploy itself. Upload the contents of `wishingasr_work` to the existing Vercel project and redeploy. The live website will not change until deployment completes.
