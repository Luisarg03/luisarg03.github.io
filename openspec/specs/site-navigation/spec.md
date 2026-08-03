# Site Navigation

## Purpose

The navigation system: page-to-page transitions via Astro's View Transitions, a keyboard-driven command palette, scroll-aware status indicators, and in-page section anchors. Designed to make the portfolio feel like a dev tool rather than a static document.

## Requirements

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
- Include commands for: jump to section, open external link (GitHub, LinkedIn, email), copy email, download CV, **open terminal (`/terminal`)**
- Trap focus while open; restore focus to the trigger element on close
- Use the existing hand-rolled vanilla JS implementation for accessibility semantics

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

#### Scenario: Open Terminal command navigates
- **WHEN** the user selects "Open Terminal" from the palette
- **THEN** the browser navigates to `/terminal`
- **AND** the palette closes

#### Scenario: Palette is accessible
- **WHEN** the palette is open
- **THEN** it is announced as a combobox dialog by screen readers
- **AND** arrow keys move selection between results
- **AND** `Enter` activates the selected result
- **AND** `Escape` closes the palette

### Requirement: Terminal keyboard shortcut
The system SHALL provide a global `Ctrl+Shift+T` keyboard shortcut that navigates to the terminal easter egg page at `/terminal`.

The shortcut SHALL work from any page on the site.

#### Scenario: Shortcut navigates to terminal
- **WHEN** the user presses `Ctrl+Shift+T` from any page
- **THEN** the browser navigates to `/terminal`
- **AND** the default browser behavior for that shortcut is suppressed

#### Scenario: Shortcut registered globally
- **WHEN** the `BaseLayout` is loaded on any page
- **THEN** a global `keydown` listener is registered for `Ctrl+Shift+T`
- **AND** the listener does not interfere with other keyboard shortcuts (`Ctrl+K`, `Alt+1..4`)

### Requirement: Standalone script modules
The system SHALL serve status bar, scroll observer, and velocity tracker logic as standalone JavaScript modules under `src/scripts/`.

BaseLayout SHALL load each script via `<script src="/scripts/..." />` tags rather than inline `<script>` blocks. Each module SHALL be independently cacheable by the browser.

#### Scenario: Status bar script loads as external file
- **WHEN** any page using BaseLayout is loaded
- **THEN** the status bar `<script>` is loaded from an external `.js` file under `/scripts/`
- **AND** the script initializes scroll position, section tracking, and clock display

#### Scenario: Scroll observer script loads independently
- **WHEN** any page using BaseLayout is loaded
- **THEN** the scroll reveal observer `<script>` is loaded from an external file
- **AND** reveal animations trigger when elements enter the viewport

#### Scenario: Velocity tracker script loads independently
- **WHEN** any page using BaseLayout is loaded
- **THEN** the scroll velocity tracker `<script>` is loaded from an external file
- **AND** `--scroll-velocity` CSS custom property updates on scroll

### Requirement: Scroll-aware status bar
The system SHALL display scroll position and current section in the footer status bar.

The status bar SHALL show:
- Current section name (derived from the section currently in view)
- Scroll progress as a percentage
- Local time of day (formatted as `HH:MM`)

Updates SHALL be throttled via `requestAnimationFrame` and SHALL NOT cause layout thrash. The implementation SHALL live in a standalone script file loaded via `<script>` tag, not as inline JavaScript in BaseLayout.

#### Scenario: Status bar reflects current section
- **WHEN** the user scrolls so that the Experience section is in view
- **THEN** the footer shows "section: experience" or equivalent
- **AND** the value updates within one animation frame

#### Scenario: Scroll progress is accurate
- **WHEN** the user scrolls to the bottom of the page
- **THEN** the status bar shows 100% progress
- **AND** at the top, it shows 0%

#### Scenario: Status bar script is external
- **WHEN** the page HTML source is inspected
- **THEN** the status bar logic is not present as an inline `<script>` block
- **AND** it is loaded from `src="/scripts/status-bar.js"` or equivalent

### Requirement: In-page section anchors
The system SHALL provide smooth scroll navigation to in-page sections via anchor links on the homepage.

Anchor links SHALL update the URL hash on click, use native smooth scroll, and respect `prefers-reduced-motion` (instant jump in that case).

#### Scenario: Clicking a section link scrolls to it
- **WHEN** the user clicks a link to `#experience`
- **THEN** the page scrolls to the experience section
- **AND** the URL hash updates to `#experience`

#### Scenario: Hash navigation from external URL
- **WHEN** a visitor navigates to `/#contact` directly
- **THEN** the page loads with Hero visible at the top
- **AND** the browser scrolls to the Contact section after first paint

#### Scenario: Reduced motion respects preference
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** scrolling to an anchor jumps instantly without animation
