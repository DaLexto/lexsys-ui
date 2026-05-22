# Neurex Style Guide

**Audience:** Contributors and agents
**Type:** Contributor style guide
**Source of truth for:** Practical code patterns, component structure, naming, token authoring conventions, registry item shape, CSS variable naming
**Verified against:** `packages/ui/src/`, `packages/tokens/src/`, `packages/registry/src/`, `packages/cli/src/`

**Related docs:**

- `docs/STYLE.md` — concise rule checklist for all packages
- `docs/TOKENS.md` — token layer rules and validation contracts
- `docs/CLI.md` — CLI command reference and install behavior

If a rule conflicts between this document and `docs/STYLE.md`, `docs/STYLE.md` wins for rule decisions. This document provides practical patterns and examples.

---

## 1. Component File Structure

Every component in `packages/ui/src/components` uses a three-file split:

```
components/
  Button/
    Button.tsx          ← rendering, composition, React 19 ref prop
    Button.types.ts     ← public props, extended Base UI types, ref type
    Button.variants.ts  ← CVA variants and class composition
```

Do not collapse into a single file unless the component has no variants and no
meaningful type surface.

---

## 2. Component Implementation Patterns

### React 19 `ref` Prop and `displayName`

Components use the React 19 `ref` prop pattern. Declare the component locally,
set `displayName`, and export it from a single block at the bottom of the file:

```tsx
const Button = ({ ref, variant, size, className, ...props }: ButtonProps) => {
  // ...
}

Button.displayName = "Button"

export { Button }
```

Public prop types for ref-capable components should include a precise
`ref?: React.Ref<...>` type, not a broad `HTMLElement`, when the rendered
element is known (e.g. `HTMLSpanElement` for Badge, `HTMLDivElement` for
containers).

### `className` handling

Components that wrap Base UI primitives receive `className` as a Base UI state
function or plain string (`BaseComponent.Props["className"]`). Resolve it before
merging with variant classes:

```tsx
const buttonClassName: ButtonProps["className"] = (state) => {
  const userClassName =
    typeof className === "function" ? className(state) : className
  return cn(buttonVariants({ variant, size }), userClassName)
}
```

Components that render plain HTML elements accept `className` as a plain string
and merge it directly:

```tsx
<span className={cn(badgeVariants({ variant, tone, size }), className)} />
```

Use the Base UI state function pattern only for Base UI wrapper components. Use
the plain `cn()` merge pattern for HTML element wrappers.

### `cn()` utility

All class composition uses `cn`, which combines `clsx` and `tailwind-merge`:

```ts
import { cn } from "../../utils/cn"

cn(variantClasses, userClassName)
```

`cn` resolves Tailwind class conflicts correctly. Do not concatenate class
strings manually.

### CVA in `.variants.ts`

Define all visual variants using `cva` from `class-variance-authority`:

```ts
import { cva } from "class-variance-authority"

export const buttonVariants = cva("base classes here", {
  variants: {
    variant: { primary: "...", secondary: "..." },
    size: { xs: "...", sm: "...", md: "...", lg: "...", xl: "..." },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})
```

All variant classes in `.variants.ts` reference `--nx-*` CSS variables, not
hardcoded color or spacing values:

```ts
"bg-(--nx-button-primary-background) text-(--nx-button-primary-foreground)"
```

---

## 3. CSS Variable Naming

Generated CSS variable names follow this pattern:

```
--nx-{token-path-with-dots-as-dashes}
```

The `nx` prefix is defined in `generator.config.ts` (`cssVarPrefix`). Token path
segments are joined with `-`.

**Group name overrides** are applied during generation:

| Token group         | CSS name          |
| ------------------- | ----------------- |
| `spacing.*`         | `--nx-space-*`    |
| `motion.duration.*` | `--nx-duration-*` |
| `motion.easing.*`   | `--nx-easing-*`   |

All other groups use their source name unchanged.

**Examples:**

| Token path                  | CSS variable                     |
| --------------------------- | -------------------------------- |
| `button.primary.background` | `--nx-button-primary-background` |
| `button.radius`             | `--nx-button-radius`             |
| `button.focus.ringColor`    | `--nx-button-focus-ring-color`   |
| `spacing.control.x.sm`      | `--nx-space-control-x-sm`        |
| `motion.duration.control`   | `--nx-duration-control`          |
| `color.background.base`     | `--nx-color-background-base`     |

Do not invent CSS variable names by hand. They are generated outputs. Reference
them in components via Tailwind arbitrary value syntax:
`bg-(--nx-button-primary-background)`.

---

## 4. Naming Conventions

### Files and folders

