## 1. Terminal shell core (Phase 1)

- [x] 1.1 Create `src/components/terminal/` directory
- [x] 1.2 Create `src/components/terminal/FileSystem.ts` with the virtual tree (home, experience, skills, now, contact, .secret)
- [x] 1.3 Create `src/components/terminal/CommandParser.ts` with tokenization (quotes, env vars, args) and command dispatch
- [x] 1.4 Create `src/components/terminal/Output.astro` for rendering command output (text, pre, HTML nodes)
- [x] 1.5 Create `src/components/terminal/Prompt.astro` with mono prompt + blinking cursor
- [x] 1.6 Create `src/components/terminal/Shell.astro` as the main container with the prompt and output buffer
- [x] 1.7 Implement core commands: `help`, `ls`, `cd`, `cat`, `pwd`, `echo`, `clear`, `whoami`
- [x] 1.8 Implement command history with localStorage persistence (last 50)
- [x] 1.9 Implement Tab autocomplete for commands and paths
- [x] 1.10 Wire keyboard handlers: Up/Down for history, Tab for autocomplete, Enter to submit
- [x] 1.11 Replace `src/pages/index.astro` content with `<Shell />`
- [x] 1.12 Verify `astro check` and `astro build` pass after Phase 1

## 2. Workspace navigation (Phase 2)

- [x] 2.1 Create `src/components/workspace/WorkspaceBar.astro` with 4 tag buttons (1:home 2:now 3:lab 4:contact)
- [x] 2.2 Add active/inactive tag styles (accent for active, muted for inactive)
- [x] 2.3 Add `Alt+1` through `Alt+4` keyboard shortcuts to switch workspaces
- [x] 2.4 Add click/tap handlers to switch workspaces
- [x] 2.5 Add per-workspace `cwd` and default `auto-run` command in workspace config
- [x] 2.6 Wire workspace 2 (now) to auto-run `cd ~/now && cat now.md` — read from existing `src/content/now/now.mdx`
- [x] 2.7 Wire workspace 4 (contact) to auto-run `cat contact.md` — output the contact details
- [x] 2.8 Workspace 3 (lab) shows a placeholder list of side projects (TBD content)
- [x] 2.9 Make workspace tags real `<button>` elements with ARIA labels
- [x] 2.10 Ensure workspace tag bar is visible above the shell on all viewports
- [x] 2.11 Verify keyboard navigation works without losing focus on the prompt

## 3. Boot sequence (Phase 3)

- [x] 3.1 Create `src/components/boot/BootSequence.astro` component
- [x] 3.2 Implement ~8 frames of POST/BIOS-style text (vendor, kernel, memory, services, target)
- [x] 3.3 Use `arch` hostname and `luis@arch` references in the boot content
- [x] 3.4 Add `setTimeout` chain to reveal each frame every ~250ms
- [x] 3.5 Total boot duration under 3s
- [x] 3.6 Add skip-on-any-input listener (keydown, click, touch)
- [x] 3.7 Respect `prefers-reduced-motion: reduce` — skip boot entirely
- [x] 3.8 Wire the boot sequence to play before the shell becomes interactive
- [x] 3.9 Verify the prompt becomes ready exactly when boot ends or is skipped

## 4. Easter eggs + polish (Phase 4)

- [x] 4.1 Implement `sudo` command — fake password prompt that always fails
- [x] 4.2 Implement `vim` command — fake vim screen with `:q` to exit
- [x] 4.3 Implement `cowsay <text>` — ASCII cow that says the text
- [x] 4.4 Implement `sl` — steam locomotive ASCII animation
- [x] 4.5 Implement `arch` — reveals the Arch philosophy / humor
- [x] 4.6 Implement `exit` — clears terminal and replays boot
- [x] 4.7 Add `.secret/` directory with hidden files (e.g., `.secret/why.txt`, `.secret/hyprland.md`)
- [x] 4.8 Implement mobile virtual keyboard helper bar (5-6 tappable command chips) for viewports < 768px
- [x] 4.9 Hide helper bar on viewports >= 768px
- [x] 4.10 Add `<noscript>` fallback with static CV data for SEO and no-JS users
- [x] 4.11 Add `prefers-reduced-motion: reduce` handling for cursor blink and command output fade

## 5. Verification (Phase 5)

- [x] 5.1 Run `astro check` — must pass with no errors
- [x] 5.2 Run `astro build` — must complete without errors
- [ ] 5.3 Spot-check the dev server with `astro dev` and verify boot → shell → commands work end-to-end
- [ ] 5.4 Verify mobile UX: workspace tags tappable, helper bar functional, prompt reachable
- [ ] 5.5 Verify keyboard shortcuts: Alt+1..4, Up/Down history, Tab autocomplete, Ctrl+L clear
- [ ] 5.6 Verify easter eggs: at least 5 hidden commands work
- [ ] 5.7 Verify noscript fallback renders CV content for crawlers
- [ ] 5.8 Verify reduced-motion behavior on the boot and cursor
- [ ] 5.9 Review the screenshots at desktop (1440px), tablet (768px), and mobile (375px)
- [ ] 5.10 Confirm no regressions in build size or load time vs the previous `refine-visual-style` baseline
