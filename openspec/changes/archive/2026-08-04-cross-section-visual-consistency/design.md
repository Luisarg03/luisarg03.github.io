## Context

The site is post-`projects-rich-showcase` (commit 3a48c07) with a
polished `/projects` page, but visual consistency across sections
has drifted:
- IdentityModule packs 8 elements (art, 5 detail rows, MOTD,
  summary, contact) into a 2-col hero where the art is in the
  left column and everything else is in the right column. The
  right column ends up visually dense and the art extends well
  below the data.
- `/now` and `/projects` use different card primitives
  (Tailwind utility classes vs custom `.project-card`).
- The site footer in `BaseLayout.astro` is a simple copyright
  line; `/projects` ships a separate terminal-style footer with
  build metadata; `/now` has no footer.

## Goals / Non-Goals

**Goals:**
- Restructure the IdentityModule into 3 visually distinct
  blocks: the hero (art + 5 detail rows), the MOTD block
  (prompt + summary), the contact block (prompt + tiles).
- Trim the Arch ASCII art to 8 lines (recognizable shape,
  matches the visual weight of the 5 detail rows).
- Center the data column vertically against the art's height
  in the hero grid.
- Extract a shared `<Card>` component and use it in both
  `/now` and `/projects` so they share the same chrome.
- Replace the simple site footer in `BaseLayout.astro` with the
  terminal-style footer (commit + date + uptime + cwd), so
  every page (including `/now` and the homepage) gets the same
  footer.
- Bump `/projects` grid gap from `var(--space-4)` / `var(--space-5)`
  to `var(--space-6)` / `var(--space-8)` for more breathing
  room between cards.

**Non-Goals:**
- Add a new visual primitive beyond `<Card>` (no Button,
  Modal, Tabs, etc. — only what's needed now).
- Touch the content of any project MDX files.
- Add a new section or page.
- Change the homepage's `ShutdownModule` behavior (the
  homepage still uses `ShutdownModule` instead of the global
  footer; the `hideFooter` flag preserves this).
- Re-architect the project's CSS into a separate system
  (the existing `visual-system` already covers primitives).

## Decisions

### D1 — Card component: slot-based with 2 variants

`Card.astro` is a thin wrapper over the existing `.panel
.card-accent-top` classes. It takes a `variant` prop
(`'project' | 'status'`) and a default `<slot />`.

```astro
---
interface Props {
  variant?: 'project' | 'status';
  class?: string;
}
const { variant = 'project', class: className = '' } = Astro.props;
const classes = ['panel', 'card-accent-top', `card--${variant}`,
  className].filter(Boolean).join(' ');
---
<div class={classes}>
  <slot />
</div>

<style>
  .card--project {
    padding: var(--space-5);
    /* ...hover lift, shadow, top accent... */
  }
  .card--status {
    padding: var(--space-4);
    /* ...static, compact... */
  }
</style>
```

**Why a thin wrapper, not a from-scratch component:** the
existing `.panel` class from `visual-system` already encodes
the surface tone, border, and corner accents. Wrapping it
preserves the visual-system spec compliance and avoids
duplicating tokens.

**Why `variant` prop, not a class prop:** `variant` is a
closed enum (the project has 2 card types today). A class prop
would let consumers pass arbitrary classes and drift the visual
system over time.

**Why slot, not a structured children API:** the card content
varies wildly (status + progress bar; title + meta + summary +
links; terminal window + status + meta + impact). A slot is
the most flexible without forcing a structured API.

### D2 — Unified footer in BaseLayout

The terminal-style footer (added in `projects-rich-showcase`)
moves from `projects.astro` to `BaseLayout.astro`. The
`hideFooter` flag is preserved (it suppresses the footer on
the homepage where `ShutdownModule` renders instead).

The footer markup:
```astro
{!hideFooter && (
<footer class="site-terminal-footer">
  <div class="site-terminal-footer__prompt">
    ~/luisarg $ git rev-parse --short HEAD
  </div>
  <div class="site-terminal-footer__meta">
    commit {commit}  ·  {buildDate}  ·  uptime {uptime}d  ·  ~/luisarg
  </div>
</footer>
)}
```

**Why preserve `hideFooter`:** the homepage ends with
`ShutdownModule` (a custom end-of-page sequence). Showing a
duplicate terminal footer below it would be redundant.

**Why move to BaseLayout, not duplicate per-page:** the
terminal footer reads `process.env.VITE_BUILD_*` (injected by
the existing `vite-plugin-buildinfo.js`). It applies to the
WHOLE site, not to a specific page. Per-page duplication would
need a per-page env read or a shared layout component; the
BaseLayout is the natural home.

