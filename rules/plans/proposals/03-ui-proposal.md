# Proposal (discussion): `ui-components.mdc`?

**Status:** concluded — NEED `ui-components.mdc`; error list TBD after component analysis  
**Catalog #:** 3  
**Depends on:** #2 **NEED** `typescript.mdc` + `code-commenting.mdc` (same paths under `packages/ui/…`)

---

## What problem might this rule solve?

When editing **`packages/ui/src/components/**`** (`*.tsx`, `*.types.ts`, `*.variants.ts`):

- Wrong variant pattern (`cva()` on blocks/templates)
- Raw Tailwind palette instead of `cssVarPrefix` token classes in `*.variants.ts`
- Wrong `cn()` vs `mergeClassName()` for Base UI callbacks
- Exporting blocks/templates from `packages/ui/src/index.ts` (registry-first violation)
- Forgetting registry sync after install-affecting UI changes

Generic **typescript** rules do not encode CVA, token prefix, or layer export policy.

---

## What exists today (reference only)

| Today | Attach | ~size |
| ----- | ------ | ----- |
| `ui-component-authoring.mdc` | `packages/ui/src/components/**/*` | ~116 lines |
| **`$ui-authoring`** skill | on demand | workflow + tests + gates |

Docs: [UI.md](../../../docs/reference/ui/UI.md), [UI_VARIANTS.md](../../../docs/reference/ui/UI_VARIANTS.md), [UI_COMPOSITION.md](../../../docs/reference/ui/UI_COMPOSITION.md).

---

## What would NOT go in `ui.mdc`

- Step-by-step create/delete component, test file layout, `pnpm ui:check` sequence → **`$ui-authoring`**
- Full UI spec bodies → docs
- TS `any`, `import type`, JSDoc → **`typescript.mdc`** / **`code-commenting.mdc`**
- Registry sync commands detail → **`$registry-sync`** (rule: one-line “after install-affecting edit → skill”)

---

## If we said NEED — what could `ui.mdc` contain? (~80–120 lines)

| Section | Content |
| ------- | ------- |
| Scope | `packages/ui/src/components/{primitives,blocks,templates}/` |
| Precedence | Under this path, **UI rule wins** for variants/tokens/exports; TS rules still apply for types/comments |
| Do not | `cva()` on blocks/templates; raw palette in variants; export blocks/templates from package index |
| Variant pattern | Table primitives vs blocks (from today’s rule — fresh wording) |
| Token prefix | `cssVarPrefix` / `bg-(--lex-…)` + link TOKENS generator config |
| className / ref | `cn` vs `mergeClassName`; ref prop pattern one-liner + link UI.md |
| After edit | Pointer: install-affecting change → `$registry-sync` / `$ui-authoring` gates |
| See also | UI.md, UI_VARIANTS, skill |

**Attach (to decide):**

| Mode | Note |
| ---- | ---- |
| Globs `packages/ui/src/components/**/*` | Matches today; only loads on UI component tree |
| Apply Intelligently | Risk: agent edits UI without attaching rule |

**Name options:**

| Name | Pros |
| ---- | ---- |
| **`ui.mdc`** | Short; pairs with `typescript.mdc` |
| **`ui-component-authoring.mdc`** | Same as old — explicit but long |
| **`ui-components.mdc`** | Middle ground |

---

## Arguments FOR

1. UI mistakes are **domain-specific** — TS rule cannot replace.
2. Skill is **how**; rule is **standards at edit time** when glob hits.
3. ~116 lines old rule was right-sized — good candidate for fresh write, not 300-line doc dump.
4. High touch area for Lexsys product (primitives/blocks/templates).

---

## Arguments AGAINST (NO / DEFER)

1. **`$ui-authoring`** already links to old `.mdc` — maybe only update skill + docs in wave 2?
2. You’re **not sure** agent error rate on TS (#2 same) — observe first?
3. **Double attach** with typescript + commenting on same files — token cost (3 rules on one `Button.tsx`).
4. **DEFER** until architecture/stack settled — UI less urgent than coding.

---

## Overlap with #2 (typescript + code-commenting)

Same files often `.tsx` + `.types.ts`:

```txt
ui.mdc           → CVA, tokens, exports, registry pointer
typescript.mdc   → strict TS, export const, etc.
code-commenting  → JSDoc on exports
```

Each rule needs one **Precedence** line to avoid contradiction.

---

## Your answers (2026-05-30)

| # | Answer |
| - | ------ |
| 1 | **NEED** |
| 2 | **`ui-components.mdc`** |
| 3 | **Yes** — glob `packages/ui/src/components/**/*` only |
| 4 | **Analysis first** — review components to decide which mistakes to prevent in rule body |
| 5 | **G1 hybrid** — ui glob on `components/**`; TS + commenting on all ts/tsx. Skill: today `$ui-authoring`; **rename TBD wave 2** |

### Before writing `ui-components.mdc` body

Talas 1 sub-step (not the `.mdc` yet):

- Scan / analyze `packages/ui/src/components/` (patterns, audit failures, common agent drift)
- List **concrete** Do not / MUST rows for the rule
- Then `rules/plans/ui-components.md` implementation plan → your OK → write `rules/ui-components.mdc`

---

## What “3 rules on one file” means (Q5)

When you edit e.g. `packages/ui/src/components/primitives/Button/Button.tsx`, Cursor can attach **multiple** rules if globs match:

| Rule | Glob match? | What it adds to context |
| ---- | ----------- | ------------------------ |
| `typescript.mdc` | Yes — `**/*.tsx` | strict TS, export style, naming → STYLE |
| `code-commenting.mdc` | Yes — `**/*.tsx` | JSDoc on exports |
| `ui-components.mdc` | Yes — `packages/ui/src/components/**` | CVA, tokens, layer exports |

So **one save on Button.tsx** may load **three rule files** into the agent (~200–300+ lines total if all are fat).

**Options if that feels heavy:**

| Option | Tradeoff |
| ------ | -------- |
| **A — Keep all 3** | Best coverage; define **precedence** lines (ui wins for variants/tokens) |
| **B — Narrow TS globs** | e.g. exclude `packages/ui/src/components/**` from typescript/commenting — only ui rule on UI tree; TS rules elsewhere in monorepo |
| **C — Thinner rules** | All 3 attach but each ~60–100 lines (recommended with A) |
| **D — Merge ui + TS for UI path only** | One `ui-components.mdc` with tiny TS subsection — breaks “one responsibility” |

**Recommendation:** **A + C** — all three attach on components, keep each rule thin, one precedence line per file.

---

## Attach (agreed)

```yaml
ui-components.mdc:     globs: "packages/ui/src/components/**/*"
typescript.mdc:        globs: "**/*.ts", "**/*.tsx"
code-commenting.mdc: globs: "**/*.ts", "**/*.tsx"
```

---

## After discussion

Update [RULES_CATALOG.md](../RULES_CATALOG.md), then — if NEED — `rules/plans/ui-components.md` (implementation plan, after component analysis).
