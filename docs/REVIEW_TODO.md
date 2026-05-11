# Neurex Review TODO

## Purpose

This document captures the repository review findings from 2026-04-28 and turns
them into a working TODO direction for the next implementation passes.

`CONTINUITY.md` was intentionally not used as a source of truth for this review.

---

## Current Assessment

Neurex has a strong architectural direction:

- registry-first install model
- user-owned generated code
- clear package split between `ui`, `registry`, `cli`, and `tokens`
- metadata-driven CLI intent
- safe update philosophy

The main gap is that documentation describes a framework contract that the
current implementation only partially satisfies. The next work should focus on
making the CLI and registry behavior real before adding many new components.

## Progress Snapshot - 2026-04-28

Completed so far on `feature/cli-install-hardening`:

- Tooling foundation added: ESLint, Prettier, Tailwind CSS package setup,
  Vitest, Turbo scripts, pnpm workspace cleanup, and repo-level check/build
  scripts.
- P0 install safety pass completed: packed registry template resolution,
  `--cwd`-scoped dependency installs, safer package manager execution, and
  conflict-aware install tracking.
- CLI safety pass partially completed: file existence errors now only treat
  `ENOENT` as missing, package manager commands use argument arrays, and
  `registry --local` / `registry --remote` are deterministic.
- CLI unit coverage started for package manager detection/install cwd,
  installer conflicts, add tracking, and registry source behavior.
- Design-system model locked in `docs/DESIGN_SYSTEM.md`: tokens and themes are
  source of truth, CSS/Tailwind outputs are generated artifacts, and delivery is
  CLI now with Creator-compatible structure later.
- Style/token installation added: token/theme source now generates CSS outputs,
  registry exposes style metadata, and CLI installs required styles
  idempotently from registry item metadata.
- Button styling aligned with the token strategy: reference and registry
  variants now consume `nx` semantic Tailwind classes and component CSS
  variables instead of hardcoded Tailwind colors/sizes.
- Earlier sandbox smoke exposed an install-contract gap: generated style files
  were copied into the consumer project, but the CLI did not yet wire
  `styles/tokens.css` and `styles/theme.css` into the consumer CSS
  entrypoint or otherwise verify Tailwind output.
- Style entrypoint wiring added: `neurex.config.json` now carries
  `tailwind.version` and `tailwind.css`, and installed style outputs are imported
  into the configured consumer CSS file idempotently.
- Tailwind v4/Vite foundation added to `init`: CLI installs missing Tailwind
  dev dependencies, adds `@import "tailwindcss";`, wires
  `@tailwindcss/vite`, and keeps all steps idempotent.
- Repeatable install-flow smoke added: a temp Vite consumer now runs `init` and
  `add button` twice to guard idempotent deps, Vite plugin wiring, CSS imports,
  style files, utility install, component install, and config tracking.
- CLI install summary polish added: `add` now reports grouped
  created/updated/skipped/conflicted totals for component files and shared
  resources, tracks component success counts, and warns when shared resources
  conflicted but were left untouched.

---

## P0 - Publish and Install Blockers

### DONE: Make registry template resolution publish-safe

Problem:

- `packages/cli/src/core/installer.ts` locates templates through a monorepo path:
  `packages/registry/templates`.
- `packages/cli/package.json` publishes only `dist`.
- In a real npm install, the CLI will not reliably find registry templates.

Direction:

- Resolve templates from the installed `@neurex/registry` package.
- Ensure `@neurex/registry` publishes `templates`.
- Avoid repo-root assumptions in runtime CLI code.
- Add a smoke check for packed/published-style usage.

Status:

- Done in code by resolving templates from `@neurex/registry/templates/*`.
- Registry package exports and publishes `templates`.
- Verified with `pnpm --filter @neurex/registry pack --dry-run`.

### DONE: Fix `--cwd` for dependency installation

Problem:

- `installDependencies` reads `package.json` from the process cwd, not `getCwd()`.
- The package manager command runs without an explicit cwd.
- `neurex add --cwd ./apps/web` can install dependencies in the wrong project.

Direction:

- Read `join(getCwd(), "package.json")`.
- Run dependency install commands with `cwd: getCwd()`.
- Keep lockfile/package-manager detection scoped to `getCwd()`.

Status:

- Done in `packages/cli/src/core/package-manager.ts`.
- Covered by CLI unit test for reading `package.json` and installing from the
  configured cwd.

### DONE: Do not mark conflicted installs as installed

Problem:

- `installItemFiles` logs conflicts but does not return a status.
- `runAdd` always writes `installed[item.name] = item.version`.
- A partial or conflicted install can be tracked as successful.

Direction:

