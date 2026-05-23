# UI Variant Styling Standard

**Audience:** Maintainers, contributors, and agents  
**Type:** Domain specification  
**Source of truth for:** Public variant prop contract, CVA implementation rules, styling pattern taxonomy  
**Verified against:** `packages/ui/src/components/`  
**Related docs:** [UI.md](./UI.md), [UI_AUDIT.md](./UI_AUDIT.md), [STYLEGUIDE.md](./STYLEGUIDE.md), [STYLE.md](./STYLE.md), [TOKENS.md](./TOKENS.md)

---

## Purpose

Pre-0.1.0 contract for all 32 reference components. Breaking API changes are acceptable
now to establish a stable long-term surface before publish.

---

## Public prop axes

| Prop | Purpose | Used by |
|------|---------|---------|
| **`variant`** | Semantic visual intent (color/role or chrome mode) | Components with color or chrome options |
| **`size`** | Control scale | Interactive and compact display components |
| **`appearance`** | Fill style when color × fill is two-dimensional | **Badge only** (`solid` \| `outline`) |

**Rule:** No public prop named `tone` after PR1.

---

## Vocabulary taxonomy

| Term | Meaning | Example |
|------|---------|---------|
| **`danger`** | Semantic color variant | `variant="danger"` on Alert, Badge, Button |
| **`invalid`** | Control state via attributes | `aria-invalid`, `data-[invalid]` — not a variant enum |
| **`error`** | Form message slot only | `Field.Error`, `field.error.*` tokens — not a color variant |

Do **not** introduce a public `error` variant. It duplicates `danger` with no visual distinction.

---

## Breaking renames (PR1)

| Component | Before | After |
|-----------|--------|-------|
| **Alert** | `tone?: neutral \| primary \| destructive` | `variant?: neutral \| primary \| danger` |
| **Badge** | `tone` + `variant` (solid/outline) | `variant?: neutral \| primary \| danger` + `appearance?: solid \| outline` |
| **Button** | `variant?: primary \| secondary` | add **`danger`** |

Token branches rename `*.destructive.*` → `*.danger.*` with aligned `--nx-*-danger-*` CSS vars.
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

- Base UI sets `data-type` from toast manager API (`success`, `destructive`, …)
- Neurex tokens use `danger` naming (`--nx-toast-danger-border-color`)
- CSS keeps `data-[type=destructive]:…` because Base UI owns the string
- Document the mapping in component inventory; do not rename Base UI's `type` values

Other examples: `data-[swiping]`, `data-[behind]`, `data-[invalid]`, `aria-busy`.

---

## CVA implementation rules

1. **Base classes** — string array joined; structural Tailwind only (`inline-flex`, `grid`, `outline-none`, `disabled:pointer-events-none`).
2. **Visual values** — always `--nx-*` via Tailwind v4 typed syntax (`text-(length:--nx-*)`, `font-(family-name:--nx-*)`, `ring-(length:--nx-*)`).
3. **Color variants** — extracted constants or direct variant entries; avoid empty stubs + compound matrix when constants suffice.
4. **`compoundVariants`** — use **`class:`** key consistently (not `className:`).
5. **Compound components** — export slot strings as `{slot}ClassName` or `{slot}Variants` (Card, Alert, Field patterns).
6. **Shared states** — import from `packages/ui/src/utils/variant-states.ts`: disabled, busy, invalid fragments backed by semantic opacity tokens.
7. **Allowed literals whitelist** — explicit exceptions only (`border-transparent`, `bg-transparent`, `min-w-0`, `truncate`). Viewport/layout math must use **component tokens**, not raw `calc(100vw-2rem)` (PR3).
8. **Data-attribute styling** — pattern 3 above; library state wins over invented props.

---

## Variant vocabulary by category

| Category | `variant` values | `size` | Notes |
|----------|------------------|--------|-------|
| **Actions** | Button: `primary`, `secondary`, `danger`; Input/Textarea/Field: `default`, `ghost` | sm–lg (+ Button xs, xl) | |
| **Feedback** | Alert: `neutral`, `primary`, `danger` | — | |
| **Display** | Badge: `neutral`, `primary`, `danger` + `appearance` | sm, md | |
| **Surfaces** | Card, Fieldset, Collapsible: `surface`, `muted` / `plain` | — | per-component enums |
| **Overlays** | slot-level tokens; placement/size on Drawer | per-component | Toast: data-attribute |
| **Controls** | Toggle, ToggleGroup: **size only** | sm, md, lg | no variant axis |

Per-component allowed enums live in [UI_AUDIT.md](./UI_AUDIT.md). Force **consistent prop names and CVA structure**, not identical values across unrelated components.

---

## Token consumption

| Layer | Rule | Enforcement |
|-------|------|-------------|
| **Authoring** | Component tokens reference semantics only | `pnpm tokens:check` |
| **Consumption** | `*.variants.ts` uses `--nx-*`; minimal raw literals | Variant tests, `pnpm ui:audit` (PR4) |

Shared semantic tokens (PR1+):

- `opacity.disabled` → 50% (`{opacity.50}`)
- `opacity.busy` → 80% (`{opacity.80}`)
- `action.danger` — unchanged semantic source for danger variants

---

## Verification

- `pnpm ui:check` — variant + render tests per batch
- `pnpm registry:check` — templates synced after component edits
- `pnpm tokens:check` — token layer + CSS generation
- Consumer smoke via sandbox when registry templates or public props change ([TESTING.md § Verification surfaces](./TESTING.md#verification-surfaces))

Do not start dev servers from agent sessions ([AGENTS.md § Agent operations](../AGENTS.md#agent-operations)).
