## ADDED Requirements

### Requirement: Persistent header remains interactive
The sticky site header SHALL remain clickable above page content at every scroll position.

The header SHALL:
- Paint above in-flow page content: its z-index SHALL be higher than `<main>` content's stacking level and lower than the boot overlay and the command palette
- Never have its links or logo covered by module content, even when transformed/revealed elements create stacking contexts
- Remain hidden behind the opaque boot overlay during overlay playback (the overlay covers the whole viewport, including the header)

#### Scenario: Header links clickable while scrolled
- **WHEN** the user scrolls the homepage so module content passes under the sticky header
- **THEN** the header links and logo remain clickable at all scroll positions

#### Scenario: Content never intercepts header clicks
- **WHEN** module content with transforms or reveal transitions is under the sticky header
- **THEN** clicks on the header area reach the header links, not the content beneath

#### Scenario: Boot overlay still covers the header
- **WHEN** the boot overlay plays on page entry
- **THEN** the header is not visible through the overlay and receives no pointer events
