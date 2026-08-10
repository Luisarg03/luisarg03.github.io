## MODIFIED Requirements

### Requirement: Journalctl-style travel log
The `/now` page SHALL render travel entries as an expandable, timestamped log in the existing style of the site's journalctl/log UI (e.g. `[2024-04-10] [Japan] kyoto-temples: ...`), sorted by date descending, WHEN the travel collection contains at least one entry. Each entry SHALL be collapsed by default, showing only the timestamp, location, and caption line. With an empty travel collection, the `/now` page SHALL NOT render a travel log section.

#### Scenario: Log lists entries newest first
- **WHEN** the travel log renders on `/now` and the travel collection contains entries
- **THEN** entries appear sorted by date, most recent first, each showing timestamp, location tag, and caption

#### Scenario: Empty collection hides the section
- **WHEN** the travel collection contains no entries
- **THEN** the /now page renders no travel log section
