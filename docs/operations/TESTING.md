# Lexsys Testing

**Audience:** Maintainers, contributors, and agents
**Type:** Verification workflow reference
**Source of truth for:** Verification surfaces (playground vs sandbox), test coverage by package, when to run which checks
**Verified against:** `packages/*/test/`, `packages/*/vitest.config.ts`, `package.json` scripts
**Last reviewed:** 2026-05-30

---

## On this page

- [Verification surfaces](#verification-surfaces)
  - [apps/playground](#appsplayground)
  - [Consumer sandbox](#consumer-sandbox)
  - [PLAYGROUND verification surfaces](#playground-verification-surfaces)
  - [PLAYGROUND automation (planned)](#playground-automation-planned--external-repos)
  - [Practical workflow](#practical-workflow)
- [Quick Reference](#quick-reference)
- [Test Coverage by Package](#test-coverage-by-package)
  - [@dalexto/lexsys-tokens](#dalextolexsys-tokens)
  - [@dalexto/lexsys-ui](#dalextolexsys-ui)
  - [@dalexto/lexsys-registry](#dalextolexsys-registry)
  - [lexsys (CLI)](#lexsys-cli)
- [When to Run What](#when-to-run-what)
- [Template Sync Verification](#template-sync-verification)
- [Vitest configuration](#vitest-configuration)
  - [Playground tooling](#playground-tooling)
  - [IDE test explorer (Vitest extension)](#ide-test-explorer-vitest-extension)
- [UI render tests](#ui-render-tests)
- [Consumer sandbox verification](#consumer-sandbox-verification)
- [Known Gaps](#known-gaps)

Command names and sync workflows: [Scripts reference](SCRIPTS.md).

---

## Verification surfaces

Lexsys has two complementary manual verification surfaces. Invest maintainer time **asymmetrically** — most effort on the consumer path, not the playground.

| Surface                                 | Model                                                       | CSS source                                         | Validates                                                                             | Does not validate                                                                | Focus                                                      | Commands                                       |
| --------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------- |
| [`apps/playground`](../apps/playground) | Workspace `@dalexto/lexsys-ui` primitives + built token CSS | `@dalexto/lexsys-tokens` build output              | Reference primitive exports, category panel demos, light/dark theme wiring            | CLI install path, blocks/templates, user-owned layouts, mobile composition flows | **~10–20%** — optional monorepo smoke                      | `pnpm playground:dev`, `pnpm playground:check` |
| External consumer sandbox               | `lexsys add` → flat `paths.components/<Name>/`              | Installed `styles/tokens.css` + `styles/theme.css` | Install/update/uninstall, import rewrite, conflicts, installed CSS, block/template UX | Workspace `@dalexto/lexsys-ui` dist wiring inside the monorepo                   | **~80–90%** — consumer truth (especially blocks/templates) | Manual checklist below                         |
| Your SaaS (future)                      | Same as sandbox — CLI-installed consumer                    | Installed styles in your app                       | Primary product UX and design sign-off                                                | Monorepo reference wiring                                                        | Replaces sandbox as main UX surface over time              | Your app build + deploy                        |

**Policy:** `apps/playground` is **maintenance-only**. Keep existing panels compiling; do not expand playground product UX unless the PR explicitly targets `apps/playground/**`. Consumer UX belongs in sandbox or SaaS.

### `apps/playground`

- Imports `@dalexto/lexsys-ui` from workspace `dist/` — rebuild UI after variant changes.
- Sticky category nav: Brand, Layout, Actions, Forms, Overlays, Surfaces, Interactions (see [apps/playground/README.md](../apps/playground/README.md)).
- Optional after UI/token changes; CI runs `playground:build` when `apps/playground/**` changes (M2.4).

### Consumer sandbox

External projects outside this monorepo. Manual verification — not lexsys CI.

### PLAYGROUND verification surfaces

Two distinct consumer paths — do not conflate fresh-install lab with the real app.

| Path                              | Role                              | Validates                                                                  | Planned automation                             |
| --------------------------------- | --------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------- |
| `D:\PLAYGROUND\sandbox-lexsys`    | **PulseDesk** — real consumer app | Block/template UX, narrow viewport (`< md`), integration on real pages     | DX.2 Playwright E2E (`pnpm test:e2e`)          |
| `D:\PLAYGROUND\lexsys-fresh-test` | **Fresh-install lab**             | Clean `lexsys init` → `lexsys add` → `pnpm build`; CLI/registry regression | DX.3 smoke script (`pnpm smoke:install-build`) |

**PulseDesk (`sandbox-lexsys`)** — **primary manual gate** (~80–90% consumer truth) before PRs that touch CLI, registry, templates, blocks/templates, or install artifacts.

For **blocks/templates** changes (FormField, SettingsPanel, Sidebar, AuthForm, CommandPalette, Empty, DashboardShell), PulseDesk verification is required — playground render tests cover **primitives only**. See [Backlog § Blocks/templates optimization](../REVIEW_TODO.md#blocks-templates-optimization-backlog).

**Fresh-test (`lexsys-fresh-test`)** — optional parallel gate for reproducible install/build confidence; not a substitute for PulseDesk UX QA.

Tracked IDs (outcome + runbooks): [Backlog § Shipped index — DX.2 / DX.3](../REVIEW_TODO.md#p22-dx-dx1dx5).

### Practical workflow

| Step                                                   | When                                                                                                                |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `pnpm ui:check` / `pnpm registry:check` / `pnpm check` | After UI, token, registry, or CLI changes                                                                           |
| `pnpm playground:dev` (optional)                       | Quick component glance inside the monorepo                                                                          |
| Sandbox Vite + Next checklist (below)                  | Pre-PR when CLI/registry/templates affect what users install                                                        |
| SaaS app smoke                                         | When SaaS is active — primary consumer test; sandbox shrinks to minimal CLI regression (`add` / `update` / `build`) |

---

## Quick Reference

Primary gate: `pnpm check` (see [Scripts reference](../operations/SCRIPTS.md) for full inventory).

Per-package test commands are listed in each section below.

---

## Test Coverage by Package

### `@dalexto/lexsys-tokens`

Test files in `packages/tokens/test/`:

| File                       | What it tests                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `resolver.test.ts`         | Reference resolution — direct refs, nested chains, missing refs, circular detection, max depth, branch refs, strict vs safe mode  |
| `layer-validation.test.ts` | Layer contract enforcement — component-to-primitive, semantic-to-component, theme-to-component, brand component-intent violations |
| `governance.test.ts`       | Governance reports — metadata inventory, deprecation entries, dead primitive detection                                            |
| `semantic-audit.test.ts`   | Semantic audit — forbidden paths, missing groups, theme path drift                                                                |
| `types-authoring.test.ts`  | Factory authoring shape and generator input behavior for migrated source groups                                                   |
| `generator.test.ts`        | Full generator pipeline — `createStyleTokenInput`, CSS output, DTCG JSON output, theme token inputs, preset coverage              |
| `css-generator.test.ts`    | CSS variable generation — variable naming, `:root` blocks, `@theme` blocks, group name overrides (`spacing→space`, etc.)          |
| `contrast.test.ts`         | WCAG contrast math, overlay compositing, policy tiers (`LEXSYS_CONTRAST_POLICY`), `RESOLVE_FAILED` / `UNPARSEABLE_COLOR` codes    |

Run:

```sh
pnpm tokens:check             # from repo root
pnpm tokens:test              # vitest only (faster)
```

### `@dalexto/lexsys-ui`

Test files in `packages/ui/test/`:

| File                                             | What it tests                                                                                  |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `public-api.test.ts`                             | Public API surface — all component and type exports are accessible from `@dalexto/lexsys-ui`   |
| `test/components/<Name>/<Name>.variants.test.ts` | CVA variant output — all variants and sizes produce valid class strings (**45 primitives**)    |
| `test/components/<Name>/<Name>.render.test.tsx`  | Render smoke tests — DOM output, className merge, key a11y roles (**57/57** installable items) |

Blocks and templates live under `packages/ui/src/components/blocks/` and
`templates/` — see [UI catalog § Inventory](../reference/ui/UI_CATALOG.md#inventory).
Blocks and templates have render smoke tests; variant tests are not tracked for
blocks — verify behavior in the consumer sandbox.

Run:

```sh
pnpm ui:check                 # from repo root
pnpm ui:test                  # vitest only (faster)
```

### `@dalexto/lexsys-registry`

Test files in `packages/registry/test/`:

| File                           | What it tests                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `validate-registry.test.ts`    | Registry manifest validation — required fields, template files, layer composition rules, block/template dependency constraints |
| `registry-styles-sync.test.ts` | Registry style sync helpers — in-sync templates, stale content, missing template files                                         |

Bundled registry: **57 installable UI items** (45 primitives + 10 blocks + 2 templates). Composition rules are enforced by `validateRegistryComposition` as part of `registry:check`. Inventory: [UI catalog](../reference/ui/UI_CATALOG.md).

Run:

```sh
pnpm registry:check           # from repo root (includes template sync check)
pnpm registry:test            # vitest only
```

### `lexsys` (CLI)

Test files in `packages/cli/test/`:

| File                            | What it tests                                                                                                                                               |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `commands/add.test.ts`          | `lexsys add` — file creation, skipping unchanged files, conflict detection, utilities/styles install                                                        |
| `commands/init.test.ts`         | `lexsys init` — config creation, Tailwind setup, Vite plugin wiring, idempotency                                                                            |
| `commands/update.test.ts`       | `lexsys update` — file update when registry changes, skipping unchanged files                                                                               |
| `commands/registry.test.ts`     | `lexsys registry` — local/remote source selection, `--local`/`--remote` flags                                                                               |
| `commands/uninstall.test.ts`    | `lexsys uninstall` — file removal, dry-run, conflict preservation, untrack behavior, orphaned shared utilities/styles cleanup                               |
| `commands/diagnostics.test.ts`  | `doctor`, `status`, `list`, `config` — path checks, registry output, config mutations                                                                       |
| `commands/install-flow.test.ts` | Full install smoke — idempotency, all **primitive** components, all **block** items (solo + bulk), flat import rewrite, add → update → uninstall round-trip |
| `core/installer.test.ts`        | Installer core — hash comparison, created/updated/skipped/conflicted states, generated file detection                                                       |
| `core/install-target.test.ts`   | Flat `paths.components` targets + import rewrite for blocks/templates at install time                                                                       |
| `core/registry-closure.test.ts` | Transitive `registryDependencies` closure + orphan detection for `--with-deps` uninstall                                                                    |
| `core/package-manager.test.ts`  | Package manager detection — npm/pnpm/yarn detection, cwd-scoped installs                                                                                    |
| `core/tailwind-setup.test.ts`   | Tailwind CSS wiring — idempotent `@import` injection, entrypoint detection                                                                                  |

Run:

```sh
pnpm cli:check                # from repo root
pnpm cli:test                 # vitest only (turbo ^build)
```

---

## When to Run What

| Scenario                                         | Command                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------- |
| Before merging any PR                            | `pnpm check`                                                        |
| After editing token source                       | `pnpm tokens:check`                                                 |
| After editing a UI component                     | `pnpm ui:check` + `pnpm registry:check`                             |
| After editing registry items or templates        | `pnpm registry:check`                                               |
| After editing CLI commands or core modules       | `pnpm cli:check`                                                    |
| After syncing templates                          | `pnpm registry:check`                                               |
| After editing blocks/templates in UI or registry | `pnpm ui:check` + `pnpm registry:check` + sandbox checklist (below) |
| After editing CLI install path or import rewrite | `pnpm cli:check` + sandbox `lexsys add dashboard-shell` smoke       |
| After changing `lexsys.config.json` schema       | `pnpm cli:check`                                                    |

---

## Template Sync Verification

Registry template drift is checked by `pnpm registry:check` (component templates + generated style CSS).

Unit tests in `packages/registry/test/registry-styles-sync.test.ts` cover the style sync compare helpers. The full script still runs as part of `registry:check`:

```sh
pnpm registry:sync    # sync templates from UI source
pnpm registry:check   # verify no drift (fails if templates are out of date)
```

Run `registry:check` before merging any PR that changes `packages/ui` components.

---

## Vitest configuration

Each test package owns a colocated [`vitest.config.ts`](../packages/cli/vitest.config.ts) using `defineProject` and `root: import.meta.dirname`:

| Package             | Config             | Test environment            |
| ------------------- | ------------------ | --------------------------- |
| `packages/cli`      | `vitest.config.ts` | `node`                      |
| `packages/tokens`   | `vitest.config.ts` | `node`                      |
| `packages/registry` | `vitest.config.ts` | `node`                      |
| `packages/ui`       | `vitest.config.ts` | `jsdom` (+ `test/setup.ts`) |

Package `test` scripts still run via `vitest run test --pool threads` (unchanged for CI and turbo).

### Playground tooling

`apps/playground` uses project references (`tsconfig.app.json`, `tsconfig.node.json`) rather than extending `tsconfig.base.json` directly — intentional for Vite app vs node config split. Playground lint runs via root `eslint.config.mjs` through its `lint` script; there is no Vitest suite in the playground app.

### IDE test explorer (Vitest extension)

Install the [Vitest VS Code extension](https://marketplace.visualstudio.com/items?itemName=vitest.explorer). It auto-discovers each `packages/*/vitest.config.ts` from the repo root — no root `vitest.workspace.ts` (removed in Vitest 4; use per-project configs instead).

Use the **Testing** sidebar or gutter icons to run/debug individual tests while editing.

`@vitest/ui` (browser dashboard) is intentionally not configured — the IDE extension covers day-to-day needs without extra dev tooling.

---

## UI render tests

All **57 installable UI items** (45 primitives + 10 blocks + 2 templates) have render smoke tests using `@testing-library/react` with Vitest
`jsdom` (`packages/ui/vitest.config.ts`).

- Assert DOM output, `className` merge, and key accessibility roles — not pixel snapshots.
- Variant class output remains covered by `*.variants.test.ts` files for primitives.
- `pnpm ui:audit` scans variant token literals only — it does **not** validate responsive layout or mobile drawer behavior (sandbox checklist below).

---

## Consumer sandbox verification

Policy and surface roles: [§ Verification surfaces](#verification-surfaces) above.

Maintainers SHOULD verify CLI and registry changes against **PulseDesk** (`D:\PLAYGROUND\sandbox-lexsys`). Use **fresh-test** (`D:\PLAYGROUND\lexsys-fresh-test`) for clean install/build smoke when needed.

Checklist after CLI or registry changes:

1. Link or install the CLI from the monorepo branch under test.
2. **Vite regression:** from sandbox root — `lexsys add <component>` (or re-run `lexsys init` if scaffolding changed); `lexsys update --styles`; production build (`pnpm build`, `npm run build`, or `yarn build` — match the consumer lockfile).
3. **Next.js smoke:** fresh directory — `lexsys init next`; `lexsys add button`; same build command as above.
4. Spot-check installed paths under `paths.components`, `lexsys.config.json` (`paths.*` schema), and token CSS imports.
5. If templates or styles changed: confirm `styles/tokens.css` and `styles/theme.css` update as expected.

**Post-publish npm smoke** (`npx @dalexto/lexsys@next init vite …`): CLI scaffolds with
**npm** — use **`npm run build`** only ([Deploy guide § Release workflow](./DEPLOY.md#release-workflow)).

**Blocks/templates checklist** (when FormField, SettingsPanel, Sidebar, AuthForm, CommandPalette, Empty, or DashboardShell change):

1. Fresh or updated install: `lexsys add dashboard-shell` (transitive closure — Sidebar + primitives).
2. Confirm flat layout: `src/components/ui/DashboardShell/`, `src/components/ui/Sidebar/`, sibling import paths (no `blocks/` or `templates/` folders in consumer tree).
3. Narrow viewport (`< md`): mobile drawer opens; nav list items stack vertically (plain nav + `DrawerClose appearance="inline"` — see BO.2 in [Backlog](../REVIEW_TODO.md)).
4. `lexsys uninstall dashboard-shell --dry-run` then `--with-deps --dry-run` — orphan hints look correct.
5. Compare drawer shell to [playground overlays panel](../apps/playground/src/overlays-panel.tsx) when changing Sidebar/Drawer composition.

Record failures in `docs/REVIEW_TODO.md` or the phase PR — do not block monorepo CI on sandbox path availability.

---

## PLAYGROUND automation (external repos)

Implementation lives **outside** this monorepo. No lexsys CI for DX.2 until explicitly promoted.

### DX.3 — Fresh install smoke (`lexsys-fresh-test`) — shipped

**Path:** `D:\PLAYGROUND\smoke-010` (also `D:\PLAYGROUND\lexsys-fresh-test` lab)

**Recorded pass:** `npx @dalexto/lexsys@latest init vite` → `lexsys add button` → `pnpm build` (2026-06-06).

Optional repeatable script in the external repo: `pnpm smoke:install-build` — same flow as above; exit non-zero on failure.

### DX.2 — Playwright E2E (`sandbox-lexsys` / PulseDesk) — shipped

**Path:** `D:\PLAYGROUND\sandbox-lexsys` (external repo — not lexsys CI)

**Status:** **shipped** (2026-06-06) — `pnpm test:e2e` passes (4 scenarios: seed, mobile sidebar, theme toggle, dashboard nav). Requires `@playwright/test` **≥ 1.53.2** on Node 24 (1.52.0 hangs on Windows).

Layout follows [Playwright Test Agents](https://playwright.dev/docs/test-agents) conventions:

| Path                     | Role                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `specs/pulsedesk-e2e.md` | Human-readable test plan (planner input)                     |
| `tests/seed.spec.ts`     | Authenticated bootstrap for agent/generator flows            |
| `tests/*.spec.ts`        | Executable scenarios                                         |
| `playwright.config.mjs`  | `webServer` launches Vite; `baseURL` `http://127.0.0.1:5173` |

**Scripts (sandbox `package.json`):**

```bash
pnpm dev:e2e          # Vite on 127.0.0.1:5173 (webServer target)
pnpm test:e2e         # playwright test
pnpm test:e2e:ui      # UI mode (watch / debug)
pnpm test:e2e:report  # HTML report after a run
```

**Covered scenarios** (see `specs/pulsedesk-e2e.md`):

- Mobile Sidebar drawer (`< md`) → Settings route
- Theme toggle (`html.dark`)
- Dashboard shell sidebar nav (Team, Billing, API Keys, Dashboard)

**First-time setup** (per [Playwright installation](https://playwright.dev/docs/intro)):

```bash
cd D:\PLAYGROUND\sandbox-lexsys
pnpm install
pnpm exec playwright install chromium
pnpm test:e2e
```

Optional: upgrade `@playwright/test` to latest and run `pnpm exec playwright init-agents --loop=vscode` for planner/generator/healer agent definitions ([Test Agents](https://playwright.dev/docs/test-agents)).

Complements the manual blocks/templates checklist above — does not replace PulseDesk manual QA for first-time gate.

Tracked: [Backlog § Shipped index — DX.2 / DX.3](../REVIEW_TODO.md#p22-dx-dx1dx5).

---

## Known Gaps

- **DX.3** — Fresh install/build smoke — **shipped** (`smoke-010` with `@latest`); monorepo `install-flow` still covers primitives and registry blocks in CI.
