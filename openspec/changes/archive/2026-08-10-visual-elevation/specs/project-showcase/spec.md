## ADDED Requirements

### Requirement: Display-scale featured title
The featured project card title SHALL render at display scale (`--text-display`), with at most two display-scale surfaces per viewport.

The display scale SHALL:
- Use the existing fluid `clamp()` display tokens (no new tokens)
- Apply to the featured project card title only (non-H1 surfaces)
- Not be applied to the H1-as-detail-row (SEO/ATS crawlability decision preserved)

#### Scenario: Featured card title renders at display scale
- **WHEN** a visitor opens `/projects` at a desktop viewport
- **THEN** the featured project card title renders fluidly at display scale (`--text-display`)
- **AND** the remaining project titles stay small mono
- **AND** no more than two display-scale surfaces are visible in the viewport

### Requirement: Card hover glow
Project cards SHALL respond to hover with an accent glow and lift (transform/opacity only, reduced-motion gated).

#### Scenario: Hovering a project card shows copper glow and lift
- **WHEN** a user hovers a project card
- **THEN** the card lifts by 2px
- **AND** a copper accent glow appears around the card within 200ms
- **AND** the transition uses transform/opacity only

#### Scenario: Card hover glow is disabled under reduced motion
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** hovering a project card produces no glow and no lift animation
