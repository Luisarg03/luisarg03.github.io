## 1. Setup

- [x] 1.1 Install @astrojs/rss and @shikijs/transformers

## 2. Blog content collection

- [x] 2.1 Add `blog` collection + schema to src/content.config.ts
- [x] 2.2 Create sample post src/content/blog/hello-world.mdx (with code blocks, one using [!code highlight])

## 3. Blog pages

- [x] 3.1 Create /blog listing page (src/pages/blog.astro)
- [x] 3.2 Create /blog/[slug] post page (src/pages/blog/[slug].astro)
- [x] 3.3 Add /blog link to BaseLayout header nav

## 4. RSS

- [x] 4.1 Create src/pages/rss.xml.ts with published posts

## 5. Code blocks

- [x] 5.1 Configure markdown.shikiConfig in astro.config.mjs (github-dark-default + transformerNotationHighlight)
- [x] 5.2 Add copy button script public/scripts/copy-code.ts and register it in BaseLayout

## 6. Verification

- [x] 6.1 Run `astro build` — no errors
- [x] 6.2 Verify /blog lists the sample post
- [x] 6.3 Verify /blog/hello-world renders with highlighted code and copy button
- [x] 6.4 Verify /rss.xml contains the post
- [x] 6.5 Verify draft exclusion (temporarily set draft: true on sample post, confirm hidden, then revert)
