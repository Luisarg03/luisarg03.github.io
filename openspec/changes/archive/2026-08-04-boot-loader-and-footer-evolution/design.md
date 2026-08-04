## Context

The site has 2 pieces of site-wide chrome that have been
iteratively polished but lack a coherent final form.

The boot loader (`src/components/modules/BootModule.astro` +
`src/scripts/boot.js` + `src/scripts/boot-frames.js`) currently
plays on the first homepage entry as a fixed overlay with
top-anchored typing lines. Per memory #41, the top-anchored
choice was a CLS fix: typing line-by-line below a centered
position would shift every line toward the bottom and count
toward CLS. The user wants the boot centered again, with a
distinctive "impressive" visual treatment that makes the entry
to the site memorable.

The site footer (`src/layouts/BaseLayout.astro`) currently
shows a single muted meta line (`commit <hash> · <date> ·
uptime <n>d · ~/luisarg`) below a prompt line
(`~/luisarg $ git rev-parse --short HEAD`). It's centered, max-width
52rem, and lives in BaseLayout so it shows on every non-homepage
page. The user wants something more "professional" while keeping
the terminal/OS aesthetic.

## Goals / Non-Goals

**Goals:**
- Boot loader is vertically centered in the viewport, with a
  pre-line big ASCII prelude above the typing frames.
- Pre-line has a brief glitch effect (~0.5s) that settles to
  the final "luisOS" ASCII.
- Subtle scan lines on the overlay give a CRT vibe.
- Footer is a structured 2×2 metadata grid with teal keys and
  copper values, plus a live status dot and copyright.
- Both changes respect `prefers-reduced-motion: reduce`.

**Non-Goals:**
- Add new dependencies.
- Change the boot frame source content
  (`src/scripts/boot-frames.js`).
- Change the boot skip conditions (already well-tuned per
  memory #41).
- Add a real "online" status endpoint (the status is a static
  "● online" indicator).
- Change the homepage ShutdownModule footer.
- Touch the homepage or other pages' content (only the boot
  overlay and the global footer change).

## Decisions

### D1 — Pre-line prelude content: "luisOS"

The pre-line shows "luisOS" in big ASCII art (5-6 lines tall,
monospace, copper accent). This matches the existing boot frame
"Booting LuisOS v7.0.0" so the pre-line is the visual identity
of the OS that the boot loads.

