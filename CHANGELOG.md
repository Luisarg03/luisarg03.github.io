# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2026-09-12

### Changed

- The CV now downloads as `luis-meyehen-paz-resume.pdf`, matching the source document
  name instead of the old `LuisPaz-CV.pdf`. Updated across all five download paths: home,
  contact (button and link list), experience, command palette, and the `/terminal`
  `cat cv.pdf` command.

### Fixed

- `cat cv.pdf` in `/terminal` navigated to the file with `location.href`, so the browser
  saved it under the URL name (`cv.pdf`) rather than a controlled filename. It now uses a
  named download anchor, consistent with the command palette.

## [1.0.0] - 2026-09-12

First tagged release. Marks the baseline of the live **"portfolio as OS"** site: seven
screens (`/`, `/experience`, `/skills`, `/projects`, `/now`, `/contact`, `/terminal`)
rendered as OS sessions, with `SessionBar.astro` as the single source of navigation.

### Added

- `CHANGELOG.md` and annotated `vX.Y.Z` git tags to track what ships.
- `cd /projects` in the command palette — the projects screen had no jump command.

### Changed

- Downloadable CV (`public/cv.pdf`) replaced with the current MyCv output.
- Command palette "Jump" commands now mirror the `SessionBar` route table
  (`identity` → `/`, `journalctl` → `/experience`, `htop` → `/skills`,
  `projects` → `/projects`, `shutdown` → `/contact`).
- `package.json` version aligned with the release tag (`0.0.1` → `1.0.0`).

### Fixed

- `[ OK ]` boot lines on `/terminal` had lost their copper accent. The rule lived only
  in the orphaned `BootModule.astro` as `:global(.boot-ok)`, so Astro stopped emitting
  it and `boot-frames.js` markup rendered as plain text. Migrated to `Shell.astro`.
- Command palette jump commands pointed at `/#identity`, `/#htop`, `/#experience` and
  `/#contact` — anchors that no page rendered, so every jump landed at the top of the
  homepage.

### Removed

- Six orphaned components in `src/components/modules/`: `BootModule`, `HostHeader`,
  `HtopWindow`, `ExperienceModule`, `ShutdownModule`, `MotdModule`. All were unimported
  since the sessions redesign (`c865afe`) and none reached the built output (~1,876 lines).
- Dead code in `boot.js`: the `triggerBurst` noise hook (its `.boot-noise` host no longer
  exists) and the unused `{ skip }` controller return.

### Notes

- The `boot-noise-and-speed` OpenSpec change was archived as
  `2026-09-12-boot-noise-and-speed` with `--skip-specs`. Its delta described the homepage
  boot overlay, which no longer exists, so merging it would have written a false
  requirement into `boot-into-content`. The rationale is recorded in the archived
  proposal's Outcome section.

[Unreleased]: https://github.com/Luisarg03/luisarg03.github.io/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/Luisarg03/luisarg03.github.io/releases/tag/v1.0.1
[1.0.0]: https://github.com/Luisarg03/luisarg03.github.io/releases/tag/v1.0.0
