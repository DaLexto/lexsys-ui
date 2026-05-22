# Neurex UI

**Audience:** Maintainers, contributors, and agents
**Type:** Domain specification
**Source of truth for:** Component contract rules, file structure, Base UI boundaries, variant and token usage
**Verified against:** `packages/ui/src/`
**Related docs:** `docs/STYLEGUIDE.md` (practical patterns and examples), `docs/DESIGN_SYSTEM.md` (token system), `packages/ui/README.md` (package internals)

---

## What `packages/ui` Is

`packages/ui` is the reference implementation layer. It provides the canonical
source components that:

- define the correct component API, variants, and accessibility behavior
- are synced into registry templates when ready to be installed into consumer projects
- export a stable public API (`@neurex/ui`) for use in the playground

Components in this package are the source of truth. Registry templates MUST NOT
diverge from `packages/ui` source except for the `cn` import path rewrite applied
during `pnpm registry:sync`.

---

## Component File Structure

Every component MUST use a three-file split:

```
components/
  ComponentName/
    ComponentName.tsx          ← rendering, ref prop composition
    ComponentName.types.ts     ← public props, Base UI type extension, ref type
    ComponentName.variants.ts  ← CVA variants and class composition
```

Rules:

- Folder name and file names MUST be PascalCase.
- File naming MUST follow the `{ComponentName}.{role}.ts(x)` pattern exactly.
- All three files MUST be present even for simple components.
- Components MUST export from a single export block at the bottom of `.tsx`:
  ```ts
  Component.displayName = "Component"
  export { Component }
  ```

---

## React 19 Ref Contract

Components MUST use the React 19 `ref` prop pattern. Do not add new
`forwardRef` wrappers.

Public prop types for ref-capable components MUST include a precise
`ref?: React.Ref<...>` type for the actual rendered HTML element:

```tsx
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: React.Ref<HTMLSpanElement>
}

const Badge = ({ ref, ...props }: BadgeProps) => {
  return <span ref={ref} {...props} />
}
```

---

## Base UI Relationship

Base UI (`@base-ui/react`) provides headless accessibility primitives. It is an
internal implementation detail.

Rules:

- Base UI components MUST be imported directly (e.g. `@base-ui/react/button`).
- Base UI types MAY be re-exported in `.types.ts` when they form part of the
  public prop surface (e.g. extending `Button.Props`).
- Base UI types MUST NOT be exposed unintentionally through re-exports.
- Do not add Base UI to the public `@neurex/ui` API surface beyond the prop types that users need.

---

## `className` Contract

Components that wrap Base UI primitives MUST handle `className` as a Base UI
state function or plain string:

```tsx
const buttonClassName: ButtonProps["className"] = (state) => {
  const userClassName =
    typeof className === "function" ? className(state) : className
  return cn(buttonVariants({ variant, size }), userClassName)
}
```

Components that render plain HTML elements MAY merge `className` directly:

```tsx
<span className={cn(badgeVariants({ variant }), className)} />
```

---

## Variant Contract

Every component with visual options MUST define variants in `.variants.ts` using
`class-variance-authority`:

```ts
import { cva } from "class-variance-authority"

export const componentVariants = cva("base classes", {
  variants: { ... },
  defaultVariants: { ... },
})
```

All variant classes MUST reference `--nx-*` CSS custom properties via Tailwind
arbitrary value syntax, not hardcoded colors or spacing:

```ts
"bg-[var(--nx-button-primary-background)]" // correct
"bg-orange-500" // incorrect
```

---

## Prop Type Contract

`.types.ts` MUST define the public prop interface. Rules:

- Component prop interfaces SHOULD extend the relevant Base UI Props type.
- Custom props (e.g. `variant`, `size`, `isLoading`) MUST be added to the interface.
- `className` MUST be typed as `BaseComponent.Props["className"]` for Base UI wrappers,
  or as `string | undefined` for HTML element wrappers.

---

## Public API Rules

All public exports MUST go through `packages/ui/src/index.ts`:

```ts
export * from "./components/Button/Button"
export type * from "./components/Button/Button.types"
```

Rules:

- MUST NOT export Base UI internals directly.
- MUST NOT export `.variants.ts` from the package root (variant functions are
  internal to the component folder).
- Consumers MUST be able to use `import { Button } from "@neurex/ui"` and
  `import type { ButtonProps } from "@neurex/ui"`.

---

## Registry Sync Rules

After editing any component, run `pnpm registry:sync` and verify with `pnpm registry:check` before merging. Do not manually edit registry templates.

Full template sync contract (transform rules, drift validation, manual vs. generated distinction): [docs/REGISTRY.md](REGISTRY.md).

---

## Ownership Boundaries

| Concern                           | Owner                                     |
| --------------------------------- | ----------------------------------------- |
| Component API, behavior, variants | `packages/ui/src/components/`             |
| Install templates                 | `packages/registry/templates/components/` |
| Registry item metadata            | `packages/registry/src/items/`            |
| Token CSS variables               | `@neurex/tokens` (via build)              |
| CLI install logic                 | `packages/cli/src/`                       |

`packages/ui` MUST NOT contain:

- Registry metadata or install logic
- CLI configuration or detection logic
- Generated token CSS (use `@neurex/tokens` exports instead)
