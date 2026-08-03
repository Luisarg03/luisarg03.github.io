## ADDED Requirements

### Requirement: Skills marquee strip
The homepage SHALL render a CSS-only infinite marquee strip of skill category chips between the Hero and Experience sections, so skills are visible within the first screen.

The strip SHALL:
- Use CSS animation only (no JavaScript)
- Display one chip per category from `skillCategories` in `cv.ts` (10 chips)
- Pause on hover
- Disable animation and render a static row under `prefers-reduced-motion: reduce`
- Present a semantic list to screen readers (duplicated decorative chips hidden from assistive tech)

#### Scenario: Marquee shows category chips
- **WHEN** the homepage loads
- **THEN** a marquee strip of category chips is visible below the hero
- **AND** the strip is the only animation running in the first screen

#### Scenario: Reduced motion disables marquee
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** the chips render as a static row without animation

#### Scenario: Chips anchor to skills section
- **WHEN** a user clicks a chip
- **THEN** the page scrolls to the Skills section
- **AND** the URL updates to include the `#skills` hash

## MODIFIED Requirements

### Requirement: Homepage renders as scrolling sections
The homepage (`/`) SHALL render as a single scrollable page under `BaseLayout` containing Hero, Skills Marquee, Experience Timeline, Skills, and Contact in vertical order.

All sections SHALL use existing components (`Hero.astro`, `ExperienceTimeline.astro`, `SkillMap.astro`, `ContactSection.astro`) without modification to their internal implementation, plus the new marquee component.

#### Scenario: Homepage loads with all sections visible
- **WHEN** a visitor navigates to `/`
- **THEN** the Hero section renders immediately at the top
- **AND** the skills marquee renders below the hero within the first screen
- **AND** scrolling down reveals Experience Timeline, Skills, and Contact sections in order

### Requirement: Skills section renders all categories
The Skills section SHALL render all skill categories from `cv.ts` as a syntax-highlighted code presentation per the `skills-visualization` spec.

On desktop, all categories SHALL be expanded by default. On mobile, categories SHALL be collapsed accordions toggleable by header click.

Category headers SHALL NOT use per-category color accents; emphasis SHALL use the single accent color on hover/focus.

#### Scenario: Skills render with all categories
- **WHEN** the homepage loads and user scrolls to the Skills section
- **THEN** all 10 skill categories are visible in the code presentation with their skills
- **AND** skill text uses the monospace font
- **AND** no per-category colors are applied

### Requirement: Contact section renders all links
The Contact section SHALL render links for email, LinkedIn, GitHub, and CV download as defined in `ContactSection.astro`.

Each link SHALL be a panel card with a typographic glyph or SVG icon (not emoji), a label, and a value.

#### Scenario: Contact icons are typographic
- **WHEN** the Contact section renders
- **THEN** link icons are glyphs or SVGs in the monospace style
- **AND** no emoji characters are used
