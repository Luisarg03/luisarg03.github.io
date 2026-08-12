# Typography Legibility

## Purpose

Move prose out of small mono into the sans face at legible sizes with comfortable line-heights, while preserving the htop/boot/terminal chrome as mono. Color palette is unchanged (all pairs already pass WCAG AA).

## ADDED Requirements

### Requirement: prose blocks use sans at ≥14px

Prose blocks (experience responsibilities, project card descriptions, and equivalent body copy) SHALL be set in the sans face (--font-sans) at text-sm (14px) or larger.

#### Scenario: experience responsibilities render sans at text-sm

- **WHEN** an experience card is rendered
- **THEN** the responsibilities prose uses the sans face at 14px

#### Scenario: project card description renders sans at 14px

- **WHEN** a project card is rendered
- **THEN** its description uses the sans face at text-sm

### Requirement: --text-xs token is 13px

The `--text-xs` design token SHALL be `0.8125rem` (13px), applied globally to all rules consuming the token.

#### Scenario: token resolves to 13px

- **WHEN** an element consumes the --text-xs token
- **THEN** its computed font-size is 13px

#### Scenario: htop grid absorbs the change at 390px

- **WHEN** the page is rendered at 390px viewport width
- **THEN** the htop window grid shows no horizontal overflow and no column wrap breakage

### Requirement: prose line-heights ≥1.7

Prose blocks SHALL use line-height of at least 1.7; project card descriptions SHALL declare a line-height of at least 1.6.

#### Scenario: experience prose line-height 1.7

- **WHEN** an experience card is rendered
- **THEN** responsibilities and impact lines use line-height 1.7

#### Scenario: project description line-height 1.6

- **WHEN** a project card is rendered
- **THEN** its description declares line-height 1.6 or greater

### Requirement: now-page note legible size

The note on the now page SHALL use the --text-xs token (13px) with line-height 1.6, replacing the hard-coded 10px size.

#### Scenario: now note renders at 13px

- **WHEN** the now page is rendered
- **THEN** the note element computes to 13px font-size and 1.6 line-height

### Requirement: htop chrome remains mono

htop window chrome (title bar, column headers, rows 000-008, status bar, sub-rows, evidence), the H1 identity row, boot prelude/frames, shell/terminal, CommandPalette, and section labels SHALL remain in their existing mono/display faces and sizes.

#### Scenario: chrome unchanged

- **WHEN** any htop, boot, terminal, or section-label element is rendered
- **THEN** its font-family and font-size are unchanged from before this change
