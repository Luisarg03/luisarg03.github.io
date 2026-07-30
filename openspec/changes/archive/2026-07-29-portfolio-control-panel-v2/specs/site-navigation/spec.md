# Site Navigation

The navigation system: page-to-page transitions via Astro's View Transitions, a keyboard-driven command palette, scroll-aware status indicators, and in-page section anchors. Designed to make the portfolio feel like a dev tool rather than a static document.

## ADDED Requirements

### Requirement: Cross-page view transitions
The system SHALL animate navigation between pages using Astro's `<ClientRouter />`.

Page transitions SHALL preserve scroll position on back-navigation and reset it on forward-navigation. The blueprint canvas SHALL opt out of transitions (`transition:animate="none"`) to avoid jarring canvas state changes mid-flight.

#### Scenario: Navigation between index and /now animates
- **WHEN** a user clicks a nav link from index to /now (or vice versa)
- **THEN** the page swap animates with a default cross-fade
- **AND** the URL updates without a full page reload

#### Scenario: Back navigation restores scroll position
- **WHEN** a user navigates from page A to page B, then back to page A
- **THEN** page A is restored at the same scroll position as before leaving

### Requirement: Command palette
The system SHALL provide a `⌘K` (macOS) / `Ctrl+K` (other) command palette for keyboard-first navigation.

The palette SHALL:
- Open on `⌘K` or `Ctrl+K` and close on `Escape` or backdrop click
- Support fuzzy search over a static list of commands
- Include commands for: jump to section, open external link (GitHub, LinkedIn, email), copy email, download CV
- Trap focus while open; restore focus to the trigger element on close
- Use `cmdk` (or equivalent headless combobox) for accessibility semantics

#### Scenario: Palette opens on shortcut
- **WHEN** the user presses `⌘K` (or `Ctrl+K`) from anywhere on the page
- **THEN** the palette appears as a modal overlay
- **AND** the search input receives focus within one frame

#### Scenario: Fuzzy search filters commands
- **WHEN** the user types "exp" in the palette
- **THEN** commands matching "Experience" are shown
- **AND** non-matching commands are hidden

#### Scenario: Selected command executes
- **WHEN** the user selects "Open LinkedIn" from the palette
- **THEN** the LinkedIn profile opens in a new tab
- **AND** the palette closes

#### Scenario: Palette is accessible
- **WHEN** the palette is open
- **THEN** it is announced as a combobox dialog by screen readers
- **AND** arrow keys move selection between results
- **AND** `Enter` activates the selected result
- **AND** `Escape` closes the palette

### Requirement: Scroll-aware status bar
The system SHALL display scroll position and current section in the footer status bar.

The status bar SHALL show:
- Current section name (derived from the section currently in view)
- Scroll progress as a percentage
- Local time of day (formatted as `HH:MM`)

Updates SHALL be throttled via `requestAnimationFrame` and SHALL NOT cause layout thrash.

#### Scenario: Status bar reflects current section
- **WHEN** the user scrolls so that the Experience section is in view
- **THEN** the footer shows "section: experience" or equivalent
- **AND** the value updates within one animation frame

#### Scenario: Scroll progress is accurate
- **WHEN** the user scrolls to the bottom of the page
- **THEN** the status bar shows 100% progress
- **AND** at the top, it shows 0%

### Requirement: In-page section anchors
The system SHALL provide smooth scroll navigation to in-page sections via anchor links.

Anchor links SHALL update the URL hash on click, use native smooth scroll, and respect `prefers-reduced-motion` (instant jump in that case).

#### Scenario: Clicking a section link scrolls to it
- **WHEN** the user clicks a link to `#experience`
- **THEN** the page scrolls to the experience section
- **AND** the URL hash updates to `#experience`
