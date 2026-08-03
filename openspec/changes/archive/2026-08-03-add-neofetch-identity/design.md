## Context
The owner asked to bring back the neofetch-style identity card that the boot-into-content redesign removed (breaking change "neofetch/marquee removed"). The pre-redesign card was a metaphor: rows mapped to profile fields (OS = role, Host = location, Kernel = years, Uptime = company) with Arch ASCII art. The owner chose the metaphorical persona over the real machine (hiro03@archlinux + real specs were offered) to keep the site's single voice: luis@cloud.

## Goals
- Decorative neofetch card in IdentityModule: Arch ASCII art + two info boxes + user line
- Persona-mapped rows referencing cv.ts/siteConfig where the data exists; playful rows hardcoded
- Identity comprehension preserved: name, role, years, company, location in the first viewport at 1440x900 AND 390x844
- Static HTML: no JS, no system queries, reduced-motion/no-JS safe by construction
- No new dependencies

## Non-Goals
- No real machine data (no hiro03@archlinux, no live system queries)
- No change to boot overlay, skills, experience, or other modules
- No new JS behaviors

## Decisions

D1 — Card placement: inside IdentityModule, as a full-width block BELOW the identity content (after `.identity-content`, still inside `section#identity`; name, labels, summary, contacts stay first and untouched). Card interior: art LEFT + info RIGHT side by side at ≥640px (`grid-template-columns: auto minmax(0, 1fr)`); below 640px the card stacks with the art ABOVE the info (art stays visible — it is ~40 cols wide and fits 390px at `--text-xs`). The designer lane resolves the exact composition at implementation; the spec constraint (first-viewport comprehension at all widths) is binding.

D2 — Persona row mapping (owner-specified at rework; colons are real text in the markup so copy-paste reads `OS : Cloud Engineer`):
```
luis@cloud
OS     : Cloud Engineer                  <- cv.ts role
Host   : Lima, PE                        <- cv.ts location
Kernel : 7+ years building platforms     <- cv.ts yearsExp
Uptime : <current company>               <- cv.ts experience (active role)
```
One bordered info box (not two); all rows reference cv.ts values (no duplication); no playful/hardcoded rows.

D3 — ASCII art: the Arch logo provided by the owner (verbatim below), static <pre> element, copper accent (var(--color-accent)), aria-hidden="true", monospace stack. Visible at ALL viewport widths; at the 640-719px band the art font-size drops to 10px so art + info still fit side by side.

<pre>
                    -`
                   .o+`
                  `ooo/
                 `+oooo:
                `+oooooo:
                -+oooooo+:
              `/:-:++oooo+:
             `/++++/+++++++:
            `/++++++++++++++:
           `/+++ooooooooooooo/`
          ./ooosssso++osssssso+`
         .oossssso-````/ossssss+`
        -osssssso.      :ssssssso.
       :osssssss/        osssso+++.
      /ossssssss/        +ssssooo/-
    `/ossssso+/:-        -:/+osssso+-
   `+sso+:-`                 `.-/+oso:
  `++:.                           `-/+/`
  .`                                 `/`
</pre>

D4 — Boxes: border var(--color-border), keys copper, values var(--color-text), mono, aligned columns (grid or pre), consistent with existing module tokens.

D5 — No JS: purely static server-rendered markup; crawlers see it, no-JS and reduced-motion render it identically.

D6 — Accessibility: the card is aria-hidden (decorative); the semantic identity content (h1 name, labels, contact links) is unchanged and remains the accessible/semantic source.

## Risks / Trade-offs
- Displacement of first-viewport comprehension: mitigated by the binding spec constraint + playwright assertions at 1440x900 and 390x844 (name, labels, contact above the fold).
- Persona drift (playful rows aging): rows are static; acceptable for a portfolio artifact; easy to edit in one file.
- ASCII overflow on narrow screens: ASCII hidden <640px; rows-only card fits 390px.
- None of the changes affect boot, transitions, or other modules.

## Migration
- Single-file change (IdentityModule.astro) + home-hero spec delta; rollback = revert the component file and remove the delta.
- No dependency, config, or script changes.

## Open Questions
- Final playful row wording (Packages/Resolution/DE/Terminal/GPU/Memory) — owner checkpoint at implementation.
- Exact desktop composition (side rail vs inline) — designer resolves within D1 constraints.
