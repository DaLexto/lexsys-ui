---
name: registry-sync
description: >
  Sync packages/ui source into registry templates after primitive, block, or
  template edits. Use when changing packages/ui, running pnpm registry:sync,
  registry templates stale, or UI+registry multi-commit workflow.
---

# Registry sync

Use this skill after editing reference components in `packages/ui` when install
templates should match UI source.

## When to use

- Any change under `packages/ui/src/components/{primitives,blocks,templates}/`
- Before a `registry`-scoped commit that ships template updates
- After variant/token class changes in `*.variants.ts` that affect installed CSS classes

## Do not

- Hand-edit `packages/registry/templates/**` when UI source exists — sync from UI.
- Skip sync when only registry metadata (`src/items/`) changed without template file changes.

## Procedure

1. Complete UI edits and pass UI checks:

```sh
pnpm ui:check
```

2. Sync templates from UI:

```sh
pnpm registry:sync
```

3. If token CSS or style templates may be stale:

```sh
pnpm sync:all
```

4. Validate registry:

```sh
pnpm registry:check
```

5. Review diff — expect changes under `packages/registry/templates/` and possibly `src/items/` if generator was run separately.

## Overlay / elevation changes

If you changed overlay stacking, drawer z-index, or component elevation tokens:

```sh
pnpm tokens:check
pnpm sync:all && pnpm registry:check
```

## Commit guidance

Prefer separate commits: `feat(ui)` then `feat(registry)` with sync in between.
See [git-commits.mdc](../git-commit/git-commits.mdc).

## Related

- [docs/reference/registry/REGISTRY.md](../../docs/reference/registry/REGISTRY.md)
- [docs/operations/SCRIPTS.md](../../docs/operations/SCRIPTS.md)
- `$ui-authoring`
- `$monorepo-check-gate`
