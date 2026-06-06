# Registry sync procedures

Step-by-step work for [`$registry-sync`](./SKILL.md). Contract: [REGISTRY.md](../../docs/reference/registry/REGISTRY.md). Commands: [`$monorepo-verify-gate`](../monorepo-verify-gate/SKILL.md) only — not duplicated here.

---

## Verify scenarios

Pick the verify-gate scenario from what you changed. Agent loads **`$monorepo-verify-gate`** step 4; you run the checklist.

| Change set                                  | Scenario                                                                   |
| ------------------------------------------- | -------------------------------------------------------------------------- |
| UI only (install templates / items)         | **`ui-registry`**                                                          |
| `src/items/` only, no UI template drift     | **`registry-meta`** (next `registry:sync` reconciles items from UI)        |
| Token CSS + registry style templates        | **`tokens-styles-registry`**                                               |
| UI + token CSS                              | **`ui-registry`**, then **`tokens-styles-registry`** if styles still drift |
| Overlay / elevation tokens affecting blocks | Add **`tokens-styles-registry`** (not a separate command list)             |

Human sync table: [SCRIPTS.md § Sync workflows](../../docs/operations/SCRIPTS.md#sync-workflows). Root aliases: `pnpm registry:sync` → `templates:sync`; `pnpm sync:all` → `registry:sync` + `tokens:generate:styles`.

---

## Post-sync diff review

After the user runs **`ui-registry`** (includes `pnpm registry:sync`):

1. Expect changes under `packages/registry/templates/{primitives,blocks,templates}/`.
2. Expect changes under `packages/registry/src/items/` — reconcile regenerates `files`, `dependencies`, `registryDependencies`, `utilities`, `target`; preserves `aliases` and `category` when set.
3. **Never** commit hand-edited template files.
4. Review inferred `registryDependencies` for blocks/templates — adjust UI imports or `aliases`/`category` if inference missed an edge case ([REVIEW_TODO Known Gaps](../../docs/REVIEW_TODO.md)).

---

## New block

Order (UI authoring first):

1. Create three-file folder under `packages/ui/src/components/blocks/<Name>/` or `templates/<Name>/` — **`$components-authoring`**.
2. Do **not** export blocks/templates from `packages/ui/src/index.ts`.
3. User runs verify scenario **`ui-registry`** — sync scaffolds/reconciles `src/items/<name>.ts` (`type: "block"`, inferred deps).
4. Optional consumer check: [Testing docs § Consumer sandbox verification](../../docs/operations/TESTING.md#consumer-sandbox-verification) when install behavior changes (not in verify-gate).

---

## Delete flow

1. Remove UI folder under `packages/ui/src/components/{primitives,blocks,templates}/`.
2. Remove primitive export from `packages/ui/src/index.ts` when applicable.
3. Remove `packages/registry/src/items/<name>.ts` and tests (components-authoring delete checklist).
4. User runs **`ui-registry`** — sync removes stale templates; confirm `registry:check` passes.

---

## Scripts pipeline

`pnpm registry:sync` runs [`sync-all-templates.mjs`](../../../packages/registry/scripts/sync-all-templates.mjs):

| Script                           | Role                                                                                                                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `sync-component-templates.mjs`   | `ui/.../primitives` → `templates/primitives`; `cn` / utils import rewrites; **`syncRegistryItems`** (primitives, reconcile)                                                          |
| `sync-block-templates.mjs`       | `blocks/` + `templates/` UI → `templates/blocks` + `templates/templates`; `@/components/{layer}/…` storage rewrites; **`syncRegistryItems`** per layer (blocks/templates, reconcile) |
| `registry-item-generator.mjs`    | Scaffolds missing items; **reconcile** updates existing items; infers `registryDependencies` from template imports                                                                   |
| `check-registry-styles-sync.mjs` | Compares `templates/styles/*.css` to token output — check only; write via `tokens:generate:styles` / `sync:all`                                                                      |

Shared composition helpers: `scripts/lib/registry-composition-imports.mjs` (validated in `registry:check`).

**Automation (SI.4 + SI.5 — shipped):** block/template items are created and reconciled on sync; `--check` fails when UI folders lack items or reconcile would change item source.

---

## Commit split

Prefer separate commits: `feat(ui)` → user runs sync → `feat(registry)` with template + reconciled item diff. Policy: [git-commits.mdc](../../.cursor/rules/git-commits.mdc).
