## Context

The site already has a `now` content collection (MDX glob under src/content/now) rendered through a prose-styled panel. A blog is the same pattern at scale: a second MDX collection plus listing/detail pages. Styling foundations already exist (`.prose-content` class in global.css, used by now.astro).

## Goals / Non-Goals

**Goals:**
- Working blog: collection, listing, post pages, RSS
- High-quality code blocks (highlighting, copy, line focus)
- Consistent with existing visual system (dark-first, amber accent, mono fonts)

**Non-Goals:**
- TOC + reading progress (next change)
- Homepage reframe (next change)
- Search/Pagefind (when 5+ posts exist)
- Interactive/playground posts (when there is content worth it)

## Decisions

### 1. Replicate the `now` collection pattern for `blog`

**Choice**: Add a second content collection `blog` (glob `src/content/blog/**/*.mdx`) in src/content.config.ts, same approach as `now`.

**Alternatives considered**: Digital garden with notes collection (overkill for current content volume); external CMS (static site, no need).

**Rationale**: Established pattern in this codebase, zero new architecture, consistent with how `now` works.

### 2. Post schema

title (string, required), description (string, required), pubDate (date, required), tags (string[], default []), draft (boolean, default false). Slugs come from filenames (Astro default) — same as `now`, no custom slug logic.

### 3. Draft handling

Posts with `draft: true` are excluded from listing, post pages, and RSS. Simple filter at query time.

### 4. Shiki theme

**Choice**: `github-dark-default` theme via markdown.shikiConfig.

**Alternatives considered**: Custom theme matching the exact site palette (more work, marginal gain); dual light/dark themes (site is dark-only).

**Rationale**: Readable, standard, works with the dark site. Swappable later via one config line.

### 5. Copy button: vanilla script, no dependency

**Choice**: Small script (public/scripts/copy-code.ts) that injects a copy button into code block wrappers at runtime; navigator.clipboard with fallback.

**Rationale**: ~30 lines vs a dependency. Standard pattern across dev blogs.

### 6. Line highlighting via Shiki transformer

**Choice**: `@shikijs/transformers` `transformerNotationHighlight` — `// [!code highlight]` comments in fenced code.

**Rationale**: The standard Shiki mechanism; author-facing, zero custom CSS per line.

## Risks / Trade-offs

- [Prose styling] Blog post prose must reuse `.prose-content`; verify heading sizes/colors read well for long-form.
- [RSS] Requires `site` URL (already set) and absolute links.
- [Copy button] Script must run after content renders; use defer + DOMContentLoaded.