| Context                                | Convention                 | Example                                      |
| -------------------------------------- | -------------------------- | -------------------------------------------- |
| UI component folder                    | PascalCase                 | `Button/`, `AlertDialog/`                    |
| UI component files                     | PascalCase                 | `Button.tsx`, `Button.types.ts`              |
| Token source files (same-role folder)  | kebab-case, no role suffix | `color.ts`, `spacing.ts`                     |
| Token source files (mixed-role folder) | role label prefix          | `resolver.types.ts`, `generator.create.ts`   |
| CLI modules                            | kebab-case                 | `registry-provider.ts`, `install-results.ts` |

### Symbols

| Symbol type          | Convention                                                    |
| -------------------- | ------------------------------------------------------------- |
| Component functions  | PascalCase (`Button`, `AlertDialog`)                          |
| Variant export       | camelCase + `Variants` suffix (`buttonVariants`)              |
| Registry item export | camelCase + `RegistryItem` suffix (`buttonRegistryItem`)      |
| Token group export   | camelCase + layer + `s` (`primitiveTokens`, `semanticTokens`) |
| CSS custom property  | `--nx-` prefix, kebab-case (`--nx-button-radius`)             |

### Component naming alignment

Keep component names consistent across all three locations:

```
packages/ui/src/components/Button/     ← source
packages/registry/src/items/button.ts  ← registry metadata (lowercase)
packages/registry/templates/components/Button/  ← install template
```

---

## 5. TypeScript Conventions

### Imports

Use `import type` for type-only symbols:

```ts
import type { ButtonProps } from "./Button.types"
import type { RegistryItem } from "../registry.types.js"
```

Use `node:` protocol for Node.js built-ins (in `cli` and `registry`):

```ts
import { readFile, writeFile } from "node:fs/promises"
import { join, dirname } from "node:path"
```

### Module resolution

| Package             | `moduleResolution` | Import extensions             |
| ------------------- | ------------------ | ----------------------------- |
| `packages/ui`       | `Bundler`          | No extension required         |
| `packages/tokens`   | `Bundler`          | No extension required         |
| `packages/cli`      | `NodeNext`         | `.js` on all relative imports |
| `packages/registry` | `NodeNext`         | `.js` on all relative imports |

In `cli` and `registry`, always include `.js` on relative imports even when
the source file is `.ts`:

```ts
import { fileExists } from "./fs.js"
import { getCwd } from "./context.js"
```

### Narrowing and unknowns

Narrow `unknown` data before using it. Prefer type guards with explicit return
types over type assertions:

```ts
const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
```

### Exports

Package public APIs are defined by `package.json` `exports` only. No deep
imports into another package's `src/` or `dist/`.

In component files, export from a single block at the bottom:

```ts
export { Button }
```

In `packages/ui/src/index.ts`, re-export component symbols and types explicitly:

```ts
export * from "./components/Button/Button"
export type * from "./components/Button/Button.types"
```

---

## 6. Registry Item Structure

Every item in `packages/registry/src/items/` declares the full install contract: files, dependencies, utilities, styles, target path, and category. The CLI reads this contract — if it needs knowledge not declared here, the item is incomplete.

Full field contract, category values, and validation rules: [docs/REGISTRY.md](REGISTRY.md).

---

## 7. Template Sync

Templates in `packages/registry/templates/components/` are synced from `packages/ui/src/components`. Do not manually edit them. Run `pnpm registry:sync` after editing UI components and `pnpm registry:check` to verify no drift.

The only transform the sync script applies is the `cn` import path rewrite. Any additional transform goes in the sync script, not the template file.

Full template rules and sync contract: [docs/REGISTRY.md](REGISTRY.md).

---

## 8. CLI Conventions

The CLI MUST remain metadata-driven. Install behavior comes from the registry,
not from hardcoded per-component branches.

The install flow is:

```
load config (neurex.config.json)
  → resolve registry items
    → collect files, dependencies, utilities, styles
      → check current project state (hash comparison)
        → apply idempotent install actions
          → report created / updated / skipped / conflicted
```

Rules:

- Install steps MUST be idempotent.
- MUST NOT overwrite user files silently — use conflict detection (hash comparison).
- Conflict detection compares file content hashes. Generated style files (with Neurex header) are updated without conflict.
- MUST show clear per-file status (created, updated, skipped, conflicted).
- MUST support batched dependency installation per package manager.

Avoid:

- Hardcoded per-component install branches
- Silent mutation of user project files
- Install behavior that depends on undeclared assumptions

---

## 9. Token Authoring Conventions

Detailed rules are in `docs/TOKENS.md`. This section covers practical authoring patterns.

### Token source file structure

