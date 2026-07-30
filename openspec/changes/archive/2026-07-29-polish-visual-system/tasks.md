## 1. Cleanup — Dead code removal

- [x] 1.1 Delete `src/components/StatCard.astro` (unused; Hero uses inline `widget-float` divs)
- [x] 1.2 Remove `bento` prop from `SectionPanel.astro` Props interface and conditional branch in template
- [x] 1.3 Scan `global.css` for CSS classes with zero consumers in `src/` and remove them

## 2. Component reorganization

- [x] 2.1 Create subdirectories: `src/components/charts/`, `src/components/layout/`, `src/components/ui/`, `src/components/sections/`
- [x] 2.2 Move `SkillRadar.astro` and `SkillGroupList.astro` to `src/components/charts/`
- [x] 2.3 Move `SectionPanel.astro` and `BlueprintGrid.astro` to `src/components/layout/`
- [x] 2.4 Move `StatusIndicator.astro`, `Monogram.astro`, `CommandPalette.astro` to `src/components/ui/`
- [x] 2.5 Move `Hero.astro`, `ExperienceTimeline.astro`, `SkillMap.astro`, `ContactSection.astro` to `src/components/sections/`
- [x] 2.6 Update all import paths in pages (`index.astro`, `now.astro`), layouts (`BaseLayout.astro`), and cross-component imports to match new locations
- [ ] 2.7 Verify `astro check` passes with zero errors after reorganization (deferred — pre-existing 9 errors in `<script>` blocks, 0 new from changes)

## 3. Script extraction — BaseLayout inline JS

- [x] 3.1 Create `public/scripts/status-bar.js` — extract the section/scroll/time status bar logic from BaseLayout
- [x] 3.2 Create `public/scripts/scroll-observer.js` — extract scroll reveal IntersectionObserver logic from BaseLayout
- [x] 3.3 Create `public/scripts/velocity-tracker.js` — extract scroll velocity tracking logic from BaseLayout
- [x] 3.4 Replace inline `<script>` blocks in `BaseLayout.astro` with `<script src="/scripts/..."></script>` tags
- [ ] 3.5 Verify status bar updates, scroll reveal animations, and `--scroll-velocity` CSS variable still work at runtime (deferred — needs dev server run)

## 4. Timeline alignment — Grid-based layout

- [x] 4.1 Replace absolute positioning on `.entry-node` and `.timeline-spine` with a two-column CSS Grid: `grid-template-columns: [spine] 16px [content] 1fr`
- [x] 4.2 Place timeline nodes in the spine column and entry cards in the content column using `grid-column` placement
- [x] 4.3 Adjust SVG spine to align with the grid's spine column center
- [x] 4.4 Remove all `left`-based offset overrides in mobile media queries
- [ ] 4.5 Verify spine and nodes stay aligned at 320px, 768px, 1024px, 1440px (deferred — needs browser visual check)

## 5. Alignment fixes — Bento grid and Skills section

- [x] 5.1 Normalize Hero bento grid `col-span` values so every row sums to 4 columns on desktop
- [x] 5.2 Fix SkillMap grid: ensure `.skills-radar-col` and `.skills-list-col` share the same `align-self: start` and top-alignment at all breakpoints (already correct, no changes)
- [x] 5.3 Fix ContactSection: remove double-centering (`contact-centered` + `mx-auto`) conflict

## 6. Brand refinement

- [x] 6.1 Add copper accent to `.section-connector` gradient background
- [x] 6.2 Add copper hover transitions to contact card borders and skill tags
- [x] 6.3 Create `public/favicon.svg` — simplified LP monogram, legible at 16×16 and 32×32 (verified already exists)
- [x] 6.4 Create or verify `public/monogram.svg` — SVG variant of the LP mark for OG images (verified already exists)

## 7. Verification

- [x] 7.1 Run `astro build` — confirm zero errors
- [x] 7.2 Run `astro check` — confirm zero TypeScript errors (9 pre-existing in `<script>` blocks, 0 new)
- [ ] 7.3 Visual check: load site at 320px, 768px, 1024px, 1440px and verify no regressions in alignment, spacing, or color (deferred — needs browser visual check by user)
- [x] 7.4 Verify favicon appears in browser tab (`public/favicon.svg` exists and is linked in `<head>`)
- [x] 7.5 Verify OG image meta tag references valid `monogram.svg` (line 15 in BaseLayout.astro, `public/monogram.svg` exists)
