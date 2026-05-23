# UI Component Audit Inventory

**Audience:** Maintainers  
**Type:** Audit / inventory  
**Source of truth for:** Per-component compliance status and batch assignment  
**Canonical standard:** [UI_VARIANTS.md](./UI_VARIANTS.md)  
**Status:** Active — rows updated as batch PRs land

Legend: ✅ pass · ⚠️ fix planned · ❌ fail

---

## Summary

| Batch | Components | Focus |
|-------|------------|-------|
| **PR0** | (this doc) | Inventory + standard |
| **PR1** | Button, Input, Textarea, NumberField, Toggle, ToggleGroup, Badge, Alert | Variant API, danger tokens, opacity semantics, variant-states |
| **PR2** | Field, Fieldset, Form, Checkbox, RadioGroup, Select, Switch, Slider, Meter, Progress, Separator, Collapsible | Invalid attrs, opacity-60→50, CVA standard |
| **PR3** | Dialog, Drawer, Popover, Menu, Tooltip, AlertDialog, Toast, Select (overlay slots) | Viewport tokens, z-index, compound `class:` |
| **PR4** | Card, Avatar, Accordion, Tabs, ScrollArea | Padding/typography tokens, audit automation, CHANGELOG |

---

## Inventory (32 components)

| Component | Public props | Styling pattern | Slot exports | Token flags | Tests | Batch |
|-----------|--------------|-----------------|--------------|-------------|-------|-------|
| **Accordion** | — | CVA slots | `accordionVariants`, `accordionItemVariants`, `accordionHeaderVariants`, `accordionTriggerVariants`, `accordionPanelVariants` | `opacity-50` | variants + render | PR4 |
| **Alert** | `tone` → `variant` | CVA prop | `alertVariants`, `alertTitleClassName`, `alertDescriptionClassName` | `destructive` → `danger` tokens | variants + render | PR1 |
| **AlertDialog** | — | CVA slots | 7 slot variants (trigger, backdrop, viewport, popup, title, description, close) | `opacity-50`, `calc(100vw-2rem)` | variants + render | PR3 |
| **Avatar** | `size` | CVA prop | `avatarVariants`, `avatarImageVariants`, `avatarFallbackVariants` | `leading-none` | variants + render | PR4 |
| **Badge** | `tone`+`variant` → `variant`+`appearance` | CVA compound | `badgeVariants` | `destructive`→`danger`, `leading-none`, compound matrix | variants + render | PR1 |
| **Button** | `variant`, `size` (+ `danger`) | CVA prop | `buttonVariants` | `opacity-50`, `opacity-80` busy, no danger variant yet | variants + render | PR1 |
| **Card** | `variant` | CVA + slot classNames | `cardVariants`, 5 `*ClassName` exports | `pt-0` padding hack | variants + render | PR4 |
| **Checkbox** | `size` | CVA slots | `checkboxVariants`, `checkboxLabelVariants` | `opacity-50` | variants + render | PR2 |
| **Collapsible** | `variant` | CVA slots | `collapsibleVariants`, `collapsibleTriggerVariants`, `collapsiblePanelVariants` | `opacity-50` | variants + render | PR2 |
| **Dialog** | — | CVA slots | 7 slot variants | `opacity-50`, `calc(100vw-2rem)` | variants + render | PR3 |
| **Drawer** | `size` | CVA slots + compounds | 12 slot variants | `opacity-50`, `z-30`, `className:` compounds, viewport calc | variants + render | PR3 |
| **Field** | `variant`, `size` | CVA slots | 6 slot variants | `opacity-50`, `opacity-60`, Input invalid attr gap | variants + render | PR2 |
| **Fieldset** | `variant` | CVA slots | `fieldsetVariants`, `fieldsetLegendVariants` | `opacity-60` | variants + render | PR2 |
| **Form** | — | CVA root | `formVariants` | — | variants + render | PR2 |
| **Input** | `variant`, `size` | CVA prop | `inputVariants` | `opacity-50`, `aria-invalid` only (no `data-[invalid]`) | variants + render | PR1 |
| **Menu** | — | CVA slots | 14 slot variants | `opacity-50` | variants + render | PR3 |
| **Meter** | `size` (root + track) | CVA slots | 6 slot variants | — | variants + render | PR2 |
| **NumberField** | `size` (group, input, buttons) | CVA slots | 5 slot variants | `opacity-60`, `opacity-50` | variants + render | PR1 |
| **Popover** | — | CVA slots | 10 slot variants | `opacity-50`, `calc(100vw-2rem)` | variants + render | PR3 |
| **Progress** | `size` | CVA slots | 3 slot variants | — | variants + render | PR2 |
| **RadioGroup** | `size` | CVA slots | 4 slot variants | `opacity-50` | variants + render | PR2 |
| **ScrollArea** | — | CVA slots | 6 slot variants | `bg-transparent` (whitelisted) | variants + render | PR4 |
| **Select** | `size` (trigger) | CVA slots | 15 slot variants | `opacity-50`, overlay calc in PR3 | variants + render | PR2/PR3 |
| **Separator** | `orientation` | CVA prop | `separatorVariants` | — | variants + render | PR2 |
| **Slider** | — | CVA slots | 5 slot variants | `opacity-50` | variants + render | PR2 |
| **Switch** | `size` | CVA slots | `switchVariants`, `switchThumbVariants` | `opacity-50` | variants + render | PR2 |
| **Tabs** | — | CVA slots | 4 slot variants | `opacity-50` | variants + render | PR4 |
| **Textarea** | `variant`, `size`, `resize` | CVA prop | `textareaVariants` | `opacity-50`, has `data-[invalid]` | variants + render | PR1 |
| **Toast** | `placement` (viewport) | **Data-attribute** | 9 slot variants | `opacity-50`, `destructive`→`danger` tokens, `calc(100vw-2rem)`, Base UI `type` mapping | variants + render | PR3 |
| **Toggle** | **`size` only** | CVA prop | `toggleVariants` | `opacity-50`, no variant axis (by design) | variants + render | PR1 |
| **ToggleGroup** | **`size` only** | CVA prop | `toggleGroupVariants` | inherits Toggle | variants + render | PR1 |
| **Tooltip** | — | CVA slots | 4 slot variants | — | variants + render | PR3 |

