---
name: agent-workflow
description: >
  Multi-step Lexsys implementation procedure: branch, implement, docs,
  user-run verify (numbered checklist from touched paths + SCRIPTS), PR last.
  Use when
  the user gives a non-trivial task spanning packages, registry, or CLI
  without naming a single domain skill first.
---

# Agent workflow

Turn-by-turn procedure for **non-trivial** Lexsys work. [AGENTS.md](../../AGENTS.md) stays the router (guardrails + pointers); this skill is the **canonical** change procedure and which **`$skill`** to load per step.

**Do not duplicate** domain specs, SCRIPTS tables, or Conventional Commits RFC text — link out.

---

## When to use

- Multi-file or multi-package change (UI + registry, tokens + styles, CLI + registry)
- User agreed to a plan or feature slice; you need an ordered pipeline
- Touch areas unclear — pick checks and docs skills after a quick path scan

## When not to use

| Situation                                                 | Use instead                                           |
| --------------------------------------------------------- | ----------------------------------------------------- |
| Question-only, review-only, no repo edits                 | Answer from [docs/INDEX.md](../../docs/INDEX.md)      |
| User asked only to commit / push / PR                     | **`$git-commit`**                                     |
| "What should I work on next?"                             | **`$project-next-steps`**                             |
| Single domain already named ("sync registry", "ui:check") | That **`$skill`** directly                            |
| One-line fix, no contract/count change                    | AGENTS trivial exception — still branch off **`dev`** |

---

## Decision tree (before step 1)

```txt
User named one skill?     → load it; skip this skill
Commit/PR only?           → $git-commit
Backlog / priority?       → $project-next-steps
Else                      → follow procedure below
```

| If you will touch…                                   | Load early                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------- |
| `packages/ui/**` (install artifacts)                 | **`$ui-authoring`**, then **`$registry-sync`** after UI edits |
| `packages/tokens/**`                                 | **`$token-change-verify`**                                    |
| `packages/registry/**`, `packages/cli/**`, templates | **`$registry-sync`** as needed                                |
| `docs/**` layout or new pages                        | **`$docs-authoring`**                                         |
| Contracts, counts, INDEX freshness                   | **`$docs-alignment`** (user must want a docs pass)            |

---

## Procedure (canonical — AGENTS links here)

### 1. Branch

- Branch off **`dev`** — never commit directly to **`main`** unless the user explicitly requests it.
- Session state: **git + [REVIEW_TODO.md](../../docs/REVIEW_TODO.md)** — no local continuity files.

### 2. Implement

- Smallest correct diff; public API via `package.json` `exports` only.
- **Registry-first CLI** — metadata from registry items, no per-component install hardcoding.
- **UI → templates:** edit `packages/ui/src/components/`; run **`pnpm registry:sync`** via **`$registry-sync`** when install artifacts change — never hand-edit `packages/registry/templates/`.
- **Token CSS** is generated — never hand-write ([TOKENS.md](../../docs/reference/tokens/TOKENS.md)).

### 3. Docs

- New or reshaped markdown layout → **`$docs-authoring`**.
- Behavior, counts, or cross-links stale → **`$docs-alignment`** only when the user wants a docs pass (not every cleanup).
- Prefer links over copying [INDEX.md](../../docs/INDEX.md) owners.

### 4. Verify (user runs; agent plans)

**The agent does not run `pnpm` verification commands** during this step unless you explicitly ask it to. Instead:

1. Infer **touched paths** from the change set; pick commands from [SCRIPTS.md](../../docs/operations/SCRIPTS.md) and package ownership ([project-structure.mdc](../../.cursor/rules/project-structure.mdc)). Optionally use [`$monorepo-check-gate`](../../.agents/skills/monorepo-check-gate/SKILL.md) as a path → command helper if it is still present.
2. **Output a numbered checklist** for you — exact commands in **run order** (scoped `*:check` first; `pnpm check` when multiple packages or root config changed). Include chained steps when applicable (e.g. UI + templates: `pnpm ui:check` → `pnpm registry:sync` → `pnpm registry:check`).
3. **Stop and wait.** Do not proceed to step 5 until you report back:
   - **Pass** — e.g. “verify passed”, “all green”, paste summary if you want.
   - **Fail** — paste errors / failing command output; agent helps fix, then issues an **updated** checklist for the steps that still need re-run.
4. **Only after a pass** — continue with step 5 (PR last).

**Reminders to include in the checklist when relevant:**

- Default full gate reference: [SCRIPTS.md](../../docs/operations/SCRIPTS.md) (`pnpm check`).
- **Do not** suggest dev servers (`playground:dev`, `vite dev`, `next dev`) unless you explicitly asked.
- Playground is maintenance smoke only — not consumer install truth ([TESTING.md](../../docs/operations/TESTING.md)).
- Before commit (step 5): include **`pnpm format:check`** in the checklist when you will request a commit; you run it, same handoff as step 4.

### 5. PR last (user confirms; agent assists git)

- Proceed only when step 4 verify **passed** and you **explicitly** request commit, push, or PR.
- Follow **`$git-commit`** + [git-commits.mdc](../../.cursor/rules/git-commits.mdc) — agent drafts messages and runs git only when you ask in that turn.
- **The agent does not run `pnpm format:check`.** When you request a commit or PR, ask whether you already ran **`pnpm format:check`** (and `pnpm format` if it failed). Wait for confirmation; if not done yet, remind you to run it before continuing. After you confirm pass, continue with staging/commit/PR steps.
- Open PR to **`dev`** only when the branch is complete — not **`main`** unless you explicitly request it.

Human-oriented mirror: [CONTRIBUTING.md](../../docs/contributors/CONTRIBUTING.md).

---

## Trivial exception

One-line fix with **no** contract or catalog impact: skip **`$docs-alignment`**; still branch off **`dev`**. At verify, give you the minimal scoped `*:check` for the touched package (from [SCRIPTS.md](../../docs/operations/SCRIPTS.md)) — same handoff: you run, you report, then continue.

---

## Do not

- Run `pnpm` verification commands during step 4 unless you explicitly ask the agent to run them.
- Expand [AGENTS.md](../../AGENTS.md) with procedure essays — update this skill instead.
- Commit, push, or open a PR without explicit user request in that turn.
- Suggest dev servers as the default verification path.
- Paste registry two-zone or CVA treatises — [REGISTRY.md](../../docs/reference/registry/REGISTRY.md), [ui-components.mdc](../../.cursor/rules/ui-components.mdc), **`$ui-authoring`**.

---

## Skills roots (transitional)

| Location                                   | Contents                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| [`.cursor/skills/`](.)                     | **`$agent-workflow`** (this file) — Cursor project default                      |
| [`.agents/skills/`](../../.agents/skills/) | Domain procedures (`$git-commit`, `$registry-sync`, …) until a later repo reorg |

Load domain skills from **AGENTS.md** skills table after this procedure points you to them.

---

## See also

- [AGENTS.md](../../AGENTS.md) — guardrails, layers, skills table
- [project-structure.mdc](../../.cursor/rules/project-structure.mdc) — edit map
- [git-commits.mdc](../../.cursor/rules/git-commits.mdc) — commit/PR policy with **`$git-commit`**
