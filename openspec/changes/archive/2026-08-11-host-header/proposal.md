# Host header section above the htop hero

## Why

The htop-hero redesign absorbed IdentityModule into the window (row 000 = name + role @ company, status bar = uptime), and the whoami detail data (Role, Experience, Current, Location) disappeared from direct view. The host details section (OS/Browser/Display/CPU/Lang) currently sits BELOW the window. Client request (2026-08-11): host details as a section ABOVE the htop window, restoring the identity detail data: Role: Cloud Engineer, Experience: 7+ years, Current: Interbank, Location: Buenos Aires, Argentina. This matches real htop grammar (system stats above the process table).

## What

1. New section ABOVE HtopWindow (id="identity"): identity detail row — `Role: <role> · Experience: <yearsExp+ years> · Current: <active company> · Location: <location>`, keys in teal (identity-detail-key grammar from pre-htop IdentityModule), mono, server-rendered (no-JS safe).
2. System line(s) in the same section: OS, Browser, Display (w x h @dprx), CPU (cores), Lang — existing JS detection moved from the below-window host details section; '—' without JS (existing behavior).
3. Remove the host details section below the window (no duplication).
4. Name stays as H1 row 000 inside the htop window (SEO/ATS decision, mono detail-row, NOT display-scale). Row expand, status bar, boot handoff unchanged.
5. Palette `cd /identity` re-points to #identity (the new section); `cd /skills` stays #htop.

## Non-goals (explicit)

- No new data fields, no new hex, no new motion (section renders statically; boot handoff unchanged).
- No changes to /now, /terminal, /projects, experience expand, skill expand.
- No runtime dependencies. Name row 000 untouched.
