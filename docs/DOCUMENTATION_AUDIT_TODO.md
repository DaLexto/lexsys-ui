# Documentation Audit TODO: tokens/foundation vs refactor/tokens

## Purpose

This file turns the documentation audit into a working TODO list.

Audit scope:

- `tokens/foundation` documentation
- `refactor/tokens` documentation
- current implementation under `packages/tokens/`

Rules for using this TODO:

- Work one checkbox at a time.
- Do not assume either branch is fully correct.
- Use current code as evidence before changing documentation.
- Keep architectural target wording separate from currently enforced behavior.

---

## Summary

- [x] Align docs with current package identity: `@neurex/tokens`.
- [x] Restore the distinction between CLI style alias `default` and token preset id `neurex`.
- [x] Document the current brand layer as canonical.
- [x] Restore accurate DTCG generated output documentation.
- [x] Fix stale `REVIEW_TODO.md` token migration history.
- [x] Decide how strict component-token layer rules should be before documenting them as build-failing.
- [x] Update examples to use real generated CSS variable names.

---

## High Confidence Imports From `refactor/tokens`

### DONE: Restore CLI Alias vs Token Preset ID Wording

- [x] Update `README.md`.
- [x] Update `docs/DESIGN_SYSTEM.md`.
- [x] Update `docs/ARCHITECTURE.md`.
- [x] Update `docs/CLI.md` if needed.

Category: `IMPORT_FROM_REFACTOR_TOKENS`

What changed:

- `tokens/foundation` simplified the first preset wording to `default` / `Neurex Default`.
- `refactor/tokens` documented the real split:
  - consumer config key: `default`
  - token preset id: `neurex`
  - brand: `neurex`

Current code proves:

- `packages/cli/src/core/config.ts` uses `style: "default"`.
- `packages/tokens/src/presets/neurex.preset.ts` uses `id: "neurex"`.
- `defaultPresetId` is `"neurex"`.

Recommendation:

- Restore the alias/id distinction.
- Say `default` is the CLI/config alias and `neurex` is the current token package preset id until preset selection is formalized.

Confidence: High

### DONE: Restore DTCG Package Output Documentation

- [x] Update `docs/DESIGN_SYSTEM.md`.
- [x] Update `docs/DEPLOY.md`.
- [x] Update `docs/STYLEGUIDE.md`.
- [x] Update `README.md` if relevant.

Category: `IMPORT_FROM_REFACTOR_TOKENS`

What changed:

- `tokens/foundation` removed or reduced DTCG generated output documentation.
- `refactor/tokens` documented `dist/tokens/dtcg/**/*.tokens.json`.

Current code proves:

- `createStyleOutputs()` returns `tokensJson`, `themesJson`, and `tokenJsonFiles`.
- `generator.create.ts` writes paths under:
  - `tokens/dtcg/tokens.tokens.json`
  - `tokens/dtcg/primitives/*.tokens.json`
  - `tokens/dtcg/brand/*.tokens.json`
  - `tokens/dtcg/semantics/*.tokens.json`
  - `tokens/dtcg/components/*.tokens.json`
  - `tokens/dtcg/themes/*.tokens.json`
- `generator.write.ts` writes those files into package `dist`.

Recommendation:

- Restore DTCG output docs.
- Update old refactor wording to include the current `brand` folder.
- Keep clear that CSS exports are public today, while JSON package exports are deferred.

Confidence: High

### DONE: Restore 2026-05-12 Token Progress Snapshot

- [x] Update `docs/REVIEW_TODO.md`.

Category: `IMPORT_FROM_REFACTOR_TOKENS`

What changed:

- `tokens/foundation` removed the 2026-05-12 snapshot that documented token preset id `neurex`, brand `neurex`, DTCG JSON output, and deferred JSON exports.

Current code proves:

- The preset/brand/DTCG statements are still true.
- Explicit JSON package exports are still not present in `packages/tokens/package.json`.

Recommendation:

- Restore the useful parts of the snapshot.
- Compress if needed.
- Update wording from branch-specific `refactor/tokens` to current branch state.

Confidence: High

### DONE: Restore Folder-Context Naming Rule

