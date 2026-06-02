# Proposal (discussion): `coding.mdc`?

**Status:** concluded — see catalog (split: `typescript` + `code-commenting`)  
**Catalog #:** 2  
**Note:** `tech-stack` / stack rule — revisit later (separate discussion).

---

## What problem might this rule solve?

When editing **`.ts` / `.tsx`** anywhere in the monorepo (packages, apps, CLI, registry, tokens):

- Agent uses `any`, wrong `import` of types, untyped `catch (e)`
- Inconsistent `export function` vs `export const` (Lexsys prefers arrows)
- Missing JSDoc on new exported APIs
- Noise comments (`// increment i`) or missing “why” comments
- Mixing **generic TS** advice with **UI-specific** patterns (CVA, variants) — those belong in a separate `ui` rule if we add one

These are **repeatable at keystroke time**, not “read STYLE.md once.”

---

## What exists today (reference only — not the decision)

| Today | Attach | ~size |
| ----- | ------ | ----- |
| `typescript-conventions.mdc` | globs `**/*.ts`, `**/*.tsx` | ~255 lines |
| `code-commenting.mdc` | globs `packages/**/src`, `test`, `apps/**/src` | ~32 lines |

Plus **[STYLE.md](../../docs/contributors/STYLE.md)** § TypeScript (contract / why) and **ESLint** in repo.

**Decision driver:** do we need **one** edit-time rule for coding, not “because we had two files.”

---

## What would NOT go in `coding.mdc`

- UI component structure, CVA, `mergeClassName`, token CSS prefix → future `ui.mdc` (if NEED)
- Monorepo package map → DEFER `architecture.mdc`
- Full STYLE.md copy → link only
- Procedure steps (`pnpm check`, registry sync) → skills / AGENTS
- Version matrix / which dependency → `tech-stack` (intelligent apply) — **later**

---

## If we said NEED — what could one `coding.mdc` contain? (~100–180 lines)

| Section | Content |
| ------- | ------- |
| Scope | All `**/*.ts`, `**/*.tsx` in repo **or** exclude `packages/ui/...` if `ui` rule exists |
| Do not | `any`; value-import types; skip JSDoc on new exports |
| TS core | `import type`, `unknown` in catch, `export const`, interface vs type, no enum — **checklist** + 1–2 examples max |
| Comments | JSDoc on exports; why-not-what inline; TODO/NOTE format |
| Naming | Pointer to STYLE.md naming (if we SKIP separate `naming.mdc`) |
| See also | STYLE.md, STYLEGUIDE.md, `tsconfig.base.json` |

**Attach (to decide):**

| Mode | Pros | Cons |
| ---- | ---- | ---- |
| Globs `**/*.{ts,tsx}` | Always there when editing code | Overlaps with `ui` rule on UI files — need clear “ui wins for components” |
| Narrower globs (exclude ui path) | Less collision | Easy to miss `apps/`, root scripts |
| Apply Intelligently | Saves tokens | Agent might skip when editing TS |

---

## Arguments FOR a `coding.mdc`

1. Almost every task touches TS — high leverage.
2. Two old rules split TS vs comments but share the same moment (same PR).
3. ESLint does not run inside agent context — rule is the live reminder.
4. STYLE.md is not auto-attached when Cursor opens `foo.ts`.

---

## Arguments AGAINST (or NO / keep split / DEFER)

1. **STYLE.md + ESLint + CI** already enforce much of this — rule is redundant for humans.
2. **255 lines** old typescript rule was heavy — new rule must stay thin or agents ignore it.
3. **UI files** get double rules (`coding` + `ui`) — must define precedence in one line.
4. **Apps/playground** only in commenting globs today — merge fixes that, or proves low value.

---

## Overlap check (duplication?)

| Source | Overlap with coding rule |
| ------ | ------------------------ |
| STYLE.md TypeScript | Yes — rule should be **delta** (what agent forgets), not copy |
| `typescript-conventions.mdc` | Same domain if we write new rule — old file retired later by you |
| `code-commenting.mdc` | Subset of coding — merge, not separate |
| `ui-component-authoring.mdc` | UI-only — coding says “defer to ui rule under `packages/ui/...`” |
| AGENTS | No TS style detail — no duplicate |

---

## Your answers (2026-05-30)

| # | Question | Your answer |
| - | -------- | ----------- |
| 1 | NEED? Name? | **NEED** — unsure `coding` vs clearer name → **`typescript.mdc`** (see below) |
| 2 | One vs two files? | **Two files** — more logic separation (or agent suggestion) |
| 3 | Globs | **`**/*.ts`, `**/*.tsx`** (agreed G1 hybrid; ui-components uses narrower glob) |
| 4 | Agent mistakes often? | **Not sure yet** — need better observe; write **thin** rules from repo baseline, iterate |
| 5 | Naming section? | **Very short** in typescript rule only if no STYLE repeat + link [STYLE.md](../../docs/contributors/STYLE.md) |

### Recommended names (not `coding.mdc`)

| File | Why |
| ---- | --- |
| **`typescript.mdc`** | Cursor + devs know scope instantly; matches old file role |
| **`code-commenting.mdc`** | Already familiar; JSDoc is different concern than TS types |

Skip umbrella `coding.mdc` — vague (sounds like everything). Optional later: `coding/` folder with two files — unnecessary until many rules.

### Two files + globs (agreed)

```yaml
typescript.mdc:        globs: "**/*.ts", "**/*.tsx"
code-commenting.mdc: globs: "**/*.ts", "**/*.tsx"
```

**Precedence:** on `packages/ui/src/components/**`, `ui-components.mdc` wins for CVA/tokens/exports; these two rules for TS + JSDoc.

**Bodies:** fresh write (~80–120 + ~40 lines), not 255-line paste. Observe agent in wave 1; tighten in wave 3.

---

## After discussion

Update [RULES_CATALOG.md](../RULES_CATALOG.md) row for `coding.mdc`, then — if NEED — `rules/plans/coding.md` (implementation plan), not `.mdc` yet.
