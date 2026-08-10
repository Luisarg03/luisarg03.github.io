## MODIFIED Requirements

### Requirement: Project grid with featured project

The `/projects` page SHALL render projects in a CSS Grid
layout. On desktop viewports (>= 640px), the first project
(ordered by ascending `order` frontmatter value) SHALL span
the full grid width ("featured"), and the remaining projects
SHALL render in a 2-column grid. On mobile viewports
(< 640px), all projects SHALL stack in a single column.

Project sequence SHALL be determined solely by the `order`
field. No computed ranking heuristic SHALL influence the
displayed order.

#### Scenario: Featured project spans full width on desktop
- **WHEN** a visitor opens `/projects` at viewport >= 640px
- **THEN** the first project card occupies the full grid width
- **AND** the remaining project cards render in a 2-column
  grid below the featured card

#### Scenario: Featured project is the lowest order value
- **WHEN** the projects collection contains entries with
  `order` values 0, 1, 2, and 3
- **THEN** the entry with `order: 0` renders as the featured
  card
- **AND** the remaining entries render in ascending `order`
  sequence
- **AND** the number of `impact` entries on any project does
  not affect its position

#### Scenario: All projects stack on mobile
- **WHEN** a visitor opens `/projects` at viewport < 640px
- **THEN** all project cards render in a single column
- **AND** the featured/2-column distinction is removed
- **AND** no content overflows horizontally

### Requirement: Project featured hero with terminal window

The featured project (first card by ascending `order`) SHALL
render a 2-column layout on desktop viewports (>= 1024px):
a text column on the left (title, status dot, meta row,
description, case study, links) and a terminal window on the
right. The terminal window SHALL include a title bar with the
project title and a content area.

The content area SHALL render the project's `cover` image when
that field is present. When `cover` is absent and
`codeSnippet` is present, the content area SHALL render the
code block with shiki syntax highlighting instead. When
neither field is present, the terminal window SHALL be hidden
entirely.

On tablet (640-1023px) and mobile (< 640px) viewports, the
terminal window stacks below the text column.

#### Scenario: Featured project shows terminal window on desktop
- **WHEN** a visitor opens `/projects` at viewport >= 1024px
- **THEN** the featured project card renders a 2-column
  layout
- **AND** the right column shows a terminal window with a
  title bar and a content area

#### Scenario: Featured project with a cover renders the image
- **WHEN** the featured project entry defines `cover`
- **THEN** the terminal window content area renders the cover
  image
- **AND** the image uses the `coverAlt` value as its alt text
- **AND** the terminal title bar renders unchanged
- **AND** the `codeSnippet` field, if present, is not
  rendered

#### Scenario: Featured project without a cover renders the code snippet
- **WHEN** the featured project entry has no `cover` field
  but defines `codeSnippet`
- **THEN** the code area renders the project's
  `codeSnippet.code` with shiki syntax highlighting for the
  language declared in `codeSnippet.lang`

#### Scenario: Featured project stacks terminal window on tablet and mobile
- **WHEN** a visitor opens `/projects` at viewport < 1024px
- **THEN** the featured project card renders as a single
  column
- **AND** the terminal window appears below the text column
- **AND** the terminal window is horizontally scrollable if
  the code is wider than the viewport

#### Scenario: Featured project without cover or codeSnippet omits the terminal window
- **WHEN** the featured project entry has neither a `cover`
  nor a `codeSnippet` field
- **THEN** the card renders as a single column (text only)
- **AND** no empty terminal window placeholder is visible
- **AND** no layout shift occurs (the card height is stable)

#### Scenario: Terminal window has a styled title bar
- **WHEN** the terminal window renders
- **THEN** it includes a title bar with the project title in
  monospace
- **AND** the title bar uses the surface color background
- **AND** the title bar is visually distinct from the content
  area

## ADDED Requirements

### Requirement: Project cover image field

The `projects` content collection SHALL support an optional
`cover` field, validated with Astro's `image()` helper, and an
optional `coverAlt` string field. When `cover` is defined,
`coverAlt` SHALL also be defined. Entries that omit both
fields SHALL render exactly as before, with no empty image
placeholder and no layout shift.

Cover images SHALL be sourced from `src/assets/projects/` so
they pass through Astro's build-time image optimization
pipeline.

#### Scenario: Entry with a cover image
- **WHEN** a project entry defines `cover` and `coverAlt`
- **THEN** the schema validates the entry
- **AND** the image resolves through Astro's image pipeline
  with an optimized output asset

#### Scenario: Entry without a cover image
- **WHEN** a project entry omits `cover` and `coverAlt`
- **THEN** the schema validates the entry
- **AND** the card renders with no image and no empty
  placeholder

#### Scenario: Cover image carries alternative text
- **WHEN** a cover image is rendered
- **THEN** its `alt` attribute is the entry's `coverAlt` value
- **AND** the alt text is not empty

### Requirement: Non-featured project card code snippet

Non-featured project cards SHALL render their `codeSnippet` field
when present, using the same terminal-window design language as the
featured hero (a reduced variant of the chrome is permitted, but it
must be visibly the same treatment, not a second visual language).
The snippet SHALL remain visually subordinate to the featured hero's
terminal window. Cards without a `codeSnippet` SHALL render with no
empty placeholder and no layout shift.

#### Scenario: Non-featured card renders its code snippet
- **WHEN** a non-featured project entry defines a `codeSnippet`
  field
- **THEN** the card renders the snippet's `code` with shiki syntax
  highlighting for the language declared in `codeSnippet.lang`
- **AND** the snippet is wrapped in terminal chrome matching the
  featured hero's visual treatment

#### Scenario: Non-featured card without a code snippet
- **WHEN** a non-featured project entry has no `codeSnippet` field
- **THEN** the card renders no terminal window
- **AND** no empty placeholder is visible
- **AND** no layout shift occurs (the card height is stable)

#### Scenario: Featured hero remains visually dominant
- **WHEN** a visitor views the `/projects` page at viewport >= 640px
- **THEN** the featured hero's terminal window is visually larger
  or more prominent than any non-featured card snippet
- **AND** non-featured snippets do not compete with the featured
  hero for visual attention

#### Scenario: Non-featured cards with snippets stack correctly on mobile
- **WHEN** a visitor opens `/projects` at viewport < 640px
- **THEN** non-featured cards containing a snippet render in a
  single column
- **AND** no horizontal overflow occurs from the terminal chrome
  or the highlighted code content

## REMOVED Requirements

### Requirement: Project tag filter chips

**Reason**: The chip row renders one chip per unique tag
across all projects — roughly twenty-two chips for a curated
list of about six cards that fits within two scrolls. The
control demands more attention than the content it filters,
and its client-side script and styles are maintenance surface
with no corresponding benefit at this list size.

**Migration**: No migration path is required. Tags remain
visible on each project card as metadata and continue to
communicate stack at a glance; they are no longer an
interactive control. Filter state was local to the page and
never persisted to the URL, so no bookmarked or shared link
is broken. If the project list later grows past the point of
being scannable, the appropriate replacement is grouping
cards under `type` headings or filtering on a coarser axis
(`type`, `status`) rather than restoring per-tag chips — this
requirement's original text is preserved in the archived spec
history for reference.
