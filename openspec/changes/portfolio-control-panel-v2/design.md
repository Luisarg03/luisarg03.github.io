## Context

The portfolio is a static Astro 7 site on GitHub Pages, currently styled around a "Control Panel" metaphor (dark theme, mono UI chrome, status indicators, blueprint-grid canvas background). The implementation is technically clean: data lives in `src/content/cv.ts`, components are isolated, design tokens are CSS custom properties in `src/styles/global.css`, and Tailwind v4 is wired up. The visual identity is generic terminal aesthetic — there's no monogram, no opinionated color accent, no signature motion.

This change evolves the existing system rather than replacing it. Components stay in their current locations, the data contract in `cv.ts` stays intact, and the new layer sits on top of the same design tokens. The deploy target (GitHub Pages) constrains the design: pure SSG, no server runtime, no client-side routing beyond what Astro 7's `<ClientRouter />` provides.

Stakeholders: Luis (the owner). No recruiters-as-users are an explicit target — the goal is a portfolio that feels like a personal project, not a CV generator.

## Goals / Non-Goals

**Goals:**
- Establish a personal brand system (monogram + palette + motion language) that survives copy-paste to other pages and external surfaces.
- Upgrade the page to feel "alive" without adding heavy dependencies: cursor-reactive background, scroll-driven animations, command palette, view transitions.
- Keep the existing data model (`cv.ts`) and content collections untouched.
- Preserve the current color tokens and component contracts; new tokens extend, don't replace.
- Maintain accessibility: respect `prefers-reduced-motion`, keyboard navigable, AA contrast.
- Stay under 150kb of client JS (current: ~3kb from the canvas script). The command palette is the only meaningful addition.

**Non-Goals:**
- Light mode.
- Multi-language.
- New pages (`/uses`, `/blog`, `/projects`) — separate change.
- Heavy 3D / WebGL.
- Touch-rewrite of `/now` page (content stays, layout can borrow visual language later).
- Real-time data integration (GitHub API, etc.).
- Analytics.

## Decisions

### 1. View Transitions via `<ClientRouter />` over manual implementation
Astro 7 ships `<ClientRouter />` (formerly `<ViewTransitions />`) which handles cross-page animation, scroll restoration, and accessibility fallbacks. Custom implementation would duplicate that surface area.
**Alternative considered:** Hand-rolled View Transitions API with `document.startViewTransition`. Rejected — reinvents what Astro provides; worse a11y story.

### 2. Tailwind v4 `@theme` directive over manual CSS custom properties
The current `global.css` has 50+ CSS variables defined manually. Tailwind v4's `@theme` block is CSS-first, generates utility classes from the same tokens, and integrates with the existing color/typography system. Old `var(--color-*)` references keep working during migration if we add `legacy-token` aliases.
**Alternative considered:** Keep manual CSS variables, just add new ones. Rejected — drift between manual vars and Tailwind utilities is exactly the maintenance burden `@theme` solves.

### 3. Variable fonts via `@fontsource-variable` over CDN fetch
`@fontsource-variable/inter` and `@fontsource-variable/jetbrains-mono` are self-hosted, no FOUT, no third-party connection at runtime. Better for Lighthouse and offline reliability. Variable axes enable weight animation without multiple file loads.
**Alternative considered:** Google Fonts with `display=swap`. Rejected — adds a network request, larger payload, worse privacy posture.

### 4. Custom SVG radar chart over a chart library
Skill categories are static, small (10 max), and need a custom visual style that matches the control panel. A 60-line SVG component is enough. No chart lib justifies the bundle weight (Chart.js ~70kb gz, Recharts ~85kb, etc.).
**Alternative considered:** D3 for the radar. Rejected — overkill for static input; the d3 dep would dwarf the chart itself.

### 5. `cmdk` for the command palette over custom fuzzy search
`cmdk` is headless, ~5kb, accessible (proper ARIA combobox semantics), keyboard-first, and the de-facto choice for `⌘K` palettes. Custom search would need to reimplement keyboard nav, focus management, and filtering.
**Alternative considered:** Build it from scratch with a `<dialog>` + filter. Rejected — the accessibility work is non-trivial and `cmdk` already solved it.