- Return a structured install result from utility/style/component installers.
- Track created/skipped/conflicted files.
- Only update `neurex.config.json.installed` when the item install is complete.
- Print a final summary with conflicts.

Status:

- Done for utility and component installers with structured created/skipped/
  updated/skipped/conflicted results.
- `runAdd` now avoids updating installed state when conflicts are present.
- `runAdd` now prints a final grouped install summary and separates component
  conflicts from shared utility/style conflicts in the user-facing output.
- Covered by installer and add command tests.

---

## P1 - Architecture Contract Gaps

```md
### DONE: Migrate semantic color tokens to structured hierarchy

Problem:

- Semantic color tokens used flat single-level roles such as `color.background`,
  `color.foreground`, `color.primary`, `color.muted`, and `color.destructive`.
- Flat roles made the semantic layer less expressive as component coverage grew.
- Action, text, background, border, and feedback decisions needed clearer
  separation.

Direction:

- Replace flat semantic color roles with a structured hierarchy:
  - `color.background.{base,surface,subtle,overlay}`
  - `color.text.{primary,secondary,disabled,inverse,link,accent}`
  - `color.border.{default,strong,focus,accent}`
  - `color.feedback.{info,success,warning,danger}.{bg,text,border}`
  - `color.action.{primary,secondary,danger}.{base,hover,active,disabled}`
- Rewrite light and dark theme mappings to mirror the new semantic structure.
- Update generated CSS and Tailwind output variable names.
- Keep component tokens aligned to semantic roles rather than primitive color
  values.

Status:

- Done.
- Primitive color scales now use OKLCH throughout.
- Light and dark themes now mirror the structured color semantic hierarchy.
- Dark mode hover/active and disabled mappings were adjusted for correct
  contrast direction on dark surfaces.
- Generated CSS variable references and token output tests were updated.
- Breaking change: legacy flat semantic color paths were removed.

### DONE: Implement style and token installation

Problem:

- Registry metadata declares `styles: ["theme"]`.
- Docs promise token/theme CSS installation.
- CLI only creates `styles`; it does not install CSS.
- `packages/tokens` is currently an empty public entrypoint.

Direction:

- Add token source structure in `packages/tokens`.
- Generate or provide initial `tokens.css` and `theme.css`.
- Add registry metadata for styles.
- Teach CLI to install styles idempotently.
- Ensure installed components can reference token-backed Tailwind/CSS variables.

Status:

- Done as a first foundation pass.
- `packages/tokens` now owns primitive, component, and theme token source.
- Token build output generates `tokens.css` and `theme.css`.
- Registry exposes `theme` style metadata with generated style templates.
- CLI collects `styles` from registry items and installs them through the same
  created/skipped/conflicted result model used by utilities and components.
- Covered by token output, style installer, and `runAdd(button)` tests.

### DONE: Wire installed style outputs into the consumer app

Problem:

- `add button` installs `styles/tokens.css` and `styles/theme.css`.
- A fresh Vite sandbox still builds without those files being imported.
- The generated Button uses `nx` Tailwind/theme classes, but the built CSS does
  not include the `nx` output unless the consumer wires the styles manually.

Direction:

- Decide the first supported CSS entrypoint contract for CLI installs.
- Detect or configure the consumer stylesheet path during `init`.
- Add the Neurex style imports idempotently, or print an explicit actionable
  manual step when safe automatic wiring is not possible.
- Validate this with a sandbox/e2e smoke that checks generated CSS contains the
  installed `nx` theme output.

Status:

- Done for CSS entrypoint wiring.
- `neurex.config.json` now includes `tailwind.version` and `tailwind.css`.
- `add button` installs `styles/tokens.css` and `styles/theme.css`, then imports them into the configured CSS
  entrypoint without duplicating imports.
- Verified against `neurex-sandbox`: `src/style.css` now imports the Neurex
  style outputs and `npm run typecheck` / `npm run build` pass.

### DONE: Configure Tailwind processing in consumer projects

Problem:

- Neurex components consume Tailwind utility classes and Tailwind v4 `@theme`
  output.
- The sandbox now receives the Neurex style imports, but Vite reports
  `Unknown at rule: @theme` because the app does not yet have the Tailwind v4
  Vite pipeline installed/configured.

Direction:

- Decide whether `neurex init` owns Tailwind setup or only validates an existing
  Tailwind setup.
- For Vite, install `tailwindcss` and `@tailwindcss/vite`, add the Vite plugin,
  and ensure `@import "tailwindcss";` is present before Neurex style imports.
- Keep this framework-aware and idempotent, similar to shadcn's init behavior.

Status:

- Done for the first Vite/Tailwind v4 foundation pass.
- `neurex init` installs missing `tailwindcss` and `@tailwindcss/vite` as dev
  dependencies.
- `neurex init` adds `@import "tailwindcss";` to the configured CSS entrypoint
  without duplicating it.
- `neurex init` adds the Tailwind Vite plugin without duplicating it.
- Dependency installation validates package names and uses a Windows-safe
  package-manager invocation.
- Verified directly in `neurex-sandbox`: idempotent `init`,
  `npm run typecheck`, and `npm run build` pass without the earlier `@theme`
  warning.

### DONE: Align Button styling with token strategy

Problem:

- Button variants use hardcoded Tailwind colors like `bg-blue-600`.
- The docs describe token-driven CSS variables.
- Button lacks focus-visible, disabled, and loading visual states.

Direction:

- Move Button colors/sizing/radius intent toward token-backed classes.
- Add accessible focus-visible styling.
- Add disabled and loading classes.
- Keep `variant`, `size`, and `className` as the public API.

Status:

- Done for the first Button foundation pass.
- Reference and registry template variants now use token-backed classes such as
  `bg-nx-primary`, `text-nx-primary-foreground`, `border-nx-border`, and
  component variables such as `--nx-button-radius` and
  `--nx-button-height-md`.
- Added focus-visible ring styling plus disabled and loading state classes.
- Public API remains `variant`, `size`, `className`, and existing Button props.

### DONE: Make registry metadata more complete and enforced

Problem:

- `target`, `styles`, and `remoteFiles` exist in metadata but are lightly used.
- Validator checks only part of the install contract.

Direction:

- Validate `target`, `styles`, `utilities`, `aliases`, and `remoteFiles`.
- Ensure each declared style/utility maps to a real installable template.
- Keep CLI install behavior metadata-driven.

Status:

- Done for the bundled/local registry contract.
- Registry now exposes utility metadata for `cn`, alongside item and style
  metadata.
- Validator checks aliases, package dependency names, registry dependencies,
  style references, utility references, remote file declarations, HTTPS remote
  file URLs, safe relative paths, duplicate style/utility targets, and local
  template file existence when a template file list is supplied.
- Registry tests validate the bundled registry against the real
  `packages/registry/templates` tree.
- Future remote registry manifest work can add remote-provided style/utility
  manifests; current remote item validation remains structural plus item-level
  safety checks.

---

### DONE: Remove registry template shim typecheck layer

Problem:

- Registry templates were previously linted and typechecked as standalone source
  files.
- That required template-only ambient declarations under
  `packages/registry/templates/shims`.
- Those shims created a parallel fake Base UI type surface that could drift from
  the real Base UI package API.

Direction:

- Treat registry templates as synced install artifacts instead of canonical
  TypeScript source.
- Keep `packages/ui` as the canonical typed reference implementation.
- Use `templates:check-sync` to prevent registry template drift.
- Rely on registry metadata validation and real consumer install/build smoke
  checks for install correctness.
- Do not maintain template-only Base UI ambient declarations.

Status:

- Done.
- Removed template linting from the registry lint script.
- Removed `templates:typecheck` from the registry check pipeline.
- Removed `packages/registry/templates/shims`.
- Verified with:
  - `pnpm registry:check`
  - `pnpm check`
  - `pnpm build`

---

## P1 - CLI Safety and Correctness

### DONE: Replace generic file-exists catch behavior

Problem:

- `fileExists` catches all errors and returns `false`.
- Permission and IO failures can be misreported as missing files.
- This conflicts with the repo error-handling rule.

Direction:

- Treat only expected "not found" errors as missing.
- Let unexpected access/read errors propagate.
- Remove duplicated local `fileExists` in `template-validator`.

Status:

- Done in `packages/cli/src/core/fs.ts`.
- `template-validator` now uses the shared `fileExists` helper.

### DONE: Improve package manager command safety

Problem:

- Dependency command is built as one string and executed through `execSync`.
- Package names come from registry metadata, including potential remote registry data.

Direction:

- Use `execFileSync` or `spawnSync` with argument arrays.
- Validate dependency names or constrain remote registry trust model.
- Keep stdio inherited for good DX.

Status:

- Done for command execution safety: dependency installs use `execFileSync`
  with argument arrays and explicit `cwd`.
- Dependency name validation is now enforced in registry validation; broader
  remote trust policy remains future product work.

### DONE: Make remote/local registry flags deterministic

Problem:

- `registry --local` can still initialize provider flow against configured remote.
- `registry --remote` can fall back to local unless strict behavior is requested.
- Cache state can make source reporting confusing.

Direction:

- Make `--local` bypass remote resolution completely.
- Make `--remote` mean remote-only, or document fallback explicitly.
- Include effective source and fallback in JSON/summary output.

Status:

- Done in `packages/cli/src/commands/registry.ts`.
- `--local` bypasses remote/provider resolution.
- `--remote` fetches remote-only and does not fall back to local.
- JSON and summary output include source/fallback metadata.
- Covered by registry command tests.

---

## P2 - Product and DX Improvements

### TODO: Tokenize Dialog stacking and elevation values

Problem:

- `Dialog.variants.ts` currently uses hardcoded stacking and elevation classes
  such as `z-40`, `z-50`, and `shadow-lg`.
- These values are intentional temporary markers because the token system does
  not yet include z-index or shadow/elevation token families.
- Leaving them undocumented makes it easy to forget that they should eventually
  move into the token pipeline.

Direction:

- Add z-index and shadow/elevation token families to `packages/tokens`.
- Follow the existing token layering model
- Replace hardcoded Dialog and other overlay component stacking values with component or semantic CSS
  variables, for example:
  - `--nx-dialog-backdrop-z-index`
  - `--nx-dialog-viewport-z-index`
  - `--nx-dialog-popup-shadow`
- Keep Dialog variants token-driven and avoid introducing fake placeholder tokens
  before the token family is properly modeled.

Status:

- Not started.
- Hardcoded values are acceptable for the current Dialog implementation pass as
  visible reminders.
- Must be revisited before declaring Dialog styling/token integration complete.

### DONE: Add real tests before expanding components

Problem:

- Package `lint` and `test` scripts are placeholders.
- CLI has safety-sensitive behavior without test coverage.

Direction:

- Add Vitest or equivalent for CLI units.
- Test `--cwd`, conflict handling, package-manager detection, registry resolution,
  and update tracking.
- Add a sandbox/e2e install smoke test.

Status:

- Vitest is installed and wired through package and Turbo scripts.
- Initial CLI unit tests cover the highest-risk install and registry behavior.
- Token output generation and style installation now have focused tests.
- Repeatable install-flow smoke now covers temp Vite consumers running `init`
  and repeated component installs, including the full bundled registry
  component set, idempotent CSS/Tailwind/style wiring, generated file stability,
  and installed component tracking.

### DONE: Add a playground or example consumer

Problem:

- `apps/` exists but has no committed app files.
- There is no obvious visual verification target.

Direction:

- Add a minimal Vite or Next playground.
- Render installed/reference Button.
- Use it for screenshot/manual checks once styling evolves.

Status:

- Done as a first committed Vite playground in `apps/playground`.
- The playground consumes public package exports from `@neurex/ui` and
  `@neurex/tokens`, renders Button states, and validates token CSS/Tailwind
  behavior through workspace build/typecheck scripts.
- `D:\PLAYGROUND\sandbox-neurex` remains the manual real-user install sandbox
  for fresh `neurex init vite` / `neurex add ...` smoke tests.
- The committed playground now exercises the broader Base UI-backed component
  foundation, including form controls, Select, Dialog, AlertDialog, Popover,
  Menu, Drawer, Toast, Avatar, Collapsible, Meter, and ToggleGroup.

### DONE: Clean docs encoding and status wording

Problem:

- README and architecture diagrams contain mojibake/garbled symbols.
- Docs read as final in some places, but implementation is still early.

Direction:

- Normalize docs to clean UTF-8 or plain ASCII.
- Mark unimplemented promises clearly.
- Keep README honest about current status.

Status:

- Done for the main public entrypoint.
- README now uses plain ASCII formatting, describes the current Vite/Button MVP
  accurately, and moves planned components/frameworks/Creator work out of the
  "available now" path.

---

## Recommended Work Order

1. Fix CLI `--cwd` and dependency installation.
2. Make template resolution work in a packed/published package layout.
3. Change installers to return structured results and block tracking on conflicts.
4. Add minimal CLI tests for the three items above.
5. Implement style/token templates and installer support.
6. Upgrade Button to token-aware, state-aware styling.
7. Expand registry with the next component only after install/update safety is solid.

---

## Verification Notes

Latest successful checks from the implementation passes:

- `pnpm format`
- `pnpm --filter ./packages/cli test`
- `pnpm --filter ./packages/cli lint`
- `pnpm check`
- `pnpm build`
- `npm run typecheck` in `D:\LIBRARIES\JS_TS\neurex-sandbox`
- `npm run build` in `D:\LIBRARIES\JS_TS\neurex-sandbox`
- CLI install-flow smoke: 7 CLI test files / 26 CLI tests passing, with
  registry-driven coverage for the full bundled component set
- UI variant/API smoke: 32 UI test files / 49 UI tests passing
- Registry validation smoke: 1 registry test file / 15 registry tests passing
```
