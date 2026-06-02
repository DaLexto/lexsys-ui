# Rules catalog (Talas 1) — conclusions only

**Branch:** `chore/rules-wave1-catalog`  
**Updated:** 2026-05-30  

> **Ovaj fajl ne sadrži agentove odluke unapred.**  
> Svaki rule: **predlog u `proposals/` → zajednička diskusija → ti i ja zaključimo → upis u tabelu ispod.**

---

## Kako radimo (redosled)

```txt
1. Otvorimo jedan fajl: rules/plans/proposals/NN-<name>-proposal.md
2. Razgovor u chatu — zašto da / zašto ne / šta tačno rule drži
3. Ti kažeš: zaključeno NEED | NO | DEFER
4. Upišemo red u "Catalog conclusions" + po potrebi RULES_REPLACEMENT_MAP
5. Sledeći predlog — tek kad prethodni ima status ≠ pending
```

**Ne pišemo** `rules/<name>.mdc` dok red nije **NEED** i nema odobren `rules/plans/<name>.md` (per-rule implementacioni plan).

---

## Kako odlučujemo (kriterijumi — ista za svaki predlog)

| Pitanje | Ako da → razmotri NEED | Ako ne → NO ili DEFER |
| -------- | ---------------------- | --------------------- |
| Da li agent **često** edituje te fajlove? | | |
| Da li se ista greška **ponavlja** pri edit-u? | | |
| Da li **docs** već daju sve što treba u kontekstu? | NO rule | |
| Da li je problem **procedura** (koraci)? | skill, ne rule | |
| Da li bi rule **duplirao** domain spec? | NO — link na doc | |

**Slojevi:** rule = edit-time **šta sada**; docs = ugovor; skills = **kako**.

---

## Red za diskusiju (redosled predloga — nije odluka)

| # | Predlog fajl | Tema | Status u katalogu |
| - | ------------ | ---- | ----------------- |
| 1 | [01-architecture-proposal.md](./proposals/01-architecture-proposal.md) | Monorepo map, package boundaries, gde editovati | **DEFER** |
| 2 | [02-coding-proposal.md](./proposals/02-coding-proposal.md) | TS + JSDoc pri edit-u `.ts`/`.tsx` | **done** → 2× NEED |
| 3 | [03-ui-proposal.md](./proposals/03-ui-proposal.md) | UI components — CVA, tokens, exports | **done** → NEED |
| 4 | [04-testing-proposal.md](./proposals/04-testing-proposal.md) | Vitest / test notify | **done** → NEED |
| 5 | [05-documentation-proposal.md](./proposals/05-documentation-proposal.md) | docs layout + INDEX routing | **done** → NEED |
| 6 | — | Naming → u `typescript.mdc` + STYLE | **NO** (skip proposal) |
| 7 | [07-release-proposal.md](./proposals/07-release-proposal.md) | Release / changelog / deploy | **NO** |

Dodaj/redaj redove pre #2 ako želiš drugačiji redosled.

---

## Catalog conclusions

| Rule (ako NEED) | Status | Zaključak (jedna rečenica) | Datum | Proposal |
| --------------- | ------ | -------------------------- | ----- | -------- |
| `architecture.mdc` | **DEFER** | Rare wrong-package edits; revisit after other proposals; name `architecture` if ever NEED | 2026-05-30 | [01](./proposals/01-architecture-proposal.md) |
| `typescript.mdc` | **NEED** | TS strict; globs `**/*.ts`, `**/*.tsx`; thin + observe; naming → STYLE | 2026-05-30 | [02](./proposals/02-coding-proposal.md) |
| `code-commenting.mdc` | **NEED** | JSDoc/inline; globs `**/*.ts`, `**/*.tsx`; separate from typescript | 2026-05-30 | [02](./proposals/02-coding-proposal.md) |
| `ui-components.mdc` | **NEED** | UI standards; glob `components/**`; body after analysis; skill name TBD wave 2 | 2026-05-30 | [03](./proposals/03-ui-proposal.md) |
| `testing.mdc` | **NEED** | globs `packages/**/*.test.{ts,tsx}`, `packages/**/vitest.config.ts`; no agent test runs — notify URADI TEST; test skill wave 2 | 2026-05-30 | [04](./proposals/04-testing-proposal.md) |
| `documentation.mdc` | **NEED** | One file; globs `docs/**/*.md`; INDEX+layout; skills 5a; README/AGENTS later rule | 2026-05-30 | [05](./proposals/05-documentation-proposal.md) |
| `naming.mdc` | NO | Fold into `typescript.mdc` — short pointer to STYLE only | 2026-05-30 | [02](./proposals/02-coding-proposal.md) |
| `release.mdc` | **NO** | Manual release via skills/routines; AGENTS + git-commits + DEPLOY + changelog skills | 2026-05-30 | [07](./proposals/07-release-proposal.md) |

**Legenda:** `pending` → `discussing` → `NEED` | `NO` | `DEFER`

---

## Attach strategy (agreed — G1 hybrid)

| Rule | `alwaysApply` | `globs` |
| ---- | ------------- | ------- |
| `typescript.mdc` | `false` | `**/*.ts`, `**/*.tsx` |
| `code-commenting.mdc` | `false` | `**/*.ts`, `**/*.tsx` |
| `ui-components.mdc` | `false` | `packages/ui/src/components/**/*` |

**On `packages/ui/.../Button.tsx`:** typescript + commenting + ui-components. **On `packages/ui/test/.../Button.test.tsx`:** testing + typescript + commenting (no ui-components). **On `packages/*/vitest.config.ts`:** testing only (+ typescript if .ts).

**On `packages/cli/.../foo.ts`:** typescript + commenting only (ui-components does not).

**Skill (wave 2 — name TBD):** today **`$ui-authoring`**; may rename or replace (e.g. `$component-write`) when refactoring skills — **not decided in wave 1**. Rules = WHAT at edit time; skill = HOW. Globs do not depend on skill name.

Cursor skills do not invoke rules as API; globs + procedure skill work together.

---

## Enterprise reference (informativno)

Timovi dodaju scoped `.mdc` kad je cena greške pri edit-u visoka; izbegavaju rule kad docs/skills/CI već drže ponašanje. Detalji u svakom proposal fajlu po potrebi.

---

## Legacy map

Stari `.cursor/rules/` → novi fajl: samo [RULES_REPLACEMENT_MAP.txt](../../RULES_REPLACEMENT_MAP.txt), **posle** NEED zaključka. Ne koristi se za odluku treba li rule.

---

## Sledeći korak

## Wave 1 — write these in `rules/` (after per-rule plan + OK)

| File | Globs (agreed) |
| ---- | -------------- |
| `typescript.mdc` | `**/*.ts`, `**/*.tsx` |
| `code-commenting.mdc` | `**/*.ts`, `**/*.tsx` |
| `ui-components.mdc` | `packages/ui/src/components/**/*` (body after UI analysis) |
| `testing.mdc` | `packages/**/*.test.ts`, `*.test.tsx`, `packages/**/vitest.config.ts` |
| `documentation.mdc` | `docs/**/*.md` |

**DEFER:** `architecture.mdc` · **NO:** `naming.mdc`, `release.mdc` · **Later:** README/AGENTS rule, `tech-stack` revisit, test/release skills (wave 2)

**Sledeći korak:** per-rule plan (npr. `typescript.md`) ili UI component analysis — reci šta prvo.
