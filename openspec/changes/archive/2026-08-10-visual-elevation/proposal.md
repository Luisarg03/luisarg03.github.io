## Why

The portfolio-as-OS concept (boot sequence, command palette, terminal navigation, blueprint grid) is already systemic. The execution, however, reads flat and generic next to 2026 award-level portfolios:

- **Single typographic register**: every surface uses small mono (the hero H1 is a 14px detail row by deliberate SEO decision), while display-scale clamp tokens (`--text-display` up to 4.5rem) are defined and never consumed. Award-level sites (SOTD 2026: NOTHIN', TRIONN, Everest) lead with fluid display type.
- **Texture without light**: blueprint grid, noise, and scanlines exist but nothing lights them — no directional source, no falloff. Film-graded light ("one sun, god rays, falloff") is what separates depth from flat fills in dark themes.
- **Micro-interactions nearly absent**: chips, links, cards, and toggles have no hover craft. Micro-interaction density is the highest-weight motion category in current Dev Awards scoring.
- **Accumulated debt**: duplicate accent tokens (`--color-accent-warm` = `--color-info` = `--color-accent`), orphaned components (Monogram, ShutdownModule), inline-style pollution in now.astro, theme-color meta `#0a0a0f` mismatched with background token `#0a0e14`, and a double 2px top accent bar in the Card component.

Benchmarks: the terminal/OS niche is saturated (HN: genre peaked ~2013; 9/10 terminal portfolio posts score <=5 points). ZUI_OS (zui.ooo) proves the lane still wins with a systemic metaphor, real substance behind the interface, and impeccable accessibility/performance. This change elevates the execution without touching the concept.

## What Changes

Three phases, all CSS/vanilla JS, zero new dependencies:

**P0 — Polish (low risk, high delta)**
- Consolidate tokens: delete `--color-accent-warm` and `--color-info` (duplicates of `--color-accent`); align BaseLayout theme-color meta to `#0a0e14`.
- `font-variant-numeric: tabular-nums` on terminal readouts (dates, progress %, uptime, host values).
- Hover craft on interactive elements: filter chips (scale + shadow), links (copper underline reveal), contact tiles, refined card lift.
- Directional light: subtle radial-gradient overlay (top-left source) over the BlueprintGrid layer; glows inherit direction.
- Fix the Card double accent bar (`.card-accent-top` ::before overlaps the Card's own ::before).

**P1 — Craft pass**
- Boot sequence authenticity: sequential module-loading lines (consistent with existing typed-frame timing; skip + reduced-motion behavior unchanged).
- Display-scale type on non-H1 surfaces only: featured project card title, stat readouts. The H1-as-detail-row is preserved (SEO/ATS crawlability decision).
- Project card hierarchy: larger title, pill-shaped tags, hover accent glow.
- Variable font animation: mono weight shift on hover (no reflow), Inter optical sizing auto.
- Section rhythm tokens (`--section-gap-sm/md/lg`) applied consistently across index modules.
- now.astro inline styles -> CSS tokens.

**P2 — Depth (aspirational)**
- Scroll choreography: `animation-timeline: view()` ranges with the existing IntersectionObserver `is-visible` fallback (experience line-draw, staggered card reveals).
- Film-graded light: single copper light source with falloff across surfaces and glows.
- Subtle animated grain (opacity-only), CSS-only depth (transform parallax layers).

## Capabilities

### Modified Capabilities
- `visual-system`: token consolidation, directional light system, micro-interaction hover states, tabular numerals, single-accent-bar Card fix.
- `boot-into-content`: boot sequence loads module lines sequentially.
- `project-showcase`: display-scale featured title, hover accent glow, pill tags.
- `site-config`: theme-color meta matches the background token.

### New Capabilities
None.

## Impact

**Code**: src/styles/global.css (tokens, light, type consumers, micro-interactions), src/layouts/BaseLayout.astro (theme-color), src/components/ui/Card.astro (accent bar), src/components/layout/BlueprintGrid.astro (light overlay), src/components/modules/{IdentityModule,SkillsModule,ExperienceModule,BootModule}.astro + public/scripts/boot.js (type elevation, reveals, sequential loading), src/pages/{projects,now}.astro (hierarchy, token refactor). No new dependencies.

**Visual**: elevation of the existing OS aesthetic — display type where it earns attention, directional light, interaction craft; the OS identity is unchanged.

**Guardrails (non-regression)**: prefers-reduced-motion gating, no-JS fallbacks, WCAG AA contrast, boot skip, mobile parity, keyboard accessibility, view-transition survival (document-level delegated listeners).
