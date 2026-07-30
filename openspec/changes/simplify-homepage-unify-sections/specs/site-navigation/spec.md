## MODIFIED Requirements

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

## ADDED Requirements

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
