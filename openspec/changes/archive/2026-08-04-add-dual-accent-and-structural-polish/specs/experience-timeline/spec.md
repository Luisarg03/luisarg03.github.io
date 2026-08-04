## MODIFIED Requirements

### Requirement: Progressive disclosure of experience
The experience timeline SHALL render the 3-4 most recent roles expanded by default and collapse earlier roles behind a user-activated disclosure control (native `<details>` or equivalent).

This requirement is unchanged except for the internal ordering of detail content: within each entry's expanded detail block, the system SHALL render quantified impact lines BEFORE responsibility bullets so hiring-relevant impact is surfaced first.

#### Scenario: Impact lines render before responsibilities
- **WHEN** an experience entry is expanded
- **THEN** any quantified impact lines render at the top of the details block
- **AND** responsibility bullets render after the impact lines
