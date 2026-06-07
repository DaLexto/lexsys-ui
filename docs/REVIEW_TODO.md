# Lexsys Backlog

**Audience:** Maintainers
**Type:** Roadmap / backlog
**Source of truth for:** Active work items, known gaps, next priorities
**Last reviewed:** 2026-06-07 (Shipped index — outcome + detail links)

---

## On this page

- [Execution queue (active)](#execution-queue-active)
- [ID legend](#id-legend)
- [Open backlog](#open-backlog)
- [Known gaps](#known-gaps)
- [Maintainer contracts](#maintainer-contracts)
- [Project snapshot](#project-snapshot)
- [Shipped index](#shipped-index)
- [Related documentation](#related-documentation)

**How to read this doc:** start with **Execution queue** and **Open backlog** for what to do next. **Shipped index** lists closed IDs with **what landed** and a **Detail** link to the canonical doc — implementation detail is not duplicated here.

Long-term direction: [Roadmap](./ROADMAP.md). Release notes: [CHANGELOG](../CHANGELOG.md). PR-level history: git log.

---

## Execution queue (active)

**Closed waves:** 0.1.0 (A–G), SB enterprise (SB.1–SB.22), TOK.5 / TOK.7 / TOK.8 — all **shipped** on `dev`. Outcomes: [§ Shipped index](#shipped-index).

**Release:** [PR #91](https://github.com/DaLexto/lexsys-ui/pull/91) (`dev` → `main`) **merged**; npm **`0.1.2`** @ **`latest`** (2026-06-07). Post-TOK.7/8 token work may need a follow-up version bump.

| Priority | ID / track        | Item                                                   | Status   | Surface                          |
| -------- | ----------------- | ------------------------------------------------------ | -------- | -------------------------------- |
| **1**    | UI composition #5 | Additional blocks/templates beyond pilot set           | planned  | `packages/ui`, registry          |
| —        | TOK.6             | Density prop (`compact` / `default` / `comfortable`)   | planned  | `packages/tokens`, UI variants   |
| —        | TOK.4             | Cross-scale size harmony (icon ↔ typography ↔ control) | deferred | blocked on AST evaluator         |
| —        | TOK.8 (mini)      | `motion.duration.page` (500ms)                         | deferred | no template owns page motion yet |
| —        | DX.1              | Public starter template repo                           | deferred | separate GitHub repo             |

**Suggested pick-up:** UI composition step 5 — pick a block/template, ship with CI install smoke + [consumer sandbox](./operations/TESTING.md#consumer-sandbox-verification). TOK.6 stays **planned** until density work is explicitly scheduled ([DESIGN_SYSTEM § Control rhythm](./reference/tokens/DESIGN_SYSTEM.md#control-rhythm-padding-gap-focus-offset)).

---

## ID legend

Short prefixes used across this doc, PR tracks, and [Roadmap](./ROADMAP.md). **PR column** = letter track from the 0.1.0 wave (historical); post-0.1.0 work uses **ID** only.

| Prefix     | Meaning                         | Example IDs                                                                                          |
| ---------- | ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **M**      | Monorepo optimization phase     | M4, M8, M10, M12                                                                                     |
| **REL**    | Release gate                    | REL.2 (provenance + SBOM)                                                                            |
| **UC**     | UI catalog expansion            | UC.8–UC.16 (primitives → template)                                                                   |
| **DX**     | Developer experience            | DX.1 starter repo, DX.2 E2E                                                                          |
| **TOK**    | Token semantics / harmonization | TOK.5 rhythm, TOK.7 spacing, TOK.8 motion                                                            |
| **SEC**    | Registry trust                  | SEC.1 checksum / allowlist                                                                           |
| **CLI**    | CLI polish slice                | CLI.1 (`status --json`, M12.5)                                                                       |
| **SB**     | Sidebar enterprise wave         | SB.1–SB.22                                                                                           |
| **BO**     | Blocks/templates optimization   | BO.1–BO.7 (mobile / QA fixes)                                                                        |
| **CS**     | Component standardization       | CS.1–CS.8                                                                                            |
| **SI**     | Script improvements             | SI.1–SI.5 (`registry:sync`, rebrand)                                                                 |
| **PR A–G** | 0.1.0 execution letter tracks   | A = docs/REL, B = UC primitives, C = blocks, D = DX docs, E = TOK, F = SEC/CLI, G = playground smoke |

---

## Open backlog

Only **planned**, **deferred**, or **next** items. Closed IDs: [§ Shipped index](#shipped-index).

### P2.3 — Tokens (TOK.1–TOK.2)

Cross-link [Resolver evolution § After Phase 10](./reference/tokens/RESOLVER_EVOLUTION.md#after-phase-10). Canonical rules: [TOKENS.md](./reference/tokens/TOKENS.md).

| ID    | Item                                                                                   | Status                                                                                                                                             |
| ----- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| TOK.6 | Density prop (`compact` / `default` / `comfortable`) — parallel rhythm ladders         | **planned** — TOK.5/TOK.7/TOK.8 stable; not scheduled yet                                                                                          |
| TOK.4 | Cross-scale size harmony (icon ↔ typography ↔ control; Button `icon.size` per variant) | deferred — [AST evaluator](./reference/tokens/RESOLVER_EVOLUTION.md#ast-evaluator-subsystem)                                                       |
| —     | `motion.duration.page` (500ms tier)                                                    | deferred — add when a template owns page-level motion ([DESIGN_SYSTEM § Motion](./reference/tokens/DESIGN_SYSTEM.md#motion-rhythm-duration-tiers)) |

**TOK.6 scope (draft):** parallel `spacing.control.*` / density profiles; prop on compounds that own rhythm; no raw `--lex-space-*` in variants. Verify: `pnpm tokens:check`, sandbox visual pass.

### UI composition — next track

Canonical model: [UI composition](./reference/ui/UI_COMPOSITION.md). Sequencing: [Roadmap § UI composition](./ROADMAP.md#ui-composition-three-layers-pilots-shipped).

| Step | Work                                         | Status  |
| ---- | -------------------------------------------- | ------- |
| 5    | Additional blocks/templates beyond pilot set | planned |

**Gate for new blocks/templates:** CI install smoke + render coverage — see [Testing docs § Consumer sandbox](./operations/TESTING.md#consumer-sandbox-verification). Pilot quality fixes (BO.1–BO.7) are **shipped** — [§ Blocks/templates optimization](#blocks-templates-optimization-backlog).

### P3 — Architecture planning

Optional follow-ups after token phases 1–10 ([Resolver evolution § After Phase 10](./reference/tokens/RESOLVER_EVOLUTION.md#after-phase-10)):

- Further expand `SEMANTIC_CONTRAST_PAIRS` (design sign-off per pair)
- DTCG composite object `$value` engine phase (after slot model stable)
- AST evaluator and color/unit math — **deferred**, not scheduled
- **TOK.4** — see [§ P2.3 Tokens](#p23-tokens-tok1tok2)

---

## Known gaps

| ID / gap                   | Notes                                       |
| -------------------------- | ------------------------------------------- |
| DX.1 / public starter repo | Deferred post-0.1.0 — separate GitHub repo. |
| TOK.4                      | Deferred until AST evaluator subsystem.     |
| TOK.6                      | Planned density slice — not started.        |
| UI composition step 5      | Planned — no item IDs assigned yet.         |

**Resolved (reference):** see [§ Shipped index (all IDs)](#shipped-index-all-ids) and git history.

---

## Maintainer contracts

Canonical detail: [Testing docs § Verification surfaces](./operations/TESTING.md#verification-surfaces).

| Surface                      | Role                                       | Path / IDs                                                  |
| ---------------------------- | ------------------------------------------ | ----------------------------------------------------------- |
| Consumer sandbox (PulseDesk) | Real app truth (~80–90% block/template UX) | `D:\PLAYGROUND\sandbox-lexsys` — DX.2 E2E (`pnpm test:e2e`) |
| Fresh-install lab            | CLI regression smoke                       | `D:\PLAYGROUND\lexsys-fresh-test` — DX.3                    |
| `apps/playground`            | Monorepo smoke only (~10–20%)              | maintenance-only                                            |

**Change workflow:** branch off `dev` → implement → docs alignment → verify → PR to `dev` last; **`main`** only when explicitly requested ([AGENTS.md § Change workflow](../AGENTS.md#change-workflow)).

Playground dark/brand demos — deferred; consumer UX belongs in sandbox ([Roadmap § Explicitly deferred](./ROADMAP.md#explicitly-deferred)).

---

## Project snapshot

**Today (2026-06-07):** registry-first React UI — **57** installable items (**45** primitives, **10** blocks, **2** templates); `lexsys init` (Vite / Next.js 15.3.3), `add`, `update`, flat `paths.components` install; token platform phases **1–10** complete; `pnpm ui:audit` clean for spacing literals in variants after TOK.7.

**npm:** **`0.1.2`** @ **`latest`** (Sidebar enterprise, 2026-06-07). TOK.7/TOK.8 may ship in a subsequent patch/minor.

**Verification default:** `pnpm check` — scoped gates in [SCRIPTS.md](./operations/SCRIPTS.md). What shipped and where to verify: [§ Shipped index](#shipped-index).

---

## Shipped index

Closed IDs — **what landed** and **where to read/run it**. Do not pick up new work from here; use for audits, changelog, or regression context.

### Shipped index (all IDs)

| ID          | What shipped                                                                                                     | Detail                                                                                                                                                    | Track        |
| ----------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| **REL.2**   | npm provenance + SBOM on publish artifacts                                                                       | [DEPLOY § Pre-release gate](./operations/DEPLOY.md#pre-release-gate)                                                                                      | A3           |
| **M10**     | `@dalexto/lexsys@0.1.2` @ **`latest`** (2026-06-07); prior `0.1.0` / `0.1.1` housekeeping                        | [CHANGELOG § 0.1.2](../CHANGELOG.md#012-2026-06-07)                                                                                                       | A4           |
| **DX.2**    | Playwright E2E in PulseDesk — 4 scenarios, `pnpm test:e2e` pass (mobile sidebar, theme, dashboard nav)           | [TESTING § DX.2](./operations/TESTING.md#dx2-playwright-e2e-sandbox-lexsys-pulsedesk-shipped)                                                             | G2b          |
| **DX.3**    | Fresh `@latest` smoke: `init vite` → `add button` → `build` (`smoke-010`, 2026-06-06)                            | [TESTING § DX.3](./operations/TESTING.md#dx3-fresh-install-smoke-lexsys-fresh-test-shipped)                                                               | G2a          |
| **DX.4**    | Minimal `apps/docs` site scaffold                                                                                | [ROADMAP § DX track](./ROADMAP.md#dx-track)                                                                                                               | D1           |
| **DX.5**    | `pnpm docs:lint` + CI `changes` job                                                                              | [SCRIPTS.md](./operations/SCRIPTS.md)                                                                                                                     | D2           |
| **TOK.1**   | Dedicated component tokens for 9 aliased primitives                                                              | [TOKENS.md](./reference/tokens/TOKENS.md)                                                                                                                 | E1           |
| **TOK.2**   | `SEMANTIC_CONTRAST_PAIRS` registry expanded                                                                      | [TOKENS.md](./reference/tokens/TOKENS.md)                                                                                                                 | E2           |
| **TOK.3**   | `size.icon` semantic scale; decorative `icon.size` off `selectionControl`                                        | [DESIGN_SYSTEM.md](./reference/tokens/DESIGN_SYSTEM.md)                                                                                                   | post-E2      |
| **TOK.5**   | Sidebar `nav`/`list`/`group`/`separator` wired to `spacing.control.*` md profile                                 | [DESIGN_SYSTEM § Control rhythm](./reference/tokens/DESIGN_SYSTEM.md#control-rhythm-padding-gap-focus-offset)                                             | SB.22        |
| **TOK.7**   | `--lex-space-*` removed from `*.variants.ts`; 10+ component token files; `pnpm ui:audit` clean                   | [DESIGN_SYSTEM § Control rhythm](./reference/tokens/DESIGN_SYSTEM.md#control-rhythm-padding-gap-focus-offset) + [map below](#p23-tokens-shipped-tok1tok8) | PRs #98–#104 |
| **TOK.8**   | Motion tiers retargeted (`surface`→250ms, `overlayEnter`/`layout`→350ms); 13 component token files               | [DESIGN_SYSTEM § Motion](./reference/tokens/DESIGN_SYSTEM.md#motion-rhythm-duration-tiers) + [map below](#p23-tokens-shipped-tok1tok8)                    | PR #105      |
| **UC.8**    | `Pagination` primitive — `lexsys add pagination`                                                                 | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                                                                             | B1           |
| **UC.9**    | `Breadcrumb` primitive                                                                                           | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                                                                             | B2           |
| **UC.10**   | `DatePicker` primitive                                                                                           | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                                                                             | B3           |
| **UC.11**   | `PageHeader` block                                                                                               | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                                                                             | C1           |
| **UC.12**   | `StatsCard` block                                                                                                | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                                                                             | C2           |
| **UC.13**   | `FilterToolbar` block                                                                                            | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                                                                             | C3           |
| **UC.14**   | `DataTable` block (deps Pagination)                                                                              | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                                                                             | C4           |
| **UC.15**   | `CommandPalette` wired to Combobox root                                                                          | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                                                                             | C5           |
| **UC.16**   | `SettingsPageLayout` template                                                                                    | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                                                                             | C6           |
| **UC.1–7**  | Monorepo layers, flat CLI install, compound-first API (M11), CI install/render smoke                             | [UI_COMPOSITION.md](./reference/ui/UI_COMPOSITION.md)                                                                                                     | PR #28, M11  |
| **SEC.1**   | Remote registry checksum + `registryAllowlist`; HTTPS-only fetch default                                         | [CLI.md](./reference/cli/CLI.md)                                                                                                                          | F1           |
| **CLI.1**   | `lexsys status --json` + M12.5 polish                                                                            | [CLI.md](./reference/cli/CLI.md)                                                                                                                          | F2 / M12.5   |
| **BO.1–7**  | Mobile Sidebar drawer, DashboardShell responsive layout, block install smoke, render audit, FormField sandbox QA | [TESTING § Consumer sandbox](./operations/TESTING.md#consumer-sandbox-verification)                                                                       | PR #28–#30   |
| **SB.1–22** | Enterprise Sidebar: Provider, collapse, badge, nested nav, tokens, a11y; release **0.1.2** train                 | [UI_COMPOSITION § Sidebar](./reference/ui/UI_COMPOSITION.md) + [track below](#sb-sidebar-enterprise-upgrade)                                              | step 7       |
| **CS.1–8**  | Variant/CVA standards, compound API, `lex-` prefix, `ui-components.mdc` rule + `$components-authoring` skill     | [ROADMAP § Component standardization](./ROADMAP.md#component-standardization-shipped) + [decisions below](#cs-component-standardization)                  | CS wave      |
| **M4**      | `@dalexto/lexsys` entry shim, CLI aliases, guided modes, `src/core/` layout                                      | [ROADMAP § M4](./ROADMAP.md#phase-overview)                                                                                                               | M4.1–M4.13   |
| **M8**      | CLI dead-code removal, `--yes` wiring, install results merge, remote fetch dedupe                                | [ROADMAP § M8](./ROADMAP.md#m8-cli-cleanup-and-deduplication)                                                                                             | M8.1–M8.6    |
| **M12**     | Command audit, help cleanup, UX optimizations, `status --json`                                                   | [ROADMAP § M12](./ROADMAP.md#m12-cli-command-optimization)                                                                                                | M12.1–M12.5  |
| **SI.1–5**  | Rebrand post-run (`format`, `check`); `registry:sync` full item reconciliation for all layers                    | [REGISTRY.md § Maintainer notes](./reference/registry/REGISTRY.md#maintainer-notes)                                                                       | SI wave      |

### 0.1.0 Execution Queue

Sorted PR order for the 0.1.0 improvement roadmap. Per-ID outcomes: [§ Shipped index (all IDs)](#shipped-index-all-ids). DX.1 remains **deferred**.

| Order | PR  | ID(s)  | Outcome (short)                                        | Detail                                                                                        |
| ----- | --- | ------ | ------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| 1     | A1  | all    | Docs integration + drift fix across hub and operations | [INDEX.md](./INDEX.md)                                                                        |
| 2     | A3  | REL.2  | Provenance + SBOM in release pipeline                  | [DEPLOY § Pre-release gate](./operations/DEPLOY.md#pre-release-gate)                          |
| —     | —   | manual | PulseDesk consumer QA (`< md` viewport)                | [TESTING § Consumer sandbox](./operations/TESTING.md#consumer-sandbox-verification)           |
| 3     | A4  | M10    | **0.1.0 @ latest** npm publish                         | [CHANGELOG § 0.1.0](../CHANGELOG.md#010-2026-06-06)                                           |
| 4     | B1  | UC.8   | Pagination primitive in registry                       | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                 |
| 5     | B2  | UC.9   | Breadcrumb primitive                                   | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                 |
| 6     | B3  | UC.10  | DatePicker primitive                                   | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                 |
| 7     | C1  | UC.11  | PageHeader block                                       | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                 |
| 8     | C2  | UC.12  | StatsCard block                                        | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                 |
| 9     | C3  | UC.13  | FilterToolbar block                                    | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                 |
| 10    | C4  | UC.14  | DataTable block                                        | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                 |
| 11    | C5  | UC.15  | CommandPalette → Combobox wiring                       | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                 |
| 12    | C6  | UC.16  | SettingsPageLayout template                            | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                                                 |
| 13    | D1  | DX.4   | `apps/docs` minimal site                               | [ROADMAP § DX track](./ROADMAP.md#dx-track)                                                   |
| 14    | D2  | DX.5   | `docs:lint` automation in CI                           | [SCRIPTS.md](./operations/SCRIPTS.md)                                                         |
| 15    | E1  | TOK.1  | Dedicated tokens for 9 aliased primitives              | [TOKENS.md](./reference/tokens/TOKENS.md)                                                     |
| 16    | E2  | TOK.2  | Expand `SEMANTIC_CONTRAST_PAIRS`                       | [TOKENS.md](./reference/tokens/TOKENS.md)                                                     |
| 17    | F1  | SEC.1  | Remote registry checksum/allowlist                     | [CLI.md](./reference/cli/CLI.md)                                                              |
| 18    | F2  | CLI.1  | CLI polish (`status --json`)                           | [CLI.md](./reference/cli/CLI.md)                                                              |
| —     | G2a | DX.3   | Fresh install/build smoke (`@latest`)                  | [TESTING § DX.3](./operations/TESTING.md#dx3-fresh-install-smoke-lexsys-fresh-test-shipped)   |
| —     | G2b | DX.2   | Playwright E2E — 4 scenarios in PulseDesk              | [TESTING § DX.2](./operations/TESTING.md#dx2-playwright-e2e-sandbox-lexsys-pulsedesk-shipped) |
| —     | G1  | DX.1   | Public starter repo                                    | deferred — [§ Known gaps](#known-gaps)                                                        |

Phase summary (0.1.0 wave):

| Phase          | Focus                                      | Status  |
| -------------- | ------------------------------------------ | ------- |
| **REL**        | 0.1.0 release gate (PR A1–A4)              | shipped |
| **UC+**        | Admin catalog expansion (PR B1–C6)         | shipped |
| **DX**         | `apps/docs` + `docs:lint` (PR D1–D2)       | shipped |
| **TOK**        | Token hardening (PR E1–E2)                 | shipped |
| **SEC+CLI**    | Registry trust + M12.5 (PR F1–F2)          | shipped |
| **PLAYGROUND** | fresh-test smoke + PulseDesk E2E (G2a–G2b) | shipped |

### P2.0 — Release gate (REL)

Release gate items **shipped** — see [REL.2 and M10](#shipped-index-all-ids) in the master index. Checklist: [Deploy guide § Pre-release gate](./operations/DEPLOY.md#pre-release-gate).

### P2.1 — UI catalog expansion (UC.8–UC.16)

Admin catalog **shipped** — nine installable items (UC.8–UC.16). Inventory and exports: [UI_CATALOG.md](./reference/ui/UI_CATALOG.md). Per-item rows: [§ Shipped index (all IDs)](#shipped-index-all-ids).

### P2.2 — DX (DX.1–DX.5)

DX track outcomes indexed above. **DX.1** deferred; **DX.2–DX.5** shipped with runbooks in [TESTING.md](./operations/TESTING.md) (E2E, fresh smoke) and [SCRIPTS.md](./operations/SCRIPTS.md) (`docs:lint`).

| ID   | What shipped (summary)                    | Detail                                                                                        |
| ---- | ----------------------------------------- | --------------------------------------------------------------------------------------------- |
| DX.1 | —                                         | deferred — [§ Known gaps](#known-gaps)                                                        |
| DX.2 | Playwright E2E — 4 scenarios in PulseDesk | [TESTING § DX.2](./operations/TESTING.md#dx2-playwright-e2e-sandbox-lexsys-pulsedesk-shipped) |
| DX.3 | Fresh `@latest` install/build smoke       | [TESTING § DX.3](./operations/TESTING.md#dx3-fresh-install-smoke-lexsys-fresh-test-shipped)   |
| DX.4 | `apps/docs` minimal site                  | [ROADMAP § DX track](./ROADMAP.md#dx-track)                                                   |
| DX.5 | `docs:lint` in CI                         | [SCRIPTS.md](./operations/SCRIPTS.md)                                                         |

### P2.3 — Tokens shipped (TOK.1–TOK.8)

Post–Phase 10 token hardening **shipped** for TOK.1–TOK.3, TOK.5, TOK.7, TOK.8. Index rows: [§ Shipped index (all IDs)](#shipped-index-all-ids). Open: TOK.6 (**planned**), TOK.4 (**deferred**) — [§ Open backlog](#open-backlog).

**TOK.7 harmonization map** (audit complete 2026-06-07; `pnpm ui:audit` clean):

| Block / template / primitive | Token home                      |
| ---------------------------- | ------------------------------- |
| `FilterToolbar`, `Toolbar`   | `toolbar.ts`                    |
| `DatePicker`                 | `date-picker.ts`                |
| `Sidebar` shell chrome       | `sidebar.ts`                    |
| `PageHeader`                 | `page-header.ts`                |
| `DashboardShell`             | `dashboard-shell.ts`            |
| `DataTable`                  | `data-table.ts`                 |
| `CommandPalette`             | `command-palette.ts`            |
| `StatsCard`                  | `stats-card.ts`                 |
| `FormField`, `AuthForm`      | `form-field.ts`, `auth-form.ts` |
| `SettingsPageLayout`         | `settings-page-layout.ts`       |

**TOK.8 motion tier map** ([DESIGN_SYSTEM § Motion rhythm](./reference/tokens/DESIGN_SYSTEM.md#motion-rhythm-duration-tiers)):

| Tier           | Semantic alias                 | Components (wired)                                                             |
| -------------- | ------------------------------ | ------------------------------------------------------------------------------ |
| fast (150ms)   | `motion.duration.control`      | Button, Input, Toggle, Switch, Checkbox, Radio, Badge, Tooltip, field focus    |
| normal (250ms) | `motion.duration.surface`      | Accordion, Tabs, Select, Menu, Combobox, Popover, NavigationMenu, Autocomplete |
| slow (350ms)   | `motion.duration.overlayEnter` | Drawer, Dialog, AlertDialog (+ `easeIn`)                                       |
| fast exit      | `motion.duration.overlayExit`  | Overlay close path                                                             |
| layout (350ms) | `motion.duration.layout`       | Sidebar, DashboardShell layout chrome                                          |
| slower (500ms) | `motion.duration.page`         | deferred — [§ Open backlog](#open-backlog)                                     |

### P2.4 — Trust + CLI (SEC.1, M12.5)

**SEC.1** and **CLI.1** shipped — see [master index](#shipped-index-all-ids). CLI contract: [CLI.md](./reference/cli/CLI.md). M12 sub-items: [§ M12](#m12-cli-command-optimization-shipped).

### UI composition (primitives / blocks / templates)

Composition track **shipped** (UC.1–UC.7, PR #28, M11). Rules and sequencing: [UI_COMPOSITION.md](./reference/ui/UI_COMPOSITION.md). Installable inventory: [UI_CATALOG.md](./reference/ui/UI_CATALOG.md). UC.7 phases 0–7 complete (governance → compound blocks/templates → sandbox → tests).

### Blocks / templates optimization backlog

BO.1–BO.7 **fixed** — mobile Sidebar, DashboardShell layout, install smoke, render audit, FormField in PulseDesk. Outcomes: [BO rows in master index](#shipped-index-all-ids). Gate for **new** blocks/templates: [TESTING § Consumer sandbox](./operations/TESTING.md#consumer-sandbox-verification).

### SB - Sidebar enterprise upgrade

**Shipped** SB.1–SB.22; SB.20 released **0.1.2** train. Compound API and Sidebar tree: [UI_COMPOSITION.md](./reference/ui/UI_COMPOSITION.md). Token/motion detail: [TOK.5 / TOK.7 / TOK.8](#p23-tokens-shipped-tok1tok8) in master index.

Pick-up order (historical): SB.1 → SB.2 → SB.3 → SB.4 → SB.18 → SB.19 → SB.11 → SB.5 → SB.7 → SB.8 → SB.9 → SB.12–SB.17 → SB.6 → SB.10 → SB.20.

### CS - Component Standardization

CS.1–CS.8 **shipped**. Roadmap summary: [ROADMAP § Component standardization](./ROADMAP.md#component-standardization-shipped).

**CS.8 locked decisions:**

- `SidebarItemLink` / `SidebarItemButton` use plain `<a>` / `<button>` — not our `Button` primitive
- Pilot blocks exported from `packages/ui` for playground smoke only; consumers install via `lexsys add`
- `SidebarTrigger` composable; `Drawer` context wraps root `<aside>`

### M4 - Entry + CLI DX (shipped)

M4.1–M4.13 **shipped** — `@dalexto/lexsys` entry shim, CLI aliases/flags, guided modes, `src/core/` layout. Detail: [ROADMAP § M4](./ROADMAP.md#phase-overview).

### M8 - CLI Cleanup and Deduplication (shipped)

M8.1–M8.6 **shipped** — dead exports, `--yes`, merged install results, deduped remote fetch. Detail: [ROADMAP § M8](./ROADMAP.md#m8-cli-cleanup-and-deduplication).

### M10 - Release readiness (shipped 2026-05-24)

- First publish: `@dalexto/lexsys-cli@0.0.1` @ **`next`** (2026-05-24)
- Stable: **`0.1.2`** @ **`latest`** (2026-06-07); prior **`0.1.0`** / **`0.1.1`** housekeeping (2026-06-06)
- Detail: [CHANGELOG](../CHANGELOG.md), [ROADMAP § M10](./ROADMAP.md#m10-release-readiness)

### M12 - CLI command optimization (shipped)

M12.1–M12.5 **shipped** (includes CLI.1 / `status --json`). Detail: [ROADMAP § M12](./ROADMAP.md#m12-cli-command-optimization), [CLI.md](./reference/cli/CLI.md).

### SI - Script Improvements

SI.1–SI.5 **shipped** — rebrand post-run pipeline; `registry:sync` reconciles all `src/items/`. Detail: [REGISTRY.md § Maintainer notes](./reference/registry/REGISTRY.md#maintainer-notes).

---

## Related documentation

| Doc                                                     | Why                                         |
| ------------------------------------------------------- | ------------------------------------------- |
| [ROADMAP.md](./ROADMAP.md)                              | M-phase status and long-term sequencing     |
| [DESIGN_SYSTEM.md](./reference/tokens/DESIGN_SYSTEM.md) | TOK.6/TOK.7/TOK.8 rhythm and motion intent  |
| [UI_COMPOSITION.md](./reference/ui/UI_COMPOSITION.md)   | Layer rules and composition sequencing      |
| [TESTING.md](./operations/TESTING.md)                   | Verification surfaces and sandbox checklist |
| [SCRIPTS.md](./operations/SCRIPTS.md)                   | `pnpm` check gates by touched path          |
