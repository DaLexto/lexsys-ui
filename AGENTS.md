# AGENTS.md

## Purpose

This file defines repository-specific guidance for `neurex`.

Use global rules as the default contract.  
This file adds only rules specific to this repository.

---

## Project Context

Neurex is a **registry-first React UI framework**.

Core architecture is defined in:

- `docs/ARCHITECTURE.md`

Core principles:

- components are installed via CLI, not imported as black-box dependencies
- installed code becomes user-owned
- CLI behavior must be metadata-driven and idempotent
- packages must remain cleanly separated and publish-ready

---

## Repo Structure

This monorepo contains the following packages:

- `packages/tokens`
  - design token source of truth
  - token resolution and theme generation

- `packages/ui`
  - source/reference component implementations
  - not the final distributed form

- `packages/registry`
  - installable templates and metadata
  - defines what CLI installs

- `packages/cli`
  - installs components into consumer projects
  - orchestrates dependency and file management

Do not blur responsibilities between packages.

---

## Verification surfaces

Canonical policy: [docs/TESTING.md § Verification surfaces](./docs/TESTING.md#verification-surfaces).

| Surface | Model | Policy | Maintainer focus |
| ------- | ----- | ------ | ---------------- |
| `apps/playground` | Workspace `@neurex/ui` + built token CSS | **Maintenance-only** monorepo smoke | **~10–20%** — optional wiring check |
| External consumer sandbox | `neurex add` → user-owned templates/CSS | **Consumer truth** | **~80–90%** — CLI, install UX, design sign-off |
| Your SaaS (future) | CLI-installed consumer app | Primary product surface | Replaces sandbox for UX; sandbox stays minimal CLI regression |

**Local sandbox path (example):** `D:\PLAYGROUND\sandbox-neurex`  
**Agent contract:** `D:\PLAYGROUND\sandbox-neurex\AGENTS.md`

Do not expand playground product UX unless explicitly editing `apps/playground/**`. After changes that affect what users install, verify in the sandbox — not only in playground.

Sandbox checklist: [docs/TESTING.md § Consumer sandbox verification](./docs/TESTING.md#consumer-sandbox-verification).

---

## Architectural Contract

### Registry-first model

The CLI installs components into the user project:

registry → CLI → user project → user-owned code

Rules:

- CLI must never hardcode install logic
- CLI must read registry metadata
- install process must be idempotent
- user code must never be overwritten silently

---

## Package Boundaries

Treat each package as publish-ready.

Rules:

- public API is defined only via `exports`
- `src/` is source-only
- `dist/` is the only distributable output
- no deep imports into `src/` or `dist/`
- no accidental exposure of internal files

---

## Tokens Workflow

Detailed token rules are defined in `docs/TOKENS.md`.

`packages/tokens` follows this dependency model:

    primitives -> brand -> semantics -> component tokens

Rules:

- primitives contain raw values only
- brand tokens reference primitive tokens
- brand tokens hold brand-level palette decisions, not usage intent
- semantic tokens reference brand tokens for brand-specific values
- semantic tokens may reference primitive tokens for non-brand values such as neutrals, feedback, and foundation scales
- semantic tokens must never reference component tokens
- component tokens reference semantic tokens only
- component tokens must never reference primitives, brand tokens, or theme tokens directly
- themes override semantic values per mode
- themes are not a fifth token layer
- themes must never reference component tokens
- presets are configuration, not token layers
- presets never participate in token resolution
- CSS must be generated, never handwritten

Current build-failing validation covers missing references, circular references,
missing preset-required theme modes, invalid DTCG token leaf shape, and token
layer contract violations (component-to-primitive, component-to-brand,
component-to-theme, semantic-to-component, theme-to-component, and brand tokens
with component-specific intent). Layer validation runs in
`validateStyleTokenInput` via `validateTokenLayerContractsStrict`.

Target capabilities not yet build-failing include color math, contrast
validation, composite token expansion, and expression evaluation. See
`docs/RESOLVER_EVOLUTION.md`.

---

## UI Workflow

`packages/ui` is the reference implementation layer.

Rules:

- components must follow the defined structure:

ComponentName/
ComponentName.tsx
ComponentName.types.ts
ComponentName.variants.ts

- components must support:
  - variants
  - className overrides

- complex components must support:
  - simple usage
  - compound composition

- Base UI is internal only
- accessibility must be preserved

---

## Registry Workflow

`packages/registry` defines installable items.

Rules:

- every item must declare:
  - files
  - dependencies
  - utilities
  - styles
  - target paths

- registry is the source of truth for CLI behavior
- no install logic may exist outside registry metadata

---

## CLI Workflow

`packages/cli` is responsible for:

- installing components
- installing dependencies
- patching shared resources
- detecting project environment

Rules:

- must be idempotent
- must not overwrite user changes silently
- must show conflicts clearly
- must support batch operations

---

## Styling and Naming

Use:

- `docs/STYLE.md`
- `docs/STYLEGUIDE.md`

Core conventions:

- PascalCase component folders and files
- colocated `.types.ts` and `.variants.ts`
- `nx-` prefix for semantic CSS classes
- Tailwind is the user-facing styling layer

---

## Build and Distribution

Use:

- `docs/DEPLOY.md`

Rules:

- `dist/` is the only published output
- token CSS is generated
- exports must be explicit
- sideEffects must be accurate (especially for CSS)

---

## Working State

Read:

- `.agent/CONTINUITY.md`

This is the canonical short-form state file.

Update it intentionally when state changes.

---

## Change workflow

For non-trivial refactors, edits, updates, or patches (multi-file changes, behavior changes, playground shell work, CLI/registry/template changes, or any task with an agreed plan):

1. **Branch** — create a feature branch off **`dev`** before code changes. Never commit directly to **`main`**.
2. **Implement** — complete planned code and test changes on that branch; use scoped commits per concern.
3. **Docs alignment** — update docs, cross-refs, README, rules, and `.agent/CONTINUITY.md` when behavior or maintainer contracts change. Link to canonical sections — do not duplicate.
4. **Verify** — run `pnpm check` and scoped checks ([docs/TESTING.md](./docs/TESTING.md), [docs/SCRIPTS.md](./docs/SCRIPTS.md)).
5. **PR last** — open the PR **to `dev` only** when the branch is complete. Do not target **`main`** unless the user explicitly requests it. No WIP PR unless the user asks.

**Branch policy:** `dev` is the integration branch (branch off `dev`, PR to `dev`). Do not touch **`main`** — no commits, merges, fast-forwards, or PRs targeting `main` — unless the user explicitly requests it. Do not infer `main` from GitHub default branch or `origin/HEAD`.

Trivial one-line fixes with no contract impact may skip the docs pass; still branch off `dev`.

---

## Task Guidance

When working in this repository:

- prefer small, reviewable diffs
- respect package boundaries
- do not introduce shortcuts that break architecture
- avoid hardcoded logic where metadata should be used
- do not expand public API unintentionally

When unsure:

prefer long-term architecture over short-term convenience
