# Lexsys Backlog

**Audience:** Maintainers
**Type:** Roadmap / backlog
**Source of truth for:** Active work items, known gaps, next priorities

Long-term tokens platform direction lives in [docs/ROADMAP.md](./ROADMAP.md).

Completed work is tracked in git history. This document only contains items
that are not yet done.

---

## Execution Queue (active)

**Monorepo optimization M1–M10** — see [ROADMAP.md § Monorepo optimization](./ROADMAP.md#monorepo-optimization-planned). M1–M4, M5–M7, **R0**, and **M10** shipped; **M8 shipped** (CLI cleanup and deduplication — all sub-items complete).

| Phase   | Focus                                                               | Status  |
| ------- | ------------------------------------------------------------------- | ------- |
| Phase 0 | ROADMAP + REVIEW_TODO publish                                       | done    |
| R0      | Lexsys product naming + publish surface (blocks M10)                | shipped |
| M1      | Infra and DX (filter, CI, turbo, docs)                              | shipped |
| M2      | Quality (Tier 2 tests, playground CI, sandbox checklist)            | shipped |
| M3      | Product and architecture (render 32/32, Next init, remote registry) | shipped |
| M4      | Entry + CLI DX                                                      | shipped |
| M5      | Advanced CI (path filters, registry:check on UI PRs)                | shipped |
| M6      | Dependency hygiene (Dependabot, lockfile policy)                    | shipped |
| M7      | Maintainer tooling (README, CONTRIBUTING, agent skills)             | shipped |
| M8      | CLI cleanup and deduplication                                       | shipped |
| M10     | Release readiness — `0.0.2` @ `next` (first: `0.0.1` 2026-05-24)    | shipped |
| UI      | Composition pilots + flat CLI install (PR #28)                      | shipped |
| BO      | Blocks/templates optimization (BO.1–BO.7)                           | shipped |
| CS      | Component standardization before new component expansion            | planned |

Previous queue (**E → A → C → B → Docs**) — completed 2026-05-23.

---

## M4 — Entry + CLI DX (shipped)

Detail: [ROADMAP.md § M4](./ROADMAP.md#phase-overview).

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

## M8 — CLI Cleanup and Deduplication (shipped)

Detail: [ROADMAP.md § M8](./ROADMAP.md#m8--cli-cleanup-and-deduplication).

| Item | Description                                                                                         | Status  |
| ---- | --------------------------------------------------------------------------------------------------- | ------- |
| M8.1 | Remove dead exports (`writeFileIfMissing`, `resolveComponentsRoot`) + unreachable `index.ts` footer | shipped |
| M8.2 | Implement `--yes` properly in `add.ts` and `update.ts` (was no-op stub)                             | shipped |
| M8.3 | Merge `install/results.ts` + `install/uninstall-results.ts` into generic module                     | shipped |
| M8.4 | Unify `RegistryCommandResult` / `RegistryProviderResult` + dedupe remote fetch logic                | shipped |
| M8.5 | Extract shared `prompts` multiselect helper to `utils/prompt.ts`                                    | shipped |
| M8.6 | Extract shared scaffold helpers to `scaffold/scaffold-helpers.ts`                                   | shipped |

---

## M10 — Release readiness (shipped 2026-05-24)

**First publish (historical):** `@dalexto/lexsys-cli@0.0.1` and `@dalexto/lexsys-registry@0.0.1` on npm dist-tag **`next`**
via Release CI ([`release.yml`](../.github/workflows/release.yml)). Record:
[CHANGELOG.md](../CHANGELOG.md#001---2026-05-24).

**Current preview:** `0.0.2` @ `next` (2026-05-25) — M4 entry + CLI DX + M8 CLI cleanup.

**Next milestone:** **`0.1.0`** on dist-tag **`latest`** — [DEPLOY.md § Transition to
0.1.0](../operations/DEPLOY.md#transition-to-010-latest).

Detail: [ROADMAP.md § M10](./ROADMAP.md#m10--release-readiness).

---

## Verification policy (maintainer contract)

Canonical detail: [docs/operations/TESTING.md § Verification surfaces](../operations/TESTING.md#verification-surfaces).

- **`apps/playground`** — monorepo smoke, **maintenance-only** (~10–20% focus). Optional `pnpm playground:dev`; category nav for quick scans. Do not build product UX here unless the PR explicitly targets `apps/playground/**`.
- **Consumer sandbox** — **consumer truth** (~80–90% focus) for CLI, registry, template, and install-artifact PRs. Manual checklist — not CI.
- **Playground dark/brand demos** — deferred; consumer UX belongs in sandbox/SaaS ([ROADMAP.md § Explicitly deferred](./ROADMAP.md#explicitly-deferred)).
- **Change workflow** — branch off `dev` → implement → docs alignment → PR to `dev` last; **`main` untouched** unless explicitly requested ([AGENTS.md § Change workflow](../AGENTS.md#change-workflow)).

---

## Current State

The P0 and P1 implementation passes are complete:

- CLI install safety (idempotency, conflict detection, `--cwd` scoping, packed template resolution)
- Token foundation (DTCG-shaped source, CSS + DTCG JSON generation, brand layer, theme modes)
- Token platform phases 1–10 (factory authoring through accessibility contrast guard; see [docs/ROADMAP.md](./ROADMAP.md))
- Token engine: resolved value pipeline, composite typography + shadow/border registry, governance graph, WCAG contrast report + CI policy (`docs/reference/tokens/RESOLVER_EVOLUTION.md`)
- Post–Phase 10 hardening: contrast pair registry (15 pairs); background compositing; `rgb()` / `hsl()` parsing; build-failing contrast in CSS build; primitive shadow scale `0`–`6` on branch+slot with CSS compose; elevation shadows reference primitive slots
- ScrollArea component (UI, tokens, registry, playground) merged via PR #14 (`884e3eb`)
- `lexsys uninstall` removes registry-owned files with dry-run and conflict reporting
- UI render test pilot: ScrollArea, Collapsible, Dialog (`@testing-library/react` + Vitest jsdom)
- Broad UI render coverage: all 41 bundled primitives have render smoke tests
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
- UI package polish (PR #24, `c619a85`): unified variant API, `danger` vocabulary, semantic opacity, viewport inset tokens, `pnpm ui:audit` ([UI_VARIANTS.md](./reference/ui/UI_VARIANTS.md))
- Post–PR #24 ship (PR #25, `af729d5`): CLI `--sync` / `--utilities`, overlay token semantics, blocking `ui:audit`, full variant token sweep ([UI_VARIANTS.md](./reference/ui/UI_VARIANTS.md), [CLI.md](./reference/cli/CLI.md))
- Sandbox primitive QA (PR #26, `61c25a6`): Menu horizontal flyout collision avoidance, toast success/info/destructive surfaces, [UI_COMPOSITION.md](./reference/ui/UI_COMPOSITION.md) composition track
- Consumer sandbox verify (PR #26 artifacts): `lexsys update menu toast --sync --styles --force`; Settings flyout on narrow viewport; toast success/info/destructive surfaces — **manual checklist pass**
- UI composition layers (PR #28): monorepo `primitives/blocks/templates` reference layout; flat consumer install via `paths.components` + import rewrite; pilot FormField, Sidebar, DashboardShell registry + CLI installable; `list` by layer; `--with-deps` uninstall

The current implementation supports: Vite or Next.js App Router + React + Tailwind v4, `lexsys init`, `lexsys add`, `lexsys update`, all 41 bundled primitives, and pilot blocks/templates (FormField, SettingsPanel, Sidebar, AuthForm, CommandPalette, DashboardShell).

Known gaps below.

---

## P2 — Product and DX

### UI composition (primitives / blocks / templates)

Canonical composition model: [docs/reference/ui/UI_COMPOSITION.md](./reference/ui/UI_COMPOSITION.md). Roadmap sequencing:
[ROADMAP.md § UI composition](./ROADMAP.md#ui-composition--three-layers-pilots-shipped).

**Today:** PR #28 merged — monorepo reference uses `primitives/`, `blocks/`, `templates/`; consumer install is flat under `paths.components` (`src/components/ui/<CanonicalName>/`). Pilot blocks and template are `lexsys add`-installable. BO.1–BO.7 fixed (CI install smoke, render tests, registry template-import audit); pilots marked stable. Narrow-viewport sandbox QA remains manual per [TESTING.md § Blocks/templates checklist](../operations/TESTING.md#consumer-sandbox-verification).

**Target:** expand registry **blocks** and **templates** beyond the pilot set. **`lexsys add <name>`** installs the transitive closure via `registryDependencies`; `item.target` resolves to the flat components root (monorepo templates still live under `primitives/`, `blocks/`, or `templates/` source folders).

| Item | Layer     | Status  | Notes                                                                                                                                                     |
| ---- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UC.1 | All       | shipped | Monorepo layout, composition validators, layer docs — ongoing docs alignment on `docs/post-ui-layers-alignment`                                           |
| UC.2 | Blocks    | shipped | Pilot FormField, SettingsPanel, Sidebar, AuthForm, CommandPalette — BO pass complete; CI render + install smoke                                           |
| UC.3 | Templates | shipped | DashboardShell mobile layout fixed; CI render + install smoke                                                                                             |
| UC.4 | Pages     | n/a     | Pages stay consumer-owned                                                                                                                                 |
| UC.5 | CLI       | shipped | `paths.components`, flat `item.target` install, import rewrite, `list` by layer, `--with-deps` uninstall (PR #28)                                         |
| UC.6 | Tests     | shipped | Block install smoke, render tests, registry template-import audit; closure/import-rewrite unit tests                                                      |
| UC.7 | Compound  | shipped | Compound-first API (M11): flat named exports, variant propagation, blocks/templates compound-only — [ROADMAP § M11](./ROADMAP.md#m11--compound-first-api) |

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

**Do not ship new blocks/templates without CI install smoke + render coverage** (see [TESTING.md](../operations/TESTING.md)). BO.1–BO.7 are fixed; see status column.

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

### CS — Component Standardization

**Purpose:** Standardize component authoring patterns across primitives, blocks,
templates, and registry templates before expanding the component catalog or
writing permanent component rules.

Roadmap anchor: [ROADMAP.md § Component standardization](./ROADMAP.md#component-standardization-planned).

| ID   | Area                     | Goal                                                                                                        | Status  |
| ---- | ------------------------ | ----------------------------------------------------------------------------------------------------------- | ------- |
| CS.1 | Review / Score           | Score primitives, blocks, and templates A/B/C/D; record good vs bad                                         | shipped |
| CS.2 | Variants standardization | Decide `.join(" ")`, CVA vs helpers, `*Variants()` naming, tokens                                           | shipped |
| CS.3 | Props / ref / className  | Tighten refs, explicit `ref?`, and className typing                                                         | shipped |
| CS.4 | Compound API consistency | Audit Sidebar context, Select ref asymmetry, and export shape                                               | shipped |
| CS.5 | Cleanup implementation   | Apply agreed standards and run `pnpm ui:check`                                                              | shipped |
| CS.6 | Registry sync            | Sync templates if UI install artifacts change                                                               | shipped |
| CS.7 | Prefix transform         | Fixed `lex-` prefix; `scripts/rebrand/rename-prefix.mjs` for future rebrand; 50 src + 42 test files updated | shipped |
| CS.8 | Rule + skill template    | Planned only; create after cleanup standards are stable                                                     | planned |

**CS.8 pre-rule intentional decisions (locked in CS.4):**

- `SidebarItemLink` / `SidebarItemButton` use plain `<a>` / `<button>` — not our `Button` primitive; their styling requirements differ and they own nav-item appearance independently.
- Blocks (`Sidebar`, `CommandPalette`, etc.) are not exported from `packages/ui/src/index.ts` — intentional registry-first; consumers install via `lexsys add`, not direct package imports.
- `SidebarTrigger` is composable — consumer places it in `<SidebarHeader>` or any `<Sidebar>` child; `Drawer` context wraps the root `<aside>` so any descendant `DrawerTrigger` wires up automatically.

---

## P3 — Architecture Planning

Optional follow-ups after Phases 1–10 (detail in
[docs/reference/tokens/RESOLVER_EVOLUTION.md — After Phase 10](./reference/tokens/RESOLVER_EVOLUTION.md#after-phase-10)):

- Further expand `SEMANTIC_CONTRAST_PAIRS` (design sign-off per pair)
- DTCG composite object `$value` engine phase (option B — after slot model stable)
- Speculative AST evaluator and color/unit math — **deferred**, not scheduled

**Shipped in P3 pass:**

- ~~Extend composite registry beyond typography~~ — shadow/border schemas; elevation shadow pilot; `border.control` group
- ~~Contrast policy CI gate~~ — `contrast.policy.ts`; `governance:report` exits 1 on failures in CI
- ~~Overlay background compositing + overlay contrast pair~~ — compositing over `color.background.base`; `text-primary-on-overlay` pair
- ~~Build-failing contrast~~ — `validateContrastPolicyStrict` in `validateStyleTokenInput` (unless `LEXSYS_CONTRAST_POLICY=report`)
- ~~Contrast pair expansion (partial)~~ — danger/secondary action + large-text heading pairs (15 pairs)
- ~~Full primitive shadow migration~~ — `shadow.0`–`shadow.6` branch+slot; elevation refs; CSS compose for primitive + semantic paths
- ~~Broad UI render coverage~~ — 32/32 components (M3.1)
- ~~Next.js scaffold~~ — `lexsys init next` App Router minimal (M3.2)
- ~~Remote registry contract~~ — manifest parser + validation (M3.3)
- ~~Governance promotion (semantic audit errors)~~ — `LEXSYS_GOVERNANCE_POLICY` (M3.4)
- ~~`shadow.inner` inset slot~~ — branch+slot + CSS compose (M3.5)
- ~~UI package polish~~ — PR #24 (`c619a85`): `variant`/`appearance`/`danger` API, 32-component token compliance, `pnpm ui:audit` ([UI_VARIANTS.md](./reference/ui/UI_VARIANTS.md))

## Known Gaps

| Gap                                    | Notes                                                                                                                                        |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Blocks/templates mobile viewport QA    | Manual sandbox only — CI covers install smoke + render composition; `< md` drawer/layout checklist in [TESTING.md](./operations/TESTING.md). |
| Remote registry signatures / allowlist | Deferred post-M10 — manifest fetch is HTTPS-only; no checksum or host allowlist yet.                                                         |

Resolved (reference only — see git history): CVA helpers in installed `utils.ts` (PR #25); Select popup layout (PR #25); CLI diagnostics and install-flow tests in `packages/cli/test/`.
