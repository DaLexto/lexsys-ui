# Proposal (discussion): `architecture.mdc`?

**Status:** open — not in catalog as NEED/NO yet  
**Catalog #:** 1

---

## What problem might this rule solve?

When an agent (or you) edits Lexsys, mistakes that are **frequent** and **not** fixed by reading one open file:

- Editing the wrong package (e.g. install logic in `ui` instead of `registry` / `cli`)
- Deep-importing another package's `src/` or `dist/`
- Hand-editing generated output (`dist/`, `packages/registry/templates/`, generated token CSS)
- Not knowing which doc owns a topic (duplicate spec in the wrong place)

These show up on **many** tasks, not only “architecture work.”

---

## What would NOT go in this rule

- Full token/CLI/registry specs → [docs/INDEX.md](../../../docs/INDEX.md) owners
- Step-by-step `pnpm registry:sync` → `$registry-sync` skill
- Version matrix / dependency catalog → docs + `package.json`, not a 300-line rule
- Git/PR policy → `$git-commit` / git-commits.mdc

---

## If we said NEED — what would the rule actually contain? (~80–120 lines)

| Section | Content |
| ------- | ------- |
| Scope | Monorepo packages; where source vs `dist/`; public API via `exports` only |
| Do not | Cross-package `src/` imports; edit `templates/`; hand-write token CSS |
| Edit map (table) | Task → primary path → doc link (thin, like today’s project-structure intent) |
| When editing | Confirm package; link INDEX for domain rules |
| See also | ARCHITECTURE.md, AGENTS.md |

**Attach:** likely `alwaysApply: true` **or** very wide globs — **to decide in discussion** (cost: tokens every chat vs missed attach).

---

## Arguments FOR having this rule

1. **High blast radius** — one wrong package edit wastes a PR.
2. **AGENTS.md** routes but does not replace a **dense edit map** when context is full of code files.
3. **ARCHITECTURE.md** is long; agents may not load it when tweaking a single file.
4. Enterprise pattern: one thin `core` / `monorepo` rule.

---

## Arguments AGAINST (or for NO / merge elsewhere)

1. **AGENTS guardrails** already list registry-two-zone, branch policy, etc. — is that enough?
2. **Duplicate** if we also write `coding` / `ui` rules that repeat “you are in packages/ui”.
3. **`alwaysApply` cost** — burns context; narrow globs might miss edits in odd paths.
4. Could be **one section in AGENTS** only (no `.mdc`) — you prefer fewer layers?

---

## Alternatives if NO dedicated rule

| Alternative | Tradeoff |
| ----------- | -------- |
| Stronger AGENTS § only | Always loaded in agent context; no glob attach drama |
| Docs only | Cheaper context but not attached on code edits |
| Fold into `coding.mdc` | Smaller file count; mixes “where” with “how to write TS” |

---

## Questions for you (answer in chat)

1. Do you **feel** wrong-package / wrong-folder edits happen often enough to warrant a rule?
2. **`alwaysApply: true`** vs globs — what’s your tolerance for always-on context?
3. Should **dependency-layer rules** (don’t add X dep to tokens package) live here or only in docs?
4. Anything **missing** from “architecture” scope — or should this be renamed (e.g. `monorepo.mdc`)?

---

## Your answers (2026-05-30)

| # | Question | Your answer |
| - | -------- | ----------- |
| 1 | Wrong package / folder often? | **No** — lower priority for a heavy always-on map |
| 2 | `alwaysApply`? | Asked for explanation (see catalog / chat) |
| 3 | `tech-stack` attach mode | **Apply Intelligently** (agent picks from `description`) |
| 4 | Rule name | **`architecture`** (not `monorepo`) |

**Catalog:** **DEFER** — revisit after proposals #2–#7; rare wrong-package edits; if ever written, name `architecture`, not alwaysApply.

---

## After discussion

When we agree, update [RULES_CATALOG.md](../RULES_CATALOG.md) row for `architecture.mdc`:

- Status: `NEED` | `NO` | `DEFER`
- One-sentence **why** (your words + mine)

Then — if NEED — open `rules/plans/architecture.md` (implementation plan), not the `.mdc` yet.
