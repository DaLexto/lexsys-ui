# Lexsys UI

**Audience:** Maintainers, contributors, and agents
**Type:** Domain specification
**Source of truth for:** Component contract rules, file structure, Base UI boundaries, variant and token usage
**Verified against:** `packages/ui/src/`
**Related docs:** [UI_COMPOSITION.md](../ui/UI_COMPOSITION.md) (install layers),
[UI_CATALOG.md](../ui/UI_CATALOG.md) (full installable inventory),
[UI_VARIANTS.md](../ui/UI_VARIANTS.md), [UI_AUDIT.md](../ui/UI_AUDIT.md),
[REGISTRY.md](../registry/REGISTRY.md), `docs/contributors/STYLEGUIDE.md` (practical patterns),
`docs/reference/tokens/DESIGN_SYSTEM.md` (token system), `packages/ui/README.md` (package internals)

---

## What `packages/ui` Is

`packages/ui` is the reference implementation layer. It provides the canonical
source components that:

- define the correct component API, variants, and accessibility behavior
- are synced into registry templates when ready to be installed into consumer projects
- export a stable public API (`@dalexto/lexsys-ui`) for use in the playground (**41 primitives** today)

Monorepo source is organized in three composition layers under
`packages/ui/src/components/` — `primitives/`, `blocks/`, `templates/`. See
[UI_COMPOSITION.md](../ui/UI_COMPOSITION.md). Consumer projects receive a **flat**
install under `paths.components` regardless of layer; the CLI rewrites
cross-layer imports at install time.

Components in this package are the source of truth. Registry templates MUST NOT
diverge from `packages/ui` source except for the `cn` import path rewrite applied
during `pnpm registry:sync`.

---

## Component File Structure

Every component MUST use a three-file split. In the monorepo, place folders under
the correct layer directory:

```txt
packages/ui/src/components/
  primitives/ComponentName/     ← 41 bundled primitives
  blocks/ComponentName/         ← pilot: FormField, SettingsPanel, Sidebar, AuthForm, CommandPalette
  templates/ComponentName/      ← pilot: DashboardShell
```

```txt
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

**Principle:** Base UI owns **behavior** (a11y, keyboard navigation, focus
management, state machines, ARIA roles). Lexsys owns **everything else**
(token-backed styling, CVA variants, TypeScript DX, sensible defaults).

Rules:

- Base UI components MUST be imported directly (e.g. `@base-ui/react/button`).
- Lexsys MUST NOT reimplement behavior Base UI already provides.
- Lexsys MUST NOT override Base UI a11y or interaction semantics.
- Base UI types MAY be re-exported in `.types.ts` when they form part of the
  public prop surface (e.g. extending `Button.Props`).
- Base UI types MUST NOT be exposed unintentionally through re-exports.
- Do not add Base UI to the public `@dalexto/lexsys-ui` API surface beyond the prop types that users need.

### Wrapper checklist

Every primitive wrapper MUST satisfy:

| Check         | Base UI wrapper                                  | Lexsys-only HTML                   |
| ------------- | ------------------------------------------------ | ---------------------------------- |
| `className`   | `mergeClassName(base, className)`                | `cn(base, className)`              |
| Prop `Omit`   | Only keys Lexsys replaces (e.g. `size`)          | Standard HTML attrs pass through   |
| Helper types  | Export `ComponentVariant`, `ComponentSize`, etc. | Export variant unions when present |
| Defaults      | Sensible `defaultVariants` in CVA                | Same                               |
| `displayName` | Root + every compound sub-part                   | Same                               |

### Compound vs leaf decision tree

| Condition                            | Export style                                   | Examples                                                             |
| ------------------------------------ | ---------------------------------------------- | -------------------------------------------------------------------- |
| Base UI exposes sub-parts            | Flat named sibling exports for every part      | `Dialog`, `DialogTrigger`, `Field`, `FieldLabel`                     |
| Lexsys layout primitive (no Base UI) | Same flat compound pattern                     | `Card`, `CardHeader`, `Alert`, `AlertTitle`                          |
| Single DOM node, no slots            | Leaf export OK                                 | `Button`, `Input`, `Badge`, `Separator`, `Form`, `Toggle`, `Menubar` |
| Block / template                     | 2+ named parts; compose primitives/blocks only | `Sidebar`, `SidebarContent`, `AuthForm`, `AuthFormHeader`            |

**Naming:** `ComponentName` = root; `ComponentNamePart` = sub-part. Do not use
Base UI dot notation (`Dialog.Trigger`) in consumer imports.

**Intentional leaves (documented):** `Button`, `Input`, `Badge`, `Separator`,
`Form`, `Toggle`, `ToggleGroup`, `CheckboxGroup`, `Menubar` (composes Menu
parts), `Textarea` (Field.Control render pattern). Full inventory with export
lists: [UI_CATALOG.md](../ui/UI_CATALOG.md).

See [UI_COMPOSITION.md § Compound-first contract](../ui/UI_COMPOSITION.md#compound-first-contract).

---

## `className` Contract

Components that wrap Base UI primitives MUST use `mergeClassName` so consumers
can pass `className` as a Base UI state function or plain string:

```tsx
className={mergeClassName(buttonVariants({ variant, size }), className)}
```

Components that render plain HTML elements MAY merge `className` directly:

```tsx
<span className={cn(badgeVariants({ variant }), className)} />
```

---

## Variant Contract

Canonical standard: [UI_VARIANTS.md](../ui/UI_VARIANTS.md). Audit inventory: [UI_AUDIT.md](../ui/UI_AUDIT.md).

Every component with visual options MUST define variants in `.variants.ts` using
`class-variance-authority`:

```ts
import { cva } from "class-variance-authority"

