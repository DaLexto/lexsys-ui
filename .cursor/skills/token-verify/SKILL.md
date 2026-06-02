---
name: token-verify
description: >
  Token-layer rules and when to verify after packages/tokens edits. Use when
  editing packages/tokens/src, TOKENS.md validation, themes, semantics, component
  token files, tokens:check, tokens:generate:styles, sync:all, or registry
  templates/styles drift. Procedures in procedures.md; pnpm via
  $monorepo-verify-gate scenarios tokens or tokens-styles-registry.
---

# Token verify

Canonical rules: [docs/reference/tokens/TOKENS.md](../../docs/reference/tokens/TOKENS.md).

**Verify commands:** do not list `pnpm` steps here — use **[`$monorepo-verify-gate`](../monorepo-verify-gate/SKILL.md)** scenarios **`tokens`** or **`tokens-styles-registry`**. Agent plans; **you run**; reply **`verify passed`** or paste errors.

## When to use

- Changes under `packages/tokens/src/` (primitives, brand, semantics, components, themes)
- Generator, validator, or governance policy changes
- Layer reminders while implementing (below)

## When not to use

- UI component TSX/CVA/tests → **`$components-authoring`**
- Registry UI templates or `src/items/` → **`$registry-sync`**
- Commit / PR → **`$git-commit`**
- Docs layout or freshness only → **`$docs-authoring`**

## Layer reminders (do not duplicate — see TOKENS.md)

- primitives → brand → semantics → components; themes override semantics
- component tokens reference semantics only
- CSS is generated — never hand-write `tokens.css` / `theme.css` in packages or `registry/templates/styles/`

## Procedure router

| Intent                                  | Section                                                        |
| --------------------------------------- | -------------------------------------------------------------- |
| Which verify scenario after your change | [§ Verify scenarios](./procedures.md#verify-scenarios)         |
| Review generated style outputs          | [§ Post-generate review](./procedures.md#post-generate-review) |
| Script pipeline                         | [§ Scripts pipeline](./procedures.md#scripts-pipeline)         |
| Registry style handoff                  | [§ Cross-skill handoff](./procedures.md#cross-skill-handoff)   |
| Commit split                            | [§ Commit split](./procedures.md#commit-split)                 |

## Related

- [procedures.md](./procedures.md)
- [`$monorepo-verify-gate`](../monorepo-verify-gate/SKILL.md)
- [`$registry-sync`](../registry-sync/SKILL.md)
- [`$agent-workflow`](../agent-workflow/SKILL.md)
- [docs/reference/tokens/RESOLVER_EVOLUTION.md](../../docs/reference/tokens/RESOLVER_EVOLUTION.md)
- [docs/operations/SCRIPTS.md](../../docs/operations/SCRIPTS.md) — sync workflows
