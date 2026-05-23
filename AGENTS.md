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

## Real-world consumer sandbox

Outside this monorepo, a **100% CLI-installed consumer project** is used for integration testing:

|          | Monorepo `apps/playground`                        | Consumer sandbox                                   |
| -------- | ------------------------------------------------- | -------------------------------------------------- |
| Model    | Workspace `@neurex/ui` + package CSS              | `neurex add` → user-owned `src/components/ui/`     |
| CSS      | Workspace token build                             | Installed `styles/tokens.css` + `styles/theme.css` |
| Best for | Reference exports, component panels, turbo checks | Install/update flow, real layouts, theme/brand UX  |

**Local path:** `D:\PLAYGROUND\sandbox-neurex`  
**Agent contract:** `D:\PLAYGROUND\sandbox-neurex\AGENTS.md`

Use the sandbox when validating **consumer behavior** (CLI, conflicts, `update --styles`, dashboard-style apps).  
Use `apps/playground` when validating **reference package wiring** inside the monorepo.

After monorepo changes to UI, registry, tokens, or CLI, verify in the sandbox when the task affects what users install — not only in playground.

Maintainer checklist (see [docs/TESTING.md](./docs/TESTING.md) § Consumer sandbox verification):

- **Vite regression:** `neurex add` → `update --styles` → build in existing sandbox.
- **Next.js smoke:** fresh dir → `neurex init next` → `neurex add button` → build.

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

## Consumer sandbox

After CLI or registry changes, verify against an external consumer project outside
the monorepo when possible. Checklist: [docs/TESTING.md](./docs/TESTING.md) §
Consumer sandbox verification.

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
