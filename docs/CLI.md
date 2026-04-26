# Neurex UI CLI

## Overview

The Neurex UI CLI installs and manages **registry-first UI components** inside consumer projects.

Installed components become **user-owned source code**, not black-box runtime imports.

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

Preview changes without writing files:

```bash
neurex-ui add button --dry-run
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

#### Update Rules

- Identical files may be updated.
- Missing files may be restored.
- Conflicted files are skipped.
- Installed component version is not bumped if conflicts exist.

---

### `status`

Shows tracked installed components.

```bash
neurex-ui status
```

---

### `doctor`

Checks the local Neurex UI setup.

```bash
neurex-ui doctor
```

---

### `list`

Lists available registry items.

```bash
neurex-ui list
neurex-ui list --json
```

---

### `registry`

Prints registry metadata for debugging.

```bash
neurex-ui registry
neurex-ui registry --summary
```

---

### `config`

Prints the active Neurex UI config.

```bash
neurex-ui config
neurex-ui config --path
neurex-ui config --exists
```

---

### `uninstall`

Placeholder command for the future uninstall flow.

```bash
neurex-ui uninstall button
neurex-ui uninstall button --dry-run
```

---

### `version`

Shows the CLI version.

```bash
neurex-ui version
neurex-ui --version
neurex-ui -v
```

---

## Options

| Option | Description |
| --- | --- |
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

---

## Safety Rules

The CLI must **never silently overwrite user code**.

When existing files differ from registry templates, the CLI must:

- report conflicts,
- skip conflicted files,
- avoid bumping the installed version when conflicts exist,
- require explicit user action before overwrite behavior is introduced.

