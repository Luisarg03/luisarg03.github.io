## Context

Personal portfolio site for Luis Meyehen Paz, a Cloud/Platform Engineer with 7+ years of experience. The site replaces the absence of an online presence with a unique, infrastructure-inspired identity. It targets both technical peers and non-technical recruiters. The only existing content is `inputs/cv.typ` (Typst CV), which serves as reference for professional data.

**Constraints:**
- Deployed on GitHub Pages (free tier, static-only)
- Custom domain support
- Content editable without a CMS (markdown + TypeScript)
- Extensible for future blog, projects showcase, i18n
- MVP scope: 5 core sections, ship in days not weeks

## Goals / Non-Goals

**Goals:**
- Deliver a visually distinctive portfolio with a "Control Panel / Infrastructure Dashboard" aesthetic
- Provide a `/now` page as the site's living, frequently-updated differentiator
- Separate content from presentation: TypeScript data layer for CV, MDX for /now updates
- Zero-JS-by-default pages (progressive enhancement via Astro islands)
- Automated CI/CD deploy on push to `main`
- Lighthouse Performance ≥ 95, Accessibility ≥ 95

**Non-Goals:**
- CMS or database backend
- User authentication or admin panel
- Contact form with server-side processing (mailto: link suffices for MVP)
- Multi-language support in MVP
- Project showcase (no public repos to feature yet)
- Blog in MVP (extensible post-MVP via MDX content collections)
- Dark/light theme toggle (dark-only matches the infrastructure aesthetic)

## Decisions

### 1. Astro 5 over Next.js / SvelteKit / Hugo

**Choice:** Astro 5

**Rationale:**
- 99% static content. Astro ships zero JS by default; Next.js requires `"use client"` for any interactivity.
- MDX and content collections are first-class. Next.js App Router with MDX adds complexity (next-mdx-remote, serialization).
- GitHub Pages deployment is a single `astro build` → `actions/upload-pages-artifact`. No Node.js server needed.
- Component model (`.astro` files) encourages HTML-first thinking. Islands pattern for interactive elements (blueprint canvas).
- Smaller dependency footprint, faster builds.

**Alternatives considered:**
- **Next.js**: Overkill for a static site. SSR/ISR features unused. Heavier bundle, more config.
- **Hugo**: Fast, but Go templating is less expressive for data-driven layouts. No TypeScript integration.
- **SvelteKit**: Good static support, but less ecosystem for this use case. Astro's content collections are more mature for MDX.

### 2. Tailwind CSS v4 with CSS Variables for theming

**Choice:** Tailwind v4 (CSS-first config) with custom CSS variables for the design system.

**Rationale:**
- v4 drops `tailwind.config.js` in favor of CSS-based configuration — simpler, fewer files.
- CSS custom properties (`--color-accent`, `--color-muted`) for the dark palette enable future theme support without rearchitecting.
- Utility classes speed up layout iteration without bloated CSS files.
- Blueprint grid, stat cards, and status indicators are implemented as Tailwind utility compositions, not separate CSS modules.

**Alternatives considered:**
- **CSS Modules**: More isolation but slower iteration. No design-token ergonomics.
- **Styled Components / CSS-in-JS**: Runtime cost, unnecessary for static site.
- **Tailwind v3**: Still viable but v4 is the current stable and reduces config boilerplate.

### 3. Dark-only theme

**Choice:** Single dark theme, no light mode toggle.

**Rationale:**
- Infrastructure dashboards and monitoring consoles are dark-themed by convention.
- Simplifies design system: one palette, no theme-switching logic.
- Matches the "Control Panel" identity without diluting it.
- Light mode can be added later as an enhancement if needed — CSS variables already support it.

### 4. Procedural blueprint grid background

**Choice:** Canvas-based procedural animation as an Astro island component.

**Rationale:**
- A static SVG/CSS grid would feel lifeless. Procedural animation with subtle pulsing traces communicates "living infrastructure."
- Implemented as a `<canvas>` inside a client-only Astro island — zero JS on the main thread until the island hydrates.
- Responsive: grid density and pulse effects adapt to viewport size.
- Honours `prefers-reduced-motion`: falls back to a static grid render.

**Alternatives considered:**
- **CSS-only grid**: Zero JS, but no animation. Fails to deliver the "living system" feel.
- **WebGL / Three.js**: Impressive but heavy. Overkill for a grid pattern; hurts Lighthouse scores.
- **No background**: Cleaner but loses the distinctive visual signature.

### 5. Content as typed TypeScript data (CV), MDX for /now

**Choice:** `src/content/cv.ts` exports typed arrays for experience, skills, education. `/now` is an MDX content collection entry.

**Rationale:**
- CV data changes rarely; TypeScript provides autocomplete, type-checking, and avoids parsing errors at build time.
- `/now` changes frequently; MDX in a content collection allows editing a markdown file without touching components.
- No YAML/JSON config files for content — TypeScript is the source of truth, and Astro imports it directly.

**Alternatives considered:**
- **YAML/JSON data files**: Astro supports them, but no type safety. Typos surface at runtime.
- **Headless CMS**: Adds dependency, auth, and cost. Contradicts static-first philosophy.
- **All MDX**: CV data as MDX frontmatter works but duplicates field definitions across files.

### 6. GitHub Actions for CI/CD

**Choice:** Single workflow: `astro build` → `actions/upload-pages-artifact` → `actions/deploy-pages`.

**Rationale:**
- Native GitHub Pages Actions (Official). No third-party deploy actions needed.
- Build on push to `main`. Preview deployments not needed for MVP (single contributor).
- Custom domain configured via repository settings + `CNAME` file or workflow config.

### 7. Typography

**Choice:** System font stack with monospace accents (`ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace`).

**Rationale:**
- System fonts load instantly (zero network requests, zero FOUT).
- Monospace for stat labels, section headings, and technical tags reinforces the "dashboard / CLI-adjacent" character.
- No Google Fonts dependency — keeps the site fully self-contained.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| **Blueprint canvas performance on low-end devices** | Honour `prefers-reduced-motion`, throttle animation loop with `requestAnimationFrame`, limit DPR to 2. |
| **Tailwind v4 ecosystem still maturing** | v4 is stable but community plugins may lag. We use only core utilities and custom CSS — no external Tailwind plugins needed. |
| **Canvas accessibility** | Canvas is purely decorative. All text content is HTML. Screen readers ignore the canvas. |
| **GitHub Pages cold start on first deploy** | Acceptable. Static assets cache aggressively after first load. |
| **No dark/light toggle may alienate some users** | Dark-only is intentional for identity. Light mode can be added with existing CSS variable infrastructure if feedback demands it. |

## Open Questions

- **Custom domain name**: To be decided by Luis. Configured post-MVP in repository settings.
- **Favicon / OG image design**: Needs a minimal logo or monogram. Can be a simple SVG text mark (`LMP`) with accent color.
- **PDF CV generation**: Current CV is in Typst. For MVP, link to a manually exported PDF. Post-MVP: consider `astro-pdf` or a build step to generate it.
