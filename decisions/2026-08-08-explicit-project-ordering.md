# Explicit Project Ordering via `order` Frontmatter

Date: 2026-08-08
Status: Accepted

## Problem

The `/projects` page orders entries using `impactScore()`, a heuristic that
ranks by `impact.length * 100` — measuring how many impact bullets were
written, not how strong they are. The function also contains an unreachable
regex branch (line 11): the regex that extracts a number from `impact[0]` can
never run, because any non-empty `impact` array returns on the preceding line.

At a curated list of approximately six projects, an automated ranking infers
editorial intent the author should be stating directly. Two of four current
entries have no quantified metrics at all, so the score has nothing comparable
to rank.

## Options Considered

1. **Keep the score, fix the dead regex branch.** Rejected. Fixing the
   unreachable branch would make the heuristic behave as originally intended
   — parse a number from the first impact line — but that only sharpens a
   mechanism that should not be deciding anything. The failure is not the
   bug; it is that an automated ranker is inferring editorial intent from
   bullet counts.

2. **Add an explicit `featured: true` flag on top of the score.** Rejected.
   Two ordering mechanisms where one suffices. `order` already exists, is
   already in the schema, and is already the tiebreaker.

3. **Sort by `order`, delete the score.** Chosen. One field, one meaning,
   visible in the frontmatter of every entry.

## Decision

Project sequence on `/projects` is determined solely by the `order`
frontmatter field, ascending. The featured hero is the entry with the lowest
`order`. No computed ranking influences display order.

The rationale is tied directly to the real constraint: the list is
hand-curated at roughly six entries, and two of four current entries have no
quantified metrics at all, so an impact-based ranking has nothing comparable
to rank.

## Supersedes

This replaces the `/projects` ordering rule recorded in
`decisions/2026-08-03-dual-accent-and-structural-redesign.md`
("Order cards strongest-quantified-impact first"). That rule was written when
the ranking was automated; it assumed quantified impact would be present and
comparable across entries.

Only that ordering rule is superseded. The following from the earlier document
all remain in force:

- The dual-accent token system (`--color-accent-identity` / copper)
- The Boot-Into-Content home structure (keep boot-first, Pattern C)
- The ExperienceModule impact-before-responsibilities flip
- The `/now` travel-log placement

## Rejected Alternatives + Why

- **Filtering on a coarser axis (`type` / `status`) instead of tags.**
  Deferred, not rejected on principle. Six cards on one page do not need
  narrowing. Building a smaller version of an unneeded control is still
  building an unneeded control.

- **Grouping cards under `type` headings.** Deferred with an explicit
  trigger: revisit when the list stops being scannable top to bottom. The
  terminal/OS identity makes grouped headings aesthetically natural, but
  restructuring the page layout for a list that currently reads fine
  flat is unnecessary overhead.

## Consequence

Adding a project now requires deciding its `order` deliberately rather than
inheriting a computed position. The value `order: 0` expresses "featured"
without a separate flag — no new frontmatter, no new branch.
