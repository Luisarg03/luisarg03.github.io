# Frontend Inspiration Sources — Astro Personal Blog

Reference list for agent exploration (`explorer`, `designer` roles). Use this
when researching layout patterns, typography, color palettes, or component
structure for the Astro blog project.

## Priority order for agent crawling

1. `astro.build/showcase` — high signal, Astro-native
2. `createtoday.io/examples?platform=astro` — text-annotated design rationale (LLM-friendly)
3. `astroshowcase.com` — filterable by category/stack
4. General directories (below) — broader variety, lower signal density
5. Individual personal blogs — best explored via source inspection, not scraping

## Astro-specific directories

| Source | URL | Notes |
|---|---|---|
| Astro Showcase (official) | https://astro.build/showcase | Real sites built with Astro, official curation |
| Astro Themes | https://astro.build/themes | Filterable by category (blog/portfolio/docs) and stack (Tailwind, Vue, etc.) |
| AstroShowcase.com | https://astroshowcase.com | Community-curated, votable, filter by category |
| CreateToday.io (Astro filter) | https://createtoday.io/examples?platform=astro | Screenshots + written design rationale per site |
| CreateToday.io (Astro Blog filter) | https://createtoday.io/examples?category=blog&platform=astro | Same, scoped to blog category only |

## General web design directories

| Source | URL | Focus |
|---|---|---|
| Land-book | https://land-book.com | Landing pages/blogs categorized by style (minimal, brutalist, editorial) |
| Lapa Ninja | https://lapa.ninja | Strong personal blog/portfolio section |
| One Page Love | https://onepagelove.com | Single-page sites, good for hero section patterns |
| Godly | https://godly.website | Experimental/artistic curation |
| Httpster | https://httpster.net | Similar to Godly, indie web focus |
| Minimal Gallery | https://minimal.gallery | Minimalist sites, fits content-first blogs |

## Reference personal blogs (study via source, not scraping)

| Site | URL | Why it's relevant |
|---|---|---|
| Josh Comeau | https://joshwcomeau.com | Subtle animation, careful typography, technical writing |
| Brian Lovin | https://brianlovin.com | Clean design system, well-executed dark mode |

## Typography & color

| Source | URL | Use case |
|---|---|---|
| Typewolf | https://typewolf.com | Real-world font pairings |
| Fonts In Use | https://fontsinuse.com | Typography in editorial context |
| Realtime Colors | https://realtimecolors.com | Test palettes directly on a blog-like layout |

## Agent usage notes

- Prefer sites with visible/inspectable source (Astro's static output makes
  this easy) over screenshot-only galleries when studying implementation.
- CreateToday.io entries include written rationale — better raw material for
  an LLM to summarize than pure image galleries.
- When proposing a design direction, cite 2–3 concrete reference sites from
  this list rather than generic descriptors ("modern," "clean").
