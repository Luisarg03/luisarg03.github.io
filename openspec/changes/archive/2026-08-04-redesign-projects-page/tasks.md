## 1. Update content collection schema

- [x] 1.1 Add optional `status` field to the `projects`
  collection schema in `src/content.config.ts` as a Zod enum:
  `z.enum(['online', 'wip', 'archived']).optional()`
- [x] 1.2 Add `status: online` frontmatter to
  `src/content/projects/nexocode.mdx`
- [x] 1.3 Add `status: wip` frontmatter to
  `src/content/projects/obsidian-second-brain.mdx`
- [x] 1.4 Add `status: archived` frontmatter to
  `src/content/projects/sagemaker-cicd-poc.mdx`

## 2. Extend scroll observer for project cards

- [x] 2.1 Add `.project-card` to the observed selector list in
  `public/scripts/scroll-observer.js` (alongside
  `.module-divider` and `.module-content`)

## 3. Restructure projects.astro markup

- [x] 3.1 Replace the `<ul class="divide-y">` wrapper with a
  `<div class="projects-grid">` container
- [x] 3.2 For each project, render a new `<article
  class="project-card">` with the chrome structure: top
  accent bar div (aria-hidden), header (title + optional
  status badge), description, `<details>` wrapping the
  problem/solution/impact block, footer (tags + repo link)
- [x] 3.3 Render the status badge inline in the header when
  `data.status` is defined, mapping `online` -> `[ONLINE]`,
  `wip` -> `[WIP]`, `archived` -> `[ARCHIVED]`
- [x] 3.4 Wrap the case-study block (problem, solution,
  impact) in a `<details>` with a `<summary>` containing
  a `▸` chevron span and the label "read case study"
- [x] 3.5 Add `style={`--i: ${idx}`}` to each project card
  to enable CSS-driven stagger (no inline JS)

## 4. Add project card styles

- [x] 4.1 Add `.projects-grid` CSS (single column on mobile,
  2-column on >= 640px with first child `grid-column: 1 /
  -1` for featured)
- [x] 4.2 Add `.project-card` CSS: border, surface
  background, padding, rounded corners, position relative,
  overflow hidden, and the reveal initial state (opacity 0,
  translateY 8px)
- [x] 4.3 Add `.project-card.is-visible` transition (opacity
  1, translateY 0, 400ms ease-out, transition-delay
  `calc(var(--i) * 80ms)`)
- [x] 4.4 Add `.project-card:hover` rules: translateY(-2px),
  copper border, soft copper-tinted shadow, 200ms ease-out
  transition
- [x] 4.5 Add `.project-card__accent` CSS: absolute
  top-positioned 2px copper bar, opacity 0 default, opacity 1
  on `.project-card:hover`
- [x] 4.6 Add `.project-badge` and `.project-badge--{online,
  wip, archived}` color variants (copper for wip, muted for
  archived, copper for online per D5)
- [x] 4.7 Add the `<details>` chevron rotation CSS: 90deg on
  `details[open] summary > .chevron`, 200ms ease-out
  transition
- [x] 4.8 Add `@media (prefers-reduced-motion: reduce)`
  overrides that disable all transitions and reset the
  reveal state to opacity 1, transform none

## 5. Visual verification

- [x] 5.1 Start the dev server (`./node_modules/.bin/astro
  dev --background`) and capture a desktop screenshot at
  1440x900 of `/projects` to
  `/tmp/opencode/qa-homepage/projects-desktop-1440x900.png`
- [x] 5.2 Capture a mobile screenshot at 390x844 of
  `/projects` to
  `/tmp/opencode/qa-homepage/projects-mobile-390x844.png`
- [x] 5.3 Visually verify: featured project spans full
  width, 2-col grid below, all 3 status badges visible
  (ONLINE/WIP/ARCHIVED), hover lift works, top accent bar
  appears on hover, `<details>` summary visible, case
  study collapsed by default, scroll-reveal stagger fires
  on viewport entry, reduced-motion path produces static
  page
- [x] 5.4 Run `astro check` to confirm no TypeScript or
  template errors
