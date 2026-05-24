# AGENTS.md

## Purpose

Repository-specific **routing layer** for `lexsys`. Global user and tool rules
apply by default. This file adds Lexsys identity, guardrails, and pointers to
canonical docs — not duplicated domain contracts.

Full doc map: [docs/INDEX.md](./docs/INDEX.md).

---

## Project identity

Lexsys is a **registry-first React UI framework**.

```txt
packages/registry → packages/cli → consumer project → user-owned code
```

| Package             | Role                                                                      |
| ------------------- | ------------------------------------------------------------------------- |
| `packages/tokens`   | Design token source of truth; resolver; generated CSS                     |
| `packages/ui`       | Reference primitives, blocks, templates — not what CLI ships as a library |
| `packages/registry` | Install metadata + templates; source of truth for CLI install behavior    |
| `packages/cli`      | `lexsys` binary; metadata-driven installer                                |

Core principles: installed code is user-owned; CLI is idempotent and
metadata-driven; packages stay publish-ready and separated.

System shape: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

---

## Source-of-truth map

| If you need…                                   | Read                                                                         |
| ---------------------------------------------- | ---------------------------------------------------------------------------- |
| System shape, install flow, package boundaries | [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)                               |
| Token layers, validation, CSS generation       | [docs/TOKENS.md](./docs/TOKENS.md)                                           |
| Registry items, template sync, validation      | [docs/REGISTRY.md](./docs/REGISTRY.md)                                       |
| `lexsys` commands, config, install behavior    | [docs/CLI.md](./docs/CLI.md)                                                 |
| Component structure, Base UI boundaries        | [docs/UI.md](./docs/UI.md)                                                   |
| Variant props and CVA rules                    | [docs/UI_VARIANTS.md](./docs/UI_VARIANTS.md)                                 |
| Primitives / blocks / templates layers         | [docs/UI_COMPOSITION.md](./docs/UI_COMPOSITION.md)                           |
| Verification surfaces and test coverage        | [docs/TESTING.md](./docs/TESTING.md)                                         |
| `pnpm` scripts and sync workflows              | [docs/SCRIPTS.md](./docs/SCRIPTS.md)                                         |
| Style and naming                               | [docs/STYLE.md](./docs/STYLE.md), [docs/STYLEGUIDE.md](./docs/STYLEGUIDE.md) |
| Build and publish contract                     | [docs/DEPLOY.md](./docs/DEPLOY.md)                                           |
| Active backlog and execution queue             | [docs/REVIEW_TODO.md](./docs/REVIEW_TODO.md)                                 |
| Long-term roadmap (M1–M10, tokens phases)      | [docs/ROADMAP.md](./docs/ROADMAP.md)                                         |

---

## Always-on guardrails

- **Package boundaries:** public API via `package.json` `exports` only; `src/`
  is source-only; `dist/` is publish output; no deep imports into another
  package's `src/` or `dist/`.
- **Registry-first CLI:** no hardcoded per-component install logic; read registry
  metadata; idempotent installs; no silent overwrites — [docs/CLI.md](./docs/CLI.md).
- **Generated CSS:** token CSS is build output — never hand-write. See
  [docs/TOKENS.md](./docs/TOKENS.md).
- **UI → registry:** after `packages/ui` edits that affect install artifacts,
  run **`pnpm registry:sync`** — use **`$registry-sync`** skill.
- **Playground:** maintenance-only monorepo smoke (~10–20%). Consumer truth is
  the external sandbox (~80–90%) — [docs/TESTING.md § Verification surfaces](./docs/TESTING.md#verification-surfaces).
- **Branch policy:** branch off **`dev`**; PR to **`dev`**; do not touch
  **`main`** unless the user explicitly requests it.
- **Prefer links over duplication** when a rule already lives in `docs/`.

---

## Verification routing

Default gate: **`pnpm check`** — [docs/SCRIPTS.md](./docs/SCRIPTS.md).

| Touch area                          | Minimum checks                                                    |
| ----------------------------------- | ----------------------------------------------------------------- |
| `packages/tokens`                   | `pnpm tokens:check`                                               |
| `packages/ui`                       | `pnpm ui:check`; then `$registry-sync` if templates should change |
| `packages/registry`                 | `pnpm registry:check`                                             |
| `packages/cli`                      | `pnpm cli:check`                                                  |
| CLI / registry / templates / blocks | `$consumer-sandbox-verify` before PR                              |

Use **`$monorepo-check-gate`** for scoped verification by touched paths.

Do **not** start dev servers unless the user explicitly asks — see
[§ Agent operations](#agent-operations).

**Example sandbox path:** `D:\PLAYGROUND\sandbox-lexsys` (local; optional
`AGENTS.md` in sandbox for consumer-specific notes).

---

## Repo skills

Load from [`.agents/skills/`](./.agents/skills/) for multi-step procedures.

| Skill                      | When                                                            |
| -------------------------- | --------------------------------------------------------------- |
| `$registry-sync`           | UI source changed → sync registry templates                     |
| `$consumer-sandbox-verify` | CLI/registry/template/blocks PR gate                            |
| `$monorepo-check-gate`     | Pre-commit / pre-PR scoped `pnpm` checks                        |
| `$ui-component-change`     | New or edited primitive/block/template in UI                    |
| `$docs-alignment`          | Behavior or counts changed → cross-ref docs                     |
| `$token-change-verify`     | Token layers, generator, or governance touched                  |
| `$project-next-steps`      | What to work on next, backlog triage, project status            |
| `$git-commit`              | Commit, push, or PR to dev — Conventional Commits + gh workflow |

---

## Change workflow

Session state lives in **git + [docs/REVIEW_TODO.md](./docs/REVIEW_TODO.md)**; do not
maintain a local continuity file.

For non-trivial work (multi-file, behavior, CLI/registry/templates, agreed plans):

1. **Branch** off **`dev`** — never commit directly to **`main`**.
2. **Implement** on the branch; scoped commits per concern.
3. **Docs alignment** — **`$docs-alignment`** when contracts or counts change;
   link to [docs/INDEX.md](./docs/INDEX.md).
4. **Verify** — **`$monorepo-check-gate`**; sandbox when install artifacts change.
5. **PR last** to **`dev`** only when the branch is complete — **`$git-commit`**.

Human-oriented steps: [CONTRIBUTING.md](./CONTRIBUTING.md).

Trivial one-line fixes with no contract impact may skip the docs pass; still
branch off `dev`.

---

## Agent operations

**Do not start dev servers** unless the user explicitly requests it:

- `pnpm playground:dev`, `vite dev`, `next dev`, or equivalent `*:dev`

Use non-interactive verification: `pnpm check`, scoped `*:check`,
`pnpm playground:build`, unit tests, sandbox build smoke.

Do not suggest starting a dev server as a default next step.

---

## Task guidance

- Prefer small, reviewable diffs.
- Respect package boundaries and registry metadata.
- Avoid hardcoded install logic and accidental public API expansion.
- When unsure, prefer long-term architecture over short-term convenience.
