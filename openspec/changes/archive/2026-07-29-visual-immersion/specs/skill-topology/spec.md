## ADDED Requirements

### Requirement: Skills displayed as connected network
The skills section SHALL render as a connected topology map where related skills cluster together visually.

#### Scenario: Skill categories form clusters
- **WHEN** the skills section renders
- **THEN** each skill category forms a visually distinct cluster with connecting lines between related categories

#### Scenario: Individual skills are nodes
- **WHEN** the skill map renders
- **THEN** each skill is displayed as a node connected to its category cluster

### Requirement: Skill nodes have visual weight
Larger or more important skill categories SHALL be visually weighted (larger nodes, stronger color) compared to smaller categories.

#### Scenario: Cloud & IaC category is visually prominent
- **WHEN** the skill map renders
- **THEN** the "Cloud & IaC" and "CI/CD & DevOps" categories are visually more prominent than smaller categories
