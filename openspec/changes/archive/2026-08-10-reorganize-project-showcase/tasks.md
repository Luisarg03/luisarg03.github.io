## 1. Schema

- [x] 1.1 In `src/content.config.ts`, change the `projects` collection schema
      signature from `schema: z.object({...})` to
      `schema: ({ image }) => z.object({...})`, copying the form already used
      by the `travel` collection in the same file
- [x] 1.2 Add `cover: image().optional()` and `coverAlt: z.string().optional()`
      to the projects schema
- [x] 1.3 Run `astro check` and confirm the three existing project entries
      still validate against the new schema signature

## 2. Asset

- [x] 2.1 Create `src/assets/projects/`
- [x] 2.2 Download `docs/images/dashboard.png` from
      `https://github.com/Luisarg03/OpenDashboard/raw/main/docs/images/dashboard.png`
      into `src/assets/projects/opendashboard.png`
- [x] 2.3 Verify the downloaded file is a valid PNG and record its dimensions
      and byte size

## 3. Content

- [x] 3.1 Create `src/content/projects/opendashboard.mdx` with `order: 0`,
      `status: wip`, `type: oss`, `year: 2026`, `cover` pointing at
      `../../assets/projects/opendashboard.png`, and a `coverAlt` describing
      the dashboard view; no `codeSnippet`; no MDX body
- [x] 3.2 Write the OpenDashboard `description`, `problem`, and `solution`
      fields in Spanish, covering: read-only SQLite visualizer for the
      OpenCode agent CLI, `PRAGMA query_only = 1`, FastAPI + SSE backend,
      React 19 / React Flow / TanStack Query SPA, delegation-chain graph,
      per-session cost and token attribution, zero-config on port 8420
- [x] 3.3 Write the OpenDashboard `impact` bullets in Spanish without
      inventing metrics — describe capability and engineering decisions, not
      numbers that do not exist
- [x] 3.4 Set `tags` and `stack` for OpenDashboard in English (python,
      fastapi, react, sqlite, observability, llm-agents)
- [x] 3.5 Set `links.docs` to the upstream `docs/` directory URL; omit
      `links.demo` (no public deployment exists)
- [x] 3.6 Reassign `order` across all entries: `opendashboard` 0,
      `nexocode` 1, `obsidian-second-brain` 2, `sagemaker-cicd-poc` 3
- [x] 3.7 Translate `nexocode.mdx` `description`, `problem`, `solution`, and
      `impact` from English to Spanish; leave `tags`, `stack`, `role`,
      `codeSnippet`, and all URLs unchanged
- [x] 3.8 Delete the MDX body paragraph from
      `src/content/projects/obsidian-second-brain.mdx`, leaving frontmatter
      only

## 4. Page — removals

- [x] 4.1 Delete the `impactScore()` function from `src/pages/projects.astro`
      (lines 7-19) and replace the sort expression with an ascending sort on
      `data.order`
- [x] 4.2 Delete the `allTags` computation
- [x] 4.3 Delete the filter chip markup block
- [x] 4.4 Delete the filter client-side script
- [x] 4.5 Delete the filter chip CSS rules
- [x] 4.6 Delete the now-unused `data-tags` attribute from the card element
- [x] 4.7 Grep the file for any remaining reference to the removed filter
      (`data-filter`, `allTags`, `impactScore`) and confirm zero hits

## 5. Page — cover rendering

- [x] 5.1 Import Astro's `Image` component in `src/pages/projects.astro`
- [x] 5.2 In the featured hero terminal window, render `cover` via `<Image>`
      when present, falling back to the existing shiki `codeSnippet` block
      when absent
- [x] 5.3 Keep the terminal title bar and `▢ ◯ ●` chrome identical in both
      modes
- [x] 5.4 Change the hero render condition so the terminal window shows when
      the featured entry has either a `cover` or a `codeSnippet`, and is
      hidden when it has neither
- [x] 5.5 Add CSS so the cover image fills the terminal content area without
      overflow, distortion, or layout shift, and stacks correctly below the
      text column under 1024px

## 6. Decision record

- [x] 6.1 Write `decisions/2026-08-08-explicit-project-ordering.md` recording
      that manual `order` curation supersedes the
      strongest-quantified-impact-first rule from
      `decisions/2026-08-03-dual-accent-and-structural-redesign.md`, with the
      rationale from this change's `design.md`

## 7. Verification

- [x] 7.1 Run `astro check` — zero errors
- [x] 7.2 Run a production build — succeeds, and the optimized cover asset is
      emitted
- [x] 7.3 Render `/projects` and confirm card order is OpenDashboard,
      NexoCode, Obsidian Second Brain, SageMaker CI/CD PoC
- [x] 7.4 Confirm the featured hero shows the screenshot inside the terminal
      frame, and that non-featured cards render their own code snippets
- [x] 7.5 Confirm no filter chip row is present and no console errors appear
- [x] 7.6 Capture desktop (1440x900) and mobile (390x844) screenshots to
      `/tmp/opencode/qa-projects/` and inspect for overflow, distortion, and
      alignment
- [x] 7.7 Confirm the page renders correctly with JavaScript disabled and
      under `prefers-reduced-motion: reduce`
- [x] 7.8 Run `openspec validate reorganize-project-showcase --strict`

## 8. Non-featured card snippets

- [x] 8.1 Render `codeSnippet` in non-featured cards using the existing
      terminal chrome design language, reusing existing markup/CSS rather than
      a second treatment
- [x] 8.2 Ensure a card without a `codeSnippet` renders no placeholder and no
      layout shift
- [x] 8.3 Verify the featured hero terminal stays visually dominant over
      normal-card snippets
- [x] 8.4 Verify single-column stacking below 640px with no horizontal
      overflow
- [x] 8.5 Re-run `astro check` and a production build
- [x] 8.6 Re-capture desktop and mobile screenshots and inspect the rendered
      grid balance
