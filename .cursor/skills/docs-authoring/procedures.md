# Docs procedures

Step-by-step work for [`$docs-authoring`](./SKILL.md). Governance: [documentation.mdc](../rules/documentation.mdc). Hub: [docs/INDEX.md](../../docs/INDEX.md).

---

## Authoring

Use when creating or reshaping layout — not for post-code freshness only.

### When to use

- New markdown under `docs/`, `AGENTS.md`, root/package README
- Major restructure (H2 order, metadata retrofit)
- Adding **On this page** or **Related documentation**

### When not

- Code or contracts changed but layout already correct → [§ Alignment](#alignment) below

### Procedure

1. **Owner** — confirm canonical doc in INDEX; do not create a second spec for the same topic.
2. **Type** — pick one row from documentation.mdc / INDEX taxonomy; scaffold H2 order for that type.
3. **Metadata** — fixed order: Audience, Type, Source of truth for, Verified against (if applicable), Last reviewed (on touch) → `---`.
4. **On this page** — **required** after `---` when ≥4 substantive H2 sections (exclude `On this page` / `Related documentation` from count); follow documentation.mdc (ASCII `-` in linked headings, label = heading text, verify `#fragment` in preview).
5. **Body** — one section mode per H2; inline prose links allowed; no header link lists.
6. **Related documentation** — optional final H2; max ~5 topic-related links with one-line why.
7. When content must match code → continue with [§ Alignment](#alignment). Multi-step implementation → [`$agent-workflow`](../agent-workflow/SKILL.md).

---

## Alignment

Use after behavior or catalog changes — or when authoring is done and truth must match code.

### When to use

- Behavior, CLI, registry, or UI contracts changed
- Catalog counts changed (primitives, installable items, M-phases)
- Moving content between AGENTS, docs, rules, or skills

### Procedure

0. **Layout** — edited files match [documentation.mdc](../rules/documentation.mdc). If layout is wrong, run [§ Authoring](#authoring) first.
1. **Identify owner** — each rule lives in one canonical doc (INDEX table).
2. **Edit owner only** — replace duplicates elsewhere with links.
3. **Validate claims** against code (`packages/*/src`, registry item count, tests) — read/grep, not `pnpm`.
4. **Catalog / exports** — after UI export or registry item metadata changes, **tell the user** to run (wait for pass/errors):
   - `pnpm ui:audit:catalog:check` (or full `pnpm ui:audit`)
   - `pnpm ui:audit:catalog:write` when exports or registry item names changed
   - Compound/leaf questions → [UI_CATALOG.md](../../docs/reference/ui/UI_CATALOG.md), not UI_COMPOSITION body lists.
5. **Cross-links:** ARCHITECTURE ↔ domain specs ↔ INDEX; README maintainer table → INDEX.
6. **Counts grep** (examples):

```sh
# Stale primitive counts, wrong M-phase wording, duplicate component lists
rg "\b32\b primitives|\b42\b primitive|M1–M10|M4 release" docs README.md AGENTS.md
rg "FormField, SettingsPanel|41 primitives" docs README.md packages/ui/README.md
```

7. If markdown changed widely, ask the user to run `pnpm format:check` (and `pnpm format` if needed) — do not run unless they ask.

### Layer rules

| Content                           | Belongs in                                      |
| --------------------------------- | ----------------------------------------------- |
| Token layer rules                 | `docs/reference/tokens/TOKENS.md`               |
| Installable inventory             | `docs/reference/ui/UI_CATALOG.md`               |
| Variant / CVA compliance rows     | `docs/reference/ui/UI_AUDIT.md`                 |
| Composition rules (not inventory) | `docs/reference/ui/UI_COMPOSITION.md`           |
| Agent routing                     | `AGENTS.md` (short)                             |
| Cursor edit behavior              | `.cursor/rules/`                                |
| Multi-step verify handoff         | [`$agent-workflow`](../agent-workflow/SKILL.md) |
| Script inventory                  | `docs/operations/SCRIPTS.md` only               |

### Do not

- Rewrite architecture contract bodies unless the implementation changed.
- Copy full TESTING or SCRIPTS tables into AGENTS or rules.
- Duplicate installable component lists outside `UI_CATALOG.md` (link instead).
