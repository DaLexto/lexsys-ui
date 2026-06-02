# Proposal (discussion): documentation rule(s)?

**Status:** concluded — NEED one file; globs `docs/**/*.md` only  
**Catalog #:** 5

---

## What problem might this rule solve?

When editing **markdown documentation**:

- Editing the **wrong doc** (duplicate REGISTRY rules in AGENTS or a random README)
- Wrong **layout** (missing metadata, no INDEX check, `**/*.md` glob fired on wrong file type)
- Copying **SCRIPTS** tables into domain specs
- Treating **roadmap** text as current MUST

Today: `documentation-standards.mdc` (~363 lines, globs **`**/*.md`**) + `docs-routing.mdc` (~42 lines, `docs/**/*`) — overlap and over-broad attach.

---

## What exists today (reference only)

| Today | Globs | Role |
| ----- | ----- | ---- |
| `documentation-standards.mdc` | `**/*.md`, `**/*.mdx` | Layout + taxonomy + governance |
| `docs-routing.mdc` | `docs/**/*` | INDEX ownership before edit |
| [INDEX.md](../../../docs/INDEX.md) | docs | Contract: who owns what |
| **`$docs-authoring`** | skill | New/reshape doc layout |
| **`$docs-alignment`** | skill | Freshness, counts, cross-refs |

**Out of glob today but mentioned in standards:** `AGENTS.md`, root `README.md`, `packages/*/README.md`, `CONTRIBUTING.md`.

---

## Decision axes (not “because old files existed”)

### A — One rule or two?

| Option | Files | Pros | Cons |
| ------ | ----- | ---- | ---- |
| **One** `documentation.mdc` | 1 | Single attach on `docs/**`; routing + layout together | Easier to exceed 200 lines |
| **Two** `docs-routing.mdc` + `documentation-layout.mdc` | 2 | Split INDEX vs metadata/H2; smaller | Two rules on same glob (like 3 rules on TS) |

### B — Globs (critical)

| Option | Globs | Pros | Cons |
| ------ | ----- | ---- | ---- |
| **B1** | `docs/**/*.md` only | No attach on random root md; focused | AGENTS/README/package README need separate handling |
| **B2** | `docs/**` + `AGENTS.md` + `README.md` + `packages/*/README.md` | Covers all “markdown surfaces” | More rules firing outside `docs/` |
| **B3** | `**/*.md` (status quo) | Everything | Attaches when editing any md in repo — noisy |

### C — What the rule must NOT duplicate

- Domain specs (REGISTRY, TOKENS, …) — link INDEX
- Procedures — `$docs-authoring`, `$docs-alignment`
- SCRIPTS command tables — link only

---

## If we said NEED — sketch (~80–200 lines total)

**Routing (always first when editing `docs/`):**

1. Open INDEX → confirm owner
2. Edit owning file only
3. Link SCRIPTS / TESTING, do not copy inventories

**Layout (when creating or restructuring):**

- Metadata block + `---` + On this page (when ≥4 H2s) — INDEX exempt
- Related documentation footer optional
- Pointer to `$docs-authoring` for full reshape

**Skills (wave 2 names stable enough):**

- New doc → `$docs-authoring`
- Contract/count drift → `$docs-alignment`

---

## Arguments FOR

1. Docs edits are where agents **duplicate specs** most.
2. Old `**/*.md` glob is **too wide** — narrowing is a real win.
3. Splitting routing vs layout can match how you think (INDEX vs markdown shape).

---

## Arguments AGAINST (NO / DEFER)

1. **INDEX + skills** enough if you always invoke `$docs-authoring`.
2. **One huge rule** repeats old 363-line problem if not rewritten thin.
3. **DEFER** until after first code rules ship.

---

## Your answers (2026-05-30)

| # | Answer |
| - | ------ |
| 1 | **NEED** (implied) |
| 2 | **One file** — merge routing + layout |
| 3 | **Globs:** `docs/**/*.md` only — not root, not `AGENTS.md`; package/root READMEs → **later maybe separate rule** |
| 4 | (same as 3) |
| 5 | See explanation below — decide after |

### Globs (final)

```yaml
globs:
  - "docs/**/*.md"
```

Covers `docs/contributors/CONTRIBUTING.md`, `docs/INDEX.md`, all reference docs. **Not** `README.md`, `AGENTS.md`, `packages/*/README.md`.

### Proposed filename

`documentation.mdc` (single file).

---

## Question 5 explained: mention `$docs-authoring` / `$docs-alignment` in the rule?

**Rule (when `docs/foo.md` is open):**

- Check INDEX owner before edit
- Metadata / On this page / Do not copy SCRIPTS
- **Short “when to load a skill”** — not the skill steps themselves

**Skills:**

| Skill | Role |
| ----- | ---- |
| `$docs-authoring` | **How** to create or reshape a doc (full layout pass, new file) |
| `$docs-alignment` | **How** to verify counts, links, stale contracts after code changes |

**If rule names them (recommended, 2 bullets):**

```markdown
- New or major layout reshape → load `$docs-authoring`
- After behavior/catalog/count changes → `$docs-alignment` (+ ui catalog check if UI touched)
```

Agent editing `REGISTRY.md` gets layout + routing automatically; skill runs when task is bigger than one paragraph fix.

**If rule does NOT name them:**

- Rule only says “see `.agents/skills/` for doc procedures”
- Safer if you rename skills in wave 2, but easier to forget skills exist

**Recommendation:** **Yes, name them** in rule with “(skill name may change in wave 2)” note — wave 3 repo refactor updates links anyway.

**Chosen:** **5a** — name `$docs-authoring` and `$docs-alignment` in rule (update links in wave 2/3 if renamed).

---

## After discussion

Update [RULES_CATALOG.md](../RULES_CATALOG.md); if NEED → implementation plan(s) then `.mdc` after OK.
