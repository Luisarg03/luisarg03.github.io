## Purpose

The interactive command-line shell that powers the entire page. Command parsing, history, autocomplete, output rendering, and the virtual filesystem.

## ADDED Requirements

### Requirement: Command parser
The system SHALL provide a command parser that tokenizes user input and dispatches to registered commands.

The parser SHALL handle:
- Whitespace-separated tokens
- Quoted arguments (`"hello world"`, `'foo bar'`)
- Environment variable references (`$HOME`, `$USER`)
- Unknown commands return a "command not found" output

#### Scenario: User runs a known command
- **WHEN** the user types `whoami` and presses Enter
- **THEN** the terminal buffer shows the `whoami` output
- **AND** a new prompt line is rendered below

#### Scenario: User runs an unknown command
- **WHEN** the user types `foobar` and presses Enter
- **THEN** the terminal shows a "command not found: foobar" message
- **AND** a new prompt line is rendered below

#### Scenario: User passes quoted arguments
- **WHEN** the user types `echo "hello world"`
- **THEN** the command receives a single argument `hello world`
- **AND** the output shows `hello world`

### Requirement: Virtual filesystem
The system SHALL provide a static virtual filesystem rooted at `/home/luis/` with subdirectories for each content area.

The filesystem SHALL include at minimum:
- `~/` (home)
- `~/about.md`
- `~/experience/` (one file per job)
- `~/skills/` (skill tree)
- `~/now/` (current focus content)
- `~/contact.md`

#### Scenario: User lists home directory
- **WHEN** the user types `ls ~` and the cwd is `/home/luis`
- **THEN** the output shows about.md, experience/, skills/, now/, contact.md

#### Scenario: User cats a file
- **WHEN** the user types `cat about.md`
- **THEN** the output shows the rendered neofetch identity card content

#### Scenario: User navigates directories
- **WHEN** the user types `cd experience/`
- **THEN** the prompt's path updates to `/home/luis/experience`
- **AND** subsequent `ls` lists the experience contents

### Requirement: Command history
The system SHALL persist the user's command history in `localStorage` (last 50 commands).

#### Scenario: User recalls last command
- **WHEN** the user presses the Up arrow key with the prompt focused
- **THEN** the last command is inserted into the prompt
- **AND** repeated Up presses cycle backward through history

#### Scenario: History persists across reloads
- **WHEN** the user reloads the page
- **THEN** previously entered commands are still in the history
- **AND** Up arrow recalls them

### Requirement: Tab autocomplete
The system SHALL provide tab completion for commands and filesystem paths.

#### Scenario: User completes a command
- **WHEN** the user types `wh` and presses Tab
- **THEN** the input is completed to `whoami` (if unique match)

#### Scenario: User completes a path
- **WHEN** the user types `cat exp` and presses Tab
- **THEN** the input is completed to `cat experience/` (matching the directory)

### Requirement: Output rendering
The system SHALL render command output as HTML-safe nodes in a scrolling terminal buffer.

#### Scenario: Plain text output
- **WHEN** a command returns plain text
- **THEN** the output is rendered in a `<pre>` block with monospace font

#### Scenario: HTML node output
- **WHEN** a command returns an HTML node (e.g., a styled card)
- **THEN** the node is rendered in the buffer
- **AND** no user input is interpreted as HTML (all input is escaped)

#### Scenario: User clears the screen
- **WHEN** the user types `clear`
- **THEN** the terminal buffer is emptied
- **AND** a new prompt line is rendered

### Requirement: Help command
The system SHALL provide a `help` command that lists all available commands with brief descriptions.

#### Scenario: User runs help
- **WHEN** the user types `help`
- **THEN** the output shows a formatted list of all commands
- **AND** each command has a one-line description

### Requirement: Easter egg commands
The system SHALL support hidden easter-egg commands that reward curious users.

At least 5 easter eggs SHALL be implemented, including `sudo`, `vim`, `cowsay`, `sl`, and `arch`.

#### Scenario: User runs sudo
- **WHEN** the user types `sudo anything`
- **THEN** the shell prompts for a password
- **AND** any password entry fails with a "Sorry, try again" message

#### Scenario: User runs vim
- **WHEN** the user types `vim`
- **THEN** a fake vim screen appears with ":q to exit" hint
- **AND** typing `:q` exits back to the prompt

### Requirement: Mobile virtual keyboard helper
On viewports narrower than 768px, the system SHALL show a tappable command helper bar with 5-6 common commands.

#### Scenario: Touch user taps a command chip
- **WHEN** a user on a touch device taps the `help` chip
- **THEN** the `help` command is inserted into the prompt
- **AND** the prompt is focused for editing or submission

#### Scenario: Helper bar is hidden on desktop
- **WHEN** viewport width is >= 768px
- **THEN** the helper bar is not rendered
