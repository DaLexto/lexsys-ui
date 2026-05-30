# UI Variant Audit Inventory

**Audience:** Maintainers  
**Type:** Catalog / inventory  
**Source of truth for:** Per-primitive **variant / CVA compliance** status and batch assignment  
**Canonical standard:** [UI variants](../ui/UI_VARIANTS.md)  
**Related docs:** [UI catalog](../ui/UI_CATALOG.md) (compound vs leaf, named exports — **not** this doc), [UI reference](../ui/UI.md), [UI composition](../ui/UI_COMPOSITION.md)

**Scope:** CVA patterns, public variant props, token literals, and `.variants.ts` exports only. For installable composition (compound parts, registry item names), use **[UI catalog](../ui/UI_CATALOG.md)**.

Legend: ✅ pass · ⚠️ fix planned · ❌ fail

---

## Purpose and scope

This inventory tracks **styling and variant-axis compliance** against [UI variants](../ui/UI_VARIANTS.md). It does **not** define compound-first export rules (M11) — those live in [UI reference](../ui/UI.md) and [UI catalog](../ui/UI_CATALOG.md).

| Question                                                     | Read                                           |
| ------------------------------------------------------------ | ---------------------------------------------- |
| Compound or leaf? Named component exports? Registry version? | [UI catalog](../ui/UI_CATALOG.md)              |
| Variant props, CVA rules, token literals?                    | This doc + [UI variants](../ui/UI_VARIANTS.md) |
| Composition layers and install paths?                        | [UI composition](../ui/UI_COMPOSITION.md)      |

---

## Batch summary

| Batch   | Components                                                                                                   | Focus                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| **PR0** | (this doc)                                                                                                   | Inventory + standard                                                              |
| **PR1** | Button, Input, Textarea, NumberField, Toggle, ToggleGroup, Badge, Alert                                      | Variant API, danger tokens, opacity semantics, shared state helpers in `utils.ts` |
| **PR2** | Field, Fieldset, Form, Checkbox, RadioGroup, Select, Switch, Slider, Meter, Progress, Separator, Collapsible | Invalid attrs, opacity-60→50, CVA standard                                        |
| **PR3** | Dialog, Drawer, Popover, Menu, Tooltip, AlertDialog, Toast, Select (overlay slots)                           | Viewport tokens, z-index, compound `class:`                                       |
| **PR4** | Card, Avatar, Accordion, Tabs, ScrollArea                                                                    | Padding/typography tokens, audit automation, CHANGELOG                            |

---

## Variant inventory (41 primitives)

