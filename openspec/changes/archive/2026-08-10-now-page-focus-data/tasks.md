## 1. Schema

- [x] 1.1 Extend the `now` collection schema in src/content.config.ts with the `focus` array (z.array of z.object: label string, status enum in-progress/planned/paused/completed, progress optional int 0-100, note optional string, default [])

## 2. Content

- [x] 2.1 Update src/content/now/now.mdx: add the focus frontmatter block (3 items: AWS DevOps Cert 40% in-progress, English 30% in-progress, Japan trip planned), remove the Studying and Travel body sections, keep the intro line and Work section

## 3. Page rendering

- [x] 3.1 Update src/pages/now.astro: replace the three hardcoded status cards with a mapping over entry.data.focus using the existing Card variant="status" + StatusIndicator + progress-bar markup
- [x] 3.2 Delete the hardcoded AWS/English/Travel cards from now.astro
- [x] 3.3 Gate the travel log card on travelSorted.length > 0 (empty collection renders no travel section)

## 4. Specs

- [x] 4.1 Add the new `now-page` capability spec (ADDED) in openspec/changes/now-page-focus-data/specs/now-page/spec.md
- [x] 4.2 Add the travel-log delta spec (MODIFIED) in openspec/changes/now-page-focus-data/specs/travel-log/spec.md

## 5. Verification

- [x] 5.1 openspec validate --all passes
- [x] 5.2 astro check passes
- [x] 5.3 The /now page renders (dev server) with cards showing frontmatter values, no travel section, and the updated date visible
