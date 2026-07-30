# Personal Brand — Delta Spec

## ADDED Requirements

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

## MODIFIED Requirements

### Requirement: Color palette tokens
The system SHALL define a color palette as design tokens consumable via CSS custom properties and Tailwind v4 `@theme` utilities.

The palette SHALL include:
- Control blue (`--color-accent`, primary accent for links, focus, active states)
- Copper (`--color-accent-warm`, secondary accent for emphasis, glow, hero highlights, section connectors, hover transitions)
- System green (`--color-success`, active status indicators)
- Surface tones (`--color-bg`, `--color-surface`, `--color-surface-alt`, `--color-border`, `--color-border-active`)
- Text tones (`--color-text`, `--color-text-muted`)

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
