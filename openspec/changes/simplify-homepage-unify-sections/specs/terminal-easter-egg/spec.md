## ADDED Requirements

### Requirement: Terminal accessible via keyboard shortcut
The interactive terminal shell SHALL be accessible from any page via `Ctrl+Shift+T` keyboard shortcut.

The shortcut SHALL navigate the browser to `/terminal` where the full terminal emulator (`Shell.astro`) renders as a standalone page.

#### Scenario: Shortcut opens terminal page
- **WHEN** a user presses `Ctrl+Shift+T` from any page on the site
- **THEN** the browser navigates to `/terminal`
- **AND** the terminal shell loads with the boot sequence and workspace bar

#### Scenario: Shortcut does not interfere with other bindings
- **WHEN** `Ctrl+Shift+T` is pressed
- **THEN** no browser default behavior (reopen closed tab) executes
- **AND** the site's other keyboard shortcuts (`Ctrl+K`, `Alt+1..4`) continue to work

### Requirement: Terminal page hosts standalone shell
The `/terminal` page SHALL render the full `Shell.astro` component with all its sub-components: `WorkspaceBar`, `BootSequence`, terminal input, helper chips, and interactive command parser.

The page SHALL use a minimal layout — no `BaseLayout` header/footer navigation — to preserve the immersive terminal feel. A small back link or `Esc` shortcut SHALL allow returning to the homepage.

#### Scenario: Terminal page renders full shell
- **WHEN** a user navigates to `/terminal`
- **THEN** the boot sequence plays (skippable on click/keypress)
- **AND** after boot, the workspace bar and command prompt are visible
- **AND** all terminal commands (help, ls, neofetch, sudo, vim, cowsay, sl, etc.) work

#### Scenario: Terminal preserves workspace functionality
- **WHEN** a user clicks workspace tabs or presses `Alt+1..4`
- **THEN** the terminal switches workspace and runs the configured auto-run command
- **AND** the active workspace tab is visually highlighted

#### Scenario: Terminal preserves command history
- **WHEN** a user types commands in the terminal
- **THEN** command history is saved to `localStorage` and restored on subsequent visits
- **AND** Arrow Up/Down navigates through history

### Requirement: Back navigation from terminal
The `/terminal` page SHALL provide a way to return to the homepage.

A "Back to site" button or link SHALL be visible somewhere on the page. Pressing `Escape` when the input is focused and empty SHALL navigate back to `/`.

#### Scenario: Back link returns to homepage
- **WHEN** a user clicks "Back to site" or equivalent on the terminal page
- **THEN** the browser navigates to `/`

#### Scenario: Escape returns to homepage
- **WHEN** a user presses `Escape` while the terminal input is focused and empty
- **THEN** the browser navigates to `/`
- **AND** if the input has text, `Escape` clears the input first (press again to navigate)

### Requirement: Command palette includes terminal entry
The command palette (`Ctrl+K`) SHALL include an "Open Terminal" entry that navigates to `/terminal`.

#### Scenario: Command palette opens terminal
- **WHEN** a user opens the command palette and selects "Open Terminal"
- **THEN** the browser navigates to `/terminal`
- **AND** the palette closes

### Requirement: Footer shows terminal hint
The `BaseLayout` footer SHALL display a subtle hint about the terminal shortcut.

The hint SHALL read `Ctrl+Shift+T → terminal` or similar, using the monospace font and muted color, positioned in the footer status bar area.

#### Scenario: Terminal hint visible in footer
- **WHEN** any page using `BaseLayout` is loaded
- **THEN** the footer contains a visible hint about `Ctrl+Shift+T` or `/terminal`
- **AND** the hint uses muted styling that does not compete with main content