- [x] Update `docs/STYLE.md`.

Category: `IMPORT_FROM_REFACTOR_TOKENS`

What changed:

- `tokens/foundation` removed naming guidance that folder context can carry repeated file meaning.

Current code proves:

- Current token files use folder context:
  - `primitives/color.ts`
  - `semantics/color.ts`
  - `themes/neurex/light.ts`
- Mixed `packages/tokens` folders still use role labels:
  - `resolver.types.ts`
  - `resolver.utils.ts`
  - `generator.create.ts`
  - `generator.write.ts`
  - `css.generator.ts`

Recommendation:

- Restore the `packages/tokens` part of the rule from `refactor/tokens`.
- Do not import component `.types.ts` / `.variants.ts` examples for this
  token-package alignment pass.

Confidence: High

---

## Foundation Docs That Should Stay

### DONE: Keep Canonical Brand Layer Model

- [x] Keep `docs/TOKENS.md` layer model.
- [x] Keep matching wording in `docs/ARCHITECTURE.md`.
- [x] Keep matching wording in `docs/STYLEGUIDE.md`.

Category: `KEEP_FROM_FOUNDATION`

What changed:

- `tokens/foundation` introduced the canonical dependency chain:
  `primitives -> brand -> semantics -> components`.

Current code proves:

- `packages/tokens/src/brand/` exists.
- `brandTokens` is assembled into generator input.
- Semantics now reference brand tokens for brand-specific values.

Recommendation:

- Keep this architecture as the foundation.
- Only adjust enforcement wording where current code is not strict yet.
- No source documentation change needed for this item; current docs already
  describe the `packages/tokens` brand layer model.

Confidence: High

### TODO: Keep Themes Override Semantics Wording

- [ ] Keep theme override model in `docs/TOKENS.md`.
- [ ] Keep theme override model in `docs/DESIGN_SYSTEM.md`.
- [ ] Keep theme override model in `docs/ARCHITECTURE.md`.

Category: `KEEP_FROM_FOUNDATION`

What changed:

- Foundation docs clarify that themes override semantic values per mode and are not a fifth token layer.

Current code proves:

- Themes are defined under `packages/tokens/src/themes/neurex/`.
- Generator input filters themes by active preset.
- Themed validation merges foundation tokens, theme tokens, then component tokens.

Recommendation:

- Keep the model.
- Optionally clarify that themes currently override semantic-shaped values.

Confidence: High

### TODO: Keep Presets As Configuration Only

- [ ] Keep preset model in `docs/TOKENS.md`.
- [ ] Keep preset model in `docs/DESIGN_SYSTEM.md`.
- [ ] Keep preset model in `docs/ARCHITECTURE.md`.

Category: `KEEP_FROM_FOUNDATION`

What changed:

- Foundation docs define presets as configuration only, not token layers.

Current code proves:

- `neurexPreset` contains id, name, brand, description, theme modes, and default theme.
- It does not contain token values.

Recommendation:

- Keep this rule.

Confidence: High

### TODO: Keep Brand Responsibility Rules

- [ ] Keep brand rules in `docs/TOKENS.md`.
- [ ] Mirror concise brand guidance in `docs/STYLEGUIDE.md`.

Category: `KEEP_FROM_FOUNDATION`

What changed:

- Foundation docs say brand tokens hold brand-level palette decisions and must not contain component-specific intent.

Current code proves:

- `neurex.brand.ts` maps `brand.color.primary` and `brand.color.accent` to primitive color tokens.
- It does not contain component-specific names.

Recommendation:

- Keep the rule.

Confidence: High

---

## Outdated Refactor Docs To Reject

### DONE: Do Not Restore Old Semantic Color Hierarchy Verbatim

- [x] Avoid old `color.action.*` and `color.border.*` wording.
- [x] Rewrite semantic organization around current groups.

Category: `REJECT_OUTDATED`

What changed:

- `refactor/tokens` documented semantic color paths including `color.border.*` and `color.action.*`.

Current code proves:

- `action` and `border` are now separate semantic groups:
  - `packages/tokens/src/semantics/action.ts`
  - `packages/tokens/src/semantics/border.ts`

