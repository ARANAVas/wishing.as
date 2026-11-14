# WishingASR — optimization history

This file preserves the v65.12 responsive and usability work as a historical baseline. The current release is v66.0; see `V66_RELEASE_NOTES.md` for the editorial quality and reading-surface updates.

## v65.12 responsive improvements retained

- Corrected button labels that could split at arbitrary character boundaries.
- Standardized Tools page action clusters to two columns, with a one-column fallback for narrow phones.
- Improved touch heights, minimum widths and centered label alignment.
- Stacked select-heavy tool rows on narrow mobile screens while retaining date/time pairs where space permits.
- Hardened form, card and grid children against intrinsic-width overflow.

## Historical audit coverage

- 30 HTML pages checked at 320, 360, 390, 430, 768, 1024 and 1440 CSS-pixel viewports.
- Existing HTML/accessibility/SEO/Vercel static suite passed at the v65.12 baseline.
- Existing security/cache static suite and eight Node runtime regression suites passed at the v65.12 baseline.
- Browser-based layout checks used Chromium with locally embedded HTML/CSS and scripts removed; network/local navigation was restricted in that environment.

## Limitations

The earlier responsive audit was a source-package test, not proof of the current live deployment. Real-device testing across Android/iOS models and Lighthouse/Core Web Vitals still require post-deployment verification.
