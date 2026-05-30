---
name: docs-alignment
description: >
  Cross-reference and freshness pass after Lexsys behavior or catalog changes.
  Use when updating docs, fixing stale primitive counts, M-phase status, BO
  backlog, or AGENTS vs docs duplication.
---

# Docs alignment

Governance: [.cursor/rules/documentation-standards.mdc](../../.cursor/rules/documentation-standards.mdc).  
Hub: [docs/INDEX.md](../../docs/INDEX.md).

## When to use

- Behavior, CLI, registry, or UI contracts changed
- Catalog counts changed (primitives, installable items, M-phases)
- Moving content between AGENTS, docs, rules, or skills

## Procedure

0. **Layout** — edited files match [documentation-standards.mdc § Document layout contract](../../.cursor/rules/documentation-standards.mdc) (metadata block, H2 order for declared type).
1. **Identify owner** — each rule lives in one canonical doc (INDEX table).
2. **Edit owner only** — replace duplicates elsewhere with links.
3. **Verify claims** against code (`packages/*/src`, registry item count, tests).
4. **Catalog / exports** — after UI export or registry item metadata changes:
   - Run `pnpm ui:audit:catalog:check` (or full `pnpm ui:audit`).
   - Refresh generated tables: `pnpm ui:audit:catalog:write` when exports or registry item names changed.
   - Compound/leaf questions → [UI_CATALOG.md](../../docs/reference/ui/UI_CATALOG.md), not UI_COMPOSITION body lists.
5. **Cross-links:** ARCHITECTURE ↔ domain specs ↔ INDEX; README maintainer table → INDEX.
6. **Counts grep** (examples):

```sh
# Stale primitive counts, wrong M-phase wording, duplicate component lists
rg "\b32\b primitives|\b42\b primitive|M1–M10|M4 release" docs README.md AGENTS.md
rg "FormField, SettingsPanel|41 primitives" docs README.md packages/ui/README.md
```

7. `pnpm format:check` if markdown changed widely.

## Layer rules

| Content                           | Belongs in                            |
| --------------------------------- | ------------------------------------- |
| Token layer rules                 | `docs/reference/tokens/TOKENS.md`     |
| Installable inventory             | `docs/reference/ui/UI_CATALOG.md`     |
| Variant / CVA compliance rows     | `docs/reference/ui/UI_AUDIT.md`       |
| Composition rules (not inventory) | `docs/reference/ui/UI_COMPOSITION.md` |
| Agent routing                     | `AGENTS.md` (short)                   |
| Cursor edit behavior              | `.cursor/rules/`                      |
| Multi-step verify                 | `.agents/skills/`                     |
| Script inventory                  | `docs/operations/SCRIPTS.md` only     |

## Do not

- Rewrite architecture contract bodies unless the implementation changed.
- Copy full TESTING or SCRIPTS tables into AGENTS or rules.
- Duplicate installable component lists outside `UI_CATALOG.md` (link instead).

## Related

- [docs-routing.mdc](../../.cursor/rules/docs-routing.mdc)
- [`$docs-authoring`](../docs-authoring/SKILL.md) (new/reshape layout — not freshness)
- `$monorepo-check-gate` (after doc-only changes)
