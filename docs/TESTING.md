# Neurex Testing

**Audience:** Maintainers, contributors, and agents
**Type:** Verification workflow reference
**Source of truth for:** Verification surfaces (playground vs sandbox), test coverage by package, when to run which checks
**Verified against:** `packages/*/test/`, `packages/*/vitest.config.ts`, `package.json` scripts

Command names and sync workflows: [SCRIPTS.md](./SCRIPTS.md).

---

## Verification surfaces

Neurex has two complementary manual verification surfaces. Invest maintainer time **asymmetrically** — most effort on the consumer path, not the playground.

| Surface                                 | Model                                               | CSS source                                         | Validates                                                                             | Does not validate                                                                | Focus                                                      | Commands                                       |
| --------------------------------------- | --------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------- |
| [`apps/playground`](../apps/playground) | Workspace `@neurex/ui` primitives + built token CSS | `@neurex/tokens` build output                      | Reference primitive exports, category panel demos, light/dark theme wiring            | CLI install path, blocks/templates, user-owned layouts, mobile composition flows | **~10–20%** — optional monorepo smoke                      | `pnpm playground:dev`, `pnpm playground:check` |
| External consumer sandbox               | `neurex add` → flat `paths.components/<Name>/`      | Installed `styles/tokens.css` + `styles/theme.css` | Install/update/uninstall, import rewrite, conflicts, installed CSS, block/template UX | Workspace `@neurex/ui` dist wiring inside the monorepo                           | **~80–90%** — consumer truth (especially blocks/templates) | Manual checklist below                         |
| Your SaaS (future)                      | Same as sandbox — CLI-installed consumer            | Installed styles in your app                       | Primary product UX and design sign-off                                                | Monorepo reference wiring                                                        | Replaces sandbox as main UX surface over time              | Your app build + deploy                        |

**Policy:** `apps/playground` is **maintenance-only**. Keep existing panels compiling; do not expand playground product UX unless the PR explicitly targets `apps/playground/**`. Consumer UX belongs in sandbox or SaaS.

### `apps/playground`

- Imports `@neurex/ui` from workspace `dist/` — rebuild UI after variant changes.
- Sticky category nav: Brand, Layout, Actions, Forms, Overlays, Surfaces, Interactions (see [apps/playground/README.md](../apps/playground/README.md)).
- Optional after UI/token changes; CI runs `playground:build` when `apps/playground/**` changes (M2.4).

### Consumer sandbox

External project outside this monorepo (example: `D:\PLAYGROUND\sandbox-neurex`). Manual verification — not CI.

**Primary manual gate** before PRs that touch CLI, registry, templates, blocks/templates, or install artifacts.

