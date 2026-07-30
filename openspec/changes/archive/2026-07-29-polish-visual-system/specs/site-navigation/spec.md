# Site Navigation — Delta Spec

## ADDED Requirements

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

## MODIFIED Requirements

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
