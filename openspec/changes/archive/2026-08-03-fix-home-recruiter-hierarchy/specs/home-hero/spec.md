## ADDED Requirements

### Requirement: Hero identity hierarchy
The hero section SHALL present the person's full name as the visually dominant element (font size at least 2x body text), followed by role + years of experience, then location and contact links, in decreasing visual weight.

#### Scenario: 10-second comprehension
- **WHEN** a visitor lands on `/` without scrolling
- **THEN** the full name, role, seniority (7+ years), current company, and location are all visible in plain language in the first viewport

#### Scenario: Plain-language labels
- **WHEN** the hero renders identity facts
- **THEN** labels are plain words (Role, Location, Experience, Current) and not technical metaphors (OS, Host, Kernel, Uptime)

### Requirement: Summary placement
The professional summary (`siteConfig.summary`) SHALL render directly below the name/role block and above the contact actions.

#### Scenario: Summary before actions
- **WHEN** the hero renders
- **THEN** document order is: name/role → summary → contact buttons

### Requirement: Contact affordances
Hero contact actions SHALL use unambiguous text labels (Email, LinkedIn, GitHub, CV) and remain visible without scrolling.

#### Scenario: Zero-click clarity
- **WHEN** a recruiter views the hero
- **THEN** each contact action's destination is obvious from its label without relying on icon glyph knowledge

### Requirement: Hero decoration budget
Decorative terminal elements (ASCII art, status indicators) SHALL NOT occupy more vertical space than the identity content itself, and SHALL NOT carry required information.

#### Scenario: No dominant decoration
- **WHEN** the first viewport renders
- **THEN** no decorative graphic is larger than the name heading block

### Requirement: Landing footer chrome
The landing footer SHALL show only copyright and social links (LinkedIn, GitHub); technical diagnostics (scroll percentage, UTC clock, version string, terminal link) SHALL NOT be displayed.

#### Scenario: Recruiter-relevant footer
- **WHEN** a visitor reaches the page footer
- **THEN** only copyright and social/profile links are present
