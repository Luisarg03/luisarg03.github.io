## ADDED Requirements

### Requirement: Fluid display type scale
The system SHALL provide a fluid display type scale based on `clamp()` for headings, replacing fixed-size display steps.

The scale SHALL:
- Define display sizes as `clamp()` values responsive between mobile and desktop viewports
- Apply an oversized hero heading (name) within the display scale
- Keep small mono label tokens (`--text-xs`, `--text-sm`) fixed so the technical voice stays crisp

#### Scenario: Hero heading scales fluidly
- **WHEN** the hero renders at any viewport width
- **THEN** the display heading size is derived from a `clamp()` value
- **AND** no fixed breakpoint stack changes the heading size stepwise

#### Scenario: Mono labels stay fixed
- **WHEN** a section label renders
- **THEN** it uses a fixed mono token size regardless of viewport

### Requirement: Depth conventions without backdrop blur
The system SHALL achieve surface depth with borders and shadows, NOT with `backdrop-filter` blur or gradient blooms.

SHALL NOT:
- Apply `backdrop-filter` to any surface
- Use radial gradient blurs in the hero or any section background

#### Scenario: No backdrop blur on surfaces
- **WHEN** any card or panel renders
- **THEN** its depth comes from border and shadow tokens
- **AND** no `backdrop-filter` is applied

#### Scenario: Hero has no gradient bloom
- **WHEN** the hero renders
- **THEN** no radial gradient blur layers are present in the hero background
