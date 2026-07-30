# Personal Brand

## Purpose

The visual identity system for the portfolio: monogram, color palette, typography stack, and motion language. Designed to be portable across the current site, future pages (`/now`, `/uses`, `/blog`), and external surfaces (GitHub profile, OG images, favicon variants).

## Requirements

### Requirement: Favicon asset
The system SHALL serve a real SVG favicon at `/favicon.svg`.

The favicon SHALL be a simplified monogram mark ("LP") using the accent blue color on a transparent or dark background. It SHALL be legible at 16×16px and 32×32px sizes. The favicon SHALL be linked from the `<head>` of every page via `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`.

#### Scenario: Favicon loads in browser tab
- **WHEN** any page of the site is loaded
- **THEN** the browser tab displays the LP monogram favicon
- **AND** the favicon is legible at standard tab sizes

#### Scenario: Favicon linked in head
- **WHEN** the HTML `<head>` is inspected
- **THEN** a `<link rel="icon">` tag references `/favicon.svg`

### Requirement: Monogram SVG variant
The system SHALL provide an SVG variant of the monogram alongside the existing ASCII `<pre>` form.

The SVG monogram SHALL be served from `/public/monogram.svg` and SHALL render the "LP" mark using the same monospace aesthetic as the ASCII version. The SVG variant SHALL be used for OG images, social previews, and static contexts where text rendering is unreliable.

#### Scenario: SVG monogram is served from public
- **WHEN** `/monogram.svg` is requested
- **THEN** a valid SVG file is returned with the LP monogram
- **AND** the SVG uses the accent blue color

#### Scenario: OG image references SVG monogram
- **WHEN** the OG image meta tag is rendered
- **THEN** it references `/monogram.svg` as the image source

### Requirement: Color palette tokens
The system SHALL define a color palette as design tokens consumable via CSS custom properties and Tailwind v4 `@theme` utilities.

The palette SHALL include:
- Control blue (`--color-accent`, primary accent for links, focus, active states)
- Copper (`--color-accent-warm`, secondary accent for emphasis, glow, hero highlights, section connectors, hover transitions)
- System green (`--color-success`, active status indicators)
- Surface tones (`--color-bg`, `--color-surface`, `--color-surface-alt`, `--color-border`, `--color-border-active`)
- Text tones (`--color-text`, `--color-text-muted`, `--color-text-faint`)

The copper accent (`--color-accent-warm`) SHALL be used on: section connector gradients, interactive hover states on contact cards, status indicator glow rings, and the radar chart polygon. It SHALL NOT be used on body copy or primary headings.

#### Scenario: Tokens resolve via CSS and Tailwind
- **WHEN** any component references `var(--color-accent)` or the `text-accent` utility
- **THEN** both resolve to the same color value
- **AND** the value is defined exactly once in the `@theme` block

#### Scenario: Copper accent appears on interactive surfaces
- **WHEN** a user hovers over a contact card or interactive panel
- **THEN** the border or glow transitions to the copper accent
- **AND** the copper accent does not appear on static body text

#### Scenario: Copper accent marks section boundaries
- **WHEN** a `.section-connector` element is rendered between sections
- **THEN** its gradient includes the copper accent color

### Requirement: Typography stack
The system SHALL use variable fonts loaded self-hosted via `@fontsource-variable`.

The stack SHALL consist of:
- Inter Variable for display text (hero name, headings, large UI)
- JetBrains Mono Variable for monospace UI chrome (labels, code, status text, monogram)

Variable axes SHALL be leveraged for hover/scroll weight animation without loading additional font files.

#### Scenario: Fonts load self-hosted
- **WHEN** a page is requested
- **THEN** the browser fetches font files from the same origin (`/fonts/`)
- **AND** no third-party font CDN request is made

#### Scenario: Variable weight animates on hover
- **WHEN** a user hovers over an interactive text element
- **THEN** the font weight transitions between two axis values (e.g., 400 → 600)
- **AND** the animation uses `transition` on `font-variation-settings`

### Requirement: Motion language
The system SHALL define a consistent motion vocabulary respecting user preferences.

The motion language SHALL include:
- Neofetch-style entrance for the hero identity card (cells fade in with a small stagger, simulating terminal output)
- Reveal on scroll (existing IntersectionObserver behavior)
- Bento entrance stagger (each child delayed by ~80ms)
- Pulse glow for active status indicators
- Scroll-driven line drawing for timeline
- Cursor-gravity for blueprint background

The typewriter animation on the hero role SHALL be removed. The hero identity card replaces it.

All motion SHALL be disabled when `prefers-reduced-motion: reduce` is set.

#### Scenario: Reduced motion disables animations
- **WHEN** the user has `prefers-reduced-motion: reduce` is set
- **THEN** no entrance animations, no scroll-driven effects, no canvas motion
- **AND** content is fully visible on first paint

#### Scenario: Neofetch card entrance
- **WHEN** the hero card enters the viewport on first paint
- **THEN** each key:value row fades in with a small stagger (~50ms)
- **AND** the ASCII art column renders first or simultaneously
- **AND** the animation completes within 800ms

#### Scenario: Typewriter is removed
- **WHEN** the hero section renders
- **THEN** no typewriter caret or rotating role text is visible
- **AND** the role is shown as a static line in the neofetch card

### Requirement: Hero identity card
The system SHALL render the hero block as a neofetch-style identity card on the home page.

The card SHALL display:
- A user identity line in the form `luis@arch` in a monospace prompt context
- An `OS` line showing the role
- A `Host` line showing the location
- A `Kernel` line showing experience duration
- A `Uptime` line showing the current employer
- A small ASCII art column on the left (or top on mobile)

#### Scenario: Hero identity card renders
- **WHEN** the home page loads
- **THEN** the hero shows the neofetch-style card with the fields above
- **AND** all text uses the monospace font for chrome and a clean sans/mono for body

#### Scenario: Identity values come from cv data
- **WHEN** the card renders
- **THEN** the values resolve from `cv.ts` (role, location, experience years, current company)
- **AND** changes to `cv.ts` are reflected without code changes to the card
