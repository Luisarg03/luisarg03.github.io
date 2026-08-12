## MODIFIED Requirements

### Requirement: Theme color and color-scheme meta tags
The site SHALL include `<meta name="theme-color">` and
`<meta name="color-scheme" content="dark">` in the `<head>` of every page.

The theme-color value SHALL match the background token
(`#0a0e14`).

#### Scenario: Dark theme meta present
- **WHEN** any page renders
- **THEN** `<meta name="theme-color" content="#0a0e14">` is present
- **AND** `<meta name="color-scheme" content="dark">` is present

#### Scenario: Theme color matches the background token
- **WHEN** any page renders
- **THEN** the rendered meta theme-color equals `#0a0e14`
- **AND** the value matches the page background token
