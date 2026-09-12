## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Versioning

Releases are annotated git tags (`vX.Y.Z`, Semantic Versioning) and every release updates
`CHANGELOG.md` (Keep a Changelog format) plus `package.json` `version`.

When finishing a unit of work that ships:

1. Move the relevant entries from `## [Unreleased]` into a new version section in `CHANGELOG.md`.
2. Sync `package.json` `version` with the tag.
3. Commit, then `git tag -a vX.Y.Z -m "<summary>"` and `git push origin main --follow-tags`.

Full convention and bump rules: README → "Releases & versioning".

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
