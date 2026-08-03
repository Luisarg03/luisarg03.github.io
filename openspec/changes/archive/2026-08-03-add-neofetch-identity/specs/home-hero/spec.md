## MODIFIED Requirements

### Requirement: Hero identity hierarchy

The identity module SHALL present the full name, role, seniority, current company, and location in plain language in the first viewport without scrolling. The identity module MAY include a decorative neofetch-style card (Arch ASCII art plus persona-mapped rows) alongside the identity content; the card SHALL NOT displace the required identity fields from the first viewport at any viewport width.

#### Scenario: 10-second comprehension
- **WHEN** a visitor lands on `/`
- **THEN** the full name, role, seniority, current company, and location are visible in plain language in the first viewport without any scroll

#### Scenario: Identity after boot
- **WHEN** a visitor lands on `/`
- **THEN** the boot overlay plays over the identity module
- **AND** after it completes (or is skipped) the identity fields are visible in the first viewport without scrolling

#### Scenario: Plain-language labels
- **WHEN** the identity module renders
- **THEN** the identity fields use plain labels (Role, Experience, Current, Location)
- **AND** the neofetch card does not replace them

#### Scenario: Neofetch card renders alongside identity
- **WHEN** the identity module renders
- **THEN** the neofetch card shows the Arch ASCII art and persona rows
- **AND** the name, role, years, company, and location remain visible in the first viewport without scrolling

#### Scenario: Neofetch card is decorative
- **WHEN** the neofetch card renders
- **THEN** it is aria-hidden
- **AND** carries no required information

### Requirement: Hero decoration budget

Decorative terminal elements (boot overlay, terminal prompts, neofetch card) SHALL NOT carry required information and SHALL NOT displace identity content: the boot overlay plays over the identity content and fades within 2.5 seconds and is skippable; the neofetch card SHALL keep the identity fields in the first viewport and SHALL collapse gracefully on mobile (ASCII art hidden, rows stacked, no horizontal overflow).

#### Scenario: No dominant decoration
- **WHEN** the identity module renders
- **THEN** no decorative graphic is larger than the name heading block
- **AND** the boot overlay fades completely revealing the identity content

#### Scenario: Boot is brief and skippable
- **WHEN** the boot overlay renders
- **THEN** the sequence completes within 2.5 seconds
- **AND** the user can skip it with a single interaction
- **AND** after fade the identity content occupies the first viewport

#### Scenario: Neofetch card does not displace identity
- **WHEN** the neofetch card renders at 390px
- **THEN** the identity fields remain in the first viewport
- **AND** the ASCII art is hidden without horizontal overflow

#### Scenario: Neofetch ASCII art is copper and mono
- **WHEN** the ASCII art renders
- **THEN** it uses the monospace stack in the copper accent color (contrast >= 4.5:1 against the page background)
