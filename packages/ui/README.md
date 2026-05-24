# @lexsys/ui

**Audience:** Maintainers, contributors, and agents
**Type:** Package README
**Source of truth for:** Package role, component list, file structure, public exports
**Verified against:** `packages/ui/src/`

---

## Package Role

`packages/ui` is the reference implementation layer for Lexsys components.

This package owns:

- source component implementations
- public component and prop type exports
- shared internal utilities (`cn`)
- the reference API that registry templates are synced from

This package does not own:

- what gets installed into consumer projects (owned by `@lexsys/registry`)
- CLI install behavior (owned by `packages/cli`)
- design token source or generated CSS (owned by `@lexsys/tokens`)
- registry item metadata (owned by `@lexsys/registry`)

Components in this package are the source of truth for component behavior,
variants, and types. Registry templates are synced copies — they are not
independent implementations.

---

## Components (41)

| Component        | Category     |
| ---------------- | ------------ |
| `Accordion`      | surfaces     |
| `Alert`          | feedback     |
| `AlertDialog`    | overlays     |
| `Autocomplete`   | forms        |
| `Avatar`         | data-display |
| `Badge`          | data-display |
| `Button`         | actions      |
| `Card`           | surfaces     |
| `Checkbox`       | forms        |
| `CheckboxGroup`  | forms        |
| `Collapsible`    | surfaces     |
| `Combobox`       | forms        |
| `ContextMenu`    | navigation   |
| `Dialog`         | overlays     |
| `Drawer`         | overlays     |
| `Field`          | forms        |
| `Fieldset`       | forms        |
| `Form`           | forms        |
| `Input`          | forms        |
| `Menu`           | navigation   |
| `Menubar`        | navigation   |
| `Meter`          | feedback     |
| `NavigationMenu` | navigation   |
| `NumberField`    | forms        |
| `OtpField`       | forms        |
| `Popover`        | overlays     |
| `PreviewCard`    | overlays     |
| `Progress`       | feedback     |
| `RadioGroup`     | forms        |
| `ScrollArea`     | layout       |
| `Select`         | forms        |
| `Separator`      | layout       |
| `Slider`         | forms        |
| `Switch`         | forms        |
| `Tabs`           | navigation   |
| `Textarea`       | forms        |
| `Toast`          | feedback     |
| `Toggle`         | actions      |
| `ToggleGroup`    | actions      |
| `Toolbar`        | navigation   |
| `Tooltip`        | overlays     |

---

## Breaking changes (pre-0.1.0)

See [CHANGELOG.md](./CHANGELOG.md). Canonical variant rules: [docs/UI_VARIANTS.md](../../docs/UI_VARIANTS.md).

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
import { Button } from "@lexsys/ui"
import type { ButtonProps } from "@lexsys/ui"
```

Do not import directly from `@lexsys/ui/src/` or `@lexsys/ui/dist/`.

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
- `--lsys-*` CSS custom properties for token-driven values (color, spacing, radius, typography)
- `cn()` from `src/utils/cn.ts` for class merging

Do not hardcode color, spacing, or radius values in component files. Reference
the appropriate `--lsys-{component}-{property}` variable.

---

## Tests

Component variant tests live in `test/components/<Name>/`.
Public API surface test lives in `test/public-api.test.ts`.

```sh
pnpm --filter @lexsys/ui test
pnpm --filter @lexsys/ui audit
pnpm --filter @lexsys/ui typecheck
```

---

## Development

```sh
pnpm ui:check
pnpm ui:audit
pnpm ui:build
```

After editing component files, run `pnpm registry:sync` then `pnpm registry:check`.
Monorepo scripts: [docs/SCRIPTS.md](../../docs/SCRIPTS.md).
