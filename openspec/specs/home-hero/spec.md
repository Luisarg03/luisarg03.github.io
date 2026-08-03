# Home Hero

## Purpose

The hero section of the landing page. Presents identity facts (name, role, seniority, current company, location) with a clear visual hierarchy so a recruiter can grasp who this is within ten seconds, followed by the professional summary and unambiguous contact actions — with decorative and footer chrome kept subordinate.
## Requirements
### Requirement: Hero identity hierarchy
The identity block (whoami module) SHALL present the person's full name as the visually dominant element (fluid display scale, at least 2x body text), followed by role + years of experience, then location and contact actions, in decreasing visual weight. The block SHALL be visible in the first viewport during page load; the boot overlay plays over it and fades without ever requiring a scroll.

#### Scenario: Identity after boot
- **WHEN** a visitor lands on `/` and the boot overlay completes (or is skipped)
- **THEN** the full name, role, seniority (7+ years), and location are all visible in plain language in the whoami module in the first viewport, without scrolling

#### Scenario: 10-second comprehension
- **WHEN** a visitor lands on `/`
- **THEN** the full name, role, seniority (7+ years), current company, and location are all visible in plain language in the first viewport without any scroll

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
Whoami module contact actions SHALL use unambiguous text labels (Email, LinkedIn, GitHub, CV) rendered as an `ls /contact/` file listing, and SHALL be visible in the first viewport alongside the identity block; the boot overlay does not delay them.

#### Scenario: Zero-click clarity
- **WHEN** a recruiter views the whoami module
- **THEN** each contact action's destination is obvious from its label without relying on icon glyph knowledge

### Requirement: Hero decoration budget
Decorative terminal elements (boot overlay, terminal prompts) SHALL NOT carry required information and SHALL be transient: the overlay plays over the identity content and fades within 3 seconds total, is skippable with a single interaction, and never pushes content out of the viewport.

#### Scenario: No dominant decoration
- **WHEN** the identity module renders
- **THEN** no decorative graphic is larger than the name heading block
- **AND** the boot overlay fades completely, leaving the identity content in the first viewport

#### Scenario: Boot is brief and skippable
- **WHEN** the boot overlay renders
- **THEN** the sequence completes within 2.5 seconds
- **AND** the user can skip it with a single interaction
- **AND** after the fade the identity content occupies the first viewport

### Requirement: Landing footer chrome
The landing footer SHALL show only copyright and social links (LinkedIn, GitHub); technical diagnostics (scroll percentage, UTC clock, version string, terminal link) SHALL NOT be displayed.

#### Scenario: Recruiter-relevant footer
- **WHEN** a visitor reaches the page footer
- **THEN** only copyright and social/profile links are present

