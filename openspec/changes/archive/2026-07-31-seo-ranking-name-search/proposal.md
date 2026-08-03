## Why

El sitio tiene SEO técnico sólido (JSON-LD, sitemap, meta tags, Lighthouse SEO 100) pero no rankea #1 para "Luis Meyehen Paz". El nombre aparece en `<title>` y JSON-LD pero NO en un `<h1>` semántico. Sin H1, Google no recibe señal fuerte del tema principal. Además, el sitio no está registrado en Google Search Console ni Bing Webmaster Tools, y no tiene backlinks desde los perfiles que ya rankean para el nombre (LinkedIn, GitHub).

## What Changes

- Cambiar `<span class="neofetch-user">` a `<h1 class="neofetch-user">` en Hero.astro (mismo estilo visual, ahora semántico)
- Documentar pasos manuales para Google Search Console (submit sitemap, request indexing)
- Documentar pasos manuales para Bing Webmaster Tools (para aparecer en DuckDuckGo)
- Documentar estrategia de backlinks desde LinkedIn, GitHub, y otros perfiles

## Capabilities

### New Capabilities
- `h1-semantics`: La página principal debe tener un `<h1>` visible con el nombre completo "Luis Meyehen Paz"

### Modified Capabilities
<!-- None. Esta es una mejora de implementación, no cambia requerimientos de specs existentes. -->

## Impact

- `src/components/sections/Hero.astro`: `<span>` → `<h1>` con misma clase y estilos
- Ningún cambio visual. Solo mejora semántica para search engines.
