# Implementation plan: `typescript.mdc`

**Status:** shipped (sandbox) — `rules/typescript.mdc` written 2026-05-30; awaiting your spot-check before rule 2  
**Catalog:** NEED (2026-05-30)  
**Proposal:** [02-coding-proposal.md](./proposals/02-coding-proposal.md)  
**Replaces (later):** `.cursor/rules/typescript-conventions.mdc`

---

## Goal

Thin **edit-time** TypeScript checklist for any `.ts` / `.tsx` in the monorepo. Delta over [STYLE.md](../../docs/contributors/STYLE.md) § TypeScript — what agents forget, not a copy of STYLE or the old 255-line rule.

---

## Frontmatter (copy-ready)

```yaml
---
description: TypeScript conventions for Lexsys — import type, no any, catch typing, export style, ESM boundaries. Apply when editing .ts or .tsx.
globs:
  - "**/*.ts"
  - "**/*.tsx"
alwaysApply: false
---
```

---

## Scope and precedence

| Applies | Does not apply |
| ------- | -------------- |
| All `**/*.ts`, `**/*.tsx` (packages, apps, root scripts) | Markdown, `.mdc` rules |
| TS style on any path | UI variant/CVA/token rules → **`ui-components.mdc`** under `packages/ui/src/components/**` |
| Generic naming reminder | Full naming tables → [STYLE.md](../../docs/contributors/STYLE.md) § Naming only |

**Precedence line (required in body):** On `packages/ui/src/components/**`, this rule covers **TypeScript only**; CVA, `cssVarPrefix`, layer exports → `ui-components.mdc`.

---

## Body outline (~80–120 lines)

Write in this order. Max **2** tiny code examples total (only if they prevent a repeat mistake).

### 1. Scope (3–5 lines)

- Strict TS 6.x; shared baseline `tsconfig.base.json`.
- Link: STYLE.md § TypeScript, `tsconfig.base.json`.

### 2. Do not (bullet list)

- `any` (explicit or implicit); untyped `catch (e)` without `unknown`.
- Value-import of types (`import { Foo }` when `Foo` is type-only).
- `export function` — use `export const` arrows.
- TypeScript `enum`.
- Non-null assertion `!`.
- Deep-import another package's `src/` or internal `dist/` — `package.json` `exports` only.

### 3. Import style

- `import type` / inline `type` in mixed imports.
- One line per module when possible (no duplicate import lines from same path).
- `node:` protocol for Node built-ins in cli/registry.

### 4. Module resolution (short table)

| Package area | Relative import extension |
| ------------ | ------------------------- |
| `packages/ui`, `packages/tokens` | Bundler — no `.js` on relatives |
| `packages/cli`, `packages/registry` | NodeNext — **`.js`** on relatives |

### 5. Errors and boundaries

- `catch (error: unknown)` + narrow before use.
- CLI: `CliError` + `handleCliError` — link STYLE or `packages/cli` pattern, no full API dump.
- JSON/config boundaries: narrow from `unknown`, not `as any`.
- `@ts-expect-error` preferred over `@ts-ignore`; one-line why if used.

### 6. Types and exports

- `interface` for extendable object props; `type` for unions/mapped/generics.
- String literal unions + `as const`, not `enum`.
- Exported functions: explicit return type; internal helpers may infer.
- UI components: JSX return may infer; still `export const` + bottom `export { }` block per STYLE.
- `satisfies`: only for const objects/literals where literal inference matters — 1 sentence + link STYLE, not a tutorial.

### 7. Type assertions

- Prefer guards; if assert, via `unknown`.
- No `!`.

### 8. Naming (≤5 lines)

- File/export/casing: follow [STYLE.md](../../docs/contributors/STYLE.md) § Naming — **no** duplicate tables here.

### 9. See also

- STYLE.md, STYLEGUIDE.md
- `ui-components.mdc` (under `packages/ui/src/components/**`)
- `code-commenting.mdc` (JSDoc — separate rule)
- AGENTS.md guardrails (package boundaries) — one line, no map duplicate

---

## Must NOT include

- Full STYLE.md TypeScript section.
- CVA, `mergeClassName`, token prefix, registry sync steps.
- `pnpm` command tables → SCRIPTS.md / skills.
- Dependency versions → `tech-stack.mdc` (intelligent apply, separate topic).
- Monorepo directory map → DEFER `architecture.mdc`.

---

## Target size

| Budget | Lines |
| ------ | ----- |
| Domain rule | **80–120** |

---

## Source material (read, do not paste)

- [typescript-conventions.mdc](../../.cursor/rules/typescript-conventions.mdc) — extract checklist only.
- [STYLE.md](../../docs/contributors/STYLE.md) § TypeScript, § Imports and Exports, § Naming (pointer).
- [AGENTS.md](../../AGENTS.md) — package boundary one-liner.

---

## Verification before ship

- [ ] Frontmatter globs match [RULES_CATALOG.md](./RULES_CATALOG.md) G1 hybrid.
- [ ] Precedence line mentions `ui-components.mdc`.
- [ ] No section duplicates ui-components or code-commenting.
- [ ] Line count ≤120 (excluding frontmatter).

---

## After your OK

1. Write `rules/typescript.mdc` (sandbox).
2. You review in Cursor on a sample file (`packages/cli/src/...`, `packages/ui/src/components/.../Button.tsx`).
3. Wave 3: move to `.cursor/rules/`, archive old file per [RULES_REPLACEMENT_MAP.txt](../../RULES_REPLACEMENT_MAP.txt).
