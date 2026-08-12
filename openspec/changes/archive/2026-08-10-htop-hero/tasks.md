1. Create HtopWindow.astro: window frame, title bar, column header, identity row (H1, teal highlight), 8 skill rows from cv.ts (real data mapping above), status bar, responsive breakpoints (full/condensed), CSS hover highlight, no JS interactivity.
2. index.astro: swap IdentityModule + SkillsModule for HtopWindow + host details section; keep ExperienceModule; anchors #htop (window), #experience unchanged; remove #identity/#skills anchors.
3. boot-frames.js: last frame `[ OK ] htop --sort=cpu`.
4. boot.js: handoff sequence (fade → window → cascade bar fill, one timing function), reduced-motion + no-JS instant state.
5. CommandPalette: cd /identity + cd /skills re-point to #htop anchor.
6. global.css: .htop-* styles (frame, title bar, header row, rows, bars copper/teal, status bar, host details section, mobile breakpoints).
7. Remove now-orphaned IdentityModule/SkillsModule imports (delete files ONLY if nothing else imports them — check /terminal etc. first; if /terminal uses them, keep files and only unimport from index).
8. Visual QA: build + render check desktop 1440 + mobile 390 + reduced-motion + no-JS (playwright), verify bars fill sequence, alignment, overflow.
