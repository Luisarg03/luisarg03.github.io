# Visual System

The reusable layout and component primitives: bento grid, panel borders, scroll-driven animation utilities, and widget cards. Designed as a layout system, not a component, so the same primitives compose the hero, skills, timeline, and contact sections at different sizes.

## ADDED Requirements

### Requirement: Bento grid layout primitive
The system SHALL provide a bento grid layout primitive usable across sections.

The bento grid SHALL be implemented as CSS Grid with `auto-flow: dense`, allowing child elements to occupy varied column/row spans. Children SHALL declare their span via Tailwind utilities (`col-span-2 row-span-2`, etc.) or via the `.bento` parent class.

The grid SHALL be responsive:
- Mobile (< 640px): single column, no bento sizing
- Tablet (640-1024px): 2-column grid
- Desktop (≥ 1024px): 4-column grid with full bento sizing

#### Scenario: Bento grid lays out asymmetric children
- **WHEN** a section uses the bento grid primitive with children of varying `col-span`/`row-span`
- **THEN** children fill available cells without overlap
- **AND** the grid auto-flows to avoid gaps

#### Scenario: Bento grid collapses on mobile
- **WHEN** viewport width is < 640px
- **THEN** all bento children stack vertically in a single column
- **AND** `col-span`/`row-span` are ignored

### Requirement: Panel border convention
The system SHALL preserve the existing panel border convention (corner accents, surface tone, optional accent top line) as the primary visual container.

Panels SHALL support three variants:
- Default: surface tone, full border, no accent
- Accent-top: gradient line on top edge
- Featured: stronger border, optional glow on hover

The corner-accent pseudo-elements (`::before`, `::after`) SHALL be preserved from the current `SectionPanel` design.

#### Scenario: Panel renders with corner accents
- **WHEN** a `SectionPanel` is rendered
- **THEN** the top-left and top-right corners show accent markers
- **AND** the body has consistent padding across breakpoints

#### Scenario: Accent-top variant shows gradient line
- **WHEN** a panel uses the `card-accent-top` class
- **THEN** a gradient line is rendered along the top edge
- **AND** the panel retains all other panel conventions

### Requirement: Scroll-driven animation utilities
The system SHALL provide CSS utility classes for scroll-driven animations using `animation-timeline: view()` and `scroll()`.

Utility classes SHALL include:
- `.reveal-on-view` — fade in + slide up when entering viewport
- `.reveal-on-view-delay-N` — variants with staggered delay (N=1..4)
- `.draw-on-scroll` — for SVG path drawing (timeline line, etc.)

Where `animation-timeline` is unsupported, utilities SHALL fall back to existing IntersectionObserver-based reveal.

#### Scenario: Reveal on view triggers once
- **WHEN** an element with `.reveal-on-view` enters the viewport
- **THEN** it transitions from hidden to visible state
- **AND** the trigger does not re-fire on subsequent scrolls past the element

#### Scenario: Draw on scroll animates a path
- **WHEN** an SVG path has `.draw-on-scroll`
- **THEN** the stroke is animated from 0 to its full length as the element scrolls into view

#### Scenario: Fallback works in unsupported browsers
- **WHEN** the browser does not support `animation-timeline`
- **THEN** elements become visible after the existing IntersectionObserver fires
- **AND** no visual regression occurs

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
