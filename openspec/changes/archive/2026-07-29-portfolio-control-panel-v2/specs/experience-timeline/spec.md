# Experience Timeline

The professional experience section. Replaces the current static list with a scroll-driven interactive timeline: the spine line draws as the user scrolls, entries are year-grouped, and the current role is visually anchored.

## ADDED Requirements

### Requirement: Scroll-driven timeline spine
The system SHALL animate the timeline's vertical spine line drawing as the user scrolls through the section.

The spine SHALL be an SVG path (or equivalent) animated via `stroke-dasharray` + `animation-timeline: view()`. The animation SHALL start at the top of the section and complete when the bottom of the section reaches the viewport.

Where `animation-timeline` is unsupported, the spine SHALL render fully drawn (no partial state).

#### Scenario: Spine draws on scroll
- **WHEN** the user scrolls through the Experience section
- **THEN** the spine line draws progressively from top to bottom
- **AND** the animation is tied to scroll position, not to time

#### Scenario: Spine is fully drawn when section exits
- **WHEN** the user has scrolled past the entire Experience section
- **THEN** the spine is at 100% length

#### Scenario: Fallback for unsupported browsers
- **WHEN** the browser does not support `animation-timeline`
- **THEN** the spine is fully drawn on first paint
- **AND** the experience entries are visible without any scroll interaction

### Requirement: Year-grouped entries
The system SHALL group experience entries by year of start date, with a year marker rendered between groups.

The grouping SHALL be computed from `experience[].startDate`. Years SHALL be sorted descending (most recent first). Year markers SHALL be monospace, muted, and right-aligned to the timeline spine.

#### Scenario: Entries group by year
- **WHEN** the experience list contains entries starting in 2023, 2021, and 2019
- **THEN** three groups are rendered
- **AND** the most recent year (2023) is at the top

#### Scenario: Year marker renders between groups
- **WHEN** a year boundary is crossed between two entries
- **THEN** a year marker is rendered (e.g., `─── 2021 ───`)

### Requirement: Current role emphasis
The system SHALL visually emphasize the current role (where `endDate === null`) above all other entries.

The current role SHALL be highlighted via:
- A distinct background (accent-tinted, low opacity)
- A "current" badge (monospace, green border, system-green text)
- A pulsing status node on the timeline (the current behavior)
- A slightly larger card with more padding

#### Scenario: Current role is visually distinct
- **WHEN** the experience list is rendered
- **THEN** the current role is the first entry
- **AND** it has a background, badge, and pulsing node that are not present on past roles

#### Scenario: Only one role has the "current" badge
- **WHEN** the experience data is rendered
- **THEN** exactly one entry displays the "current" badge
- **AND** that entry is the one with `endDate === null`

### Requirement: Entry expand/collapse for older roles
The system SHALL allow users to expand or collapse the responsibilities list per entry, defaulting to expanded for the current role and collapsed for older roles with more than 4 responsibilities.

The expand/collapse control SHALL be a button (monospace, small) labeled "Show details" / "Hide details". The state SHALL be local per entry (not persisted across page loads).

#### Scenario: Older role collapses by default
- **WHEN** an experience entry has more than 4 responsibilities and is not the current role
- **THEN** only the first 3 responsibilities are visible on first render
- **AND** a "Show details" button is rendered

#### Scenario: Clicking "Show details" expands
- **WHEN** the user clicks "Show details"
- **THEN** all responsibilities become visible
- **AND** the button label changes to "Hide details"

#### Scenario: Current role never collapses
- **WHEN** the current role is rendered
- **THEN** all responsibilities are visible
- **AND** no "Show details" button is rendered

### Requirement: Mobile-friendly timeline
The system SHALL preserve the timeline's narrative on viewports < 640px.

On mobile:
- The spine remains visible but moves to the left edge of the entry card
- Year markers and badges are smaller
- Expand/collapse remains available
- The current role emphasis is preserved

#### Scenario: Timeline stacks on mobile
- **WHEN** viewport width is < 640px
- **THEN** entries stack vertically
- **AND** the spine is visible at the left edge
- **AND** the layout does not overflow horizontally
