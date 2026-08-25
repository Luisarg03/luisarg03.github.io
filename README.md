# Luis Meyehen Paz — Portfolio

Personal portfolio site for **Luis Meyehen Paz**, Cloud Engineer.

## Stack

![Astro](https://img.shields.io/badge/Astro-7.1.6-FF5D01?logo=astro&logoColor=white&style=flat)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178C6?logo=typescript&logoColor=white&style=flat)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.3-06B6D4?logo=tailwindcss&logoColor=white&style=flat)
![MDX](https://img.shields.io/badge/MDX-7.0.5-1B1F24?logo=mdx&logoColor=white&style=flat)
![Node.js](https://img.shields.io/badge/Node.js-22-5FA04E?logo=nodedotjs&logoColor=white&style=flat)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-deploy-2088FF?logo=githubactions&logoColor=white&style=flat)
![OpenDesign](https://img.shields.io/badge/OpenDesign-0.20.2-blueviolet?style=flat)
![DeepSeek Harness](https://img.shields.io/badge/DeepSeek%20Harness-0.1.0--rc.7-4D6BFE?style=flat)

- [Astro](https://astro.build) (TypeScript strict)
- [Tailwind CSS](https://tailwindcss.com) (CSS-first config)
- [@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/) for the `/now` page
- Prototypes designed with [OpenDesign](https://github.com/nexu-io/open-design) (`prototype/`)
- Built and validated with [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
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
