# Skills Visualization

## Purpose

Replaces the current flat tag-grid in `SkillMap.astro` with a richer visualization: a syntax-highlighted code structure showing category proficiency, plus a grouped tag list for detail. Designed to communicate the structure of my expertise at a glance, with the detail available for the curious.
## Requirements
### Requirement: Code-presented skill categories
The system SHALL render skill categories as an htop-style process list instead of a syntax-highlighted code structure.

The presentation SHALL:
- Render one row per category with columns: PID (index), USER (static value), CPU% and MEM% (proficiency-derived bars), and COMMAND (category name)
- Fill bars from the category proficiency (0-5) scaled to a percentage
- Add a subtle CSS shimmer to the bar fill (CSS animation only, no JavaScript)
- Display all categories from `skillCategories` in `cv.ts` with their skills
- Emphasize the hovered or focused category row with the single accent color
- Remain readable as text for screen readers (no image-based representation)
- Not require the syntax highlighter for the skills section

#### Scenario: Process list renders all categories
- **WHEN** the skills module is loaded
- **THEN** a process list shows all categories from `cv.ts`
- **AND** each row shows its category name and a proficiency bar

#### Scenario: Code block renders all categories
- **WHEN** the skills module is loaded
- **THEN** the htop process list shows all categories from `cv.ts`
- **AND** each row shows its category name and a proficiency bar

#### Scenario: Hover emphasizes the active category
- **WHEN** the user hovers or focuses a category row
- **THEN** that row gains the accent color emphasis
- **AND** the other rows remain neutral/muted

#### Scenario: Mobile categories stay collapsible
- **WHEN** viewport width is < 640px
- **THEN** categories remain collapsible (collapsed by default, expand on tap)
- **AND** expanded state is indicated by a chevron rotation

### Requirement: Skill category proficiency data
The system SHALL represent per-category proficiency as a numeric value in `cv.ts`.

Proficiency SHALL be a number from 0 to 5, additive with the existing `category` and `skills` fields. Categories without a stated proficiency SHALL default to 0.

#### Scenario: Proficiency values are present in cv.ts
- **WHEN** the data file is parsed
- **THEN** every category in `skillCategories` has a numeric `proficiency` field
- **AND** the value is between 0 and 5 inclusive

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

### Requirement: Color assignment per category
The system SHALL NOT rely on per-category accent colors as the primary visual encoding. Categories SHALL render in neutral tones with a single accent color (`--color-accent`) used for hover/focus emphasis.

The existing `categoryAccents` map MAY remain in the codebase for backward compatibility but SHALL NOT drive tag styling.

#### Scenario: Categories render neutral
- **WHEN** the Skills section renders
- **THEN** category rows and tags use neutral border/muted text tones
- **AND** no per-category color is applied to tags

#### Scenario: Accent marks the active category
- **WHEN** a category is hovered or focused
- **THEN** it renders with the accent color
- **AND** all other categories remain neutral

### Requirement: Skills section labeling
The skills section SHALL be titled "Skills" (or "Technical Skills"), accurately covering all displayed categories including languages, libraries, and web development — not only infrastructure.

#### Scenario: Section title matches content
- **WHEN** the skills section renders
- **THEN** the visible section heading is "Skills" and does not imply infrastructure-only scope