| Component       | Public props                                          | Styling pattern       | CVA / slot exports                                                                                      | Composition                                   | Token flags                                                                             | Tests             | Batch   |
| --------------- | ----------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------- | ------- |
| **Accordion**   | —                                                     | CVA slots             | `accordionVariants`, item, header, trigger, panel                                                       | [catalog](../ui/UI_CATALOG.md#inventory)      | `opacity-50`                                                                            | variants + render | PR4     |
| **Alert**       | `tone` → `variant`                                    | CVA prop              | `alertVariants`, title/description classNames                                                           | catalog                                       | `destructive` → `danger` tokens                                                         | variants + render | PR1     |
| **AlertDialog** | —                                                     | CVA slots             | 7 slot variants (trigger, backdrop, viewport, popup, title, description, close)                         | catalog                                       | `opacity-50`, `calc(100vw-2rem)`                                                        | variants + render | PR3     |
| **Avatar**      | `size`                                                | CVA prop              | `avatarVariants`, image, fallback                                                                       | catalog                                       | `leading-none`                                                                          | variants + render | PR4     |
| **Badge**       | `variant` + `appearance` (+ `success`, `warning`)     | CVA compound          | `badgeVariants`                                                                                         | catalog                                       | feedback tokens for success/warning                                                     | variants + render | PR1     |
| **Button**      | `variant`, `size`, `isLoading`                        | CVA prop              | `buttonVariants`                                                                                        | catalog                                       | ghost, outline, danger; `aria-busy` spinner                                             | variants + render | PR1     |
| **Card**        | `variant` (surface, muted, outlined, elevated, ghost) | CVA + slot classNames | `cardVariants`, 5 `*ClassName` exports                                                                  | catalog                                       | elevation shadow token for `elevated`                                                   | variants + render | PR4     |
| **Checkbox**    | `size` (root)                                         | CVA slots             | `checkboxVariants`, `checkboxIndicatorVariants` (+ orphaned `checkboxLabelVariants` — use `FieldLabel`) | [M11 compound](../ui/UI_CATALOG.md#inventory) | `opacity-50`                                                                            | variants + render | PR2     |
| **Collapsible** | `variant`                                             | CVA slots             | root, trigger, panel variants                                                                           | catalog                                       | `opacity-50`                                                                            | variants + render | PR2     |
| **Dialog**      | —                                                     | CVA slots             | 7 slot variants                                                                                         | catalog                                       | `opacity-50`, `calc(100vw-2rem)`                                                        | variants + render | PR3     |
| **Drawer**      | `size`                                                | CVA slots + compounds | 12 slot variants                                                                                        | [M11 compound](../ui/UI_CATALOG.md#inventory) | `opacity-50`, `z-30`, `className:` compounds, viewport calc                             | variants + render | PR3     |
| **Field**       | `variant`, `size`                                     | CVA slots             | 6 slot variants                                                                                         | catalog                                       | `opacity-50`, `opacity-60`, Input invalid attr gap                                      | variants + render | PR2     |
| **Fieldset**    | `variant`                                             | CVA slots             | `fieldsetVariants`, `fieldsetLegendVariants`                                                            | catalog                                       | `opacity-60`                                                                            | variants + render | PR2     |
| **Form**        | —                                                     | CVA root              | `formVariants`                                                                                          | catalog                                       | —                                                                                       | variants + render | PR2     |
| **Input**       | `variant`, `size`, `isInvalid`                        | CVA prop              | `inputVariants`                                                                                         | catalog                                       | ghost variant; `read-only:` token styling; `aria-invalid` via `isInvalid`               | variants + render | PR1     |
| **Menu**        | —                                                     | CVA slots             | 14 slot variants                                                                                        | [M11 compound](../ui/UI_CATALOG.md#inventory) | `opacity-50`                                                                            | variants + render | PR3     |
| **Meter**       | `size` (root + track)                                 | CVA slots             | 6 slot variants                                                                                         | catalog                                       | —                                                                                       | variants + render | PR2     |
| **NumberField** | `size` (group, input, buttons)                        | CVA slots             | 5 slot variants                                                                                         | catalog                                       | `opacity-60`, `opacity-50`                                                              | variants + render | PR1     |
| **Popover**     | —                                                     | CVA slots             | 10 slot variants                                                                                        | catalog                                       | `opacity-50`, `calc(100vw-2rem)`                                                        | variants + render | PR3     |
| **Progress**    | `size` on **`ProgressTrack`** (not root)              | CVA slots             | 5 slot variants (root, track, indicator, label, value)                                                  | [M11 compound](../ui/UI_CATALOG.md#inventory) | —                                                                                       | variants + render | PR2     |
| **RadioGroup**  | `size`                                                | CVA slots             | 4 slot variants                                                                                         | catalog                                       | `opacity-50`                                                                            | variants + render | PR2     |
| **ScrollArea**  | —                                                     | CVA slots             | 6 slot variants                                                                                         | catalog                                       | `bg-transparent` (whitelisted)                                                          | variants + render | PR4     |
| **Select**      | `size` (trigger)                                      | CVA slots             | 15 slot variants                                                                                        | catalog                                       | `opacity-50`, overlay calc in PR3                                                       | variants + render | PR2/PR3 |
| **Separator**   | `orientation`                                         | CVA prop              | `separatorVariants`                                                                                     | catalog                                       | —                                                                                       | variants + render | PR2     |
| **Slider**      | — (size on parts TBD)                                 | CVA slots             | 7 slot variants (root, control, track, indicator, thumb, label, value)                                  | [M11 compound](../ui/UI_CATALOG.md#inventory) | `opacity-50`                                                                            | variants + render | PR2     |
| **Switch**      | `size` (root)                                         | CVA slots             | `switchVariants`, `switchThumbVariants`                                                                 | [M11 compound](../ui/UI_CATALOG.md#inventory) | `opacity-50`                                                                            | variants + render | PR2     |
| **Tabs**        | —                                                     | CVA slots             | 4 slot variants                                                                                         | catalog                                       | `opacity-50`                                                                            | variants + render | PR4     |
| **Textarea**    | `variant`, `size`, `resize`                           | CVA prop              | `textareaVariants`                                                                                      | catalog                                       | `opacity-50`, has `data-[invalid]`                                                      | variants + render | PR1     |
| **Toast**       | `placement` (viewport)                                | **Data-attribute**    | 9 slot variants                                                                                         | catalog                                       | `opacity-50`, `destructive`→`danger` tokens, `calc(100vw-2rem)`, Base UI `type` mapping | variants + render | PR3     |
| **Toggle**      | **`size` only**                                       | CVA prop              | `toggleVariants`                                                                                        | catalog                                       | `opacity-50`, no variant axis (by design)                                               | variants + render | PR1     |
| **ToggleGroup** | **`size` only**                                       | CVA prop              | `toggleGroupVariants`                                                                                   | catalog                                       | inherits Toggle                                                                         | variants + render | PR1     |
| **Tooltip**     | —                                                     | CVA slots             | 4 slot variants                                                                                         | catalog                                       | —                                                                                       | variants + render | PR3     |

**Shipped PR #30 (variant rows pending):** Autocomplete, CheckboxGroup, Combobox, ContextMenu, Menubar, NavigationMenu, OtpField, PreviewCard, Toolbar — composition in [UI catalog](../ui/UI_CATALOG.md).

**Blocks and templates (compound-only):** FormField, SettingsPanel, Sidebar, AuthForm, CommandPalette @ `0.0.2`; Empty @ `0.0.1`; DashboardShell @ `0.0.2` — variant audit rows not tracked here; render tests in `packages/ui/test/`.

---

## Cross-cutting issues

| Issue                            | Affected                                    | Fix                                                                 |
| -------------------------------- | ------------------------------------------- | ------------------------------------------------------------------- |
| `tone` public prop               | Alert, Badge                                | PR1 → `variant` / `appearance`                                      |
| `destructive` token/API naming   | Alert, Badge, Button, Toast                 | PR1–PR3 → `danger`                                                  |
| `disabled:opacity-50` literal    | ~15 components                              | PR1–PR4 → `disabledStateClasses` in `utils.ts` + `opacity.disabled` |
| `opacity-60` literal             | Field, Fieldset, NumberField                | PR1–PR2 → unify to 50% token                                        |
| `aria-busy:opacity-80`           | Button                                      | PR1 → `opacity.busy`                                                |
| `calc(100vw-2rem)` raw           | Dialog, AlertDialog, Popover, Toast, Drawer | PR3 → viewport tokens                                               |
| `z-30` literal                   | Drawer handle                               | PR3 → component token                                               |
| `pt-0` literal                   | Card content/footer                         | PR4 → semantic padding                                              |
| `leading-none` literal           | Badge, Avatar                               | PR4 → typography token                                              |
| `className:` in compounds        | Drawer                                      | PR3 → `class:`                                                      |
| `cn()` on Base UI stateful parts | Checkbox indicator, RadioGroup indicator    | Fixed — use `mergeClassName`                                        |
| Missing SaaS variants            | Button, Badge, Card                         | Fixed — ghost/outline/success/warning/elevated                      |
| Helper type exports              | Variant/size axes                           | Fixed — exported from `.types.ts`                                   |
| Registry `tone` drift            | Alert/Badge templates                       | PR1 `pnpm registry:sync`                                            |
| Orphaned `checkboxLabelVariants` | Checkbox `.variants.ts`                     | Remove or wire — labels use `FieldLabel` post-M11                   |

---

## Generation and drift checks

Variant literal scan (blocking in `pnpm ui:check`):

```bash
pnpm ui:audit
```

Composition / export inventory drift:

```bash
pnpm ui:audit:catalog:check
```

See [UI catalog § Generation and drift checks](../ui/UI_CATALOG.md#generation-and-drift-checks).

---

## PR0 checklist extras

- [x] Toggle documented as size-only (no variant axis)
- [x] Toast documented as data-attribute pattern with Base UI type mapping
- [x] Full CVA export audit column above
- [x] M11 compound exports cross-linked to UI_CATALOG (Checkbox, Progress, Switch, Slider, Drawer, Menu)
- [ ] `public-api.test.ts` — three-file shape enforced (existing)
- [ ] Registry `tone` drift noted for PR1 sync

---

## Resolution tracking

**Variant pass:** Resolved — PR #24 + overlay token sweep on `dev` (2026-05-22).

- Unified `variant` / `appearance` API; `danger` vocabulary; semantic opacity tokens
- Shared state helpers in installed `utils.ts`; viewport inset tokens for overlays
- Overlay semantics (`size.overlay.*`, `spacing.overlay.sideOffset`, `elevation.behind.*`)
- **`pnpm ui:audit` blocking** in `pnpm ui:check`; audited primitive variants token-compliant (41 shipped; 9 PR #30 modules pending variant table rows)

**Composition pass (M11):** Shipped on `dev` — export and registry inventory in [UI catalog](../ui/UI_CATALOG.md). This doc’s primitive rows were refreshed for M11-touched variant axes only; blocks/templates are out of scope.

Run `pnpm ui:audit` after variant edits. Run `pnpm ui:audit:catalog:check` after export or registry item metadata changes.

---

## Related docs

- [UI catalog](../ui/UI_CATALOG.md) — installable inventory (canonical for compound vs leaf)
- [UI variants](../ui/UI_VARIANTS.md) — variant contract this audit enforces
- [Doc index](./INDEX.md) — documentation routing
