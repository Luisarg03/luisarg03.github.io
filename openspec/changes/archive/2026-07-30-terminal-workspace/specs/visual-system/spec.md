## MODIFIED Requirements

### Requirement: Bento grid layout primitive
The bento grid primitive SHALL be retained for any non-terminal content blocks that may need grid layout, but the primary page layout is no longer a bento grid — it is a single full-viewport terminal interface.

The bento grid SHALL be used only for the mobile command helper bar and any embedded output blocks that benefit from grid layout.

#### Scenario: Bento grid is not used for page layout
- **WHEN** the page loads
- **THEN** the main content is a full-viewport terminal
- **AND** no top-level bento grid is rendered

#### Scenario: Mobile helper bar uses bento
- **WHEN** a touch device views the page
- **THEN** the command helper bar uses a bento-style grid

### Requirement: Panel border convention
The panel chrome (corner accents, surface tone, accent-top variant) SHALL be retained for content blocks embedded in terminal output, but no top-level page sections use it.

Panels SHALL support four variants in terminal output:
- Default: surface tone, full border
- Accent-top: gradient line on top edge
- Featured: stronger border
- Terminal-tab: top bar with path label and status dots

#### Scenario: Panel renders in terminal output
- **WHEN** a command produces multi-line output
- **THEN** the output may be wrapped in a panel with terminal-tab chrome
- **AND** the chrome shows a path label and three status dots

#### Scenario: Panel does not accept bento prop
- **WHEN** a developer inspects `SectionPanel.astro` props
- **THEN** the `bento` prop is not present in the `Props` interface

## REMOVED Requirements

### Requirement: Scroll-driven animation utilities
**Reason**: Scroll-driven reveal animations are not used in the terminal interface. The terminal is a full-viewport interactive experience, not a scrollable document.

**Migration**: If a future page needs scroll reveals (e.g., a long-form blog post), reintroduce these utilities in that page's scope.

### Requirement: Widget card primitive
**Reason**: Widget cards were used in the now-removed static hero bento. The terminal interface does not use floating widget cards; the equivalent "status cards" are rendered as command output.

**Migration**: If a future section needs widget cards, reintroduce in that section's scope. The CSS classes (`.widget-float`, `.glow-hover`) can be reused for any embedded output card.

## ADDED Requirements

### Requirement: Terminal buffer
The system SHALL provide a terminal buffer component that renders command history as a vertical scrollable list.

The buffer SHALL support:
- Multiple output types (text, pre-formatted, HTML nodes)
- Auto-scroll to the latest output on new content
- Manual scroll up to review history

#### Scenario: Buffer auto-scrolls
- **WHEN** a new command produces output
- **THEN** the buffer scrolls to show the new output at the bottom

#### Scenario: Buffer preserves history
- **WHEN** the user scrolls up in the buffer
- **THEN** the previous command outputs are visible
- **AND** scrolling back down returns to the latest output

### Requirement: Workspace viewport
The system SHALL provide a workspace viewport that hosts the active terminal buffer and adjusts its content based on the active workspace.

#### Scenario: Workspace switch changes content
- **WHEN** the user switches workspaces
- **THEN** the viewport clears or scrolls to the new content
- **AND** the active workspace indicator updates

### Requirement: Reduced motion respect
The system SHALL respect `prefers-reduced-motion: reduce` for all terminal animations (cursor blink, command output fade-in, boot sequence).

#### Scenario: Reduced motion disables blink
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** the cursor blink is disabled
- **AND** command output appears without fade-in animation
