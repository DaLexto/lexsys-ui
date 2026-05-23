# @neurex/ui

**Audience:** Maintainers, contributors, and agents
**Type:** Package README
**Source of truth for:** Package role, component list, file structure, public exports
**Verified against:** `packages/ui/src/`

---

## Package Role

`packages/ui` is the reference implementation layer for Neurex components.

This package owns:

- source component implementations
- public component and prop type exports
- shared internal utilities (`cn`)
- the reference API that registry templates are synced from

This package does not own:

- what gets installed into consumer projects (owned by `@neurex/registry`)
- CLI install behavior (owned by `packages/cli`)
- design token source or generated CSS (owned by `@neurex/tokens`)
- registry item metadata (owned by `@neurex/registry`)

Components in this package are the source of truth for component behavior,
variants, and types. Registry templates are synced copies — they are not
independent implementations.

---

## Components (31)

| Component     | Category     |
| ------------- | ------------ |
| `Accordion`   | surfaces     |
| `Alert`       | feedback     |
| `AlertDialog` | overlays     |
| `Avatar`      | data-display |
| `Badge`       | data-display |
| `Button`      | actions      |
| `Card`        | surfaces     |
| `Checkbox`    | forms        |
| `Collapsible` | surfaces     |
| `Dialog`      | overlays     |
| `Drawer`      | overlays     |
| `Field`       | forms        |
| `Fieldset`    | forms        |
| `Form`        | forms        |
| `Input`       | forms        |
| `Menu`        | navigation   |
| `Meter`       | feedback     |
| `NumberField` | forms        |
| `Popover`     | overlays     |
| `Progress`    | feedback     |
| `RadioGroup`  | forms        |
| `Select`      | forms        |
| `Separator`   | layout       |
| `Slider`      | forms        |
| `Switch`      | forms        |
| `Tabs`        | navigation   |
| `Textarea`    | forms        |
| `Toast`       | feedback     |
| `Toggle`      | actions      |
| `ToggleGroup` | actions      |
| `Tooltip`     | overlays     |

---

## File Structure per Component

```
components/
  Button/
    Button.tsx          ← rendering, ref-as-prop, composition
    Button.types.ts     ← public props, Base UI type extensions
    Button.variants.ts  ← CVA variants and class composition
```

---

## Public API

All component symbols and their prop types are re-exported from `src/index.ts`:

```ts
import { Button } from "@neurex/ui"
import type { ButtonProps } from "@neurex/ui"
```

Do not import directly from `@neurex/ui/src/` or `@neurex/ui/dist/`.

---

## Key Dependencies

| Package                    | Role                                            |
| -------------------------- | ----------------------------------------------- |
| `@base-ui/react`           | Headless primitive components (internal only)   |
| `class-variance-authority` | CVA variant composition in `.variants.ts` files |
| `clsx` + `tailwind-merge`  | Class merge utility (`cn`)                      |

Base UI is an internal implementation detail. Do not expose Base UI types or
components through the public API unless they are part of the intended prop
surface.

---

## Styling

Component styles use:

- Tailwind v4 utility classes for layout and states
- `--nx-*` CSS custom properties for token-driven values (color, spacing, radius, typography)
- `cn()` from `src/utils/cn.ts` for class merging

Do not hardcode color, spacing, or radius values in component files. Reference
the appropriate `--nx-{component}-{property}` variable.

---

## Tests

Component variant tests live in `test/components/<Name>/`.
Public API surface test lives in `test/public-api.test.ts`.

```sh
pnpm --filter @neurex/ui test
pnpm --filter @neurex/ui typecheck
```

---

## Development

```sh
pnpm ui:check
pnpm ui:build
```

After editing component files, run `pnpm registry:sync` then `pnpm registry:check`.
Monorepo scripts: [docs/SCRIPTS.md](../../docs/SCRIPTS.md).
