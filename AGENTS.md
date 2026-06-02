# AGENTS.md

**Audience:** Maintainers, contributors, and agents  
**Type:** Routing hub  
**Source of truth for:** Agent routing and guardrails (not domain specification bodies)

---

## Purpose

Repository-specific **routing layer** for `lexsys`. Global user and tool rules apply by default. This file adds identity, guardrails, and pointers to canonical docs — not duplicated domain contracts.

Lexsys is a **registry-first React UI framework**:

```txt
packages/registry → packages/cli → consumer project → user-owned code
```

Installed code is user-owned; CLI is idempotent and metadata-driven; packages stay publish-ready and separated. System shape: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md). Package paths and edit map: [.cursor/rules/project-structure.mdc](./.cursor/rules/project-structure.mdc). Full doc owners: [docs/INDEX.md](./docs/INDEX.md).

---

## Layers

| Layer               | Where                                                                                |
| ------------------- | ------------------------------------------------------------------------------------ |
| Routing             | This file (`AGENTS.md`)                                                              |
| Procedure           | [`.cursor/skills/`](./.cursor/skills/) — load `$name` on demand                      |
| Policy supplement   | [git-commits.mdc](./.cursor/rules/git-commits.mdc) with **`$git-commit`**            |
| Edit-time standards | [`.cursor/rules/`](./.cursor/rules/) — attach via globs while editing matching files |
| Contracts           | [docs/](./docs/) — domain specs; find owner in [INDEX.md](./docs/INDEX.md)           |

**Quick routing:** default for implementation → **`$agent-workflow`** (if unsure, start there); docs (layout or freshness) → **`$docs-authoring`**; UI component work → **`$components-authoring`** (+ `ui-components.mdc` on glob); commit / push / PR → **`$git-commit`**.

---

## Guardrails

- **Package boundaries:** public API via `package.json` `exports` only; `src/` is source-only; `dist/` is publish output; no deep imports into another package's `src/` or `dist/`.
- **Registry-first CLI:** no hardcoded per-component install logic; read registry metadata; idempotent installs; no silent overwrites — [CLI.md](./docs/reference/cli/CLI.md).
- **Generated CSS:** token CSS is build output — never hand-write. See [TOKENS.md](./docs/reference/tokens/TOKENS.md).
- **UI → registry:** after UI edits affecting install artifacts, put **`pnpm registry:sync`** on the step 4 checklist via **`$monorepo-verify-gate`** — **`$registry-sync`** for metadata; never hand-edit templates.
- **Registry two-zone:** `packages/registry/src/items/` (install metadata) vs `packages/registry/templates/` (generated from UI — never edit templates directly). **`pnpm registry:sync`** reconciles items and templates for all layers (preserves `aliases` / `category` on reconcile). Full rules: [REGISTRY.md](./docs/reference/registry/REGISTRY.md); workflow: **`$registry-sync`**.
- **Playground:** maintenance-only monorepo smoke — not consumer install truth. See [TESTING.md](./docs/operations/TESTING.md).
- **Branch policy:** branch off **`dev`**; PR to **`dev`**; do not touch **`main`** unless the user explicitly requests it.
- **Prefer links over duplication** when a rule already lives in `docs/`.

---

## Verification

Default gate: **`pnpm check`** — [SCRIPTS.md](./docs/operations/SCRIPTS.md). Scoped verify checklists: **`$monorepo-verify-gate`**.

**During [`$agent-workflow`](./.cursor/skills/agent-workflow/SKILL.md) step 4:** load **`$monorepo-verify-gate`** — numbered checklist from change type; **you run** commands and reply **`verify passed`** or paste errors. The agent does not run `pnpm` verify unless you explicitly ask in that turn.

**Outside agent-workflow:** the agent may run `pnpm check`, scoped `*:check`, `pnpm playground:build`, or unit tests when you request it.

**Do not start dev servers** unless you explicitly request it (`pnpm playground:dev`, `vite dev`, `next dev`, or equivalent `*:dev`). Do not suggest a dev server as the default verification path.

---

## Repo skills

**Skills layout:** [`.cursor/skills/`](./.cursor/skills/) — `$agent-workflow`, `$monorepo-verify-gate`, `$git-commit`, `$registry-sync`, `$token-verify`, `$components-authoring`, `$changelog-update`, `$docs-authoring`, `$project-next-steps`. Git policy: [git-commits.mdc](./.cursor/rules/git-commits.mdc) with [**`$git-commit`**](./.cursor/skills/git-commit/SKILL.md).

| Skill                   | When                                                                                                                                |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `$agent-workflow`       | **Default** monorepo implementation procedure (unless a single other skill is named)                                                |
| `$monorepo-verify-gate` | User-run verify checklists by change type (step 4; format last when committing)                                                     |
| `$registry-sync`        | UI changed → sync templates + reconciled items ([`.cursor/skills/registry-sync/`](./.cursor/skills/registry-sync/))                 |
| `$components-authoring` | New or edited UI primitive/block/template; tests ([`.cursor/skills/components-authoring/`](./.cursor/skills/components-authoring/)) |
| `$docs-authoring`       | Markdown layout and freshness ([`.cursor/skills/docs-authoring/`](./.cursor/skills/docs-authoring/))                                |
| `$token-verify`         | Token layers, generator, or governance ([`.cursor/skills/token-verify/`](./.cursor/skills/token-verify/))                           |
| `$project-next-steps`   | What to work on next; backlog triage ([`.cursor/skills/project-next-steps/`](./.cursor/skills/project-next-steps/))                 |
| `$git-commit`           | Commit, push, or PR to `dev`                                                                                                        |
| `$changelog-update`     | CHANGELOG after feature or fix merges ([`.cursor/skills/changelog-update/`](./.cursor/skills/changelog-update/))                    |

---

## Change workflow

**Procedure (canonical):** [`$agent-workflow`](./.cursor/skills/agent-workflow/SKILL.md) — branch → implement → docs → verify (**`$monorepo-verify-gate`**, you run checks) → PR last (**`$git-commit`** when you ask). Session state: **git + [REVIEW_TODO.md](./docs/REVIEW_TODO.md)** only.

Use it for non-trivial work (multi-file, behavior, CLI/registry/templates, agreed plans); load domain skills from the table above as that skill directs.

Human-oriented mirror: [CONTRIBUTING.md](./docs/contributors/CONTRIBUTING.md). Trivial one-line fixes with no contract impact may skip the docs pass; still branch off `dev`.

---

## Task guidance

- Prefer small, reviewable diffs.
- Respect package boundaries and registry metadata.
- Avoid hardcoded install logic and accidental public API expansion.
- When unsure, prefer long-term architecture over short-term convenience.
