# Luis Meyehen Paz — Portfolio

Personal portfolio site for **Luis Meyehen Paz**, Cloud Engineer.

## Stack

- [Astro 7](https://astro.build) (TypeScript strict)
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config)
- [@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/) for the `/now` page
- Deployed to GitHub Pages via GitHub Actions

## Local development

```sh
npm install
npm run dev        # dev server
npm run build      # production build → dist/
npm run check      # type-check
```

## Project structure

```
src/
├── content/
│   ├── cv.ts              # Typed CV data (experience, skills, education)
│   └── now/now.mdx        # /now page content
├── components/
│   ├── BlueprintGrid.astro  # Procedural canvas background
│   ├── Hero.astro
│   ├── ExperienceTimeline.astro
│   ├── SkillMap.astro
│   ├── ContactSection.astro
│   ├── SectionPanel.astro  # Bordered section wrapper
│   ├── StatCard.astro
│   └── StatusIndicator.astro
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   └── now.astro
├── styles/
│   └── global.css         # Design tokens + Tailwind import
└── content.config.ts      # Content collection schemas
```

## Updating content

- **CV / experience / skills** → edit `src/content/cv.ts`
- **/now page** → edit `src/content/now/now.mdx` and update the `updated` date
- **Contact info** → edit `siteConfig` in `src/content/cv.ts`

## Custom domain

Replace the placeholder in `public/CNAME` with your domain, then configure DNS
and GitHub Pages settings.
