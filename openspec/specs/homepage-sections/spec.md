# Homepage Sections Specification

## Purpose

Define the homepage (`/`) as a single scrollable page composed of Hero, Experience Timeline, Skills, and Contact sections built from existing components (`Hero.astro`, `ExperienceTimeline.astro`, `SkillMap.astro`, `ContactSection.astro`) without modifying their internals. The page maintains the terminal aesthetic (dark background, monospace typography, copper `#f0b429` accent, panel border conventions, section tab chrome) and supports in-page anchor navigation via URL hashes.
## Requirements
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

### Requirement: Homepage sections connect via scroll anchors
The homepage SHALL support in-page anchor navigation via URL hashes (`#identity`, `#skills`, `#experience`, `#contact`) mapped to the corresponding modules.

Anchor clicks SHALL use native smooth scroll and respect `prefers-reduced-motion` (instant jump).

#### Scenario: Hash link scrolls to module
- **WHEN** a user clicks a link with `href="#skills"` or navigates to `/#skills`
- **THEN** the page scrolls smoothly to the skills module
- **AND** the URL updates to include the hash

#### Scenario: Hash link scrolls to section
- **WHEN** a user clicks a link with `href="#experience"` or navigates to `/#experience`
- **THEN** the page scrolls smoothly to the experience module
- **AND** the URL updates to include the hash

#### Scenario: Reduced motion disables smooth scroll
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** anchor navigation jumps instantly to the target module

### Requirement: Experience timeline renders all jobs
The experience module SHALL render all professional experience entries from `cv.ts` as a journalctl-style log, sorted by start date descending, per the `experience-timeline` delta spec.

#### Scenario: All experience entries are visible
- **WHEN** the homepage loads and the user scrolls to the experience module
- **THEN** all job entries from `cv.ts` are visible in chronological order
- **AND** the current position is visually highlighted

#### Scenario: Collapsible details expand on click
- **WHEN** a user clicks "Show details" on a non-current entry with >4 responsibilities
- **THEN** the hidden responsibilities become visible
- **AND** the button text changes to "Hide details"

### Requirement: Skills section renders all categories
The skills module SHALL render all skill categories from `cv.ts` as an htop-style process list per the `skills-visualization` delta spec.

On desktop, all categories SHALL be expanded by default. On mobile, categories SHALL be collapsed accordions toggleable by header click.

#### Scenario: Skills render with all categories
- **WHEN** the homepage loads and the user scrolls to the skills module
- **THEN** all 10 skill categories are visible in the process list with their proficiency
- **AND** skill text uses the monospace font
- **AND** no per-category colors are applied

#### Scenario: Mobile skills are collapsible
- **WHEN** viewport width is < 640px
- **THEN** skill categories render as collapsed accordion sections
- **AND** clicking a category header expands it

### Requirement: Contact section renders all links
The contact module SHALL render links for email, LinkedIn, GitHub, and CV download as an `ls /contact/` file listing within the whoami module.

Each link SHALL show a label and a value. External links SHALL open in new tabs with `noopener`. The CV link SHALL use the `download` attribute. Icons SHALL be typographic glyphs or SVGs (not emoji).

#### Scenario: Contact links are present and functional
- **WHEN** the whoami module renders
- **THEN** email, LinkedIn, GitHub, and CV download links are visible
- **AND** external links have `target="_blank"` and `rel="noopener"`
- **AND** the CV link has the `download` attribute

#### Scenario: Contact icons are typographic
- **WHEN** the contact listing renders
- **THEN** link icons are glyphs or SVGs in the monospace style
- **AND** no emoji characters are used

