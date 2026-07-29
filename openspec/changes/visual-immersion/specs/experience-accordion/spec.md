## ADDED Requirements

### Requirement: Timeline entries are collapsible
Past experience entries in the timeline SHALL be collapsed by default, showing only company, role, and date range.

#### Scenario: Only current role is expanded
- **WHEN** the experience section renders
- **THEN** only the current role (Interbank) is expanded; all past roles show summary only

#### Scenario: Click expands a role
- **WHEN** a user clicks a collapsed role
- **THEN** the role expands smoothly to show responsibilities over approximately 300ms

### Requirement: Accordion uses CSS animation
The expand/collapse transition SHALL use CSS-based animation without JavaScript measurement.

#### Scenario: Smooth height transition
- **WHEN** a role expands or collapses
- **THEN** the height transition is smooth, using CSS `grid-template-rows` or `max-height` technique
