# Changelog

All notable changes to **published** Lexsys npm packages are documented in this
file.

Published packages: `@dalexto/lexsys-cli`, `@dalexto/lexsys-registry`. Monorepo packages
`@dalexto/lexsys-ui` and `@dalexto/lexsys-tokens` are reference-only and not published in
`0.0.1`.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Dist-tag policy: **`0.0.x`** releases publish to npm **`next`**; **`0.1.0`**
and later stable cuts target **`latest`**. See [docs/operations/DEPLOY.md](../operations/DEPLOY.md).

---

## [Unreleased]

---

## [0.0.4] - 2026-05-30

Fourth early-preview release on dist-tag **`next`**. New **Table** primitive, CLI config migration, and template-drift tooling.

### Added

- **Table** primitive — `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`; installable via `lexsys add table`
- **`lexsys reset`** — restore installed component files from registry templates with backup before overwrite; `--dry-run`, `--with-deps` for installed closure dependencies
- **`--lex-table-*`** component token namespace for table styling

### Changed

- **`lexsys.config.json` `installed`** — now a `string[]` of component names (was `Record<string, string>` per-item versions). Legacy map shapes migrate on load and are **persisted** as an array on the next config read.
- **`status` / `update`** — drift detection uses file content vs registry templates, not per-item semver.
- **Registry items** — removed per-item `version` field; manifest-level registry version unchanged.

### Migration

- Existing configs with `"installed": { "button": "0.0.1" }` load as `"installed": ["button"]` on the next CLI command that reads config (file rewritten automatically).
- Re-run `lexsys update` or `lexsys reset` when templates change after upgrading `@dalexto/lexsys`.

---

## [0.0.3] - 2026-05-28

Third early-preview release on dist-tag **`next`**. Token bug fixes, CardAction compound part, and new Empty block.

### Added

- **Empty** block — `Empty / EmptyHeader / EmptyMedia / EmptyTitle / EmptyDescription / EmptyContent`; installable via `lexsys add empty`
- **CardAction** — new `CardHeader` compound part for trailing slot actions (e.g. edit button, badge)
- `--lex-empty-*` component token namespace for zero-data state styling
- `--lex-menu-item-focus-ring-*` tokens — focus ring on individual menu items now has dedicated token variables
- `size.sidebar.width` and `size.commandPalette.list.maxHeight` semantic size tokens

### Fixed

- `meterComponentTokens` was authored but never registered — `--lex-meter-*` CSS variables now generated
- `meter.ts` used `$value` as a group key (DTCG violation); renamed to `value` — no CSS output change

---

## [0.0.2] - 2026-05-25

Second early-preview release on dist-tag **`next`**. M4 (entry + CLI DX), M8 (CLI cleanup), and M11 (compound-first API) shipped.

### Added

- **`@dalexto/lexsys`** entry package — consumers now run `npx @dalexto/lexsys@next` instead of `npx @dalexto/lexsys-cli@next`
- Command aliases: `create` (init), `a` (add), `up` (update), `ls` (list), `st` (status), `dr` (doctor), `rm` (uninstall), `reg` (registry), `cfg` (config)
- Short flag aliases: `-d` (--dry-run), `-y` (--yes), `-f` (--force), `-j` (--json), `-s` (--summary), `-C` (--cwd)
- Per-command `--help` / `-h` — each command now has its own focused help output
- Guided interactive mode for `init`, `update`, and `uninstall` when run without arguments
- Pilot blocks **SettingsPanel**, **AuthForm**, **CommandPalette** — registry + CLI installable via `lexsys add`
- Primitive variant expansion: Button `ghost`/`outline`, Badge `success`/`warning`, Card `outlined`/`elevated`/`ghost`, Input `read-only` styling

### Changed

- Global help output redesigned — commands grouped by category (Scaffold / Components / Inspect / Meta) with aliases shown inline
- Error output now uses a consistent `✗ message → suggestion` prefix across all commands; unknown commands include a "Did you mean?" hint
- **Compound-first API (M11):** all blocks and templates now export named compound parts only; config blob props removed. Migration: [UI_COMPOSITION.md § Compound-first contract](./docs/reference/ui/UI_COMPOSITION.md#compound-first-contract)

### Breaking

- **Sidebar** — `items[]` removed; use `SidebarContent`, `SidebarGroup`, `SidebarItem` compound parts
- **CommandPalette** — `items[]` / `onSelect` removed; use `CommandPaletteItem` children
- **AuthForm** — `mode` and internal field state removed; use compound shell + `FormField` parts
- **FormField** — `label="…"` config removed; use `FormFieldLabel` + `FormFieldControl` compound parts
- **SettingsPanel** — `title` / `description` / `footer` props removed; use `SettingsPanelHeader`, `SettingsPanelContent`, `SettingsPanelFooter`
- **DashboardShell** — `sidebarItems[]` removed; use `DashboardShellSidebar` slot with compound `Sidebar`
- **Switch, Slider, Progress, Checkbox** — sub-parts now exported as named compounds (`SwitchThumb`, `SliderTrack`, `SliderThumb`, `ProgressIndicator`, `CheckboxIndicator`)

### Notes

- Rebranded npm scope from `lexsys` to `@dalexto/lexsys-*`; all packages re-published under the DaLexto org
- `@dalexto/lexsys-ui` and `@dalexto/lexsys-tokens` remain reference-only; not published in this release

---

## [0.0.1] - 2026-05-24

First early-preview npm release on dist-tag **`next`** (`npx @dalexto/lexsys-cli@next`).

### Added

- **`@dalexto/lexsys-cli`** — `lexsys` binary: `init`, `add`, `update`, `uninstall`,
  `list`, `status`, `doctor`, `registry`, and related install flags
  (`--sync`, `--styles`, `--utilities`, `--force`, `--dry-run`, `--with-deps`)
- **`@dalexto/lexsys-registry`** — bundled install metadata and templates for **41
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
- `@dalexto/lexsys-ui` and `@dalexto/lexsys-tokens` are not published in this release
- Remote registry signatures and host allowlists are deferred post-M10
- npm also resolves **`latest`** to **`0.0.1`** on first publish; prefer **`@next`**
  for early-preview installs until **`0.1.0`**

[Unreleased]: https://github.com/DaLexto/lexsys-ui/compare/@dalexto/lexsys@0.0.3...HEAD
[0.0.3]: https://github.com/DaLexto/lexsys-ui/compare/@dalexto/lexsys@0.0.2...@dalexto/lexsys@0.0.3
[0.0.2]: https://github.com/DaLexto/lexsys-ui/compare/@dalexto/lexsys-cli@0.0.1...@dalexto/lexsys-cli@0.0.2
[0.0.1]: https://www.npmjs.com/package/@dalexto/lexsys-cli/v/0.0.1
