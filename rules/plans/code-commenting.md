# Implementation plan: `code-commenting.mdc`

**Status:** shipped (sandbox) — `rules/code-commenting.mdc` written 2026-05-30  
**Catalog:** NEED (2026-05-30)  
**Proposal:** [02-coding-proposal.md](./proposals/02-coding-proposal.md)  
**Replaces (later):** `.cursor/rules/code-commenting.mdc` (same name; fresh body + wider globs)

---

## Goal

Separate **comment/JSDoc** edit-time rule from `typescript.mdc`. Same globs as TS; agents get JSDoc reminders when touching exports without loading 100+ lines of type rules for comment-only edits (and vice versa).

---

## Frontmatter (copy-ready)

```yaml
---
description: JSDoc and inline comment standards for Lexsys TypeScript source and tests.
globs:
  - "**/*.ts"
  - "**/*.tsx"
alwaysApply: false
---
```

**Change from old rule:** globs were `packages/**/src`, `test`, `apps/**/src` only — **new** = all `**/*.ts(x)` (matches catalog G1; fixes root/scripts gaps).

---

## Scope and precedence

| Applies | Does not apply |
| ------- | -------------- |
| `.ts` / `.tsx` including `packages/**/test/**` | `docs/**/*.md` → `documentation.mdc` |
| Exported APIs in source | Domain spec prose in docs |

**Precedence:** Does not override TS types (`typescript.mdc`) or UI variant rules (`ui-components.mdc`). Comments explain **why**, not restate types already in signatures.

---

## Body outline (~35–50 lines)

### 1. Scope (2–3 lines)

- Source and test **code** only — not markdown.
- Link: STYLE.md § Comments.

### 2. JSDoc — exported symbols (MUST)

All **new or changed** exported functions, classes, public methods:

- Brief behavior description (not the name repeated).
- `@param` with purpose (type optional if obvious from TS).
- `@returns` when not `void`.
- `@throws` when function throws by contract.

### 3. Inline comments

- Explain **why**, not what the code already says.
- `// TODO:`, `// NOTE:`, `// FIXME:` — include ticket/context when known.
- Do not add noise (`// increment i`).

### 4. ESLint

- Public exports should satisfy doc lint; do not disable missing-docs rules without documented exception.

### 5. Agent behavior

- When generating or refactoring exported APIs, add/update JSDoc in the **same** change.
- Do not add JSDoc blocks to non-exported internals unless clarifying non-obvious invariant.

### 6. See also

- `typescript.mdc`
- `documentation.mdc` (docs only)

---

## Must NOT include

- TypeScript type rules (imports, `any`, `export const`).
- UI/CVA/token content.
- Markdown layout / INDEX routing.

---

## Target size

| Budget | Lines |
| ------ | ----- |
| Domain rule (narrow) | **35–50** |

---

## Source material

- Current [code-commenting.mdc](../../.cursor/rules/code-commenting.mdc) — structure is fine; expand scope note in frontmatter only.
- [STYLE.md](../../docs/contributors/STYLE.md) § Comments.

---

## Verification before ship

- [ ] Globs `**/*.ts`, `**/*.tsx` (not narrower than typescript).
- [ ] Explicit “not docs/**/*.md”.
- [ ] No duplicate of typescript.mdc sections.

---

## After your OK

1. Write `rules/code-commenting.mdc`.
2. Spot-check: new export in `packages/registry/src/` and in `packages/ui/test/.../*.test.ts`.
