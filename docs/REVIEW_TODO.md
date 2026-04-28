# Neurex UI Review TODO

## Purpose

This document captures the repository review findings from 2026-04-28 and turns
them into a working TODO direction for the next implementation passes.

`CONTINUITY.md` was intentionally not used as a source of truth for this review.

---

## Current Assessment

Neurex UI has a strong architectural direction:

- registry-first install model
- user-owned generated code
- clear package split between `ui`, `registry`, `cli`, and `tokens`
- metadata-driven CLI intent
- safe update philosophy

The main gap is that documentation describes a framework contract that the
current implementation only partially satisfies. The next work should focus on
making the CLI and registry behavior real before adding many new components.

---

## P0 - Publish and Install Blockers

### TODO: Make registry template resolution publish-safe

Problem:

- `packages/cli/src/core/installer.ts` locates templates through a monorepo path:
  `packages/registry/templates`.
- `packages/cli/package.json` publishes only `dist`.
- In a real npm install, the CLI will not reliably find registry templates.

Direction:

- Resolve templates from the installed `@neurex-ui/registry` package.
- Ensure `@neurex-ui/registry` publishes `templates`.
- Avoid repo-root assumptions in runtime CLI code.
- Add a smoke check for packed/published-style usage.

### TODO: Fix `--cwd` for dependency installation

Problem:

- `installDependencies` reads `package.json` from the process cwd, not `getCwd()`.
- The package manager command runs without an explicit cwd.
- `neurex-ui add --cwd ./apps/web` can install dependencies in the wrong project.

Direction:

- Read `join(getCwd(), "package.json")`.
- Run dependency install commands with `cwd: getCwd()`.
- Keep lockfile/package-manager detection scoped to `getCwd()`.

### TODO: Do not mark conflicted installs as installed

Problem:

- `installItemFiles` logs conflicts but does not return a status.
- `runAdd` always writes `installed[item.name] = item.version`.
- A partial or conflicted install can be tracked as successful.

Direction:

- Return a structured install result from utility/style/component installers.
- Track created/skipped/conflicted files.
- Only update `neurex.config.json.installed` when the item install is complete.
- Print a final summary with conflicts.

---

## P1 - Architecture Contract Gaps

### TODO: Implement style and token installation

Problem:

- Registry metadata declares `styles: ["theme"]`.
- Docs promise token/theme CSS installation.
- CLI only creates `styles/neurex`; it does not install CSS.
- `packages/tokens` is currently an empty public entrypoint.

Direction:

- Add token source structure in `packages/tokens`.
- Generate or provide initial `tokens.css` and `theme.css`.
- Add registry metadata for styles.
- Teach CLI to install styles idempotently.
- Ensure installed components can reference token-backed Tailwind/CSS variables.

### TODO: Align Button styling with token strategy

Problem:

- Button variants use hardcoded Tailwind colors like `bg-blue-600`.
- The docs describe token-driven CSS variables.
- Button lacks focus-visible, disabled, and loading visual states.

Direction:

- Move Button colors/sizing/radius intent toward token-backed classes.
- Add accessible focus-visible styling.
- Add disabled and loading classes.
- Keep `variant`, `size`, and `className` as the public API.

### TODO: Make registry metadata more complete and enforced

Problem:

- `target`, `styles`, and `remoteFiles` exist in metadata but are lightly used.
- Validator checks only part of the install contract.

Direction:

- Validate `target`, `styles`, `utilities`, `aliases`, and `remoteFiles`.
- Ensure each declared style/utility maps to a real installable template.
- Keep CLI install behavior metadata-driven.

---

## P1 - CLI Safety and Correctness

### TODO: Replace generic file-exists catch behavior

Problem:

- `fileExists` catches all errors and returns `false`.
- Permission and IO failures can be misreported as missing files.
- This conflicts with the repo error-handling rule.

Direction:

- Treat only expected "not found" errors as missing.
- Let unexpected access/read errors propagate.
- Remove duplicated local `fileExists` in `template-validator`.

### TODO: Improve package manager command safety

Problem:

- Dependency command is built as one string and executed through `execSync`.
- Package names come from registry metadata, including potential remote registry data.

Direction:

- Use `execFileSync` or `spawnSync` with argument arrays.
- Validate dependency names or constrain remote registry trust model.
- Keep stdio inherited for good DX.

### TODO: Make remote/local registry flags deterministic

Problem:

- `registry --local` can still initialize provider flow against configured remote.
- `registry --remote` can fall back to local unless strict behavior is requested.
- Cache state can make source reporting confusing.

Direction:

- Make `--local` bypass remote resolution completely.
- Make `--remote` mean remote-only, or document fallback explicitly.
- Include effective source and fallback in JSON/summary output.

---

## P2 - Product and DX Improvements

### TODO: Add real tests before expanding components

Problem:

- Package `lint` and `test` scripts are placeholders.
- CLI has safety-sensitive behavior without test coverage.

Direction:

- Add Vitest or equivalent for CLI units.
- Test `--cwd`, conflict handling, package-manager detection, registry resolution,
  and update tracking.
- Add a sandbox/e2e install smoke test.

### TODO: Add a playground or example consumer

Problem:

- `apps/` exists but has no committed app files.
- There is no obvious visual verification target.

Direction:

- Add a minimal Vite or Next playground.
- Render installed/reference Button.
- Use it for screenshot/manual checks once styling evolves.

### TODO: Clean docs encoding and status wording

Problem:

- README and architecture diagrams contain mojibake/garbled symbols.
- Docs read as final in some places, but implementation is still early.

Direction:

- Normalize docs to clean UTF-8 or plain ASCII.
- Mark unimplemented promises clearly.
- Keep README honest about current status.

---

## Recommended Work Order

1. Fix CLI `--cwd` and dependency installation.
2. Make template resolution work in a packed/published package layout.
3. Change installers to return structured results and block tracking on conflicts.
4. Add minimal CLI tests for the three items above.
5. Implement style/token templates and installer support.
6. Upgrade Button to token-aware, state-aware styling.
7. Add playground/e2e install smoke test.
8. Expand registry with the next component only after install/update safety is solid.

---

## Verification Notes

Attempted checks from the review session:

- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`

Result:

- Could not run in the review environment because `node`, `npm`, and `pnpm`
  were not available on PATH.
- Existing package `lint` and `test` scripts are placeholders in the current repo.

