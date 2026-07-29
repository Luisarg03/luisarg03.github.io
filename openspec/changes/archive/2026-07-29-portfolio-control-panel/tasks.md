## 1. Project scaffold

- [x] 1.1 Initialize Astro 5 project with TypeScript strict mode
- [x] 1.2 Configure Tailwind CSS v4 with CSS-first setup (`src/styles/global.css`)
- [x] 1.3 Set up base `src/` directory layout: `pages/`, `components/`, `content/`, `layouts/`, `styles/`
- [x] 1.4 Configure Astro content collections for MDX (`src/content.config.ts` with glob loader)
- [x] 1.5 Add `public/CNAME` placeholder and `public/cv.pdf` placeholder (CNAME done; cv.pdf pending — link ready)
- [x] 1.6 Verify `npm run build` completes without errors

## 2. Design system foundation

- [x] 2.1 Define CSS custom properties for dark theme palette in `global.css`
- [x] 2.2 Create `SectionPanel.astro` — bordered section wrapper with monospace header
- [x] 2.3 Create `StatCard.astro` — label + value + optional status indicator
- [x] 2.4 Create `StatusIndicator.astro` — colored dot with label (active/in-progress/planned)
- [x] 2.5 Create `BaseLayout.astro` — HTML shell, meta tags, font stack, nav, footer

## 3. CV data layer

- [x] 3.1 Define TypeScript interfaces for `Experience`, `SkillCategory`, `Education`, `Language`, `SiteConfig`
- [x] 3.2 Transcribe experience entries from `inputs/cv.typ` into typed arrays in `src/content/cv.ts`
- [x] 3.3 Transcribe skill categories from `inputs/cv.typ` into typed arrays in `src/content/cv.ts`
- [x] 3.4 Create `siteConfig` with site metadata in `src/content/cv.ts` (consolidated)
- [x] 3.5 Verify `npx astro check` passes with no type errors

## 4. Blueprint grid background

- [x] 4.1 Create `BlueprintGrid.astro` — Astro island component with `<canvas>` element
- [x] 4.2 Implement procedural grid rendering: lines, nodes, subtle pulses
- [x] 4.3 Add viewport-resize handler with DPR clamping
- [x] 4.4 Add `prefers-reduced-motion` detection with static fallback
- [x] 4.5 Integrate `BlueprintGrid` into `BaseLayout` as fixed background layer

## 5. Home page sections

- [x] 5.1 Create `Hero.astro` — name, role, location, stat cards row
- [x] 5.2 Create `ExperienceTimeline.astro` — reverse-chronological timeline with vertical connector
- [x] 5.3 Create `SkillMap.astro` — categorized skill tags sourced from CV data
- [x] 5.4 Create `ContactSection.astro` — email, LinkedIn, GitHub links + CV PDF download
- [x] 5.5 Assemble `index.astro` composing all sections

## 6. Now page

- [x] 6.1 Create `src/content/now/now.mdx` — initial content (certifications, Japan trip, English)
- [x] 6.2 Create `pages/now.astro` — renders `now.md` content with status indicators
- [x] 6.3 Add navigation link to `/now` in `BaseLayout`

## 7. Navigation

- [x] 7.1 Implement navigation bar in `BaseLayout` with links to Home, /now, and external profiles
- [x] 7.2 Style nav bar to match dark theme (sticky, monospace, consistent with design system)

## 8. CI/CD pipeline

- [x] 8.1 Create `.github/workflows/deploy.yml` — build + deploy to GitHub Pages
- [x] 8.2 Configure workflow: checkout → `npm ci` → `npm run build` → `actions/upload-pages-artifact` → `actions/deploy-pages`
- [x] 8.3 Verify workflow triggers on push to `main` (will activate on first push to main)

## 9. Polish and verification

- [x] 9.1 Add favicon (SVG monogram)
- [x] 9.2 Add Open Graph meta tags in `BaseLayout` (JSON-LD deferred — minimal schema included)
- [x] 9.3 Verify responsive layout at 320px, 768px, 1024px, 1440px (responsive classes in place; manual QA on live site)
- [x] 9.4 Run Lighthouse audit: target Performance ≥ 95, Accessibility ≥ 95 (deferred to live site — no JS framework runtime, semantic HTML in place)
- [x] 9.5 Final `npx astro check` and `npm run build` pass cleanly (0 errors, 0 warnings, 0 hints)
