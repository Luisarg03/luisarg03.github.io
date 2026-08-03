## MODIFIED Requirements

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

### Requirement: Grouped skill tag list
The grouped structure of the skill list SHALL be preserved within the process-list presentation: each category row SHALL reveal its skill list as indented monospace lines when expanded.

The expand/collapse toggle logic SHALL live in the component's `<script>` block, not as an inline event handler attribute.

#### Scenario: Groups render under each category
- **WHEN** the skills module is loaded
- **THEN** each category row is followed by its skill list when expanded
- **AND** skills render in the monospace font

#### Scenario: Mobile groups are collapsible
- **WHEN** viewport width is < 640px
- **THEN** each category group is collapsed by default
- **AND** tapping the header expands the group's skill list
