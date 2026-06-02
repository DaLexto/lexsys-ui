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

## Registry two-zone contract

```txt
packages/registry/
├── src/items/<name>.ts   ← install metadata (see rules below)
└── templates/            ← GENERATED OUTPUT — never edit directly
    ├── primitives/       ← copied from packages/ui/src/components/primitives/
    ├── blocks/           ← copied from packages/ui/src/components/blocks/
    └── templates/        ← copied from packages/ui/src/components/templates/
```

**`src/items/` rules — primitives vs blocks differ:**

| Layer              | `src/items/<name>.ts` created by                                                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primitives         | `pnpm registry:sync` auto-scaffolds if missing (`type: "component"`, auto-category). Review and adjust after sync.                                                    |
| Blocks / templates | **Must be written manually.** `pnpm registry:sync` does NOT create block item files. Set `type: "block"`, correct `category`, and all `registryDependencies` by hand. |

## Do not

- Hand-edit `packages/registry/templates/**` — manual edits are overwritten by the next sync.
- Forget to write `src/items/<name>.ts` for new blocks/templates — `pnpm registry:sync` won't create it and `lexsys add` cannot install the block without it.
- Skip sync when only registry metadata (`src/items/`) changed without template file changes.

## Procedure

1. Complete UI edits under `packages/ui/src/components/`.
2. **Give the user** this numbered checklist (do not run unless they explicitly ask). Wait for pass or errors before treating sync as done:

```sh
pnpm ui:check
pnpm registry:sync
pnpm sync:all          # omit if only UI/templates changed, no token/style drift
pnpm registry:check
```

3. Review diff with the user — expect changes under `packages/registry/templates/` and possibly `src/items/` if the generator ran separately.

Wider pipeline: [`$agent-workflow`](../../.cursor/skills/agent-workflow/SKILL.md) step 4 may wrap the same commands with other touched-path checks.

## Overlay / elevation changes

If overlay stacking, drawer z-index, or elevation tokens changed, **append** to the checklist:

```sh
pnpm tokens:check
pnpm sync:all && pnpm registry:check
```

## Commit guidance

Prefer separate commits: `feat(ui)` then `feat(registry)` with sync in between.
See [git-commits.mdc](../../../.cursor/rules/git-commits.mdc).

## Related

- [docs/reference/registry/REGISTRY.md](../../docs/reference/registry/REGISTRY.md)
- [docs/operations/SCRIPTS.md](../../docs/operations/SCRIPTS.md)
- `$ui-authoring`
- [`$agent-workflow`](../../.cursor/skills/agent-workflow/SKILL.md)
- `$monorepo-check-gate` — path → command map for checklists