export const componentVariants = cva("base classes", {
  variants: { ... },
  defaultVariants: { ... },
})
```

All variant classes MUST reference `--lex-*` CSS custom properties via Tailwind
v4 canonical CSS variable syntax, not hardcoded colors or spacing:

```ts
"bg-(--lex-button-primary-background)" // correct
"ring-(length:--lex-button-focus-ring-width)" // correct — token-backed focus ring
"bg-orange-500" // incorrect
```

Do not use the legacy `[var(--lex-*)]` form or CSS variable alias utilities
such as `(--lex-a:--lex-b)` — Tailwind v4 does not emit CSS for that pattern.
Use direct component token utilities instead (see `Badge.variants.ts`).

---

## Prop Type Contract

`.types.ts` MUST define the public prop interface. Rules:

- Component prop interfaces SHOULD extend the relevant Base UI Props type.
- Custom props (e.g. `variant`, `size`, `isLoading`) MUST be added to the interface.
- Export helper types for variant axes (e.g. `ButtonVariant`, `InputSize`) from
  `.types.ts` for consumer DX.
- `className` MUST be typed as `BaseComponent.Props["className"]` for Base UI wrappers,
  or as `string | undefined` for HTML element wrappers.

---

## Public API Rules

All public exports MUST go through `packages/ui/src/index.ts`. Today the package
root exports **primitives only** (playground smoke). Pilot blocks and templates
are registry + CLI installable but not yet part of the `@dalexto/lexsys-ui` public export
surface:

```ts
export * from "./components/primitives/Button/Button"
export type * from "./components/primitives/Button/Button.types"
```

Rules:

- MUST NOT export Base UI internals directly.
- MUST NOT export `.variants.ts` from the package root (variant functions are
  internal to the component folder).
- Consumers MUST be able to use `import { Button } from "@dalexto/lexsys-ui"` and
  `import type { ButtonProps } from "@dalexto/lexsys-ui"`.

---

## Registry Sync Rules

After editing any component, run `pnpm registry:sync` (primitives + blocks) and
verify with `pnpm registry:check` before merging. Do not manually edit registry
templates.

Full template sync contract (transform rules, drift validation, manual vs. generated distinction): [docs/reference/registry/REGISTRY.md](REGISTRY.md).

---

## Ownership Boundaries

| Concern                           | Owner                                                        |
| --------------------------------- | ------------------------------------------------------------ |
| Component API, behavior, variants | `packages/ui/src/components/{primitives,blocks,templates}/`  |
| Install templates                 | `packages/registry/templates/{primitives,blocks,templates}/` |
| Registry item metadata            | `packages/registry/src/items/`                               |
| Token CSS variables               | `@dalexto/lexsys-tokens` (via build)                         |
| CLI install logic                 | `packages/cli/src/`                                          |

`packages/ui` MUST NOT contain:

- Registry metadata or install logic
- CLI configuration or detection logic
- Generated token CSS (use `@dalexto/lexsys-tokens` exports instead)
