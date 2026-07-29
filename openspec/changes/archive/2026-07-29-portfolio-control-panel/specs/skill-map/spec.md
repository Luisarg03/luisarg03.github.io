## ADDED Requirements

### Requirement: Categorized skill display

The skills section SHALL group technical skills by category (e.g., "Cloud & IaC", "CI/CD & DevOps", "Data & Processing") and display them as tagged groups.

#### Scenario: Skills render grouped by category
- **WHEN** the page loads
- **THEN** skills are displayed in labeled groups matching the categories defined in `src/content/cv.ts`

#### Scenario: Each category has a header
- **WHEN** the skills section renders
- **THEN** each category group displays a monospace or small-caps header

### Requirement: Individual skill tags

Each skill SHALL be rendered as a distinct visual tag, pill, or label within its category group.

#### Scenario: Skill tags are visually distinct
- **WHEN** the skills section renders
- **THEN** each skill name appears as a styled tag with visible separation from adjacent tags

### Requirement: Skills sourced from CV data

The skills section SHALL read all skill categories and items from `src/content/cv.ts`.

#### Scenario: Adding a skill to CV data updates the display
- **WHEN** a new skill is added to the CV data file
- **THEN** it appears in the skills section on the next build without component changes
