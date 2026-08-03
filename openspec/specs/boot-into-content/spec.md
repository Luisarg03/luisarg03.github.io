# boot-into-content Specification

## Purpose

The homepage scroll IS the boot process: viewport 1 is a full-screen terminal boot sequence; scrolling past it loads each content module with a drawing divider and staggered line reveal, and the boot screen collapses into a persistent sticky status bar. Content modules map to terminal commands (`whoami`, `htop`, `journalctl`, `shutdown`).
## Requirements
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

### Requirement: Scroll-driven module loading
The homepage SHALL reveal each content module tied to scroll position, not to time.

Module reveal SHALL:
- Draw a horizontal divider line left-to-right as the module enters the viewport, using `animation-timeline: view()` with the existing single IntersectionObserver fallback
- Reveal the module's content lines in staggered order after the divider draws
- Reuse the existing `.reveal-on-view*` and `.draw-on-scroll` utility patterns; new classes SHALL be covered by the same observer fallback without creating duplicate observers
- Keep all module content present in the static HTML before reveal (progressive enhancement — no-JS and crawlers see full content)
- Give modules a minimum height of 100svh on desktop; on mobile modules SHALL grow naturally beyond the viewport

#### Scenario: Divider draws as module enters viewport
- **WHEN** a module scrolls into view
- **THEN** its divider line draws left-to-right in sync with scroll position
- **AND** the module content reveals in staggered order afterward

#### Scenario: Content is static before reveal
- **WHEN** JavaScript is disabled or `animation-timeline` is unsupported
- **THEN** all module content is fully readable in the HTML without any scroll interaction

#### Scenario: Modules fill the viewport on desktop
- **WHEN** a module is rendered at a desktop viewport width
- **THEN** the module occupies at least the full viewport height

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

### Requirement: Module content mapping
The homepage SHALL frame its content modules with terminal commands while keeping the content itself in plain language.

Modules SHALL map as follows:
- `whoami` module: identity facts (full name as the single h1, role, years of experience, location), professional summary, and contact actions rendered as an `ls /contact/` file listing with unambiguous labels (Email, LinkedIn, GitHub, CV)
- `htop` module: skills as a process list (see `skills-visualization` delta)
- `journalctl` module: experience as a timestamped log (see `experience-timeline` delta)
- `shutdown` module: footer with copyright and social links
- All data SHALL come from the existing `cv.ts` and `siteConfig` sources

#### Scenario: Identity facts are plain language
- **WHEN** the whoami module renders identity facts
- **THEN** labels are plain words (Role, Location, Experience, Current) and not technical metaphors
- **AND** terminal commands and prompts are decorative framing only

#### Scenario: Contact actions are unambiguous
- **WHEN** the whoami module renders the contact listing
- **THEN** each contact action's destination is obvious from its label

### Requirement: Command palette module navigation
The command palette SHALL offer module-jump commands that scroll to the corresponding module.

Commands SHALL include `cd /identity`, `cd /skills`, `cd /experience`, `cd /contact`, and `shutdown`.

Module navigation SHALL:
- Use URL hash anchors (`#identity`, `#skills`, `#experience`, `#contact`) with native smooth scroll
- Jump instantly when `prefers-reduced-motion: reduce` is enabled
- Update the URL hash on navigation

#### Scenario: Palette jumps to module
- **WHEN** the user selects `cd /skills` in the command palette
- **THEN** the page scrolls smoothly to the skills module
- **AND** the URL updates to include `#skills`

#### Scenario: Reduced motion jumps instantly
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled and selects a module command
- **THEN** the page jumps to the module without smooth scrolling

### Requirement: Mono-only typography
The homepage SHALL render all text in the monospace font stack.

Typography SHALL:
- Use JetBrains Mono (or the existing mono stack) for every element including headings and prose
- Apply the fluid display scale to the name heading in mono
- Keep long prose readable with a base size of at least 16px and line-height of at least 1.6
- Remove sans-serif font usage from the homepage

#### Scenario: No sans-serif text on homepage
- **WHEN** the homepage renders
- **THEN** no element uses the sans-serif font stack

#### Scenario: Name uses fluid display scale
- **WHEN** the whoami module renders the name heading
- **THEN** the heading size is derived from a `clamp()` value in the monospace font

#### Scenario: Prose remains readable
- **WHEN** the summary text renders
- **THEN** it uses a base size of at least 16px and a line-height of at least 1.6

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

