# Neurex CLI

## Overview

The Neurex CLI installs and manages **registry-first UI components** inside consumer projects.

Installed components become **user-owned source code**, not black-box runtime imports.

The CLI is responsible for:

- creating or initializing supported Vite projects,
- installing registry items as editable source files,
- installing required dependencies when they are missing,
- installing shared utilities and token/theme styles,
- wiring Tailwind v4 CSS imports and Vite/TypeScript aliases,
- tracking installed component versions,
- checking project health,
- safely updating generated files without silently overwriting user changes.

---

## Usage

```bash
neurex <command> [options]
```

---

## Commands

### `init`

Initializes Neurex in the current project or starts a framework-specific setup.

```bash
neurex init
neurex init vite
neurex init vite my-app
```

Plain `init` is for an existing app. If no supported app scaffold is detected,
the CLI should offer a framework-specific starter instead of silently creating
files for the wrong project type. For now, the only starter is Vite.

When a supported app scaffold exists, plain `init` creates the default Neurex
project structure and wires the supported styling setup:

```txt
src/components/ui/
src/lib/
styles/
neurex.config.json
```

For Vite, init also wires the `@/* -> ./src/*` TypeScript path and the matching
Vite runtime alias. Generated components can import shared utilities through
`@/lib/utils`.

The current Vite target assumes a React app with:

```txt
src/main.tsx
src/style.css
vite.config.ts
tsconfig.json
tsconfig.app.json
tsconfig.node.json
```

Framework init is explicit:

```bash
neurex init vite [directory]
```

Rules:

- `neurex init vite` targets the current working directory.
- `neurex init vite my-app` targets `./my-app`.
- `neurex init vite my-app --cwd ./playground` targets `./playground/my-app`.
- If the target directory does not exist, the CLI may create it.
- If the target directory exists and is not empty, the CLI must only continue
  when the directory is safe for the selected framework setup.

Supported framework init targets:

| Framework | Status |
| --------- | ------ |
| `vite`    | MVP    |

Future framework init targets may include `next`, `laravel`, and `custom`.

---

### `add`

Installs one or more registry items.

```bash
neurex add button
neurex add button dialog
neurex add input select dialog popover
```

Preview changes without writing files or installing dependencies:

```bash
neurex add button --dry-run
```

Run the command against a different working directory:

```bash
neurex add button --cwd ./apps/web
```

#### Add Output

After writing files, `add` prints an install summary grouped by component files
and shared resources:

```txt
Install summary:
- components: 3 created
- shared resources: 3 created, 1 updated
- tracked components: 1/1
```

Shared utility/style conflicts are reported and left untouched. Component file
conflicts prevent that component from being tracked as installed.

#### Add Install Contract

For each requested component, `add` resolves registry metadata and then:

1. checks `package.json` and installs only missing package dependencies,
2. installs required utilities such as `src/lib/utils.ts`,
3. installs required style files such as `styles/tokens.css` and
   `styles/theme.css`,
4. wires Neurex style imports into the configured Tailwind CSS entrypoint,
5. writes component files under the configured `componentsPath`,
6. records the component in `neurex.config.json` only when its own component
   files are not conflicted.

Repeated installs must be idempotent:

- existing identical files are skipped,
- existing generated styles may be updated when still generated,
- user-modified files are reported as conflicts,
- duplicate CSS imports must not be added,
- shared utility/style conflicts do not block tracking when the requested
  component files installed safely.

---

### `update`

Checks or safely updates installed components.

```bash
neurex update button
neurex update --all
neurex update --styles
```

Preview update changes without writing files:

```bash
neurex update button --dry-run
neurex update --all --dry-run
neurex update --styles --dry-run
```

Force update:

```bash
neurex update button --force
```

Reserved future flags:

```bash
neurex update button --yes
```

#### Update Rules

- Identical files may be updated.
- Missing files may be restored.
- Conflicted files are skipped.
- Installed component version is not bumped if conflicts exist.
- User-modified files must never be overwritten silently.
- `--styles` updates only generated `styles/tokens.css` and
  `styles/theme.css`, then rewires the configured CSS entrypoint if needed.

---

### `status`

Shows tracked installed components and whether updates are available.

```bash
neurex status
```

---

### `doctor`

Checks the local Neurex setup.

```bash
neurex doctor
```

The doctor command checks:

- `package.json`
- configured components path
- configured utilities path
- configured styles path
- tracked component folders

---

### `list`

Lists available registry items.

```bash
neurex list
```

Print a public-friendly JSON list:

```bash
neurex list --json
```

---

### `registry`

Prints registry metadata and registry diagnostics.

```bash
neurex registry
neurex registry --summary
neurex registry --source
neurex registry --local
neurex registry --remote
```

#### Registry Flags

| Flag        | Description                                 |
| ----------- | ------------------------------------------- |
| `--summary` | Prints a compact registry summary.          |
| `--source`  | Prints the active registry source.          |
| `--local`   | Uses the bundled local registry metadata.   |
| `--remote`  | Fetches the configured remote registry URL. |

If `--remote` fails, the CLI reports the error and keeps the local registry available through:

```bash
neurex registry --local
```

---

### `config`

Prints and manages the active Neurex config.

```bash
neurex config
neurex config --path
neurex config --exists
```

Configure a remote registry URL:

```bash
neurex config --set-registry-url https://registry.neurex.dev
```

Clear the remote registry URL:

```bash
neurex config --clear-registry-url
```

