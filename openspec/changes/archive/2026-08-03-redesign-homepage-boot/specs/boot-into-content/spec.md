## ADDED Requirements

### Requirement: Boot screen as first viewport
The homepage SHALL render a full-viewport (100svh) terminal boot screen as its first module, before any content module.

The boot screen SHALL:
- Auto-play typed boot lines (reusing the existing LuisOS framing) completing within 2.5 seconds
- Skip to completion on the first interaction (click, key, or touch)
- Play the full sequence on the first visit per session and a condensed sequence on subsequent visits, tracked via sessionStorage
- Render statically (no typing) under `prefers-reduced-motion: reduce`
- Carry decorative information only — no required content
- Display a scroll hint (e.g., "scroll to continue") after completion

#### Scenario: Full boot on first visit
- **WHEN** a visitor opens `/` for the first time in a session
- **THEN** the boot lines type out in sequence within 2.5 seconds
- **AND** a scroll hint appears after the sequence completes

#### Scenario: Skip on interaction
- **WHEN** the user clicks, presses a key, or touches during the boot sequence
- **THEN** the boot completes instantly
- **AND** the scroll hint appears immediately

#### Scenario: Reduced motion renders boot statically
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** all boot lines render instantly with no typing animation

#### Scenario: Boot carries no required information
- **WHEN** the boot screen renders
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
The boot screen SHALL collapse into a thin sticky status bar once the user scrolls past it.

The status bar SHALL:
- Show a loaded indicator (e.g., `[LOADED] LuisOS v7.0.0`) and the monogram
- Remain sticky at the top while the user scrolls through the modules
- Restore the full boot screen when the user scrolls back to the top
- Animate the collapse/restore with a CSS height transition (instant under reduced motion)

#### Scenario: Status bar appears after scrolling past boot
- **WHEN** the user scrolls past the boot screen
- **THEN** the boot collapses to a sticky status bar with the loaded indicator

#### Scenario: Boot restores at top
- **WHEN** the user scrolls back to the top of the page
- **THEN** the full boot screen is restored

#### Scenario: Reduced motion collapses instantly
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** the boot collapses to the status bar without animation

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
- Boot typing (≤ 2.5s, skippable)
- Module divider drawing (scroll-driven)
- Module content line reveals (scroll-driven, staggered)
- Status indicator pulses
- No canvas effects and no JavaScript animation libraries

Under `prefers-reduced-motion: reduce`, SHALL apply:
- No typing, drawing, or reveal animation
- All content visible statically
- Instant module navigation

#### Scenario: Motion is limited to the defined set
- **WHEN** the homepage renders
- **THEN** no canvas element and no animation library are used

#### Scenario: Reduced motion renders a static page
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** all modules and their content are visible without any animation
