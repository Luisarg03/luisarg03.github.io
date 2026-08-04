## Why

The site differentiates on identity (terminal/OS metaphor) but currently under-sells evidence: `/projects` has a single project card, and the experience timeline (journalctl-style) lists responsibilities without quantified impact. Recruiters and engineering managers reviewing the site can't quickly answer "why should I interview this person?" Separately, the site has no personal/human content — adding a travel log (2024 Japan trip, 2027 return planned) humanizes the identity without diluting it, if framed through the site's existing log/journal metaphor rather than a generic photo gallery.

## What Changes

- Add 2-3 real project case studies to `/projects`: a SageMaker CI/CD pipeline, an AI coding agent fork (NexoCode), alongside the existing Obsidian Second Brain entry. Each project shown as a config/code-listing style card (monospace `key: value` metadata, copper-highlighted tech tags, comment-style problem/solution framing) rather than a plain description card.
- Add quantified impact metrics (e.g. deployment time reduction, resources provisioned, scale figures) to existing experience-timeline entries where available, replacing task-only bullet phrasing.
- Add a travel log rendered as `journalctl`-style expandable log entries (`[2024-04-10] [Japan] kyoto-temples: ...`), nested as a sub-section of the existing `/now` page — not a top-level nav item. Entries expand on click to reveal photos + extended caption. Initial content: 2024 Japan trip; structured so a 2027 return trip can be added as a new entry later.
- Explicitly preserve the existing "Boot Into Content" home hero decision (BREAKING change already accepted in `boot-into-content` spec): no featured-projects or highlights block is added to the home hero. Evidence lives in `/projects` and the experience timeline, not the first viewport.

## Capabilities

### New Capabilities
- `project-showcase`: case-study project cards on `/projects` — problem, solution, tech stack, and measurable impact per project, presented in a monospace/config-file visual style consistent with the site's terminal identity.
- `travel-log`: a `journalctl`-style expandable log of travel entries, nested under `/now`, showing date, location tag, caption, and photos on expansion.

### Modified Capabilities
- `experience-timeline`: entries SHALL include quantified impact metrics where available, in addition to existing role/responsibility content.

## Impact

- `src/pages/projects.astro`, `src/content/projects/` (new project entries)
- `src/pages/now.astro` (new travel-log sub-section)
- new `src/content/travel/` collection (or similar) for travel log entries
- `src/components/modules/ExperienceModule` (or equivalent journalctl experience component) and its underlying data source (`cv.ts` or per-entry content) for metrics
- No changes to `index.astro` boot sequence or home hero structure