Each layer has one file per logical group:

```
src/primitives/color.ts        ← raw color palette
src/brand/neurex.brand.ts      ← brand palette (references primitives)
src/semantics/action.ts        ← action state colors (references brand)
src/components/button.ts       ← button slot/property decisions (references semantics)
src/themes/neurex/light.ts     ← light mode overrides (references brand/primitives)
```

### Token group shape

All token groups export a typed object with a `name` or `component` key:

```ts
export const buttonComponentTokens: ComponentTokenGroup = {
  component: "button",
  // token tree...
}

export const spacingSemantics: SemanticTokenGroup = {
  name: "spacing",
  // token tree...
}
```

The `component` / `name` key is the namespace in the merged token tree.
It does not appear as a CSS variable segment.

### Token leaf shape

```ts
{ $value: "{action.primary.base}" }            // reference
{ $value: "oklch(0.6 0.2 30)", $type: "color" } // raw value with type
{ $value: "transparent" }                        // literal
```

Do not add `$type` to every leaf; set it on the branch when all children share
the same type:

```ts
primary: {
  $type: "color",
  background: { $value: "{action.primary.base}" },
  foreground: { $value: "{color.text.inverse}" },
}
```

### CSS variable output

Token source files do not use the `--nx-` prefix. The prefix is applied by the
generator. Do not write `--nx-` anywhere in `packages/tokens/src/`.

Generated CSS output paths:

```
dist/tokens.css                          ← base variables (:root)
dist/theme.css                           ← theme mode overrides ([data-theme])
dist/tokens/dtcg/tokens.tokens.json      ← full DTCG JSON
dist/tokens/dtcg/primitives/*.tokens.json
dist/tokens/dtcg/brand/*.tokens.json
dist/tokens/dtcg/semantics/*.tokens.json
dist/tokens/dtcg/components/*.tokens.json
dist/tokens/dtcg/themes/*.tokens.json
```

The DTCG JSON files are not currently a public package export. Do not reference
them as such until the package export contract is finalized.

---

## 10. Consumer Project Layout

The default consumer project paths (from `neurex.config.json` defaults) are:

| Config key       | Default path        | Contents                                        |
| ---------------- | ------------------- | ----------------------------------------------- |
| `componentsPath` | `src/components/ui` | Installed component files                       |
| `utilitiesPath`  | `src/lib`           | Shared utilities (e.g. `utils.ts`)              |
| `stylesPath`     | `styles`            | Installed CSS files (`tokens.css`, `theme.css`) |

Do not install component files outside these paths without explicit config
override. Do not duplicate shared utilities inside each component folder.

---

## 11. Package Boundary Rules

Each package exposes a public API through `package.json` `exports` only.

Good:

- `@neurex/registry` exports registry metadata
- CLI reads that metadata via `@neurex/registry`
- Templates are resolved via `@neurex/registry/templates/*`
- `@neurex/tokens` exports CSS files and source API

Bad:

- Importing from another package's `src/` or `dist/` directly
- CLI hardcoding component-specific logic that belongs in registry metadata
- Registry templates drifting from the UI source
- `packages/ui` driving CLI install behavior

---

## 12. Build and Check Commands

Run from the repo root:

```sh
pnpm build              # build all packages
pnpm typecheck          # typecheck all packages
pnpm lint               # lint all packages
pnpm test               # run all tests
pnpm format:check       # check formatting (Prettier)
pnpm check              # format:check + lint + typecheck + test
```

Per-package shortcuts:

```sh
pnpm tokens:build       # build @neurex/tokens (generates CSS + DTCG JSON)
pnpm ui:build           # build @neurex/ui
pnpm registry:build     # build @neurex/registry
pnpm cli:build          # build neurex CLI
pnpm registry:sync      # sync UI components → registry templates
pnpm registry:check     # verify templates are in sync
pnpm playground:dev     # start playground dev server
```

---

## 13. Review Checklist

Before merging, verify:

- [ ] Registry remains the install source of truth — no hardcoded CLI branches
- [ ] Install steps remain idempotent
- [ ] No silent overwrites of user files
- [ ] Package boundaries preserved — no deep imports across packages
- [ ] Public API surface unchanged or intentionally expanded
- [ ] Component naming aligned across `ui`, `registry`, and templates
- [ ] New component tokens reference semantics (not primitives or brand tokens directly) — enforced at build time via layer validation; run `pnpm tokens:check` after token edits
- [ ] New CSS classes use `--nx-*` variables, not hardcoded values
- [ ] Templates synced (`pnpm registry:sync` run if UI components changed)
- [ ] `pnpm check` passes (format + lint + typecheck + test)
