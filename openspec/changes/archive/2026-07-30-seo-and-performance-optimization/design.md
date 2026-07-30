## Context

Personal portfolio site built with Astro 7, Tailwind CSS 4, deployed to GitHub Pages. Current SEO is basic (OG tags, twitter card, canonical). Missing: structured data, sitemap, robots.txt, proper OG image, font optimization. Three inline scripts block rendering. Target: Lighthouse ≥90 Performance, ≥100 SEO.

## Goals / Non-Goals

**Goals:**
- Add schema.org structured data (Person, WebSite) via JSON-LD
- Auto-generate sitemap.xml via `@astrojs/sitemap` integration
- Serve robots.txt with sitemap reference
- Optimize font loading (preconnect + font-display: swap)
- Defer non-critical scripts to unblock first paint
- Replace SVG OG image with proper 1200×630 PNG
- Add missing meta tags (theme-color, og:image dimensions, twitter:site)
- Reduce BlueprintGrid canvas paint cost

**Non-Goals:**
- Image optimization pipeline (no dynamic images on site)
- Server-side rendering changes (static HTML via Astro, already performant)
- Third-party analytics or SEO tools
- Internationalization SEO (single language site)

## Decisions

### 1. Sitemap: `@astrojs/sitemap` integration

**Choice**: Add `@astrojs/sitemap` to `astro.config.mjs`. It auto-generates `/sitemap-index.xml` and `/sitemap-0.xml` at build time from static routes.

**Alternatives considered**:
- Manual sitemap XML: More control but adds maintenance burden. Not justified for a personal site with few routes.
- `astro-sitemap` community package: Less maintained, fewer features.

**Rationale**: First-party Astro integration. Zero config for static sites. Adds `sitemap` and `lastmod` fields to frontmatter if needed.

### 2. Structured Data: JSON-LD `<script>` tag in BaseLayout

**Choice**: Embed a `<script type="application/ld+json">` block in `BaseLayout.astro` with Person and WebSite schemas. Conditional per-page schemas handled via Astro.props or frontmatter.

**Alternatives considered**:
- Microdata/RDFa attributes on HTML elements: More invasive, ties structure to markup, harder to maintain.
- Third-party `astro-seo` package: Adds dependency for what's a simple JSON block.

**Rationale**: JSON-LD is Google's recommended format. The block is static, small (under 1KB), and lives in BaseLayout. Person + WebSite schemas cover the site's needs.

### 3. Font Loading: Preconnect + font-display: swap

**Choice**: Add `preconnect` link tags to Google Fonts CDN in `<head>`. Set `font-display: swap` in the `@font-face` declarations via the `@fontsource-variable` imports.

**Alternatives considered**:
- Self-host fonts: Already using `@fontsource-variable` which bundles font files. The `preconnect` is for the CSS fetch, not the font files themselves.
- `preload` the font files: Over-aggressive for a personal site. `font-display: swap` is sufficient.
- Subset fonts: Premature optimization for a two-font site.

**Rationale**: `font-display: swap` prevents FOIT (Flash of Invisible Text). Existing `@fontsource-variable` packages handle font file serving. Preconnect reduces CSS fetch latency.

### 4. Script Deferral: Change inline scripts to deferred

**Choice**: Change `is:inline` scripts to `defer`. The three scripts (status-bar, scroll-observer, velocity-tracker) are non-critical for initial render. `defer` executes after HTML parse, preserving execution order but not blocking first paint.

**Caveat**: Status bar shows time, scroll %, and section name. A brief delay (50-200ms) before these appear is acceptable. The BlueprintGrid canvas loads without velocity input initially, which is fine.

**Alternatives considered**:
- Keep `is:inline` but move to end of body: Still blocks parse. `defer` is strictly better.
- `type="module"`: Would require converting to ES modules. Over-engineering for three small scripts.
- `async`: Could execute out of order. `defer` preserves order.

### 5. OG Image: Replace SVG with 1200×630 PNG

**Choice**: Replace `public/monogram.svg` as the OG image with a manually generated `public/og-default.png` (1200×630). The monogram SVG remains for favicon use.

**Alternatives considered**:
- Automated OG image generation (e.g., `astro-og-canvas`, Vercel OG): Heavy dependency for one static image. Not justified.
- Keep SVG: Twitter/Facebook render SVGs inconsistently. PNG is universally supported.

**Rationale**: Social platforms require 1200×630 minimum. SVG support varies. A single static PNG updated when branding changes is the simplest path.

### 6. BlueprintGrid: `content-visibility` + `will-change`

**Choice**: Add CSS `content-visibility: auto` to the BlueprintGrid canvas container and `will-change: transform` to the canvas element. This hints the browser to skip paint work for off-screen canvas and optimize GPU layer for the animation.

**Alternatives considered**:
- Throttle canvas RAF: Could cause jank. CSS hints are zero-cost when not needed.
- Remove BlueprintGrid entirely: Degrades visual identity. The cost is acceptable with hints.

**Rationale**: `content-visibility: auto` is a `contain` hint that tells the browser to skip rendering when not visible. `will-change: transform` creates a GPU layer, reducing repaint cost during scroll.

## Risks / Trade-offs

- **[Dependency] `@astrojs/sitemap`**: Negligible risk. First-party, well-maintained, zero runtime cost (build-time only).
- **[FOUT] `font-display: swap`**: Users see system font briefly before Inter/JetBrains Mono load. Acceptable trade-off vs invisible text (FOIT).
- **[Script delay] Deferred status bar**: Status bar info appears 50-200ms after paint. Non-critical UX. Acceptable.
- **[OG image] Manual PNG**: Must regenerate if branding changes. One-time cost. Document regeneration steps in README.
- **[Build output] Sitemap + robots.txt**: Adds 2 files to `dist/`. Trivial size. No runtime impact.

## Open Questions

- None. All decisions clear. Scope is well-bounded.