### D3 — IdentityModule 3-block restructure

The IdentityModule becomes 3 sibling blocks within
`.identity-content`:

```astro
<div class="identity-content">
  <p class="identity-prompt">$ whoami</p>

  <div class="identity-hero">  <!-- block 1: hero -->
    <pre class="identity-art">...</pre>
    <div class="identity-info">
      <h1 class="identity-detail-row">Name : ...</h1>
      <div class="identity-detail-row">Role : ...</div>
      <!-- 5 detail rows total -->
    </div>
  </div>

  <div class="identity-motd">  <!-- block 2: MOTD -->
    <p class="identity-prompt">$ cat /etc/motd</p>
    <p class="identity-summary">...</p>
  </div>

  <div class="identity-contact">  <!-- block 3: contact -->
    <p class="identity-prompt">$ ls /contact/</p>
    <div class="identity-contacts">...</div>
  </div>
</div>
```

**Why 3 blocks, not 2 or 4:** the user described the desired
shape as "3 vertical sections: art+data, MOTD, contact".
The hero is the visual identity; MOTD is the system message;
contact is the action set. Three is the natural split.

**Why H1 stays in the data column:** the H1 is semantically
"the page's primary heading". It must stay visible. The
`.identity-info` block is the only place where the H1 reads
naturally (alongside the other detail rows).

### D4 — ASCII art trimmed to 8 lines

The current Arch art is 18 lines. The visual weight is
mismatched with the 5 detail rows. The trimmed version keeps
the recognizable Arch shape at a tighter scale:

```
        -`
        .o+`
       `ooo/
      `+oooo:
     `+oooooo:
     -+oooooo+:
   `/:-:++oooo+:
  `/++++/+++++++:
```

**Why trim instead of center-align only:** the user requested
both "same length" and "well aligned". Trimming reduces the
visual disparity; centering keeps the result balanced if
future content is added.

**Why 8 lines:** the original 18 lines have progressive
detail (the inner shading `.ooosssso++osssssso+` etc.). The
trimmed 8 lines keep the outline + the start of the inner
fill. Recognizable as Arch, ~50% smaller.

### D5 — Hero grid `align-items: center`

The 2-col hero grid changes `align-items: start` to
`align-items: center`. With the trimmed art, the data column
is now ~6em tall and the art is ~12em tall. Centering the
data vertically in the art's column balances the visual
weight.

**Why not `align-items: stretch`:** stretching the data
column to match the art would create empty space inside the
data column (the 5 rows don't fill 12em). Centering keeps
the data compact and the art is the visual frame.

## Risks / Trade-offs

- **R1 — Card variant drift over time**: future contributors
  might add new variants without updating the visual-system
  spec. **Mitigation:** the `variant` prop is typed as a closed
  union; TypeScript errors if a new value is passed without
  being declared. The `visual-system` spec captures the
  current variants in scenarios.
- **R2 — IdentityModule restructure breaks the existing
  `h1-semantics` spec**: the H1 must remain a visible
  element with text "Luis Meyehen Paz". **Mitigation:** the H1
  detail row stays inside `.identity-info`, unchanged. The
  restructure only moves the MOTD/contact elements.
- **R3 — Footer in BaseLayout shows on `/now` and
  `/projects` but not on the homepage**: the homepage still
  ends with `ShutdownModule` and suppresses the site footer
  via `hideFooter`. The terminal-style footer is therefore
  only visible on `/now`, `/projects`, and any future
  non-homepage page. **Mitigation:** this is intentional
  (per D2). Document in the proposal.
- **R4 — ASCII art trim loses decorative detail**: the
  trimmed 8-line art is less ornate than the 18-line
  version. **Mitigation:** the user explicitly asked for the
  trim ("el mismo lasrgo"). The visual identity ("Arch
  Linux aesthetic") is preserved at a tighter scale.
- **R5 — Grid gap bump changes visual density on
  `/projects`**: the new `var(--space-6)` / `var(--space-8)`
  gap is ~1.5x larger. The page may feel less packed.
  **Mitigation:** the user requested the bump. The featured
  project (1st card, full width) anchors the visual flow.

## Migration Plan

No data migration. No new dependencies. The Card component
is the only new file; the IdentityModule restructure is
DOM-level (no behavioral change). The footer in BaseLayout
replaces the simple footer site-wide except on the homepage.

Rollback: `git revert` of the change commit restores prior
state. No state lives in a database or external service.

## Open Questions

None.
