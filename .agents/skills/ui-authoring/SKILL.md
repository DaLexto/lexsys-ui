---
name: ui-authoring
description: >
  Authoring workflow for packages/ui components — create, edit, or delete
  primitives, blocks, and templates; writing variant and render tests.
  Use when adding a new primitive or block, editing *.tsx / *.types.ts /
  *.variants.ts, writing *.variants.test.ts or *.render.test.tsx, running
  ui:check, registry:sync, ui:test, or debugging CVA / cva() / mergeClassName
  / testCssVarPrefix issues. Also covers the post-edit gate sequence.
---

# UI authoring

Covers creating, editing, deleting, and testing UI components in
`packages/ui/src/components/`.

Coding standards quick-reference: [`.cursor/rules/ui-components.mdc`](../../.cursor/rules/ui-components.mdc).  
Contracts: [UI.md](../../docs/reference/ui/UI.md), [UI_VARIANTS.md](../../docs/reference/ui/UI_VARIANTS.md), [UI_COMPOSITION.md](../../docs/reference/ui/UI_COMPOSITION.md).

---

## File contract

```txt
ComponentName/
├── ComponentName.tsx
├── ComponentName.types.ts
└── ComponentName.variants.ts
```

Layer folders: `primitives/`, `blocks/`, `templates/`.

---

## What's in this skill

| Detail file                    | Covers                                                                                          |
| ------------------------------ | ----------------------------------------------------------------------------------------------- |
| [component.md](./component.md) | Create / edit / delete procedure, primitive checklist, block/template checklist, post-edit gate |
| [tests.md](./tests.md)         | Test types, file locations, `testCssVarPrefix`, render + variant test patterns                  |

---

## Quick post-edit gate

**You run** (agent gives the numbered list and waits for your report):

```sh
pnpm ui:check
pnpm registry:sync
pnpm ui:test
pnpm format:check
```

Full procedure and handoff → [component.md § Post-edit gate](./component.md#post-edit-gate-user-runs-agent-plans).

---

## Related

- `$registry-sync`
- `$monorepo-check-gate`
- [docs/reference/ui/UI_AUDIT.md](../../docs/reference/ui/UI_AUDIT.md)
