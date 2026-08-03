## 1. Header stacking fix
- [x] 1.1 `BaseLayout.astro`: header `z-10` → `z-30`; verify stacking order (content < header < boot overlay < palette)
- [x] 1.2 Playwright: click header nav links (index/now/projects) with the page scrolled so module content is under the header — clicks must hit the header

## 2. Deterministic content reveal
- [x] 2.1 `global.css`: remove `animation-timeline: view()` from `.module-content` (keep divider timeline); confirm `.module-content.is-visible` transitions + stagger (transition-delay) intact
- [x] 2.2 Verify no-JS / reduced-motion paths still show all content (scroll-observer adds `is-visible` immediately)
- [x] 2.3 Playwright repro: navigate `/` → `/projects` → back with restored scroll; all in-view module content visible without scrolling (regression: items disappeared before)

## 3. Name size
- [x] 3.1 `global.css`: `--text-display` max 5.5rem → 4.5rem; name stays one line on desktop (≥ 640px)

## 4. Generalized skills data
- [x] 4.1 `cv.ts`: rewrite `skillCategories` to broad technologies (~8 categories, ≤ 6 entries each, e.g., "AWS" not 19 services); preserve/adjust `proficiency` (0-5)
- [ ] 4.2 Show the new category list to the owner for approval (owner refining list — opencode + Cost Optimization added to AI Tooling)

## 5. Compact skill rows
- [x] 5.1 `SkillsModule.astro`: rows collapsed by default on ALL viewports; desktop shows PID / bars / category name only; expand reveals concise list (chevron rotation already implemented)
- [x] 5.2 Playwright: desktop row expands on click; mobile behavior unchanged; chevron visible

## 6. Typography system
- [x] 6.1 `global.css`: import `@fontsource-variable/inter`; body/prose → `--font-sans`; mono stays for labels/headings/code/UI; base 17px; line-height ≥ 1.7
- [x] 6.2 Lighten `--color-text` (+ muted tones) with AA ≥ 4.5:1 verified programmatically
- [x] 6.3 Check /projects, /now, /terminal inherit the new tokens without layout breakage

## 7. Verification and archive
- [x] 7.1 `npm run check` + `npm run build` pass
- [x] 7.2 Playwright suite: header clicks scrolled, back-nav reveal, skills expand (desktop + mobile), reduced-motion, no-JS, anchor jumps
- [x] 7.3 Lighthouse: contrast/a11y ≥ previous scores; screenshots recaptured (desktop 1440x900 + mobile 390x844)
- [x] 7.4 Designer visual gate on recaptured screenshots (typography readability, name scale, compact skills, header) — sign-off received
- [x] 7.5 Owner approves new skill categories (approved at close: 8 categories incl. opencode + Cost Optimization in AI Tooling)
- [ ] 7.6 Archive change (scenario-preserving deltas) + cleanup

## 8. Experience toggle delegation (post-verification bug)
- [x] 8.1 `ExperienceModule.astro`: delegated toggle — "show details" survives client-side navigation (document-level listener, same pattern as SkillsModule)
- [x] 8.2 Regression repro: `/` → `/projects` → back → toggle works (playwright)
- [x] 8.3 Spec delta `specs/experience-timeline/spec.md` (ADDED requirement "Job detail toggle survives navigation")
