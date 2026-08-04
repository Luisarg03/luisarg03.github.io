# Project Showcase

## Purpose

The project showcase section displays professional work and open-source contributions. Each project card presents key metadata including title, description, repository link, and optional case study details (problem, solution, impact).

## Requirements

### Requirement: Project case study fields
The `projects` content collection SHALL support optional `problem`, `solution`, and `impact` fields per entry, in addition to the existing `title`, `description`, `repo`, `tags`, and `order` fields. Entries without these fields SHALL continue to render using only `title`/`description`/`tags`/`repo`.

#### Scenario: Entry with case study fields
- **WHEN** a project entry defines `problem`, `solution`, and `impact`
- **THEN** the project card renders a problem statement, a solution statement, and one or more impact/metric lines

#### Scenario: Entry without case study fields still renders
- **WHEN** a project entry omits `problem`, `solution`, and `impact`
- **THEN** the project card renders using only the existing title/description/tags/repo fields, without errors or empty placeholder sections

### Requirement: Config-style project card presentation
The `/projects` page SHALL render each project card in a monospace, config/code-listing visual style: `key: value`-style metadata lines, copper-accented tech tags, and comment-style (`//` or `#`) framing for the problem/solution text, consistent with the site's existing terminal/OS visual identity.

#### Scenario: Project card uses monospace metadata style
- **WHEN** a visitor opens `/projects`
- **THEN** each project's metadata (tags, repo link) renders in monospace with copper-accented tags

### Requirement: Project cards stack on mobile
The project card layout SHALL stack into a single column without horizontal overflow on viewports narrower than 640px, regardless of how many optional fields (problem/solution/impact) are present.

#### Scenario: Cards stack on narrow viewport
- **WHEN** viewport width is < 640px
- **THEN** project cards render in a single column
- **AND** no content is clipped or overflows horizontally