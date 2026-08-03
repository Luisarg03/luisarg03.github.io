# Experience Timeline

## Purpose

The professional experience section. Replaces the current static list with a scroll-driven interactive timeline: the spine line draws as the user scrolls, entries are year-grouped, and the current role is visually anchored.
## Requirements
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

### Requirement: Progressive disclosure of experience
The experience timeline SHALL render the 3-4 most recent roles expanded by default and collapse earlier roles behind a user-activated disclosure control (native `<details>` or equivalent).

#### Scenario: Default view emphasizes recent roles
- **WHEN** a visitor loads the homepage
- **THEN** the 3-4 most recent roles are immediately visible and earlier roles are collapsed

#### Scenario: Earlier roles accessible
- **WHEN** the visitor activates the disclosure control
- **THEN** all earlier roles render without a page reload

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

### Requirement: Job detail toggle survives navigation

The job detail toggle ("show details") SHALL remain functional after client-side navigation. Interactive toggles SHALL NOT depend on per-element listeners that are lost when view transitions swap the DOM; the toggle logic SHALL live in a delegated listener (document-level) within the component's script block.

#### Scenario: Toggle works on first load

- **WHEN** the experience module renders
- **THEN** the show details toggle expands/collapses the job details

#### Scenario: Toggle works after back-navigation

- **WHEN** the user navigates to another page and back via view transition
- **THEN** the toggle still expands/collapses job details

