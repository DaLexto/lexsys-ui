# Neurex CLI

## Overview

The Neurex CLI installs and manages **registry-first UI components** inside consumer projects.

Installed components become **user-owned source code**, not black-box runtime imports.

The CLI is responsible for:

- installing registry items,
- installing required dependencies,
- installing shared utilities,
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

Initializes Neurex in the current project.

```bash
neurex init
```

Creates the default Neurex project structure:

```txt
src/components/ui/
lib/neurex/
styles/neurex/
neurex.config.json
```

---

### `add`

Installs one or more registry items.

```bash
neurex add button
neurex add button dialog
```

Preview changes without writing files or installing dependencies:

```bash
neurex add button --dry-run
```

Run the command against a different working directory:

```bash
neurex add button --cwd ./apps/web
```

---

### `update`

Checks or safely updates installed components.

```bash
neurex update button
neurex update --all
```

Preview update changes without writing files:

```bash
neurex update button --dry-run
neurex update --all --dry-run
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
  "componentsPath": "src/components/ui",
  "utilitiesPath": "lib/neurex",
  "stylesPath": "styles/neurex",
  "installed": {},
  "registryUrl": null
}
```

### Config Fields

| Field            | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| `componentsPath` | Target directory for installed components.                     |
| `utilitiesPath`  | Target directory for shared utilities.                         |
| `stylesPath`     | Target directory for shared styles and token output.           |
| `installed`      | Installed registry item versions tracked by the CLI.           |
| `registryUrl`    | Optional remote registry URL. Uses local registry when `null`. |

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
- avoid bumping the installed version when conflicts exist,
- require explicit user action before overwrite behavior is introduced.
- Remote registry failures must not break local registry usage.

---

## Testing (Deferred)

CLI unit tests are intentionally deferred until the test runner is configured properly.

### Reason

- `tsc` currently compiles all `.ts` files under `src`
- adding `*.test.ts` files currently breaks production build
- Vitest should be introduced with proper test scripts and TS config separation

### Planned direction

- add Vitest as CLI dev dependency
- add `test` script for `packages/cli`
- exclude `*.test.ts` from production `tsconfig.json`
- keep tests beside source files once build/test separation is configured

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
