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

### Added

- Pilot blocks **SettingsPanel**, **AuthForm**, **CommandPalette** (registry + CLI installable)
- Primitive variant expansion: Button `ghost`/`outline`, Badge `success`/`warning`, Card `outlined`/`elevated`/`ghost`, Input `read-only` styling
- Wrapper standardization contract in [docs/UI.md](./docs/UI.md) (Base UI behavior / Lexsys styling split)

### Changed

- **Compound-first API (M11):** blocks and templates migrate to named compound parts
  only; config blobs (`items[]`, `mode`-driven auto-fields) removed. Migration table:
  [UI_COMPOSITION.md § Compound-first contract](./docs/UI_COMPOSITION.md#compound-first-contract).

### Breaking (compound-first — registry items bump to `0.0.2` when shipped)

- **Sidebar** — `items[]` removed; use `Sidebar`, `SidebarContent`, `SidebarGroup`,
  `SidebarItem`, … compound parts.
- **CommandPalette** — `items[]` / `onSelect` removed; use compound
  `CommandPaletteItem` children.
- **AuthForm** — `mode` and internal field state removed; use compound shell +
  `Field` / `FormField` parts.
- **FormField** — `label="…"` config removed; use `FormFieldLabel` +
  `FormFieldControl` compound parts.
- **SettingsPanel** — `title` / `description` / `footer` props removed; use
  compound header/content/footer parts.
- **DashboardShell** — `sidebarItems[]` removed; use `DashboardShellSidebar` slot
  with compound `Sidebar`.
- **Switch, Slider, Progress, Checkbox** — sub-parts exported as named compounds;
  bundled convenience APIs removed where applicable.

### Planned

- Stable **`0.1.0`** on dist-tag **`latest`**

---

## [0.0.1] - 2026-05-24

First early-preview npm release on dist-tag **`next`** (`npx @lexsys/cli@next`).

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
- npm also resolves **`latest`** to **`0.0.1`** on first publish; prefer **`@next`**
  for early-preview installs until **`0.1.0`**

[Unreleased]: https://github.com/DaLexto/lexsys/compare/@lexsys/cli@0.0.1...HEAD
[0.0.1]: https://www.npmjs.com/package/@lexsys/cli/v/0.0.1
