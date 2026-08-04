## ADDED Requirements

### Requirement: Identity module renders as 3 vertical blocks

The homepage IdentityModule SHALL render as 3 distinct vertical
blocks within the `.identity-content` container, in document
order: (1) the hero block containing the ASCII art and the 5
detail rows, (2) the MOTD block containing the `$ cat /etc/motd`
prompt and the summary paragraph, (3) the contact block
containing the `$ ls /contact/` prompt and the contact tiles.
The hero block uses a 2-column grid on desktop (>= 640px) with
the ASCII art on the left and the 5 detail rows on the right;
on mobile (< 640px) the art stacks above the detail rows. The
MOTD block and the contact block each span the full width of
the `.identity-content` container.

#### Scenario: Hero block uses 2-col grid on desktop
- **WHEN** a visitor views the homepage at viewport >= 640px
- **THEN** the hero block renders as a 2-column grid
- **AND** the ASCII art occupies the left column
- **AND** the 5 detail rows occupy the right column

#### Scenario: Hero block stacks on mobile
- **WHEN** a visitor views the homepage at viewport < 640px
- **THEN** the hero block renders as a single column
- **AND** the ASCII art stacks above the detail rows
- **AND** the MOTD block and the contact block each render
  full-width below the hero

#### Scenario: MOTD block contains only MOTD prompt and summary
- **WHEN** the IdentityModule renders
- **THEN** the MOTD block contains the `$ cat /etc/motd` prompt
  and the summary paragraph
- **AND** the MOTD block does NOT contain the contact prompt
  or the contact tiles

#### Scenario: Contact block contains only contact prompt and tiles
- **WHEN** the IdentityModule renders
- **THEN** the contact block contains the `$ ls /contact/`
  prompt and the contact tiles
- **AND** the contact block does NOT contain the MOTD prompt
  or the summary

### Requirement: ASCII art height aligns with the data column

The Arch ASCII art in the IdentityModule hero SHALL be trimmed
to 8 lines so its visual height matches the data column's
visual height. The data column SHALL vertically center within
the art's column space via `align-items: center` on the hero
grid.

#### Scenario: ASCII art is 8 lines
- **WHEN** the IdentityModule renders
- **THEN** the ASCII art `<pre>` element contains exactly 8
  lines of art
- **AND** the art preserves the recognizable Arch shape

#### Scenario: Data column centers vertically against the art
- **WHEN** the hero block renders on desktop
- **THEN** the data column is vertically centered in the
  hero grid's row (via `align-items: center`)
- **AND** the data column's top and bottom whitespace are
  roughly equal

#### Scenario: Alignment works on mobile too
- **WHEN** the hero block renders on mobile (< 640px)
- **THEN** the art and data stack vertically
- **AND** the data column is at its natural height
- **AND** the art's trimmed 8 lines are visible above