---

### `uninstall`

Placeholder command for the future uninstall flow.

```bash
neurex uninstall button
neurex uninstall button --dry-run
```

The command currently checks whether the component is tracked. It does not remove files yet.

---

### `version`

Shows the CLI version.

```bash
neurex version
neurex --version
neurex -v
```

---

### `help`

Shows CLI help.

```bash
neurex help
neurex --help
neurex -h
```

---

## Global Options

| Option          | Description                                           |
| --------------- | ----------------------------------------------------- |
| `--cwd <path>`  | Run the CLI against a different working directory.    |
| `--dry-run`     | Preview changes without writing files.                |
| `--yes`         | Reserved for future confirmation flows.               |
| `--force`       | Force update conflicted files after creating backups. |
| `--help`, `-h`  | Show help.                                            |
| `--no-fallback` | Disable local registry fallback where supported.      |

---

## Config

Default config file:

```txt
neurex.config.json
```

Default config shape:

```json
{
  "style": "default",
  "componentsPath": "src/components/ui",
  "utilitiesPath": "src/lib",
  "stylesPath": "styles",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "tailwind": {
    "version": "v4",
    "css": "src/style.css"
  },
  "installed": {},
  "registryUrl": null
}
```

### Config Fields

| Field            | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| `style`          | Active Neurex style preset. Current value: `default`.          |
| `componentsPath` | Target directory for installed components.                     |
| `utilitiesPath`  | Target directory for shared utilities.                         |
| `stylesPath`     | Target directory for shared styles and token output.           |
| `aliases`        | User-facing import aliases used by generated code and tooling. |
| `tailwind`       | Supported Tailwind version and CSS entrypoint path.            |
| `installed`      | Installed registry item versions tracked by the CLI.           |
| `registryUrl`    | Optional remote registry URL. Uses local registry when `null`. |

The MVP defaults are intentionally Vite-oriented. Other framework presets
should add explicit detection/setup logic before changing these defaults.

---

## Current Bundled Components

The local registry currently includes:

```txt
accordion
alert
alert-dialog
avatar
badge
button
card
checkbox
collapsible
dialog
drawer
field
fieldset
form
input
menu
meter
number-field
popover
progress
radio-group
select
separator
slider
switch
tabs
textarea
toast
toggle
toggle-group
tooltip
```

All bundled component installs are covered by the CLI install-flow smoke test.

---

## Registry Sources

Neurex currently supports two registry source concepts:

| Source          | Description                                               |
| --------------- | --------------------------------------------------------- |
| Local registry  | Bundled registry metadata from the installed CLI/package. |
| Remote registry | Optional configured remote JSON registry source.          |

The local registry is always available.

Remote registry support is additive and must not break local registry usage.

### Source Resolution

The CLI resolves registry metadata using this order:

```txt
configured remote registry
  → if valid, use remote registry
  → if unavailable or invalid, fall back to local registry
local registry
```

### Registry Manifest Shape

Remote registries should expose a manifest object:

```json
{
  "version": "0.0.1",
  "items": []
}
```

For backward compatibility, the CLI can also parse a raw array of registry items, but the manifest object is preferred.

### Strict Registry Mode

Some commands support strict registry resolution through:

```bash
--no-fallback
```

When enabled, the CLI fails if the configured remote registry cannot be resolved.

Supported commands:

- add
- update
- list
- status
- doctor
- registry

### Fallback Behavior

When `registryUrl` is configured, commands that resolve registry items use the remote registry first.

If the remote registry is unavailable or invalid, the CLI falls back to the bundled local registry unless fallback is explicitly disabled.

Commands using registry resolution include:

- `add`
- `update`
- `status`
- `uninstall`
- `list`
- `registry`

---

## Safety Rules

The CLI must **never silently overwrite user code**.

When existing files differ from registry templates, the CLI must:

- report conflicts,
- skip conflicted files,
- avoid tracking a component when its own component files conflict,
- keep shared utility/style conflicts visible without silently overwriting them,
- require explicit user action before overwrite behavior is introduced.
- Remote registry failures must not break local registry usage.

---

## Stability Boundary

Stable enough for current MVP work:

- local registry item resolution,
- Vite init and Tailwind v4 wiring,
- default config paths and aliases,
- `add` idempotency and conflict reporting,
- component template sync from `packages/ui`,
- user-owned installed source files.

Internal/evolving:

- registry item generation internals,
- update/uninstall write behavior,
- remote registry hosting and versioning policy,
- additional style presets beyond `default`,
- Creator-compatible output formats.

---

## Testing

CLI tests live outside source trees so `src` remains production/source-only.

Current layout:

```txt
packages/cli/test/
packages/registry/test/
packages/tokens/test/
packages/ui/test/
```

Each package owns its own tests. Add package-local `fixtures/` or `utils/`
folders only when tests need shared setup.

CLI tests cover install safety, package-manager detection, registry resolution,
Tailwind/Vite setup, and repeatable Vite install-flow smoke tests, including
the full bundled registry component set.

---

## Examples

Initialize Neurex:

```bash
neurex init
```

Install a component:

```bash
neurex add button
```

Preview component installation:

```bash
neurex add button --dry-run
```

Check update status:

```bash
neurex status
```

Preview updates:

```bash
neurex update --all --dry-run
```

Inspect registry source:

```bash
neurex registry --source
```

Use a custom working directory:

```bash
neurex add button --cwd ./apps/web
```
