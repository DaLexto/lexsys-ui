# Implementation plan: `ui-components.mdc`

**Status:** shipped (sandbox) — rewritten 2026-05-30 from component analysis  
**Catalog:** NEED (2026-05-30)  
**Proposal:** [03-ui-proposal.md](./proposals/03-ui-proposal.md)  
**Replaces (later):** `.cursor/rules/ui-component-authoring.mdc`

---

## Goal

Edit-time standards for `packages/ui/src/components/**` only — variant pattern, tokens, className/ref, layer exports, registry two-zone pointer. **How** (create/delete, test layout, gate sequence) stays in **`$ui-authoring`** (name may change wave 2).

---

## Frontmatter (copy-ready)

```yaml
---
description: UI component standards for packages/ui — CVA vs *Classes(), token prefix, exports, registry pointer. Use when editing components under packages/ui/src/components/.
globs:
  - "packages/ui/src/components/**/*"
alwaysApply: false
---
```

---

## Scope and precedence

| Applies | Does not apply |
| ------- | -------------- |
| `primitives/`, `blocks/`, `templates/` under `packages/ui/src/components/` | `packages/ui/test/**` → `testing.mdc` |
| `*.tsx`, `*.types.ts`, `*.variants.ts` | Package root, `packages/ui/src/index.ts` export policy (mention in rule) |
| CVA, tokens, UI exports | TS `any`, JSDoc → `typescript.mdc` + `code-commenting.mdc` |

**Precedence (required):** For variant classes, token prefix, and layer exports, **this rule wins** over `typescript.mdc`. TS and JSDoc rules still apply for types and comments.

**Co-attach:** Editing `Button.tsx` may load 3 rules — keep this file **~80–100 lines** (proposal A+C).

---

## Pre-write step: component analysis (optional tighten)

Before or right after first `.mdc` draft, quick pass on `packages/ui/src/components/`:

| Check | Look for |
| ----- | -------- |
| Variant drift | `cva()` under `blocks/` or `templates/` |
| Token drift | Raw palette (`bg-blue-500`, `text-gray-*`) in `*.variants.ts` |
| Export drift | Blocks/templates re-exported from `packages/ui/src/index.ts` |
| className | `mergeClassName` only on Base UI state callbacks |
| File shape | Missing `.types.ts` / `.variants.ts` split |

**Output:** Add 0–5 extra **Do not** bullets to §3 below if analysis finds repeats. If analysis deferred, ship baseline §3 and iterate in wave 3.

---

## Body outline (~80–100 lines)

### 1. Scope + skill pointer (5 lines)

- Path: `packages/ui/src/components/{primitives,blocks,templates}/`.
- Three-file shape: `ComponentName.tsx`, `.types.ts`, `.variants.ts` — link [UI.md](../../docs/reference/ui/UI.md).
- Procedures: **`$ui-authoring`** (wave 2 rename possible).

### 2. Three-file contract (short)

- `.tsx` — render, ref, `displayName`, bottom export block.
- `.types.ts` — public props, explicit `ref?: React.Ref<...>`.
- `.variants.ts` — visual classes only.

### 3. Do not (baseline — refine after analysis)

- `cva()` in **blocks** or **templates**.
- Raw Tailwind palette in `*.variants.ts` — use `cssVarPrefix` tokens (`bg-(--lex-…)`).
- Export blocks/templates from `packages/ui/src/index.ts`.
- Edit `packages/registry/templates/` directly.
- `mergeClassName` outside Base UI `className` callbacks.
- String-concat class names instead of `cn()`.

### 4. Variant pattern (table)

| Layer | Pattern |
| ----- | ------- |
| Primitives | `cva()` → `export const xyzClasses = cva(...)` |
| Blocks / templates | `export const xyzClasses = (props) => cn(...)` — no CVA grid |

Link: [UI_VARIANTS.md](../../docs/reference/ui/UI_VARIANTS.md), [UI_AUDIT.md](../../docs/reference/ui/UI_AUDIT.md).

### 5. Token prefix (5–8 lines)

- `cssVarPrefix` from `packages/tokens/src/generators/generator.config.ts` (currently `lex`).
- One good / one bad example max.
- `pnpm ui:check` runs audit — pointer only, not full command doc.

### 6. className and ref (compact)

- `cn()` for static merge; `mergeClassName()` for Base UI state callbacks only.
- New components: React 19 `ref` prop; do not refactor existing `forwardRef` unless asked.
- Link UI.md for Base UI boundaries.

### 7. Layer exports (table)

| Layer | Export from `packages/ui/src/index.ts` |
| ----- | -------------------------------------- |
| Primitives | Yes |
| Blocks / templates | No — registry-first / `lexsys add` |

Link: [UI_CATALOG.md](../../docs/reference/ui/UI_CATALOG.md), [UI_COMPOSITION.md](../../docs/reference/ui/UI_COMPOSITION.md).

### 8. Locked decisions (keep short — CS.4)

- Sidebar nav items: plain `<a>` / `<button>`, not `Button` primitive.
- `SidebarTrigger` / `Drawer` composability — one line each or link UI.md.

### 9. Registry two-zone (minimal diagram)

```txt
packages/registry/src/items/<name>.ts  — manual metadata
packages/registry/templates/         — generated; never edit
```

- Primitives: `pnpm registry:sync` scaffolds item if missing — review after.
- Blocks/templates: item file **manual** (`type: "block"`, deps).
- Install-affecting UI edit → **`$registry-sync`** (one line).

### 10. Post-edit (notify only — no agent runs unless you ask)

- Do **not** run `pnpm ui:check` / `registry:sync` by default in agent flow.
- End with: install-affecting change → tell user to run gates or load `$ui-authoring` / `$registry-sync`.

(Optional align with testing rule: `*** URADI TEST za: ui ***` when tests touched — cross-ref `testing.mdc`.)

### 11. See also

- UI.md, UI_VARIANTS.md, UI_COMPOSITION.md
- REGISTRY.md (metadata contract)
- `typescript.mdc`, `code-commenting.mdc`

---

## Must NOT include

- Step-by-step component create/delete.
- Full test file patterns (→ `$ui-authoring`, `testing.mdc`).
- SCRIPTS.md command tables.
- 116-line copy of old rule — fresh wording.

---

## Target size

| Budget | Lines |
| ------ | ----- |
| Domain rule | **80–100** |

---

## Source material

- [ui-component-authoring.mdc](../../.cursor/rules/ui-component-authoring.mdc)
- [03-ui-proposal.md](./proposals/03-ui-proposal.md)
- Docs: UI.md, UI_VARIANTS.md, UI_COMPOSITION.md, UI_CATALOG.md
- [.agents/skills/ui-authoring/SKILL.md](../../.agents/skills/ui-authoring/SKILL.md) — do not duplicate steps

---

## Verification before ship

- [ ] Glob does not include `packages/ui/test/**`.
- [ ] Precedence vs typescript + commenting stated.
- [ ] Registry templates marked generated-only.
- [ ] No full `pnpm` gate prose (skill/links only).

---

## After your OK

1. Optional: 30-min component scan → update §3 bullets.
2. Write `rules/ui-components.mdc`.
3. Test attach: open `Button.tsx` vs `Button.variants.test.ts` (expect 3 rules vs 2 rules).
