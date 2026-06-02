# Implementation plan: `documentation.mdc`

**Status:** draft — awaiting your OK before `rules/documentation.mdc`  
**Catalog:** NEED (2026-05-30)  
**Proposal:** [05-documentation-proposal.md](./proposals/05-documentation-proposal.md)  
**Replaces (later):** `.cursor/rules/documentation-standards.mdc` + `docs-routing.mdc` → **one** file

---

## Goal

Single edit-time rule for **`docs/**/*.md` only** — INDEX routing before edit + thin layout contract. Replaces 363-line `**/*.md` attach and split routing/layout rules. Full taxonomy and edge cases stay in docs/skills; rule is what agents violate when a doc file is in context.

---

## Frontmatter (copy-ready)

```yaml
---
description: Documentation routing and layout when editing docs/ — check INDEX owner, metadata skeleton, link don't copy SCRIPTS.
globs:
  - "docs/**/*.md"
alwaysApply: false
---
```

**Out of glob (explicit in body):** `AGENTS.md`, root `README.md`, `packages/*/README.md`, `CONTRIBUTING.md` stub — **later** optional `readme.mdc`; until then: “same contracts, rule does not auto-attach”.

---

## Scope

| Applies when agent works on | Does not auto-attach |
| ------------------------- | -------------------- |
| Any `docs/**/*.md` | Root README, AGENTS, package READMEs |
| Creating/editing hub + reference + operations + contributors docs | Copying domain specs into AGENTS |

**Skills (name in rule — wave 2 may rename):**

- New doc or major reshape → **`$docs-authoring`**
- After behavior/catalog/count changes → **`$docs-alignment`**

Add footnote: skill names may change in wave 2; wave 3 updates links.

---

## Body outline (~100–160 lines)

Merge **routing first**, then **layout**. Do not paste full Documentation Taxonomy table from old standards — use short type list + “see INDEX”.

### 1. Before editing (routing — MUST)

1. Open [docs/INDEX.md](../../docs/INDEX.md) — confirm **owning document**.
2. Edit the owner file only — do not duplicate domain rules in AGENTS.md, `.cursor/rules/`, or unrelated READMEs.
3. **Current implementation** wins over ROADMAP / REVIEW_TODO / memory.
4. Script names and sync workflows → link [SCRIPTS.md](../../docs/operations/SCRIPTS.md) only — **no** command tables in domain specs.
5. Verification procedures → link [TESTING.md](../../docs/operations/TESTING.md).

### 2. Quick ownership (compact table)

Keep ~12 rows max (from old docs-routing):

| Editing… | Canonical doc |
| -------- | ------------- |
| Tokens | `docs/reference/tokens/TOKENS.md` |
| Registry | `docs/reference/registry/REGISTRY.md` |
| CLI | `docs/reference/cli/CLI.md` |
| UI / variants / catalog | `docs/reference/ui/UI.md`, `UI_VARIANTS.md`, `UI_CATALOG.md`, … |
| Tests / sandbox | `docs/operations/TESTING.md` |
| pnpm scripts | `docs/operations/SCRIPTS.md` |
| Deploy | `docs/operations/DEPLOY.md` |
| Backlog | `docs/REVIEW_TODO.md`, `docs/ROADMAP.md` |
| System shape | `docs/ARCHITECTURE.md` |
| Style / naming | `docs/contributors/STYLE.md` |

Full map: INDEX.md — do not grow this table in wave 1.

### 3. Do not

- Copy SCRIPTS inventory tables into reference specs.
- Use `MUST` in roadmap/backlog for unshipped work — use *planned* / *TBD*.
- Invent per-file layout under `docs/` via new `.mdc` files.
- Treat this rule as architecture contract — link ARCHITECTURE.md.

### 4. Layout contract (thin)

**Metadata block** (after H1, before `---`):

- `**Audience:**`, `**Type:**`, `**Source of truth for:**` — required on `docs/**/*.md`.
- `**Verified against:**` — when doc is domain spec / catalog / CLI ref.
- `**Last reviewed:** YYYY-MM-DD` — update on touch in same PR.
- Fixed order; no links inside metadata; no prose between metadata and `---`.

**Structure:**

- Exactly one H1.
- `---` after metadata.
- `## On this page` — **required** when ≥4 substantive H2 sections (anchor list).
- Sentence case H2/H3; no skipped levels.
- Optional final `## Related documentation` — cross-file links only.

**INDEX.md exempt:** routing hub — no “On this page” requirement if structure differs; still metadata where applicable.

### 5. Document types (one line each, max 8)

Routing hub · domain spec · catalog/inventory · operations · contributor style · roadmap/backlog — link INDEX for full taxonomy, do not duplicate 12-row taxonomy table from old rule.

### 6. When to load skills

- New file or major restructure → `$docs-authoring`
- Contract/count/export drift after code change → `$docs-alignment` (+ `pnpm ui:audit:catalog:check` when UI catalog touched — one line)

### 7. AGENTS and rules (3 lines)

- AGENTS.md = routing/guardrails, not domain specs.
- `.cursor/rules/` = edit-time behavior.
- `.agents/skills/` = multi-step procedures.

### 8. See also

- INDEX.md, ARCHITECTURE.md
- `$docs-authoring`, `$docs-alignment` skills
- `documentation.mdc` does not apply to TS comments → `code-commenting.mdc`

---

## Must NOT include

- Full 363-line documentation-standards content.
- `**/*.md` glob.
- Release/changelog/deploy procedure (NO `release.mdc` — skills + DEPLOY.md).
- Step-by-step docs-alignment checklist (skill body).
- Per-package README layout detail (defer `readme.mdc`).

---

## Target size

| Budget | Lines |
| ------ | ----- |
| Domain rule | **100–160** (hard cap 180; split only if wave 3 demands) |

---

## Source material

- [docs-routing.mdc](../../.cursor/rules/docs-routing.mdc) — routing + ownership table.
- [documentation-standards.mdc](../../.cursor/rules/documentation-standards.mdc) — extract layout § only, not taxonomy essay.
- [05-documentation-proposal.md](./proposals/05-documentation-proposal.md)
- [INDEX.md](../../docs/INDEX.md)
- Skills: `.agents/skills/docs-authoring/`, `docs-alignment/`

---

## Verification before ship

- [ ] Globs **only** `docs/**/*.md`.
- [ ] Out-of-glob surfaces listed (README, AGENTS).
- [ ] Both skills named (5a).
- [ ] No SCRIPTS table copy in outline.
- [ ] Shorter than old combined ~400 lines.

---

## After your OK

1. Write `rules/documentation.mdc`.
2. Edit test: open `docs/reference/registry/REGISTRY.md` — rule should attach; open root `README.md` — should **not**.
3. Wave 3: update INDEX “layout” link to new rule path; grep `documentation-standards` / `docs-routing`.
