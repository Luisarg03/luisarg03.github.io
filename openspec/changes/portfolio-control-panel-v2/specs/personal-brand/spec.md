# Personal Brand

The visual identity system for the portfolio: monogram, color palette, typography stack, and motion language. Designed to be portable across the current site, future pages (`/now`, `/uses`, `/blog`), and external surfaces (GitHub profile, OG images, favicon variants).

## ADDED Requirements

### Requirement: Monogram mark
The system SHALL provide a monogram mark usable as a primary brand element.

The monogram SHALL be the letters "LP" rendered in monospace, derived from the `~/luisarg` shell prompt metaphor. The ASCII form SHALL be the canonical source of truth; an SVG export SHALL exist as a derivative for contexts where text rendering is unreliable (favicons, OG images, social previews).

#### Scenario: ASCII monogram renders in hero
- **WHEN** the home page hero section is loaded
- **THEN** the monogram is displayed as a `<pre>` block in monospace font
- **AND** it is visible at all viewport widths ≥ 320px

#### Scenario: SVG fallback exists for static contexts
- **WHEN** the OG image or favicon is requested
- **THEN** an SVG variant of the monogram is served from `/public/`

### Requirement: Color palette tokens
The system SHALL define a color palette as design tokens consumable via CSS custom properties and Tailwind v4 `@theme` utilities.

The palette SHALL include:
- Control blue (`--color-accent`, primary accent for links, focus, active states)
- Copper (`--color-accent-warm`, secondary accent for emphasis, glow, hero highlights)
- System green (`--color-success`, active status indicators)
- Surface tones (`--color-bg`, `--color-surface`, `--color-surface-alt`, `--color-border`, `--color-border-active`)
- Text tones (`--color-text`, `--color-text-muted`, `--color-text-faint`)

#### Scenario: Tokens resolve via CSS and Tailwind
- **WHEN** any component references `var(--color-accent)` or the `text-accent` utility
- **THEN** both resolve to the same color value
- **AND** the value is defined exactly once in the `@theme` block

#### Scenario: Copper accent is reserved for emphasis
- **WHEN** copper is used in a component
- **THEN** it appears only on small text, icons, glow effects, or interactive states
- **AND** never on body copy or primary headings

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
- Reveal on scroll (existing IntersectionObserver behavior)
- Bento entrance stagger (each child delayed by ~80ms)
- Typewriter for hero role
- Pulse glow for active status indicators
- Scroll-driven line drawing for timeline
- Cursor-gravity for blueprint background

All motion SHALL be disabled when `prefers-reduced-motion: reduce` is set.

#### Scenario: Reduced motion disables animations
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** no entrance animations, no scroll-driven effects, no canvas motion
- **AND** content is fully visible on first paint
