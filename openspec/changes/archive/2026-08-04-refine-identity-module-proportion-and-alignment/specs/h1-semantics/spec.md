## MODIFIED Requirements

### Requirement: Homepage has semantic H1 with full name
The homepage SHALL contain a visible `<h1>` element whose text content includes
"Luis Meyehen Paz". The H1 MUST be semantically correct (single `<h1>` per page,
not hidden with `display: none` or `visibility: hidden`).

#### Scenario: Homepage renders H1 with name
- **WHEN** a search engine crawler or user visits the homepage (`/`)
- **THEN** the HTML contains exactly one `<h1>` element
- **AND** the `<h1>` text includes "Luis Meyehen Paz"

#### Scenario: H1 renders as the first row of the identity detail list
- **WHEN** the homepage is rendered in a browser
- **THEN** the H1 is the first row of the whoami module's detail list
  (rendered as `Name: <full name>`)
- **AND** the H1 uses the same monospace font and teal accent as the
  other detail rows (Role, Experience, Current, Location)
- **AND** the H1 is visually consistent with the other detail rows
  (no display-scale heading treatment)
