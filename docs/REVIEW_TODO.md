# Neurex Backlog

**Audience:** Maintainers
**Type:** Roadmap / backlog
**Source of truth for:** Active work items, known gaps, next priorities

Long-term tokens platform direction lives in [docs/ROADMAP.md](./ROADMAP.md).

Completed work is tracked in git history. This document only contains items
that are not yet done.

---

## Current State

The P0 and P1 implementation passes are complete:

- CLI install safety (idempotency, conflict detection, `--cwd` scoping, packed template resolution)
- Token foundation (DTCG-shaped source, CSS + DTCG JSON generation, brand layer, theme modes)
- Token platform phases 1–5 (factory authoring, layer validation, governance reports)
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

`Dialog.variants.ts` uses hardcoded stacking and elevation classes (`z-40`, `z-50`, `shadow-lg`) because semantic elevation roles and component token wiring are not defined yet. Primitive scales already exist in `packages/tokens/src/primitives/z-index.ts` and `shadow.ts`.

**Direction:**

- Add semantic elevation and layering roles in `packages/tokens/src/semantics/` that map from the existing primitive z-index and shadow scales.
- Replace hardcoded Dialog (and other overlay) stacking values with component CSS variables:
  - `--nx-dialog-backdrop-z-index`
  - `--nx-dialog-viewport-z-index`
  - `--nx-dialog-popup-shadow`
- Apply the same pattern to other overlay components that use hardcoded `z-*` or `shadow-*`.
- Do not introduce placeholder tokens — model the semantic roles properly first.

**Status:** Not started. Hardcoded values are acceptable markers for now but must be resolved before Dialog token integration is declared complete.

---

## P3 — Architecture Planning

### TODO: Turn resolver roadmap into an implementation plan

**Problem:**

`docs/RESOLVER_EVOLUTION.md` captures long-term resolver capabilities (AST
evaluation, color math, contrast diagnostics, composite expansion, metadata
propagation) but it is not sequenced into implementable phases beyond the work
already shipped (layer validation and governance reports).

**Direction:**

- Review `docs/RESOLVER_EVOLUTION.md` against the current
  `packages/tokens/src/resolver/` and generator architecture.
- Split the vision into phases: what extends the current resolver, what needs a
  new subsystem, what is speculative.
- Keep speculative items (AST evaluator, color math engine) clearly separated
  from near-term work.
- Update `docs/RESOLVER_EVOLUTION.md` with the phased plan once sequencing is
  decided.

**Status:** Not started. Layer validation and governance reporting are already
implemented; this item covers the remaining resolver evolution only.

---

## Known Gaps (no active item yet)

| Gap                                       | Notes                                                                                    |
| ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| `neurex uninstall` not implemented        | Command exists in CLI surface but has no behavior. Tracked in `docs/CLI.md`.             |
| No render tests for UI components         | Only CVA class output is tested. No `@testing-library/react` coverage.                   |
| Next.js and other framework scaffolds     | `neurex init` only supports Vite. Other frameworks are not detected or scaffolded.       |
| Remote registry manifest contract         | Remote registry format and trust model are not finalized.                                |
