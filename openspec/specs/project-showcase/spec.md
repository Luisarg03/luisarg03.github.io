# Project Showcase

## Purpose

The project showcase section displays professional work and open-source contributions. Each project card presents key metadata including title, description, repository link, and optional case study details (problem, solution, impact).

## Requirements

### Requirement: Project case study fields
The `projects` content collection SHALL support optional `problem`, `solution`, and `impact` fields per entry, in addition to the existing `title`, `description`, `repo`, `tags`, and `order` fields. Entries without these fields SHALL continue to render using only `title`/`description`/`tags`/`repo`.

#### Scenario: Entry with case study fields
- **WHEN** a project entry defines `problem`, `solution`, and `impact`
- **THEN** the project card renders a problem statement, a solution statement, and one or more impact/metric lines

#### Scenario: Entry without case study fields still renders
- **WHEN** a project entry omits `problem`, `solution`, and `impact`
- **THEN** the project card renders using only the existing title/description/tags/repo fields, without errors or empty placeholder sections

### Requirement: Config-style project card presentation
The `/projects` page SHALL render each project card in a monospace, config/code-listing visual style: `key: value`-style metadata lines, copper-accented tech tags, and comment-style (`//` or `#`) framing for the problem/solution text, consistent with the site's existing terminal/OS visual identity.

#### Scenario: Project card uses monospace metadata style
- **WHEN** a visitor opens `/projects`
- **THEN** each project's metadata (tags, repo link) renders in monospace with copper-accented tags

### Requirement: Project cards stack on mobile
The project card layout SHALL stack into a single column without horizontal overflow on viewports narrower than 640px, regardless of how many optional fields (problem/solution/impact) are present.

#### Scenario: Cards stack on narrow viewport
- **WHEN** viewport width is < 640px
- **THEN** project cards render in a single column
- **AND** no content is clipped or overflows horizontally

## ADDED Requirements

### Requirement: Project grid with featured project

The `/projects` page SHALL render projects in a CSS Grid
layout. On desktop viewports (>= 640px), the first project
(ordered by impact score) SHALL span the full grid width
("featured"), and the remaining projects SHALL render in a
2-column grid. On mobile viewports (< 640px), all projects
SHALL stack in a single column.

#### Scenario: Featured project spans full width on desktop
- **WHEN** a visitor opens `/projects` at viewport >= 640px
- **THEN** the first project card occupies the full grid width
- **AND** the remaining project cards render in a 2-column
  grid below the featured card

#### Scenario: All projects stack on mobile
- **WHEN** a visitor opens `/projects` at viewport < 640px
- **THEN** all project cards render in a single column
- **AND** the featured/2-column distinction is removed
- **AND** no content overflows horizontally

### Requirement: Project card chrome and hover lift

Each project card SHALL have a visible chrome (border, surface
background, padding, rounded corners) and SHALL respond to
hover with a 2px upward lift, a soft copper-tinted shadow, and
a border accent shift to copper. The hover transition SHALL be
200ms ease-out. A 2px copper accent bar SHALL appear at the
top of the card on hover.

#### Scenario: Card has visible chrome
- **WHEN** a project card renders
- **THEN** it has a visible border, surface background,
  padding, and rounded corners
- **AND** a 2px copper accent bar is positioned at the top
  of the card, initially invisible (opacity 0)

#### Scenario: Card lifts on hover
- **WHEN** a user hovers over a project card
- **THEN** the card translates upward by 2px
- **AND** a soft copper-tinted shadow appears beneath the card
- **AND** the border color shifts to copper
- **AND** the top accent bar fades in (opacity 1)
- **AND** the transition completes within 200ms

#### Scenario: Hover lift is disabled under reduced motion
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** hovering a project card produces no translateY or
  shadow change
- **AND** the transition property is `none`

### Requirement: Project status badges

The `projects` content collection SHALL support an optional
`status` frontmatter field with values `online`, `wip`, or
`archived`. When a project defines a `status`, the `/projects`
page SHALL render a monospace badge in the card header
displaying `[ONLINE]`, `[WIP]`, or `[ARCHIVED]` in copper or
muted text color. Projects without a `status` field SHALL
render with no badge (no empty placeholder).

#### Scenario: Online project shows ONLINE badge
- **WHEN** a project entry has `status: online`
- **THEN** the card header renders a `[ONLINE]` badge in the
  status color
