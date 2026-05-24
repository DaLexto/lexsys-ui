# Lexsys Style Rules

**Audience:** Contributors and agents
**Type:** Contributor style guide
**Source of truth for:** Coding rules and conventions across all packages
**Related docs:** `docs/contributors/STYLEGUIDE.md` (practical patterns and examples), `docs/ARCHITECTURE.md` (package boundaries)

If there is a conflict between this document and `docs/ARCHITECTURE.md`, architecture wins.
For examples and practical patterns, see `docs/contributors/STYLEGUIDE.md`.

---

## Core Principles

- Prefer small, reviewable diffs.
- Preserve package boundaries.
- Write code that supports registry-first distribution.
- Prefer explicit behavior over hidden magic.
- Favor idempotent workflows over shortcut logic.

---

## TypeScript

- Use ESM imports/exports only.
- Use `import type` for type-only symbols.
- Enable strict mode. Avoid `any`.
- Narrow `unknown` data before using it.
- Let errors propagate unless there is explicit recovery logic.
- Use the `node:` protocol for Node.js built-ins in `packages/cli` and `packages/registry`:
  ```ts
  import { readFile } from "node:fs/promises"
  import { join } from "node:path"
  ```
- Module resolution differs by package:
  - `packages/ui`, `packages/tokens` — `Bundler`: no extension required on relative imports.
  - `packages/cli`, `packages/registry` — `NodeNext`: `.js` extension required on all relative imports.

---

## React Components

- Keep reference components in `packages/ui/src/components`.
- Every component MUST use the three-file split:
  ```
  ComponentName.tsx       ← rendering, ref prop composition
  ComponentName.types.ts  ← public props
  ComponentName.variants.ts ← CVA variants
  ```
- Components MUST use the React 19 `ref` prop pattern. Do not introduce new
  `forwardRef` wrappers.
- Public prop types for ref-capable components MUST include a precise
  `ref?: React.Ref<...>` type for the actual rendered element.
- Set `displayName` on every component.
- Declare the component locally; export from a single block at the bottom of the file.
- Preserve accessibility behavior when wrapping Base UI primitives.
- Treat Base UI as an internal implementation detail — do not expose it through the public API.

---

## Styling

- Tailwind v4 is the user-facing styling layer.
- Define all visual variants with `cva` from `class-variance-authority` in `.variants.ts`.
- Canonical variant contract: [UI_VARIANTS.md](../reference/ui/UI_VARIANTS.md). Per-component audit: [UI_AUDIT.md](../reference/ui/UI_AUDIT.md).
- Use `cn()` (clsx + tailwind-merge) for all class composition. Do not concatenate strings manually.
- Variant classes MUST reference `--lsys-*` CSS custom properties, not hardcoded Tailwind palette values:
  ```ts
  "bg-(--lsys-button-primary-background)" // correct — Tailwind v4 canonical CSS var syntax
  "bg-orange-500" // incorrect
  ```
- Do not duplicate shared styling helpers across components.
- Do not handwrite `--lsys-*` variables in component files — they are generated output.

---

## Tokens

- Token source files use DTCG-shaped `$value` leaves. Do not use legacy `value` leaves.
- Primitives hold raw values only — no references.
- Components reference semantics only.
- Do not write `--lsys-*` prefixes in token source files — the prefix is applied by the generator.
- Full token layer rules: `docs/reference/tokens/TOKENS.md`.

---

## Registry and CLI

- Registry metadata is the source of truth for install behavior.
- Do not hardcode component-specific install branches in the CLI.
- CLI installs MUST be idempotent.
- MUST NOT overwrite user files silently.
- Report clear created / updated / skipped / conflicted states.
- Shared resources belong in the shared layer, not inside each component folder.

---

## Naming

- PascalCase for component folders and files (`Button/`, `Button.tsx`).
- `camelCase` for variables and function names.
- Use clear, domain-specific names over abbreviations.
- Keep component naming aligned across `ui`, `registry`, and templates.
- In `packages/tokens`: use folder context alone in same-role folders (e.g. `primitives/color.ts`); use role labels in mixed-purpose folders (e.g. `resolver.types.ts`, `generator.create.ts`).

---

## Comments

- Add comments only when they explain intent, constraints, or non-obvious behavior.
- Do not narrate obvious code.

---

## Imports and Exports

- Public APIs are defined only via `package.json` `exports`.
- Do not deep-import into another package's `src/` or `dist/`.
- Keep package entrypoints small and intentional.
- Component file exports: explicit, grouped at the bottom of the file.

---

## Testing and Verification

Run `pnpm check` before merging. Full script reference: [docs/operations/SCRIPTS.md](../operations/SCRIPTS.md).

For the full test command reference, per-package scripts, and when to run targeted vs full checks: `docs/operations/TESTING.md`.
