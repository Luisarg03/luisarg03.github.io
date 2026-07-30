# Experience Timeline — Delta Spec

## MODIFIED Requirements

### Requirement: Scroll-driven timeline spine
The system SHALL animate the timeline's vertical spine line drawing as the user scrolls through the section.

The spine SHALL be an SVG path (or equivalent) animated via `stroke-dasharray` + `animation-timeline: view()`. The animation SHALL start at the top of the section and complete when the bottom of the section reaches the viewport.

Where `animation-timeline` is unsupported, the spine SHALL render fully drawn (no partial state). The spine SHALL maintain visual alignment with timeline nodes at all viewport widths.

#### Scenario: Spine draws on scroll
- **WHEN** the user scrolls through the Experience section
- **THEN** the spine line draws progressively from top to bottom
- **AND** the animation is tied to scroll position, not to time

#### Scenario: Spine is fully drawn when section exits
- **WHEN** the user has scrolled past the entire Experience section
- **THEN** the spine is at 100% length

#### Scenario: Fallback for unsupported browsers
- **WHEN** the browser does not support `animation-timeline`
- **THEN** the spine is fully drawn on first paint
- **AND** the experience entries are visible without any scroll interaction

#### Scenario: Spine aligns with nodes
- **WHEN** the timeline is rendered at any viewport width (320px to 2560px)
- **THEN** the spine line is centered on the timeline node circles
- **AND** the alignment does not drift due to absolute positioning or zoom

### Requirement: Entry expand/collapse for older roles
The system SHALL allow users to expand or collapse the responsibilities list per entry, defaulting to expanded for the current role and collapsed for older roles with more than 4 responsibilities.

The expand/collapse control SHALL be a button (monospace, small) labeled "Show details" / "Hide details". The state SHALL be local per entry (not persisted across page loads). The toggle logic SHALL live in the component's `<script>` block, not as an inline event handler attribute.

#### Scenario: Older role collapses by default
- **WHEN** an experience entry has more than 4 responsibilities and is not the current role
- **THEN** only the first 3 responsibilities are visible on first render
- **AND** a "Show details" button is rendered

#### Scenario: Clicking "Show details" expands
- **WHEN** the user clicks "Show details"
- **THEN** all responsibilities become visible
- **AND** the button label changes to "Hide details"

#### Scenario: Current role never collapses
- **WHEN** the current role is rendered
- **THEN** all responsibilities are visible
- **AND** no "Show details" button is rendered

### Requirement: Mobile-friendly timeline
The system SHALL preserve the timeline's narrative on viewports < 640px.

On mobile:
- The spine remains visible but moves to the left edge of the entry card
- Year markers and badges are smaller
- Expand/collapse remains available
- The current role emphasis is preserved

The spine and node positions SHALL use CSS Grid alignment on the timeline container rather than pixel-precise absolute `left` values.

#### Scenario: Timeline stacks on mobile
- **WHEN** viewport width is < 640px
- **THEN** entries stack vertically
- **AND** the spine is visible at the left edge
- **AND** the layout does not overflow horizontally

#### Scenario: Node alignment uses grid positioning
- **WHEN** the timeline is inspected at any breakpoint
- **THEN** timeline nodes are positioned using CSS Grid (not absolute `left` offsets)
- **AND** nodes remain centered on the spine line
