## Why

The `/projects` page renders as a flat `<ul class="divide-y">` with no
card chrome, no hover state, no status indicator, no progressive
disclosure, and no scroll-triggered reveal. Each project card shows
title, description, problem, solution, impact, tags, and repo link
dumped at once with no visual hierarchy. The page reads as a static
text dump rather than a curated showcase. The user has explicitly
asked for a more visually rich, animated, and pleasant experience
that still respects the site's terminal/OS personality.

## What Changes

- **`/projects` page (`src/pages/projects.astro`)**:
  - Replace the `<ul class="divide-y">` list with a CSS Grid
    `.projects-grid` layout: first (highest-impact) project renders
    full-width, the remaining projects render in a 2-column grid on
    desktop. Single column on mobile (< 640px).
  - Each project card gains a visible card chrome: border,
    `var(--color-surface)` background, padding, rounded corners,
    and a top accent bar (copper) that becomes visible on hover.
  - Each card adds a hover state: 2px upward lift
    (`translateY(-2px)`), soft copper-tinted shadow, border accent
    shifts to copper. Transition 200ms ease-out.
  - Each card adds a status badge in the header (right of title):
    inline monospace chip with copper border. Color maps to
    status: `online`/`active` = teal (`--color-accent-identity`),
    `wip` = copper (`--color-accent`), `archived` = muted
    (`--color-text-muted`). No badge shown if `status` field is
    absent (backward compatible).
  - Each card wraps the problem/solution/impact block in a native
    `<details>` element with a "read case study" summary line.
    Closed by default so the card is scannable; expanded reveals
    the case study indented with a left border. The chevron `▸`
    rotates 90deg when open.
  - Scroll-triggered stagger reveal: project cards fade in with a
    slight upward translation as they enter the viewport. 80ms
    stagger between cards. Disabled entirely under
    `prefers-reduced-motion: reduce`.
  - Cards render in a `// title` comment-style heading (copper,
    monospace) consistent with the site's existing config-style
    presentation requirement.

- **`src/content.config.ts` (projects collection schema)**:
  - Add an optional `status` frontmatter field as a Zod enum:
    `'online' | 'wip' | 'archived'`. Default is no status (no
    badge rendered).

- **3 MDX project files** (`src/content/projects/*.mdx`):
  - `nexocode.mdx` → `status: online`
  - `obsidian-second-brain.mdx` → `status: wip`
  - `sagemaker-cicd-poc.mdx` → `status: archived`
  - This produces a representative mix of all 3 status types in
    the rendered showcase.

- **`public/scripts/scroll-observer.js`**:
  - Add `.project-card` to the list of observed selectors (along
    with `.module-divider` and `.module-content`) so cards
    receive the `is-visible` class on viewport entry. Existing
    reveal CSS pattern is reused (the class toggle drives an
    opacity + translateY transition).

- **`src/components/modules/ExperienceModule.astro`** and other
  modules: NOT touched. The scroll-observer change is additive
  (extra selector) and does not affect other modules.

## Capabilities

### Modified Capabilities
- `project-showcase`: existing 3 requirements remain. NEW
  requirements added for grid layout with featured project, hover
  lift, status badges, progressive disclosure, scroll-triggered
  reveal, and `prefers-reduced-motion` compliance.

## Impact

- `src/pages/projects.astro` — markup + style changes (largest
  diff).
- `src/content.config.ts` — schema change (add `status` enum).
- `public/scripts/scroll-observer.js` — add 1 selector.
- 3 MDX project files — add `status` frontmatter line each.
- 1 spec file modified: `openspec/specs/project-showcase/spec.md`
  (delta with 6 ADDED requirements; archive merges into main).
- No new files, no new dependencies, no breaking changes to
  the content collection schema (new field is optional).
