## MODIFIED Requirements

### Requirement: Hero identity hierarchy
The identity block (whoami module) SHALL present the person's full name as the visually dominant element (fluid display scale, at least 2x body text), followed by role + years of experience, then location and contact actions, in decreasing visual weight. The block SHALL be reachable with at most one scroll from the boot screen.

#### Scenario: Identity after boot
- **WHEN** a visitor lands on `/` and the boot screen completes
- **THEN** the full name, role, seniority (7+ years), and location are all visible in plain language in the whoami module after at most one scroll

#### Scenario: 10-second comprehension
- **WHEN** a visitor lands on `/` and the boot screen completes
- **THEN** the full name, role, seniority (7+ years), current company, and location are all visible in plain language after at most one scroll

#### Scenario: Plain-language labels
- **WHEN** the whoami module renders identity facts
- **THEN** labels are plain words (Role, Location, Experience, Current) and not technical metaphors (OS, Host, Kernel, Uptime)
- **AND** terminal commands and prompts are decorative framing only

### Requirement: Summary placement
The professional summary (`siteConfig.summary`) SHALL render directly below the name/role block and above the contact actions within the whoami module.

#### Scenario: Summary before actions
- **WHEN** the whoami module renders
- **THEN** document order is: name/role → summary → contact actions

### Requirement: Contact affordances
Whoami module contact actions SHALL use unambiguous text labels (Email, LinkedIn, GitHub, CV) rendered as an `ls /contact/` file listing, and SHALL be visible after the boot screen completes with at most one scroll.

#### Scenario: Zero-click clarity
- **WHEN** a recruiter views the whoami module
- **THEN** each contact action's destination is obvious from its label without relying on icon glyph knowledge

### Requirement: Hero decoration budget
Decorative terminal elements (boot screen, terminal prompts) SHALL NOT carry required information, SHALL NOT occupy more vertical space than the identity content itself, and the boot screen SHALL complete within 2.5 seconds and be skippable.

#### Scenario: No dominant decoration
- **WHEN** the whoami module renders
- **THEN** no decorative graphic is larger than the name heading block

#### Scenario: Boot is brief and skippable
- **WHEN** the boot screen renders
- **THEN** the sequence completes within 2.5 seconds
- **AND** the user can skip it with a single interaction
