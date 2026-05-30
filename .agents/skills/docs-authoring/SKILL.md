---
name: docs-authoring
description: >
  Create or reshape in-scope markdown per documentation-standards.mdc — metadata,
  H2 order, required On this page (≥4 substantive H2), Related documentation footer. Use for new
  docs, layout retrofit, or package README scaffolding — not post-code freshness.
---

# Docs authoring

Layout contract: [.cursor/rules/documentation-standards.mdc](../../.cursor/rules/documentation-standards.mdc).  
Ownership: [docs/INDEX.md](../../docs/INDEX.md).  
Routing when editing under `docs/`: [docs-routing.mdc](../../.cursor/rules/docs-routing.mdc).

## When to use

- New markdown doc under `docs/`, `AGENTS.md`, root/package README
- Major restructure (H2 order, metadata retrofit)
- Adding **On this page** or **Related documentation** to a long doc

## When not to use

- Code or contracts changed but layout already correct → **`$docs-alignment`**
- Truth/count/catalog drift pass only

## Procedure

1. **Owner** — confirm canonical doc in INDEX; do not create a second spec for the same topic.
2. **Type** — pick one row from documentation-standards taxonomy; scaffold H2 order for that type.
3. **Metadata** — fixed order: Audience, Type, Source of truth for, Verified against (if applicable), Last reviewed (on touch) → `---`.
4. **On this page** — **required** after `---` when ≥4 substantive H2 sections (exclude `On this page` / `Related documentation` from count); mirror heading anchors. Exempt [INDEX.md](../../docs/INDEX.md) and routing hubs per documentation-standards.
5. **Body** — one section mode per H2; inline prose links allowed; no header link lists.
6. **Related documentation** — optional final H2; max ~5 topic-related links with one-line why.
7. Hand off to **`$docs-alignment`** when content must match code; run `pnpm format:check`.

## Related

- [`$docs-alignment`](../docs-alignment/SKILL.md)
- [documentation-standards.mdc](../../.cursor/rules/documentation-standards.mdc)
