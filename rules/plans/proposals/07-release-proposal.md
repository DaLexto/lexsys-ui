# Proposal (discussion): `release.mdc`?

**Status:** concluded — **NO** `release.mdc`; release via skills (manual routines)  
**Catalog #:** 7

---

## What problem might a release rule solve?

When editing **release-adjacent** files:

- Wrong branch target (`main` instead of `dev`)
- Agent runs **commit/push** without you asking
- CHANGELOG entry in wrong format or wrong package changelog
- Duplicating full **DEPLOY** or **git-commits** policy inside a rule
- Confusion between “docs say deploy” vs “skill says how to commit”

**Question:** does this happen often enough on **file edit**, or only when you explicitly ask for commit/PR?

---

## What already covers release (no new rule yet)

| Layer | Where | Holds |
| ----- | ----- | ----- |
| Routing | **AGENTS.md** | branch `dev`, PR to `dev`, `$git-commit`, `$changelog-update` |
| Policy | **git-commits.mdc** + **`$git-commit`** | when commit/push allowed, Conventional Commits |
| Contract | **[DEPLOY.md](../../../docs/operations/DEPLOY.md)** | publish / deploy shape |
| Procedure | **`$changelog-update`** | CHANGELOG entries after merge |
| Docs | SCRIPTS, TESTING | gates before PR — skills |

There is **no** dedicated release `.mdc` today.

---

## If we said NEED — what could `release.mdc` hold? (~40–80 lines max)

**Not** duplicate git-commits or DEPLOY. Only **pointers at edit time**:

| Section | Content |
| ------- | ------- |
| Scope | When editing release-related paths (see globs below) |
| Do not | Commit/push unless user asked; touch `main`; amend without rules in git-commits |
| Branch | PR → `dev` — one line + AGENTS |
| When editing CHANGELOG | Pointer `$changelog-update` + package ownership (which CHANGELOG) |
| When deploy/release questions | Link DEPLOY.md — not full spec |
| When commit/PR task | Load **`$git-commit`** — not steps here |

**Possible globs (pick one set):**

| Set | Globs |
| --- | ----- |
| **R1 — narrow** | `CHANGELOG.md`, `packages/*/CHANGELOG.md` |
| **R2 — medium** | R1 + `.github/workflows/**`, `package.json` (root only?) |
| **R3 — none** | **NO rule** — AGENTS + skills only |

**Name:** `release.mdc` vs `changelog.mdc` vs skip file entirely

---

## Arguments FOR

1. Reminder when agent touches **CHANGELOG** — format/ownership easy to get wrong.
2. Reinforces **do not commit** in same place as changelog edits.
3. Single place for “release surface” without expanding AGENTS.

---

## Arguments AGAINST (NO / DEFER — prior lean)

1. **Low edit frequency** — CHANGELOG/deploy edits are rare vs daily TS/docs/UI.
2. **`$git-commit` + git-commits** already policy layer — rule duplicates.
3. **AGENTS guardrails** already say branch policy.
4. **DEFER** to wave 2 (skills refactor) — one “release/changelog” skill + AGENTS line may be enough.
5. Wrong glob (e.g. root `package.json`) fires rule on unrelated version bumps.

---

## Overlap table

| Topic | Owner | New rule? |
| ----- | ----- | --------- |
| Commit message / push | `$git-commit` + git-commits.mdc | NO — link only |
| Deploy publish | DEPLOY.md | NO — link only |
| CHANGELOG write | `$changelog-update` | maybe 3 bullets in thin rule |
| PR checklist | AGENTS + TESTING | NO |

---

## Your answer (2026-05-30)

| # | Answer |
| - | ------ |
| 1 | **NO** — no `release.mdc` |
| 2–4 | Release work is **manual**; routines live in **skills** (e.g. `$git-commit`, `$changelog-update`, future release skill in wave 2) |

---

## After discussion

Update [RULES_CATALOG.md](../RULES_CATALOG.md). If NO/DEFER — catalog wave 1 domain rules list is complete for writing phase.
