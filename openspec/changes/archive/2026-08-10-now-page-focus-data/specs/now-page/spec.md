## ADDED Requirements

### Requirement: Focus items defined in content frontmatter
The `now` content collection SHALL support a `focus` array in frontmatter. Each item SHALL have a `label` (string) and a `status` (one of in-progress, planned, paused, completed). `progress` (integer 0-100) and `note` (string) SHALL be optional.

#### Scenario: Focus item with progress
- **WHEN** now.mdx defines a focus item with progress 40
- **THEN** the /now card for that item renders a progress bar at 40%

#### Scenario: Focus item without progress
- **WHEN** a focus item omits progress
- **THEN** its card renders without a progress bar

### Requirement: Cards render from frontmatter only
The status cards on /now SHALL render exclusively from the focus frontmatter. No status or progress value SHALL be hardcoded in page markup.

#### Scenario: Single source of truth
- **WHEN** now.mdx changes a focus item's progress from 40 to 50
- **THEN** the rendered card updates to 50% without any page-code change

#### Scenario: Empty focus array renders no cards
- **WHEN** the focus array is empty
- **THEN** /now renders no status cards

### Requirement: Travel log renders only with entries
The /now page SHALL render the travel log section only when the travel collection contains at least one entry. With zero entries, no travel section SHALL appear.

#### Scenario: Empty travel collection
- **WHEN** the travel collection contains no entries
- **THEN** /now renders no travel section

#### Scenario: Travel entries exist
- **WHEN** the travel collection contains entries
- **THEN** the travel log renders as journalctl-style rows with expandable photos (per the travel-log capability)
