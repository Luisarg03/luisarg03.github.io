## Why

The site has basic SEO (OG tags, twitter card, canonical URLs) but misses structured data, sitemap, robots.txt, and performance optimizations. Without these, search engines cannot fully understand the site content, and Core Web Vitals suffer from synchronous scripts and unoptimized assets. GitHub Pages deployment means every byte counts.

## What Changes

- Add JSON-LD structured data (Person, WebSite schemas) on relevant pages
- Generate `sitemap.xml` automatically at build time via `@astrojs/sitemap`
- Add `robots.txt` referencing the sitemap
- Optimize font loading: preconnect to Google Fonts CDN, add `font-display: swap`
- Defer non-critical inline scripts (`status-bar.js`, `scroll-observer.js`, `velocity-tracker.js`) with `defer` attribute
- Convert OG image from SVG to proper 1200×630 PNG for social previews
- Add `twitter:site` and `twitter:creator` meta tags
- Add `og:image:width` and `og:image:height` meta tags
- Add performance `<meta>` tags (theme-color, color-scheme)
- Reduce BlueprintGrid canvas paint cost via `will-change` and `content-visibility`
- Ensure all images have `alt` text and `loading="lazy"` where appropriate
- Verify Lighthouse scores improve (target: ≥90 Performance, ≥100 SEO)

## Capabilities

### New Capabilities
- `structured-data`: JSON-LD structured data across the site (Person, WebSite schemas)
- `asset-optimization`: Font loading strategy, script deferral, image optimization directives
- `site-config`: robots.txt, sitemap.xml generation via Astro integration

### Modified Capabilities
<!-- No existing specs have requirement-level changes. Implementation-only. -->

## Impact

- `src/layouts/BaseLayout.astro`: JSON-LD script tag, new meta tags, deferred scripts, font preconnect
- `astro.config.mjs`: add `@astrojs/sitemap` integration
- `public/`: replace `monogram.svg` OG image with 1200×630 PNG, add `robots.txt`
- `public/scripts/*.js`: script tag attributes change to `defer`
- `package.json`: new dependency `@astrojs/sitemap`
