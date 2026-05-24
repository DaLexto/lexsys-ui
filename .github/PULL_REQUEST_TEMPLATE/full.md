# Pull Request

<!--
For small PRs (docs-only, single-file chores, tiny fixes), keep Summary, Scope,
Verification, and Final Checklist, then delete sections that do not apply.
-->

## Summary

<!--
Explain what changed and why in 2-5 sentences.
Focus on user-visible behavior, architecture impact, or maintenance value.
-->

## Reviewer Notes

<!-- Point reviewers at the most important files, decisions, or questions. -->

-

## Scope

<!-- Check all areas touched by this PR. -->

- [ ] `packages/tokens`
- [ ] `packages/ui`
- [ ] `packages/registry`
- [ ] `packages/cli`
- [ ] `apps/playground`
- [ ] Documentation
- [ ] Tooling / CI / build
- [ ] Other:

## Change Type

- [ ] Feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Documentation only
- [ ] Test only
- [ ] Build / tooling
- [ ] Breaking change

## What Changed

<!-- Keep this concrete. Mention important files, modules, or contracts. -->

-

## Why This Approach

<!--
Explain the chosen approach and any important alternatives rejected.
Call out existing Lexsys patterns this PR follows.
-->

-

## Current vs Target State

<!--
Use this when the PR documents or implements only part of a larger direction.
Delete if not relevant.
-->

Current:

-

Target / planned:

-

## Package Boundary Check

<!-- Confirm this PR respects Lexsys package ownership. -->

- [ ] `packages/tokens` owns token source, resolver, generators, CSS, and DTCG outputs.
- [ ] `packages/ui` owns reference component implementations and public component APIs.
- [ ] `packages/registry` owns install metadata, templates, utilities, styles, and validation.
- [ ] `packages/cli` owns install/update/config behavior and consumer project mutation.
- [ ] No package imports another package's private `src/` or `dist/` internals.
- [ ] Public API changes are intentional and reflected in package exports.

## Registry / CLI Safety

<!-- Required when this PR touches registry metadata, templates, or CLI behavior. -->

- [ ] Registry remains the install source of truth.
- [ ] CLI behavior is metadata-driven, not hardcoded per component.
- [ ] User-owned files are not overwritten silently.
- [ ] Created / updated / skipped / conflicted behavior is preserved.
- [ ] Dependency installation remains scoped to the selected consumer project.
- [ ] Remote registry behavior and local fallback are documented if changed.
- [ ] Not applicable.

## Token / Styling Safety

<!-- Required when this PR touches tokens, generated CSS, or component styling. -->

- [ ] Token docs and implementation agree on current vs target behavior.
- [ ] Token layer order remains `primitives -> brand -> semantics -> components`.
- [ ] Themes override semantics but are not a token layer.
- [ ] Presets remain configuration only.
- [ ] Component tokens use semantic tokens where semantic coverage exists.
- [ ] Component tokens reference semantic roles for size and spacing (no raw primitive scale refs).
- [ ] CSS/DTCG output names and paths match the current generator.
- [ ] Not applicable.

## UI Safety

<!-- Required when this PR touches components or templates. -->

- [ ] Component API remains simple and explicit.
- [ ] Accessibility behavior from Base UI is preserved.
- [ ] `className` merge behavior is preserved.
- [ ] Public exports and prop type exports are intentional.
- [ ] Registry templates were synced if UI source changed.
- [ ] Not applicable.

## Documentation

- [ ] Docs were updated for changed behavior.
- [ ] Docs distinguish current implementation from target/future work.
- [ ] Canonical docs own detailed rules; other docs link instead of duplicating.
- [ ] No documentation update needed because:

## Verification

<!--
Add exact commands you ran. Leave unrelated checks blank or delete those rows.
Examples:
- `pnpm --filter @lexsys/ui check`
- `pnpm --filter @lexsys/tokens check`
- `pnpm exec prettier --check <changed-files>`
-->

| Check | Result | Notes |
| ----- | ------ | ----- |
|       |        |       |
|       |        |       |
|       |        |       |

## Screenshots / Output

<!-- Add screenshots, CLI output, or before/after examples when useful. -->

Not applicable.

## Risks

<!-- Describe regression risk, migration risk, or uncertain areas. -->

-

## Rollback / Revert Notes

<!-- Optional. Useful for infrastructure, release, migration, or risky behavior changes. -->

-

## Final Checklist

- [ ] The diff is scoped to the PR goal.
- [ ] Existing user/project-owned behavior is preserved unless intentionally changed.
- [ ] Tests or verification match the risk level.
- [ ] New TODOs are intentional and tracked.
- [ ] No secrets, local paths, generated noise, or unrelated churn were added.
