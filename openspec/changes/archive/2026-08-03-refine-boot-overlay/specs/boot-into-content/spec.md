## MODIFIED Requirements

### Requirement: Boot screen as first viewport
The homepage SHALL play a full-viewport terminal boot as a transient overlay on page entry, not as a scrollable section.

The boot overlay SHALL:
- Render `position: fixed` covering the viewport (z-index above the header, below the command palette), with an opaque page background
- Auto-play typed boot lines (reusing the existing LuisOS framing) completing within 2.5 seconds, then fade out within 0.5 seconds and be removed from the DOM
- Play only on full page loads of `/` (not client-side navigation, not `back_forward` navigation), first visit per session, tracked via sessionStorage
- Skip to completion on the first interaction (click, key, touch, wheel, or scroll)
- Not render at all when `prefers-reduced-motion: reduce`, when JavaScript is disabled, when the sessionStorage quick-mode key is set, or when the URL carries a module hash
- Carry decorative information only — no required content
- Display no scroll hint (the overlay fades itself)

#### Scenario: Full boot on first visit
- **WHEN** a visitor opens `/` for the first time in a session via a full page load
- **THEN** the boot overlay types the lines in sequence within 2.5 seconds
- **AND** the overlay fades out within 0.5 seconds revealing the page

#### Scenario: Skip on interaction
- **WHEN** the user clicks, presses a key, touches, or scrolls during the boot overlay
- **THEN** the typing completes instantly and the overlay fades immediately

#### Scenario: Reduced motion renders boot statically
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** no overlay is shown and the page content is visible immediately

#### Scenario: Revisits skip the overlay
- **WHEN** the visitor returns to `/` within the same session (sessionStorage key set)
- **THEN** no overlay is shown and the page content is visible immediately

#### Scenario: No-JS skips the overlay
- **WHEN** JavaScript is disabled
- **THEN** the overlay is absent and all content is immediately visible

#### Scenario: Client-side navigation skips the overlay
- **WHEN** a visitor navigates to `/` from another page of the site via an Astro view transition
- **THEN** no overlay is shown

#### Scenario: Boot carries no required information
- **WHEN** the boot overlay renders
- **THEN** no identity, skill, or contact information is presented solely inside the boot output

### Requirement: Boot collapse to status bar
The boot overlay SHALL NOT leave a status bar behind; after the overlay fades, the persistent site header SHALL show a `[LOADED]` indicator chip on the homepage.

The header chip SHALL:
- Show the loaded indicator (e.g., `[LOADED] LuisOS v7.0.0`) and the monogram, in the existing header
- Appear when the boot completes (or immediately when the boot is skipped — reduced motion, no-JS, quick mode)
- Render only on the homepage; other pages SHALL NOT show it
- Not animate under `prefers-reduced-motion: reduce`

#### Scenario: Boot restores at top
- **WHEN** the user scrolls back to the top of the homepage after the boot overlay has faded
- **THEN** the persistent header with the `[LOADED]` indicator chip is visible at the top of the page

#### Scenario: Reduced motion collapses instantly
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** the overlay never renders and the `[LOADED]` chip is present statically in the header

#### Scenario: Status bar appears after scrolling past boot
- **WHEN** the user scrolls through the homepage
- **THEN** no separate sticky status bar exists and the persistent header with the `[LOADED]` chip remains

#### Scenario: Header chip appears after boot
- **WHEN** the boot overlay completes and fades
- **THEN** the header shows the `[LOADED]` indicator chip

#### Scenario: Chip is static when boot is skipped
- **WHEN** the boot is skipped (quick mode, reduced motion, or no-JS)
- **THEN** the header shows the `[LOADED]` chip statically with no animation

#### Scenario: No status bar on the homepage
- **WHEN** the user scrolls through the homepage
- **THEN** no separate sticky status bar exists — only the persistent header with the chip

#### Scenario: Chip is homepage-only
- **WHEN** a visitor opens `/projects`, `/now`, or `/terminal`
- **THEN** the header shows no `[LOADED]` chip

### Requirement: Motion budget and reduced motion
The homepage SHALL limit motion to a defined set and degrade to a fully static page under reduced motion.

Allowed motion SHALL be limited to:
- Boot typing (≤ 2.5s, skippable) and overlay fade (≤ 0.5s)
- Module divider drawing (scroll-driven)
- Module content line reveals (scroll-driven, staggered)
- Status indicator pulses
- No canvas effects and no JavaScript animation libraries

Under `prefers-reduced-motion: reduce`, SHALL apply:
- No overlay, no typing, no drawing, no reveal animation
- All content visible statically
- Instant module navigation

#### Scenario: Motion is limited to the defined set
- **WHEN** the homepage renders
- **THEN** no canvas element and no animation library are used

#### Scenario: Reduced motion renders a static page
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** no overlay is shown and all modules and their content are visible without any animation
