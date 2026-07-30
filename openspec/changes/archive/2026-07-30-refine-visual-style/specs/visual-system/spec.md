## MODIFIED Requirements

### Requirement: Terminal buffer
The system SHALL provide a terminal buffer that renders command history with glass card containers for rich content and plain text for simple commands.

The buffer SHALL support:
- Glass card rendering for rich output types
- Plain text rendering for simple output types
- Smooth 200ms fade-in for all new output
- Auto-scroll to latest output

#### Scenario: Buffer renders glass cards for rich content
- **WHEN** a command produces rich output (neofetch, cat experience/*.md)
- **THEN** the output is wrapped in a frosted glass card container
- **AND** the card has backdrop blur and a subtle border

#### Scenario: Buffer renders plain text for simple commands
- **WHEN** a command produces plain text output (ls, pwd, echo)
- **THEN** the output renders as inline monospace text without card container

### Requirement: Reduced motion respect
The system SHALL respect `prefers-reduced-motion: reduce` for all terminal animations (cursor blink, command output fade-in, boot sequence, workspace tag transitions).

#### Scenario: Reduced motion disables all animations
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** all CSS transitions and animations are disabled
- **AND** content appears immediately without fade-in
