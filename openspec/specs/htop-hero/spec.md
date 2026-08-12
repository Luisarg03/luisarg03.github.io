# htop-hero Specification

## Purpose
TBD - created by archiving change htop-hero. Update Purpose after archive.
## Requirements
### Requirement: htop window maps real data

The hero window SHALL render rows positionally from the identity and the 8 skill categories in cv.ts, with CPU% computed from real proficiency (`Math.round((proficiency / 5) * 100)`), MEM% derived deterministically from CPU with a fixed per-category jitter, and uptime computed from the same real experience data used by ExperienceModule.

#### Scenario: identity is root process

- **WHEN** the hero window renders
- **THEN** row 000 is the identity (name, role, company) highlighted in teal, rendered as a single H1 element in the DOM

#### Scenario: skill rows use cv.ts data

- **WHEN** the hero window renders rows 001-008
- **THEN** each row displays the corresponding skillCategory from cv.ts with CPU% derived from its real proficiency value

#### Scenario: deterministic memory values

- **WHEN** the hero window renders the MEM% column
- **THEN** values are computed deterministically from CPU with the fixed jitter array, with no randomness at render time

### Requirement: handoff is a single orchestrated animation

The transition from boot to hero SHALL extend the existing orchestrated boot sequence: the boot overlay fades out, the window materializes with bars at 0%, and bars fill to target in a cascading sequence driven by one timing function.

#### Scenario: last boot frame announces htop

- **WHEN** the boot sequence reaches its final frame
- **THEN** the frame text is `[ OK ] htop --sort=cpu`

#### Scenario: reduced motion renders final state instantly

- **WHEN** the user prefers reduced motion, or JavaScript is unavailable
- **THEN** the overlay hides instantly and bars render at their target width with no transitions

#### Scenario: skip accelerates boot only

- **WHEN** the user clicks, presses a key, or scrolls to skip the boot
- **THEN** the boot accelerates but the bar fill sequence still plays

### Requirement: mobile renders condensed without horizontal scroll

Below the desktop breakpoint the window SHALL drop the USER and MEM% columns, stack the MEM bar under each row, and keep the identity row first and visible, with no horizontal scrolling.

#### Scenario: condensed columns

- **WHEN** the viewport is narrower than the desktop breakpoint
- **THEN** each row shows PID and COMMAND on one line with the CPU bar, and the MEM bar stacked underneath

#### Scenario: identity stays visible

- **WHEN** the viewport is narrow
- **THEN** the identity row remains the first visible row and is not hidden or compressed away

### Requirement: palette anchors re-point to the hero window

The command palette SHALL scroll `cd /identity` and `cd /skills` to the htop window anchor, since the #identity and #skills sections are removed from the DOM.

#### Scenario: identity and skills routes scroll to htop

- **WHEN** the user runs `cd /identity` or `cd /skills` in the command palette
- **THEN** the page scrolls to the htop window anchor

#### Scenario: experience route unchanged

- **WHEN** the user runs `cd /experience`
- **THEN** the page scrolls to the unchanged experience section

