# Refine Boot Into Overlay

## Why

The homepage boot, shipped in the archived `2026-08-03-redesign-homepage-boot` change, reads as a static, misaligned text block stuck at the top of the page instead of the animation moment it was designed to be:

- The boot is a 100svh scroll section that starts below the sticky header — its box is taller than the viewport, so the text sits "at the top" with dead space below and a forced scroll before any content
- The sessionStorage quick mode renders the boot instantly on revisits — no animation at all, just a static block
- The `[  OK  ]` marker renders after the timestamp, so message columns are ragged
- The scroll-section model sacrifices the 10-second recruiter comprehension the pre-redesign homepage had: identity requires a scroll

The owner's mental model is "an animation that plays when you enter my page" — transient, then content.

## What Changes

- The boot becomes a fixed, full-viewport overlay that plays on page entry (typing within 2.5s), then fades out revealing the page
- The whoami (identity) module becomes the actual top of the page — identity visible in the first viewport without scrolling (10-second comprehension restored)
- The overlay plays only on full page loads, first visit per session; revisits, client-side navigation, reduced motion, no-JS, and direct hash loads skip it entirely
- The sticky status bar is removed; the persistent header absorbs a `[LOADED]` indicator chip
- `[  OK  ]` lines move to the timestamp column (systemd-authentic alignment) so all boot message text starts at the same column
- Hostname unified to `luis@cloud` in the canonical engine frames (terminal page currently shows `luis@arch`)

## Capabilities

### Modified Capabilities

- `boot-into-content`: "Boot screen as first viewport" becomes an entry overlay; "Boot collapse to status bar" becomes a header loaded indicator; motion budget updated
- `home-hero`: identity hierarchy restores first-viewport visibility (10-second comprehension back); decoration budget updated for a transient overlay
- `homepage-sections`: module order — whoami first; the boot is no longer a scroll module

## Impact

- `src/components/modules/BootModule.astro` — section → fixed overlay (hidden by default, JS reveal, scroll lock, fade-out, DOM removal); scroll hint and status bar deleted
- `src/scripts/boot.js` — canonical frames: OK column alignment + `luis@cloud`
- `src/pages/index.astro` — module order (identity first); `showBootChip` prop
- `src/layouts/BaseLayout.astro` — `[LOADED]` chip in header (prop-gated, homepage only)
- Specs: deltas for `boot-into-content`, `home-hero`, `homepage-sections`
- No dependency changes; terminal page behavior unchanged (it consumes the canonical frames)