- **AND** the badge is positioned to the right of the title

#### Scenario: WIP project shows WIP badge
- **WHEN** a project entry has `status: wip`
- **THEN** the card header renders a `[WIP]` badge in copper

#### Scenario: Archived project shows ARCHIVED badge
- **WHEN** a project entry has `status: archived`
- **THEN** the card header renders a `[ARCHIVED]` badge in
  muted text color

#### Scenario: Project without status renders no badge
- **WHEN** a project entry has no `status` field
- **THEN** the card renders with no badge
- **AND** no empty placeholder is visible in the card header

### Requirement: Project case study progressive disclosure

The case-study block (problem, solution, impact) on each
project card SHALL be wrapped in a native `<details>`
element, collapsed by default. The `<summary>` SHALL show a
"read case study" label with a `▸` chevron that rotates 90
degrees when the case study is expanded.

#### Scenario: Case study collapsed by default
- **WHEN** a project card renders
- **THEN** the case-study block (problem, solution, impact) is
  hidden behind a `<details>` summary
- **AND** the chevron points right (initial state)

#### Scenario: Case study expands on click
- **WHEN** a user clicks the "read case study" summary
- **THEN** the problem, solution, and impact sections
  become visible
- **AND** the chevron rotates 90 degrees (points down)

#### Scenario: Case study collapses on second click
- **WHEN** a user clicks the open summary again
- **THEN** the case-study sections are hidden
- **AND** the chevron rotates back to the initial state

### Requirement: Project card scroll-triggered reveal

Each project card SHALL fade in with a slight upward
translation as it enters the viewport, with an 80ms stagger
between consecutive cards. The reveal SHALL be implemented
via the existing `scroll-observer.js` IntersectionObserver
pattern (add `.project-card` to the observed selector list)
and a CSS class toggle (`.is-visible`).

#### Scenario: Cards reveal as they enter the viewport
- **WHEN** a project card scrolls into the viewport
- **THEN** the card receives the `is-visible` class
- **AND** the card transitions from opacity 0 + translateY(8px)
  to opacity 1 + translateY(0) over 400ms
- **AND** consecutive cards reveal with an 80ms stagger

#### Scenario: Already-visible cards do not animate
- **WHEN** the page loads with a project card already in the
  viewport
- **THEN** the card reveals immediately on page load (no
  delay, no animation if reduced motion is set)

#### Scenario: Scroll reveal is disabled under reduced motion
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** project cards render with full opacity and no
  translateY
- **AND** no stagger transition fires

### Requirement: Projects page respects reduced motion

The `/projects` page SHALL respect
`prefers-reduced-motion: reduce` across all visual
enhancements: hover lift, scroll reveal, chevron rotation,
and accent bar fade-in SHALL all be disabled when the user
prefers reduced motion.

#### Scenario: All animations disabled under reduced motion
- **WHEN** the user has `prefers-reduced-motion: reduce` set
  AND the `/projects` page renders
- **THEN** no card transition or animation is visible
- **AND** the page is fully readable and navigable in its
  static state

## ADDED Requirements

### Requirement: Project meta fields

The `projects` content collection SHALL support optional
frontmatter fields: `year` (integer 2000-2100), `role`
(string), `type` (enum: `'personal' | 'client' | 'oss'`), and
`stack` (array of strings). When a project defines any of
these fields, the `/projects` page SHALL render a `//
year - role - type - stack` meta row in the card between the
title and the description. Projects that omit all 4 fields
SHALL NOT render the meta row.

#### Scenario: Project with all meta fields renders the row
- **WHEN** a project entry defines year, role, type, and
  stack
- **THEN** the card renders a meta row in monospace showing
  `// year: <year> - role: <role> - type: <type> - stack:
  <comma-joined stack>`
- **AND** the row uses muted text color

#### Scenario: Project without meta fields omits the row
- **WHEN** a project entry omits all 4 meta fields
- **THEN** the card does NOT render the meta row
- **AND** no empty placeholder is visible

#### Scenario: Project with partial meta fields renders what is defined
- **WHEN** a project entry defines only some of the 4 meta
  fields
- **THEN** the card renders the meta row with only the
  defined fields
- **AND** the row layout still uses the `// key: value - key:
  value` pattern

### Requirement: Status dot pulse indicator

