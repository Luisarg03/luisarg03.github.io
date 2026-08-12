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

The leading prefix character SHALL use the identity accent token for brand/wayfinding uses (`--color-accent-identity`). The rest of the label SHALL use the muted text color.

#### Scenario: Section label uses mono
- **WHEN** a `SectionPanel` title is rendered
- **THEN** the title text uses the monospace font
- **AND** the leading prefix character uses the identity accent color
- **AND** the rest of the label uses the muted text color

#### Scenario: Section label uses identity accent
- **WHEN** a `SectionPanel` title is rendered
- **THEN** the leading prefix character uses `--color-accent-identity`
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

### Requirement: Shared Card component primitive

The system SHALL provide a shared `<Card>` component at
`src/components/ui/Card.astro` for use across pages. The
component SHALL be a thin wrapper over the existing `.panel`
class plus a `variant` modifier. The component SHALL accept a
`variant` prop with the closed union `'project' | 'status'`,
a `class` prop for additional classes, and a default `<slot
/>` for content.

The `project` variant SHALL apply: surface background, border,
`padding: var(--space-5)`, top accent bar (visible on hover),
hover lift, soft copper-tinted shadow.

The `status` variant SHALL apply: surface background, border,
`padding: var(--space-4)`, top accent bar (visible always),
no hover effect.

The Card SHALL render exactly ONE top accent bar; overlapping
accent decorations SHALL NOT exist (the `.card-accent-top`
bar SHALL NOT stack on top of the card's own accent
`::before`).

#### Scenario: Card renders with project variant
- **WHEN** a page uses `<Card variant="project">`
- **THEN** the rendered element has surface background, border,
  and `padding: var(--space-5)`
- **AND** the top accent bar is hidden by default
- **AND** hovering the card shows the top accent bar and a
  hover lift

#### Scenario: Card renders with status variant
- **WHEN** a page uses `<Card variant="status">`
- **THEN** the rendered element has surface background, border,
  and `padding: var(--space-4)`
- **AND** the top accent bar is always visible
- **AND** no hover effect is applied

#### Scenario: Card slot renders content
- **WHEN** a page passes content inside `<Card>...</Card>`
- **THEN** the content renders inside the card's body

#### Scenario: Card variant prop is a closed union
- **WHEN** a developer inspects the `Card.astro` props
- **THEN** the `variant` prop is typed as the union
  `'project' | 'status'`
- **AND** TypeScript errors on any other value

#### Scenario: Card renders exactly one top accent bar
- **WHEN** a Card renders with a top accent bar (either variant)
- **THEN** exactly one 2px copper accent bar appears at the top of the card
- **AND** no overlapping or doubled accent decoration is visible

### Requirement: Site footer is terminal-style
The site footer in `BaseLayout.astro` SHALL render as a
terminal-style block, consistent with the project's "portfolio
as OS" identity. The footer SHALL have 3 visual layers: (1) a
primary prompt line in copper (`~/luisarg $ git rev-parse
--short HEAD`), (2) a muted 2×2 metadata grid with teal keys
(`--color-accent-identity`) and copper values (`--color-accent`)
showing commit, branch, uptime, and build date, and (3) a
status line with a teal dot indicator and copyright text.
The footer SHALL be hidden on the homepage via the existing
`hideFooter` flag (the homepage ends with `ShutdownModule`).
The footer SHALL be present on all non-homepage pages,
including `/now` and `/projects`.

#### Scenario: Footer shows build metadata in 2×2 grid
- **WHEN** a visitor views any non-homepage page
- **THEN** the site footer renders below the page content
- **AND** the footer shows the commit hash, branch name,
  uptime in days, and build date in a 2×2 grid layout
- **AND** the keys (commit, branch, uptime, built) are in
  teal
- **AND** the values are in copper

#### Scenario: Footer shows status dot and copyright
- **WHEN** the site footer renders
- **THEN** a teal status dot (`● online` indicator) appears
  in a status line
- **AND** the copyright text (`© 2026 Luis Meyehen Paz`)
  appears on the same status line
- **AND** the status dot uses `var(--color-accent-identity)`

#### Scenario: Footer is hidden on homepage
- **WHEN** a visitor views the homepage (`/`)
- **THEN** the site footer does NOT render
- **AND** the `ShutdownModule` renders in its place

#### Scenario: Footer uses terminal-style chrome
- **WHEN** the site footer renders
- **THEN** the footer uses the monospace font
- **AND** the footer uses muted text color
- **AND** the footer is separated from the page content by a
  top border
- **AND** the footer is centered within a `max-width: 52rem`
  container

### Requirement: Boot loader is centered with pre-line prelude

