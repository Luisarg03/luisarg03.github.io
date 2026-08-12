# htop as hero — first viewport redesign

## Why

The previous change (tf-diff-design) delivered semantic polish (diff prefixes, semantic tokens, display font) but the client rejected it as "nothing new" — the first viewport was unchanged. This change is the structural redesign: the first viewport becomes a real htop window. Differentiator vs the saturated terminal genre: NOT a decorative fake htop screenshot — every row maps to real data (the 8 real skill categories from cv.ts with real proficiency, 7 years of real experience as uptime), and the identity is the root process (PID 000). Copper bars instead of htop-green bars deliberately break the genre default. The diff-prefix language from tf-diff-design survives as a semantic micro-layer inside the htop rows.

## What

1. HtopWindow.astro replaces IdentityModule + SkillsModule on index.astro: window frame with title bar (identity: name, role, company), column header (PID, USER, CPU%, MEM%, COMMAND), row 000 = identity highlighted in teal (name+role+company, rendered as H1 in DOM for SEO/ATS), rows 001-008 = skillCategories from cv.ts (CPU% = proficiency/5*100, MEM% = derived: proficiency*0.8 + fixed per-category jitter — client approved), status bar (Tasks: 9 total 8 running, Mem, uptime = real years of experience).
2. Handoff animation (single orchestrated moment, extends the existing boot): boot's last frame becomes `[OK] htop --sort=cpu`; on boot complete the overlay fades (~0.5s), the htop window materializes with bars at 0% and fills to target in cascade (0.3s per bar, 100ms stagger). Total boot→hero ~4.4s. prefers-reduced-motion: instant final state (boot already instant, bars already filled, no transitions). Skip (click/key/scroll) accelerates the boot only; the bar fill still plays.
3. Mobile 390px: condensed layout — PID + COMMAND + CPU bar; MEM bar stacked under the name; USER and MEM% columns dropped. Identity row stays first and visible.
4. New "host details" section below the hero (OS, Browser, Display, CPU — the human about section), then ExperienceModule (journalctl) unchanged below.
5. Command palette `cd /identity` and `cd /skills` re-point to the htop window anchor (sections #identity/#skills disappear from the DOM).
6. Tokens: no hex changes. Diff prefixes and --color-tf-* tokens survive inside htop rows (CPU bar = copper tf-change, MEM bar = teal tf-unknown, identity highlight teal, status green reserved for status indicators, red reserved for errors). Clash Display stays for section labels OUTSIDE the window; the window is fully JetBrains Mono.

## Non-goals (explicit)

- No fake data (MEM derived approved by client; nothing else invented).
- No matrix rain, no blinking cursors, no per-row microinteractions (rows get CSS hover highlight only, no JS interactivity in v1), no new runtime dependencies.
- No changes to /now, /projects, /terminal layout. No changes to ExperienceModule content or the boot engine timing beyond the last frame + handoff hook.
- No changes to the existing hex palette or FileSystem.ts category mapping (positional sync with cv.ts stays).
