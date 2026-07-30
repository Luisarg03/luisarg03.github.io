## MODIFIED Requirements

### Requirement: Interactive identity through commands
The system SHALL expose the user's identity through discoverable commands with polished visual presentation using warm accent colors and glass card rendering.

Identity commands SHALL include:
- `neofetch` — full identity card in a frosted glass container
- `whoami` — short identity
- `cat about.md` — about content in glass card
- `cat contact.md` — contact details in glass card

#### Scenario: neofetch renders in glass card
- **WHEN** the user types `neofetch`
- **THEN** the output renders in a frosted glass card with warm accent styling
- **AND** the ASCII art logo uses the standard text color

### Requirement: Workspace as identity context
Each workspace SHALL use the warm copper accent for active state indication and Inter font for tag labels, creating a polished navigation experience.

#### Scenario: Workspace navigation feels polished
- **WHEN** the user switches workspaces
- **THEN** the active tag shows a warm copper accent with smooth transition
- **AND** workspace content loads with the appropriate glass card rendering

### Requirement: No-script fallback identity
The system SHALL provide a `<noscript>` fallback that uses Inter font, warm accent colors, and clean typography hierarchy for readability.

The fallback SHALL include:
- The user's name and role in warm accent color
- A short summary in readable sans-serif
- Contact details with proper spacing

#### Scenario: Noscript fallback is readable
- **WHEN** JavaScript is disabled
- **THEN** the fallback uses Inter font with warm accent headings
- **AND** content has adequate spacing and hierarchy
