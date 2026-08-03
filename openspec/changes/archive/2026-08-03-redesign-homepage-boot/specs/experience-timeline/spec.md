## ADDED Requirements

### Requirement: Journalctl-style experience log
The system SHALL render experience entries as a journalctl-style timestamped log instead of a drawn timeline spine. This supersedes the former "Scroll-driven timeline spine" requirement; module divider drawing is covered by the `boot-into-content` spec.

The log SHALL:
- Render one entry per role as a line like `[started]` with month/year, role, and company
- Render the current role with an `ACTIVE` status and a pulsing green indicator
- Use entries from `experience[]` in `cv.ts`, sorted by start date descending

#### Scenario: Log renders all entries
- **WHEN** the experience module is loaded
- **THEN** all experience entries render as timestamped log lines in chronological order

#### Scenario: Current role shows ACTIVE status
- **WHEN** the experience module renders
- **THEN** the entry with `endDate === null` shows an `ACTIVE` badge with a pulsing indicator

#### Scenario: Content visible without scroll interaction
- **WHEN** the module renders in a browser without `animation-timeline` support
- **THEN** all log entries are visible statically on first paint

## MODIFIED Requirements

### Requirement: Year-grouped entries
The system SHALL group experience entries by year of start date, with a year marker rendered between groups as a log separator (e.g., `─── 2021 ───`).

The grouping SHALL be computed from `experience[].startDate`. Years SHALL be sorted descending (most recent first). Year separators SHALL be monospace and muted.

#### Scenario: Entries group by year
- **WHEN** the experience list contains entries starting in 2023, 2021, and 2019
- **THEN** three groups are rendered
- **AND** the most recent year (2023) is at the top

#### Scenario: Year marker renders between groups
- **WHEN** a year boundary is crossed between two entries
- **THEN** a year separator is rendered (e.g., `─── 2021 ───`)

### Requirement: Current role emphasis
The system SHALL visually emphasize the current role (where `endDate === null`) above all other entries.

The current role SHALL be highlighted via:
- An `ACTIVE` badge (monospace, green border, system-green text)
- A pulsing status indicator
- A slightly larger log entry with more padding

#### Scenario: Current role is visually distinct
- **WHEN** the experience module renders
- **THEN** the current role is the first entry
- **AND** it has an `ACTIVE` badge and pulsing indicator that are not present on past roles

#### Scenario: Only one role has the "current" badge
- **WHEN** the experience data is rendered
- **THEN** exactly one entry displays the `ACTIVE` badge
- **AND** that entry is the one with `endDate === null`

### Requirement: Entry expand/collapse for older roles
The system SHALL allow users to expand or collapse the responsibilities list per entry, defaulting to expanded for the current role and collapsed for older roles with more than 4 responsibilities.

Responsibilities SHALL render as indented detail lines following the entry line. The expand/collapse control SHALL be a button (monospace, small) labeled "Show details" / "Hide details". The state SHALL be local per entry (not persisted across page loads). The toggle logic SHALL live in the component's `<script>` block, not as an inline event handler attribute.

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
The system SHALL preserve the experience narrative on viewports < 640px.

On mobile:
- Entries stack vertically without horizontal overflow
- Year separators and badges are smaller
- Expand/collapse remains available
- The current role emphasis is preserved

#### Scenario: Timeline stacks on mobile
- **WHEN** viewport width is < 640px
- **THEN** entries stack vertically
- **AND** the layout does not overflow horizontally

#### Scenario: Node alignment uses grid positioning
- **WHEN** the experience log is inspected at any breakpoint
- **THEN** log entries are laid out without absolute positioning
- **AND** entries remain aligned at all viewport widths

## REMOVED Requirements

### Requirement: Scroll-driven timeline spine
The system SHALL animate the timeline's vertical spine line drawing as the user scrolls through the section.

The spine SHALL be an SVG path (or equivalent) animated via `stroke-dasharray` + `animation-timeline: view()`. The animation SHALL start at the top of the section and complete when the bottom of the section reaches the viewport.

Where `animation-timeline` is unsupported, the spine SHALL render fully drawn (no partial state). The spine SHALL maintain visual alignment with timeline nodes at all viewport widths.

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

#### Scenario: Spine aligns with nodes
- **WHEN** the timeline is rendered at any viewport width (320px to 2560px)
- **THEN** the spine line is centered on the timeline node circles
- **AND** the alignment does not drift due to absolute positioning or zoom
