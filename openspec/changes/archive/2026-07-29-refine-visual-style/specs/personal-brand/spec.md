## REMOVED Requirements

### Requirement: Monogram mark
**Reason**: The ASCII "LUIS" monogram was removed from the hero block in favor of the neofetch-style identity card (defined in the `terminal-theme` capability). The SVG variant still exists for favicon and OG image contexts.

**Migration**: The SVG monogram at `/public/monogram.svg` is still used by the favicon and OG image meta tags. The ASCII `<pre>` rendering in the hero is gone, replaced by the neofetch card.

## MODIFIED Requirements

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
- **WHEN** the user has `prefers-reduced-motion: reduce` set
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

## ADDED Requirements

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
