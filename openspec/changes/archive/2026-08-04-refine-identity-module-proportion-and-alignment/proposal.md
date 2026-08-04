## Why

The homepage identity module renders the user's name as a large display H1
("Luis Meyehen Paz" at `--text-display-sm`, up to 3.5rem), while sibling
identity data — Role, Experience, Current, Location — renders as small
monospace `key: value` rows below it. The disproportion makes the name
feel detached from the rest of the data and creates a visual hierarchy
inversion (the data reads louder than the name). Additionally, the
`$ cat /etc/motd` prompt and summary paragraph that follow the Arch-art /
name / details hero grid sit at the left edge of the 52rem content
container, but on desktop the eye tracks the right column (info column
with name + details), so the summary reads as drifting to the left and
breaks the page's visual rhythm.

## What Changes

- **IdentityModule.astro**: render the user's name as the first
  `Name: value` row in the same monospace detail style as Role /
  Experience / Current / Location, instead of as a large display H1
  above the detail list.
- **IdentityModule.astro**: move the `$ cat /etc/motd` prompt and the
  summary paragraph into the same column as the name + details on
  desktop (right of the Arch art), so the summary aligns with the rest
  of the identity data. On mobile (where the hero stacks), the prompt
  and summary remain full-width below the details.
- **IdentityModule.astro**: preserve semantic H1 visibility — the name
  detail row IS the H1, satisfying the `h1-semantics` spec
  (no `display: none`, single H1, visible text "Luis Meyehen Paz").

## Capabilities

### Modified Capabilities
- `homepage-sections`: add requirements for the whoami module's
  internal layout (name as detail row; MOTD alignment with the info
  column on desktop).
- `h1-semantics`: update the visual appearance scenario to reflect the
  new treatment (H1 renders as a regular detail row, not as a
  display-scale heading), without weakening the core requirement that
  the H1 is visible, single, and includes "Luis Meyehen Paz".

## Impact

- `src/components/modules/IdentityModule.astro` — structural + style
  changes only. No new files, no new dependencies.
- 2 spec files modified (delta specs in this change's `specs/`
  directory; archive merges into `openspec/specs/`).
