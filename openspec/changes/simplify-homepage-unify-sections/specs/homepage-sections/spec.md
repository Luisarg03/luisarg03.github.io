## ADDED Requirements

### Requirement: Homepage renders as scrolling sections
The homepage (`/`) SHALL render as a single scrollable page under `BaseLayout` containing Hero, Experience Timeline, Skills, and Contact sections in vertical order.

All sections SHALL use existing components (`Hero.astro`, `ExperienceTimeline.astro`, `SkillMap.astro`, `ContactSection.astro`) without modification to their internal implementation.

The page SHALL maintain the terminal aesthetic: dark background, monospace typography, copper (`#f0b429`) accent color, panel border conventions, and section tab chrome as defined in `terminal-theme` and `visual-system` specs.

#### Scenario: Homepage loads with all sections visible
- **WHEN** a visitor navigates to `/`
- **THEN** the Hero section renders immediately at the top
- **AND** scrolling down reveals Experience Timeline, Skills, and Contact sections in order
- **AND** the `BaseLayout` header, footer, and blueprint background are present

#### Scenario: Sections use existing panel conventions
- **WHEN** any section renders on the homepage
- **THEN** it uses the `SectionPanel` component with terminal tab chrome (path label + dots)
- **AND** the section title follows the mono-first label convention with accent-colored leading character

#### Scenario: Scroll position restored on back navigation
- **WHEN** a user navigates from homepage to another page and returns via browser back
- **THEN** the homepage scroll position is restored to where the user left off

### Requirement: Homepage sections connect via scroll anchors
The homepage SHALL support in-page anchor navigation via URL hashes (`#experience`, `#skills`, `#contact`).

Anchor clicks SHALL use native smooth scroll and respect `prefers-reduced-motion` (instant jump).

#### Scenario: Hash link scrolls to section
- **WHEN** a user clicks a link with `href="#experience"` or navigates to `/#experience`
- **THEN** the page scrolls smoothly to the Experience section
- **AND** the URL updates to include the hash

#### Scenario: Reduced motion disables smooth scroll
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** anchor navigation jumps instantly to the target section

### Requirement: Hero renders as neofetch card with stats
The Hero section SHALL render as a neofetch-inspired identity card as defined in `terminal-theme` spec, including the Arch ASCII art, key:value pairs (OS, Host, Kernel, Uptime), name, and summary text.

Below the neofetch card, two stat widgets SHALL display: years of experience and current role with status indicator.

#### Scenario: Hero shows professional identity
- **WHEN** the homepage loads
- **THEN** the hero displays the user's name, role, location, and professional summary
- **AND** the neofetch card includes at least 4 key:value pairs
- **AND** stat widgets show experience years and current company

### Requirement: Experience timeline renders all jobs
The Experience section SHALL render a vertical timeline of all professional experience entries from `cv.ts`, sorted by start date descending.

Each entry SHALL show: role, company, location, date range, and responsibilities. The current position SHALL be visually distinct (green node, "current" badge, subdued highlight background).

Entries with more than 4 responsibilities and non-current positions SHALL have collapsible details toggled by a "Show details" button.

#### Scenario: All experience entries are visible
- **WHEN** the homepage loads and user scrolls to Experience section
- **THEN** all job entries from `cv.ts` are visible in chronological order
- **AND** the current position is visually highlighted

#### Scenario: Collapsible details expand on click
- **WHEN** a user clicks "Show details" on a non-current entry with >4 responsibilities
- **THEN** the hidden responsibilities become visible
- **AND** the button text changes to "Hide details"

### Requirement: Skills section renders all categories
The Skills section SHALL render all skill categories from `cv.ts` with their associated tags, grouped by category.

On desktop, all categories SHALL be expanded by default. On mobile, categories SHALL be collapsed accordions toggleable by header click.

Each category SHALL have a color accent dot from the `categoryAccents` mapping.

#### Scenario: Skills render with all categories
- **WHEN** the homepage loads and user scrolls to Skills section
- **THEN** all 10 skill categories are visible with their tags
- **AND** each category has a colored accent dot
- **AND** skill tags use monospace font with subtle border

#### Scenario: Mobile skills are collapsible
- **WHEN** viewport width is < 640px
- **THEN** skill categories render as collapsed accordion sections
- **AND** clicking a category header expands it

### Requirement: Contact section renders all links
The Contact section SHALL render links for email, LinkedIn, GitHub, and CV download as defined in `ContactSection.astro`.

Each link SHALL be a panel card with icon, label, and value. External links SHALL open in new tabs with `noopener`. The CV link SHALL use the `download` attribute.

#### Scenario: Contact links are present and functional
- **WHEN** the homepage loads and user scrolls to Contact section
- **THEN** email, LinkedIn, GitHub, and CV download links are visible
- **AND** external links have `target="_blank"` and `rel="noopener"`
- **AND** the CV link has the `download` attribute