The `/projects` page SHALL render each project's status as a
colored `●` dot followed by a text label. The dot SHALL pulse
(CSS keyframe animation) when the status is `online`. The
dot SHALL be static when the status is `wip` or `archived`.
The bracket-text status badge (e.g., `[ONLINE]`) is removed
entirely. When a project omits the `status` field, no dot or
label is rendered.

#### Scenario: Online project shows a pulsing teal dot
- **WHEN** a project entry has `status: online`
- **THEN** the card header shows `● ONLINE` with the dot in
  teal color
- **AND** the dot pulses (scale 1.0 -> 1.15 -> 1.0 over 2s,
  infinite, ease-in-out)
- **AND** a subtle outer ring is also visible (the pulse
  keyframe targets a pseudo-element ring)

#### Scenario: WIP project shows a static copper dot
- **WHEN** a project entry has `status: wip`
- **THEN** the card header shows `● WIP` with the dot in
  copper color
- **AND** the dot does not animate

#### Scenario: Archived project shows a static muted dot
- **WHEN** a project entry has `status: archived`
- **THEN** the card header shows `● ARCHIVED` with the dot
  in muted color
- **AND** the dot does not animate

#### Scenario: Project without status renders no indicator
- **WHEN** a project entry has no `status` field
- **THEN** the card header renders no dot and no label

#### Scenario: Status dot pulse is disabled under reduced motion
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** the dot renders at its base scale with no pulse
  animation
- **AND** the pseudo-element ring is static or hidden

### Requirement: Project featured hero with terminal window

The featured project (first card by impact score) SHALL
render a 2-column layout on desktop viewports (>= 1024px):
a text column on the left (title, status dot, meta row,
description, case study, links) and a terminal window on the
right (a stylized code block with shiki-rendered syntax
highlighting). The terminal window SHALL include a title bar
with the project title and a code area. On tablet
(640-1023px) and mobile (< 640px) viewports, the terminal
window stacks below the text column. When the featured
project has no `codeSnippet` field, the terminal window is
hidden entirely.

#### Scenario: Featured project shows terminal window on desktop
- **WHEN** a visitor opens `/projects` at viewport >= 1024px
- **THEN** the featured project card renders a 2-column
  layout
- **AND** the right column shows a terminal window with a
  title bar and a code area
- **AND** the code area renders the project's
  `codeSnippet.code` with shiki syntax highlighting for the
  language declared in `codeSnippet.lang`

#### Scenario: Featured project stacks terminal window on tablet and mobile
- **WHEN** a visitor opens `/projects` at viewport < 1024px
- **THEN** the featured project card renders as a single
  column
- **AND** the terminal window appears below the text column
- **AND** the terminal window is horizontally scrollable if
  the code is wider than the viewport

#### Scenario: Featured project without codeSnippet omits the terminal window
- **WHEN** the featured project entry has no `codeSnippet`
  field
- **THEN** the card renders as a single column (text only)
- **AND** no empty terminal window placeholder is visible
- **AND** no layout shift occurs (the card height is stable)

#### Scenario: Terminal window has a styled title bar
- **WHEN** the terminal window renders
- **THEN** it includes a title bar with the project title in
  monospace
- **AND** the title bar uses the surface color background
- **AND** the title bar is visually distinct from the code
  area

### Requirement: Project multi-link presentation

Each project card SHALL render a multi-link row showing
`github ↗` always (from the existing `repo` field), and
`demo ↗` and `docs ↗` only when the project defines the
corresponding URL in a `links` field. Links SHALL be rendered
in monospace with copper accent, separated by ` · `. The
link row SHALL appear in the card footer alongside the tags.

#### Scenario: Project with all links renders the full row
- **WHEN** a project entry defines `links: { demo: '...',
  docs: '...' }`
- **THEN** the card footer renders `github ↗ - demo ↗ -
  docs ↗` in monospace copper
- **AND** each link opens in a new tab with
  `rel="noopener noreferrer"`
- **AND** the `github ↗` link points to `data.repo`

#### Scenario: Project with only demo renders 2 links
- **WHEN** a project entry defines `links: { demo: '...' }`
  (no `docs`)
- **THEN** the card footer renders `github ↗ - demo ↗` only
- **AND** no empty `docs ↗` placeholder is visible

#### Scenario: Project without links renders only github
- **WHEN** a project entry has no `links` field
- **THEN** the card footer renders only `github ↗`
- **AND** the link points to `data.repo`

