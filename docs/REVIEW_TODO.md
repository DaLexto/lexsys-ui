# Lexsys Backlog

**Audience:** Maintainers
**Type:** Roadmap / backlog
**Source of truth for:** Active work items, known gaps, next priorities

Long-term tokens platform direction lives in [docs/ROADMAP.md](./ROADMAP.md).

Completed work is tracked in git history. This document only contains items
that are not yet done.

---

## Execution Queue (active)

**Monorepo optimization M1–M10** — see [ROADMAP.md § Monorepo optimization](./ROADMAP.md#monorepo-optimization-planned). M1–M3 and M5–M7 shipped; **M4 reserved** (scope TBD); **R0 Lexsys rebrand** in progress (blocks M10); **M10 release readiness** planned after R0 merges.

| Phase   | Focus                                                               | Status      |
| ------- | ------------------------------------------------------------------- | ----------- |
| Phase 0 | ROADMAP + REVIEW_TODO publish                                       | done        |
| R0      | Neurex → Lexsys rebrand (blocks M10)                                | in progress |
| M1      | Infra and DX (filter, CI, turbo, docs)                              | shipped     |
| M2      | Quality (Tier 2 tests, playground CI, sandbox checklist)            | shipped     |
| M3      | Product and architecture (render 32/32, Next init, remote registry) | shipped     |
| M4      | (TBD — scope to be defined)                                         | planned     |
| M5      | Advanced CI (path filters, registry:check on UI PRs)                | shipped     |
| M6      | Dependency hygiene (Dependabot, lockfile policy)                    | shipped     |
| M7      | Maintainer tooling (README, CONTRIBUTING, agent skills)             | shipped     |
| M10     | Release readiness — first npm `0.0.1` @ `next`                      | planned     |
| UI      | Composition pilots + flat CLI install (PR #28)                      | shipped     |
| BO      | Blocks/templates optimization (BO.1–BO.7)                           | shipped     |

Previous queue (**E → A → C → B → Docs**) — completed 2026-05-23.

---

## R0 — Lexsys rebrand

**Goal:** Rename Neurex → Lexsys across the monorepo before first npm publish.
No legacy consumer migration (pre-publish dev phase).

**Canonical reference:** [REBRAND.md](./REBRAND.md)

| ID   | Deliverable                                     | Status                  |
| ---- | ----------------------------------------------- | ----------------------- |
| R0.1 | `scripts/rebrand/` + `REBRAND.md`               | done                    |
| R0.2 | `apply-rebrand --write` + `verify-rebrand` pass | done                    |
| R0.3 | `@lexsys/cli` publish surface (DEPLOY, README)  | done                    |
| R0.4 | Legacy `neurex.config.json` fallback            | skipped                 |
| R0.5 | Regenerate token CSS + `registry:sync`          | done                    |
| R0.6 | Token test expectations (`lsys` / `twix`)       | done                    |
| R0.7 | Docs + REVIEW_TODO R0 track                     | done                    |
| R0.8 | `pnpm check` green + PR to `dev`                | check green; PR pending |

**Branch:** `feat/r0-lexsys-rebrand` → PR to `dev` before M10 work lands.

---

## M10 — Release readiness

**Goal:** First npm release `@lexsys/cli@0.0.1` and `@lexsys/registry@0.0.1` on dist-tag
**`next`**. Stable MVP **`0.1.0`** on **`latest`** is a later milestone.

**Canonical publish-day checklist:** [DEPLOY.md § First release checklist](./DEPLOY.md#first-release-checklist-001-next)

| ID    | Deliverable                                               | Status       |
| ----- | --------------------------------------------------------- | ------------ |
| M10.0 | Publish surface + version lane (DEPLOY, ROADMAP, README)  | partial (R0) |
| M10.1 | Root `CHANGELOG.md`                                       | planned      |
| M10.2 | Package metadata audit + `pnpm publish:pack-audit`        | planned      |
| M10.3 | Changesets + publish CI (`next` tag)                      | planned      |
| M10.4 | First publish + post-publish `npx @lexsys/cli@next` smoke | planned      |

Detail: [ROADMAP.md § M10](./ROADMAP.md#m10--release-readiness).

---

## Verification policy (maintainer contract)

Canonical detail: [docs/TESTING.md § Verification surfaces](./TESTING.md#verification-surfaces).

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
- Token engine: resolved value pipeline, composite typography + shadow/border registry, governance graph, WCAG contrast report + CI policy (`docs/RESOLVER_EVOLUTION.md`)
- Post–Phase 10 hardening: contrast pair registry (15 pairs); background compositing; `rgb()` / `hsl()` parsing; build-failing contrast in CSS build; primitive shadow scale `0`–`6` on branch+slot with CSS compose; elevation shadows reference primitive slots
- ScrollArea component (UI, tokens, registry, playground) merged via PR #14 (`884e3eb`)
- `lexsys uninstall` removes registry-owned files with dry-run and conflict reporting
- UI render test pilot: ScrollArea, Collapsible, Dialog (`@testing-library/react` + Vitest jsdom)
- Broad UI render coverage: all 41 bundled primitives have render smoke tests
- Next.js App Router minimal scaffold (`lexsys init next`; pinned Next.js 15.3.3)
- Remote registry manifest contract (`parseRemoteRegistry`, optional `styles`, local fallback)
- Governance CI promotion: semantic audit **`error`-severity** fails `pnpm tokens:governance:report` (`NEUREX_GOVERNANCE_POLICY`)
- `shadow.inner` inset slot model (branch+slot with `inset: true`)
- Style installation (token CSS wired into consumer project on `lexsys init` / `lexsys add`)
- Tailwind v4 + Vite or Next.js init sequence
- Registry validation and publish-safe template resolution
- Documentation alignment with current token/UI contracts (`docs/TOKENS.md`, design system, architecture, CLI, package READMEs)
- Tier 1 test coverage: CLI uninstall orphan cleanup, contrast failure codes + policy tiers, registry style sync helpers (`docs/TESTING.md`)
- Per-package `vitest.config.ts` for Vitest VS Code extension discovery (Vitest 4; no root workspace file)
- UI package polish (PR #24, `c619a85`): unified variant API, `danger` vocabulary, semantic opacity, viewport inset tokens, `pnpm ui:audit` ([UI_VARIANTS.md](./UI_VARIANTS.md))
- Post–PR #24 ship (PR #25, `af729d5`): CLI `--sync` / `--utilities`, overlay token semantics, blocking `ui:audit`, full variant token sweep ([UI_VARIANTS.md](./UI_VARIANTS.md), [CLI.md](./CLI.md))
- Sandbox primitive QA (PR #26, `61c25a6`): Menu horizontal flyout collision avoidance, toast success/info/destructive surfaces, [UI_COMPOSITION.md](./UI_COMPOSITION.md) composition track
- Consumer sandbox verify (PR #26 artifacts): `lexsys update menu toast --sync --styles --force`; Settings flyout on narrow viewport; toast success/info/destructive surfaces — **manual checklist pass**
- UI composition layers (PR #28): monorepo `primitives/blocks/templates` reference layout; flat consumer install via `paths.components` + import rewrite; pilot FormField, Sidebar, DashboardShell registry + CLI installable; `list` by layer; `--with-deps` uninstall

The current implementation supports: Vite or Next.js App Router + React + Tailwind v4, `lexsys init`, `lexsys add`, `lexsys update`, all 41 bundled primitives, and pilot blocks/templates (FormField, Sidebar, DashboardShell).

Known gaps below.

---

## P2 — Product and DX

### UI composition (primitives / blocks / templates)

Canonical composition model: [docs/UI_COMPOSITION.md](./UI_COMPOSITION.md). Roadmap sequencing:
[ROADMAP.md § UI composition](./ROADMAP.md#ui-composition--three-layers-pilots-shipped).

**Today:** PR #28 merged — monorepo reference uses `primitives/`, `blocks/`, `templates/`; consumer install is flat under `paths.components` (`src/components/ui/<CanonicalName>/`). Pilot blocks and template are `lexsys add`-installable. BO.1–BO.7 fixed (CI install smoke, render tests, registry template-import audit); pilots marked stable. Narrow-viewport sandbox QA remains manual per [TESTING.md § Blocks/templates checklist](./TESTING.md#consumer-sandbox-verification).

**Target:** expand registry **blocks** and **templates** beyond the pilot set. **`lexsys add <name>`** installs the transitive closure via `registryDependencies`; `item.target` resolves to the flat components root (monorepo templates still live under `primitives/`, `blocks/`, or `templates/` source folders).

| Item | Layer     | Status  | Notes                                                                                                             |
| ---- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| UC.1 | All       | shipped | Monorepo layout, composition validators, layer docs — ongoing docs alignment on `docs/post-ui-layers-alignment`   |
| UC.2 | Blocks    | shipped | Pilot FormField, Sidebar — BO pass complete; CI render + install smoke                                            |
| UC.3 | Templates | shipped | DashboardShell mobile layout fixed; CI render + install smoke                                                     |
| UC.4 | Pages     | n/a     | Pages stay consumer-owned                                                                                         |
| UC.5 | CLI       | shipped | `paths.components`, flat `item.target` install, import rewrite, `list` by layer, `--with-deps` uninstall (PR #28) |
| UC.6 | Tests     | shipped | Block install smoke, render tests, registry template-import audit; closure/import-rewrite unit tests              |

### Blocks / templates optimization backlog

**Context:** Consumer sandbox (PulseDesk SaaS demo) QA during PR #28 exposed that **blocks/templates are not “organization-only” quality**. Primitives were assumed production-ready when composing blocks; that assumption is **not validated** for composed/mobile flows.

**Do not ship new blocks/templates without CI install smoke + render coverage** (see [TESTING.md](./TESTING.md)). BO.1–BO.7 are fixed; see status column.

| ID   | Area              | Issue                                       | Status / notes                                                                                                                                                                                 |
| ---- | ----------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BO.1 | Sidebar (mobile)  | Drawer opens but nav list layout broken     | **Fixed** — plain `<nav>` list; Menu removed from Sidebar deps.                                                                                                                                |
| BO.2 | Sidebar (mobile)  | Drawer composition incomplete vs playground | **Fixed** — `swipeDirection="left"`, DrawerViewport side left, `DrawerClose appearance="inline"` on nav select (avoids absolute icon stacking). Sandbox manual QA at `< md` still recommended. |
| BO.3 | DashboardShell    | Responsive layout                           | **Fixed** — sticky mobile trigger bar; page header in main (not squeezed beside trigger). Sidebar `mobileHeader` remains optional for compact slots only.                                      |
| BO.4 | Blocks QA process | No block-level validation gate              | **Fixed** — `install-flow.test.ts` covers all registry blocks (solo + bulk idempotency, flat import paths, transitive closure).                                                                |
| BO.5 | Assumption audit  | “Primitives good → blocks good”             | **Fixed** — pilot block/template render smoke in `@lexsys/ui`; registry template-import audit in `registry:check`. Narrow viewport remains manual sandbox.                                     |
| BO.6 | Sidebar (design)  | Menu vs nav list                            | **Fixed** — plain `<a>` / `<button>` nav list.                                                                                                                                                 |
| BO.7 | FormField         | Untested in sandbox                         | **Fixed** — `lexsys add form-field` + SettingsPage uses FormField in PulseDesk sandbox.                                                                                                        |

**Verification surface when picking this up:** consumer sandbox at narrow viewport (`< md`); `lexsys add dashboard-shell` fresh install; compare drawer to playground `DrawerViewport side="right"` pattern.

**Related fixes already landed (PR #28):** valid border tokens in Sidebar/DashboardShell variants; flat consumer install path `src/components/ui/`; Sidebar drawer trigger wiring. Post–PR #30 + `ef65072`: plain nav, mobile drawer, FormField sandbox, `DrawerClose` inline appearance, DashboardShell mobile layout.

---

## P3 — Architecture Planning

Optional follow-ups after Phases 1–10 (detail in
[docs/RESOLVER_EVOLUTION.md — After Phase 10](./RESOLVER_EVOLUTION.md#after-phase-10)):

- Further expand `SEMANTIC_CONTRAST_PAIRS` (design sign-off per pair)
- DTCG composite object `$value` engine phase (option B — after slot model stable)
- Speculative AST evaluator and color/unit math — **deferred**, not scheduled

**Shipped in P3 pass:**

- ~~Extend composite registry beyond typography~~ — shadow/border schemas; elevation shadow pilot; `border.control` group
- ~~Contrast policy CI gate~~ — `contrast.policy.ts`; `governance:report` exits 1 on failures in CI
- ~~Overlay background compositing + overlay contrast pair~~ — compositing over `color.background.base`; `text-primary-on-overlay` pair
- ~~Build-failing contrast~~ — `validateContrastPolicyStrict` in `validateStyleTokenInput` (unless `NEUREX_CONTRAST_POLICY=report`)
- ~~Contrast pair expansion (partial)~~ — danger/secondary action + large-text heading pairs (15 pairs)
- ~~Full primitive shadow migration~~ — `shadow.0`–`shadow.6` branch+slot; elevation refs; CSS compose for primitive + semantic paths
- ~~Broad UI render coverage~~ — 32/32 components (M3.1)
- ~~Next.js scaffold~~ — `lexsys init next` App Router minimal (M3.2)
- ~~Remote registry contract~~ — manifest parser + validation (M3.3)
- ~~Governance promotion (semantic audit errors)~~ — `NEUREX_GOVERNANCE_POLICY` (M3.4)
- ~~`shadow.inner` inset slot~~ — branch+slot + CSS compose (M3.5)
- ~~UI package polish~~ — PR #24 (`c619a85`): `variant`/`appearance`/`danger` API, 32-component token compliance, `pnpm ui:audit` ([UI_VARIANTS.md](./UI_VARIANTS.md))

## Known Gaps

| Gap                                    | Notes                                                                                                                             |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Blocks/templates mobile viewport QA    | Manual sandbox only — CI covers install smoke + render composition; `< md` drawer/layout checklist in [TESTING.md](./TESTING.md). |
| Remote registry signatures / allowlist | Deferred post-M10 — manifest fetch is HTTPS-only; no checksum or host allowlist yet.                                              |

Resolved (reference only — see git history): CVA helpers in installed `utils.ts` (PR #25); Select popup layout (PR #25); CLI diagnostics and install-flow tests in `packages/cli/test/`.
