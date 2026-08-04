## 1. Restructure IdentityModule markup

- [x] 1.1 Replace the large display H1 with a first detail row that
  IS the H1, using the same `identity-detail-row` styling as the
  other 3 rows
- [x] 1.2 Move the `$ cat /etc/motd` prompt and the summary paragraph
  into the info column (after the details) on desktop; keep them
  full-width on mobile

## 2. Update IdentityModule styles

- [x] 2.1 Remove or repurpose the `.identity-name` display-scale
  styles (font-size, line-height, glow) so the H1 inherits the
  detail-row treatment
- [x] 2.2 Verify the info column grows to fit the moved content on
  desktop (no overflow, no misalignment)
- [x] 2.3 Verify the responsive breakpoint (640px) still stacks
  correctly on mobile

## 3. Update specs

- [x] 3.1 Update `openspec/specs/homepage-sections/spec.md` with 2
  ADDED requirements (name as detail row, MOTD alignment)
- [x] 3.2 Update `openspec/specs/h1-semantics/spec.md` scenario 2
  to reflect the new visual treatment

## 4. Visual verification

- [x] 4.1 Render the dev server and inspect the homepage at
  desktop 1440x900 — verify name alignment, MOTD alignment,
  info column integrity
- [x] 4.2 Render at mobile 390x844 — verify stacking order
  (art -> name+details -> MOTD prompt -> summary -> contact)
- [x] 4.3 Capture screenshots to /tmp/opencode/qa-homepage/ per
  the QA convention (fixer lane captures PNG, designer lane reads)
