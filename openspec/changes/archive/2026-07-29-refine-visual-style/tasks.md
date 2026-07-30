## 1. Design tokens

- [x] 1.1 Add section padding tokens to `src/styles/global.css`: `--section-padding-y-mobile: 3rem`, `--section-padding-y-desktop: 5rem`, `--section-gap: 2rem`
- [x] 1.2 Add panel chrome tokens for terminal tab variant (tab bar height, dot size, dot color)
- [x] 1.3 Verify the existing spacing scale (`--space-*` tokens) is sufficient; only add if a clear gap exists

## 2. SectionPanel terminal chrome

- [x] 2.1 Update `src/components/layout/SectionPanel.astro` to render a terminal-tab style top bar when a `title` is provided: path label (`~/title`) on the left, three small status dots on the right
- [x] 2.2 Update section label rendering to use the monospace font with the accent color on the leading character
- [x] 2.3 Confirm existing corner-accent pseudo-elements still render below the new tab bar
- [x] 2.4 Verify the tab bar respects mobile vs desktop spacing (no overflow on small viewports)

## 3. Hero neofetch identity card

- [x] 3.1 Replace the contents of `src/components/sections/Hero.astro` with a neofetch-style identity card (left: ASCII art, right: prompt + key:value rows)
- [x] 3.2 Source the values from `cv.ts`: `user` from `siteConfig.name`, `OS` from `siteConfig.role`, `Host` from `siteConfig.location`, `Kernel` from `yearsExp`, `Uptime` from `currentRole.company`
- [x] 3.3 Pick a small ASCII art (Arch-style mark or a custom minimal monogram); embed as a `<pre>` block in mono
- [x] 3.4 Make the card stack vertically on viewports < 640px (art on top, key:value below)
- [x] 3.5 Remove the typewriter animation; replace with a small fade-in stagger for the key:value rows (~50ms each, total < 800ms)
- [x] 3.6 Wire the bento stats (experience, current role) to render below the neofetch card with consistent spacing

## 4. Section polish

- [x] 4.1 Apply the new tab-bar section header to `ExperienceTimeline.astro`
- [x] 4.2 Apply the new tab-bar section header to `SkillMap.astro`
- [x] 4.3 Apply the new tab-bar section header to `ContactSection.astro`
- [x] 4.4 Audit the bento grid in Hero for proper visual weight with only 2 cards (verify `lg:col-span-2` alignment)
- [x] 4.5 Verify every section uses the new section-padding tokens; replace ad-hoc padding values where present

## 5. Component organization

- [x] 5.1 Scan all sections for repeated JSX or className patterns; extract a helper into `components/ui/` or `components/layout/` only if used 3+ times
- [x] 5.2 Confirm folder boundaries (`ui/`, `layout/`, `sections/`, `charts/`) are clean; do not add new folders
- [x] 5.3 Verify the deleted `Monogram.astro` is not imported anywhere (it should already be gone from recent changes)
- [x] 5.4 Verify `charts/` only contains `SkillGroupList.astro` (the deleted `SkillRadar.astro` is already removed)

## 6. Responsive audit

- [x] 6.1 Test every section at 320px, 640px, 1024px, and 1440px viewports
- [x] 6.2 Verify the neofetch card stacks correctly below 640px without horizontal scroll
- [x] 6.3 Verify section tab bars don't overflow on narrow viewports (truncate or wrap path label if needed)
- [x] 6.4 Verify `BlueprintGrid` background opacity; reduce to ~60% of pre-change value if it competes with the terminal chrome

## 7. Animation pass

- [x] 7.1 Remove arbitrary first-paint `fade-in-up` cascades on Hero and bento stats (the neofetch card stagger replaces them)
- [x] 7.2 Verify scroll-reveal utilities (`.reveal-on-view*`, `.draw-on-scroll`) still trigger correctly on each section
- [x] 7.3 Verify `prefers-reduced-motion: reduce` disables all entrance animations
- [x] 7.4 Verify status-dot pulse, hover glow, and blueprint scroll-velocity still work

## 8. Verification

- [x] 8.1 Run `astro check` — must pass with no errors
- [x] 8.2 Run \`astro build\` — must complete without errors
- [x] 8.3 Spot-check the dev server with \`astro dev\` and visit \`/\` and \`/now\`
- [x] 8.4 Screenshot the home page at desktop (1440px), tablet (768px), and mobile (375px) breakpoints
- [x] 8.5 Review the screenshots and the \`refine-visual-style\` change proposal/specs; confirm no regressions
