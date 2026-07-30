## Purpose

The multi-frame boot animation that plays on first load before the terminal prompt appears, signaling "you've SSH-ed into a real machine."

## ADDED Requirements

### Requirement: Boot sequence plays on first load
The system SHALL play a BIOS/POST-style boot sequence on first page load, before the terminal prompt becomes interactive.

The sequence SHALL consist of ~8 frames of terminal text simulating system boot, including:
- A vendor/banner line
- Kernel and memory detection lines
- Service start lines with `[ OK ]` / `[FAILED]` markers
- A final "Reached target Multi-User System" line

#### Scenario: Boot sequence plays once
- **WHEN** the user loads the page for the first time
- **THEN** the boot sequence plays over ~2 seconds
- **AND** the terminal prompt appears after the sequence completes

#### Scenario: Boot sequence is skippable
- **WHEN** the user presses any key or clicks during the boot sequence
- **THEN** the boot sequence ends immediately
- **AND** the terminal prompt becomes interactive

### Requirement: Boot timing
The boot sequence SHALL complete within 2-3 seconds total.

Each frame SHALL hold for ~250ms before the next one appears.

#### Scenario: Boot completes within timing budget
- **WHEN** the user does not interact
- **THEN** the entire boot sequence completes within 3000ms
- **AND** the prompt is ready to receive input at the end

### Requirement: Boot content references Arch
The boot sequence SHALL include Arch-specific details (kernel version, hostname) that match the user's actual daily driver.

#### Scenario: Boot content includes hostname
- **WHEN** the boot sequence runs
- **THEN** at least one frame references the hostname `arch` or the kernel
- **AND** the content matches the established identity

### Requirement: Reduced motion boot
The system SHALL respect `prefers-reduced-motion: reduce` for the boot sequence.

#### Scenario: Reduced motion skips boot
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** the boot sequence is skipped
- **AND** the terminal prompt appears immediately

### Requirement: Boot does not block commands
The boot sequence SHALL NOT prevent commands from being entered once the prompt is interactive.

#### Scenario: User types during boot
- **WHEN** the boot sequence is still playing and the user types a character
- **THEN** the boot sequence skips
- **AND** the character appears in the prompt
