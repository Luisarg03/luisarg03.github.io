## ADDED Requirements

### Requirement: Reverse-chronological experience timeline

The experience section SHALL display professional roles in reverse chronological order, sourced from `src/content/cv.ts`.

#### Scenario: Timeline renders all roles
- **WHEN** the page loads
- **THEN** all job entries from the CV data are rendered from most recent to oldest

#### Scenario: Current role is visually distinguished
- **WHEN** a job entry has no end date (current position)
- **THEN** it is visually highlighted with an active indicator (e.g., accent border, ping dot)

### Requirement: Job entry details

Each job entry SHALL display company name, role title, date range, location, and a list of responsibilities.

#### Scenario: Job entry expands to show details
- **WHEN** a user views a job entry
- **THEN** company, role, dates, location, and responsibilities are all visible

#### Scenario: Responsibilities are displayed as scannable items
- **WHEN** a job entry has multiple responsibilities
- **THEN** they are rendered as a list with clear visual separation

### Requirement: Timeline visual connector

The timeline SHALL include a vertical line or connector element that visually links job entries, reinforcing the chronology.

#### Scenario: Vertical line connects entries
- **WHEN** the timeline renders
- **THEN** a vertical line or connector runs through all job entries, with nodes or dots at each entry point
