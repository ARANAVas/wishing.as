# WishingASR v66.1 — final profile-link and responsive QA

Date: 14 November 2026

## Delivered changes

- Updated Aranav Sharma's Chairman / Founder portfolio link in `index.html`, `about.html`, and `aa-group.html` to `https://aranavas.github.io/Aranav-Digital-Portfolio/`.
- Added a descriptive link title and kept safe external-link attributes (`target="_blank"`, `rel="noopener noreferrer"`).
- Added responsive safeguards for founder-card text, image sizing, mobile navigation height/scrolling, and narrow phone widths.
- Bumped versioned CSS/JavaScript references from `66.0` to `66.1` so browsers fetch the updated styles and scripts.
- Updated sitemap `lastmod` dates for the three pages where the profile link changed.
- Preserved the existing greeting creator, 20 designs, language options, calendar, tools, exports, saved wishes, and drone-show interactions.

## Validation results

- `python qa_static.py`: PASS.
- `python qa_security_static.py`: PASS.
- All 9 `qa_*.cjs` Node runtime suites: PASS.
- CSS parsed with `tinycss2`: 2,329 top-level nodes, 0 parse errors.
- Old portfolio URL: absent from the source package.
- New portfolio URL: present in exactly the three Chairman profile placements (plus release documentation).
- Local preview smoke test: 41 page/asset endpoints checked; 41 returned HTTP 200.
- ZIP integrity check: run after packaging.

## Testing limitation

A Chromium render attempt against the local preview was blocked with `ERR_BLOCKED_BY_ADMINISTRATOR`. Therefore this report does not claim visual runtime verification, device emulation, Safari/Firefox coverage, Lighthouse/Core Web Vitals measurements, or physical Android/iPhone testing. The CSS and runtime suites pass, but no source audit can guarantee zero bugs on every device. After deployment, visually check 320px, 360px, 390px, 430px, 768px, 820px, 1024px and 1440px widths in both themes and check the skill/tool interactions on a phone.
