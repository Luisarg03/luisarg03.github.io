## ADDED Requirements

### Requirement: Dark theme with CSS custom properties

The site SHALL use a dark color palette defined via CSS custom properties, with colors for background, surface, text, accent, muted text, and border.

#### Scenario: Dark theme applied globally
- **WHEN** the site loads
- **THEN** all pages render with a dark background (`--color-bg`), light text (`--color-text`), and accent highlights (`--color-accent`)

#### Scenario: CSS variables are theme-ready
- **WHEN** a future theme is added
- **THEN** only the CSS custom property values need to change, not component styles

### Requirement: Blueprint grid background

The site SHALL render a procedural blueprint-style grid background using an HTML canvas element, loaded as an Astro island component.

#### Scenario: Grid renders on page load
- **WHEN** the page loads and JavaScript is enabled
- **THEN** a dark canvas with thin grid lines and subtle animated pulses appears behind page content

#### Scenario: Grid honours reduced motion preference
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** the grid renders statically without animation

#### Scenario: Grid adapts to viewport
- **WHEN** the browser window is resized
- **THEN** the canvas dimensions and grid density adjust to the new viewport size

### Requirement: Stat card component

The site SHALL provide a reusable stat card component displaying a label, value, and optional icon or indicator.

#### Scenario: Stat card renders label and value
- **WHEN** a stat card receives props `label="Experience"` and `value="7+ years"`
- **THEN** it renders "7+ years" prominently with "Experience" as a smaller label

#### Scenario: Stat card with status indicator
- **WHEN** a stat card receives `status="online"`
- **THEN** it displays a green dot or similar indicator alongside the value

### Requirement: Status indicator component

The site SHALL provide a status indicator component that displays a colored dot with a text label for system-style statuses.

#### Scenario: Active status renders green
- **WHEN** status indicator receives `status="active"`
- **THEN** it renders a green dot with the label text

#### Scenario: In-progress status renders amber
- **WHEN** status indicator receives `status="in-progress"`
- **THEN** it renders an amber/orange dot with the label text

### Requirement: Section panel wrapper

The site SHALL provide a layout wrapper component for content sections, featuring a subtle border, consistent padding, and optional header with monospace label.

#### Scenario: Section renders with header
- **WHEN** a section receives `title="Experience"` and child content
- **THEN** it renders a monospace "Experience" header above the content, wrapped in a bordered container
