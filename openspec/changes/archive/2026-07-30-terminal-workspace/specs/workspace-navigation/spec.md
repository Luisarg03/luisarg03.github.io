## Purpose

The Hyprland-inspired workspace/tag system for switching between content contexts (home, now, lab, contact).

## ADDED Requirements

### Requirement: Workspace tag bar
The system SHALL render a horizontal tag bar at the top of the page with 4 workspace tags: `1:home`, `2:now`, `3:lab`, `4:contact`.

Each tag SHALL be tappable and SHALL show a distinct active state.

#### Scenario: Tag bar renders
- **WHEN** the page loads
- **THEN** the workspace tag bar is visible at the top
- **AND** all 4 tags are visible and tappable

#### Scenario: Active tag is highlighted
- **WHEN** the current workspace is `home`
- **THEN** the `1:home` tag is visually highlighted
- **AND** the other tags are muted

### Requirement: Workspace switching
The system SHALL switch the active workspace when:
- A tag is clicked/tapped
- `Alt+1` through `Alt+4` is pressed
- A command in the terminal triggers a workspace switch (e.g., `goto now`)

#### Scenario: User clicks a tag
- **WHEN** the user clicks the `2:now` tag
- **THEN** the active workspace changes to `now`
- **AND** the tag bar updates to highlight `2:now`

#### Scenario: User presses Alt+2
- **WHEN** the user presses the `Alt+2` key combination
- **THEN** the active workspace changes to `now`
- **AND** focus returns to the terminal prompt

#### Scenario: Switched workspace shows its content
- **WHEN** the user switches to workspace `now`
- **THEN** the terminal auto-runs a setup command for that workspace (e.g., `cd ~/now && cat now.md`)

### Requirement: Workspace state
The system SHALL maintain a session-only active workspace state. Reloading the page returns to workspace 1 (home).

#### Scenario: Workspace state resets on reload
- **WHEN** the user is on workspace 3 and reloads
- **THEN** the active workspace on the new load is 1 (home)
- **AND** localStorage is not used for workspace state

### Requirement: Workspace keyboard accessibility
Each workspace tag SHALL be a real button element with proper ARIA attributes for screen reader users.

#### Scenario: Tag is a button
- **WHEN** a screen reader inspects the tag bar
- **THEN** each tag announces as "Switch to workspace <name>"
- **AND** the active tag announces as "Current workspace <name>"

### Requirement: Mobile workspace tags
On viewports narrower than 768px, workspace tags SHALL remain tappable and SHALL NOT shrink below 44px touch targets.

#### Scenario: Touch target size
- **WHEN** a user on a touch device views the tag bar
- **THEN** each tag has a tap area of at least 44x44 CSS pixels
