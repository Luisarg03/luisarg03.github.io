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
