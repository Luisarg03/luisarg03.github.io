## MODIFIED Requirements

### Requirement: Mono-first section labels
Section header labels SHALL use the monospace font stack with the accent color on a leading character.

The leading prefix character SHALL use the identity accent token for brand/wayfinding uses (`--color-accent-identity`). The rest of the label SHALL use the muted text color.

#### Scenario: Section label uses identity accent
- **WHEN** a `SectionPanel` title is rendered
- **THEN** the leading prefix character uses `--color-accent-identity`
- **AND** the rest of the label uses the muted text color
