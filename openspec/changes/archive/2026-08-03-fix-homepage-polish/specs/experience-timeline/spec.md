# experience-timeline Spec

## ADDED Requirements

### Requirement: Job detail toggle survives navigation

The job detail toggle ("show details") SHALL remain functional after client-side navigation. Interactive toggles SHALL NOT depend on per-element listeners that are lost when view transitions swap the DOM; the toggle logic SHALL live in a delegated listener (document-level) within the component's script block.

#### Scenario: Toggle works on first load

- **WHEN** the experience module renders
- **THEN** the show details toggle expands/collapses the job details

#### Scenario: Toggle works after back-navigation

- **WHEN** the user navigates to another page and back via view transition
- **THEN** the toggle still expands/collapses job details
