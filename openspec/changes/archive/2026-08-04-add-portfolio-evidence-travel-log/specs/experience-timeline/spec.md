## MODIFIED Requirements

### Requirement: Journalctl-style experience log
The system SHALL render experience entries as a journalctl-style timestamped log instead of a drawn timeline spine. This supersedes the former "Scroll-driven timeline spine" requirement; module divider drawing is covered by the `boot-into-content` spec.

The log SHALL:
- Render one entry per role as a line like `[started]` with month/year, role, and company
- Render the current role with an `ACTIVE` status and a pulsing green indicator
- Use entries from `experience[]` in `cv.ts`, sorted by start date descending
- Render a quantified impact line beneath an entry's responsibilities when that entry defines an optional `impact` field (array of strings), visually distinguished (e.g. copper-accented) from ordinary responsibility bullets
- Omit the impact line entirely for entries that do not define `impact`, without leaving an empty placeholder

#### Scenario: Log renders all entries
- **WHEN** the experience module is loaded
- **THEN** all experience entries render as timestamped log lines in chronological order

#### Scenario: Current role shows ACTIVE status
- **WHEN** the experience module renders
- **THEN** the entry with `endDate === null` shows an `ACTIVE` badge with a pulsing indicator

#### Scenario: Content visible without scroll interaction
- **WHEN** the module renders in a browser without `animation-timeline` support
- **THEN** all log entries are visible statically on first paint

#### Scenario: Entry with impact metrics shows a distinct impact line
- **WHEN** an experience entry defines a non-empty `impact` array
- **THEN** the entry renders an additional impact line, visually distinguished from the responsibilities list

#### Scenario: Entry without impact metrics renders unchanged
- **WHEN** an experience entry does not define an `impact` field
- **THEN** the entry renders exactly as before, with no empty impact section
