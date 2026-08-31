# Luis Meyehen Paz — Portfolio

Personal portfolio site for **Luis Meyehen Paz**, MLE Platform Engineer (Interbank · MLE Plataforma).

## Stack

![Astro](https://img.shields.io/badge/Astro-7.1.6-FF5D01?logo=astro&logoColor=white&style=flat)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178C6?logo=typescript&logoColor=white&style=flat)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.3-06B6D4?logo=tailwindcss&logoColor=white&style=flat)
![MDX](https://img.shields.io/badge/MDX-7.0.5-1B1F24?logo=mdx&logoColor=white&style=flat)
![Node.js](https://img.shields.io/badge/Node.js-22-5FA04E?logo=nodedotjs&logoColor=white&style=flat)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-deploy-2088FF?logo=githubactions&logoColor=white&style=flat)
![OpenDesign](https://img.shields.io/badge/OpenDesign-0.20.2-blueviolet?style=flat)
![DeepSeek Harness](https://img.shields.io/badge/DeepSeek%20Harness-0.1.0--rc.7-4D6BFE?style=flat)

- [Astro](https://astro.build) (TypeScript strict, `astro:check`)
- [Tailwind CSS](https://tailwindcss.com) v4 (CSS-first, `global.css` tokens `oklch`)
- [@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/) for `/now`
- Fonts: JetBrains Mono Variable + Inter Variable (self-hosted) + Clash Display (public/fonts)
- Prototypes: [OpenDesign](https://github.com/nexu-io/open-design) (`prototype/`)
- Built with [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (OpenSpec workflow)
- Deployed to GitHub Pages via GitHub Actions (`luisarg03.github.io`)

## Local development

```sh
npm install
npm run dev        # astro dev (http://localhost:4321)
npm run build      # production → dist/
npm run check      # astro check + tsc
```

> Dev server se gestiona con `astro dev --background` desde la raíz (`astro dev stop|status|logs`).

## Project structure

```
src/
├── content/
│   ├── cv.ts                 # Source of truth: experience (7), skills (8 cats), education, siteConfig
│   ├── now/now.mdx           # /now page (focus cards + prose)
│   └── projects/*.mdx        # 5 projects (tabimichi featured + obsidian-second-brain, sagemaker-cicd-poc, opendashboard, nexocode)
├── components/
│   ├── layout/               # BaseLayout, SessionBar, BlueprintGrid, PageFoot, SectionPanel
│   ├── modules/              # BootModule, ExperienceModule, HostHeader, HtopWindow, MotdModule, ShutdownModule
│   ├── terminal/             # TermWindow, Shell, Prompt, Output, FileSystem.ts, CommandParser.ts
│   ├── ui/                   # Card, CommandPalette, StatusIndicator
│   └── workspace/            # WorkspaceBar
├── pages/
│   ├── index.astro           # ~/luisarg hero + neofetch
│   ├── experience.astro      # journalctl
│   ├── skills.astro          # htop (curated 6, honest AI Engineering desc)
│   ├── projects.astro        # showcase (covers + TermWindow)
│   ├── now.astro             # focus cards from now.mdx
│   ├── terminal.astro        # LuisOS
│   └── contact.astro         # shutdown
├── styles/
│   └── global.css            # Design tokens (bg oklch 16% 0.014 258, accent cobre, accent-2 teal) + Tailwind
├── content.config.ts         # now + projects collections (zod)
├── scripts/                  # boot.js + boot-frames.js (22 frames → trimmed to ~16 at 150ms in spec)
└── layouts/BaseLayout.astro  # dual layout (session vs blueprint), ClientRouter, OG, JSON-LD, scroll-observer + copy-code
public/
├── cv.pdf, CNAME, og-default.png
├── fonts/clash-display/
└── scripts/scroll-observer.js, copy-code.js
openspec/                      # OpenSpec changes/specs/archive (spec-driven)
```

## Updating content

- **CV / experience / skills** → `src/content/cv.ts` (single source; `experience.astro`/`skills.astro` copy is curated but must stay honest — no MCP in prod, no invented metrics)
- **/now page** → `src/content/now/now.mdx` + update `updated:` date
- **Contact / availability / positioning** → `siteConfig` in `src/content/cv.ts`
- **Projects** → `src/content/projects/*.mdx` + `src/assets/projects/`
- **Styling** → `src/styles/global.css` (tokens) + Tailwind utility classes

## Content honesty rules (from memory)

- No inventar métricas: impacto en Interbank es feedback DS, no números. Audiencia ~10+ DS, no “adopted by 10+”.
- MCP no existe en prod Interbank — queda en labs personales (opencode/deepseek-harness).
- Interbank hoy es MLE Plataforma (~8 + 1 lead), no “Cloud Platform Engineer” genérico — rol real: MLE Platform Engineer (entry 10/2023 como Data Engineer).
- `siteConfig.availability`: `Open to senior cloud / platform roles — notice: immediate`.

## Custom domain

Replace the placeholder in `public/CNAME` with your domain, then configure DNS and GitHub Pages settings.
