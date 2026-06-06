# Git procedures

Step-by-step git operations for [`$git-commit`](./SKILL.md). **Policy** (types, scopes, labels table): [git-commits.mdc](../rules/git-commits.mdc).

The agent runs git/gh only when the user explicitly requests it in that turn. Do not run `pnpm` unless they explicitly ask.

**Pre-git gates (commit, push, PR, ff `main`):** [`$monorepo-verify-gate` § Format gate](../monorepo-verify-gate/SKILL.md#format-gate-mandatory--blocks-git-write). If format was skipped earlier: [format fallback](../monorepo-verify-gate/SKILL.md#format-fallback-step-5-only).

---

## Commit

1. **Inspect** (parallel): `git status --short`, `git diff`, `git diff --staged`, `git log -5 --oneline`
2. **Gates:** see [§ Format gate](../monorepo-verify-gate/SKILL.md#format-gate-mandatory--blocks-git-write).
3. **Stage:** `git add -- <path>` — not `git add -A` unless the user wants everything
4. **Message:** type, scope, subject — [git-commits.mdc](../rules/git-commits.mdc) § Commit types, Scopes, Breaking changes
5. **Commit** (PowerShell):

```powershell
git commit -m "type(scope): short summary" -m "Optional body."
```

No `--no-verify`, no interactive git (`-i`).

---

## Push

Only when the user **explicitly** requests. **Gates:** [§ Format gate](../monorepo-verify-gate/SKILL.md#format-gate-mandatory--blocks-git-write).

```bash
git push -u origin HEAD
```

---

## Pull request

Only when the user **explicitly** requests a PR and the branch is complete.

1. **Gates:** [§ Format gate](../monorepo-verify-gate/SKILL.md#format-gate-mandatory--blocks-git-write) — output checklist and **stop** if not **`verify passed`**.
2. **Inspect vs `dev`** (parallel): `git status --short`, `git diff`, `git rev-parse --abbrev-ref HEAD`, `git log dev..HEAD --oneline`, `git diff dev...HEAD --stat`
3. Do not run `pnpm` unless they explicitly ask. Do not mark verification "passed" in the PR body without user confirmation.
4. **Template:** [lite.md](../../../.github/PULL_REQUEST_TEMPLATE/lite.md) or [full.md](../../../.github/PULL_REQUEST_TEMPLATE/full.md) — default base **`dev`**. Fill from **all** branch commits; see [git-commits.mdc § Fill the template](../rules/git-commits.mdc#fill-the-template).
5. **Derive labels** from diff + commits (before create):
   - One `type:*` (mirrors primary commit type)
   - All matching `area:*` from [git-commits.mdc § area mapping](../rules/git-commits.mdc#area-mapping)
   - `status:ready-for-review`
   - `meta:breaking-change` when applicable  
     Namespaces: [CONTRIBUTING § GitHub labels](../../docs/contributors/CONTRIBUTING.md).
6. **Create + labels (atomic — same turn, no pause):** PR is **not complete** until labels are applied. Run both commands back-to-back; do not return the PR URL between them.

```bash
gh pr create --base dev --title "short pr title" --body-file path/to/filled-body.md
gh pr edit <number> --add-label "type:feat,area:ui,status:ready-for-review"
```

No unfilled `<!-- -->` placeholders in the body. Comma-separated labels; no spaces after commas. Use `<number>` from the create output URL, or `gh pr view --json number -q .number` on the current branch.

7. **Verify labels (required — do not skip):**

```bash
gh pr view <number> --json labels
```

Confirm at least one `type:*`, every matching `area:*`, and `status:ready-for-review`. If any are missing, run `gh pr edit` again before continuing.

8. **Return** the PR URL only after step 7 passes. Push only when the user explicitly requests it.

---

## Fast-forward main

Only when the user explicitly requests ff `main`. **Gates:** [§ Format gate](../monorepo-verify-gate/SKILL.md#format-gate-mandatory--blocks-git-write).

```bash
git checkout main && git pull origin main
git merge --ff-only dev
git push origin main
git checkout dev
```
