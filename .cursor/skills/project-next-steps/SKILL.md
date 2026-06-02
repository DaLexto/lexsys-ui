---
name: project-next-steps
description: >
  Analyze Lexsys monorepo maturity and suggest realistic next steps from
  REVIEW_TODO, ROADMAP, and domain docs. Use for what to work on next, sta dalje,
  project status, backlog triage, Known Gaps, stale plans, or planned vs deferred
  work. Outputs Continuation, Cleanup, Improvements. Procedures in procedures.md.
---

# Project next steps

Use when the user asks **what to do next**, **project status**, or **where the repo stands** — not when implementing a task already chosen.

Routing: [docs/INDEX.md](../../docs/INDEX.md) · [AGENTS.md](../../AGENTS.md)

**Backlog owner:** [docs/REVIEW_TODO.md](../../docs/REVIEW_TODO.md). This skill owns **how to analyze** — do not copy queue rows into skill files.

**Read [procedures.md](./procedures.md) before deep analysis** (probes, prioritization, post-queue mode).

## When to use

- "What's next?" / "Where are we?" / "Suggest next steps" / backlog triage
- Picking work after a merge or between phases
- Doc drift, stale counts, or backlog vs reality mismatch

## When not to use

- User named a task, branch, or PR scope — implement via **`$agent-workflow`**
- Pure doc edit pass — **`$docs-authoring`** ([alignment](../docs-authoring/procedures.md#alignment))
- Pre-commit / PR on a branch in progress — **`$agent-workflow`** step 4 or **`$git-commit`**

## Procedure router

| Intent                                   | Section                                                                                                                     |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Doc map, REVIEW_TODO extract, post-queue | [§ Extract & post-queue](./procedures.md#extract-from-review_todo-living-backlog)                                           |
| Drift grep, layer spot-checks            | [§ Doc health](./procedures.md#doc-health-grep-generic) · [§ Layer spot-checks](./procedures.md#layer-spot-checks-by-track) |
| Cleanup candidates                       | [§ Cleanup probes](./procedures.md#cleanup-signal-probes)                                                                   |
| Priority order                           | [§ Prioritization](./procedures.md#prioritization)                                                                          |
| Fast backlog extract                     | [§ Quick snapshot](./procedures.md#quick-snapshot-script)                                                                   |

---

## Analysis steps (summary)

### 1 — Read active state (in order)

| Order | Source                                                            | Extract                                               |
| ----- | ----------------------------------------------------------------- | ----------------------------------------------------- |
| 1     | `git status`, `git branch --show-current`, `git log -5 --oneline` | In-flight work, recent merges                         |
| 2     | [REVIEW_TODO.md](../../docs/REVIEW_TODO.md)                       | Execution queue, **Known Gaps**, open P-sections      |
| 3     | [ROADMAP.md](../../docs/ROADMAP.md)                               | Phase status; **Explicitly deferred**                 |
| 4     | Domain doc for active track only                                  | Link from REVIEW_TODO or [INDEX](../../docs/INDEX.md) |

Do **not** treat "Current State" sections as backlog — they describe what already shipped.

Optional: run [backlog-snapshot.mjs](./scripts/backlog-snapshot.mjs) when the user wants a quick extract.

### 1b — Post-queue

When queue rows are mostly `shipped` / `done`, follow [procedures.md § Post-queue](./procedures.md#post-queue-mode).

### 2 — Classify

Label each candidate: **Current** | **In progress** | **Planned** | **Deferred** | **Speculative** (see hub table in prior skill or procedures maturity labels).

Doc drift → **`$docs-authoring`** alignment before feature recommendations.

### 3 — Spot-check (lightweight)

Suggest `pnpm *:check` via **`$monorepo-verify-gate`** for tracks you recommend — do not run unless the user asks. Note **unverified** when skipped.

### 4 — Prioritize

Full rules: [procedures.md § Prioritization](./procedures.md#prioritization).

### 5 — Output format

Always use **three recommendation categories** plus snapshot. Aim for 2–3 items per category.

```markdown
## Project snapshot

- Branch: …
- Active queue: … (execution table row names, or "empty" if all shipped)
- Phase: … (ROADMAP / REVIEW_TODO status)
- Doc health: drift yes/no — …

## Continuation

Items that continue the current trajectory — Known Gaps, planned queue rows, release milestone.

1. **[Planned|In progress]** … — why high leverage; owner doc link
2. …

## Cleanup

Tech debt, stale docs, agent-skill moves, inconsistencies. See cleanup probes in procedures.

1. …
2. …

## Improvements

Features, catalog expansion, DX — valuable but not required for stability.

1. …
2. …

## Explicitly not now

- Deferred: …
- Speculative: …
- Already shipped (do not re-suggest): …
```

---

## Do not

- Duplicate REVIEW_TODO into skill files — update docs when backlog changes
- Suggest rewrites when [ARCHITECTURE.md](../../docs/ARCHITECTURE.md) contracts hold
- Recommend **shipped** or ~~strikethrough~~ items as new work
- Urgent ROADMAP vision without REVIEW_TODO backing
- Start dev servers as a "next step"
- Create a local continuity file — state is git + REVIEW_TODO
- Flat single-list recommendations

---

## Related

- [`$docs-authoring`](../docs-authoring/SKILL.md) — drift and shipping doc updates
- [`$agent-workflow`](../agent-workflow/SKILL.md) — implement a chosen slice
- [`$monorepo-verify-gate`](../monorepo-verify-gate/SKILL.md) — which `pnpm` checks to run
- [`$components-authoring`](../components-authoring/SKILL.md) — new primitive/block/template
- [TESTING.md](../../docs/operations/TESTING.md)
