## ADDED Requirements

### Requirement: Project grid has increased card spacing

The `/projects` page SHALL render the project grid with
increased vertical and horizontal spacing between cards.
Mobile viewports (< 640px) SHALL use `gap: var(--space-6)`.
Desktop viewports (>= 640px) SHALL use `gap: var(--space-8)`.

#### Scenario: Mobile gap is var(--space-6)
- **WHEN** a visitor views `/projects` at viewport < 640px
- **THEN** the gap between project cards resolves to
  `var(--space-6)` (1.5rem)

#### Scenario: Desktop gap is var(--space-8)
- **WHEN** a visitor views `/projects` at viewport >= 640px
- **THEN** the gap between project cards resolves to
  `var(--space-8)` (2rem)
