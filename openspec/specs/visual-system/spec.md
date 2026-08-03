## Purpose

The reusable layout and component primitives: bento grid, panel borders, scroll-driven animation utilities, and widget cards. Designed as a layout system, not a component, so the same primitives compose the hero, skills, timeline, and contact sections at different sizes.

## Requirements

### Requirement: Bento grid layout primitive
The system SHALL provide a bento grid layout primitive usable across sections.

The bento grid SHALL be implemented as CSS Grid with `auto-flow: dense`, allowing child elements to occupy varied column/row spans. Children SHALL declare their span via Tailwind utilities (`col-span-2 row-span-2`, etc.) or via the `.bento` parent class.

The grid SHALL be responsive:
- Mobile (< 640px): single column, no bento sizing
- Tablet (640-1024px): 2-column grid
- Desktop (≥ 1024px): 4-column grid with full bento sizing

All bento children within a row SHALL sum to the full column count of the grid to prevent orphaned gaps. Mixed `col-span` assignments across rows SHALL be validated at build time via the component authoring.

#### Scenario: Bento grid lays out asymmetric children
- **WHEN** a section uses the bento grid primitive with children of varying `col-span`/`row-span`
- **THEN** children fill available cells without overlap
- **AND** the grid auto-flows to avoid gaps

#### Scenario: Bento grid collapses on mobile
- **WHEN** viewport width is < 640px
- **THEN** all bento children stack vertically in a single column
- **AND** `col-span`/`row-span` are ignored

#### Scenario: No orphaned gaps in desktop layout
- **WHEN** a bento grid has children with explicit or implicit `col-span` on desktop
- **THEN** no row leaves a gap smaller than one column
- **AND** grid items fill left-to-right without orphaned cells

### Requirement: Panel border convention
The system SHALL preserve the existing panel border convention (corner accents, surface tone, optional accent top line) as the primary visual container.

Panels SHALL support four variants:
- Default: surface tone, full border, no accent
- Accent-top: gradient line on top edge
- Featured: stronger border, optional glow on hover
- Terminal-tab: top bar styled as a terminal tab with path label and status dots (used by SectionPanel only)

The corner-accent pseudo-elements (`::before`, `::after`) SHALL be preserved from the current `SectionPanel` design.

The `SectionPanel` component SHALL NOT expose a `bento` prop. Bento layout SHALL be declared by the consumer using the `.bento` class directly.

#### Scenario: Panel renders with corner accents
- **WHEN** a `SectionPanel` is rendered
- **THEN** the top-left and bottom-right corners show accent markers
- **AND** the body has consistent padding across breakpoints

#### Scenario: Accent-top variant shows gradient line
- **WHEN** a panel uses the `card-accent-top` class
- **THEN** a gradient line is rendered along the top edge
- **AND** the panel retains all other panel conventions

#### Scenario: Panel does not accept bento prop
- **WHEN** a developer inspects `SectionPanel.astro` props
- **THEN** the `bento` prop is not present in the `Props` interface

#### Scenario: SectionPanel renders terminal tab
- **WHEN** a `SectionPanel` is rendered with a `title` prop
- **THEN** the top of the panel shows a path-style tab with three muted status dots
- **AND** the tab bar uses the monospace font
- **AND** the existing corner accents remain visible below the tab

### Requirement: Scroll-driven animation utilities
The system SHALL provide CSS utility classes for scroll-driven animations using `animation-timeline: view()` and `scroll()`.

Utility classes SHALL include:
- `.reveal-on-view` — fade in + slide up when entering viewport
- `.reveal-on-view-delay-N` — variants with staggered delay (N=1..4)
- `.draw-on-scroll` — for SVG path drawing

Where `animation-timeline` is unsupported, a single IntersectionObserver fallback SHALL handle all reveal classes. The fallback logic SHALL NOT duplicate the same observer for each utility class.

