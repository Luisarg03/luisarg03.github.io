## MODIFIED Requirements

### Requirement: Grouped skill tag list
The grouped structure of the skill list SHALL be preserved within the process-list presentation: each category row SHALL reveal its skill list as indented monospace lines when expanded.

Rows SHALL be collapsed by default on ALL viewports (desktop included); expanding a row reveals its skill list. The expand/collapse toggle logic SHALL live in the component's `<script>` block, not as an inline event handler attribute, and the expanded state SHALL be indicated by a chevron rotation.

Skill data in `cv.ts` SHALL be generalized: categories SHALL list broad technologies (e.g., "AWS") rather than exhaustive service inventories, keeping at most a handful of entries per category.

#### Scenario: Groups render under each category
- **WHEN** the skills module is loaded
- **THEN** each category row is followed by its skill list when expanded
- **AND** skills render in the monospace font

#### Scenario: Mobile groups are collapsible
- **WHEN** viewport width is < 640px
- **THEN** each category group is collapsed by default
- **AND** tapping the header expands the group's skill list

#### Scenario: Desktop groups are collapsed by default
- **WHEN** viewport width is ≥ 640px
- **THEN** each category row renders collapsed with its proficiency bar
- **AND** clicking the row expands its skill list

#### Scenario: Categories are generalized
- **WHEN** the `skillCategories` from `cv.ts` render
- **THEN** no category lists an exhaustive per-service inventory (e.g., "AWS" rather than every AWS service name)