Recommendation:

- Reject the old hierarchy as exact wording.
- Rewrite docs to reflect current semantic groups:
  `color`, `action`, `border`, `motion`, `radius`, `size`, `spacing`, `typography`.

Confidence: High

### TODO: Do Not Restore Old Generator Filenames

- [ ] Update any imported TODO text to current filenames.

Category: `REJECT_OUTDATED`

What changed:

- Some refactor history references older generator filenames.

Current code proves:

- Current files are:
  - `generator.create.ts`
  - `generator.write.ts`
  - `generator.config.ts`

Recommendation:

- Keep the intent of the history.
- Rewrite old filenames before importing.

Confidence: High

### TODO: Do Not Restore Old CSS Variable Examples

- [x] Replace stale `--nx-color-action-primary-*` examples.

Category: `REJECT_OUTDATED`

What changed:

- Refactor docs contained older CSS variable examples.

Current code proves:

- Current generated action variable names include:
  - semantic action CSS variable: `--nx-action-primary-base`
  - theme override CSS variable: `--nx-color-action-primary-base`
  - Tailwind mapping: `--color-nx-action-primary-base`

Recommendation:

- Use real generated variables from current output.
- Use `--nx-color-action-primary-base` for the README theme override example and
  avoid the stale `--nx-color-primary` name.

Confidence: High

---

## Partially True Sections To Rewrite

### TODO: Rewrite Build-Failing Layer Validation Claims

- [x] Update `docs/TOKENS.md`.
- [x] Update `packages/tokens/README.md`.
- [ ] Update `AGENTS.md` only if needed in a later approved pass.

Category: `REWRITE_PARTIALLY_TRUE`

What changed:

- Foundation docs say build must fail for layer skips such as component-to-primitive references.

Current code proves:

- Current validation catches missing references, circular references, branch references, and missing preset theme modes.
- A full layer-boundary validator is not visible.

Recommendation:

- Rewrite as target architecture or intended build-failing validation.
- Or implement validator before documenting as currently enforced.

Confidence: High

### TODO: Rewrite Component Token Semantic-Only Rule

- [x] Update `docs/TOKENS.md`.
- [x] Update `docs/STYLEGUIDE.md`.

Category: `REWRITE_PARTIALLY_TRUE`

What changed:

- Foundation docs say component tokens reference semantic tokens only.

Current code proves:

- Some component tokens directly reference primitive `size` and `spacing` tokens:
  - `badge.ts`
  - `menu.ts`
  - `popover.ts`
  - `select.ts`
  - `tabs.ts`
  - `switch.ts`
  - `toast.ts`
  - `toggle-group.ts`

Recommendation:

- Decide whether to fix code later or document this as a target rule with current exceptions.

Confidence: High

### TODO: Rewrite Feedback Triad Requirement

- [x] Update `docs/TOKENS.md`.

Category: `REWRITE_PARTIALLY_TRUE`

What changed:

- Foundation docs require every feedback status to have background, text, and border.

Current code proves:

- Current feedback theme/semantic groups include `bg` and `text`, but not a full `border` value for each status.

Recommendation:

- Either add feedback borders later or soften docs to the current `bg` / `text` state.

Confidence: High

### TODO: Fix Token Package README Identity

- [x] Update `packages/tokens/README.md`.

Category: `REWRITE_PARTIALLY_TRUE`

What changed:

- New package README uses `@neurex-ui/tokens`.

Current code proves:

- Actual package name is `@neurex/tokens`.

Recommendation:

- Keep the README structure.
- Replace package name and commands with `@neurex/tokens`.

Confidence: High

### TODO: Fix README CSS Variable Example

- [x] Update `README.md`.

Category: `REWRITE_PARTIALLY_TRUE`

What changed:

- Foundation README example says override `--nx-color-primary`.

Current code proves:

- Current generated variables do not use that exact name.
- `packages/tokens/dist/theme.css` exposes `--nx-color-action-primary-base` as a
  theme override variable.
- The Tailwind `@theme` block exposes `--color-nx-action-primary-base`.

Recommendation:

- Replace with real current generated variable names.

Confidence: High

### TODO: Restore CSS Plus DTCG Pipeline Wording

