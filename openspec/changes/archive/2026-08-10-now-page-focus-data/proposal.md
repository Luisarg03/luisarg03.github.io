## Why

The /now page maintains two sources of truth for the same status data. The three dashboard cards (AWS DevOps Cert 40%, English 30%, Travel log) hardcode their progress values in page markup, while the MDX body's Studying and Travel sections repeat the same information as prose. The values drift — nothing enforces that the card's 40% matches the prose "in progress, targeting Q4" — and updating status requires editing two places.

Separately, the Travel log card renders a permanent empty state ("No travel entries yet.") because the travel collection has zero entries and src/assets/travel/ has no photos. Per the now-page convention (nownownow.com), a permanently empty log is the abandonment symptom that undermines the page; the honest behavior is to show the section only when there is content.

## What Changes

- **BREAKING** The three status cards on /now stop hardcoding status/progress. Cards render from a new structured `focus` array in the now content collection frontmatter (label, status, optional progress 0-100, optional note). Updating /now status becomes a single-file frontmatter edit.
- **BREAKING** The Travel log card on /now renders only when the travel collection contains at least one entry. Empty collection → no travel section rendered (the collection, schema, and photo pipeline remain intact and dormant).
- The MDX body of now.mdx drops the Studying and Travel prose sections (now represented by focus cards) and keeps narrative sections that do not fit card semantics (Work) plus the intro line.
- No new navigation entries or routes.

## Capabilities

### New Capabilities
- `now-page`: the /now page as a status dashboard driven by structured content frontmatter.

### Modified Capabilities
- `travel-log`: travel log rendering on /now becomes conditional on the travel collection containing at least one entry.

## Impact

**Code**: src/content.config.ts (now schema gains focus array), src/content/now/now.mdx (frontmatter + body restructure), src/pages/now.astro (cards render from frontmatter, travel card gated). No new dependencies. No changes to navigation, terminal FS, or other pages.

**Visual**: /now cards keep the existing Card/StatusIndicator/progress-bar visual language — only their data source changes. With an empty travel collection the travel card disappears entirely.
