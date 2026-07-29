## ADDED Requirements

### Requirement: Sections have variable widths
Adjacent sections SHALL not share the same content width on desktop viewports.

#### Scenario: Experience section is narrower and offset
- **WHEN** the experience section renders on desktop
- **THEN** it occupies roughly 2/3 of the content area and is aligned to the right side

#### Scenario: Contact section is centered and narrower
- **WHEN** the contact section renders on desktop
- **THEN** it occupies roughly 3/5 of the content area and is centered

### Requirement: Asymmetry collapses on mobile
Asymmetric layouts SHALL collapse to full-width single-column at viewports below 768px.

#### Scenario: Mobile single column
- **WHEN** viewport width is < 768px
- **THEN** all sections render full-width in a single column
