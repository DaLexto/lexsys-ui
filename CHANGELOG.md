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

### Added

- **ButtonLink** primitive — link-styled button with `nativeButton={false}` preset; `lexsys add button-link` (requires `button`)

### Fixed

- **Sidebar** — mobile drawer nav links (`SidebarItemLink`, `SidebarSubItemLink`) set `nativeButton={false}` on `DrawerClose` when the host is an anchor — removes Base UI dev warning for `<a>` inside drawer close controls

---

## [0.1.3] - 2026-06-08

Token harmonization release on dist-tag **`latest`**. **TOK.7** component token slots and **TOK.8** motion duration retune across registry block and template install output — run `lexsys update --sync --styles` in consumer projects; update affected blocks (e.g. `sidebar`, `dashboard-shell`) as needed.

### Changed

- **Tokens (TOK.7)** — component token slots for Sidebar, PageHeader, DashboardShell, DataTable, CommandPalette, StatsCard, FormField, AuthForm, SettingsPageLayout, DatePicker, FilterToolbar, and Toolbar; spacing literals removed from install `*.variants.ts` in favor of `--lex-*` references
- **Tokens (TOK.8)** — motion duration tiers retuned (`surface` → 250ms, `overlayEnter` / `layout` → 350ms); overlay primitives wired to semantic motion tokens in generated CSS
- **Registry templates** — harmonized block and template install output for the components above; Sidebar shell-first row layout and control-rhythm polish (TOK.5)

### Notes

