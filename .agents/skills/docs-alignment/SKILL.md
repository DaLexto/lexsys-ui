---
name: docs-alignment
description: >
  Cross-reference and freshness pass after Neurex behavior or catalog changes.
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

1. **Identify owner** — each rule lives in one canonical doc (INDEX table).
2. **Edit owner only** — replace duplicates elsewhere with links.
3. **Verify claims** against code (`packages/*/src`, registry item count, tests).
4. **Cross-links:** ARCHITECTURE ↔ domain specs ↔ INDEX; README maintainer table → INDEX.
5. **Counts grep** (examples):

```sh
# Stale primitive counts, wrong M4 release readiness, etc.
rg "\b32\b primitives|\b42\b primitive|M4 release" docs README.md AGENTS.md
```

6. `pnpm format:check` if markdown changed widely.

## Layer rules

| Content | Belongs in |
| ------- | ---------- |
| Token layer rules | `docs/TOKENS.md` |
| Agent routing | `AGENTS.md` (short) |
| Cursor edit behavior | `.cursor/rules/` |
| Multi-step verify | `.agents/skills/` |
| Script inventory | `docs/SCRIPTS.md` only |

## Do not

- Rewrite architecture contract bodies unless the implementation changed.
- Copy full TESTING or SCRIPTS tables into AGENTS or rules.

## Related

- [docs-routing.mdc](../../.cursor/rules/docs-routing.mdc)
- `$monorepo-check-gate` (after doc-only changes)
