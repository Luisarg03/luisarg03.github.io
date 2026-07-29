## ADDED Requirements

### Requirement: /now page route

The site SHALL serve a `/now` page accessible from the main navigation.

#### Scenario: /now page loads
- **WHEN** a user navigates to `/now`
- **THEN** the page renders with current-status content

### Requirement: MDX-powered content

The `/now` page content SHALL be authored in MDX format as an Astro content collection entry, allowing rich text with optional components.

#### Scenario: Editing now.md updates the page
- **WHEN** the MDX file is edited and the site is rebuilt
- **THEN** the updated content appears on the `/now` page

### Requirement: Status items with progress indicators

The `/now` page SHALL support displaying items with a status indicator (active, in-progress, planned, completed) using the design system's status indicator component.

#### Scenario: In-progress item shows amber indicator
- **WHEN** an item has status "in-progress"
- **THEN** it renders with an amber status dot

#### Scenario: Planned item shows neutral indicator
- **WHEN** an item has status "planned"
- **THEN** it renders with a neutral/muted indicator

### Requirement: Last-updated timestamp

The `/now` page SHALL display a "last updated" date reflecting when the content was last modified.

#### Scenario: Date is visible on the page
- **WHEN** the `/now` page renders
- **THEN** a "Last updated: <date>" text is displayed, sourced from the MDX frontmatter or file modification time
