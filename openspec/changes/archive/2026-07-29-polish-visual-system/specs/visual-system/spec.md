# Visual System — Delta Spec

## MODIFIED Requirements

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
- **AND** every row's `col-span` values sum to the grid's total columns

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

Panels SHALL support three variants:
- Default: surface tone, full border, no accent
- Accent-top: gradient line on top edge
- Featured: stronger border, optional glow on hover

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