#### Scenario: Reveal on view triggers once
- **WHEN** an element with `.reveal-on-view` enters the viewport
- **THEN** it transitions from hidden to visible state
- **AND** the trigger does not re-fire on subsequent scrolls past the element

#### Scenario: Draw on scroll animates a path
- **WHEN** an SVG path has `.draw-on-scroll`
- **THEN** the stroke is animated from 0 to its full length as the element scrolls into view

#### Scenario: Fallback works in unsupported browsers
- **WHEN** the browser does not support `animation-timeline`
- **THEN** a single IntersectionObserver handles all `.reveal-on-view*` and `.draw-on-scroll` elements
- **AND** no visual regression occurs
- **AND** no duplicate observer instances are created

### Requirement: Widget card primitive
The system SHALL provide a widget card primitive for dashboard-style UI (stat cards, monitor widgets, status panels).

Widget cards SHALL support:
- Floating animation (`widget-float` class) — subtle vertical drift
- Glow on hover (`glow-hover` class) — accent-tinted shadow
- Optional status indicator slot
- Optional monospace label slot

#### Scenario: Widget card floats when idle
- **WHEN** a widget card is rendered with the float animation enabled
- **THEN** it animates a subtle vertical drift (~4-6px amplitude, 4-6s period)
- **AND** the animation pauses on hover

#### Scenario: Widget card glows on hover
- **WHEN** a user hovers over a widget card
- **THEN** the card's shadow transitions to an accent-tinted glow
- **AND** the transition completes within 200ms

### Requirement: Section padding rhythm
The system SHALL define a section padding scale via CSS custom properties to enforce consistent vertical rhythm between sections.

The system SHALL define:
- `--section-padding-y-mobile: 3rem`
- `--section-padding-y-desktop: 5rem`
- `--section-gap: 2rem`

#### Scenario: Sections use the padding tokens
- **WHEN** a top-level section renders
- **THEN** the section's top and bottom padding resolves to one of the section-padding tokens
- **AND** the gap between consecutive sections resolves to `--section-gap`

#### Scenario: Padding scales with viewport
- **WHEN** viewport width is < 768px
- **THEN** sections use `--section-padding-y-mobile`
- **WHEN** viewport width is >= 768px
- **THEN** sections use `--section-padding-y-desktop`

### Requirement: Mono-first section labels
Section header labels SHALL use the monospace font stack with the accent color on a leading character.

#### Scenario: Section label uses mono
- **WHEN** a `SectionPanel` title is rendered
- **THEN** the title text uses the monospace font
- **AND** the leading prefix character uses the accent color
- **AND** the rest of the label uses the muted text color

### Requirement: Fluid display type scale
The system SHALL provide a fluid display type scale based on `clamp()` for headings, replacing fixed-size display steps.

The scale SHALL:
- Define display sizes as `clamp()` values responsive between mobile and desktop viewports
- Apply an oversized hero heading (name) within the display scale
- Keep small mono label tokens (`--text-xs`, `--text-sm`) fixed so the technical voice stays crisp

#### Scenario: Hero heading scales fluidly
- **WHEN** the hero renders at any viewport width
- **THEN** the display heading size is derived from a `clamp()` value
- **AND** no fixed breakpoint stack changes the heading size stepwise

#### Scenario: Mono labels stay fixed
- **WHEN** a section label renders
- **THEN** it uses a fixed mono token size regardless of viewport

### Requirement: Depth conventions without backdrop blur
The system SHALL achieve surface depth with borders and shadows, NOT with `backdrop-filter` blur or gradient blooms.

SHALL NOT:
- Apply `backdrop-filter` to any surface
- Use radial gradient blurs in the hero or any section background

#### Scenario: No backdrop blur on surfaces
- **WHEN** any card or panel renders
- **THEN** its depth comes from border and shadow tokens
- **AND** no `backdrop-filter` is applied

#### Scenario: Hero has no gradient bloom
- **WHEN** the hero renders
- **THEN** no radial gradient blur layers are present in the hero background
