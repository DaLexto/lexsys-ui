---
name: ui-component-change
description: >
  Workflow for editing Neurex UI primitives, blocks, or templates — ui:check,
  ui:audit, registry sync, variant tokens. Use when changing packages/ui
  components, CVA variants, or Base UI wrappers.
---

# UI component change

Reference layer: `packages/ui/src/components/{primitives,blocks,templates}/`.

Contracts: [docs/UI.md](../../docs/UI.md), [docs/UI_VARIANTS.md](../../docs/UI_VARIANTS.md), [docs/UI_COMPOSITION.md](../../docs/UI_COMPOSITION.md).

## File contract

```txt
ComponentName/
├── ComponentName.tsx
├── ComponentName.types.ts
└── ComponentName.variants.ts
```

## Procedure

1. Edit under the correct layer folder (`primitives/`, `blocks/`, `templates/`).
2. Preserve accessibility; Base UI stays internal.
3. Variants use `--nx-*` tokens — no raw Tailwind palette in `*.variants.ts`.
4. Run:

```sh
pnpm ui:check
```

Includes `ui:audit` — scans variant files for forbidden literals.

5. If install artifacts should update:

```sh
pnpm registry:sync
pnpm registry:check
```

6. Blocks/templates: run **`$consumer-sandbox-verify`** (playground does not cover mobile composition).

## New primitive checklist

- UI three-file folder under `primitives/`
- Export from `packages/ui/src/index.ts`
- Registry item in `packages/registry/src/items/`
- `pnpm registry:sync` + `registry-item-generator` if category metadata needed
- Variant + render tests under `packages/ui/test/components/<Name>/`

## Related

- `$registry-sync`
- `$monorepo-check-gate`
- [docs/UI_AUDIT.md](../../docs/UI_AUDIT.md)
