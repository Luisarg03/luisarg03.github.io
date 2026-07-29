## Why

The current portfolio is technically solid and visually coherent, but the "Control Panel" theme is placeholder-grade — a generic terminal aesthetic, not a personal brand. The hero, timeline, and skills sections are functionally correct but lack a visual detonant that makes the site memorable or distinct from the dozens of other dev portfolios using the same pattern. The opportunity is to evolve the Control Panel metaphor into a deliberate personal brand: distinct monogram, opinionated color accent, scroll-driven motion, and a command palette — without rebuilding from scratch.

## What Changes

- **Personal brand foundation**: ASCII monogram "LP" derived from `~/luisarg`; unified color palette (control blue `#58a6ff` + copper accent `#f0b429` + system green `#3fb950`); defined as design tokens usable across portfolio, future pages, and external surfaces.
- **Typography upgrade**: Variable fonts (Inter for display, JetBrains Mono for UI chrome) loaded via `@fontsource-variable`; weight animation on hover/scroll without JS.
- **Tailwind v4 `@theme` directive**: replace manual CSS custom properties in `global.css` with Tailwind v4's CSS-first config, keeping the same token names so existing components don't break.
- **View Transitions**: Astro 7 `<ClientRouter />` for SPA-like navigation between `index` and `/now`; `prefetch` enabled for instant page loads.
- **Hero redesign**: ASCII monogram banner, typewriter effect rotating roles (Cloud Platform Engineer / IDP builder / Data pipelines), bento stat widgets of varied sizes.
- **Sections refactor**: bento grid layout replacing uniform panel widths; scroll-driven animations using CSS `animation-timeline: view()` and `scroll()` (Chrome 115+, Safari 26+, FF behind flag — graceful fallback for unsupported browsers).
- **Skills visualization**: radar/polar chart showing category proficiency plus grouped tag list; replaces flat topology clusters.
- **Experience timeline**: scroll-driven line drawing, year-grouped, with current role visually anchored via accent glow.
- **Command palette**: `⌘K` / `Ctrl+K` opens a fuzzy-searchable navigation hub (sections, contact links, external profiles). Reinforces dev-tool identity.
- **Blueprint grid interaction**: nodes gently gravitate toward cursor when idle; falls back to current static behavior on touch/reduced-motion.
- **Mouse-aware status bar**: footer shows scroll position, current section name, and time of day — feels "live" without adding real network calls.

## Capabilities

### New Capabilities

- `personal-brand`: Monogram, color tokens, typography stack, motion language — the visual identity system.
- `site-navigation`: View Transitions, command palette, section anchors, scroll-aware status bar.
- `visual-system`: Bento grid layout primitives, scroll-driven animation utilities, panel/border conventions.
- `skills-visualization`: Radar/polar chart of skill categories with grouped tag list.
- `experience-timeline`: Interactive timeline with scroll-driven line drawing and year grouping.

### Modified Capabilities

None — this is the first formal change; no existing specs to modify.

## Impact

- `src/styles/global.css` — replace manual CSS custom properties with `@theme` block; keep legacy var names as aliases during migration.
- `src/layouts/BaseLayout.astro` — add `<ClientRouter />`, prefetch hints, scroll-aware status bar, command palette mount point.
- `src/components/Hero.astro` — full rewrite (monogram, typewriter, bento widgets).
- `src/components/SkillMap.astro` — replace tag-grid with radar + grouped tags.
- `src/components/ExperienceTimeline.astro` — scroll-driven line, year grouping.
- `src/components/BlueprintGrid.astro` — add cursor-gravity effect.
- `src/components/CommandPalette.astro` — new component (searchable nav).
- `src/components/SectionPanel.astro` — extend to support bento sizing variants.
- `package.json` — add `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono`, `cmdk` or `kbar`-style minimal fuzzy search.
- `public/` — add monogram SVG export for non-ASCII fallback contexts (e.g., OG image).
- `astro.config.mjs` — enable `prefetch` default, configure view transitions.
- `tailwind.config`/CSS — `@theme` block with new tokens.

Out of scope (separate changes if pursued later):
- `/now` page refactor (current content layout stays).
- New pages: `/uses`, `/blog`, `/projects`.
- Multi-language (es/en).
- Light mode (dark only for now).
- Heavy 3D/WebGL backgrounds.
