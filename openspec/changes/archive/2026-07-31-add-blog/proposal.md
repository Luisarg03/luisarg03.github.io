## Why

The site has a strong visual identity (terminal aesthetic, dark-first) and solid SEO foundation but no blog. Research on leading developer sites (Josh Comeau, Lee Robinson, Anthony Fu, Dan Abramov) shows a blog is the foundational content layer: it gives search engines fresh content, gives visitors a reason to return, and is the base every other content improvement builds on.

## What Changes

- Add a `blog` content collection (MDX) with schema: title, description, pubDate, tags, draft
- Add `/blog` listing page showing published posts (newest first)
- Add `/blog/[slug]` post page with prose styling consistent with the site
- Add RSS feed at `/rss.xml` via @astrojs/rss
- Configure Shiki syntax highlighting with a theme matching the site's dark palette
- Add a copy button to code blocks (vanilla script, no dependency)
- Enable line highlighting via Shiki notation comments (`// [!code highlight]`)
- Add `/blog` link to the header navigation
- Add one sample post to verify the pipeline

## Capabilities

### New Capabilities
- `blog`: Blog content collection with listing page, post pages, and RSS feed
- `code-blocks`: Syntax-highlighted code blocks with copy button and line highlighting

## Impact

- `src/content.config.ts`: new blog collection
- `astro.config.mjs`: markdown.shikiConfig with transformer
- `src/pages/blog.astro`, `src/pages/blog/[slug].astro`, `src/pages/rss.xml.ts`: new pages
- `src/layouts/BaseLayout.astro`: nav link
- `public/scripts/copy-code.ts`: copy button behavior
- `src/content/blog/*.mdx`: sample post
- deps: `@astrojs/rss`, `@shikijs/transformers`