### 6. CSS `animation-timeline: view()` and `scroll()` over JS-driven scroll animations
Native browser API, runs on the compositor (no main-thread cost), no library, no intersection observer for each element. Where unsupported, fall back to existing `IntersectionObserver`-based reveal.
**Alternative considered:** GSAP ScrollTrigger. Rejected — 70kb+ for animations we can do in CSS; overkill for a portfolio.

### 7. Extend `BlueprintGrid.astro` canvas over adding a separate background layer
The blueprint canvas already runs on every page. Adding cursor-gravity inside the existing `requestAnimationFrame` loop is ~20 lines. A separate background layer would mean two competing `fixed` canvases.
**Alternative considered:** CSS-only background. Rejected — loses the dynamic nodes; the canvas is the soul of the visual.

### 8. ASCII monogram over SVG logo as the primary mark
The monogram is a string of characters rendered in monospace, styled as a `<pre>` block. Zero asset cost, scales perfectly, accessible by default, and reads as "code" — on-brand for the control panel. SVG exported as a fallback for OG images, favicon variants, and contexts where text doesn't render.
**Alternative considered:** Pure SVG monogram. Rejected — loses the "code as identity" statement. SVG becomes a derivative, not the source.

### 9. Bento grid as grid template variants, not a new component
Bento is a layout pattern, not a component. Implement as Tailwind utility classes (`col-span-2 row-span-2`, etc.) plus a `.bento` parent class that enforces `grid-template-rows: masonry`-like auto-flow. The hero bento, skills bento, and contact bento are the same primitive at different sizes.
**Alternative considered:** Per-section bespoke layouts. Rejected — duplicates the layout logic; harder to keep consistent.

## Risks / Trade-offs

- **Browser support for `animation-timeline: view()/scroll()`** → Mitigation: feature-detect via `@supports`, keep existing IntersectionObserver fallback as the no-op default; portfolio still works on Firefox today, just less animated.
- **`cmdk` bundle weight (~5kb)** → Mitigation: load only after first user interaction or on `⌘K` press; not on initial page load.
- **Canvas mouse interaction cost on low-end devices** → Mitigation: cap DPR at 2 (already done), throttle gravity update to `requestAnimationFrame`, disable gravity on `prefers-reduced-motion` and on coarse-pointer devices.
- **Variable fonts not rendering on very old browsers** → Mitigation: `@fontsource-variable` ships a static fallback weight in the same file; FOUT is brief.
- **Color contrast with copper accent on dark bg** → Mitigation: copper `#f0b429` is reserved for emphasis only (small text, icons, glow rings), never for body copy; contrast checked against `var(--color-bg)` `#0a0e14` and `var(--color-text)`.
- **View transitions on first paint cause layout shift** → Mitigation: Astro 7 handles this; we add `transition:animate="none"` to the blueprint canvas (which would look jarring during a transition) and explicit `transition:name` only on the hero block.

## Migration Plan

The change is pure-additive and reversible. No data migration, no schema change, no deploy configuration change.

1. Land `@theme` block and legacy aliases in `global.css` first — visual is identical post-merge.
2. Land `ViewTransitions` + `prefetch` separately — verify navigation still works without visual change.
3. Land personal brand tokens (monogram component, palette usage in hero) — visual diff expected.
4. Land bento grid, scroll-driven animations, radar, command palette — incremental.
5. Land blueprint cursor gravity last — pure addition to existing canvas.

Rollback: each step is a single commit; revert commits in reverse order if needed. No database, no migrations.

## Open Questions

- **Monogram direction**: The proposal says "LP" derived from `~/luisarg`. Should the final form be the literal `LP` letters, an ASCII-art version, or a symbol derived from the underscore prefix (`~` motif)? Resolution needed before `personal-brand` spec is final.
- **Command palette scope**: Should it only navigate the current site (sections, contact links), or also open external profiles (LinkedIn, GitHub, CV download) and trigger actions (toggle theme later, copy email)? Affects how much routing logic lives in the palette vs. the layout.
- **Radar chart axes**: Skill categories currently have no numeric proficiency. Do we (a) hard-code 1-5 scores per category in `cv.ts`, (b) derive from number of skills per category, or (c) skip the numeric axis and use a purely visual blob? (a) is most honest but requires the user to self-rate; (b) is automatic but meaningless; (c) sidesteps the question.
- **Copper accent overuse**: With three accent colors (blue, copper, green) plus status semantics, we risk semantic overload. Should copper replace blue as the primary accent, or stay as a secondary emphasis only? Current proposal keeps blue primary.
