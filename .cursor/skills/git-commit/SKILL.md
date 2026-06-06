---
name: git-commit
description: >
  Lexsys git commit, push, and PR with Conventional Commits and required PR labels.
  Use when the user asks to commit, push, open a PR, ff main, /commit, gh pr create,
  or gh pr edit labels. Load procedures.md for steps. Policy in git-commits.mdc.
  After verify passed via $monorepo-verify-gate or format ok before commit.
---

# Git commit and PR

Use when the user requests **commit**, **push**, or **PR** — not for implementing feature code.

**Policy:** [git-commits.mdc](../rules/git-commits.mdc) — authorization, types, scopes, breaking changes, label mapping  
**Verify/format:** [`$monorepo-verify-gate`](../monorepo-verify-gate/SKILL.md) · [`$agent-workflow`](../agent-workflow/SKILL.md) step 5  
**Branch context:** [AGENTS.md § Change workflow](../../AGENTS.md#change-workflow)

## When to use

- "Commit this", "push", "open PR to dev", "ff main", `/commit`
- Drafting Conventional Commit messages from the actual diff

## When not to use

- User only asked to edit code — no git write ops
- Intent unclear ("save this", "ship it") — ask: files only, commit, push, or PR?

---

## Procedure router

**Read the matching section in [procedures.md](./procedures.md) before running git/gh commands.**

| User intent        | Section                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------- |
| commit / `/commit` | [§ Commit](./procedures.md#commit)                                                        |
| push only          | [§ Push](./procedures.md#push)                                                            |
| open PR            | [§ Pull request](./procedures.md#pull-request) — **create + labels + verify in one turn** |
| ff `main`          | [§ Fast-forward main](./procedures.md#fast-forward-main)                                  |

---

## Related

- [procedures.md](./procedures.md) — inspect, stage, commit, push, PR, labels
- [git-commits.mdc](../rules/git-commits.mdc) — policy and `area:*` label table
- [`$agent-workflow`](../agent-workflow/SKILL.md) — verify before PR
- [`$monorepo-verify-gate`](../monorepo-verify-gate/SKILL.md) — verify checklists
- [CONTRIBUTING.md](../../docs/contributors/CONTRIBUTING.md) — human-oriented overview; label namespaces
