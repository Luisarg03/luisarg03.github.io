## 1. Neofetch card markup
- [x] 1.1 IdentityModule: add the neofetch card (Arch ASCII pre copper aria-hidden, one bordered info box, user line luis@cloud) with rows from cv.ts where data exists (name, role, location, years, company) and the hardcoded playful rows per design D2
- [x] 1.2 Owner approval of the row wording (checkpoint — owner specified the 4-row set at rework: OS/Host/Kernel/Uptime)
## 2. Responsive layout
- [x] 2.1 Card rework: card is a full-width block below the identity content (no side rail); interior art left + info right at >=640px, stacked below 640px with the art visible (10px font in the 640-719px band instead of hiding)
- [x] 2.2 First-viewport comprehension at 5 widths: name + all 4 identity labels above the fold at scrollY 0 at 1440/1024/768/640/390 (playwright assertion); no horizontal overflow at any width
## 3. Verification
- [x] 3.1 astro check + build pass
- [x] 3.2 Playwright: comprehension 5 widths; art visible at every width incl. 390; no overflow at every width; card reads `OS : ...` (real colons); no regressions (full suite)
- [x] 3.3 Lighthouse: contrast passes (copper ASCII 11.19:1), a11y unchanged
- [x] 3.4 Screenshots (desktop + mobile) and designer visual gate
- [x] 3.5 Archive the change
