---
name: monorepo-verify-gate
description: >
  User-run pnpm verification for the Lexsys monorepo: scenario-based checklists
  from git diff and SCRIPTS.md. Use after implement, agent-workflow step 4,
  before commit/PR, or when asked what to run. Covers ui:check, registry:sync,
  registry:check, tokens:check, cli:check, pnpm check, format:check. Agent
  plans commands; you run them and reply verify passed or paste errors.
---

# Monorepo verify gate

**Canonical verify procedure** for this repo. Infer what changed → pick scenario(s) → numbered checklist → **you run** commands → reply **`verify passed`** or paste errors.

Command names: [SCRIPTS.md](../../docs/operations/SCRIPTS.md). Surfaces: [TESTING.md](../../docs/operations/TESTING.md). Wired from [`$agent-workflow`](../../.cursor/skills/agent-workflow/SKILL.md) step 4.

**The agent does not run `pnpm`** unless you explicitly ask.

---

## When to use

- After implementation (agent-workflow step 4)
- You ask “what should I run?” / “verify this branch”
- Before commit/PR when building the checklist (format may be last line)

## When not to use

- Commit/push/PR only with no verify context → **`$git-commit`** (may use [format fallback](#format-fallback-step-5-only) below)
- Question-only, no code changes

---

## Procedure

1. Inspect change set: `git diff --stat`, `git status --short`, or the paths you know were edited.
2. Match one or more **scenarios** below (combine when needed, e.g. `ui-registry` + `pre-pr`).
3. Merge commands in order; **dedupe** (keep first occurrence).
4. If **commit or PR is planned**, append **`pnpm format:check`** as the **last line** (unless `docs-only` already included it).
5. Output the [checklist template](#verification-checklist-template).
6. **Stop and wait** for **`verify passed`** (covers all lines including format) or error output from a step.
7. On failure: help fix → re-issue checklist with **remaining steps only**.

---

## Repo scenarios

| ID                       | Trigger                                                                  | Commands (in order)                                                                                                |
| ------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `trivial`                | Single package, one-line, no contract impact                             | One scoped `*:check` for that package                                                                              |
| `docs-only`              | `docs/**`, AGENTS, `.cursor/rules/**`, `.cursor/skills/**` markdown only | `pnpm format:check` · optional `pnpm ui:audit:catalog:check` if catalog counts claimed                             |
| `scripts`                | Root/workspace `package.json`, `scripts/**`, `turbo.json`                | `pnpm scripts:check` · `pnpm format:check`                                                                         |
| `tokens`                 | `packages/tokens/**`                                                     | `pnpm tokens:check` · optional `pnpm tokens:generate:styles` when source tokens changed                            |
| `ui`                     | `packages/ui/**` only (no template drift)                                | `pnpm ui:check`                                                                                                    |
| `ui-registry`            | UI edits affecting install templates                                     | `pnpm ui:check` → `pnpm registry:sync` → `pnpm registry:check`                                                     |
| `registry-meta`          | `packages/registry/src/items/**` only (no UI template change)            | `pnpm registry:check` — next `pnpm registry:sync` reconciles items from UI (preserves `aliases` / `category` only) |
| `tokens-styles-registry` | Token CSS + registry style templates                                     | `pnpm tokens:check` → `pnpm sync:all` → `pnpm registry:check`                                                      |
| `cli`                    | `packages/cli/**`                                                        | `pnpm cli:check` (turbo `^build`; see SCRIPTS)                                                                     |
| `cli-registry`           | CLI + registry/templates                                                 | `pnpm cli:check` plus `ui-registry` or `registry:check` as diff dictates                                           |
| `playground`             | `apps/playground/**`                                                     | `pnpm playground:check`                                                                                            |
| `multi-package`          | Root config, turbo, eslint, or 2+ packages                               | `pnpm check`                                                                                                       |
| `pre-pr`                 | Broad branch ready for PR                                                | Scoped checks for touched areas, then `pnpm check` if still unsure                                                 |

**Format when committing:** for code scenarios, add **`pnpm format:check`** as the final checklist step when you plan to commit — not a separate scenario row. `docs-only` already includes format.

---

## Path fallback

When the diff does not match a single scenario, map paths to commands (prefer scoped checks first):

| Touched paths               | Commands                                                       |
| --------------------------- | -------------------------------------------------------------- |
| `packages/tokens/**`        | `pnpm tokens:check`                                            |
| `packages/ui/**`            | `pnpm ui:check`                                                |
| `packages/registry/**`      | `pnpm registry:check`                                          |
| `packages/cli/**`           | `pnpm cli:check`                                               |
| `apps/playground/**`        | `pnpm playground:check`                                        |
| UI + templates              | `pnpm ui:check` → `pnpm registry:sync` → `pnpm registry:check` |
| Token CSS + registry styles | `pnpm tokens:check` → `pnpm sync:all` → `pnpm registry:check`  |
| Docs / catalog counts       | `pnpm ui:audit:catalog:check` or `pnpm ui:audit`               |
| Many packages / root        | `pnpm check`                                                   |

---

## Verification checklist template

```markdown
## Verification checklist (run in order)

1. `pnpm …`
2. `pnpm …`
   N. `pnpm format:check` <!-- last, when commit/PR planned -->

Reply with **verify passed** or paste errors from step N.
```

---

## Format dedup (step 5)

Before **`$git-commit`**:

- **Do not** ask for `pnpm format:check` again if the step 4 checklist already listed it and you replied **`verify passed`**.
- **Only** use [format fallback](#format-fallback-step-5-only) when format was **not** on the last checklist (verify mid-work, commit later) or you request commit without a prior step 4 pass.

---

## Format fallback (step 5 only)

When commit is requested but format was skipped in step 4:

```markdown
Run `pnpm format:check` (and `pnpm format` if it fails). Reply **format ok** when green, or paste the error output.
```

Wait for **`format ok`** / **`format passed`** once, then proceed with **`$git-commit`**.

---

## Do not

- Run `pnpm` verify unless you explicitly ask the agent to
- Suggest dev servers (`playground:dev`, `vite dev`, `next dev`) as default verification
- Treat playground as consumer install truth — [TESTING.md](../../docs/operations/TESTING.md)
- Duplicate the full SCRIPTS handbook in chat

---

## Related skills

- [`$agent-workflow`](../../.cursor/skills/agent-workflow/SKILL.md) — step 4 loads this skill
- [`$git-commit`](../git-commit/SKILL.md) — after verify (and format when needed)
- [`$registry-sync`](../registry-sync/SKILL.md) — two-zone rules; `ui-registry` includes `registry:sync`
- [`$token-verify`](../token-verify/SKILL.md) — token rules; scenarios `tokens` / `tokens-styles-registry` here
- [`$components-authoring`](../components-authoring/SKILL.md) — UI edit rules; checklist via this skill after UI
- [`$docs-authoring`](../docs-authoring/SKILL.md) — catalog audit commands in `docs-only` / path fallback (alignment procedure)