- [ ] Update `docs/STYLEGUIDE.md`.
- [ ] Update `docs/DESIGN_SYSTEM.md`.

Category: `REWRITE_PARTIALLY_TRUE`

What changed:

- Foundation reduced generated outputs to CSS-focused wording.

Current code proves:

- Token pipeline generates CSS and DTCG JSON.
- Registry installs only CSS today.

Recommendation:

- Say generated CSS and DTCG JSON belong to the token pipeline.
- Say registry/CLI consumer install currently uses only `styles/tokens.css` and `styles/theme.css`.

Confidence: High

### TODO: Fix Stale Token Migration TODO

- [ ] Update `docs/REVIEW_TODO.md`.

Category: `REWRITE_PARTIALLY_TRUE`

What changed:

- Foundation says legacy `{ value }` to `$value` migration is not started.

Current code proves:

- Token sources, resolver, generators, and tests use `$value`.

Recommendation:

- Mark migration as done.
- Restore useful completion notes from `refactor/tokens`, updated to current filenames and branch state.

Confidence: High

---

## Human Decisions Needed

### TODO: Decide Component Token Layer Strictness

- [x] Decide whether component tokens may temporarily reference primitive `size` / `spacing`.
- [ ] If no, plan code migration to semantic `size` / `spacing` coverage.
- [x] If yes, document the exception clearly.

Category: `NEEDS_HUMAN_DECISION`

What changed:

- Docs now state component tokens must reference semantics only.

Current code proves:

- Some component tokens still reference primitives directly.

Recommendation:

- Make an explicit architecture decision before rewriting this as an enforced rule.

Confidence: High

### TODO: Decide Current vs Target Enforcement Language

- [ ] Decide whether docs should describe current enforcement only.
- [ ] Or decide that docs may describe locked target architecture with TODO labels.

Category: `NEEDS_HUMAN_DECISION`

What changed:

- Foundation docs use strong `build must fail` wording.

Current code proves:

- Layer-boundary enforcement is not fully implemented.

Recommendation:

- Choose one style:
  - current behavior docs
  - target architecture docs with explicit implementation gaps

Confidence: High

### TODO: Decide DTCG Canonical Contract Wording

- [ ] Decide exact source-of-truth wording for TypeScript vs W3C/DTCG JSON.

Category: `NEEDS_HUMAN_DECISION`

What changed:

- Refactor docs said W3C/DTCG JSON is the long-term canonical interchange contract.
- Foundation docs removed much of that detail.

Current code proves:

- TypeScript authoring is still the current source.
- DTCG output and DTCG input parsing exist.

Recommendation:

- Suggested wording:
  "TypeScript is the current typed authoring source. W3C/DTCG JSON is the generated interchange contract and future input boundary."

Confidence: Medium-High

### TODO: Decide DTCG JSON Package Export Policy

- [ ] Decide whether generated DTCG JSON should remain internal package output.
- [ ] Or decide whether to expose JSON through `package.json` exports later.

Category: `NEEDS_HUMAN_DECISION`

What changed:

- Refactor docs documented DTCG JSON as generated but not exported.
- Foundation removed most of this.

Current code proves:

- `packages/tokens/package.json` exports only:
  - `.`
  - `./theme.css`
  - `./tokens.css`

Recommendation:

- Keep docs explicit that JSON files are generated but not public exports until contract is finalized.

Confidence: High

---

## Recommended Work Order

- [x] 1. Fix package identity in `packages/tokens/README.md`.
- [x] 2. Restore `default` alias vs `neurex` preset wording across public docs.
- [x] 3. Restore accurate DTCG output documentation.
- [x] 4. Fix stale `docs/REVIEW_TODO.md` migration status.
- [x] 5. Rewrite semantic organization docs around current `color`, `action`, and `border` split.
- [x] 6. Rewrite enforcement claims as target rules until validators exist.
- [x] 7. Decide component-token primitive-reference policy.
- [x] 8. Replace stale CSS variable examples with generated current names.
- [x] 9. Restore folder-context naming guidance in `docs/STYLE.md`.
- [ ] 10. Run formatting checks for changed docs.