### Requirement: Project tag filter chips

The `/projects` page SHALL render a row of tag filter chips
above the project grid. The chips SHALL include an `[all]`
chip plus one chip per unique tag across all projects.
Clicking a chip filters the grid to show only projects that
include the chip's tag. Clicking `[all]` shows all projects.
The active chip SHALL be visually distinct (copper background,
copper text). Filter state SHALL be local to the page (no
URL persistence required for this change).

#### Scenario: Filter chip row renders above the grid
- **WHEN** a visitor opens `/projects`
- **THEN** a row of filter chips renders above the
  `.projects-grid`
- **AND** the first chip is `[all]`
- **AND** the remaining chips are one per unique tag across
  all projects, sorted alphabetically

#### Scenario: Clicking a tag chip filters the grid
- **WHEN** a visitor clicks the `[aws]` chip
- **THEN** the grid shows only projects whose tags include
  `aws`
- **AND** the `[aws]` chip is visually active (copper
  background)
- **AND** the `[all]` chip is visually inactive

#### Scenario: Clicking all resets the filter
- **WHEN** a visitor clicks the `[all]` chip
- **THEN** the grid shows all projects
- **AND** the `[all]` chip is visually active

#### Scenario: Filter chip keyboard accessibility
- **WHEN** a visitor tabs to a filter chip and presses Enter
  or Space
- **THEN** the chip activates and the grid filters as if
  clicked

### Requirement: Terminal-style page footer with build metadata

The `/projects` page SHALL render a terminal-style footer
below the project grid, showing: a fixed shell prompt prefix
(`~/luisarg $ `), the commit short hash (injected at build
time from `git rev-parse --short HEAD`), the build date, a
simulated uptime (days since a known deploy reference), and
the current working directory hint. The footer SHALL be
monospace, muted text, and visually separated from the grid
by a top border.

#### Scenario: Footer renders build metadata
- **WHEN** a visitor opens `/projects`
- **THEN** a terminal-style footer renders below the project
  grid
- **AND** the footer shows the current commit short hash
  (e.g., `b3c7fe6`)
- **AND** the footer shows the build date (e.g.,
  `2026-08-04`)
- **AND** the footer shows the uptime in days
- **AND** the footer shows the shell prompt prefix

#### Scenario: Commit hash reflects the deployed commit
- **WHEN** the site is built from commit `abc1234`
- **THEN** the footer of the built site shows `abc1234` as
  the commit
- **AND** no placeholder or hardcoded value is rendered

### Requirement: Featured project title text scramble effect

On the first paint of `/projects`, the featured project
title SHALL run a text-scramble effect: random ASCII
characters are shown for the title's length, then
progressively replaced by the real title characters from
left to right, completing in approximately 800ms. The
effect SHALL be disabled under `prefers-reduced-motion:
reduce` (the real title renders immediately). The effect
SHALL only run once per page load (no repeat on re-render).

#### Scenario: Title scrambles then resolves
- **WHEN** a visitor opens `/projects`
- **THEN** the featured project title initially shows random
  ASCII characters
- **AND** over 800ms, the real title is revealed left-to-right
- **AND** after 800ms, the title reads exactly the project
  title

#### Scenario: Scramble is disabled under reduced motion
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** the title renders the real text on first paint
- **AND** no random characters are shown
- **AND** no animation occurs

#### Scenario: Scramble runs only once per page load
- **WHEN** the scramble has completed
- **THEN** subsequent re-renders (e.g., after view
  transitions or filter changes) do not re-trigger the
  scramble
- **AND** the title remains stable as the real text

## ADDED Requirements

### Requirement: Project grid has increased card spacing

The `/projects` page SHALL render the project grid with
increased vertical and horizontal spacing between cards.
Mobile viewports (< 640px) SHALL use `gap: var(--space-6)`.
Desktop viewports (>= 640px) SHALL use `gap: var(--space-8)`.

#### Scenario: Mobile gap is var(--space-6)
- **WHEN** a visitor views `/projects` at viewport < 640px
- **THEN** the gap between project cards resolves to
  `var(--space-6)` (1.5rem)

#### Scenario: Desktop gap is var(--space-8)
- **WHEN** a visitor views `/projects` at viewport >= 640px
- **THEN** the gap between project cards resolves to
  `var(--space-8)` (2rem)