# Add neofetch-style identity card to homepage

## Why

The boot-into-content redesign removed the site's neofetch-style identity card (breaking change: "neofetch/marquee removed"). The owner wants it back in the identity section (IdentityModule, the whoami module) with the Arch Linux ASCII art, updated to the current OS persona: metaphorical rows mapped to profile data (as the pre-redesign card did), not the real machine. The card is decorative flavor that strengthens the OS metaphor; the plain-language identity fields stay the semantic content.

## What Changes

- IdentityModule (src/components/modules/IdentityModule.astro) gains a decorative neofetch-style card: Arch Linux ASCII art (copper, mono) + two bordered info boxes + user@host line
- Rows are persona-mapped: user line `luis@cloud`; OS = role, Kernel = years, IP = location, CPU = name, plus playful rows (Packages, Resolution, DE, Terminal, GPU, Memory) — exact wording approved by the owner at implementation (checkpoint)
- Required identity fields (name, role, years, company, location) remain in the first viewport without scrolling at 1440x900 and 390x844
- Responsive: two-column layout on desktop; on mobile the ASCII art is hidden and rows stack, no horizontal overflow
- Static server-rendered HTML only: no JS, no system queries, aria-hidden decorative card
- Where data exists in cv.ts/siteConfig (name, role, location, years, company) the rows reference it instead of duplicating

## Capabilities

### Modified
- `home-hero`: identity module MAY include a decorative neofetch card; decoration budget updated (non-displacing, responsive, copper/mono)

## Impact

- src/components/modules/IdentityModule.astro: card markup + styles (ASCII pre, boxes, grid)
- openspec/specs/home-hero/spec.md: 2 MODIFIED requirements
- No new dependencies, no JS changes, no layout-token changes
