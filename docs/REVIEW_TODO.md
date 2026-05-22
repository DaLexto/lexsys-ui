# Neurex Backlog

**Audience:** Maintainers
**Type:** Roadmap / backlog
**Source of truth for:** Active work items, known gaps, next priorities

Completed work is tracked in git history. This document only contains items
that are not yet done.

---

## Current State

The P0 and P1 implementation passes are complete:

- CLI install safety (idempotency, conflict detection, `--cwd` scoping, packed template resolution)
- Token foundation (DTCG-shaped source, CSS + DTCG JSON generation, brand layer, theme modes)
- Style installation (token CSS wired into consumer project on `neurex init` / `neurex add`)
- Tailwind v4 + Vite init sequence
- Registry validation and publish-safe template resolution
- Documentation rewrite (all package READMEs, domain docs, architecture, CLI, tokens, design system)

The current implementation supports: Vite + React + Tailwind v4, `neurex init`, `neurex add`, `neurex update`, all 31 bundled components.

Known gaps below.

---

## P2 — Product and DX

### TODO: Tokenize Dialog stacking and elevation values

**Problem:**

`Dialog.variants.ts` uses hardcoded stacking and elevation classes (`z-40`, `z-50`, `shadow-lg`) because the token system does not yet include z-index or shadow/elevation token families.

**Direction:**

- Add z-index and shadow/elevation token families to `packages/tokens/src/primitives/` and `src/semantics/`.
- Replace hardcoded Dialog (and other overlay) stacking values with component CSS variables:
  - `--nx-dialog-backdrop-z-index`
  - `--nx-dialog-viewport-z-index`
  - `--nx-dialog-popup-shadow`
- Apply the same pattern to other overlay components that use hardcoded `z-*` or `shadow-*`.
- Do not introduce placeholder tokens — model the token family properly first.

**Status:** Not started. Hardcoded values are acceptable markers for now but must be resolved before Dialog token integration is declared complete.

---

## P3 — Architecture Planning

### TODO: Turn resolver roadmap into an implementation plan

**Problem:**

`docs/RESOLVER_EVOLUTION.md` captures a long-term resolver vision (layer enforcement, AST evaluation, color math, contrast diagnostics, dead token detection) but it is not sequenced into implementable phases.

**Direction:**

- Review `docs/RESOLVER_EVOLUTION.md` against the current `packages/tokens/src/resolver/` and generator architecture.
- Split the vision into phases: what can be added to the current resolver, what needs a new subsystem, what is speculative.
- Identify the first small slice — likely layer enforcement (component→primitive violation detection).
- Keep speculative items (AST evaluator, color math engine) clearly separated from near-term work.
- Update `docs/RESOLVER_EVOLUTION.md` with the phased plan once sequencing is decided.

**Status:** Not started.

---

## Known Gaps (no active item yet)

| Gap | Notes |
|---|---|
| `neurex uninstall` not implemented | Command exists in CLI surface but has no behavior. Tracked in `docs/CLI.md`. |
| No render tests for UI components | Only CVA class output is tested. No `@testing-library/react` coverage. |
| Token layer violation checks not enforced | Component→primitive/brand references are not caught at build time. See `docs/TOKENS.md`. |
| Next.js and other framework scaffolds | `neurex init` only supports Vite. Other frameworks are not detected or scaffolded. |
| Remote registry manifest contract | Remote registry format and trust model are not finalized. |