**Why not the full username or a custom monogram?** "luisOS" is
the OS name (consistent with the boot's brand). A username or
custom monogram would be more specific to the person; the OS name
is more on-brand for the "portfolio as OS" identity.

**Why 5-6 lines tall, not bigger?** The pre-line is above the
typing lines (which are 8 lines). A pre-line taller than the
typing lines would dominate; a 5-6 line pre-line is balanced.

### D2 — Glitch effect: brief color-shift @keyframes

The pre-line starts with a "glitched" appearance (text rendered
in copper with text-shadow shifted in teal, looking like an
RGB-shift CRT artifact). Over ~0.5s, the glitch resolves to
the final clean copper text.

**Implementation:**
```css
@keyframes boot-prelude-glitch {
  0%   { text-shadow:  2px 0 var(--color-accent-identity), -2px 0 var(--color-accent); }
  20%  { text-shadow: -2px 1px var(--color-accent-identity),  2px -1px var(--color-accent); }
  40%  { text-shadow:  1px -1px var(--color-accent-identity), -1px 1px var(--color-accent); }
  60%  { text-shadow:  0 0 transparent, 0 0 transparent; }
  100% { text-shadow: none; }
}
.boot-prelude {
  color: var(--color-accent);
  animation: boot-prelude-glitch 0.5s ease-out 1 both;
}
@media (prefers-reduced-motion: reduce) {
  .boot-prelude { animation: none; }
}
```

**Why this approach (vs text-scramble JS):** the glitch is
purely visual (no character replacement needed), so CSS-only
is sufficient and zero-JS. The text-scramble pattern from the
IdentityModule is for character replacement; the boot pre-line
is a fixed string.

### D3 — Scan lines: repeating-linear-gradient overlay

A thin horizontal line pattern over the entire boot overlay:

```css
.boot-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent 0,
    transparent 2px,
    rgba(255, 255, 255, 0.02) 2px,
    rgba(255, 255, 255, 0.02) 3px
  );
  z-index: 1;
}
```

The `::before` pseudo-element overlays the entire boot overlay
with a subtle scan-line texture. Opacity is very low (0.02 on
white) so it doesn't compete with the text. Pointer events are
disabled so it doesn't block interaction.

**Why this approach (vs background-image or SVG):** it's pure
CSS, scales perfectly, and adapts to any container size. SVG
would add a network request and a fixed asset.

### D4 — CLS strategy: pre-line is the stable anchor

The pre-line is rendered IMMEDIATELY (synchronously) at the
center of the 100vh container. The boot frames then append
below the pre-line. The pre-line is always visible from frame
0, so the container doesn't shift as frames are added.

```html
<div class="boot-overlay">
  <pre class="boot-prelude">luisOS</pre>     <!-- always visible -->
  <div class="boot-terminal">                 <!-- grows down -->
    <div class="boot-line">...</div>
    <div class="boot-line">...</div>
  </div>
</div>
```

The container is centered (`align-items: center`) and the
pre-line is at the top of the centered content. The boot-terminal
grows downward as frames are typed. The viewport is 100vh tall,
so even with all 8 frames, the content fits without scrolling.

### D5 — Footer layout: 2×2 metadata grid + status dot

The footer has 3 visual layers (terminal-style "layering" per
the research):

**Layer 1 (primary, copper):** the `~/luisarg $ git...` prompt
**Layer 2 (muted, 2×2 grid):**
```
commit    b3c7fe6    uptime    566d
branch    main       built     2026-08-04
```
Teal keys (`var(--color-accent-identity)`), copper values
(`var(--color-accent)`), monospace, muted overall.

**Layer 3 (status + copyright):**
```
● online  ·  © 2026 Luis Meyehen Paz
```

The `●` is a teal dot (8px, `var(--color-accent-identity)`).
The copyright is muted. On the same line.

```css
.site-terminal-footer__meta {
  display: grid;
  grid-template-columns: auto auto;
  gap: var(--space-1) var(--space-6);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  opacity: 0.85;
}

.site-terminal-footer__meta-key {
  color: var(--color-accent-identity);
  font-weight: 600;
}

.site-terminal-footer__status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: var(--space-3);
}

.site-terminal-footer__status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent-identity);
  /* optional pulse, disabled under reduced motion */
}

@media (prefers-reduced-motion: reduce) {
  .site-terminal-footer__status-dot { animation: none; }
}
```

## Risks / Trade-offs

- **R1 — Pre-line ASCII art is fixed string** — if the user
  ever changes their GitHub username or OS name, the pre-line
  needs to be updated manually. **Mitigation:** add a comment
  in `BootModule.astro` noting the pre-line is the OS brand
  string.
- **R2 — Scan lines add a `::before` overlay that needs
  `z-index: 1` to sit above the background but below the
  content** — if other elements are added with z-index, this
  could conflict. **Mitigation:** document the z-index
  stacking in the BootModule comment.
- **R3 — Status dot is static "● online"** — no real endpoint
  check. The user might want a real status page later. **Mitigation:**
  the dot uses `var(--color-accent-identity)` (teal) and is
  textually labeled "online", so it's clear this is a static
  indicator until upgraded.
- **R4 — Footer layout changes from 1 line to 3 lines** —
  the new layout is taller. On mobile, it might wrap. **Mitigation:**
  the 2×2 grid collapses to 1 col on mobile automatically
  (the grid is responsive by default), and the status line
  wraps gracefully.

## Migration Plan

No data migration. No new dependencies. The boot prelude
content is a fixed string. The footer values are read from
`process.env.VITE_BUILD_*` (injected by the existing
`vite-plugin-buildinfo.js`); the static "● online" and the
copyright year are hardcoded.

Rollback: `git revert` of the change commit restores prior
state. The boot will be top-anchored again (as before), and
the footer will be a single muted meta line.

## Open Questions

None.
