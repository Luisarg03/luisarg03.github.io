## REMOVED Requirements

### Requirement: Radar chart of skill categories

### Requirement: Radar and list columns are top-aligned

## ADDED Requirements

### Requirement: Code-presented skill categories
The system SHALL render skill categories as a syntax-highlighted code structure (e.g., a typed interface or annotated object) instead of a radar chart.

The presentation SHALL:
- Be implemented with the existing syntax highlighter (shiki) — no new dependency
- Display all categories from `skillCategories` in `cv.ts` with their skills
- Show per-category proficiency (0-5) in a visually scannable form (e.g., inline bar or comment) without color-coding the tags
- Emphasize the hovered or focused category with the single accent color
- Remain readable as text for screen readers (no image-based representation)

#### Scenario: Code block renders all categories
- **WHEN** the Skills section is loaded
- **THEN** a syntax-highlighted block shows all categories from `cv.ts`
- **AND** each category lists its skills and proficiency

#### Scenario: Hover emphasizes the active category
- **WHEN** the user hovers or focuses a category within the code block
- **THEN** that category gains the accent color emphasis
- **AND** the other categories remain neutral/muted

#### Scenario: Mobile categories stay collapsible
- **WHEN** viewport width is < 640px
- **THEN** categories remain collapsible (collapsed by default, expand on tap)
- **AND** expanded state is indicated by a chevron rotation

## MODIFIED Requirements

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

### Requirement: Grouped skill tag list
The grouped structure of the skill list SHALL be preserved within the code presentation.

The expand/collapse toggle logic SHALL be extracted from the inline script to the component's `<script>` block.

#### Scenario: Groups render under each category
- **WHEN** the Skills section is loaded
- **THEN** each category header is followed by its skill list
- **AND** skills render in the monospace font

#### Scenario: Mobile groups are collapsible
- **WHEN** viewport width is < 640px
- **THEN** each category group is collapsed by default
- **AND** tapping the header expands the group's skill list
