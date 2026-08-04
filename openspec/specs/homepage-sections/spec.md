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

## ADDED Requirements

### Requirement: Identity name renders as a detail row

The whoami module SHALL render the user's name as a `Name: value`
detail row in the same monospace style as the Role, Experience,
Current, and Location rows, instead of as a display-scale heading
above the detail list. The name SHALL be the first row in the
detail list, and SHALL be the page's semantic `<h1>` (visible, not
hidden, with text content including "Luis Meyehen Paz", per the
`h1-semantics` spec).

#### Scenario: Name is the first detail row
- **WHEN** the whoami module renders
- **THEN** the first row of the detail list is `Name: <full name>`
- **AND** the row uses the same font-family, font-size, key/sep/val
  structure, and teal accent on the key as the other detail rows
- **AND** the row's element is `<h1>` with visible text including
  "Luis Meyehen Paz"

#### Scenario: Name has the same visual weight as other detail rows
- **WHEN** the whoami module is rendered
- **THEN** the Name row does not appear larger or in a different
  font than the Role, Experience, Current, and Location rows

### Requirement: MOTD prompt and summary align with the info column

On desktop viewports (>= 640px), the `$ cat /etc/motd` decorative
prompt and the summary paragraph SHALL be rendered inside the same
column as the name + detail rows (to the right of the Arch ASCII
art), so the summary does not drift to the left of the info column
and visual rhythm is preserved.

On mobile viewports (< 640px), the prompt and summary SHALL be
full-width below the detail list, since the Arch art stacks above
the info column on mobile.

#### Scenario: MOTD aligns with info column on desktop
- **WHEN** the viewport is >= 640px
- **THEN** the `$ cat /etc/motd` prompt and the summary paragraph
  start at the same x-position as the name and detail rows
- **AND** no content overflows the info column's width

#### Scenario: MOTD stacks below details on mobile
- **WHEN** the viewport is < 640px
- **THEN** the `$ cat /etc/motd` prompt and the summary paragraph
  render full-width below the detail list
- **AND** the page reads top-to-bottom in order: Arch art, name +
  details, MOTD prompt, summary, contact prompt, contact row

## ADDED Requirements

### Requirement: Identity module renders as 3 vertical blocks

The homepage IdentityModule SHALL render as 3 distinct vertical
blocks within the `.identity-content` container, in document
order: (1) the hero block containing the ASCII art and the 5
detail rows, (2) the MOTD block containing the `$ cat /etc/motd`
prompt and the summary paragraph, (3) the contact block
containing the `$ ls /contact/` prompt and the contact tiles.
The hero block uses a 2-column grid on desktop (>= 640px) with
the ASCII art on the left and the 5 detail rows on the right;
on mobile (< 640px) the art stacks above the detail rows. The
MOTD block and the contact block each span the full width of
the `.identity-content` container.

#### Scenario: Hero block uses 2-col grid on desktop
- **WHEN** a visitor views the homepage at viewport >= 640px
- **THEN** the hero block renders as a 2-column grid
- **AND** the ASCII art occupies the left column
- **AND** the 5 detail rows occupy the right column

#### Scenario: Hero block stacks on mobile
- **WHEN** a visitor views the homepage at viewport < 640px
- **THEN** the hero block renders as a single column
- **AND** the ASCII art stacks above the detail rows
- **AND** the MOTD block and the contact block each render
  full-width below the hero

#### Scenario: MOTD block contains only MOTD prompt and summary
- **WHEN** the IdentityModule renders
- **THEN** the MOTD block contains the `$ cat /etc/motd` prompt
  and the summary paragraph
- **AND** the MOTD block does NOT contain the contact prompt
  or the contact tiles

#### Scenario: Contact block contains only contact prompt and tiles
- **WHEN** the IdentityModule renders
- **THEN** the contact block contains the `$ ls /contact/`
  prompt and the contact tiles
- **AND** the contact block does NOT contain the MOTD prompt
  or the summary

### Requirement: ASCII art height aligns with the data column

The Arch ASCII art in the IdentityModule hero SHALL be trimmed
to 8 lines so its visual height matches the data column's
visual height. The data column SHALL vertically center within
the art's column space via `align-items: center` on the hero
grid.

#### Scenario: ASCII art is 8 lines
- **WHEN** the IdentityModule renders
- **THEN** the ASCII art `<pre>` element contains exactly 8
  lines of art
- **AND** the art preserves the recognizable Arch shape

#### Scenario: Data column centers vertically against the art
- **WHEN** the hero block renders on desktop
- **THEN** the data column is vertically centered in the
  hero grid's row (via `align-items: center`)
- **AND** the data column's top and bottom whitespace are
  roughly equal

#### Scenario: Alignment works on mobile too
- **WHEN** the hero block renders on mobile (< 640px)
- **THEN** the art and data stack vertically
- **AND** the data column is at its natural height
- **AND** the art's trimmed 8 lines are visible above


