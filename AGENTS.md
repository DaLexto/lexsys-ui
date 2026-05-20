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
missing preset-required theme modes, and invalid DTCG token leaf shape when
importing token JSON.

Target architecture violations that must become build-failing before the token
contract is considered stable include component-to-primitive references,
component-to-brand references, component-to-theme references,
semantic-to-component references, theme-to-component references, and brand tokens
with component-specific intent.

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

## Task Guidance

When working in this repository:

- prefer small, reviewable diffs
- respect package boundaries
- do not introduce shortcuts that break architecture
- avoid hardcoded logic where metadata should be used
- do not expand public API unintentionally

When unsure:

prefer long-term architecture over short-term convenience
