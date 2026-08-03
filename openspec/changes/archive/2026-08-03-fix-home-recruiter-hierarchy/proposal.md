## Why

A design review (recruiter POV) found the homepage fails the 10-second test: a ~600px Arch Linux ASCII logo dominates the first viewport, identity facts are hidden behind cryptic neofetch labels (`OS:`, `Kernel:`, `Uptime:`), the name has no visual dominance, and the value-proposition summary is the 5th visual element. Recruiters who don't speak terminal culture bounce before understanding who this person is.

## What Changes

- Restructure hero: full name becomes the visually dominant element (2-3x surrounding text); neofetch metaphor labels replaced with plain labels (Role, Location, Experience, Current Company); Arch ASCII art removed or reduced to small decoration.
- Move the summary paragraph directly below name/role, above the contact buttons.
- Establish clear visual tiers in the hero: (1) name — largest, (2) role + years — medium, (3) location + contact — small.
- Replace cryptic contact icons (`✉`, `⊞`, `⌥`) with plain text labels or recognizable brand icons.
- Remove the "online" status text (decorative dot may stay).
- Simplify the footer: remove scroll percentage, UTC clock, version string, and `$ terminal` link; keep copyright and LinkedIn/GitHub links.
- Relabel the skills section from "Infrastructure" to "Skills".
- Experience timeline: show the 3-4 most recent/relevant roles by default; earlier roles behind a "Show earlier experience" toggle.
- The terminal/control-panel aesthetic is preserved — this is a hierarchy and labeling fix, not a redesign.

## Capabilities

### New Capabilities
- `home-hero`: Landing-viewport identity hierarchy — hero structure, visual tiers, plain-language labels, summary placement, contact affordances, and simplified landing footer chrome.

### Modified Capabilities
- `skills-visualization`: Section title requirement changes from "Infrastructure" to "Skills".
- `experience-timeline`: Adds progressive-disclosure requirement (recent roles by default, earlier roles collapsed).

## Impact

- `src/components/sections/Hero.astro` — major restructure of markup and CSS.
- `src/layouts/BaseLayout.astro` — footer simplification.
- `src/components/sections/SkillMap.astro` — section title label.
- `src/components/sections/ExperienceTimeline.astro` — progressive disclosure logic.
- No dependency changes, no new pages, no SEO regressions: the single semantic H1 with the full name (per archived seo-ranking-name-search change) must be preserved.
