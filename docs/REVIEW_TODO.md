# Lexsys Backlog

**Audience:** Maintainers
**Type:** Roadmap / backlog
**Source of truth for:** Active work items, known gaps, next priorities
**Last reviewed:** 2026-06-06 (`0.1.1` @ `latest`; DX.2 Playwright E2E shipped)

---

## On this page

- [Execution Queue (active)](#execution-queue-active)
- [0.1.0 Execution Queue](#010-execution-queue)
- [M4 - Entry + CLI DX (shipped)](#m4-entry-cli-dx-shipped)
- [M8 - CLI Cleanup and Deduplication (shipped)](#m8-cli-cleanup-and-deduplication-shipped)
- [M10 - Release readiness (shipped 2026-05-24)](#m10-release-readiness-shipped-2026-05-24)
- [Verification policy (maintainer contract)](#verification-policy-maintainer-contract)
- [Current State](#current-state)
- [P2 - Product and DX](#p2-product-and-dx)
  - [UI composition (primitives / blocks / templates)](#ui-composition-primitives-blocks-templates)
  - [Blocks / templates optimization backlog](#blocks-templates-optimization-backlog)
  - [CS - Component Standardization](#cs-component-standardization)
- [P3 - Architecture Planning](#p3-architecture-planning)
- [M12 - CLI command optimization (shipped)](#m12-cli-command-optimization-shipped)
- [SI - Script Improvements](#si-script-improvements)
- [Known Gaps](#known-gaps)

Long-term tokens platform direction lives in [Roadmap](./ROADMAP.md).

Completed work is tracked in git history. This document only contains items
that are not yet done.

---

## Execution Queue (active)

**Historical:** M1–M12, R0, M10 first publish, **0.1.0 wave (A–F + REL)** — [Roadmap § Monorepo optimization](./ROADMAP.md#monorepo-optimization), [§ 0.1.0 roadmap](./ROADMAP.md#010-roadmap). All **shipped**.

**Current focus — post-0.1.1:** deferred DX.1 starter repo — see [§ Known Gaps](#known-gaps). PLAYGROUND automation (G2a–G2b) **shipped**.

| Phase          | Focus                                      | Status                                                                        |
| -------------- | ------------------------------------------ | ----------------------------------------------------------------------------- |
| **REL**        | 0.1.0 release gate (PR A1–A4)              | **shipped** (2026-06-06)                                                      |
| **UC+**        | Admin catalog expansion (PR B1–C6)         | **shipped**                                                                   |
| **DX**         | `apps/docs` + `docs:lint` (PR D1–D2)       | **shipped**                                                                   |
| **TOK**        | Token hardening (PR E1–E2)                 | **shipped**                                                                   |
| **SEC+CLI**    | Registry trust + M12.5 (PR F1–F2)          | **shipped**                                                                   |
| **PLAYGROUND** | fresh-test smoke + PulseDesk E2E (G2a–G2b) | **shipped** — G2a fresh smoke; G2b Playwright E2E (`pnpm test:e2e`, 4/4 pass) |

---

## 0.1.0 Execution Queue

Sorted PR order for the full improvement roadmap. Update **Status** column as each PR lands.

| Order | PR     | ID(s)         | Item                                    | Surface / path                        | Status   |
| ----- | ------ | ------------- | --------------------------------------- | ------------------------------------- | -------- |
| 1     | A1     | all           | Docs integration + drift fix            | REVIEW_TODO, ROADMAP, TESTING         | shipped  |
| 2     | A3     | REL.2         | Provenance + SBOM                       | `release.yml`, DEPLOY                 | shipped  |
| —     | manual | —             | PulseDesk consumer QA                   | `D:\PLAYGROUND\sandbox-lexsys`        | shipped  |
| 3     | A4     | M10           | **0.1.0 @ latest** release              | Changesets, publish                   | shipped  |
| 4     | B1     | UC.8          | Pagination primitive                    | ui + registry                         | shipped  |
| 5     | B2     | UC.9          | Breadcrumb primitive                    | ui + registry                         | shipped  |
| 6     | B3     | UC.10         | DatePicker primitive                    | ui + registry                         | shipped  |
| 7     | C1     | UC.11         | PageHeader block                        | block                                 | shipped  |
| 8     | C2     | UC.12         | StatsCard block                         | block                                 | shipped  |
| 9     | C3     | UC.13         | FilterToolbar block                     | block                                 | shipped  |
| 10    | C4     | UC.14         | DataTable block                         | block (deps UC.8)                     | shipped  |
| 11    | C5     | UC.15         | CommandPalette → Combobox wiring        | block edit                            | shipped  |
| 12    | C6     | UC.16         | SettingsPageLayout template             | template (deps UC.11)                 | shipped  |
| 13    | D1     | DX.4          | `apps/docs` minimal site                | apps/docs                             | shipped  |
| 14    | D2     | DX.5          | `docs:lint` automation                  | root script + CI (`changes` job)      | shipped  |
| 15    | E1     | TOK.1         | Dedicated tokens (9 aliased primitives) | packages/tokens                       | shipped  |
| 16    | E2     | TOK.2         | Expand `SEMANTIC_CONTRAST_PAIRS`        | packages/tokens                       | shipped  |
| 17    | F1     | SEC.1         | Remote registry checksum/allowlist      | packages/cli                          | shipped  |
| 18    | F2     | CLI.1 / M12.5 | CLI polish (`status --json`)            | packages/cli                          | shipped  |
| —     | G2a    | DX.3          | Fresh install/build smoke               | `D:\PLAYGROUND\smoke-010` (`@latest`) | shipped  |
| —     | G2b    | DX.2          | Playwright E2E                          | `D:\PLAYGROUND\sandbox-lexsys`        | shipped  |
| —     | G1     | DX.1          | Public starter repo                     | deferred post-0.1.0                   | deferred |

---

## M4 - Entry + CLI DX (shipped)

Detail: [Roadmap § M4](./ROADMAP.md#phase-overview).

| Item  | Description                                                                                     | Status  |
| ----- | ----------------------------------------------------------------------------------------------- | ------- |
| M4.1  | `packages/entry` — `@dalexto/lexsys` npm package, thin shim → `@dalexto/lexsys-cli`             | shipped |
| M4.2  | Root `package.json` rename → `lexsys-monorepo`                                                  | shipped |
| M4.3  | Changesets `fixed[]` — `@dalexto/lexsys` + `@dalexto/lexsys-cli` same version                   | shipped |
| M4.4  | CLI command aliases (`create`, `a`, `up`, `ls`, `st`, `rm`, `dr`, `reg`, `cfg`)                 | shipped |
| M4.5  | CLI flag short aliases (`-d`, `-y`, `-f`, `-a`, `-S`, `-u`, `-j`, `-s`, `-l`, `-r`, `-w`, `-C`) | shipped |
| M4.6  | `flags.ts` varargs refactor — `hasFlag(args, '--dry-run', '-d')`                                | shipped |
| M4.7  | Guided modes — `create`, `up`, `rm` without args → interactive picker                           | shipped |
| M4.8  | Per-command `--help` + `help.ts` redesign (grouped sections)                                    | shipped |
| M4.9  | Error output standardization — consistent `✗` prefix + `CliError` suggestion hints              | shipped |
| M4.10 | `src/core/` reorganization → `registry/`, `install/`, `scaffold/`, `utils/`, `config/`          | shipped |
| M4.11 | `packages/cli/CHANGELOG.md`                                                                     | shipped |
| M4.12 | `publish:release` + root scripts updated for entry package                                      | shipped |
| M4.13 | Docs update — README, CLI.md, DEPLOY.md                                                         | shipped |

---

## M8 - CLI Cleanup and Deduplication (shipped)

Detail: [Roadmap § M8](./ROADMAP.md#m8-cli-cleanup-and-deduplication).

| Item | Description                                                                                         | Status  |
| ---- | --------------------------------------------------------------------------------------------------- | ------- |
| M8.1 | Remove dead exports (`writeFileIfMissing`, `resolveComponentsRoot`) + unreachable `index.ts` footer | shipped |
| M8.2 | Implement `--yes` properly in `add.ts` and `update.ts` (was no-op stub)                             | shipped |
| M8.3 | Merge `install/results.ts` + `install/uninstall-results.ts` into generic module                     | shipped |
| M8.4 | Unify `RegistryCommandResult` / `RegistryProviderResult` + dedupe remote fetch logic                | shipped |
| M8.5 | Extract shared `prompts` multiselect helper to `utils/prompt.ts`                                    | shipped |
| M8.6 | Extract shared scaffold helpers to `scaffold/scaffold-helpers.ts`                                   | shipped |

---

## M10 - Release readiness (shipped 2026-05-24)

**First publish (historical):** `@dalexto/lexsys-cli@0.0.1` and `@dalexto/lexsys-registry@0.0.1` on npm dist-tag **`next`**
via Release CI ([`release.yml`](../.github/workflows/release.yml)). Record:
[Changelog](../CHANGELOG.md#001-2026-05-24).

**Stable release (2026-06-06):** `@dalexto/lexsys@0.1.0` on dist-tag **`latest`**. Post-publish smoke: `D:\PLAYGROUND\smoke-010` (`init vite` → `add button` → `npm run build`). See [CHANGELOG § 0.1.0](../CHANGELOG.md#010---2026-06-06).

**Housekeeping (2026-06-06):** `@dalexto/lexsys@0.1.1` on **`latest`** — docs/rules alignment and release CI hotfix (PR #77–#81). See [CHANGELOG § 0.1.1](../CHANGELOG.md#011---2026-06-06).

**Prior preview:** `0.0.6` @ `next` — CSS generated header (JSDoc + ISO timestamp), scripts enterprise contract. Prior: `0.0.5` (2026-06-02), `0.0.4` (2026-05-30).

Detail: [Roadmap § M10](./ROADMAP.md#m10-release-readiness).

---

## Verification policy (maintainer contract)

Canonical detail: [Testing docs § Verification surfaces](../operations/TESTING.md#verification-surfaces).

- **`apps/playground`** — monorepo smoke, **maintenance-only** (~10–20% focus). Optional `pnpm playground:dev`; category nav for quick scans. Do not build product UX here unless the PR explicitly targets `apps/playground/**`.
- **Consumer sandbox (PulseDesk)** — **real app truth** (~80–90% focus) for block/template UX, narrow viewport, and integration flows. Path: `D:\PLAYGROUND\sandbox-lexsys`. Manual checklist + Playwright E2E (DX.2, `pnpm test:e2e`) — not lexsys CI.
- **Fresh-install lab** — repeatable `init` → `add` → `build` smoke (DX.3). Path: `D:\PLAYGROUND\lexsys-fresh-test`. Throwaway / reproducible CLI regression — not PulseDesk.
- **Playground dark/brand demos** — deferred; consumer UX belongs in sandbox/SaaS ([Roadmap § Explicitly deferred](./ROADMAP.md#explicitly-deferred)).
- **Change workflow** — branch off `dev` → implement → docs alignment → PR to `dev` last; **`main` untouched** unless explicitly requested ([AGENTS.md § Change workflow](../AGENTS.md#change-workflow)).

| PLAYGROUND path                   | Role                          | IDs                      |
| --------------------------------- | ----------------------------- | ------------------------ |
| `D:\PLAYGROUND\sandbox-lexsys`    | PulseDesk — real consumer app | Manual QA, DX.2 E2E      |
| `D:\PLAYGROUND\lexsys-fresh-test` | Fresh-install lab             | DX.3 install/build smoke |

Detail: [Testing docs § PLAYGROUND verification surfaces](../operations/TESTING.md#playground-verification-surfaces).

---

## Current State

The P0 and P1 implementation passes are complete:

- CLI install safety (idempotency, conflict detection, `--cwd` scoping, packed template resolution)
- Token foundation (DTCG-shaped source, CSS + DTCG JSON generation, brand layer, theme modes)
- Token platform phases 1–10 (factory authoring through accessibility contrast guard; see [Roadmap](./ROADMAP.md))
- Token engine: resolved value pipeline, composite typography + shadow/border registry, governance graph, WCAG contrast report + CI policy (`docs/reference/tokens/RESOLVER_EVOLUTION.md`)
- Post–Phase 10 hardening: contrast pair registry (15 pairs); background compositing; `rgb()` / `hsl()` parsing; build-failing contrast in CSS build; primitive shadow scale `0`–`6` on branch+slot with CSS compose; elevation shadows reference primitive slots
- ScrollArea component (UI, tokens, registry, playground) merged via PR #14 (`884e3eb`)
- `lexsys uninstall` removes registry-owned files with dry-run and conflict reporting
- UI render test pilot: ScrollArea, Collapsible, Dialog (`@testing-library/react` + Vitest jsdom)
- Broad UI render coverage: **57/57** installable items have render smoke tests — **45** primitives, **10** blocks, **2** templates (0.1.0 wave shipped)
- Next.js App Router minimal scaffold (`lexsys init next`; pinned Next.js 15.3.3)
- Remote registry manifest contract (`parseRemoteRegistry`, optional `styles`, local fallback)
- Governance CI promotion: semantic audit **`error`-severity** fails `pnpm tokens:governance:report` (`LEXSYS_GOVERNANCE_POLICY`)
- `shadow.inner` inset slot model (branch+slot with `inset: true`)
- Style installation (token CSS wired into consumer project on `lexsys init` / `lexsys add`)
- Tailwind v4 + Vite or Next.js init sequence
- Registry validation and publish-safe template resolution
- Documentation alignment with current token/UI contracts (`docs/reference/tokens/TOKENS.md`, design system, architecture, CLI, package READMEs)
- Tier 1 test coverage: CLI uninstall orphan cleanup, contrast failure codes + policy tiers, registry style sync helpers (`docs/operations/TESTING.md`)
- Per-package `vitest.config.ts` for Vitest VS Code extension discovery (Vitest 4; no root workspace file)
- UI package polish (PR #24, `c619a85`): unified variant API, `danger` vocabulary, semantic opacity, viewport inset tokens, `pnpm ui:audit` ([UI variants](./reference/ui/UI_VARIANTS.md))
- Post–PR #24 ship (PR #25, `af729d5`): CLI `--sync` / `--utilities`, overlay token semantics, blocking `ui:audit`, full variant token sweep ([UI variants](./reference/ui/UI_VARIANTS.md), [CLI reference](./reference/cli/CLI.md))
- Sandbox primitive QA (PR #26, `61c25a6`): Menu horizontal flyout collision avoidance, toast success/info/destructive surfaces, [UI composition](./reference/ui/UI_COMPOSITION.md) composition track
- Consumer sandbox verify (PR #26 artifacts): `lexsys update menu toast --sync --styles --force`; Settings flyout on narrow viewport; toast success/info/destructive surfaces — **manual checklist pass**
- UI composition layers (PR #28): monorepo `primitives/blocks/templates` reference layout; flat consumer install via `paths.components` + import rewrite; pilot FormField, Sidebar, DashboardShell registry + CLI installable; `list` by layer; `--with-deps` uninstall

The current implementation supports: Vite or Next.js App Router + React + Tailwind v4, `lexsys init`, `lexsys add`, `lexsys update`, **57 installable UI items** (45 primitives, 10 blocks, 2 templates), published **`0.1.1`** @ **`latest`** (stable MVP).

Known gaps below — post-0.1.1 backlog; closed 0.1.0 wave items remain in [§ 0.1.0 Execution Queue](#010-execution-queue).

---

## P2 - Product and DX

### P2.0 — Release gate (REL)

| ID    | Item                           | PR     | Status                                                                                                                                             |
| ----- | ------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| REL.2 | npm provenance + SBOM          | A3     | shipped                                                                                                                                            |
| —     | PulseDesk consumer QA (`< md`) | manual | shipped — [Testing docs § Consumer sandbox](./operations/TESTING.md#consumer-sandbox-verification) pass in `D:\PLAYGROUND\sandbox-lexsys` (pre-A4) |
| M10   | 0.1.0 @ `latest` publish       | A4     | shipped (2026-06-06) — PR #65–#67; post-publish smoke `D:\PLAYGROUND\smoke-010`                                                                    |

Canonical checklist: [Deploy guide § Pre-release gate](../operations/DEPLOY.md#pre-release-gate).

### P2.1 — UI catalog expansion (UC.8–UC.16)

Admin catalog items — after **0.1.0** unless release gate completes first. See [§ 0.1.0 Execution Queue](#010-execution-queue).

| ID    | Layer     | Item                      | PR  | Deps  | Status  |
| ----- | --------- | ------------------------- | --- | ----- | ------- |
| UC.8  | primitive | Pagination                | B1  | —     | shipped |
| UC.9  | primitive | Breadcrumb                | B2  | —     | shipped |
| UC.10 | primitive | DatePicker                | B3  | —     | shipped |
| UC.11 | block     | PageHeader                | C1  | UC.9  | shipped |
| UC.12 | block     | StatsCard                 | C2  | —     | shipped |
| UC.13 | block     | FilterToolbar             | C3  | —     | shipped |
| UC.14 | block     | DataTable                 | C4  | UC.8  | shipped |
| UC.15 | block     | CommandPalette → Combobox | C5  | —     | shipped |
| UC.16 | template  | SettingsPageLayout        | C6  | UC.11 | shipped |

### P2.2 — DX (DX.1–DX.5)

| ID   | Item                         | PR / track | Path / notes                                     | Status   |
| ---- | ---------------------------- | ---------- | ------------------------------------------------ | -------- |
| DX.1 | Public starter template repo | G1         | Separate GitHub repo post-0.1.0                  | deferred |
| DX.2 | Playwright E2E (PulseDesk)   | G2b        | `D:\PLAYGROUND\sandbox-lexsys` — `pnpm test:e2e` | shipped  |
| DX.3 | Fresh install/build smoke    | G2a        | `D:\PLAYGROUND\smoke-010` (`@latest`)            | shipped  |
| DX.4 | `apps/docs` minimal site     | D1         | apps/docs                                        | shipped  |
| DX.5 | `docs:lint` automation       | D2         | root `pnpm docs:lint`; CI `changes` job          | shipped  |

### P2.3 — Tokens (TOK.1–TOK.2)

Cross-link [P3](#p3-architecture-planning) and [Resolver evolution § After Phase 10](./reference/tokens/RESOLVER_EVOLUTION.md#after-phase-10). Canonical rules: [TOKENS.md](./reference/tokens/TOKENS.md).

| ID    | Item                                      | PR  | Status  |
| ----- | ----------------------------------------- | --- | ------- |
| TOK.1 | Dedicated tokens for 9 aliased primitives | E1  | shipped |
| TOK.2 | Expand `SEMANTIC_CONTRAST_PAIRS`          | E2  | shipped |

### P2.4 — Trust + CLI (SEC.1, M12.5)

| ID    | Item                               | PR  | Status  |
| ----- | ---------------------------------- | --- | ------- |
| SEC.1 | Remote registry checksum/allowlist | F1  | shipped |
| CLI.1 | M12.5 CLI polish (`status --json`) | F2  | shipped |

Detail: [M12 § M12.5](#m12-cli-command-optimization-shipped), [CLI.md](./reference/cli/CLI.md).

### UI composition (primitives / blocks / templates)

Canonical composition model: [UI composition](./reference/ui/UI_COMPOSITION.md). Roadmap sequencing:
[Roadmap § UI composition](./ROADMAP.md#ui-composition-three-layers-pilots-shipped).

**Today:** PR #28 merged — monorepo reference uses `primitives/`, `blocks/`, `templates/`; consumer install is flat under `paths.components` (`src/components/ui/<CanonicalName>/`). Pilot blocks and template are `lexsys add`-installable. BO.1–BO.7 fixed (CI install smoke, render tests, registry template-import audit); pilots marked stable. Narrow-viewport sandbox QA remains manual per [Testing docs § Blocks/templates checklist](../operations/TESTING.md#consumer-sandbox-verification).

**Target:** expand registry **blocks** and **templates** beyond the pilot set. **`lexsys add <name>`** installs the transitive closure via `registryDependencies`; `item.target` resolves to the flat components root (monorepo templates still live under `primitives/`, `blocks/`, or `templates/` source folders).

| Item | Layer     | Status  | Notes                                                                                                                                                    |
| ---- | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UC.1 | All       | shipped | Monorepo layout, composition validators, layer docs — ongoing alignment via [UI composition](./reference/ui/UI_COMPOSITION.md) and catalog drift checks  |
| UC.2 | Blocks    | shipped | FormField, SettingsPanel, Sidebar, AuthForm, CommandPalette, Empty — BO pass complete; CI render + install smoke                                         |
| UC.3 | Templates | shipped | DashboardShell mobile layout fixed; CI render + install smoke                                                                                            |
| UC.4 | Pages     | n/a     | Pages stay consumer-owned                                                                                                                                |
| UC.5 | CLI       | shipped | `paths.components`, flat `item.target` install, import rewrite, `list` by layer, `--with-deps` uninstall (PR #28)                                        |
| UC.6 | Tests     | shipped | Block install smoke, render tests, registry template-import audit; closure/import-rewrite unit tests                                                     |
| UC.7 | Compound  | shipped | Compound-first API (M11): flat named exports, variant propagation, blocks/templates compound-only — [ROADMAP § M11](./ROADMAP.md#m11-compound-first-api) |

**UC.7 execution queue (compound-first):**

- [x] Phase 0 — governance docs + CHANGELOG breaking stub
- [x] Phase 1A — unbundle Switch, Slider, Progress, Checkbox
- [x] Phase 1B — Autocomplete/Combobox/Menu/Drawer export gaps
- [x] Phase 2 — FormField + AuthForm compound
- [x] Phase 3 — Sidebar compound
- [x] Phase 4 — CommandPalette compound
- [x] Phase 5 — SettingsPanel + DashboardShell compound
- [x] Phase 6 — sandbox migration
- [x] Phase 7 — tests, registry sync, `0.0.2` version bumps, docs alignment

### Blocks / templates optimization backlog

**Context:** Consumer sandbox (PulseDesk SaaS demo) QA during PR #28 exposed that **blocks/templates are not “organization-only” quality**. Primitives were assumed production-ready when composing blocks; that assumption is **not validated** for composed/mobile flows.

**Do not ship new blocks/templates without CI install smoke + render coverage** (see [Testing docs](../operations/TESTING.md)). BO.1–BO.7 are fixed; see status column.

| ID   | Area              | Issue                                       | Status / notes                                                                                                                                                                                 |
| ---- | ----------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BO.1 | Sidebar (mobile)  | Drawer opens but nav list layout broken     | **Fixed** — plain `<nav>` list; Menu removed from Sidebar deps.                                                                                                                                |
| BO.2 | Sidebar (mobile)  | Drawer composition incomplete vs playground | **Fixed** — `swipeDirection="left"`, DrawerViewport side left, `DrawerClose appearance="inline"` on nav select (avoids absolute icon stacking). Sandbox manual QA at `< md` still recommended. |
| BO.3 | DashboardShell    | Responsive layout                           | **Fixed** — sticky mobile trigger bar; page header in main (not squeezed beside trigger). Sidebar `mobileHeader` remains optional for compact slots only.                                      |
| BO.4 | Blocks QA process | No block-level validation gate              | **Fixed** — `install-flow.test.ts` covers all registry blocks (solo + bulk idempotency, flat import paths, transitive closure).                                                                |
| BO.5 | Assumption audit  | “Primitives good → blocks good”             | **Fixed** — pilot block/template render smoke in `@dalexto/lexsys-ui`; registry template-import audit in `registry:check`. Narrow viewport remains manual sandbox.                             |
| BO.6 | Sidebar (design)  | Menu vs nav list                            | **Fixed** — plain `<a>` / `<button>` nav list.                                                                                                                                                 |
| BO.7 | FormField         | Untested in sandbox                         | **Fixed** — `lexsys add form-field` + SettingsPage uses FormField in PulseDesk sandbox.                                                                                                        |

**Verification surface when picking this up:** consumer sandbox at narrow viewport (`< md`); `lexsys add dashboard-shell` fresh install; compare drawer to playground `DrawerViewport side="right"` pattern.

**Related fixes already landed (PR #28):** valid border tokens in Sidebar/DashboardShell variants; flat consumer install path `src/components/ui/`; Sidebar drawer trigger wiring. Post–PR #30 + `ef65072`: plain nav, mobile drawer, FormField sandbox, `DrawerClose` inline appearance, DashboardShell mobile layout.

### CS - Component Standardization

**Purpose:** Standardize component authoring patterns across primitives, blocks,
templates, and registry templates before expanding the component catalog or
writing permanent component rules.

Roadmap anchor: [Roadmap § Component standardization](./ROADMAP.md#component-standardization-shipped).

| ID   | Area                     | Goal                                                                                                                                      | Status  |
| ---- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| CS.1 | Review / Score           | Score primitives, blocks, and templates A/B/C/D; record good vs bad                                                                       | shipped |
| CS.2 | Variants standardization | Decide `.join(" ")`, CVA vs helpers, `*Variants()` naming, tokens                                                                         | shipped |
| CS.3 | Props / ref / className  | Tighten refs, explicit `ref?`, and className typing                                                                                       | shipped |
| CS.4 | Compound API consistency | Audit Sidebar context, Select ref asymmetry, and export shape                                                                             | shipped |
| CS.5 | Cleanup implementation   | Apply agreed standards and run `pnpm ui:check`                                                                                            | shipped |
| CS.6 | Registry sync            | Sync templates if UI install artifacts change                                                                                             | shipped |
| CS.7 | Prefix transform         | Fixed `lex-` prefix; `scripts/rebrand/rename-prefix.mjs` for future rebrand; all packages converted to dynamic `testCssVarPrefix` helpers | shipped |
| CS.8 | Rule + skill template    | `ui-components.mdc` rule + `$components-authoring` hub skill (component.md + tests.md); stale `lsys-` fixed across skills and rules       | shipped |

**CS.8 pre-rule intentional decisions (locked in CS.4):**

- `SidebarItemLink` / `SidebarItemButton` use plain `<a>` / `<button>` — not our `Button` primitive; their styling requirements differ and they own nav-item appearance independently.
- Pilot blocks (`AuthForm`, `CommandPalette`, `FormField`, `SettingsPanel`, `Sidebar`) and `DashboardShell` **are** exported from `packages/ui/src/index.ts` for playground smoke; `Empty` stays registry-only. Consumers still install via `lexsys add`, not `@dalexto/lexsys-ui` imports in production apps.
- `SidebarTrigger` is composable — consumer places it in `<SidebarHeader>` or any `<Sidebar>` child; `Drawer` context wraps the root `<aside>` so any descendant `DrawerTrigger` wires up automatically.

---

## P3 - Architecture Planning

Optional follow-ups after Phases 1–10 (detail in
[Resolver evolution — After Phase 10](./reference/tokens/RESOLVER_EVOLUTION.md#after-phase-10)):

- Further expand `SEMANTIC_CONTRAST_PAIRS` (design sign-off per pair)
- DTCG composite object `$value` engine phase (option B — after slot model stable)
- Speculative AST evaluator and color/unit math — **deferred**, not scheduled

**Shipped in P3 pass:** see [Roadmap § M3](./ROADMAP.md#m3-product-and-architecture-backlog) and git history (shadow/border composites, contrast CI, render coverage expansion, Next init, remote registry, governance promotion, UI polish PR #24).

## M12 - CLI command optimization (shipped)

Detail: [Roadmap § M12](./ROADMAP.md#m12-cli-command-optimization).

**Scope:** Small–medium PRs only — no mega-refactor. Separate from version-removal / config migration work.

| ID    | Focus                                                                 | Status  |
| ----- | --------------------------------------------------------------------- | ------- |
| M12.1 | Audit command names (logic, aliases from M4, help grouping)           | shipped |
| M12.2 | Overlapping commands — candidates to merge (e.g. status vs doctor)    | shipped |
| M12.3 | CLI cleanup (dead code, duplicate output, help sections)              | shipped |
| M12.4 | UX optimizations (guided modes, flags, error hints) — one PR per item | shipped |
| M12.5 | CLI polish — see [P2.4 CLI.1](#p24-trust-cli-sec1-m125) (PR F2)       | shipped |

---

## SI - Script Improvements

Shipped improvements to `scripts/rebrand/rename-prefix.mjs`.

| ID   | Description                                                                                                                                                                                                                                                                                                                     | Status  |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| SI.1 | Full post-rename run order: rename → `registry:sync` → `format` (per-package scripts exist) → `pnpm check` (lint + typecheck + tests). Currently stops after `registry:sync` and does not format or run tests.                                                                                                                  | shipped |
| SI.2 | Post-rename format: run `pnpm format` (Prettier, whole repo) after file writes. Currently the script does not format — touched files may drift from style rules. Note: `*:lint:fix` scripts are ESLint-only, not Prettier; there are no per-package Prettier scripts. `pnpm format` on the whole repo is the correct call here. | shipped |
| SI.3 | Post-rename summary: print count of files changed per category (source / docs / test-configs / registry) after all tasks complete.                                                                                                                                                                                              | shipped |
| SI.4 | **Registry sync — block/template item scaffold:** `sync-block-templates.mjs` calls `syncRegistryItems` for blocks/templates; missing items + index wiring; `--check` fails when UI folders lack items.                                                                                                                          | shipped |
| SI.5 | **Registry sync — full item automation:** `pnpm registry:sync` reconciles all `src/items/*.ts` (files, dependencies, `registryDependencies`, utilities); preserves `aliases` and `category`; primitives include `remoteFiles`. See [REGISTRY.md](./reference/registry/REGISTRY.md) merge policy.                                | shipped |

---

## Known Gaps

Tracked IDs in [§ 0.1.0 Execution Queue](#010-execution-queue). Update status when closed.

| ID / gap                      | Notes                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| DX.3 / fresh install smoke    | **shipped** — `D:\PLAYGROUND\smoke-010` with `@dalexto/lexsys@latest` (`init` → `add button` → `build`, 2026-06-06). |
| SEC.1 / remote registry trust | **shipped** — checksum + `registryAllowlist`; HTTPS-only fetch remains default.                                      |
| DX.1 / public starter repo    | Deferred post-0.1.0 — separate GitHub repo.                                                                          |

Resolved (reference only — see git history): CVA helpers in installed `utils.ts` (PR #25); Select popup layout (PR #25); CLI diagnostics and install-flow tests in `packages/cli/test/`; registry item reconcile automation (SI.5) — `registry:sync` reconciles all layers; `registryDependencies` inferred from template imports with overwrite policy in [REGISTRY.md § Maintainer notes](./reference/registry/REGISTRY.md#maintainer-notes).
