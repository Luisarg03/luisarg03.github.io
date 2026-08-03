## Context

The owner reviewed the live homepage and reported five issues. Two are bugs with confirmed root causes, three are design/content decisions:

1. Sticky header not clickable when scrolled — `BaseLayout.astro` header is `z-10` and `<main>` is also `z-10`; later DOM order wins at equal stacking, so transformed/revealed module content paints over the header and steals clicks.
2. Module content disappears after navigating away and back — `global.css` gates `.module-content` reveal on `animation-timeline: view()` inside `@supports`; Chrome freezes such timelines after view-transition swaps / scroll restoration until a scroll event, leaving content at `opacity: 0`. The `.is-visible` fallback cannot override an active animation.
3. Name heading too large — `--text-display: clamp(2.5rem, 6vw + 1rem, 5.5rem)` maxes at 88px.
4. Skills over-specified — `cv.ts` has 10 categories with exhaustive inventories (19 AWS services in one category); the owner wants broad items and compact rows.
5. Mono-only prose is hard to read — JetBrains Mono 16px body on dark background reads as opaque/dark/small.

## Goals

- Header clickable at every scroll position (one-line stacking fix, no layout change)
- Content visibility deterministic: never hidden by a frozen animation timeline
- Name heading still dominant but proportional (max 72px desktop)
- Skills section readable at a glance: broad categories, compact collapsed rows
- Prose readable (sans-serif Inter, 17px, lighter but AA-compliant text colors), OS voice preserved via mono for chrome/labels/headings/code

## Non-Goals

- No layout or structure changes to modules (order, anchors, palette commands stay)
- No redesign of `/projects`, `/now`, `/terminal` (they inherit the global font/color tokens; mono labels stay)
- No new dependencies (Inter fontsource package is already installed)
- No changes to experience/contact/identity content

## Decisions

### D1 — Header stacking (bug fix)
`BaseLayout.astro` header `z-10` → `z-30`. Stacking order after fix: content `z-10` < header `z-30` < boot overlay `z-40` < command palette `z-9999`. The opaque overlay still covers the header during boot (intended). No other header changes.

### D2 — Class-gated reveal (bug fix)
Remove `animation-timeline: view()` from the `.module-content` `@supports` block in `global.css`; content reveal becomes `.module-content.is-visible` (opacity/transform transition with the existing stagger via `transition-delay`). The `.module-divider` line KEEPS `animation-timeline: view()` (decorative; worst case of a freeze is an undrawn line until scroll — cosmetic). `scroll-observer.js` already re-runs on `astro:page-load`, which re-observes elements after client-side navigation; combined with the class gate, restored scroll positions re-reveal in-view content. No-JS and reduced-motion paths already add `is-visible` immediately in the observer script.

### D3 — Name size
`--text-display` max 5.5rem → 4.5rem (72px desktop); the `clamp()` stays fluid; mobile values unchanged; the name remains a single line on desktop (existing `white-space: nowrap` ≥ 640px still holds).

### D4 — Generalized skill data
Rewrite `skillCategories` in `cv.ts`: broad technologies instead of exhaustive inventories (e.g., "AWS" not 19 services), at most ~6 entries per category, ~8 categories total, proficiency values (0-5) preserved/adjusted sensibly. The EXACT new list is proposed by the implementation lane and shown to the owner for approval before archive.

### D5 — Compact htop rows
`SkillsModule.astro`: rows collapsed by default on all viewports (remove the desktop-expanded behavior); desktop rows show PID / CPU% / MEM% bar / category name only; the concise skill list reveals on click with chevron rotation (existing expand script, adjusted default state). Hover emphasis unchanged.

### D6 — Typography system
- Re-import Inter: `@fontsource-variable/inter` CSS import in `global.css` (package already in `package.json`)
- Body/prose → `--font-sans`; keep `--font-mono` (JetBrains Mono) for terminal framing, labels, headings, code, UI chrome
- Base size 16px → 17px, `line-height` ≥ 1.7 for prose
- Lighten `--color-text` (e.g., `#d7dde5`) and adjust muted tones, keeping AA (≥ 4.5:1) on all text colors
- The name heading stays in mono at display scale (owner choice: mono for headings)
- Global scope note: the body font change applies site-wide via `global.css` — intended (readability everywhere); `/terminal` keeps its mono chrome and gains sans prose

## Risks / Trade-offs

- **Typo/visual regression risk in the typography pass**: mitigated by designer implementation + visual gate (screenshots desktop/mobile)
- **Divider freeze after navigation**: accepted — cosmetic only, content stays visible (class-gated)
- **Skills data rewrite is content**: the owner reviews the new category list before archive (explicit checkpoint in tasks)
- **Site-wide font change touches /projects, /now, /terminal**: intended readability improvement; verified visually during the gate
- **`--color-text` lightening**: contrast verified programmatically (≥ 4.5:1) during verification

## Migration

- Header: single-class change in `BaseLayout.astro`
- Reveal: `global.css` `@supports` block for `.module-content` removed; observer unchanged
- Skills: `cv.ts` data + `SkillsModule.astro` default state
- Typography: token + import changes in `global.css`
- Rollback: revert each file individually; no schema or dependency changes

## Open Questions

- Exact new skill category list (owner approval at implementation)
- Whether 17px base or a lighter `--color-text` needs adjustment after the visual gate (designer judgment)
