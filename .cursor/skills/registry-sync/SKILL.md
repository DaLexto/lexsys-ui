---
name: registry-sync
description: >
  Sync packages/ui into registry templates and reconciled src/items after
  primitive, block, or template edits. Use for pnpm registry:sync, registry
  templates stale, registryDependencies review, lexsys add metadata, or
  UI+registry commit split. Procedures in procedures.md; pnpm via
  $monorepo-verify-gate.
---

# Registry sync

Canonical contract: [docs/reference/registry/REGISTRY.md](../../docs/reference/registry/REGISTRY.md).

**Verify commands:** do not list `pnpm` steps here — use **[`$monorepo-verify-gate`](../monorepo-verify-gate/SKILL.md)** scenarios **`ui-registry`**, **`registry-meta`**, or **`tokens-styles-registry`**. Agent plans; **you run**; reply **`verify passed`** or paste errors.

## When to use

- Any change under `packages/ui/src/components/{primitives,blocks,templates}/`
- Before a `registry`-scoped commit that ships template or item updates
- After install-affecting variant/CSS class changes in `*.variants.ts`

## When not to use

- Token-only edits with no UI/registry template impact → **`$token-verify`**
- Commit / PR → **`$git-commit`**
- Writing or editing TSX/CVA/tests → **`$components-authoring`**

## Two-zone summary

```txt
packages/registry/
├── src/items/<name>.ts   ← generated/reconciled on registry:sync
└── templates/            ← GENERATED — never edit directly
```

**Do not:** hand-edit `templates/**`; rely on hand-edits to `files` / `registryDependencies` in `src/items/` (reconcile overwrites them except `aliases` / `category`).

## Procedure router

| Intent                                  | Section                                                          |
| --------------------------------------- | ---------------------------------------------------------------- |
| Which verify scenario after your change | [§ Verify scenarios](./procedures.md#verify-scenarios)           |
| Review sync diff                        | [§ Post-sync diff review](./procedures.md#post-sync-diff-review) |
| New block or template                   | [§ New block](./procedures.md#new-block)                         |
| Delete component                        | [§ Delete flow](./procedures.md#delete-flow)                     |
| Script pipeline / automation            | [§ Scripts pipeline](./procedures.md#scripts-pipeline)           |
| Commit split                            | [§ Commit split](./procedures.md#commit-split)                   |

## Related

- [procedures.md](./procedures.md)
- [`$components-authoring`](../components-authoring/SKILL.md)
- [`$monorepo-verify-gate`](../monorepo-verify-gate/SKILL.md)
- [`$agent-workflow`](../agent-workflow/SKILL.md)
- [docs/operations/SCRIPTS.md](../../docs/operations/SCRIPTS.md) — sync workflow table
