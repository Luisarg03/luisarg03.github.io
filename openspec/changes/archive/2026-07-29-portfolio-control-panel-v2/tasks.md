# Tasks: portfolio-control-panel-v2

## 1. Foundation

- [x] 1.1 Add `@fontsource-variable/inter` and `@fontsource-variable/jetbrains-mono` to `package.json`; import in `src/styles/global.css`
- [x] 1.2 Convert manual CSS custom properties in `global.css` to Tailwind v4 `@theme` block; keep legacy `var(--color-*)` references working as aliases
- [x] 1.3 Add copper accent token (`--color-accent-warm`, `#f0b429`) to `@theme` block
- [x] 1.4 Enable `prefetch` in `astro.config.mjs` (default strategy)
- [x] 1.5 Add `<ClientRouter />` to `src/layouts/BaseLayout.astro`; add `transition:animate="none"` to `<BlueprintGrid />` and explicit `transition:name` to the hero block
- [x] 1.6 Verify navigation between `/` and `/now` animates without visual regression

## 2. Personal brand

- [x] 2.1 Create `src/components/Monogram.astro` rendering "LP" as monospace `<pre>` block with the ASCII layout from the design
- [x] 2.2 Export SVG variant of the monogram to `public/monogram.svg` (used for favicon, OG image)
- [x] 2.3 Update `public/favicon.svg` to reference the monogram
- [x] 2.4 Add `og:image` meta tag pointing to a generated OG image that includes the monogram

## 3. Hero redesign

- [x] 3.1 Replace hero heading block in `src/components/Hero.astro` with: monogram (large), name, role with typewriter effect
- [x] 3.2 Implement typewriter effect as a small inline script that rotates between roles (Cloud Platform Engineer / IDP builder / Data pipelines); respects `prefers-reduced-motion`
- [x] 3.3 Refactor the four stat cards into a bento grid: two cards span 2 cols, one spans 1 col with a wider label, one is a compact status badge
- [x] 3.4 Apply `.bento` parent class and span utilities; verify mobile collapses to single column
- [x] 3.5 Verify hero is visually distinct from previous version while keeping the control-panel metaphor

## 4. Sections refactor (visual system)

- [x] 4.1 Add `.bento` utility class to `global.css` (`grid-template-columns` responsive, `auto-flow: dense`, gap tokens)
- [x] 4.2 Add `.reveal-on-view`, `.reveal-on-view-delay-1..4` utilities using `animation-timeline: view()` with `@supports` fallback to existing IntersectionObserver behavior
- [x] 4.3 Add `.draw-on-scroll` utility for SVG path stroke animation
- [x] 4.4 Extend `src/components/SectionPanel.astro` to support a `bento` prop that applies the bento grid primitive
- [x] 4.5 Apply bento sizing to the Skills and Contact sections (varied spans per item)
- [ ] 4.6 Verify visual continuity with previous design — panels, borders, corner accents preserved

## 5. Skills visualization

- [x] 5.1 Add `proficiency: number` field to each entry in `skillCategories` in `src/content/cv.ts` (0-5 scale)
- [x] 5.2 Create `src/components/SkillRadar.astro` — inline SVG polar chart with one axis per category, polygon fill, axis hover/focus interaction
- [x] 5.3 Create `src/components/SkillGroupList.astro` — grouped tag list with category header, count, and active-group emphasis
- [x] 5.4 Refactor `src/components/SkillMap.astro` to compose `SkillRadar` + `SkillGroupList` in a bento layout
- [x] 5.5 Wire axis hover/focus from radar to highlight the corresponding group in the list (and vice versa)
- [x] 5.6 Add mobile collapse behavior: each group collapsed by default, tap header to expand
- [x] 5.7 Verify keyboard navigation: tab through axes, Enter/Space highlights group, screen reader announces category

## 6. Experience timeline

- [x] 6.1 Replace the static timeline list in `src/components/ExperienceTimeline.astro` with an SVG-based scroll-driven spine
- [x] 6.2 Implement `draw-on-scroll` animation on the spine path; verify fallback for unsupported browsers
- [x] 6.3 Add year-grouping logic: sort `experience` by startDate desc, insert year markers between groups
- [x] 6.4 Add expand/collapse per entry: collapsed by default for older roles with >4 responsibilities, expanded for current role
- [x] 6.5 Verify current role emphasis (background tint, badge, pulsing node) is preserved
- [x] 6.6 Verify mobile layout: spine at left edge, smaller year markers, no horizontal overflow

## 7. Command palette + status bar

- [x] 7.1 Add `cmdk` to `package.json`
- [x] 7.2 Create `src/components/CommandPalette.astro` with the static command list (sections, contact links, copy email, download CV)
- [x] 7.3 Wire global keyboard shortcut: `⌘K` / `Ctrl+K` opens, `Escape` closes; trap focus while open
- [x] 7.4 Add `id="command-palette"` mount point to `BaseLayout.astro`
- [x] 7.5 Refactor footer in `BaseLayout.astro` to show scroll progress, current section, and local time
- [x] 7.6 Extend `src/components/BlueprintGrid.astro` canvas with cursor-gravity: nodes gently drift toward cursor when idle
- [x] 7.7 Disable cursor-gravity on `prefers-reduced-motion` and on coarse-pointer devices (touch)
- [x] 7.8 Verify command palette is accessible (combobox role, ARIA labels, keyboard nav)

## 8. Verification

- [ ] 8.1 Run `astro dev` and verify visual continuity with previous version (panels, borders, blueprint)
- [x] 8.2 Verify all motion respects `prefers-reduced-motion`
- [ ] 8.3 Run Lighthouse on built site: Performance ≥ 95, Accessibility ≥ 95
- [x] 8.4 Verify total client JS < 150kb (measure via `astro build` output) — measured 15.8 KB total
- [ ] 8.5 Verify View Transitions work between `/` and `/now`; back navigation restores scroll
- [ ] 8.6 Verify command palette opens via keyboard and via ⌘K / Ctrl+K
- [ ] 8.7 Verify radar chart keyboard navigation and screen reader announcements
- [ ] 8.8 Verify timeline scroll-driven drawing on Chrome 115+ and fallback on Firefox
- [ ] 8.9 Verify mobile (< 640px) layouts: bento collapses, skill groups collapsible, timeline stacks
- [x] 8.10 Verify copper accent is only used for emphasis (not body copy) — 5 uses, all in radar/glow contexts
- [x] 8.11 Run `openspec validate portfolio-control-panel-v2 --strict` — passed
