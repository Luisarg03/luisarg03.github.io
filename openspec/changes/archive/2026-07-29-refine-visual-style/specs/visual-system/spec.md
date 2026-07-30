## MODIFIED Requirements

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

## ADDED Requirements

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
