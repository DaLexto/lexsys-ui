# Neurex Testing

**Audience:** Maintainers, contributors, and agents
**Type:** Verification workflow reference
**Source of truth for:** Test coverage by package, when to run which checks
**Verified against:** `packages/*/test/`, `packages/*/vitest.config.ts`, `package.json` scripts

Command names and sync workflows: [SCRIPTS.md](./SCRIPTS.md).

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

| File                                             | What it tests                                                                                             |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `public-api.test.ts`                             | Public API surface — all component and type exports are accessible from `@neurex/ui`                      |
| `test/components/<Name>/<Name>.variants.test.ts` | CVA variant output — all variants and sizes produce valid class strings (32 components)                   |
| `test/components/<Name>/<Name>.render.test.tsx`  | Render smoke tests — DOM output, className merge, key a11y roles (pilot: ScrollArea, Collapsible, Dialog) |

Run:

```sh
pnpm ui:check                 # from repo root
pnpm --filter @neurex/ui test
```

### `@neurex/registry`

Test files in `packages/registry/test/`:

| File                           | What it tests                                                                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `validate-registry.test.ts`    | Registry manifest validation — all items have required fields, no missing template files, no invalid categories |
| `registry-styles-sync.test.ts` | Registry style sync helpers — in-sync templates, stale content, missing template files                          |

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
| `commands/install-flow.test.ts` | Full install smoke — runs `init` + `add` twice to verify end-to-end idempotency across all components                         |
| `core/installer.test.ts`        | Installer core — hash comparison, created/updated/skipped/conflicted states, generated file detection                         |
| `core/package-manager.test.ts`  | Package manager detection — npm/pnpm/yarn detection, cwd-scoped installs                                                      |
| `core/tailwind-setup.test.ts`   | Tailwind CSS wiring — idempotent `@import` injection, entrypoint detection                                                    |

Run:

```sh
pnpm cli:check                # from repo root
pnpm --filter ./packages/cli test
```

---

## When to Run What

| Scenario                                   | Command                                 |
| ------------------------------------------ | --------------------------------------- |
| Before merging any PR                      | `pnpm check`                            |
| After editing token source                 | `pnpm tokens:check`                     |
| After editing a UI component               | `pnpm ui:check` + `pnpm registry:check` |
| After editing registry items or templates  | `pnpm registry:check`                   |
| After editing CLI commands or core modules | `pnpm cli:check`                        |
| After syncing templates                    | `pnpm registry:check`                   |
| After changing `neurex.config.json` schema | `pnpm cli:check`                        |

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

### IDE test explorer (Vitest extension)

Install the [Vitest VS Code extension](https://marketplace.visualstudio.com/items?itemName=vitest.explorer). It auto-discovers each `packages/*/vitest.config.ts` from the repo root — no root `vitest.workspace.ts` (removed in Vitest 4; use per-project configs instead).

Use the **Testing** sidebar or gutter icons to run/debug individual tests while editing.

`@vitest/ui` (browser dashboard) is intentionally not configured — the IDE extension covers day-to-day needs without extra dev tooling.

---

## UI render tests

Pilot render tests use `@testing-library/react` with Vitest `jsdom` (`packages/ui/vitest.config.ts`).

- Assert DOM output, `className` merge, and key accessibility roles — not pixel snapshots.
- Variant class output remains covered by `*.variants.test.ts` files.

---

## Known Gaps

- Render test coverage is limited to pilot components (ScrollArea, Collapsible, Dialog). Most components still rely on CVA class output tests only.
- No end-to-end install tests against a real consumer project (outside the
  temp-directory smoke tests in `install-flow.test.ts`).
- CLI diagnostic commands (`doctor`, `status`, `list`, `config`) have no dedicated tests yet.
- Install-flow round-trip (`add` → `update` → `uninstall`) is not covered end-to-end.
