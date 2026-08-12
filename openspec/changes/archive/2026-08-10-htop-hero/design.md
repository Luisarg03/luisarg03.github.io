# htop as hero — design

## Window anatomy (HtopWindow.astro)

- Frame: border 1px surface token, copper corner accents (existing panel pattern), background --color-surface.
- Title bar: `luisarg@cloud:~$ htop — <name>, <role> @ <company>` (mono, muted; name/role/company from siteConfig/cv data).
- Column header row: PID | USER | CPU% | MEM% | COMMAND (mono, muted, tabular-nums, sticky within window if rows overflow).
- Rows: 9 total. Row 000 identity: USER=root, CPU=MEM=100, COMMAND=`<name> — <role> @ <company>`, teal highlight (background/border), H1 element in DOM (mono styling, SEO/ATS). Rows 001-008: USER=luis, CPU=proficiency/5*100, MEM=proficiency*0.8+jitter (fixed per category), COMMAND=category name with tf diff prefix (`~` proficiency>=4, `=` proficiency<4 — all 8 are currently >=4 so all `~`).
- Status bar (bottom of window): `Tasks: 9 total, 8 running` | Mem bar | `up <years> <months>` (computed from real experience data; same source as ExperienceModule uptime).
- Bars: copper gradient fill for CPU, teal for MEM; bar cell = track (surface lighter) + fill (token color), transition width 0.3s ease.

## Data mapping

- Rows = identity + skillCategories (cv.ts), POSITIONAL like FileSystem.ts skillFiles (constraint #50: keep 8 categories in sync).
- CPU% = Math.round((proficiency / 5) * 100); identity always 100.
- MEM% = Math.round(CPU * 0.8 + jitter[i]) with jitter fixed per index (e.g. [0,0,0,-5,-5,-10,0,-5,-10] clamped 0-100) — deterministic, no randomness at render.
- Uptime: same computation already used in ExperienceModule.

## Responsive

- >=768px: full 5-column table.
- <768px: drop USER and MEM% columns; each row: PID + COMMAND on one line, CPU bar line, MEM bar line under it (smaller). Status bar stays. No horizontal scroll.

## Handoff animation spec

- boot-frames.js: last frame text becomes `[ OK ] htop --sort=cpu`.
- boot.js: initBootSequence onComplete → new handoff: (1) 0.5s pause, (2) overlay fade-out 0.5s (existing class), (3) htop window visible with bars at 0%, (4) bars fill to target sequentially: bar i starts at i*100ms, 0.3s width transition each, (5) status bar fades in at end (~0.2s). All inside the existing orchestrated sequence; single timing function; skip does not skip bars.
- prefers-reduced-motion: overlay hidden instantly (existing), bars rendered at target width with no transition (media query `transition: none`).
- No-JS fallback: window renders fully filled, no animation (static state) — same as reduced-motion.
- Constraint #46/#47: shared JS stays in src/scripts/ loaded via ESM side-effect imports from .astro script blocks; if astro check fails on new cross-directory imports, sibling .d.ts + localized @ts-ignore (existing workaround).

## Interaction (minimal, v1)

- Rows: CSS hover highlight only (background tint), focus-visible outline on the window for keyboard users. NO JS click behavior, NO chevron affordance implying expandability (drop `▸` glyphs from the plan — no interaction to expand).
- Palette: `cd /identity` and `cd /skills` scroll to the htop window anchor (id on window); `cd /experience` unchanged.

## SEO/ATS

- Row 000 is the single H1 (`<h1>` with mono detail-row styling) — same guarantee as today (name crawlable, deliberately not display-scale). Host details section may use h2 for section semantics; section labels use Clash Display only OUTSIDE the window.
