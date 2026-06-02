---
name: registry-sync
description: >
  Sync packages/ui source into registry templates after primitive, block, or
  template edits. Use when changing packages/ui, running pnpm registry:sync,
  registry templates stale, or UI+registry multi-commit workflow.
---

# Registry sync

Use this skill after editing reference components in `packages/ui` when install
templates and item metadata should match UI source.

## When to use

- Any change under `packages/ui/src/components/{primitives,blocks,templates}/`
- Before a `registry`-scoped commit that ships template or item updates
- After variant/token class changes in `*.variants.ts` that affect installed CSS classes

## Registry two-zone contract

```txt
packages/registry/
├── src/items/<name>.ts   ← install metadata (generated/reconciled on sync)
└── templates/            ← GENERATED OUTPUT — never edit directly
    ├── primitives/       ← copied from packages/ui/src/components/primitives/
    ├── blocks/           ← copied from packages/ui/src/components/blocks/
    └── templates/        ← copied from packages/ui/src/components/templates/
```

**`src/items/` on `pnpm registry:sync` (all layers):**

| Layer              | Templates      | Items                                                                                 |
| ------------------ | -------------- | ------------------------------------------------------------------------------------- |
| Primitives         | Copied from UI | Reconciled; scaffolds if missing                                                      |
| Blocks / templates | Copied from UI | Reconciled; scaffolds if missing; `registryDependencies` inferred from `.tsx` imports |

**Reconcile preserves:** `aliases`, `category` (when already set). **Regenerated:** `files`, `dependencies`, `registryDependencies`, `utilities`, `target`, etc. Full policy: [REGISTRY.md](../../docs/reference/registry/REGISTRY.md).

## Do not

- Hand-edit `packages/registry/templates/**` — overwritten on the next sync.
- Rely on hand-edits to `src/items/` for `registryDependencies` / `files` — reconcile overwrites them; change UI imports or adjust after reviewing the sync diff.
- Skip sync when UI install artifacts changed.

## Procedure

1. Complete UI edits under `packages/ui/src/components/`.
2. **Give the user** this numbered checklist (do not run unless they explicitly ask). Wait for pass or errors before treating sync as done:

```sh
pnpm ui:check
pnpm registry:sync
pnpm sync:all          # omit if only UI/templates changed, no token/style drift
pnpm registry:check
```

3. Review diff with the user — expect changes under `packages/registry/templates/` and `packages/registry/src/items/` (reconcile).

Wider pipeline: [`$agent-workflow`](../../.cursor/skills/agent-workflow/SKILL.md) step 4 may wrap the same commands with other touched-path checks.

## Overlay / elevation changes

If overlay stacking, drawer z-index, or elevation tokens changed, **append** to the checklist:

```sh
pnpm tokens:check
pnpm sync:all && pnpm registry:check
```

## Commit guidance

Prefer separate commits: `feat(ui)` then `feat(registry)` with sync in between.
See [git-commits.mdc](../../.cursor/rules/git-commits.mdc).

## Related

- [docs/reference/registry/REGISTRY.md](../../docs/reference/registry/REGISTRY.md)
- [docs/operations/SCRIPTS.md](../../docs/operations/SCRIPTS.md)
- `$components-authoring`
- [`$agent-workflow`](../../.cursor/skills/agent-workflow/SKILL.md)
- [`$monorepo-verify-gate`](../../.cursor/skills/monorepo-verify-gate/SKILL.md) — step 4 checklist (`ui-registry` scenario)
