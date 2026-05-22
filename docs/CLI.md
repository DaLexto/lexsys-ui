# Neurex CLI Reference

**Audience:** Users and maintainers  
**Type:** CLI/API reference  
**Source of truth for:** Command surface, flags, config schema, install behavior, error handling  
**Verified against:** `packages/cli/src/` (all commands and core modules)

---

## Usage

```bash
neurex <command> [options]
```

The binary is `neurex`. It reads `neurex.config.json` from the working directory
or applies built-in defaults when the file is absent.

### Global options

| Flag | Description |
|------|-------------|
| `--cwd <path>` | Run from a different directory instead of `process.cwd()` |
| `--yes` | Auto-confirm safe prompts where supported |
| `--no-fallback` | Disable local registry fallback where supported |
| `--help`, `-h` | Print help message |
| `--version`, `-v` | Print CLI version |

---

## Commands

### `init`

Initialize Neurex in a project or scaffold a new Vite+React app.

```bash
neurex init
neurex init vite
neurex init vite my-app
```

**`neurex init` (no arguments)**

Detects whether a supported project scaffold exists in the working directory.
Vite is detected by presence of `vite.config.ts|.mts|.js|.mjs` or `vite` in
`package.json` dependencies.

- **Scaffold detected:** runs the Neurex init sequence (see below).
- **No scaffold detected:** prompts to create a Vite+React project here.
  Answering no prints `"Run neurex init vite to create a Vite starter."` and exits.

**Neurex init sequence** (runs for both paths above):

1. Creates `componentsPath`, `utilitiesPath`, `stylesPath` directories.
2. Installs `tailwindcss` and `@tailwindcss/vite` as dev dependencies.
3. Ensures `@import "tailwindcss";` at the top of `tailwind.css`.
4. Ensures `tailwindcss()` plugin in `vite.config.*`.
5. Ensures `"@": fileURLToPath(...)` resolve alias in `vite.config.*`.
6. Ensures `"@/*": ["./src/*"]` in `tsconfig.app.json` or `tsconfig.json`.
7. Writes `neurex.config.json` with default values.

**`neurex init vite [directory]`**

Scaffolds a full Vite+React+TypeScript project at `directory` (defaults to
current directory), then runs the Neurex init sequence above.

Installs:
- `react`, `react-dom`
- `@types/react`, `@types/react-dom`, `@types/node`, `@vitejs/plugin-react`,
  `prettier`, `typescript`, `vite` (dev)

> Only Vite is supported as an init target. Passing any other framework name
> throws `CliError: Unsupported init target: <name>`.

---

### `add`

Install one or more registry components, their shared utilities, token/theme
CSS, and npm dependencies.

```bash
neurex add <component...>
neurex add button dialog input
neurex add button --dry-run
neurex add button --cwd ./apps/web
neurex add                          # interactive multiselect
```

| Flag | Description |
|------|-------------|
| `--dry-run` | Preview components, dependencies, utilities, styles, and install paths — no writes |
| `--no-fallback` | Fail if remote registry is configured and unavailable (no local fallback) |

**Without component arguments**, shows an interactive multiselect of all
available registry items (format: `CanonicalName (category)`).

**Install sequence per `add` run:**

1. Resolve component names (case-insensitive; matches `name`, `canonicalName`,
   or `aliases`). On unknown name, suggests closest match via Levenshtein
   distance ≤ 3.
2. Collect transitive `registryDependencies` (deduped).
3. Collect npm `dependencies`, `utilities`, and `styles` across all items.
4. Install missing npm dependencies.
5. Install utilities to `utilitiesPath` (skip if identical; conflict if differs).
6. Install style files to `stylesPath` (skip if identical; auto-update if both
   source and target are generated Neurex files; conflict otherwise).
7. Wire style `@import` statements into the Tailwind CSS entrypoint.
8. Copy component template files to `componentsPath/<CanonicalName>/`.
9. Track successfully installed items (no conflicts) in `neurex.config.json`.
10. Print install summary.

**Component install states:**

