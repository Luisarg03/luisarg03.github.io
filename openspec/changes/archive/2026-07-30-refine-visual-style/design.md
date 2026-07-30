## Context

The site is a fully interactive terminal shell — command parser, virtual filesystem, workspace tags, boot sequence. It works well functionally but looks like a raw terminal emulator: 100vh dark viewport, monospace-only typography, muted blue accent, no visual depth. The target audience includes non-technical visitors (recruiters, colleagues) who may be put off by the "hacker" aesthetic.

The data layer (`cv.ts`) stays unchanged. The shell logic (commands, navigation, history) stays unchanged. Only the surface — colors, typography, spacing, layout, and visual effects — is being refined.

## Goals / Non-Goals

**Goals:**
- Warm up the color palette — keep the dark theme but add warmth and personality
- Blend typography: use sans-serif (Inter) for headings/labels, mono (JetBrains Mono) for terminal content
- Add visual depth: glass morphism, subtle shadows, gradient accents
- Add breathing room: the shell should not feel cramped against the viewport edges
- Smooth transitions and micro-interactions
- Workspace tags should feel like modern UI tabs, not raw terminal elements
- Output rendering should use card-like containers for rich content
- Keep the shell concept — the prompt, commands, and workspace bar remain

**Non-Goals:**
- Changing the shell logic (CommandParser, FileSystem, Shell.astro script)
- Adding new commands or workspaces
- Changing the boot sequence content (only styling)
- Adding new dependencies
- Redesigning the mobile helper bar (it stays functional)
- Replacing the terminal concept with a conventional page layout

## Decisions

### 1. Color palette: warm accent over muted blue
Replace accent: `#58a6ff` (GitHub blue) → `#f0b429` (warm copper/amber). The dark background stays but with slightly warmer undertones. Keep green/red/yellow for status indicators.

**Why copper?** Warm colors feel more inviting. Blue terminal feels cold/technical. Copper signals warmth without losing the tech aesthetic (think terminal amber monitors). It's also more distinctive.

**Alternative considered:** Keep blue but increase saturation — rejected, blue is overused in dev portfolios.

### 2. Typography blend: Inter for UI, JetBrains Mono for terminal
The workspace bar, boot sequence labels, and helper chips use Inter (sans-serif). The prompt, command output, and input use JetBrains Mono. This creates visual hierarchy: "chrome" vs "content".

**Why blend?** Mono-only is fatiguing for non-devs. Sans-serif headings signal structure. The terminal content stays mono to preserve the shell identity.

**Alternative considered:** All sans-serif — rejected, loses terminal identity. All mono — rejected, too harsh for general audience.

### 3. Layout: padded container instead of edge-to-edge
Add `max-width: 960px` and centered container with padding. The shell fills the container, not the viewport. This creates breathing room and a "card" feel.

**Why container?** Full-viewport terminals feel claustrophobic on large screens. A contained layout signals "this is a designed experience" not "raw terminal output."

**Alternative considered:** Keep full viewport with more padding — rejected, still looks raw on ultrawide monitors.

### 4. Glass morphism for output cards
Rich command output (neofetch, cat experience/*.md) renders in frosted glass cards with subtle borders and backdrop blur, instead of plain monospace text blocks.

**Why glass?** It adds depth without heavy borders. The dark background shows through, preserving the terminal feel while elevating visual quality.

**Alternative considered:** Solid background cards — rejected, breaks the terminal immersion. Plain text — current state, too raw.

### 5. Workspace bar: pill tabs with icons
Replace raw monospace tags `1:home` with pill-shaped tabs using Inter font, small colored dot indicators, and smooth active transitions.

**Why pills?** They look intentional and modern. Raw `1:home` text looks like a tmux config, not a designed nav.

**Alternative considered:** Underline tabs — rejected, too generic. Keep current — too raw.

## Risks / Trade-offs

- **Risk: Losing terminal identity** — if the blend goes too far toward "normal website", the terminal concept becomes just decoration. → Mitigation: keep the prompt, cursor blink, and boot sequence unmistakably terminal.
- **Risk: Copper accent too warm** — some users may prefer cool tones. → Mitigation: keep it subtle; copper is used sparingly as an accent, not for large blocks.
- **Trade-off: Container layout on mobile** — a max-width container on small screens wastes space. → Mitigation: container is full-width on < 768px, max-width only applies on desktop.
- **Risk: Glass morphism performance** — backdrop-filter can cause rendering issues on some browsers. → Mitigation: provide solid fallback for browsers without backdrop-filter support.