---

## Cross-cutting issues

| Issue | Affected | Fix |
|-------|----------|-----|
| `tone` public prop | Alert, Badge | PR1 → `variant` / `appearance` |
| `destructive` token/API naming | Alert, Badge, Button, Toast | PR1–PR3 → `danger` |
| `disabled:opacity-50` literal | ~15 components | PR1–PR4 → `variant-states.ts` + `opacity.disabled` |
| `opacity-60` literal | Field, Fieldset, NumberField | PR1–PR2 → unify to 50% token |
| `aria-busy:opacity-80` | Button | PR1 → `opacity.busy` |
| `calc(100vw-2rem)` raw | Dialog, AlertDialog, Popover, Toast, Drawer | PR3 → viewport tokens |
| `z-30` literal | Drawer handle | PR3 → component token |
| `pt-0` literal | Card content/footer | PR4 → semantic padding |
| `leading-none` literal | Badge, Avatar | PR4 → typography token |
| `className:` in compounds | Drawer | PR3 → `class:` |
| Input vs Textarea invalid attrs | Input missing `data-[invalid]` | PR2 unify |
| Registry `tone` drift | Alert/Badge templates | PR1 `pnpm registry:sync` |

---

## PR0 checklist extras

- [x] Toggle documented as size-only (no variant axis)
- [x] Toast documented as data-attribute pattern with Base UI type mapping
- [x] Full slot export audit column above
- [ ] `public-api.test.ts` — three-file shape enforced (existing)
- [ ] Registry `tone` drift noted for PR1 sync

---

## Resolution tracking

**Status:** Resolved in `feat/ui-package-polish` (2026-05-22).

- Unified `variant` / `appearance` API; `danger` vocabulary; semantic opacity tokens
- `variant-states.ts` shared helpers; viewport inset tokens for overlays
- `pnpm ui:audit` automation; [CHANGELOG.md](../packages/ui/CHANGELOG.md) breaking notes

Run `pnpm ui:audit` after future variant edits to catch literal drift.
