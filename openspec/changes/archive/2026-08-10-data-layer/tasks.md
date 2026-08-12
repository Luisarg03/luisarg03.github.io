1. cv.ts: add `evidence?: string` to SkillCategory interface (no category gets a value — absence state first).
2. HtopWindow.astro: render evidence sub-line in COMMAND cell when present (class `.htop-evidence`), mono text-xs muted, no wrap, mobile-safe; verify absence renders exactly today's markup.
3. content.config.ts: add `scaleMetric: z.string().optional()` to projects schema.
4. projects.astro: add scaleMetric to metaParts (`// <metric>`).
5. Verification: build passes; absence state renders identical to today; TEMPORARY inject (dev-only, then revert + verify git diff clean) one evidence + one scaleMetric to visually confirm the new render, screenshot to /tmp/opencode/qa-homepage/, then revert.
