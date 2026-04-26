# Neurex UI CLI

## Overview

The Neurex UI CLI installs and manages **registry-first UI components** inside consumer projects.

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
neurex-ui <command> [options]
```

---

## Commands

### `init`

Initializes Neurex UI in the current project.

```bash
neurex-ui init
```

Creates the default Neurex UI project structure:

```txt
components/ui/
lib/neurex/
styles/neurex/
neurex.config.json
```

---

### `add`

Installs one or more registry items.

```bash
neurex-ui add button
neurex-ui add button dialog
```

Preview changes without writing files or installing dependencies:

```bash
neurex-ui add button --dry-run
```

Run the command against a different working directory:

```bash
neurex-ui add button --cwd ./apps/web
```

---

### `update`

Checks or safely updates installed components.

```bash
neurex-ui update button
neurex-ui update --all
```

Preview update changes without writing files:

```bash
neurex-ui update button --dry-run
neurex-ui update --all --dry-run
```

Reserved future flags:

```bash
neurex-ui update button --yes
neurex-ui update button --force
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
neurex-ui status
```

---

### `doctor`

Checks the local Neurex UI setup.

```bash
neurex-ui doctor
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
neurex-ui list
```

Print a public-friendly JSON list:

```bash
neurex-ui list --json
```

---

### `registry`

Prints registry metadata and registry diagnostics.

```bash
neurex-ui registry
neurex-ui registry --summary
neurex-ui registry --source
neurex-ui registry --local
neurex-ui registry --remote
```

#### Registry Flags

| Flag | Description |
| --- | --- |
| `--summary` | Prints a compact registry summary. |
| `--source` | Prints the active registry source. |
| `--local` | Uses the bundled local registry metadata. |
| `--remote` | Fetches the configured remote registry URL. |

If `--remote` fails, the CLI reports the error and keeps the local registry available through:

```bash
neurex-ui registry --local
```

---

### `config`

Prints and manages the active Neurex UI config.

```bash
neurex-ui config
neurex-ui config --path
neurex-ui config --exists
```

Configure a remote registry URL:

```bash
neurex-ui config --set-registry-url https://registry.neurex.dev
```

Clear the remote registry URL:

```bash
neurex-ui config --clear-registry-url
```

---

### `uninstall`

Placeholder command for the future uninstall flow.

```bash
neurex-ui uninstall button
neurex-ui uninstall button --dry-run
```

The command currently checks whether the component is tracked. It does not remove files yet.

---

### `version`

Shows the CLI version.

```bash
neurex-ui version
neurex-ui --version
neurex-ui -v
```

---

### `help`

Shows CLI help.

```bash
neurex-ui help
neurex-ui --help
neurex-ui -h
```

---

## Global Options

| Option | Description |
| --- | --- |
| `--cwd <path>` | Run the CLI against a different working directory. |
| `--dry-run` | Preview changes without writing files. |
| `--yes` | Reserved for future confirmation flows. |
| `--force` | Reserved for future conflict overwrite flow. |
| `--help`, `-h` | Show help. |

---

## Config

Default config file:

```txt
neurex.config.json
```

Default config shape:

```json
{
  "componentsPath": "components/ui",
  "utilitiesPath": "lib/neurex",
  "stylesPath": "styles/neurex",
  "installed": {},
  "registryUrl": null
}
```

### Config Fields

| Field | Description |
| --- | --- |
| `componentsPath` | Target directory for installed components. |
| `utilitiesPath` | Target directory for shared utilities. |
| `stylesPath` | Target directory for shared styles and token output. |
| `installed` | Installed registry item versions tracked by the CLI. |
| `registryUrl` | Optional remote registry URL. Uses local registry when `null`. |

---

## Registry Sources

Neurex UI currently supports two registry source concepts:

| Source | Description |
| --- | --- |
| Local registry | Bundled registry metadata from the installed CLI/package. |
| Remote registry | Optional configured remote JSON registry source. |

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

## Examples

Initialize Neurex UI:

```bash
neurex-ui init
```

Install a component:

```bash
neurex-ui add button
```

Preview component installation:

```bash
neurex-ui add button --dry-run
```

Check update status:

```bash
neurex-ui status
```

Preview updates:

```bash
neurex-ui update --all --dry-run
```

Inspect registry source:

```bash
neurex-ui registry --source
```

Use a custom working directory:

```bash
neurex-ui add button --cwd ./apps/web
```
