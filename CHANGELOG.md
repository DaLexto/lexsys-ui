# Changelog

All notable changes to **published** Lexsys npm packages are documented in this
file.

Published packages: `@lexsys/cli`, `@lexsys/registry`. Monorepo packages
`@lexsys/ui` and `@lexsys/tokens` are reference-only and not published in
`0.0.1`.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Dist-tag policy: **`0.0.x`** releases publish to npm **`next`**; **`0.1.0`**
and later stable cuts target **`latest`**. See [docs/DEPLOY.md](./docs/DEPLOY.md).

---

## [Unreleased]

### Planned

- Changesets publish automation (M10.3)
- Stable **`0.1.0`** on dist-tag **`latest`**

---

## [0.0.1] - TBD

First early-preview npm release on dist-tag **`@next`**.

### Added

- **`@lexsys/cli`** — `lexsys` binary: `init`, `add`, `update`, `uninstall`,
  `list`, `status`, `doctor`, `registry`, and related install flags
  (`--sync`, `--styles`, `--utilities`, `--force`, `--dry-run`, `--with-deps`)
- **`@lexsys/registry`** — bundled install metadata and templates for **41
  primitives**, pilot **blocks** (FormField, Sidebar), and **template**
  (DashboardShell)
- Consumer starters: `lexsys init vite`, `lexsys init next` (Next.js 15.3.3 App
  Router)
- Tailwind CSS v4 wiring for Vite and Next.js consumers
- Token and theme CSS installation (`styles/tokens.css`, `styles/theme.css`)
- Flat consumer install layout under configurable `paths.components`
- Conflict-aware, idempotent installs with dry-run and scoped `--cwd`
- Remote registry manifest fetch over HTTPS with local bundled fallback

### Notes

- Early preview: breaking changes remain likely until **`0.1.0`** @ **`latest`**
- `@lexsys/ui` and `@lexsys/tokens` are not published in this release
- Remote registry signatures and host allowlists are deferred post-M10

[Unreleased]: https://github.com/DaLexto/lexsys/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/DaLexto/lexsys/releases/tag/v0.0.1
