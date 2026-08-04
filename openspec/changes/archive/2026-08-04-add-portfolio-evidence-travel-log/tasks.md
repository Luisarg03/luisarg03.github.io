## 1. Content schema changes

- [x] 1.1 Extend `projects` collection schema in `src/content.config.ts` with optional `problem: z.string()`, `solution: z.string()`, `impact: z.array(z.string()).default([])`
- [x] 1.2 Add `travel` collection to `src/content.config.ts`: loader glob on `src/content/travel/*.mdx`, schema `{ date: z.date(), location: z.string(), caption: z.string(), photos: z.array(image()) }`
- [x] 1.3 Add optional `impact?: string[]` field to the `Experience` interface in `src/content/cv.ts`

## 2. Project showcase UI (/projects)

- [x] 2.1 Update `src/pages/projects.astro` to render config-style monospace cards: `key: value` metadata lines, copper-accented tech tags, comment-style (`//`/`#`) problem/solution framing
- [x] 2.2 Render impact/metric lines when a project defines `impact`, omit the section entirely when absent
- [x] 2.3 Verify single-column stacking with no horizontal overflow at <640px viewport, with and without problem/solution/impact fields present

## 3. Experience timeline impact metrics

- [x] 3.1 Update `ExperienceModule.astro` to render a distinct (copper-accented) impact line beneath responsibilities when an entry defines `impact`
- [x] 3.2 Confirm entries without `impact` render exactly as before (no empty placeholder)

## 4. Travel log UI (/now)

- [x] 4.1 Create `src/assets/travel/` directory for source photo assets
- [x] 4.2 Build travel log component: collapsed row shows `[date] [location] caption`, sorted by date descending
- [x] 4.3 Implement expand-to-reveal-photos interaction using a document-level delegated listener (`closest()` pattern), consistent with existing experience/skills toggle pattern
- [x] 4.4 Replace or extend the existing "Japan Trip" status card in `src/pages/now.astro` with the travel log section
- [x] 4.5 Verify no new top-level nav entry was introduced for travel

## 5. Content population

- [x] 5.1 Gather real, user-approved quantified metrics for eligible `experience[]` entries and add them as `impact` arrays (CLOSED: user does not want metrics on page)
- [x] 5.2 Write problem/solution/impact content for the SageMaker CI/CD pipeline and NexoCode project entries in `src/content/projects/` (COMPLETED: NexoCode entry created)
- [x] 5.3 Create the 2024 Japan trip travel entry(ies) with real captions and photos in `src/content/travel/` (CLOSED: deferred to future spec per user)

## 6. Verification

- [x] 6.1 Run `astro check` and `astro build` to confirm schema/type changes compile
- [x] 6.2 Run dev server, visually inspect `/projects` and `/now` at desktop and mobile widths (project memory #35: visual verification is mandatory for styling changes)
- [x] 6.3 Verify travel log expand/collapse and experience "show details" toggle both still work after a client-side (view-transition) navigation and back
