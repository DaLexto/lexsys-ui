# UI Variant Styling Standard

**Audience:** Maintainers, contributors, and agents  
**Type:** Domain specification  
**Source of truth for:** Public variant prop contract, CVA implementation rules, styling pattern taxonomy  
**Verified against:** `packages/ui/src/components/`  
**Last reviewed:** 2026-05-30

---

## On this page

- [Purpose](#purpose)
- [Public prop axes](#public-prop-axes)
- [Vocabulary taxonomy](#vocabulary-taxonomy)
- [Breaking renames (PR1)](#breaking-renames-pr1)
- [Styling patterns](#styling-patterns)
  - [1. CVA prop axis](#1-cva-prop-axis)
  - [2. CVA secondary axis](#2-cva-secondary-axis)
  - [3. Data-attribute driven](#3-data-attribute-driven)
- [CVA implementation rules](#cva-implementation-rules)
- [Variant vocabulary by category](#variant-vocabulary-by-category)
- [Token consumption](#token-consumption)
  - [Token-only styling](#token-only-styling)
  - [Recommended Select / Menu composition](#recommended-select-menu-composition)
- [Verification](#verification)

## Purpose

Pre-0.1.0 contract for all 41 reference primitives. Breaking API changes are acceptable
now to establish a stable long-term surface before publish.

---

## Public prop axes

| Prop             | Purpose                                            | Used by                                    |
| ---------------- | -------------------------------------------------- | ------------------------------------------ |
| **`variant`**    | Semantic visual intent (color/role or chrome mode) | Components with color or chrome options    |
| **`size`**       | Control scale                                      | Interactive and compact display components |
| **`appearance`** | Fill style when color × fill is two-dimensional    | **Badge only** (`solid` \| `outline`)      |

**Rule:** No public prop named `tone` after PR1.

---

## Vocabulary taxonomy

| Term          | Meaning                      | Example                                                     |
| ------------- | ---------------------------- | ----------------------------------------------------------- |
| **`danger`**  | Semantic color variant       | `variant="danger"` on Alert, Badge, Button                  |
| **`invalid`** | Control state via attributes | `aria-invalid`, `data-[invalid]` — not a variant enum       |
| **`error`**   | Form message slot only       | `Field.Error`, `field.error.*` tokens — not a color variant |

Do **not** introduce a public `error` variant. It duplicates `danger` with no visual distinction.

---

## Breaking renames (PR1)

| Component  | Before                                     | After                                                                                            |
| ---------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| **Alert**  | `tone?: neutral \| primary \| destructive` | `variant?: neutral \| primary \| danger`                                                         |
| **Badge**  | `tone` + `variant` (solid/outline)         | `variant?: neutral \| primary \| success \| warning \| danger` + `appearance?: solid \| outline` |
| **Button** | `variant?: primary \| secondary`           | add **`danger`**, **`ghost`**, **`outline`**; `isLoading` spinner via `aria-busy`                |

Token branches rename `*.destructive.*` → `*.danger.*` with aligned `--lex-*-danger-*` CSS vars.
Semantic source remains **`action.danger`**.

---

## Styling patterns

Three approved patterns. Pick one per component axis; do not mix parallel props for the same concern.

### 1. CVA prop axis

Standard `variant` / `size` / `appearance` props mapped through `cva()`.

```ts
export const alertVariants = cva(base, {
  variants: {
    variant: {
      neutral: neutralClasses,
      primary: primaryClasses,
      danger: dangerClasses,
    },
  },
})
```

Prefer **extracted constants** (Alert pattern) over empty stub variants + large `compoundVariants` matrices (Badge anti-pattern before PR1).

### 2. CVA secondary axis

Same as pattern 1 with additional non-color axes (`placement`, `orientation`, `side`).

Toggle and ToggleGroup expose **`size` only** — no `variant` axis (documented exception).

### 3. Data-attribute driven

When the underlying library owns state, style via attribute selectors. Do **not** add a parallel `variant` prop.

**Toast** is the reference:

- Base UI sets `data-type` from toast manager API
- Supported `toastManager.add({ type })` values: **`success`**, **`info`**, **`destructive`** (default / omitted = neutral surface)
- Lexsys tokens use `danger` naming (`--lex-toast-danger-*`) while Base UI keeps `destructive`
- Typed toasts apply full semantic **background + foreground + border** via `data-[type=*]` selectors (not border-only)
- Do not add a parallel public `variant` prop on Toast

Other examples: `data-[swiping]`, `data-[behind]`, `data-[invalid]`, `aria-busy`.

**Menu** horizontal flyouts (`side` = `left`, `right`, `inline-start`, `inline-end`): `MenuPositioner` defaults to popup-style collision avoidance (`fallbackAxisSide: "end"`) so sidebar flyouts flip instead of clipping off-screen. Pass `collisionAvoidance` to override.

**Drawer** `DrawerClose`: default `appearance="icon"` (absolute corner dismiss control). Use `appearance="inline"` when composing list rows or custom triggers inside drawer content — e.g. Sidebar mobile nav links — so close controls are not forced to the popup corner.

---

## CVA implementation rules

1. **Base classes** — string array joined; structural Tailwind only (`inline-flex`, `grid`, `outline-none`, `disabled:pointer-events-none`).
2. **Visual values** — always `--lex-*` via Tailwind v4 typed syntax (`text-(length:--lex-*)`, `font-(family-name:--lex-*)`, `ring-(length:--lex-*)`).
3. **Color variants** — extracted constants or direct variant entries; avoid empty stubs + compound matrix when constants suffice.
4. **`compoundVariants`** — use **`class:`** key consistently (not `className:`).
5. **Compound components** — export slot strings as `{slot}ClassName` or `{slot}Variants` (Card, Alert, Field patterns).
6. **Shared states** — import `disabledStateClasses`, `busyStateClasses`, and `invalidStateClasses` from `@/lib/utils` (installed `utils.ts`); reference package uses `packages/ui/src/utils/cn.ts`.
7. **Allowed literals whitelist** — explicit exceptions only (`border-transparent`, `bg-transparent`, `min-w-0`, `truncate`). Viewport/layout math must use **component tokens**, not raw `calc(100vw-2rem)` (PR3).
8. **Data-attribute styling** — pattern 3 above; library state wins over invented props.

---

## Variant vocabulary by category

| Category     | `variant` values                                                                                                 | `size`                  | Notes                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------- |
| **Actions**  | Button: `primary`, `secondary`, `ghost`, `outline`, `danger`; Input/Textarea/Field: `default`, `ghost`           | sm–lg (+ Button xs, xl) | `isLoading` on Button |
| **Feedback** | Alert: `neutral`, `primary`, `danger`                                                                            | —                       |                       |
| **Display**  | Badge: `neutral`, `primary`, `success`, `warning`, `danger` + `appearance`                                       | sm, md                  |                       |
| **Surfaces** | Card: `surface`, `muted`, `default`, `outlined`, `elevated`, `ghost`; Fieldset, Collapsible: `surface` / `plain` | —                       | per-component enums   |
| **Overlays** | slot-level tokens; placement/size on Drawer                                                                      | per-component           | Toast: data-attribute |
| **Controls** | Toggle, ToggleGroup: **size only**                                                                               | sm, md, lg              | no variant axis       |

Per-component allowed enums live in [UI audit](../ui/UI_AUDIT.md). Force **consistent prop names and CVA structure**, not identical values across unrelated components.

---

## Token consumption

| Layer           | Rule                                                 | Enforcement                                     |
| --------------- | ---------------------------------------------------- | ----------------------------------------------- |
| **Authoring**   | Component tokens reference semantics only            | `pnpm tokens:check`                             |
| **Consumption** | `*.variants.ts` uses `--lex-*`; minimal raw literals | Variant tests, `pnpm ui:audit` (blocking in CI) |

Shared semantic tokens (PR1+):

- `opacity.disabled` → 50% (`{opacity.50}`)
- `opacity.busy` → 80% (`{opacity.80}`)
- `action.danger` — unchanged semantic source for danger variants

Overlay semantics (shared scroll/stacking roles):

- `size.overlay.list.maxHeight` — scrollable Select list + Menu viewport
- `size.overlay.viewport.maxHeight` — full dynamic viewport height (`100dvh`)
- `spacing.overlay.sideOffset` — default floating gap (maps to `spacing.2` / 8px at 16px root)
- `elevation.behind.zIndex` / `elevation.handle.zIndex` — decorative behind-layer and local handle stacking

### Token-only styling

`*.variants.ts` must use generated `--lex-*` classes for color, size, spacing, motion, opacity, and z-index. **`pnpm ui:audit` is blocking** in `pnpm ui:check`.

**Allowed non-`--lex-*` forms in CVA strings:**

| Form                   | Why                                                                            |
| ---------------------- | ------------------------------------------------------------------------------ |
| Structural Tailwind    | `inline-flex`, `grid`, `outline-none`, `truncate`, `overflow-hidden`           |
| Base UI runtime vars   | `--anchor-width`, `--available-width`, `--transform-origin`, drawer swipe vars |
| Base UI owned attrs    | `data-[type=destructive]`, `data-[starting-style]`, `aria-invalid`             |
| Fractional anchor math | `translate-x-1/2`, `translate-y-1/2` on arrow slots (center on anchor edge)    |
| Generated `--lex-*`    | All color, size, spacing, motion, opacity, z-index, viewport math              |

Use `disabledStateClasses`, `busyStateClasses`, and `invalidStateClasses` from `@/lib/utils` (installed) or `../../utils/cn` (reference UI) instead of inline disabled opacity fragments.

### Recommended Select / Menu composition

For scrollable lists, compose portal → positioner → popup → list (Select) or viewport (Menu). Scroll arrows are optional but recommended when lists may overflow:

```tsx
<SelectPortal>
  <SelectPositioner>
    <SelectPopup>
      <SelectScrollUpArrow />
      <SelectList>{/* items */}</SelectList>
      <SelectScrollDownArrow />
    </SelectPopup>
  </SelectPositioner>
</SelectPortal>
```

`SelectPositioner`, `MenuPositioner`, `PopoverPositioner`, and `TooltipPositioner` default `sideOffset` to the overlay semantic token (`8` px at 16px root). Override only when design requires a different gap.

---

## Verification

- `pnpm ui:check` — variant + render tests per batch
- `pnpm registry:check` — templates synced after component edits
- `pnpm tokens:check` — token layer + CSS generation
- Consumer smoke via sandbox when registry templates or public props change ([Testing docs § Verification surfaces](../operations/TESTING.md#verification-surfaces))

Do not start dev servers from agent sessions ([AGENTS.md § Agent operations](../../../AGENTS.md#agent-operations)).

---

## Related documentation

- [UI reference](UI.md) — component contract
- [UI audit](UI_AUDIT.md) — variant compliance inventory
- [Tokens reference](../tokens/TOKENS.md) — token layers
