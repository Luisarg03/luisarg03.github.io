## MODIFIED Requirements

### Requirement: Boot screen as first viewport
The homepage SHALL play a full-viewport terminal boot as a transient overlay on page entry, not as a scrollable section.

The boot overlay SHALL:
- Render `position: fixed` covering the viewport (z-index above the header, below the command palette), with an opaque page background
- Auto-play typed boot lines (reusing the existing LuisOS framing) completing within 2.5 seconds, then fade out within 0.5 seconds and be removed from the DOM
- Reveal module-loading lines sequentially, one line at a time, with the existing typed-frame timing (fixed line order, no interleaving or random delays)
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
- **THEN** module-loading lines appear one by one, in order, each with the existing typed-frame timing
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
