# data-layer Specification

## Purpose
TBD - created by archiving change data-layer. Update Purpose after archive.
## Requirements
### Requirement: skill category evidence

The SkillCategory type in cv.ts SHALL support an optional `evidence?: string` field, and the htop hero row SHALL render it as a muted mono sub-line under the COMMAND category name when present.

#### Scenario: evidence present

- **WHEN** a skill category defines `evidence`
- **THEN** the htop row renders the evidence as a second muted mono sub-line under the category name

#### Scenario: evidence absent

- **WHEN** a skill category does not define `evidence`
- **THEN** the htop row renders exactly one COMMAND line, identical to today's markup, with unchanged row height

### Requirement: project scaleMetric

The projects content schema SHALL support an optional `scaleMetric?: string` field, and the project card meta row SHALL render it as an extra `// <metric>` part when present.

#### Scenario: scaleMetric present

- **WHEN** a project entry defines `scaleMetric`
- **THEN** the card meta row renders the extra `// <metric>` part alongside the existing parts

#### Scenario: scaleMetric absent

- **WHEN** a project entry does not define `scaleMetric`
- **THEN** the card meta row renders exactly as today, with no extra part

### Requirement: elegant absence

Absence of any optional field SHALL render the site exactly as it renders today; optional fields are enhancements, not requirements.

#### Scenario: all new fields absent

- **WHEN** no skill category defines `evidence` and no project defines `scaleMetric`
- **THEN** the rendered output is identical to the site before this change

### Requirement: no sample values shipped

The change SHALL NOT ship sample or placeholder metric values to production; new fields render only when real content data exists.

#### Scenario: production contains no invented data

- **WHEN** the production build is generated
- **THEN** no `evidence` or `scaleMetric` value originates from code defaults, templates, or mock data

