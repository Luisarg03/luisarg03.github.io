## Tasks

- [x] 1. Restructure `src/components/sections/Hero.astro`: remove Arch ASCII art, add compact prompt-line motif, make full name the dominant element (largest existing text tier), plain labels (Role / Location / Experience / Current), visual tiers via existing `var(--text-*)` tokens
- [x] 2. Move `siteConfig.summary` render directly below name/role block, above contact toolbar, in Hero.astro
- [x] 3. Replace cryptic contact icons (`✉`, `⊞`, `⌥`) with text labels (Email, LinkedIn, GitHub, CV) in Hero.astro
- [x] 4. Remove "online" status text from Hero.astro (decorative dot may remain)
- [x] 5. Simplify footer in `src/layouts/BaseLayout.astro`: keep copyright + LinkedIn/GitHub; remove scroll %, UTC clock, version string, `$ terminal` link
- [x] 6. Relabel skills section title to "Skills" in `src/components/sections/SkillMap.astro`
- [x] 7. Add progressive disclosure to `src/components/sections/ExperienceTimeline.astro`: 3-4 most recent roles expanded, earlier roles inside native `<details>`/`<summary>`, no JS
- [x] 8. Verify: `astro build` succeeds; homepage source contains exactly one `<h1>` with the full name; no regression in structured data / sitemap output
