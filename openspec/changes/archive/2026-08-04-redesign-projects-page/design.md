## Context

The `/projects` page currently renders all projects in a flat
`<ul class="divide-y">` with `<li>` children. Each card shows
title (h2), description, optional `// problem` and `// solution`
comment-style blocks, optional impact list, tags, and a repo
link. There is no card chrome, no hover state, no status
indicator, no progressive disclosure, and no scroll reveal.

The site's identity is "portfolio as OS" (memory #37). The
dual-accent system is in place: teal `--color-accent-identity`
for brand/wayfinding, copper `--color-accent` for CTAs and
impact. The site uses view transitions globally
(memory #41). `scroll-observer.js` (public/scripts) already
drives a class-gated reveal for `.module-divider` and
`.module-content` on viewport entry.

The `projects` content collection currently exposes
`title, description, repo, tags, order` plus optional
`problem, solution, impact` (added in the
`add-portfolio-evidence-travel-log` change, commit 0bae24c).

## Goals / Non-Goals

**Goals:**
- Add visible card chrome (border, surface background, padding,
  top accent bar on hover) to give each project a distinct
  surface.
- Add a hover lift (2px translateY + soft shadow) with copper
  border accent and a top copper accent bar that fades in.
- Add a status badge per project (online/wip/archived) in the
  card header, color-mapped to the dual-accent system.
- Add progressive disclosure: problem/solution/impact collapsed
  by default behind a native `<details>` summary, expanded on
  click. Chevron rotates 90deg when open.
- Add scroll-triggered stagger reveal: each card fades in with
  slight translateY as it enters the viewport, 80ms stagger
  between cards.
- Add a featured-project layout: the first (highest impact
  score) project spans the full grid width; remaining projects
  render in a 2-column grid on desktop.
- Respect `prefers-reduced-motion: reduce`: hover lift, scroll
  reveal, and chevron rotation are disabled.
- Extend `scroll-observer.js` to observe `.project-card`
  selectors (additive change, no impact on other modules).

**Non-Goals:**
- Add a new section or page (still `/projects`).
- Add a tag filter UI (deferred to a follow-up change).
- Add per-project ASCII-art hero (deferred).
- Add typed-in impact animations (deferred).
- Change the existing config-style comment presentation of
  problem/solution text (kept as-is).
- Change the content collection schema in a breaking way
  (`status` is optional; projects without it render with no
  badge).
- Touch other modules (ExperienceModule, SkillsModule,
  IdentityModule) or `scroll-observer.js`'s existing behavior.

## Decisions

### D1 — CSS Grid with `grid-column: 1 / -1` for featured

The grid uses `display: grid; grid-template-columns: repeat(2,
minmax(0, 1fr));` on desktop. The first card child has
`grid-column: 1 / -1;` to span the full width. Mobile collapses
to a single column at the existing 640px breakpoint.

**Why CSS Grid over Flexbox:** Grid handles the 1+N layout
declaratively without manual `flex-basis` math, and the
featured-card override is a single property. Flexbox would
require `flex: 0 0 100%` on first child and careful width
calculations for the 2-col remaining.

**Why not Masonry:** Variable card heights make a clean
masonry grid; but the spec asks for a featured + 2-col
uniform layout, not Pinterest-style. CSS Grid is sufficient.

### D2 — Hover lift via vanilla CSS, not Tailwind utilities

The hover state uses a vanilla CSS rule:
```css
.project-card {
  transition: transform 200ms ease-out,
              box-shadow 200ms ease-out,
              border-color 200ms;
}
.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(240, 180, 41, 0.08);
  border-color: var(--color-accent);
}
@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card:hover {
    transition: none;
    transform: none;
  }
}
```

**Why vanilla over Tailwind:** The component is complex
enough that the markup already mixes Tailwind (layout
utilities like `flex flex-wrap`) with vanilla CSS (card
chrome). Adding `motion-safe:hover:-translate-y-0.5
hover:shadow-[...] hover:border-[...] transition-transform
duration-200 ease-out` to the markup is noisy and harder to
read. A dedicated `.project-card` class in the page's
`<style>` block keeps the markup clean.

**Why `prefers-reduced-motion` via media query, not Tailwind
`motion-safe:`:** The page already uses `@media
(prefers-reduced-motion: reduce)` directly in other modules
(see `scroll-observer.js` pattern in memory #41). Consistency
matters more than utility-class purity.

### D3 — Status badge inline, not a new component

The status badge is inlined in `projects.astro`'s template
using a small inline render:
```html
{data.status && (
  <span class={`project-badge project-badge--${data.status}`}>
    [{data.status === 'wip' ? 'WIP' :
       data.status === 'archived' ? 'ARCHIVED' :
       'ONLINE'}]
  </span>
)}
```

**Why not a new `StatusBadge.astro` component:** The badge has
3 variants, all monospace, all `<span>` based, and is only used
in this one place. A new component file is more files to
maintain for ~20 lines of markup. The styles live in the
page's `<style>` block alongside `.project-card`.

**Why uppercased display with brackets:** Matches the
terminal/CLI aesthetic (`[OK]`, `[ACTIVE]`, `[WIP]`). The
underlying enum value is lowercase for schema ergonomics.

### D4 — Progressive disclosure via native `<details>`

The case-study block (problem/solution/impact) is wrapped in
native `<details>` with a `<summary>read case study</summary>`.
A small `▸` chevron rotates 90deg on `details[open]` via
CSS:
```css
.project-card details summary > .chevron {
  transition: transform 200ms ease-out;
}
.project-card details[open] summary > .chevron {
  transform: rotate(90deg);
}
@media (prefers-reduced-motion: reduce) {
  .project-card details summary > .chevron {
    transition: none;
  }
}
```

**Why native `<details>` over a JS toggle:** Zero JS, browser
handles state and accessibility (keyboard, screen reader
announces "disclosure triangle"), no race conditions on view
transitions (which destroy per-element listeners per memory
#49). The pattern is well-supported across all evergreen
browsers.

**Why not just always show:** The current behavior of always
showing the case study makes the page noisy. With 3 projects
each having 3-5 lines of problem/solution/impact, the page
becomes a wall of text. Collapsing-by-default lets visitors
scan titles + descriptions first, then dive into case studies
on interest.

### D5 — Scroll-triggered reveal via `scroll-observer.js`
+ CSS class toggle

`public/scripts/scroll-observer.js` already uses
`IntersectionObserver` to toggle an `is-visible` class on
`.module-divider` and `.module-content` (see memory #41).
The change adds `.project-card` to the observed selector
list. A new CSS rule in the page's `<style>` block:
```css
.project-card {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 400ms ease-out,
              transform 400ms ease-out;
}
.project-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .project-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

The 80ms stagger is achieved via inline `style="--i: N"`
where N is the card index, plus CSS
`transition-delay: calc(var(--i) * 80ms);`. Pure CSS, no JS
per-card.

**Why IntersectionObserver over `animation-timeline: view()`:**
`animation-timeline: view()` is Chromium-only and would
silently no-op in Firefox/Safari. The IO-based approach is
universal. The project already uses IO; extending it is
additive.

**Why not progressive-enhance with `animation-timeline: view()`:**
Could add `@supports (animation-timeline: view()) { ... }`
later for zero-JS Chromium performance. Out of scope for this
change.

### D6 — Top accent bar via absolute-positioned child

The top copper accent bar is a 2px-tall `<div>` absolutely
positioned at the top of each card:
```html
<article class="project-card ...">
  <div class="project-card__accent" aria-hidden="true"></div>
  <header>...</header>
  ...
</article>
```
```css
.project-card { position: relative; overflow: hidden; }
.project-card__accent {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--color-accent);
  opacity: 0;
  transition: opacity 200ms ease-out;
}
.project-card:hover .project-card__accent {
  opacity: 1;
}
```

**Why absolute + opacity vs border-top with color change:**
A 2px border-top would shift the card content down by 2px on
hover (border always takes space). Absolute + opacity leaves
the layout stable.

## Risks / Trade-offs

- **R1 — Stale `is-visible` state on view-transition back-nav**:
  Astro view transitions swap `<main>`, which resets all class
  state. If a user scrolls down, then navigates away and back,
  cards may briefly appear in the pre-reveal state. Mitigation:
  the `scroll-observer.js` re-inits on `astro:page-load` (per
  memory #41); the new IO callbacks fire immediately for
  already-in-viewport cards.
- **R2 — `<details>` open state lost on page load**: a user
  who expanded a case study, then refreshed, will see the
  collapsed state again. This is the default browser behavior
  and is acceptable (we don't want to persist expand state in
  URL for this case).
- **R3 — Mobile hover lift has no effect on touch devices**:
  `hover` doesn't fire on tap. The card will still get the
  border-accent and accent bar on `:active` (browser default)
  for a brief moment during tap. Acceptable trade-off; a tap
  on the card itself does nothing (the only tap target is the
  github link).
- **R4 — Multiple status types in only 3 projects**: with
  only 3 projects, the showcase only shows one of each status
  type. Future projects with the same status will look
  consistent (same badge). The schema is extensible to add
  more statuses later (e.g., 'beta', 'maintenance') without
  UI change beyond the badge mapping function.
- **R5 — `--color-accent-identity` is NOT used on the
  status badge** in this iteration, only `--color-accent`
  (copper) and `--color-text-muted`. The teal accent is
  reserved for brand/wayfinding (per memory #52) and status
  indicators are content, not wayfinding. This may be revised
  if a future change introduces more status types and needs
  additional accent colors.

## Migration Plan

No data migration. No new dependencies. The `status` field is
optional in the content collection schema, so existing MDX
files without it continue to render correctly (no badge).

Rollback: `git revert` of the change commit restores prior
state. No state lives in a database or external service.

## Open Questions

None.
