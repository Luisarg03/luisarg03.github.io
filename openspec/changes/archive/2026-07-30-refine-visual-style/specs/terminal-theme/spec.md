## MODIFIED Requirements

### Requirement: Terminal prompt styling
The terminal prompt SHALL be rendered in monospace with a distinct color hierarchy using the warm copper accent.

The prompt SHALL consist of: `user@host:path$ ` where:
- `user` and `host` use the warm copper accent color (`#f0b429`)
- `path` uses the standard text color
- `$` separator uses the warm copper accent color
- A blinking block cursor (`█` or `▌`) follows the prompt

#### Scenario: Prompt renders correctly
- **WHEN** the terminal prompt is visible
- **THEN** the user, host, and dollar sign use the warm copper accent
- **AND** the path uses the standard text color

### Requirement: Command output styling
Command output SHALL be rendered with consistent monospace formatting and color treatment per output type. Rich output (identity cards, experience, skills) SHALL render in frosted glass cards.

Output types include:
- Plain text: muted text color
- Rich content (neofetch, experience, skills, contact): frosted glass card with subtle border
- Success (`[ OK ]`): green
- Warning (`[WARN]`): yellow
- Error: red
- Info: standard text color

#### Scenario: Rich output renders in glass card
- **WHEN** a command returns rich content (neofetch, experience details)
- **THEN** the output renders in a frosted glass card with backdrop blur
- **AND** plain text commands (ls, pwd, echo) remain inline

### Requirement: Workspace tag bar styling
The workspace tag bar SHALL use Inter font with pill-shaped tabs, warm accent for active state, and smooth 150ms transitions between states.

#### Scenario: Active tag is highlighted
- **WHEN** a workspace is active
- **THEN** the tag shows a warm copper accent border
- **AND** the tag number uses the accent color
- **AND** the transition from inactive to active is smooth (150ms)