The homepage boot loader overlay SHALL be vertically centered
in the viewport, with a pre-line prelude above the typing
boot frames. The pre-line shows the OS name in big ASCII
art (5-6 lines tall, monospace, copper accent) and acts as
a stable anchor for the layout. The boot frames type below
the pre-line. The total content (pre-line + frames) fits
within the 100vh viewport without scrolling. The pre-line
renders synchronously (no async/await, no animation delay)
so the layout has no CLS.

The boot overlay SHALL also include:
- A brief glitch effect on the pre-line (~0.5s) using CSS
  `@keyframes` with `text-shadow` shifts in copper and teal.
  The glitch resolves to clean copper text.
- Subtle scan lines over the overlay (low-opacity
  `repeating-linear-gradient` texture) giving a CRT vibe.

Both effects SHALL respect `prefers-reduced-motion: reduce`
(animations disabled).

#### Scenario: Boot overlay is centered in the viewport
- **WHEN** the boot loader plays on initial homepage entry
- **THEN** the overlay content is vertically centered in the
  100vh viewport
- **AND** the pre-line (big ASCII) is the first visible
  element
- **AND** the typing boot frames appear below the pre-line
- **AND** the layout has no CLS (the pre-line is the stable
  anchor, frames grow below it)

#### Scenario: Pre-line shows big ASCII of the OS name
- **WHEN** the boot loader plays
- **THEN** a pre-line element shows "luisOS" rendered as
  big ASCII art (5-6 lines tall, monospace, copper accent,
  centered horizontally)

#### Scenario: Glitch effect animates the pre-line
- **WHEN** the pre-line first appears
- **THEN** it has a brief color-shift glitch effect (~0.5s)
  using CSS `text-shadow` shifts in copper and teal
- **AND** the glitch resolves to clean copper text at the end
  of the animation

#### Scenario: Scan lines overlay the boot
- **WHEN** the boot overlay is visible
- **THEN** subtle scan lines (low-opacity
  `repeating-linear-gradient` texture) overlay the entire
  overlay
- **AND** the scan lines don't compete with the text content
- **AND** pointer events are disabled on the scan-line layer

#### Scenario: Animations are disabled under reduced motion
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** the glitch animation does not play
- **AND** the pre-line appears in its final copper state
  immediately
- **AND** the scan lines may still be visible (they're
  static, not animated)

### Requirement: Directional light system
The site SHALL render a single directional light source (copper-toned, top-left) expressed as a radial-gradient overlay on the background grid layer and direction-consistent glows.

The light overlay SHALL:
- Be a very-low-alpha radial gradient anchored to the top-left
- Render as a static layer over the blueprint grid (no animation)
- Have accent glows biased toward the light source direction (top-left to bottom-right)

#### Scenario: Background grid shows top-left light falloff
- **WHEN** a page background renders the grid layer
- **THEN** the grid is covered by a subtle radial-gradient overlay with visible falloff from the top-left source
- **AND** the overlay does not obscure grid line readability

#### Scenario: Reduced motion does not affect static light layers
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** the light overlay renders identically (it is static, not animated)

### Requirement: Micro-interaction hover states
Interactive elements (filter chips, links, cards, palette items, expand toggles) SHALL respond to hover/focus with a transform/opacity transition of <=200ms (scale, underline reveal, glow), gated by prefers-reduced-motion.

Transitions SHALL:
- Use only `transform` and `opacity` (compositor-friendly)
- Complete within 200ms
- Apply to interactive affordances only — no decoration-only animation
- Be disabled under `prefers-reduced-motion: reduce`

#### Scenario: Hovering a filter chip scales it with shadow
- **WHEN** a user hovers or focuses a filter chip
- **THEN** the chip scales up slightly and gains a shadow within 200ms

#### Scenario: Hovering a link reveals a copper underline
- **WHEN** a user hovers or focuses a link
- **THEN** a copper underline reveals beneath the link text within 200ms

#### Scenario: Reduced motion renders hover states without animation
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** hover/focus states show no transition animation (state changes instantly or not at all)

### Requirement: Tabular numerals in readouts
Numeric readouts (dates, percentages, uptime, host values) SHALL render with tabular numerals (`font-variant-numeric: tabular-nums`).

#### Scenario: Numeric readouts use tabular numerals
- **WHEN** a date, percentage, uptime, or host value renders in a terminal readout
- **THEN** the element has `font-variant-numeric: tabular-nums`
- **AND** digits are monospaced-width so readouts do not shift when values change

### Requirement: Single accent token
The site SHALL define exactly one copper accent token (`--color-accent #f0b429`); duplicate alias tokens SHALL NOT exist.

#### Scenario: No duplicate accent aliases
- **WHEN** the CSS custom properties are inspected
- **THEN** `--color-accent` is the single copper accent token
- **AND** no `--color-accent-warm` or `--color-info` alias tokens exist