| State | Meaning |
|-------|---------|
| `created` | File was new; written |
| `skipped` | File exists and is identical; no action |
| `conflicted` | File exists and differs; left untouched |
| `updated` | File was auto-updated (generated styles only) |

Components with any conflict are **not** added to the `installed` map.

**Remote file support:** registry items MAY declare `remoteFiles` with a
`remoteUrl`. When present, the file is fetched from the URL and hash-compared
before writing.

---

### `update`

Check and apply updates to tracked components or token/theme CSS files.

```bash
neurex update button
neurex update button dialog
neurex update --all
neurex update --styles
neurex update button --dry-run
neurex update --all --force
neurex update --all --yes
```

| Flag | Description |
|------|-------------|
| `--all` | Update all components tracked in `neurex.config.json` |
| `--styles` | Update token/theme CSS files only (skips component files) |
| `--dry-run` | Preview what would change; no writes; reports conflict/identical per file |
| `--force` | Write conflicted files after creating `.bak` timestamped backups |
| `--yes` | Auto-confirm safe prompts |
| `--no-fallback` | Fail if remote registry unavailable |

**Version check:** an update is available when the registry item version is
semver-greater than the installed version recorded in `neurex.config.json`.

**Per-file update logic:**

- Missing file → restored.
- Identical file → skipped.
- Differs, no `--force` → reported as conflict; installed version unchanged.
- Differs, `--force` → backup created as `<file>.<ISO-timestamp>.bak`; file overwritten.

Components that complete without conflicts have their version updated in config.

**`--styles`** updates token/theme CSS files (the `theme` style manifest) using
the same generated-file auto-update path as `add`.

---

### `list`

List available registry items from the resolved registry source.

```bash
neurex list
neurex list --json
```

| Flag | Description |
|------|-------------|
| `--json` | Output as JSON array with `name`, `canonicalName`, `version`, `category` |
| `--no-fallback` | Fail if remote registry unavailable |

Default output format: `- CanonicalName vX.X.X (category)` per line.

---

### `status`

Show installed component versions and update availability.

```bash
neurex status
```

Reads the `installed` map from `neurex.config.json` and compares each recorded
version against the active registry. Output per component:

```txt
- Button v0.0.1 (up to date)
- Dialog v0.0.1 (update available: v0.0.1 → v0.0.2)
- Input v0.0.1 (missing from registry)
```

If no components are tracked: `"No Neurex components are currently tracked."`

---

### `doctor`

Check project health against the current config.

```bash
neurex doctor
neurex doctor --no-fallback
```

| Flag | Description |
|------|-------------|
| `--no-fallback` | Fail if remote registry unavailable |

Checks and prints `✓` / `×` for:

- `package.json` — present in working directory
- `componentsPath` — directory exists
- `utilitiesPath` — directory exists
- `stylesPath` — directory exists
- `tailwind.css` — entrypoint file exists
- Registry connectivity — source URL, fallback used, item count
- Each tracked component — directory exists; reports `missing from registry` if
  the item was removed from the active registry

---

### `config`

Print or modify `neurex.config.json`.

```bash
neurex config                                           # print full config as JSON
neurex config --path                                    # print config file path
neurex config --exists                                  # print "Config exists." or "Config does not exist."
neurex config --set-registry-url https://example.com/registry.json
neurex config --clear-registry-url
```

| Flag | Description |
|------|-------------|
| `--path`, `-p` | Print the resolved path to `neurex.config.json` |
| `--exists`, `-e` | Print whether the config file is present |
| `--set-registry-url <url>` | Persist a remote registry URL |
| `--clear-registry-url` | Set `registryUrl` to `null` |

With no flags: reads config (merging defaults) and prints as indented JSON.

---

### `registry`

Inspect the registry source and manifest.

```bash
neurex registry                      # JSON manifest from resolved source
neurex registry --summary            # human-readable: source, item count, per-item details
neurex registry --source             # print active registry source string
neurex registry --local              # inspect the bundled local registry
neurex registry --local --summary
neurex registry --remote             # inspect the configured remote registry
neurex registry --remote --source
neurex registry --no-fallback
```

