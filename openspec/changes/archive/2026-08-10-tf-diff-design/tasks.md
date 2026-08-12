1. Download Clash Display woff2 (400/500/600/700) from Fontshare CDN into public/fonts/clash-display/ and add 4 @font-face rules + --font-display token in src/styles/global.css.
2. Add --color-tf-* alias tokens to global.css :root.
3. Apply --font-display to section/module titles (moderate usage).
4. Add .tf-diff-prefix utility + apply diff prefixes to project cards, experience entries, skill category headers.
5. Add optional planSummary to projects schema (content.config.ts) + render plan line on project cards.
6. Visual QA: build + render check (desktop 1440x900, mobile 390x844, reduced-motion variant), verify layout/alignment/spacing.
