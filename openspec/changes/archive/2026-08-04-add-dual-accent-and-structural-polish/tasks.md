## 1. Tokens

- [x] 1.1 Add `--color-accent-identity: #2AD4C9` and `--color-accent-identity-glow: rgba(42,212,201,0.12)` to `src/styles/global.css` within `@theme` block.

## 2. Section tick / chrome

- [x] 2.1 Update `.section-label::before` in `src/styles/global.css` to use `background: var(--color-accent-identity)` instead of `var(--color-accent)`.
- [x] 2.2 Update `src/components/layout/SectionPanel.astro` `.section-label::before` rule to use `color: var(--color-accent-identity)` (matches how the component currently references color)

## 3. Identity accent applications

- [x] 3.1 Nav brand link: Update `BaseLayout.astro` (or nav component) to apply `color: var(--color-accent-identity)` to the brand link text (`~/luisarg`). If the brand uses a `.brand` class, change that rule; otherwise update inline element.
- [x] 3.2 Nav active-tab indicator: add an active indicator (underline or left-tick) that uses `--color-accent-identity`. Implement as CSS pseudo-element on the active nav item to avoid JS.
- [x] 3.3 IdentityModule: update `.identity-name` to use `color: var(--color-accent-identity)` and add glow using `--color-accent-identity-glow` to match existing `--color-accent-glow` convention.

## 4. Experience module structural change

- [x] 4.1 Edit `src/components/modules/ExperienceModule.astro`: inside the expanded `.experience-details` block, render impact lines BEFORE responsibilities (flip current order). Keep IDs, delegated toggle script, and accessibility attributes unchanged.
- [x] 4.2 Run dev server and verify toggles still work after client-side navigation.

## 5. /projects ordering (implementation)

- [x] 5.1 Update `src/pages/projects.astro` rendering logic to sort project cards by strong-quantified-impact-first (descending). Sorting strategy: projects with `impact?.length` > 0 sort by numeric value if available in first impact string (implementer heuristic) else by presence of `impact` then fallback to existing order. Document heuristic in a code comment.
- [x] 5.2 Visual verify `/projects` at desktop/mobile widths; confirm card order and copper impact spans still render using `--color-accent`.

## 6. Verification & QA

- [x] 6.1 Grep/diff review: confirm only intended files reference `--color-accent-identity` and copper usages (`--color-accent`) remain across the codebase.
- [x] 6.2 Dev server visual checks: home, /projects, /now at desktop and mobile widths. Confirm `.section-label` tick matches across global.css and SectionPanel.astro.
- [x] 6.3 Accessibility check: confirm contrast of `--color-accent-identity` against `--color-bg` (11.1:1 per decision) and that glow does not reduce readability.
- [x] 6.4 Optional housekeeping: update `CommandPalette.astro:128` caret-color fallback to remove stale `#58a6ff` if owner approves (separate quick PR).

> NOTE: 5.2 DONE. Verified visually (desktop 1440x900 + mobile 390x844) with 2 project cards: Obsidian Second Brain (order 1) and SageMaker CI/CD - PoC (order 0, content added from add-portfolio-evidence-travel-log). Card order correct, copper accents intact, no impact-lines (no project has impact yet), overflow fixed in projects.astro (whitespace-pre-wrap on pre, flex-wrap on tags). Sort by quantified impact still unverifiable until the other change adds impact[] metrics (tasks 5.1-5.3).