| Flag | Description |
|------|-------------|
| `--summary` | Human-readable output (source, fallback, items with type/category/remote file count) |
| `--source` | Print the effective source string (includes `(fallback: local)` note when fallback is used) |
| `--local` | Read only the bundled `@neurex/registry` package; ignore remote URL |
| `--remote` | Read only the remote URL from config; error if none configured |
| `--no-fallback` | Disable local fallback for the default resolution path |

---

### `uninstall`

> **Known gap:** File removal is not yet implemented.
> The command accepts names and `--dry-run`, looks up each in the installed map,
> and prints `"Uninstall is not implemented yet. <name> is tracked at v<version>."`.
> Names not found in the installed map print `"<name> is not tracked as installed."`.
> No files are deleted.

```bash
neurex uninstall button
neurex uninstall button --dry-run
```

---

### `version`

Print the CLI version read from the installed package's `package.json`.

```bash
neurex version
neurex -v
neurex --version
```

---

### `help`

Print the full usage message.

```bash
neurex help
neurex -h
neurex --help
```

---

## Configuration

`neurex.config.json` in the project root. Created by `init`; read and updated
by all commands. The CLI merges persisted values with built-in defaults on every
load — missing fields fall back to defaults without error.

### Schema

```ts
interface NeurexConfig {
  style: "default"
  componentsPath: string
  utilitiesPath: string
  stylesPath: string
  aliases: {
    components: string
    utils: string
    ui: string
    lib: string
    hooks: string
  }
  tailwind: {
    version: "v4"
    css: string
  }
  installed?: Record<string, string>   // name → installed version
  registryUrl?: string | null
}
```

### Defaults

| Field | Default |
|-------|---------|
| `style` | `"default"` (only valid value) |
| `componentsPath` | `"src/components/ui"` |
| `utilitiesPath` | `"src/lib"` |
| `stylesPath` | `"styles"` |
| `aliases.components` | `"@/components"` |
| `aliases.utils` | `"@/lib/utils"` |
| `aliases.ui` | `"@/components/ui"` |
| `aliases.lib` | `"@/lib"` |
| `aliases.hooks` | `"@/hooks"` |
| `tailwind.version` | `"v4"` (only valid value) |
| `tailwind.css` | `"src/style.css"` |
| `installed` | `{}` |
| `registryUrl` | `null` |

`tailwind.version` is a type literal locked to `"v4"`. Tailwind v3 is not
supported.

---

## Registry source resolution

The CLI resolves registry items from one of two sources:

| Source | When active |
|--------|-------------|
| **Local** | `registryUrl` is `null` or absent; uses `@neurex/registry` bundled with the CLI |
| **Remote** | `registryUrl` is a URL string; fetches the manifest JSON, validates, then uses it |

When a remote URL is configured and the fetch fails, the CLI falls back to the
local bundled registry (unless `--no-fallback` is passed). The registry is
cached in-memory for the duration of a single CLI invocation.

---

## Package manager detection

On every dependency install, the CLI detects the package manager in this order:

1. `packageManager` field in `package.json` (e.g. `"pnpm@10.33.0"`)
2. Lockfile presence: `package-lock.json` → npm, `pnpm-lock.yaml` → pnpm,
   `yarn.lock` → yarn
3. Default: npm

Dependency names are validated against a safe-name regex before any shell
invocation. On Windows, commands are run via `cmd.exe /d /s /c`.

Only missing dependencies are installed — packages already present in
`dependencies` or `devDependencies` are skipped.

---

## Error handling

`CliError` messages are printed as `Error: <message>` and exit with code 1.
Unexpected errors print `Unexpected error: <message>` and exit with code 1.
Unknown commands throw `CliError: Unknown command: <name>` and the help message
is printed.

---

## Install safety rules

- The CLI MUST NOT overwrite user-modified files silently.
- Conflicts are reported and left untouched unless `--force` is specified.
- `--force` MUST create a timestamped `.bak` backup before overwriting.
- Style files starting with `/* Generated by @neurex/tokens. Do not edit directly. */`
  are auto-updated without conflict because they are not user-owned.
- Items with any conflict during `add` are not recorded in the installed map.
- Items with conflicts during `update` do not have their version bumped.
