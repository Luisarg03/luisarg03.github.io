## ADDED Requirements

### Requirement: Identity name renders as a detail row

The whoami module SHALL render the user's name as a `Name: value`
detail row in the same monospace style as the Role, Experience,
Current, and Location rows, instead of as a display-scale heading
above the detail list. The name SHALL be the first row in the
detail list, and SHALL be the page's semantic `<h1>` (visible, not
hidden, with text content including "Luis Meyehen Paz", per the
`h1-semantics` spec).

#### Scenario: Name is the first detail row
- **WHEN** the whoami module renders
- **THEN** the first row of the detail list is `Name: <full name>`
- **AND** the row uses the same font-family, font-size, key/sep/val
  structure, and teal accent on the key as the other detail rows
- **AND** the row's element is `<h1>` with visible text including
  "Luis Meyehen Paz"

#### Scenario: Name has the same visual weight as other detail rows
- **WHEN** the whoami module is rendered
- **THEN** the Name row does not appear larger or in a different
  font than the Role, Experience, Current, and Location rows

### Requirement: MOTD prompt and summary align with the info column

On desktop viewports (>= 640px), the `$ cat /etc/motd` decorative
prompt and the summary paragraph SHALL be rendered inside the same
column as the name + detail rows (to the right of the Arch ASCII
art), so the summary does not drift to the left of the info column
and visual rhythm is preserved.

On mobile viewports (< 640px), the prompt and summary SHALL be
full-width below the detail list, since the Arch art stacks above
the info column on mobile.

#### Scenario: MOTD aligns with info column on desktop
- **WHEN** the viewport is >= 640px
- **THEN** the `$ cat /etc/motd` prompt and the summary paragraph
  start at the same x-position as the name and detail rows
- **AND** no content overflows the info column's width

#### Scenario: MOTD stacks below details on mobile
- **WHEN** the viewport is < 640px
- **THEN** the `$ cat /etc/motd` prompt and the summary paragraph
  render full-width below the detail list
- **AND** the page reads top-to-bottom in order: Arch art, name +
  details, MOTD prompt, summary, contact prompt, contact row