- No CLI command, config shape, or registry item ID changes — patch release on the `0.1.x` line
- Monorepo reference only: `@dalexto/lexsys-ui` and `@dalexto/lexsys-tokens` are not published; changes ship via registry templates and installed styles
- Published via Changesets changeset PR [#108](https://github.com/DaLexto/lexsys-ui/pull/108) and Version packages PR [#110](https://github.com/DaLexto/lexsys-ui/pull/110); npm **0.1.3** on **`latest`**

---

## [0.1.2] - 2026-06-07

Sidebar enterprise release on dist-tag **`latest`**. Registry templates and CLI install paths for the **Sidebar** block — run `lexsys update sidebar` (and `lexsys add collapsible separator` if missing) in consumer projects.

### Added

- **Sidebar** — `SidebarProvider` with desktop `collapsible` modes (`icon`, `offcanvas`), `SidebarCollapseTrigger`, `SidebarRail`, and `useSidebar`
- **Sidebar** — `SidebarItemBadge` with icon-collapsed dot mode; item chrome (`SidebarItemIcon`, `SidebarItemAction`, `SidebarItemShortcut`, `SidebarGroupAction`)
- **Sidebar** — nested `SidebarSubList` / sub-item links; `SidebarGroupCollapsible*` for folding whole sections; `SidebarInput` nav filter; `SidebarSeparator` section dividers
- **Sidebar** — keyboard roving focus and `aria-current` on active links; `isSidebarNavActive` pathname helper; disabled rows and `SidebarItemSkeleton`
- **Sidebar** — `side="right"` shell and logical RTL layout for accent, indent, and offcanvas
- **Tokens** — `sidebar` component tokens (`--lex-sidebar-*`, `--lex-sidebar-item-*`) and global slide motion semantics (`overlayEnter` / `overlayExit`)

### Changed

- **Sidebar** — active nav chrome uses `--lex-sidebar-item-*` (variant A accent bar), not Menu checked tokens
- **Sidebar** — mobile `SidebarMobileHeader` partition and drawer close-on-select wiring in install templates
- **Registry** — `sidebar` block declares `badge`, `button`, `collapsible`, `drawer`, `input`, `scroll-area`, `separator` dependencies

### Fixed

- **Registry block templates** — primitive `.types` import paths preserved on sync so consumer `tsc` resolves `BadgeProps`, `CollapsibleProps`, and related types after `lexsys update`

### Notes

- Monorepo reference only: `@dalexto/lexsys-ui` and `@dalexto/lexsys-tokens` are not published; changes ship via registry templates
- PulseDesk sandbox E2E (desktop nav + mobile drawer) passed before release prep
- Publish via Changesets Version Packages PR after merge to `main`

---

## [0.1.1] - 2026-06-06

Post-0.1.0 maintainer release on dist-tag **`latest`**. Documentation and release tooling only — no consumer CLI or registry behavior changes.

### Changed

- **Documentation hub** — catalog counts, cross-references, and operations docs aligned with post-0.1.0 repo layout
- **Cursor rules** — rules audit housekeeping (tech-stack trim, self-improvement scoping, stale link fixes)

### Notes

- Published via Changesets Version Packages PR #79; npm **0.1.1** on **`latest`**
- No changes to `lexsys add`, registry templates, or install output paths
- Post-publish hotfix (PR #80–#81): unified GitHub release (`lexsys@<version>`) is created whenever the version is on npm, even when Changesets fallback publish does not set `outputs.published`; `lexsys@0.1.1` release backfilled on GitHub

---

## [0.1.0] - 2026-06-06

First stable MVP release on dist-tag **`latest`**. Early-preview lane **`0.0.x`** remains on **`next`**.

### Added

- **Catalog expansion (57 installable items)** — primitives: Pagination, Breadcrumb, DatePicker; blocks: PageHeader, StatsCard, FilterToolbar, DataTable; template: SettingsPageLayout
- **CommandPalette** — Combobox-backed list wiring (replaces internal list pattern)
- **`apps/docs`** — minimal Vite static docs shell with quickstart and catalog links (`pnpm docs:dev`, `pnpm docs:build`)
- **`pnpm docs:lint`** — lightweight frontmatter and relative-link checks for `docs/**/*.md`
- **Component tokens** — dedicated namespaces for Autocomplete, Combobox, ContextMenu, Menubar, NavigationMenu, OtpField, PreviewCard, Toolbar, and CheckboxGroup; Toolbar variants use `--lex-toolbar-*`
- **Contrast pairs** — danger-on-subtle, secondary-on-overlay, secondary-on-subtle semantic pairs
- **Remote registry security** — optional manifest `checksum` verification and `registryAllowlist` in `lexsys.config.json`
- **`lexsys status --json`** — machine-readable drift output for tracked components

### Changed

- **Quick start** — stable lane uses `@dalexto/lexsys@latest`; preview `@next` remains for `0.0.x`

### Notes

- Published via Changesets after Version Packages PR #66; Release CI hotfix #67 (`NPM_CONFIG_PROVENANCE`)
- Post-publish smoke: `npx @dalexto/lexsys@latest init vite` → `add button` → `npm run build`

---

## [0.0.5] - 2026-06-02

Fifth early-preview release on dist-tag **`next`**. Registry sync automation for blocks/templates and block install import fixes.

### Fixed

- **Block and template install** — copied files no longer keep monorepo-style `@/components/primitives|blocks|templates/…` imports; CLI rewrites them to flat sibling paths under `paths.components` (e.g. `../Button/Button`)

### Changed

- **Registry package** — block and template registry items and templates stay aligned with UI source when maintainers run `registry:sync` (item metadata reconciled; `registryDependencies` inferred from template imports)

### Notes

- Maintainer workflow only: no change to consumer `lexsys add` flags beyond install output paths above
- Published via Changesets after merging this release changeset to `main`

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

[Unreleased]: https://github.com/DaLexto/lexsys-ui/compare/lexsys@0.1.3...HEAD
[0.1.3]: https://github.com/DaLexto/lexsys-ui/compare/lexsys@0.1.2...lexsys@0.1.3
[0.1.2]: https://github.com/DaLexto/lexsys-ui/compare/lexsys@0.1.1...lexsys@0.1.2
[0.1.1]: https://github.com/DaLexto/lexsys-ui/compare/lexsys@0.1.0...lexsys@0.1.1
[0.1.0]: https://github.com/DaLexto/lexsys-ui/compare/@dalexto/lexsys@0.0.6...@dalexto/lexsys@0.1.0
[0.0.6]: https://github.com/DaLexto/lexsys-ui/compare/@dalexto/lexsys@0.0.5...@dalexto/lexsys@0.0.6
[0.0.5]: https://github.com/DaLexto/lexsys-ui/compare/@dalexto/lexsys@0.0.4...@dalexto/lexsys@0.0.5
[0.0.4]: https://github.com/DaLexto/lexsys-ui/compare/@dalexto/lexsys@0.0.3...@dalexto/lexsys@0.0.4
[0.0.3]: https://github.com/DaLexto/lexsys-ui/compare/@dalexto/lexsys@0.0.2...@dalexto/lexsys@0.0.3
[0.0.2]: https://github.com/DaLexto/lexsys-ui/compare/@dalexto/lexsys-cli@0.0.1...@dalexto/lexsys-cli@0.0.2
[0.0.1]: https://www.npmjs.com/package/@dalexto/lexsys-cli/v/0.0.1
