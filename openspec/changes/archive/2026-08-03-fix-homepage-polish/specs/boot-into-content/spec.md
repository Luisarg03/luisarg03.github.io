## MODIFIED Requirements

### Requirement: Scroll-driven module loading
The homepage SHALL reveal each content module tied to scroll position, not to time.

Module reveal SHALL:
- Draw a horizontal divider line left-to-right as the module enters the viewport; the divider MAY use `animation-timeline: view()` with the existing single IntersectionObserver fallback
- Reveal the module's content lines in staggered order, gated by the `is-visible` class set by the single IntersectionObserver
- NOT depend on `animation-timeline` for content visibility: a frozen or unsupported timeline SHALL never leave module content hidden (class-gated reveal)
- Re-observe reveal elements after client-side navigation (`astro:page-load`) so restored scroll positions re-reveal content that is in view
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

#### Scenario: Content never stays hidden after navigation
- **WHEN** the user navigates away from `/` and back (client-side navigation or back/forward) with a restored scroll position
- **THEN** all module content in or above the restored viewport is visible without further scrolling
- **AND** a frozen `animation-timeline` state cannot hide content

### Requirement: Mono-only typography
The homepage SHALL use a hierarchical font system: sans-serif for prose and body text, monospace for terminal framing, labels, headings, and code.

Typography SHALL:
- Use the sans-serif stack (Inter variable font, already a dependency) for prose and body text
- Use the monospace stack (JetBrains Mono) for terminal framing, section labels, headings, code, and UI chrome
- Apply the fluid display scale to the name heading in mono
- Keep prose readable with a base size of at least 17px and a line-height of at least 1.7
- Keep text colors at AA contrast (≥ 4.5:1) against the page background

#### Scenario: Sans-serif for prose
- **WHEN** the summary or any body/prose text renders
- **THEN** it uses the sans-serif font stack

#### Scenario: No sans-serif text on homepage
- **WHEN** the homepage renders
- **THEN** the sans-serif stack is used only for prose and body text (no sans-serif in headings, labels, terminal framing, code, or UI chrome)

#### Scenario: Mono for UI chrome
- **WHEN** terminal framing, section labels, headings, code, or UI chrome render
- **THEN** they use the monospace font stack

#### Scenario: Name uses fluid display scale
- **WHEN** the whoami module renders the name heading
- **THEN** the heading size is derived from a `clamp()` value in the monospace font

#### Scenario: Prose remains readable
- **WHEN** the summary text renders
- **THEN** it uses a base size of at least 17px and a line-height of at least 1.7
