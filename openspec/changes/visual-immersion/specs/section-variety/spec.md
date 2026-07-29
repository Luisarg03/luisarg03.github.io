## ADDED Requirements

### Requirement: Adjacent sections differ visually
No two adjacent sections SHALL share the same combination of background treatment, border treatment, and width.

#### Scenario: Hero and Experience differ
- **WHEN** the page renders
- **THEN** the Hero section and the adjacent Experience section have different visual treatments

#### Scenario: Experience and Skills differ
- **WHEN** the page renders
- **THEN** the Experience section and the adjacent Skills section have different visual treatments

### Requirement: Section treatments include at least three distinct styles
The site SHALL use at least three distinct section visual treatments across all sections.

#### Scenario: Multiple panel styles coexist
- **WHEN** the page renders
- **THEN** at least three different visual treatments are visible: full-bleed, offset with accent bar, and centered narrow panel
