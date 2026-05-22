# Neurex Testing

**Audience:** Maintainers, contributors, and agents
**Type:** Verification workflow reference
**Source of truth for:** Test commands, test coverage by package, when to run which checks
**Verified against:** `packages/*/test/`, `package.json` scripts

---

## Quick Reference

```sh
pnpm check           # full check: format + lint + typecheck + test (all packages)
pnpm test            # all tests via Turbo
pnpm typecheck       # all typechecks via Turbo
pnpm lint            # all lint via Turbo
pnpm format:check    # Prettier format check
```

---

## Test Coverage by Package

### `@neurex/tokens`

Test files in `packages/tokens/test/`:

| File | What it tests |
|---|---|
| `resolver.test.ts` | Reference resolution — direct refs, nested chains, missing refs, circular detection, max depth, branch refs, strict vs safe mode |
| `generator.test.ts` | Full generator pipeline — `createStyleTokenInput`, CSS output, DTCG JSON output, theme token inputs, preset coverage |
| `css-generator.test.ts` | CSS variable generation — variable naming, `:root` blocks, `@theme` blocks, group name overrides (`spacing→space`, etc.) |

Run:
```sh
pnpm tokens:check             # from repo root
pnpm --filter @neurex/tokens test
```

### `@neurex/ui`

Test files in `packages/ui/test/`:

| File | What it tests |
|---|---|
| `public-api.test.ts` | Public API surface — all component and type exports are accessible from `@neurex/ui` |
| `test/components/<Name>/<Name>.variants.test.ts` | CVA variant output — all variants and sizes produce valid class strings (31 components) |

Run:
```sh
pnpm ui:check                 # from repo root
pnpm --filter @neurex/ui test
```

### `@neurex/registry`

Test files in `packages/registry/test/`:

| File | What it tests |
|---|---|
| `validate-registry.test.ts` | Registry manifest validation — all items have required fields, no missing template files, no invalid categories |

Run:
```sh
pnpm registry:check           # from repo root (includes template sync check)
pnpm --filter @neurex/registry test
```

### `neurex` (CLI)

Test files in `packages/cli/test/`:

| File | What it tests |
|---|---|
| `commands/add.test.ts` | `neurex add` — file creation, skipping unchanged files, conflict detection, utilities/styles install |
| `commands/init.test.ts` | `neurex init` — config creation, Tailwind setup, Vite plugin wiring, idempotency |
| `commands/update.test.ts` | `neurex update` — file update when registry changes, skipping unchanged files |
| `commands/registry.test.ts` | `neurex registry` — local/remote source selection, `--local`/`--remote` flags |
| `commands/install-flow.test.ts` | Full install smoke — runs `init` + `add` twice to verify end-to-end idempotency across all components |
| `core/installer.test.ts` | Installer core — hash comparison, created/updated/skipped/conflicted states, generated file detection |
| `core/package-manager.test.ts` | Package manager detection — npm/pnpm/yarn detection, cwd-scoped installs |
| `core/tailwind-setup.test.ts` | Tailwind CSS wiring — idempotent `@import` injection, entrypoint detection |

Run:
```sh
pnpm cli:check                # from repo root
pnpm --filter ./packages/cli test
```

---

## When to Run What

| Scenario | Command |
|---|---|
| Before merging any PR | `pnpm check` |
| After editing token source | `pnpm tokens:check` |
| After editing a UI component | `pnpm ui:check` + `pnpm registry:check` |
| After editing registry items or templates | `pnpm registry:check` |
| After editing CLI commands or core modules | `pnpm cli:check` |
| After syncing templates | `pnpm registry:check` |
| After changing `neurex.config.json` schema | `pnpm cli:check` |

---

## Template Sync Verification

Registry template drift is a separate verification step, not a Vitest test:

```sh
pnpm registry:sync    # sync templates from UI source
pnpm registry:check   # verify no drift (fails if templates are out of date)
```

Run `registry:check` before merging any PR that changes `packages/ui` components.

---

## Known Gaps

- No render tests for UI components (no `@testing-library/react`). Variant
  correctness is verified through CVA class output tests only.
- No end-to-end install tests against a real consumer project (outside the
  temp-directory smoke tests in `install-flow.test.ts`).
- Token layer violation checks (component→primitive references) are not yet
  covered by tests. See `docs/TOKENS.md` for the target validation list.
