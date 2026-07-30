## Purpose

Establishes the visual direction of the site as a Linux terminal / Arch + Hyprland inspired design system. Covers prompt-style identity elements, terminal chrome, monospace-first typography, and the conceptual framing of the whole site as a shell session.

## ADDED Requirements

### Requirement: Section terminal tab chrome
Top-level section panels SHALL render a terminal-tab style top bar that includes a path-style label (e.g., `~/experience`) and three small status dots.

#### Scenario: Section tab bar renders
- **WHEN** a `SectionPanel` is rendered with a `title` prop
- **THEN** the top of the panel shows a path-style label
- **AND** three small status dots are visible on the same row
- **AND** the label and dots align with the panel padding

#### Scenario: Tab bar is mono and muted
- **WHEN** the tab bar is rendered
- **THEN** the label uses the monospace font stack
- **AND** the dots use the muted surface tone (not bright traffic-light colors)

### Requirement: Section header prompt syntax
Section headers SHALL be rendered using a terminal prompt-like prefix.

The prompt SHALL be: `[luis@arch ~]$ <command>` where `<command>` is derived from the section title (e.g., `cat /var/log/experience` for the Experience section).

#### Scenario: Prompt prefix appears on sections
- **WHEN** a section renders with the terminal-theme header style
- **THEN** the prompt prefix `[luis@arch ~]$` is visible before the section command
- **AND** the prefix uses the accent color
- **AND** the command text uses muted text color

#### Scenario: Prompt stays semantic
- **WHEN** the prompt is used on multiple sections
- **THEN** the command string is meaningful and section-specific (not decorative `>>` or `>`)
- **AND** no section uses a generic command like `$ info`

### Requirement: Hero neofetch-style identity
The Hero block SHALL render as a neofetch-inspired identity card showing user identity, role, location, experience, and current employer.

The card SHALL be structured as:
- Left column: small ASCII art (Arch-style or custom meaningful mark)
- Right column: `user@arch` prompt line, then key:value pairs for OS, Host, Kernel, Uptime

#### Scenario: Hero renders neofetch card
- **WHEN** the home page loads
- **THEN** the hero section shows a neofetch-style card
- **AND** the left column has visible ASCII art
- **AND** the right column shows prompt + at least 4 key:value pairs

#### Scenario: Neofetch adapts to viewport
- **WHEN** viewport width is < 640px
- **THEN** the neofetch card stacks vertically (art on top, key:value below)
- **AND** alignment is preserved

### Requirement: Blueprint background stays subtle
The decorative blueprint background grid SHALL remain visible but MUST NOT visually compete with the new terminal chrome.

#### Scenario: Blueprint opacity is reduced
- **WHEN** the page renders with terminal chrome active
- **THEN** the blueprint grid opacity is at most 60% of its pre-change value
- **AND** the grid lines do not overlap with the tab bar visually
