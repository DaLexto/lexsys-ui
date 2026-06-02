# Proposal (discussion): `testing.mdc`?

**Status:** concluded — NEED `testing.mdc`; agent does not run tests (notify user)  
**Catalog #:** 4

---

## What problem might this rule solve?

When editing **tests** or **vitest configs**:

- Wrong test root (e.g. test next to `src/` instead of `packages/*/test/`)
- Wrong environment (node vs jsdom) for package
- Running wrong `pnpm` command after a change (full `check` vs scoped `ui:check`)
- Adding snapshots where project prefers behavior assertions
- Forgetting `ui:audit` after variant/token class changes

These show up when the open file is under `**/test/**` or `vitest.config.ts` — not when reading [TESTING.md](../../docs/operations/TESTING.md) (long, not auto-attached).

---

## What exists today (reference only)

| Today | Attach | ~size |
| ----- | ------ | ----- |
| `lexsys-testing.mdc` | `packages/**/test/**`, `**/vitest.config.ts`, `apps/**/test/**` | ~44 lines |
| [TESTING.md](../../../docs/operations/TESTING.md) | docs contract | full map |
| **`$monorepo-check-gate`** | skill on demand | which `pnpm *:check` by touched paths |
| **`$consumer-sandbox-verify`** | skill | pre-PR consumer path |

---

## What would NOT go in `testing.mdc`

- Full coverage inventory, sandbox procedures, known gaps tables → **TESTING.md**
- All script names and sync workflows → **SCRIPTS.md**
- Step-by-step pre-PR sandbox checklist → **`$consumer-sandbox-verify`**
- Picking checks from diff → **`$monorepo-check-gate`** (skill stays; rule points to it)
- UI component authoring standards → **`ui-components.mdc`**
- TS/JSDoc in test files → **`typescript.mdc`** + **`code-commenting.mdc`** (G1 globs already cover `*.test.ts`)

---

## If we said NEED — what could `testing.mdc` contain? (~60–100 lines)

| Section | Content |
| ------- | ------- |
| Scope | Test files + vitest configs in monorepo |
| Layout table | Per-package config / env / test root (thin — from today) |
| UI test types | variants vs render; blocks/templates note + link TESTING |
| Do not | Root vitest.config; snapshots as default; skip audit after variant edits |
| Commands | Minimal table: which package → which `pnpm *:check`; pointer `$monorepo-check-gate` |
| See also | TESTING.md, SCRIPTS.md |

**Attach (to decide):**

| Option | Globs |
| ------ | ----- |
| **A (today)** | `packages/**/test/**/*`, `packages/**/vitest.config.ts`, `apps/**/test/**/*` |
| **B (broader)** | add `**/*.test.ts`, `**/*.test.tsx` anywhere under packages/apps |
| **C (narrower)** | only `packages/**/test/**` (configs excluded — risk missing config edits) |

**Name:** `testing.mdc` vs `vitest.mdc` vs keep `lexsys-testing.mdc`

---

## Arguments FOR

1. Test layout is **non-obvious** (ui tests under `test/components/<Name>/`).
2. Small rule (~44 lines old) — low token cost when glob hits.
3. Complements skills: rule = quick ref at edit time; skills = gates and sandbox.
4. Globs do **not** overlap awkwardly with ui-components (different paths).

---

## Arguments AGAINST (NO / DEFER)

1. **TESTING.md + skills** may be enough if you rarely edit tests via agent.
2. **$monorepo-check-gate** already chooses commands — rule might duplicate.
3. **Observe first** (same as #2 coding) — not sure agent fails tests often.
4. **DEFER** until after UI analysis / first rules written.

---

## Overlap with agreed rules (G1 hybrid)

| File under test | Likely attaches |
| --------------- | --------------- |
| `Button.variants.test.ts` | testing + typescript + commenting (+ ui-components if under `components/` in path? — usually under `packages/ui/test/`, **not** `src/components/` → **no** ui-components) |
| `packages/cli/test/foo.test.ts` | testing + typescript + commenting |

`ui-components` glob is `src/components/**` only — **UI test files do not get ui-components rule**. Testing rule carries UI *test* conventions.

---

## Your answers (2026-05-30)

| # | Question | Your answer |
| - | -------- | ----------- |
| 1 | NEED? | **NEED** (implied by spec below) |
| 2 | Name | **`testing.mdc`** |
| 3 | Globs | `packages/**/*.test.ts`, `packages/**/*.test.tsx`, `packages/**/vitest.config.ts` — not `apps/` |
| 4 | Agent + tests | Agent **does not run** tests (token cost). After test write/edit/check-related work → notify you: **`*** URADI TEST za: ***`** (scoped) or full package / monorepo |
| 5 | Skills | **Future test skill** (wave 2) owns test procedures; rule = standards + notify pattern; defer skill name |

### Rule body must include (from you)

- Do not execute `pnpm *:test` / vitest in agent flow unless you explicitly ask.
- When agent created/edited a test or touched check-related paths → end with clear **URADI TEST** line (package or full gate scope).
- Thin layout/conventions + link TESTING.md / SCRIPTS.md.
- Pointer to test skill (TBD wave 2) instead of duplicating `$monorepo-check-gate` prose.

### Globs (final)

```yaml
globs:
  - "packages/**/*.test.ts"
  - "packages/**/*.test.tsx"
  - "packages/**/vitest.config.ts"
```

---

## After discussion

Update [RULES_CATALOG.md](../RULES_CATALOG.md); if NEED → `rules/plans/testing.md` then `.mdc` after OK.
