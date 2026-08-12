## 1. P0 — Polish

- [x] 1.1 Consolidate tokens in global.css: delete --color-accent-warm and --color-info (grep consumers first), keep single --color-accent; remove orphaned --color-accent-identity-glow / --color-surface-glow if grep confirms zero consumers
- [x] 1.2 BaseLayout.astro: theme-color meta #0a0a0f -> #0a0e14
- [x] 1.3 tabular-nums: font-variant-numeric: tabular-nums on terminal readouts (dates, progress %, uptime, host info)
- [x] 1.4 Hover craft: filter chips (scale+shadow), links (copper underline reveal), contact tiles, card lift refinement — transform/opacity only, <=200ms, prefers-reduced-motion gated
- [x] 1.5 Directional light: radial-gradient overlay (top-left source, very low alpha) over the BlueprintGrid layer
- [x] 1.6 Card.astro: single top accent bar (drop the duplicate ::before overlap)
- [x] 1.7 Verify: astro check + render + screenshots (desktop 1440x900 + mobile 390x844) — hover states, no layout shift

## 2. P1 — Craft pass

- [x] 2.1 Boot: sequential module-loading lines in boot-frames.js/boot.js (keep timing, skip, quick-mode, reduced-motion)
- [x] 2.2 Display-scale type on non-H1 surfaces: featured project card title (projects.astro), stat readouts; max 2 display surfaces per viewport
- [x] 2.3 Project card hierarchy: larger title, pill-shaped tags, hover accent glow
- [x] 2.4 Variable font: mono wght shift on hover (no reflow), Inter font-optical-sizing auto
- [x] 2.5 Section rhythm tokens --section-gap-sm/md/lg applied consistently across index modules
- [x] 2.6 now.astro: inline styles -> CSS tokens (travel rows, headers)
- [x] 2.7 Verify: astro check + screenshots at 1440x900 + 390x844 across /, /projects, /now

## 3. P2 — Depth

- [x] 3.1 Scroll choreography: animation-timeline view() ranges (experience line-draw, staggered card reveals) + is-visible fallback + reduced-motion gating
- [x] 3.2 Film-graded light: directional copper source with falloff across surfaces/glows
- [x] 3.3 Animated grain (opacity-only, small tile) + CSS parallax (transform-only)
- [x] 3.4 Verify: motion with reduced-motion OFF and ON, no-JS page completeness, no jank

## 4. Specs + validation

- [x] 4.1 Delta specs: visual-system, boot-into-content, project-showcase, site-config (content below)
- [x] 4.2 openspec validate --change visual-elevation passes
- [x] 4.3 Final render verification per page (screenshots reviewed)
