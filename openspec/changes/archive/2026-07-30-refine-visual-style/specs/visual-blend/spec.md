## ADDED Requirements

### Requirement: Warm accent color palette
The system SHALL use a warm copper/amber accent color (`#f0b429`) as the primary accent, replacing the existing blue accent for interactive elements, highlights, and branding.

The dark background SHALL have slightly warmer undertones. Status colors (green `#3fb950`, red `#f85149`, yellow `#d29922`) SHALL remain unchanged.

#### Scenario: Accent applied to prompt
- **WHEN** the terminal prompt renders
- **THEN** the user and host segments use the warm copper accent color
- **AND** the prompt dollar sign uses the warm copper accent

#### Scenario: Accent applied to active workspace tag
- **WHEN** a workspace tag is active
- **THEN** the tag border and number use the warm copper accent

### Requirement: Blended typography system
The system SHALL use Inter (sans-serif, variable) for UI chrome elements and JetBrains Mono (variable) for terminal content.

UI chrome elements SHALL include: workspace tags, boot sequence frame labels, helper chips, noscript fallback. Terminal content SHALL include: prompt text, command input, command output.

#### Scenario: Workspace tags use sans-serif
- **WHEN** the workspace bar renders
- **THEN** tag text uses Inter Variable font
- **AND** the prompt and command output use JetBrains Mono Variable

#### Scenario: Boot sequence uses terminal font
- **WHEN** the boot sequence plays
- **THEN** boot frame text uses JetBrains Mono Variable to preserve the terminal feel

### Requirement: Glass morphism output cards
The system SHALL render rich command output (neofetch, experience, skills, contact) in frosted glass cards with subtle borders, background blur, and rounded corners, instead of plain monospace text blocks.

Plain text output (ls, pwd, echo, simple commands) SHALL remain as inline monospace text.

#### Scenario: Neofetch output renders in glass card
- **WHEN** the user types `neofetch` or `cat about.md`
- **THEN** the output renders in a frosted glass card with subtle border
- **AND** the card has a backdrop blur effect

#### Scenario: ls output stays plain text
- **WHEN** the user types `ls`
- **THEN** the output renders as plain monospace text without card container

### Requirement: Contained layout with breathing room
The system SHALL render the terminal shell within a centered container (max-width: 960px) on viewports ≥ 768px, with padding around the shell.

On viewports < 768px, the shell SHALL fill the full width with reduced padding.

#### Scenario: Desktop layout is contained
- **WHEN** viewport width is ≥ 768px
- **THEN** the terminal shell is centered in a 960px max-width container
- **AND** there is visible padding between the shell and the viewport edges

#### Scenario: Mobile layout is full-width
- **WHEN** viewport width is < 768px
- **THEN** the terminal shell fills the full viewport width
- **AND** padding is reduced to maintain content space

### Requirement: Polished workspace tag bar
The workspace tag bar SHALL render as pill-shaped tabs with Inter font, small colored dot indicators, and smooth active state transitions.

Tags SHALL use a subtle background on hover and a warm accent border on active state. The transition between states SHALL be animated (150ms ease).

#### Scenario: Active tag has accent border
- **WHEN** workspace 1 (home) is active
- **THEN** the tag shows a warm copper accent border
- **AND** the tag number dot uses the accent color

#### Scenario: Tag hover shows visual feedback
- **WHEN** the user hovers over an inactive workspace tag
- **THEN** the tag background lightens slightly
- **AND** the transition is smooth over 150ms

### Requirement: Smooth micro-interactions
The system SHALL provide smooth CSS transitions for all interactive state changes: workspace tag activation, helper chip hover, command output appearance.

Command output SHALL fade in over 200ms. The cursor blink SHALL be the only repeating animation.

#### Scenario: Command output fades in
- **WHEN** a command produces output
- **THEN** each output line fades in over 200ms

#### Scenario: Reduced motion disables transitions
- **WHEN** `prefers-reduced-motion: reduce` is active
- **THEN** all transitions and animations are disabled
