## ADDED Requirements

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

## MODIFIED Requirements

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
