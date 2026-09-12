## MODIFIED Requirements

### Requirement: Boot screen as first viewport
The homepage SHALL play a full-viewport terminal boot as a transient overlay on page entry, not as a scrollable section.

The boot overlay SHALL:
- Render `position: fixed` covering the viewport (z-index above the header, below the command palette), with an opaque page background
- Auto-play typed boot lines (reusing the existing LuisOS framing) at a fixed frame cadence of 150ms per line, completing the full sequence within 2.5 seconds, then fade out within 0.5 seconds and be removed from the DOM
- Reveal module-loading lines sequentially, one line at a time, at the fixed frame cadence (fixed line order, no interleaving or random delays)
- Render a decorative noise/interference layer while playing (see Requirement: Boot noise/interference layer) that is removed from the DOM with the overlay
- Play only on full page loads of `/` (not client-side navigation, not `back_forward` navigation), first visit per session, tracked via sessionStorage
- Skip to completion on the first interaction (click, key, touch, wheel, or scroll)
- Not render at all when `prefers-reduced-motion: reduce`, when JavaScript is disabled, when the sessionStorage quick-mode key is set, or when the URL carries a module hash
- Carry decorative information only — no required content
- Display no scroll hint (the overlay fades itself)

#### Scenario: Full boot on first visit
- **WHEN** a visitor opens `/` for the first time in a session via a full page load
- **THEN** the boot overlay types the lines in sequence within 2.5 seconds
- **AND** the overlay fades out within 0.5 seconds revealing the page

#### Scenario: Boot lines load sequentially
- **WHEN** the boot overlay plays
- **THEN** module-loading lines appear one by one, in order, each at the fixed 150ms frame cadence
- **AND** no line renders before its turn in the sequence

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

## ADDED Requirements

### Requirement: Boot noise/interference layer
The boot overlay SHALL render a decorative noise/interference layer while playing.

The noise layer SHALL:
- Render as a full-overlay grain texture (SVG feTurbulence) with a `steps()` jitter animation, at a subtle base opacity (≤ 0.12)
- Use `mix-blend-mode: overlay` to seat the grain in the overlay's color space
- Not intercept pointer events or scroll
- Play a static burst (≤ 0.3s, opacity peak ≤ 0.3) when the final boot line renders
- Be removed from the DOM with the boot overlay, leaving no residue on the page
- Never render outside the boot overlay
- Add no layout shift (positioned absolutely within the fixed overlay)

#### Scenario: Grain renders during boot
- **WHEN** the boot overlay plays
- **THEN** a subtle jittering grain texture is visible over the overlay
- **AND** the grain does not intercept clicks, keys, touches, wheel, or scroll

#### Scenario: Burst at handoff
- **WHEN** the final `[ OK ] htop --sort=cpu` line renders
- **THEN** a static burst plays for at most 0.3 seconds and resolves before the overlay fade completes

#### Scenario: Burst on skip
- **WHEN** the user skips the boot
- **THEN** the burst may play during the fade
- **AND** handoff events (`boot-complete`, `boot-overlay-hidden`) still fire and the htop bars still fill

#### Scenario: Noise leaves no residue
- **WHEN** the boot overlay is removed from the DOM
- **THEN** no grain, scanline, or burst element remains in the page

#### Scenario: Noise never renders outside the boot
- **WHEN** the boot overlay is absent (quick mode, reduced motion, no-JS, client-side navigation)
- **THEN** no noise layer is present in the page

### Requirement: Motion budget and reduced motion
The homepage SHALL limit motion to a defined set and degrade to a fully static page under reduced motion.

Allowed motion SHALL be limited to:
- Boot typing (≤ 2.5s, skippable) and overlay fade (≤ 0.5s)
- Boot noise jitter (decorative grain inside the boot overlay, ≤ 0.5s per jitter cycle)
- Boot handoff interference burst (≤ 0.3s, timed with the final boot line)
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
