---
name: monorepo-check-gate
description: >
  Pick and run scoped pnpm check commands by touched paths in the Lexsys
  monorepo. Use before commit, pre-PR verify, pnpm check, tokens:check,
  ui:check, registry:check, or cli:check.
---

# Monorepo check gate

Default full gate: **`pnpm check`** ([docs/SCRIPTS.md](../../docs/SCRIPTS.md)).

Run scoped checks first when the change set is narrow.

## Map paths → commands

| Touched paths                                 | Run                                                           |
| --------------------------------------------- | ------------------------------------------------------------- |
| `packages/tokens/**`                          | `pnpm tokens:check`                                           |
| `packages/ui/**`                              | `pnpm ui:check`                                               |
| `packages/registry/**`                        | `pnpm registry:check`                                         |
| `packages/cli/**`                             | `pnpm --filter ./packages/cli check`                          |
| `apps/playground/**`                          | `pnpm playground:check`                                       |
| Root config, turbo, eslint, multiple packages | `pnpm check`                                                  |
| UI + registry templates                       | `pnpm ui:check` → `$registry-sync` → `pnpm registry:check`    |
| Token CSS + registry styles                   | `pnpm tokens:check` → `pnpm sync:all` → `pnpm registry:check` |

## Pre-commit (when user requests commit)

1. `pnpm format:check` — required; run `pnpm format` if it fails.
2. Scoped `*:check` for touched packages.
3. Full `pnpm check` before PR merge.

## Do not

- Start dev servers as verification (`playground:dev`, `vite dev`) unless user asks.
- Use playground as consumer install truth — see `$consumer-sandbox-verify`.

## Agent operations

Prefer: `pnpm playground:build`, unit tests, sandbox production build.

## Related

- [docs/TESTING.md](../../docs/TESTING.md)
- [lexsys-testing.mdc](../../.cursor/rules/lexsys-testing.mdc)
- `$registry-sync`, `$consumer-sandbox-verify`
