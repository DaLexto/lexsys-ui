---
name: agent-workflow
description: >
  Default Lexsys monorepo workflow: branch, implement, docs, user-run verify,
  PR last. Load for any non-trivial implementation unless the user names a
  single domain skill or git-only task.
---

# Agent workflow

Turn-by-turn procedure for **non-trivial** Lexsys work. [AGENTS.md](../../AGENTS.md) stays the router (guardrails + pointers); this skill is the **canonical** change procedure.

**Do not duplicate** domain specs or full [SCRIPTS.md](../../docs/operations/SCRIPTS.md) tables — link out.

---

## Default for this repo

For **any implementation task** in this monorepo (code, registry, CLI, rules/skills that affect behavior), **assume `$agent-workflow`** unless:

- The user named a single domain skill only (e.g. “sync registry”, “commit this”)
- The turn is question-only / review-only with no edits

If unsure which skill to load, **start here**, then pull domain skills from the step table below.

**Domain skills contract:** `$ui-authoring`, `$registry-sync`, `$token-change-verify`, etc. **do not run `pnpm` verify** during implement — they give checklists and defer to **step 4** here (unless you explicitly ask the agent to run a command).

---

## When to use / not

| Use                              | Do not use (instead)                                        |
| -------------------------------- | ----------------------------------------------------------- |
| Multi-file or multi-package work | **`$git-commit`** only                                      |
| Agreed plan or feature slice     | **`$project-next-steps`** for backlog                       |
| Unclear touch areas              | Single domain skill if you named it                         |
|                                  | Trivial one-liner → [Trivial exception](#trivial-exception) |

```txt
Named one skill?     → that skill (may still use step 4 checklist from here)
Commit/PR only?      → $git-commit
Backlog / priority?  → $project-next-steps
Else                 → this procedure
```

---

## Step → domain skills

_Table may evolve — update this section when the workflow steps change._

| Step        | Goal                     | Domain skills (load as needed)                                               |
| ----------- | ------------------------ | ---------------------------------------------------------------------------- |
| 1 Branch    | `dev`, REVIEW_TODO state | —                                                                            |
| 2 Implement | Code + metadata          | `$ui-authoring`, `$registry-sync`, `$token-change-verify`                    |
| 3 Docs      | Canonical docs           | `$docs-authoring`, `$docs-alignment`, `$changelog-update` after shipped work |
| 4 Verify    | You run `pnpm`           | Checklist below (+ optional `$monorepo-check-gate` map if still in repo)     |
| 5 PR last   | Git / GitHub             | `$git-commit` when you ask                                                   |

Early hints by path (step 2): `packages/ui/**` → `$ui-authoring`; `packages/tokens/**` → `$token-change-verify`; `packages/registry/**` / `packages/cli/**` → `$registry-sync`; `docs/**` layout → `$docs-authoring`.

---

## Path → command quick map

Use with [SCRIPTS.md](../../docs/operations/SCRIPTS.md). Prefer **scoped** `*:check` first; use **`pnpm check`** when multiple packages or root config changed.

| Touched paths                         | Typical commands (in order)                                        |
| ------------------------------------- | ------------------------------------------------------------------ |
| `packages/tokens/**`                  | `pnpm tokens:check` · optional `pnpm tokens:generate:styles`       |
| `packages/ui/**`                      | `pnpm ui:check`                                                    |
| `packages/registry/**`                | `pnpm registry:check`                                              |
| `packages/cli/**`                     | `pnpm cli:check`                                                   |
| `apps/playground/**`                  | `pnpm playground:check`                                            |
| UI + install templates                | `pnpm ui:check` → **`pnpm registry:sync`** → `pnpm registry:check` |
| Token CSS + registry styles           | `pnpm tokens:check` → `pnpm sync:all` → `pnpm registry:check`      |
| Docs / catalog counts                 | `pnpm ui:audit:catalog:check` or `pnpm ui:audit` (docs-alignment)  |
| Root / turbo / eslint / many packages | `pnpm check`                                                       |

`$monorepo-check-gate` is an **optional duplicate** of this map — prefer this section + SCRIPTS; gate may be removed later.

---

## Verification checklist template

Copy this shape every step 4 (adjust commands from the map above):

```markdown
## Verification checklist (run in order)

1. `pnpm …`
2. `pnpm …`
3. `pnpm format:check` <!-- include when you plan to commit -->

Reply with **verify passed** or paste errors from step N.
```

On failure: agent fixes → **updated** checklist with only remaining steps.

---

## Procedure

### 1. Branch

- Branch off **`dev`** — not **`main`** unless you explicitly request it.
- Session state: **git + [REVIEW_TODO.md](../../docs/REVIEW_TODO.md)** only.

### 2. Implement

- Smallest correct diff; `package.json` `exports` only for public API.
- **Registry-first CLI** — registry metadata, no per-component install hardcoding.
- **UI source:** `packages/ui/src/components/` — never hand-edit `packages/registry/templates/`.
- **`pnpm registry:sync`:** do **not** run during implement unless you ask — put it on the **step 4 checklist** after UI edits (`$registry-sync` for metadata/rules).
- **Token CSS:** generated only — [TOKENS.md](../../docs/reference/tokens/TOKENS.md).

### 3. Docs

- Layout / new pages → **`$docs-authoring`**
- Contracts or counts stale → **`$docs-alignment`** only when you want that pass
- Shipped feature/fix → **`$changelog-update`** when appropriate

### 4. Verify (user runs; agent plans)

1. Build checklist from **path → command quick map** + diff.
2. Output the [template](#verification-checklist-template).
3. **Stop and wait** for pass or errors — do not run `pnpm` unless you explicitly ask.
4. After pass → step 5 when you request git.

Reminders: no default dev servers; playground ≠ consumer install truth — [TESTING.md](../../docs/operations/TESTING.md).

### 5. PR last (user confirms; agent assists git)

- Only after step 4 pass and you **explicitly** request commit / push / PR.
- **`$git-commit`** + [git-commits.mdc](../../.cursor/rules/git-commits.mdc)
- Ask if **`pnpm format:check`** already passed — do not run it unless you ask.
- PR target **`dev`** unless you explicitly request **`main`**.

Human mirror: [CONTRIBUTING.md](../../docs/contributors/CONTRIBUTING.md).

---

## Trivial exception

One-line fix, no contract/catalog impact: skip **`$docs-alignment`**; still branch off **`dev`**. Step 4 = minimal single `*:check` from the quick map — same handoff.

---

## Do not

- Run step 4 `pnpm` commands unless you explicitly ask
- Run `pnpm registry:sync` during step 2 unless you explicitly ask
- Expand AGENTS with procedure essays — edit this skill
- Commit / push / PR without explicit request in that turn
- Default to dev servers for verification

---

## Skills roots (transitional)

| Location                                   | Contents                              |
| ------------------------------------------ | ------------------------------------- |
| [`.cursor/skills/`](.)                     | **`$agent-workflow`**                 |
| [`.agents/skills/`](../../.agents/skills/) | Domain procedures until a later reorg |

---

## See also

- [AGENTS.md](../../AGENTS.md)
- [project-structure.mdc](../../.cursor/rules/project-structure.mdc)
- [git-commits.mdc](../../.cursor/rules/git-commits.mdc)