For **blocks/templates** changes (FormField, Sidebar, DashboardShell), sandbox verification is required — playground render tests cover **primitives only**. See [REVIEW_TODO.md § Blocks/templates optimization backlog](./REVIEW_TODO.md#blocks--templates-optimization-backlog).

### Practical workflow

| Step                                                   | When                                                                                                                |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `pnpm ui:check` / `pnpm registry:check` / `pnpm check` | After UI, token, registry, or CLI changes                                                                           |
| `pnpm playground:dev` (optional)                       | Quick component glance inside the monorepo                                                                          |
| Sandbox Vite + Next checklist (below)                  | Pre-PR when CLI/registry/templates affect what users install                                                        |
| SaaS app smoke                                         | When SaaS is active — primary consumer test; sandbox shrinks to minimal CLI regression (`add` / `update` / `build`) |

---

## Quick Reference

Primary gate: `pnpm check` (see [SCRIPTS.md](./SCRIPTS.md) for full inventory).

Per-package test commands are listed in each section below.

---

## Test Coverage by Package

### `@neurex/tokens`

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
| `contrast.test.ts`         | WCAG contrast math, overlay compositing, policy tiers (`NEUREX_CONTRAST_POLICY`), `RESOLVE_FAILED` / `UNPARSEABLE_COLOR` codes    |

Run:

```sh
pnpm tokens:check             # from repo root
pnpm --filter @neurex/tokens test
```

### `@neurex/ui`

Test files in `packages/ui/test/`:

| File                                             | What it tests                                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `public-api.test.ts`                             | Public API surface — all component and type exports are accessible from `@neurex/ui`        |
| `test/components/<Name>/<Name>.variants.test.ts` | CVA variant output — all variants and sizes produce valid class strings (**32 primitives**) |
| `test/components/<Name>/<Name>.render.test.tsx`  | Render smoke tests — DOM output, className merge, key a11y roles (**32/32 primitives**)     |

Pilot blocks and templates (FormField, Sidebar, DashboardShell) live under
`packages/ui/src/components/blocks/` and `templates/` but do **not** yet have
render/variant tests in `@neurex/ui` — verify in the consumer sandbox instead.

Run:

```sh
pnpm ui:check                 # from repo root
pnpm --filter @neurex/ui test
```

### `@neurex/registry`

Test files in `packages/registry/test/`:

| File                           | What it tests                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `validate-registry.test.ts`    | Registry manifest validation — required fields, template files, layer composition rules, block/template dependency constraints |
| `registry-styles-sync.test.ts` | Registry style sync helpers — in-sync templates, stale content, missing template files                                         |

Bundled registry: **35 installable UI items** (32 primitives + 3 pilot blocks/templates). Composition rules are enforced by `validateRegistryComposition` as part of `registry:check`.

Run:

```sh
pnpm registry:check           # from repo root (includes template sync check)
pnpm --filter @neurex/registry test
```

### `neurex` (CLI)

Test files in `packages/cli/test/`:

| File                            | What it tests                                                                                                                 |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `commands/add.test.ts`          | `neurex add` — file creation, skipping unchanged files, conflict detection, utilities/styles install                          |
| `commands/init.test.ts`         | `neurex init` — config creation, Tailwind setup, Vite plugin wiring, idempotency                                              |
| `commands/update.test.ts`       | `neurex update` — file update when registry changes, skipping unchanged files                                                 |
| `commands/registry.test.ts`     | `neurex registry` — local/remote source selection, `--local`/`--remote` flags                                                 |
| `commands/uninstall.test.ts`    | `neurex uninstall` — file removal, dry-run, conflict preservation, untrack behavior, orphaned shared utilities/styles cleanup |
| `commands/diagnostics.test.ts`  | `doctor`, `status`, `list`, `config` — path checks, registry output, config mutations                                         |
| `commands/install-flow.test.ts` | Full install smoke — idempotency, all **primitive** components, add → update → uninstall round-trip                           |
| `core/installer.test.ts`        | Installer core — hash comparison, created/updated/skipped/conflicted states, generated file detection                         |
| `core/install-target.test.ts`   | Flat `paths.components` targets + import rewrite for blocks/templates at install time                                         |
| `core/registry-closure.test.ts` | Transitive `registryDependencies` closure + orphan detection for `--with-deps` uninstall                                      |
| `core/package-manager.test.ts`  | Package manager detection — npm/pnpm/yarn detection, cwd-scoped installs                                                      |
| `core/tailwind-setup.test.ts`   | Tailwind CSS wiring — idempotent `@import` injection, entrypoint detection                                                    |

Run:

```sh
pnpm cli:check                # from repo root
pnpm --filter ./packages/cli test
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
| After editing CLI install path or import rewrite | `pnpm cli:check` + sandbox `neurex add dashboard-shell` smoke       |
| After changing `neurex.config.json` schema       | `pnpm cli:check`                                                    |

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

All **32 bundled primitives** have render smoke tests using `@testing-library/react`
with Vitest `jsdom` (`packages/ui/vitest.config.ts`). Pilot blocks and templates
do not yet have matching render suites — treat sandbox QA as the gate for those layers.

- Assert DOM output, `className` merge, and key accessibility roles — not pixel snapshots.
- Variant class output remains covered by `*.variants.test.ts` files for primitives.
- `pnpm ui:audit` scans variant token literals only — it does **not** validate block/template composition, responsive layout, or mobile drawer behavior.

---

## Consumer sandbox verification

Policy and surface roles: [§ Verification surfaces](#verification-surfaces) above.

Maintainers SHOULD verify CLI and registry changes against an external consumer project outside this monorepo (for example `D:\PLAYGROUND\sandbox-neurex`).

Checklist after CLI or registry changes:

1. Link or install the CLI from the monorepo branch under test.
2. **Vite regression:** from sandbox root — `neurex add <component>` (or re-run `neurex init` if scaffolding changed); `neurex update --styles`; run build.
3. **Next.js smoke:** fresh directory — `neurex init next`; `neurex add button`; run build.
4. Spot-check installed paths under `paths.components`, `neurex.config.json` (`paths.*` schema), and token CSS imports.
5. If templates or styles changed: confirm `styles/tokens.css` and `styles/theme.css` update as expected.

**Blocks/templates checklist** (when FormField, Sidebar, or DashboardShell change):

1. Fresh or updated install: `neurex add dashboard-shell` (transitive closure — Sidebar + primitives).
2. Confirm flat layout: `src/components/ui/DashboardShell/`, `src/components/ui/Sidebar/`, sibling import paths (no `blocks/` or `templates/` folders in consumer tree).
3. Narrow viewport (`< md`): mobile drawer opens; nav list layout readable (see BO.1 in [REVIEW_TODO.md](./REVIEW_TODO.md)).
4. `neurex uninstall dashboard-shell --dry-run` then `--with-deps --dry-run` — orphan hints look correct.
5. Compare drawer shell to [playground overlays panel](../apps/playground/src/overlays-panel.tsx) when changing Sidebar/Drawer composition.

Record failures in `docs/REVIEW_TODO.md` or the phase PR — do not block monorepo CI on sandbox path availability.

---

## Known Gaps

- No automated end-to-end install tests against a real external consumer project (temp-directory smoke tests cover primitive CLI flow; see [§ Verification surfaces](#verification-surfaces) and Consumer sandbox verification above).
- No `install-flow` coverage for block/template items (`dashboard-shell` transitive install) — only unit tests for install targets, import rewrite, and registry closure.
- No render/variant tests for pilot blocks/templates in `@neurex/ui` — mobile and composition QA remain manual (BO.1–BO.7 in [REVIEW_TODO.md](./REVIEW_TODO.md)).
