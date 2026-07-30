# Skills Visualization

Replaces the current flat tag-grid in `SkillMap.astro` with a richer visualization: a polar/radar chart showing category proficiency, plus a grouped tag list for detail. Designed to communicate "where my strengths cluster" at a glance, with the detail available for the curious.

## ADDED Requirements

### Requirement: Radar chart of skill categories
The system SHALL render a polar/radar chart showing relative proficiency per skill category.

The chart SHALL:
- Be implemented as inline SVG (no chart library)
- Display one axis per category from `skillCategories` in `cv.ts`
- Plot a single polygon connecting proficiency points across axes
- Use the copper accent color for the polygon fill (low opacity) and stroke
- Be interactive: hovering an axis highlights that category in the tag list
- Be accessible: each axis has a `<title>` element and a focusable target

#### Scenario: Radar renders all categories
- **WHEN** the Skills section is loaded with N skill categories
- **THEN** the radar displays N axes equally spaced around the center
- **AND** a polygon connects the proficiency points for each category

#### Scenario: Hovering an axis highlights the tag group
- **WHEN** the user hovers over an axis in the radar
- **THEN** the corresponding tag group in the adjacent list gains an emphasis style
- **AND** non-hovered groups reduce to muted style

#### Scenario: Radar is keyboard navigable
- **WHEN** the user tabs to the radar
- **THEN** each axis is independently focusable
- **AND** pressing `Enter` or `Space` on an axis highlights that category
- **AND** a screen reader announces the category name and proficiency

### Requirement: Skill category proficiency data
The system SHALL represent per-category proficiency as a numeric value in `cv.ts`.

Proficiency SHALL be a number from 0 to 5, additive with the existing `category` and `skills` fields. Categories without a stated proficiency SHALL default to 0 (the radar omits the polygon vertex but still draws the axis).

#### Scenario: Proficiency values are present in cv.ts
- **WHEN** the data file is parsed
- **THEN** every category in `skillCategories` has a numeric `proficiency` field
- **AND** the value is between 0 and 5 inclusive

### Requirement: Grouped skill tag list
The system SHALL display skill tags grouped by category, with the group matching the radar's active axis emphasized.

The list SHALL:
- Group tags under a category header (monospace, muted, with a colored dot matching the radar axis color)
- Show the count of skills per group
- Highlight the active group when the radar axis is hovered or focused
- Be collapsible per group on mobile (collapsed by default; expand on tap)

#### Scenario: Tags render under each category
- **WHEN** the Skills section is loaded
- **THEN** each category header is followed by its tag list
- **AND** tags are rendered as monospace pills with category-tinted borders

#### Scenario: Active group is emphasized
- **WHEN** the user hovers the "Cloud & IaC" axis in the radar
- **THEN** the "Cloud & IaC" tag group in the list has a brighter border and full-opacity text
- **AND** other groups drop to muted opacity

#### Scenario: Mobile groups are collapsible
- **WHEN** viewport width is < 640px
- **THEN** each category group is collapsed by default
- **AND** tapping the header expands the group's tag list
- **AND** expanded state is indicated by a chevron rotation

### Requirement: Color assignment per category
The system SHALL assign a distinct accent color per category, consistent with the current `categoryAccents` map in `SkillMap.astro`.

The current color mapping SHALL be preserved; new colors SHALL only be added if a new category appears in the data.

#### Scenario: Existing color map is preserved
- **WHEN** the Skills section renders
- **THEN** the same color per category as the current `SkillMap.astro` is used
- **AND** no visual regression occurs for users who have seen the previous version
