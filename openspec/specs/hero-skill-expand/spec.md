# hero-skill-expand Specification

## Purpose
TBD - created by archiving change hero-skill-expand. Update Purpose after archive.
## Requirements
### Requirement: skill rows expand to reveal skills

Skill rows 001-008 in the htop hero SHALL toggle an expanded state on click, tap, Enter, or Space that reveals the category's `skills[]` entries from cv.ts as indented sub-rows under the COMMAND column.

#### Scenario: click toggles expansion

- **WHEN** a user clicks an expandable skill row
- **THEN** the row expands showing its category's skills as sub-rows, and a subsequent click collapses it

#### Scenario: keyboard toggles expansion

- **WHEN** an expandable skill row has focus and the user presses Enter or Space
- **THEN** the row toggles its expanded state and focus remains on the row

#### Scenario: independent toggles

- **WHEN** one skill row is expanded
- **THEN** expanding or collapsing another row does not change the first row's state

### Requirement: chevron indicates expandability

Expandable rows SHALL display a chevron indicator that reflects state (▸ collapsed / ▾ expanded), and the identity row (000) SHALL NOT be expandable or display a chevron.

#### Scenario: chevron reflects state

- **WHEN** an expandable row is collapsed
- **THEN** it displays the collapsed chevron, and the expanded chevron after expansion

#### Scenario: identity row not expandable

- **WHEN** the user clicks or presses Enter on the identity row (000)
- **THEN** nothing expands and no chevron is shown on that row

### Requirement: delegated listener survives view transitions

The interaction SHALL use a document-level delegated listener matching the row's data attribute, so expansion keeps working after Astro view transitions re-render the DOM.

#### Scenario: works after view transition

- **WHEN** a user navigates to another page and back via view transition
- **THEN** skill rows remain expandable without re-registering per-row listeners

### Requirement: accessible and motion-safe

Rows SHALL expose button semantics with `aria-expanded` tracking the state, and SHALL toggle instantly with no animation under `prefers-reduced-motion`; without JavaScript rows SHALL render as static, non-expandable.

#### Scenario: aria-expanded tracks state

- **WHEN** a row toggles
- **THEN** its `aria-expanded` attribute matches the expanded state

#### Scenario: reduced motion toggles instantly

- **WHEN** the user prefers reduced motion
- **THEN** expanding and collapsing happens instantly with no transition

#### Scenario: no-JS static rows

- **WHEN** JavaScript is unavailable
- **THEN** rows render without expand behavior and the page remains fully readable with no overflow

