---
name: docs-authoring
description: >
  Lexsys markdown docs — layout authoring and post-change alignment in one skill.
  Use for documentation.mdc, docs/INDEX.md, new docs, metadata, On this page,
  Related documentation, freshness pass, stale counts, catalog drift, docs-alignment,
  ui:audit:catalog, or AGENTS vs docs duplication. Procedures in procedures.md.
---

# Docs authoring

Use for **markdown layout** and **freshness / cross-ref** passes. Governance: [documentation.mdc](../rules/documentation.mdc). Ownership: [docs/INDEX.md](../../docs/INDEX.md).

**Read the matching section in [procedures.md](./procedures.md) before editing docs.**

## When to use

- New or reshaped docs under `docs/`, `AGENTS.md`, READMEs → [§ Authoring](./procedures.md#authoring)
- Behavior, CLI, registry, or UI contracts changed; catalog counts; doc drift → [§ Alignment](./procedures.md#alignment)
- Full pass after a feature slice → Authoring (if layout needed), then Alignment

## When not to use

- Backlog triage only → **`$project-next-steps`**
- Commit / PR → **`$git-commit`**

## Procedure router

| Intent                                                  | Section                                  |
| ------------------------------------------------------- | ---------------------------------------- |
| New doc / layout / On this page / Related documentation | [§ Authoring](./procedures.md#authoring) |
| Cross-ref / counts / catalog audit / grep freshness     | [§ Alignment](./procedures.md#alignment) |

## Format and verify

- After markdown edits: ask the user to run **`pnpm format:check`** once (do not run unless they ask).
- Part of [`$agent-workflow`](../agent-workflow/SKILL.md): use [`$monorepo-verify-gate`](../monorepo-verify-gate/SKILL.md) scenario **`docs-only`** when applicable.

## Related

- [procedures.md](./procedures.md)
- [documentation.mdc](../rules/documentation.mdc)
- [`$agent-workflow`](../agent-workflow/SKILL.md)
- [`$monorepo-verify-gate`](../monorepo-verify-gate/SKILL.md)
- [`$changelog-update`](../changelog-update/SKILL.md)
