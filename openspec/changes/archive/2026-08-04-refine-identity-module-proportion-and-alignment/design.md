## Context

The homepage identity module is built around an Arch ASCII art hero
(left on desktop, top on mobile) and an info column (right on desktop,
bottom on mobile) containing a large display H1 with the user's name
and a 4-row monospace detail list (Role, Experience, Current,
Location). Below the hero grid, the page has a `$ cat /etc/motd`
decorative prompt and a long summary paragraph, then a `$ ls /contact/`
prompt and a 4-tile contact link row. The contact row is the last
child of `.module-content`. The dual-accent system (decision
2026-08-03) was recently applied: teal `--color-accent-identity` for
the name + detail keys + section-label tick, copper `--color-accent`
elsewhere.

## Goals / Non-Goals

**Goals:**
- Render the name visually consistent with the other identity data
  (Role, Experience, Current, Location).
- Align the MOTD prompt + summary with the info column on desktop so
  the summary does not drift to the left.
- Preserve semantic H1 visibility (one H1, text "Luis Meyehen Paz",
  no `display: none` / `visibility: hidden`) to keep SEO/ATS
  benefits.

**Non-Goals:**
- Change the Arch art size, position, or color.
- Change the contact link row layout.
- Change the detail values, fields, or order (still Role,
  Experience, Current, Location).
- Add a new section or new module.
- Change fonts, palette, or accent tokens.

## Decisions

### D1 — Name IS the first detail row, semantically the H1

Render the name as `<h1 class="identity-detail-row">` with the same
`identity-detail-row` styling as the other 3 rows (Role, Experience,
Current, Location). The H1 element keeps semantic priority for SEO /
ATS without visual dominance. Alternatives considered:
- **A: Visually-hidden H1 + styled detail row**: rejected — the H1
  visibility requirement explicitly forbids `display: none` /
  `visibility: hidden`, and screen-reader-only H1s would weaken the
  signal.
- **B: Keep large display H1, add a separate `Name:` row below it**:
  rejected — duplicates the name and looks worse than the
  disproportion itself.
- **C: Drop H1 entirely**: rejected — the `h1-semantics` spec forbids
  it.

### D2 — MOTD prompt + summary move into the info column on desktop

On desktop, the identity grid becomes a single column on the right
that contains: name (as detail row), the 3 other detail rows, the
`$ cat /etc/motd` prompt, the summary, the `$ ls /contact/` prompt,
and the contact row. The Arch art stays on the left as the visual
counterpoint. On mobile, the layout stacks top-to-bottom (art,
name+details, MOTD prompt, summary, contact). Alternatives:
- **A: Indent the MOTD prompt + summary with `padding-left` on
  desktop**: rejected — creates a one-off indent that doesn't match
  anything else on the page and reads as a hack.
- **B: Leave the MOTD as full-width below the grid**: rejected —
  leaves the visual drift the user is reporting.

### D3 — H1 visual treatment updated in spec, not loosened

Update the `h1-semantics` spec scenario 2 ("H1 is visually identical
to previous design") to describe the new reality (H1 renders as a
detail row in the teal accent). The core requirement (single visible
H1 with the name) stays. The spec was already slightly stale (the
H1 was no longer rendered via `<span class="neofetch-user">`); this
change aligns the spec with the implementation.

## Risks / Trade-offs

- **R1 — H1 de-emphasis weakens SEO/ATS**: the H1 is still the
  name and still visible, just smaller. Crawlers/ATS systems parse
  the H1 text content; the visual size doesn't affect indexing.
  Mitigation: keep H1 as the FIRST element in the info column and
  ensure it renders the full name string.
- **R2 — Mobile layout changes**: stacking the MOTD + summary inside
  the info column on mobile must not break the existing mobile
  reading order. Mitigation: visually verify at 390x844 (per QA
  convention in memory #42) that the page still reads top-to-bottom
  in the expected order (art → name+details → MOTD prompt →
  summary → contact prompt → contact row).
- **R3 — Name size regression**: future sessions adding content
  might be tempted to make the name a large heading again. The
  spec (homepage-sections "Identity name renders as a detail row")
  prevents this; the memory bank entry about render-and-inspect
  catches it during visual verification.

## Migration Plan

No data migration, no deployment steps beyond the normal Astro build.
Rollback: `git revert` of the change commit restores prior state.

## Open Questions

None.
