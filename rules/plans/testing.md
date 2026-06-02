# Implementation plan: `testing.mdc`

**Status:** draft — awaiting your OK before `rules/testing.mdc`  
**Catalog:** NEED (2026-05-30)  
**Proposal:** [04-testing-proposal.md](./proposals/04-testing-proposal.md)  
**Replaces (later):** `.cursor/rules/lexsys-testing.mdc`

---

## Goal

Vitest layout and test-edit conventions when globs hit. **Agent does not run tests** (token cost) — notify you with **`*** URADI TEST za: ***`**. Procedures for full gates → future test skill (wave 2) + `$monorepo-check-gate`.

---

## Frontmatter (copy-ready)

```yaml
---
description: Lexsys Vitest layout and test-edit conventions — no agent test runs; notify user to run checks.
globs:
  - "packages/**/*.test.ts"
  - "packages/**/*.test.tsx"
  - "packages/**/vitest.config.ts"
alwaysApply: false
```

**Narrowing vs old rule:** no `apps/**/test/**`, no `packages/**/test/**/*` path glob — co-located `*.test.ts(x)` under packages only.

---

## Scope and precedence

| Applies | Does not apply |
| ------- | -------------- |
| `packages/*/**/*.test.ts(x)` | `apps/playground` tests (out of scope until catalog adds apps) |
| `packages/*/vitest.config.ts` | `packages/ui/src/components/**` source → `ui-components.mdc` |
| Test conventions | UI variant authoring in source files |

**Co-attach:** `packages/ui/test/components/Button/Button.variants.test.ts` → **testing + typescript + commenting** (not ui-components).

---

## Body outline (~60–90 lines)

### 1. Scope + canonical docs (4 lines)

- Link [TESTING.md](../../docs/operations/TESTING.md), [SCRIPTS.md](../../docs/operations/SCRIPTS.md).

### 2. Agent: do not run tests (MUST — prominent)

- Do **not** run `pnpm *:test`, `vitest`, or full `pnpm check` unless the user explicitly asks.
- After creating/editing tests or `vitest.config.ts`, end response with a clear notify line:

```markdown
*** URADI TEST za: <scope> ***
```

| Scope | Example notify |
| ----- | ---------------- |
| Single package | `*** URADI TEST za: ui ***` → suggest `pnpm ui:check` or `pnpm ui:test` |
| Multiple packages | list packages or `pnpm check` if user wants full gate |
| Variant/token class change in UI | mention `ui:audit` inside ui scope |

- Pick scope from touched paths; do not invent commands not in SCRIPTS.md.

### 3. Layout table (keep thin — 4 packages)

| Package | Config | Env | Test root |
| ------- | ------ | --- | --------- |
| tokens | `packages/tokens/vitest.config.ts` | node | `packages/tokens/test/` |
| ui | `packages/ui/vitest.config.ts` | jsdom | `packages/ui/test/components/<Name>/` |
| registry | `packages/registry/vitest.config.ts` | node | `packages/registry/test/` |
| cli | `packages/cli/vitest.config.ts` | node | `packages/cli/test/commands/`, `test/core/` |

- No root workspace `vitest.config.ts`.

### 4. Do not

- Add root `vitest.config.ts`.
- Colocate tests next to `src/` (UI uses `test/components/<Name>/`).
- Default to snapshot assertions.
- Skip `ui:audit` relevance when agent edited primitive `*.variants.ts` (tell user in URADI TEST line).

### 5. UI test types (short)

- `*.variants.test.ts` — primitive CVA class output.
- `*.render.test.tsx` — DOM smoke, className merge, key a11y.
- Blocks/templates: install smoke in cli; render smoke in ui — link TESTING § sandbox, no full checklist.

### 6. Conventions

- Prefer behavior assertions over snapshots.
- CLI: mock fs/network at boundaries; temp dirs for install-flow.
- TS/JSDoc in test files → `typescript.mdc`, `code-commenting.mdc`.

### 7. Skills (pointers only)

- Scoped `pnpm *:check` from diff → **`$monorepo-check-gate`**.
- Consumer install PR gate → **`$consumer-sandbox-verify`**.
- **Future:** dedicated test skill (wave 2) — placeholder bullet, no name yet.

### 8. Minimal command map (≤6 lines)

| Touched | Suggest to user |
| ------- | ---------------- |
| tokens | `pnpm tokens:check` |
| ui | `pnpm ui:check` (includes audit) |
| registry | `pnpm registry:check` |
| cli | `pnpm --filter ./packages/cli check` |

No full SCRIPTS table copy.

---

## Must NOT include

- Full TESTING.md coverage map, sandbox steps, known-gaps tables.
- UI component CVA/token rules.
- Agent running tests by default.
- `apps/**` vitest paths (unless catalog updated later).

---

## Target size

| Budget | Lines |
| ------ | ----- |
| Domain rule | **60–90** |

---

## Source material

- [lexsys-testing.mdc](../../.cursor/rules/lexsys-testing.mdc)
- [04-testing-proposal.md](./proposals/04-testing-proposal.md)
- [TESTING.md](../../docs/operations/TESTING.md), [SCRIPTS.md](../../docs/operations/SCRIPTS.md)

---

## Verification before ship

- [ ] URADI TEST pattern exact (three asterisks each side per your spec).
- [ ] Globs match catalog (no apps).
- [ ] Explicit “agent does not run vitest”.
- [ ] ui-components glob overlap explained (tests under `test/` not `src/components/`).

---

## After your OK

1. Write `rules/testing.mdc`.
2. Spot-check attach on `Button.variants.test.ts` vs `packages/ui/vitest.config.ts`.
