## MODIFIED Requirements

### Requirement: Homepage renders as scrolling sections
The homepage (`/`) SHALL render as a single scrollable page under `BaseLayout` composed of: the identity (whoami) module as the first viewport, then the skills (htop), experience (journalctl), and contact modules in vertical order, per the `boot-into-content` spec. A boot overlay plays over the first viewport on entry and fades (see `boot-into-content`).

The page SHALL maintain the terminal aesthetic: dark background, monospace typography, copper (`#f0b429`) accent color, panel border conventions, and blueprint grid chrome as defined in `terminal-theme` and `visual-system` specs.

#### Scenario: Homepage loads with boot first
- **WHEN** a visitor navigates to `/` on a first full page load
- **THEN** the boot overlay plays over the first viewport and fades
- **AND** the whoami module renders as the first content below it
- **AND** scrolling reveals the htop, journalctl, and contact modules in order
- **AND** the `BaseLayout` header, footer, and blueprint background are present

#### Scenario: Homepage loads with all sections visible
- **WHEN** a visitor navigates to `/`
- **THEN** all module content (whoami, htop, journalctl, contact) is present in the page without requiring interaction
- **AND** the `BaseLayout` header, footer, and blueprint background are present

#### Scenario: Sections use existing panel conventions
- **WHEN** any module renders on the homepage
- **THEN** it uses the module divider + content reveal pattern (`.module-divider` / `.module-content`) with the panel border conventions from `terminal-theme` / `visual-system`
- **AND** the module title follows the mono-first label convention with accent-colored leading character

#### Scenario: Scroll position restored on back navigation
- **WHEN** a user navigates from homepage to another page and returns via browser back
- **THEN** the homepage scroll position is restored to where the user left off
