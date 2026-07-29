## ADDED Requirements

### Requirement: Hero section with name and role

The landing page SHALL display a hero section containing the full name, professional role, and location.

#### Scenario: Hero renders name and role
- **WHEN** the page loads
- **THEN** "Luis Meyehen Paz" is displayed as the primary heading and "Cloud Engineer" as the subtitle

#### Scenario: Hero renders location
- **WHEN** the page loads
- **THEN** "Buenos Aires, Argentina" is displayed in the hero section

### Requirement: Key stat cards in hero

The hero section SHALL display three to four stat cards summarizing professional metrics (years of experience, location, availability, or similar).

#### Scenario: Stat cards render with data from CV
- **WHEN** the page loads
- **THEN** at least three stat cards are visible with values sourced from `src/content/cv.ts`

### Requirement: Online/availability indicator

The hero section SHALL display an availability status indicator showing the current professional status (e.g., "Available for opportunities" or "Currently at Interbank").

#### Scenario: Status indicator shows current status
- **WHEN** the page loads
- **THEN** a status dot with text reflects the current availability from site configuration
