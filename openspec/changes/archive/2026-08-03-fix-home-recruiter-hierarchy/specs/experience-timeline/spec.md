## ADDED Requirements

### Requirement: Progressive disclosure of experience
The experience timeline SHALL render the 3-4 most recent roles expanded by default and collapse earlier roles behind a user-activated disclosure control (native `<details>` or equivalent).

#### Scenario: Default view emphasizes recent roles
- **WHEN** a visitor loads the homepage
- **THEN** the 3-4 most recent roles are immediately visible and earlier roles are collapsed

#### Scenario: Earlier roles accessible
- **WHEN** the visitor activates the disclosure control
- **THEN** all earlier roles render without a page reload
