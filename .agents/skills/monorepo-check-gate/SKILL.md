---
name: monorepo-check-gate
description: >
  Path → pnpm check command map for the Lexsys monorepo. Use to build a
  verification checklist; during $agent-workflow the user runs commands unless
  they explicitly ask the agent to run them.
---

# Monorepo check gate

**Handoff:** During [`$agent-workflow`](../../.cursor/skills/agent-workflow/SKILL.md) step 4, the agent uses this file as a **path → command map** and gives **you** a numbered checklist — it does not run `pnpm` unless you explicitly ask. Outside that flow, same default unless you request the agent to run checks.

Default full gate: **`pnpm check`** ([docs/operations/SCRIPTS.md](../../docs/operations/SCRIPTS.md)).

Prefer scoped checks first when the change set is narrow.

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

## Pre-commit checklist (user runs; include when user requests commit)

1. `pnpm format:check` — required; you run `pnpm format` if it fails (agent may only ask if done — see `$agent-workflow` step 5).
2. Scoped `*:check` for touched packages (from map below).
3. Full `pnpm check` before PR merge when appropriate.

## Do not

- Start dev servers as verification (`playground:dev`, `vite dev`) unless user asks.
- Playground is maintenance smoke only — not consumer install truth ([TESTING.md](../../docs/operations/TESTING.md)).

## Related

- [`$agent-workflow`](../../.cursor/skills/agent-workflow/SKILL.md) — when to issue the checklist and wait for your report
- [docs/operations/TESTING.md](../../docs/operations/TESTING.md)
- [testing.mdc](../../.cursor/rules/testing.mdc)
- `$registry-sync`
