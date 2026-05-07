# Neurex Style Guide

## Purpose

This guide shows how repository rules should look in practice.

Use it for day-to-day implementation decisions in:

- `packages/ui`
- `packages/registry`
- `packages/cli`
- `packages/tokens`

---

## 1. Component Structure

Reference components in `packages/ui` should follow this layout:

```txt
components/
  Button/
    Button.tsx
    Button.types.ts
    Button.variants.ts
```

Use this split consistently:

- `Component.tsx` for rendering and composition
- `Component.types.ts` for public props and related types
- `Component.variants.ts` for visual variants and class composition

Do not collapse these files into one large component file unless the component is truly trivial.

---

## 2. Component API Shape

Prefer APIs like:

```tsx
<Button variant="primary" size="md" />
<Button className="w-full" />
```

Rules:

- variants provide the default design-system surface
- `className` remains available for local escape hatches
- props should feel React-native where possible
- user-facing APIs should not expose internal implementation details

---

## 3. UI Package Conventions

`packages/ui` is the reference implementation layer.

Use it for:

- source component implementations
- internal utilities used by those implementations
- public exports that define the reference API

In `Component.tsx`, define component symbols locally and export them from a
single block at the bottom of the file:

```tsx
const Button = forwardRef<HTMLElement, ButtonProps>(...)

Button.displayName = "Button"

export { Button }
```

This keeps implementation flow readable while making the public surface explicit.

Avoid using it for:

- CLI install logic
- registry metadata
- generated token CSS output

---

## 4. Registry Item Conventions

Each installable item should describe the full install contract.

A good registry item includes:

- canonical name
- aliases
- file list
- runtime dependencies
- registry dependencies
- shared utilities
- required styles
- target install path

Registry items should answer the question:

```txt
What does the CLI need to install this safely and completely?
```

If the CLI needs extra hardcoded knowledge, the registry item is probably incomplete.

---

## 5. Template Conventions

Installable templates live under `packages/registry/templates`.

Guidelines:

- keep template paths stable
- mirror the intended consumer output shape
- keep shared utilities under `templates/shared`
- avoid hidden setup assumptions inside template files

Component templates are synced from `packages/ui/src/components` with
`pnpm registry:sync`. The sync transform should stay minimal: registry templates
may adapt consumer import paths such as `cn`, while component API, variants, and
structure should remain owned by `packages/ui`. Component export style should
therefore match the UI source and keep public component exports grouped at the
bottom of each template file.

Registry checks verify that templates stay synced with the UI source.
Any template-only transform must exist in the sync script, not as a manual edit
inside `packages/registry/templates/components`.

Registry item metadata stays manually authored because it is the install
contract for category, aliases, dependencies, styles, utilities, and targets.

If a component depends on shared helpers, registry metadata should declare them explicitly.

---

## 6. CLI Conventions

`packages/cli` should stay metadata-driven.

Prefer logic like:

```txt
load config
resolve registry items
collect dependencies/utilities/styles
check project state
apply idempotent install actions
report results
```

Prefer:

- deterministic install steps
- conflict reporting over overwriting
- batched dependency handling
- reusable helpers for repeated install actions

Avoid:

- hardcoded per-component branches
- silent mutation of user files
- install behavior that depends on undeclared assumptions

---

## 7. Tokens Conventions

`packages/tokens` should remain layered:

```txt
primitives -> semantics -> components -> themes
```

Guidelines:

- primitives store raw values only
- semantics give those values meaning
- component tokens map semantics to component-level decisions
- themes change values, not system structure

Generated CSS belongs to the token pipeline, not to handwritten component styles.

---

## 8. Shared Layer Conventions

Default shared output in consumer projects is:

```txt
src/lib/
styles/
```

Use the shared layer for:

- `cn`-style utilities
- token/theme CSS
- future shared helpers required by multiple components

Do not duplicate these resources inside every installed component folder.

---

## 9. Package Boundary Examples

Good:

- `@neurex/registry` exports metadata
- CLI reads that metadata
- templates are copied into the user project

Bad:

- UI package secretly driving CLI behavior
- CLI importing deep internals from another package
- registry templates diverging from registry metadata

---

## 10. Review Checklist

Before merging, ask:

- Does this keep the registry as the install source of truth?
- Does this preserve idempotent install behavior?
- Does this avoid silent overwrites?
- Does this respect package boundaries?
- Does this keep the public surface explicit?
- Does this match the current component/template naming conventions?
