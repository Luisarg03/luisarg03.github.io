## MODIFIED Requirements

### Requirement: Section terminal tab chrome
Top-level section panels SHALL render a terminal-tab style top bar that includes a path-style label (e.g., `~/experience`) and three small status dots.

The terminal tab chrome remains the visual frame for non-interactive content blocks embedded in the terminal output, but the primary interface is now the full terminal shell (defined in the `terminal-shell` capability). Sections are no longer top-level page elements — they are command output.

#### Scenario: Tab bar renders
- **WHEN** a content block embedded in terminal output uses the panel chrome
- **THEN** the top of the block shows a path-style label
- **AND** three small status dots are visible on the same row

#### Scenario: Tab bar is mono and muted
- **WHEN** the tab bar is rendered
- **THEN** the label uses the monospace font stack
- **AND** the dots use the muted surface tone

### Requirement: Section header prompt syntax
The system SHALL render content headers using a terminal prompt-like prefix when embedded as command output.

The prompt SHALL be: `[luis@arch ~]$ <command>` where `<command>` is the command the user typed to view the content.

#### Scenario: Prompt prefix appears on command output
- **WHEN** a command produces multi-line output
- **THEN** the rendered output is preceded by the prompt line
- **AND** the command text uses the muted text color

#### Scenario: Prompt stays semantic
- **WHEN** content is rendered via different commands
- **THEN** each command has a meaningful name (not decorative)

### Requirement: Hero neofetch-style identity
The Hero block SHALL no longer exist as a static page element. The neofetch identity is now produced by the `neofetch` command in the terminal (defined in the `terminal-shell` capability).

The terminal shell SHALL render a neofetch-style identity card as command output when the user types `neofetch` or `cat about.md`.

#### Scenario: neofetch command produces identity card
- **WHEN** the user types `neofetch` and presses Enter
- **THEN** the terminal output shows a neofetch-style card
- **AND** the card includes ASCII art and key:value rows

#### Scenario: Identity values come from cv data
- **WHEN** the neofetch command runs
- **THEN** the values resolve from `cv.ts` (role, location, experience years, current company)

### Requirement: Blueprint background stays subtle
The decorative blueprint background grid SHALL remain visible but MUST NOT visually compete with the terminal interface.

#### Scenario: Blueprint opacity is reduced
- **WHEN** the page renders with the terminal active
- **THEN** the blueprint grid opacity is at most 30% of its pre-terminal value
- **AND** the grid does not overlap with the terminal buffer

## ADDED Requirements

### Requirement: Terminal prompt styling
The terminal prompt SHALL be rendered in monospace with a distinct color hierarchy.

The prompt SHALL consist of: `user@host:path$ ` where:
- `user` and `host` use the accent color
- `path` uses the standard text color
- `$` separator uses the accent color
- A blinking block cursor (`█` or `▌`) follows the prompt

#### Scenario: Prompt renders correctly
- **WHEN** the terminal prompt is visible
- **THEN** the user, host, and path are visually distinct
- **AND** a cursor block is visible after the `$ `

#### Scenario: Cursor blinks
- **WHEN** the terminal prompt is idle (no typing)
- **THEN** the cursor block blinks at ~1Hz
- **AND** the animation pauses while the user types

### Requirement: Command output styling
Command output SHALL be rendered with consistent monospace formatting and color treatment per output type.

Output types include:
- Plain text: muted text color
- Success (`[ OK ]`): green
- Warning (`[WARN]`): yellow
- Error: red
- Info: standard text color
- Interactive nodes (cards, links): standard text + accent for interactive elements

#### Scenario: Output types are color-coded
- **WHEN** a command returns a success message
- **THEN** the success marker `[ OK ]` renders in green
- **AND** error markers render in red

### Requirement: Virtual filesystem visualization
When the user runs `ls`, `tree`, or similar commands, the output SHALL visualize the virtual filesystem with directory colors and file icons.

#### Scenario: ls output shows tree structure
- **WHEN** the user types `ls` in a directory
- **THEN** the output shows files and directories with the prefix `~/` for paths
- **AND** directories end with `/` to distinguish from files

### Requirement: Workspace tag bar styling
The workspace tag bar (defined in the `workspace-navigation` capability) SHALL match the existing terminal aesthetic.

Tags SHALL be rendered in monospace with a clear active/inactive state.

#### Scenario: Active tag is highlighted
- **WHEN** a workspace is active
- **THEN** the tag shows a `[<num>:<name>]` form with the number in accent color
- **AND** inactive tags are muted
