## 1. Site Configuration

- [x] 1.1 Install `@astrojs/sitemap` and add integration to `astro.config.mjs`
- [x] 1.2 Create `public/robots.txt` with sitemap reference and `Allow: /` directive

## 2. Meta Tags

- [x] 2.1 Add `og:image:width` (1200) and `og:image:height` (630) meta tags to `BaseLayout.astro`
- [x] 2.2 Add `twitter:site` and `twitter:creator` meta tags to `BaseLayout.astro`
- [x] 2.3 Add `<meta name="theme-color" content="#0a0a0f">` and `<meta name="color-scheme" content="dark">` to `BaseLayout.astro`

## 3. Structured Data (JSON-LD)

- [x] 3.1 Define Person and WebSite JSON-LD data in `BaseLayout.astro` frontmatter
- [x] 3.2 Render JSON-LD `<script type="application/ld+json">` block in `<head>`

## 4. Font & Asset Optimization

- [x] 4.1 Add `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com` to `BaseLayout.astro`
- [x] 4.2 Ensure `font-display: swap` is applied in global CSS font declarations

## 5. Script Deferral

- [x] 5.1 Change `is:inline` to `defer` on status-bar.js script tag in `BaseLayout.astro`
- [x] 5.2 Change `is:inline` to `defer` on scroll-observer.js script tag in `BaseLayout.astro`
- [x] 5.3 Change `is:inline` to `defer` on velocity-tracker.js script tag in `BaseLayout.astro`

## 6. OG Image

- [x] 6.1 Generate a 1200×630 PNG OG image from the monogram SVG
- [x] 6.2 Place the PNG as `public/og-default.png` and update `og:image` and `twitter:image` URLs in `BaseLayout.astro`

## 7. BlueprintGrid Performance

- [x] 7.1 Add `content-visibility: auto` CSS to BlueprintGrid container
- [x] 7.2 Add `will-change: transform` CSS to BlueprintGrid canvas element

## 8. Verification

- [x] 8.1 Run `astro build` and verify `dist/sitemap-index.xml`, `dist/sitemap-0.xml`, and `dist/robots.txt` exist
- [ ] 8.2 Validate JSON-LD output with Google Rich Results Test
- [x] 8.3 Run `astro check` to verify no TypeScript errors
- [x] 8.4 Run Lighthouse audit and confirm Performance ≥90 and SEO ≥100
<!-- 8.2 requires external Google Rich Results Test: https://search.google.com/test/rich-results -->
