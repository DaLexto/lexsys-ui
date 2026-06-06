---
name: agent-workflow
description: >
  Default Lexsys monorepo implementation workflow in AGENTS.md and
  .cursor/skills/agent-workflow. Branch off dev, implement (UI, registry, CLI,
  tokens), docs pass, user-run verify via $monorepo-verify-gate, PR last via
  $git-commit. Use for multi-package tasks, feature slices, registry sync,
  ui:check, format:check, pnpm check, or when unsure which skill to load.
  Not for commit-only, backlog triage, or question-only turns.
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

**Domain skills contract:** `$components-authoring`, `$registry-sync`, `$token-verify`, etc. **do not run `pnpm` verify** during implement — defer to **step 4** and [`$monorepo-verify-gate`](./monorepo-verify-gate/SKILL.md) (unless you explicitly ask the agent to run a command).

---

## When to use / not

| Use                              | Do not use (instead)                                        |
| -------------------------------- | ----------------------------------------------------------- |
| Multi-file or multi-package work | **`$git-commit`** only                                      |
| Agreed plan or feature slice     | **`$project-next-steps`** for backlog                       |
| Unclear touch areas              | Single domain skill if you named it                         |
|                                  | Trivial one-liner → [Trivial exception](#trivial-exception) |

```txt
Named one skill?     → that skill (step 4 still uses $monorepo-verify-gate when verifying)
Commit/PR only?      → $git-commit
Backlog / priority?  → $project-next-steps
Else                 → this procedure
```

---

## Step → domain skills

_Table may evolve — update this section when the workflow steps change._

| Step        | Goal                     | Domain skills (load as needed)                             |
| ----------- | ------------------------ | ---------------------------------------------------------- |
| 1 Branch    | `dev`, REVIEW_TODO state | —                                                          |
| 2 Implement | Code + metadata          | `$components-authoring`, `$registry-sync`, `$token-verify` |
| 3 Docs      | Canonical docs           | `$docs-authoring`, `$changelog-update` after shipped work  |
| 4 Verify    | You run `pnpm`           | **`$monorepo-verify-gate`**                                |
| 5 PR last   | Git / GitHub             | `$git-commit` when you ask                                 |

Early hints by path (step 2): `packages/ui/**` → `$components-authoring`; `packages/tokens/**` → `$token-verify`; `packages/registry/**` / `packages/cli/**` → `$registry-sync`; `docs/**` → `$docs-authoring`.

---

## Procedure

### 1. Branch

- Branch off **`dev`** — not **`main`** unless you explicitly request it.
- Session state: **git + [REVIEW_TODO.md](../../docs/REVIEW_TODO.md)** only.

### 2. Implement

- Smallest correct diff; `package.json` `exports` only for public API.
- **Registry-first CLI** — registry metadata, no per-component install hardcoding.
- **UI source:** `packages/ui/src/components/` — never hand-edit `packages/registry/templates/`.
- **`pnpm registry:sync`:** do **not** run during implement unless you ask — put it on the **step 4 checklist** via `$monorepo-verify-gate` after UI edits (`$registry-sync` for metadata/rules).
- **Token CSS:** generated only — [TOKENS.md](../../docs/reference/tokens/TOKENS.md).

### 3. Docs

- Docs → **`$docs-authoring`** — [authoring](./docs-authoring/procedures.md#authoring) for layout; [alignment](./docs-authoring/procedures.md#alignment) when contracts or counts changed
- Shipped feature/fix → **`$changelog-update`** when appropriate

### 4. Verify (user runs; agent plans)

1. Load **[`$monorepo-verify-gate`](./monorepo-verify-gate/SKILL.md)** and follow its procedure.
2. **Stop and wait** for **`verify passed`** or errors — do not run `pnpm` unless you explicitly ask.
3. After pass → step 5 when you request git.

Reminders (include in checklist context when relevant): no default dev servers; playground ≠ consumer install truth — [TESTING.md](../../docs/operations/TESTING.md).

### 5. PR last (user confirms; agent assists git)

- Only after step 4 **`verify passed`** and you **explicitly** request commit / push / PR.
- If step 4 checklist **already included** `pnpm format:check` and you confirmed verify → go to **`$git-commit`** — **do not** ask for format again.
- If commit is requested but format was **not** on the last checklist → use **`$monorepo-verify-gate`** [format fallback](./monorepo-verify-gate/SKILL.md#format-fallback-step-5-only) once (`format ok`) → then **`$git-commit`**.
- **`$git-commit`** ([procedures](../git-commit/procedures.md)) + [git-commits.mdc](../rules/git-commits.mdc) — agent runs git only when you ask in that turn.
- **PR labels:** `gh pr create` + `gh pr edit --add-label` + `gh pr view --json labels` in the **same turn** — PR is incomplete without verified labels.
- PR target **`dev`** unless you explicitly request **`main`**. Never `gh pr merge` unless you explicitly request merge.

Human mirror: [CONTRIBUTING.md](../../docs/contributors/CONTRIBUTING.md).

---

## Trivial exception

One-line fix, no contract/catalog impact: skip **`$docs-authoring`** alignment pass unless contracts/counts changed; still branch off **`dev`**. Step 4 → **`$monorepo-verify-gate`** scenario `trivial` — same handoff.

---

## Do not

- Run step 4 `pnpm` commands unless you explicitly ask
- Run `pnpm registry:sync` during step 2 unless you explicitly ask
- Repeat `pnpm format:check` at step 5 if step 4 verify already covered it
- Expand AGENTS with procedure essays — edit this skill or `$monorepo-verify-gate`
- Commit / push / PR without explicit request in that turn
- Return a PR URL before `type:*`, `area:*`, and `status:ready-for-review` labels are applied and verified
- Run `gh pr merge` without explicit merge request in that turn
- Default to dev servers for verification

---

## Skills roots

All repo skills live under [`.cursor/skills/`](.): **`$agent-workflow`**, **`$monorepo-verify-gate`**, **`$git-commit`**, **`$registry-sync`**, **`$token-verify`**, **`$components-authoring`**, **`$changelog-update`**, **`$docs-authoring`**, **`$project-next-steps`**.

---

## See also

- [AGENTS.md](../../AGENTS.md)
- [`$monorepo-verify-gate`](./monorepo-verify-gate/SKILL.md)
- [`$git-commit`](./git-commit/SKILL.md)
- [project-structure.mdc](../../.cursor/rules/project-structure.mdc)
- [git-commits.mdc](../../.cursor/rules/git-commits.mdc)
