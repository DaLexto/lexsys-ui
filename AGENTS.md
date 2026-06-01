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

| Layer               | Where                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------ |
| Routing             | This file (`AGENTS.md`)                                                                    |
| Procedure           | [`.agents/skills/`](./.agents/skills/) — load `$name` skills on demand                     |
| Policy supplement   | e.g. [git-commits.mdc](./.agents/skills/git-commit/git-commits.mdc) with **`$git-commit`** |
| Edit-time standards | [`.cursor/rules/`](./.cursor/rules/) — attach via globs while editing matching files       |
| Contracts           | [docs/](./docs/) — domain specs; find owner in [INDEX.md](./docs/INDEX.md)                 |

**Quick routing:** new doc layout → **`$docs-authoring`**; counts or contracts stale → **`$docs-alignment`**; UI component work → **`$ui-authoring`** (+ `ui-component-authoring.mdc` on glob); commit / push / PR → **`$git-commit`**.

---

## Guardrails

- **Package boundaries:** public API via `package.json` `exports` only; `src/` is source-only; `dist/` is publish output; no deep imports into another package's `src/` or `dist/`.
- **Registry-first CLI:** no hardcoded per-component install logic; read registry metadata; idempotent installs; no silent overwrites — [CLI.md](./docs/reference/cli/CLI.md).
- **Generated CSS:** token CSS is build output — never hand-write. See [TOKENS.md](./docs/reference/tokens/TOKENS.md).
- **UI → registry:** after `packages/ui` edits that affect install artifacts, run **`pnpm registry:sync`** — **`$registry-sync`**.
- **Registry two-zone:** `packages/registry/src/items/` (install metadata) vs `packages/registry/templates/` (generated from UI — never edit templates directly). Full rules: [REGISTRY.md](./docs/reference/registry/REGISTRY.md); primitives vs blocks scaffolding via **`$registry-sync`**.
- **Playground:** maintenance-only monorepo smoke (~10–20%). Consumer truth is the external sandbox (~80–90%) — [TESTING.md § Verification surfaces](./docs/operations/TESTING.md#verification-surfaces).
- **Branch policy:** branch off **`dev`**; PR to **`dev`**; do not touch **`main`** unless the user explicitly requests it.
- **Prefer links over duplication** when a rule already lives in `docs/`.

---

## Verification

Default gate: **`pnpm check`** — [SCRIPTS.md](./docs/operations/SCRIPTS.md). Scoped checks by touched paths: **`$monorepo-check-gate`**. CLI / registry / templates / blocks PRs: **`$consumer-sandbox-verify`** before merge — [TESTING.md](./docs/operations/TESTING.md).

**Do not start dev servers** unless the user explicitly requests it (`pnpm playground:dev`, `vite dev`, `next dev`, or equivalent `*:dev`). Prefer non-interactive verification: `pnpm check`, scoped `*:check`, `pnpm playground:build`, unit tests, sandbox production build. Do not suggest starting a dev server as a default next step.

**Example sandbox path:** `D:\PLAYGROUND\sandbox-lexsys` (local; optional `AGENTS.md` in sandbox for consumer-specific notes).

---

## Repo skills

Load from [`.agents/skills/`](./.agents/skills/) for multi-step procedures. Git policy: [git-commits.mdc](./.agents/skills/git-commit/git-commits.mdc) (with **`$git-commit`**).

| Skill                      | When                                             |
| -------------------------- | ------------------------------------------------ |
| `$registry-sync`           | UI changed → sync registry templates             |
| `$consumer-sandbox-verify` | CLI/registry/template/blocks PR gate             |
| `$monorepo-check-gate`     | Pre-commit / pre-PR scoped `pnpm` checks         |
| `$ui-authoring`            | New or edited UI primitive/block/template; tests |
| `$docs-authoring`          | New or reshaped markdown layout                  |
| `$docs-alignment`          | Behavior or counts changed → cross-ref docs      |
| `$token-change-verify`     | Token layers, generator, or governance           |
| `$project-next-steps`      | What to work on next; backlog triage             |
| `$git-commit`              | Commit, push, or PR to `dev`                     |
| `$changelog-update`        | CHANGELOG after feature or fix merges            |

---

## Change workflow

Session state lives in **git + [REVIEW_TODO.md](./docs/REVIEW_TODO.md)**; do not maintain a local continuity file.

For non-trivial work (multi-file, behavior, CLI/registry/templates, agreed plans):

1. **Branch** off **`dev`**.
2. **Implement** on the branch; scoped commits per concern.
3. **Docs** — **`$docs-authoring`** for new/reshaped docs; **`$docs-alignment`** when contracts or counts change ([INDEX.md](./docs/INDEX.md)).
4. **Verify** — **`$monorepo-check-gate`**; **`$consumer-sandbox-verify`** when install artifacts change.
5. **PR last** to **`dev`** when the branch is complete — **`$git-commit`**.

Human-oriented steps: [CONTRIBUTING.md](./docs/contributors/CONTRIBUTING.md). Trivial one-line fixes with no contract impact may skip the docs pass; still branch off `dev`.

---

## Task guidance

- Prefer small, reviewable diffs.
- Respect package boundaries and registry metadata.
- Avoid hardcoded install logic and accidental public API expansion.
- When unsure, prefer long-term architecture over short-term convenience.
