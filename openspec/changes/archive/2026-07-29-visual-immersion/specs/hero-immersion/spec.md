## ADDED Requirements

### Requirement: Hero spans full viewport
The hero section SHALL span the full viewport width and use the blueprint background as its container, without a `.panel` wrapper.

#### Scenario: Hero is full-width on desktop
- **WHEN** viewport width is ≥ 1024px
- **THEN** the hero section extends to the full viewport width with content centered

#### Scenario: Hero has no panel border
- **WHEN** the hero renders
- **THEN** no `.panel` border or background surface is visible around the hero

### Requirement: Stat cards are floating widgets
Stat cards in the hero SHALL be positioned as floating dashboard widgets over the blueprint background.

#### Scenario: Stat cards overlay the blueprint
- **WHEN** the hero renders
- **THEN** stat cards are positioned over the blueprint background with elevated styling (shadow, semi-transparent background, blur)

### Requirement: Hero has minimum viewport height
The hero SHALL occupy at least 85% of the viewport height on desktop.

#### Scenario: Hero fills most of the screen
- **WHEN** the page loads on a desktop viewport
- **THEN** the hero section height is ≥ 85vh
