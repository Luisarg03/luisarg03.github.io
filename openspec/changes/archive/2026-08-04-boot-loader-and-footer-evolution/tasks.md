## 1. Update boot loader for centered layout with pre-line

- [x] 1.1 In `src/components/modules/BootModule.astro`, change
  the `.boot-overlay` rule from `align-items: flex-start` to
  `align-items: center` and update the `padding` to
  `var(--space-12) var(--space-6)` (centered, no top offset)
- [x] 1.2 Add a `<pre class="boot-prelude">luisOS</pre>` element
  INSIDE `.boot-overlay`, BEFORE the `<div class="boot-terminal">`
  block. The pre-line shows "luisOS" in big ASCII art
  (5-6 lines tall, monospace, copper accent, centered)
- [x] 1.3 Add CSS for `.boot-prelude`: monospace, centered
  text, copper color (`var(--color-accent)`), font-size larger
  than the boot-terminal text (e.g., 14-18px), padding-bottom
  to separate from the boot-terminal
- [x] 1.4 Add the glitch effect `@keyframes boot-prelude-glitch`
  with text-shadow shifts in copper and teal, applied to
  `.boot-prelude` via `animation: boot-prelude-glitch 0.5s
  ease-out 1 both`
- [x] 1.5 Add a `@media (prefers-reduced-motion: reduce)` block
  that disables the glitch animation
- [x] 1.6 Add scan lines via `.boot-overlay::before` with a
  `repeating-linear-gradient` (1-3px lines, very low opacity
  like 0.02-0.04 white), `position: absolute; inset: 0;
  pointer-events: none; z-index: 1`
- [x] 1.7 Verify the layout has no CLS: the pre-line is
  rendered synchronously, the boot frames type below it, and
  the total content fits within 100vh

## 2. Update site footer to 2×2 metadata grid + status dot

- [x] 2.1 In `src/layouts/BaseLayout.astro`, REPLACE the
  current footer markup (lines 179-186) with the new
  structured version:

```astro
<footer class="site-terminal-footer">
  <div class="site-terminal-footer__prompt">
    ~/luisarg $ git rev-parse --short HEAD
  </div>
  <div class="site-terminal-footer__meta">
    <span class="site-terminal-footer__meta-key">commit</span>
    <span class="site-terminal-footer__meta-val">{buildCommit}</span>
    <span class="site-terminal-footer__meta-key">uptime</span>
    <span class="site-terminal-footer__meta-val">{buildUptime}d</span>
    <span class="site-terminal-footer__meta-key">branch</span>
    <span class="site-terminal-footer__meta-val">main</span>
    <span class="site-terminal-footer__meta-key">built</span>
    <span class="site-terminal-footer__meta-val">{buildDate}</span>
  </div>
  <div class="site-terminal-footer__status">
    <span class="site-terminal-footer__status-dot" aria-hidden="true"></span>
    <span>online</span>
    <span>·</span>
    <span>© 2026 Luis Meyehen Paz</span>
  </div>
</footer>
```

- [x] 2.2 REPLACE the existing `.site-terminal-footer__meta`
  CSS rule with a grid-based layout:
  - `display: grid; grid-template-columns: auto auto;`
  - `gap: var(--space-1) var(--space-6);`
  - `font-family: var(--font-mono); font-size: var(--text-xs);`
  - `opacity: 0.85; justify-content: center;`
- [x] 2.3 ADD CSS for `.site-terminal-footer__meta-key`:
  `color: var(--color-accent-identity); font-weight: 600;
  text-align: right;` (or use grid alignment)
- [x] 2.4 ADD CSS for `.site-terminal-footer__meta-val`:
  `color: var(--color-accent);`
- [x] 2.5 ADD CSS for `.site-terminal-footer__status`:
  `display: flex; align-items: center; justify-content: center;
  gap: var(--space-2); margin-top: var(--space-3); font-family:
  var(--font-mono); font-size: var(--text-xs); color:
  var(--color-text-muted);`
- [x] 2.6 ADD CSS for `.site-terminal-footer__status-dot`:
  `width: 8px; height: 8px; border-radius: 50%; background:
  var(--color-accent-identity); display: inline-block;` (no
  animation by default; respect reduced motion if pulse added)
- [x] 2.7 Verify the footer layout: 3 visual layers (prompt,
  2×2 grid, status+copyright), all centered, no overflow
  on mobile (the 2×2 grid collapses to 1 col on small
  viewports automatically)

## 3. Visual verification

- [x] 3.1 Start the dev server
  (`./node_modules/.bin/astro dev --background`) and capture
  a desktop screenshot at 1440x900 of `/` to
  `/tmp/opencode/qa-homepage/boot-fv-desktop-1440x900.png`.
  The boot should be centered with the pre-line visible and
  the typing frames below
- [x] 3.2 Capture a mobile screenshot at 390x844 of `/` to
  `/tmp/opencode/qa-homepage/boot-fv-mobile-390x844.png`. The
  boot should still be centered (maybe smaller pre-line)
- [x] 3.3 Capture a desktop screenshot at 1440x900 of
  `/projects` to
  `/tmp/opencode/qa-homepage/footer-fv-1440x900.png`. The
  footer should show 3 layers (prompt, 2×2 grid, status+copy)
- [x] 3.4 Capture a mobile screenshot at 390x844 of
  `/projects` to
  `/tmp/opencode/qa-homepage/footer-fv-390x844.png`
- [x] 3.5 Verify the screenshots: boot is centered, pre-line
  visible, frames type below; footer has 3 layers; no CLS
  on either page; animations disabled under reduced motion
- [x] 3.6 Stop the dev server
  (`./node_modules/.bin/astro dev stop`)
- [x] 3.7 Run `./node_modules/.bin/astro check` to confirm
  no TypeScript or template errors

## 4. Spec sync

- [x] 4.1 APPEND the delta spec's `## MODIFIED Requirements`
  and `## ADDED Requirements` blocks to
  `openspec/specs/visual-system/spec.md` (read the file
  first, then append after the existing content, with a single
  blank line separator)
- [x] 4.2 Verify the totals in the main spec after the append:
  - 1 MODIFIED requirement (Site footer is terminal-style,
    with 4 scenarios)
  - 2 ADDED requirements (Boot loader is centered with
    pre-line prelude, with 5 scenarios; the
    boot-modifications and the glitch are the same
    requirement)
  - Total: 1 MODIFIED + 2 ADDED = 3 changed requirements
