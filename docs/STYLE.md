# Neurex Style Rules

## Purpose

This file defines coding style rules for the `neurex` repository.

Use this together with:

- `docs/ARCHITECTURE.md`
- `docs/STYLEGUIDE.md`

If there is a conflict, architecture wins over style convenience.

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
- Prefer `type` imports for type-only symbols.
- Avoid `any`.
- Narrow unknown data before using it.
- Let errors propagate unless there is explicit recovery logic.
- Prefer small helpers over deeply nested inline logic.

---

## React Components

- Keep reference components in `packages/ui/src/components`.
- Use the standard component file split:

```txt
ComponentName.tsx
ComponentName.types.ts
ComponentName.variants.ts
```

- Support variants and `className` overrides.
- Keep component APIs simple by default.
- Preserve accessibility behavior when adding interactivity.
- Treat Base UI as an internal implementation detail.
- In `ComponentName.tsx`, keep component declarations local and export the
  public component symbols from a single export block at the bottom of the file.

---

## Registry and CLI

- Registry metadata is the source of truth for install behavior.
- Do not hardcode component-specific install branches in the CLI.
- CLI output must be safe and idempotent.
- Never overwrite user files silently.
- Report clear created/skipped/conflict states.
- Shared resources belong in the shared layer, not inside each component.

---

## Naming

- Use PascalCase for component folders and component files.
- Use `camelCase` for variables and function names.
- Use clear, domain-specific names over abbreviations.
- Keep canonical component naming aligned across `ui`, `registry`, and templates.
- Let folder context carry repeated file meaning when every file in the folder is the same kind, for example `primitives/color.ts`, `semantics/color.ts`, and `themes/neurex/light.ts`.
- Keep role suffixes in mixed folders where files have different jobs, for example `resolver.types.ts`, `resolver.utils.ts`, `generator.types.ts`, and component `.types.ts` / `.variants.ts` files.

---

## Comments

- Add comments only when they explain intent or constraints.
- Do not narrate obvious code.
- Prefer comments for architecture rules, install safety, or non-obvious behavior.

---

## Imports and Exports

- Keep public APIs explicit through package `exports`.
- Keep component file exports explicit and grouped at the bottom of the file.
- Do not rely on deep imports into another package's `src` or `dist`.
- Keep entrypoints small and intentional.

---

## Styling

- Tailwind is the user-facing styling layer.
- Use variants for consistent visual choices.
- Use shared utilities for class composition.
- Do not duplicate shared styling helpers across components.
- Token-driven styling should remain compatible with generated CSS variables.

---

## Testing and Verification

After meaningful changes, run what exists when possible:

- `pnpm build`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`

If a script is only a placeholder, say so explicitly in review notes or handoff.
