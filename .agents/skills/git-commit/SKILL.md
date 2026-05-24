---
name: git-commit
description: >
  Neurex git commit, push, and PR workflow with Conventional Commits scopes.
  Use when the user asks to commit, push, open a PR, ff main, /commit , or
  mentions git-commits.mdc, branch off dev, or gh pr create.
  Supports: (1) Inspecting git status and diff before deciding, (2) Auto-detecting commit type and scope from actual changes, (3) Generating Conventional Commit messages with optional user overrides, (4) Staging only files clearly related to the requested task.
---

# Git commit and PR

Use this skill when the user requests **commit**, **push**, or **PR** — not for
implementing feature code.

**Workflow policy (canonical):** [git-commits.mdc](./git-commits.mdc)  
**Conventional Commits authoring:** [.cursor/rules/git-commit-rules.mdc](../../../.cursor/rules/git-commit-rules.mdc)  
**Branch context:** [AGENTS.md § Change workflow](../../AGENTS.md#change-workflow)

## When to use

- "Commit this", "push", "open PR to dev", "ff main", `/commit`
- Drafting Conventional Commit messages from the actual diff
- After implementation when the user wants changes in git

## When not to use

- User only asked to edit code — no git write ops
- Intent unclear ("save this", "ship it") — ask: files only, commit, push, or PR?

---

## Procedure A — Commit

1. **Inspect** (parallel): `git status --short`, `git diff`, `git diff --staged`, `git log -5 --oneline`
2. **Gates:** `pnpm format:check` (required); **`$monorepo-check-gate`** for touched paths
3. **Stage:** `git add -- <path>` — not `git add -A` unless user wants everything
4. **Message:** type, scope, subject — full rules in [git-commits.mdc](./git-commits.mdc)
5. **Commit** (PowerShell):

```powershell
git commit -m "type(scope): short summary" -m "Optional body."
```

No `--no-verify`, no interactive git (`-i`).

---

## Procedure B — Push

Only when the user **explicitly** requests:

```bash
git push -u origin HEAD
```

---

## Procedure C — Pull request

Only when the user **explicitly** requests PR and the branch is complete.

1. **Inspect vs dev** (parallel): `git status --short`, `git diff`, `git rev-parse --abbrev-ref HEAD`, `git log dev..HEAD --oneline`, `git diff dev...HEAD --stat`
2. **Verify:** `pnpm format:check`; **`$monorepo-check-gate`** or `pnpm check`; **`$consumer-sandbox-verify`** when install artifacts changed
3. **Template:** [lite.md](../../.github/PULL_REQUEST_TEMPLATE/lite.md) or [full.md](../../.github/PULL_REQUEST_TEMPLATE/full.md) — default base **`dev`**
4. **Create:** fill template from **all** branch commits; `gh pr create --base dev --title "…" --body-file …`
5. **Labels:** required after create — see [git-commits.mdc § GitHub labels](./git-commits.mdc#github-labels-required-after-pr-create)

Return the PR URL. Do not push unless the user explicitly requests it.

---

## Procedure D — Fast-forward main (explicit only)

Only when the user explicitly requests ff `main`:

```bash
git checkout main && git pull origin main
git merge --ff-only dev
git push origin main
git checkout dev
```

---

## Related

- [git-commits.mdc](./git-commits.mdc) — authorization, scopes, types, breaking changes, PR labels
- `$monorepo-check-gate` — pre-commit / pre-PR checks
- `$docs-alignment` — before commit when contracts or counts changed
- `$registry-sync` — before/at registry commit after UI template changes
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — human-oriented overview
