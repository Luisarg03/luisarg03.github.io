# Travel Log

## Purpose

The travel log section displays travel experiences and memories. Each travel entry includes timestamp, location, caption, and photos, rendered as an expandable journalctl-style log.

## Requirements

### Requirement: Travel content collection
The system SHALL provide a `travel` content collection of MDX entries in `src/content/travel/`, each with `date` (date), `location` (string), `caption` (string), and `photos` (array of optimized images via Astro's `image()` schema helper, sourced from `src/assets/travel/`).

#### Scenario: Entry with valid frontmatter
- **WHEN** a travel entry exists with date, location, caption, and at least one photo
- **THEN** it is included in the travel collection and its photos are served through Astro's image optimization pipeline

### Requirement: Journalctl-style travel log
The `/now` page SHALL render travel entries as an expandable, timestamped log in the existing style of the site's journalctl/log UI (e.g. `[2024-04-10] [Japan] kyoto-temples: ...`), sorted by date descending, WHEN the travel collection contains at least one entry. Each entry SHALL be collapsed by default, showing only the timestamp, location, and caption line. With an empty travel collection, the `/now` page SHALL NOT render a travel log section.

#### Scenario: Log lists entries newest first
- **WHEN** the travel log renders on `/now` and the travel collection contains entries
- **THEN** entries appear sorted by date, most recent first, each showing timestamp, location tag, and caption

#### Scenario: Entry expands to reveal photos
- **WHEN** a visitor clicks a collapsed travel log entry
- **THEN** the entry expands to display its photos and any extended caption text, without navigating away from `/now`

#### Scenario: Empty collection hides the section
- **WHEN** the travel collection contains no entries
- **THEN** the /now page renders no travel log section

### Requirement: Travel log nested under /now, not top-level navigation
The travel log SHALL be presented as a sub-section within the existing `/now` page (replacing or extending the current "Japan Trip" status card) and SHALL NOT introduce a new top-level navigation entry or route.

#### Scenario: No new nav entry
- **WHEN** the site navigation is inspected after this change
- **THEN** no new top-level nav item for travel exists
- **AND** travel content is only reachable via `/now`

### Requirement: Expand/collapse survives client-side navigation
The travel log entry expand/collapse interaction SHALL use a document-level delegated listener (not per-element listeners), so it continues to function after Astro view transitions swap the page content.

#### Scenario: Expand/collapse works after back-navigation
- **WHEN** a user navigates away from `/now` and back via view transition
- **THEN** travel log entries still expand and collapse on click