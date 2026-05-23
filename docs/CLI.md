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

| Flag              | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `--cwd <path>`    | Run from a different directory instead of `process.cwd()` |
| `--yes`           | Auto-confirm safe prompts where supported                 |
| `--no-fallback`   | Disable local registry fallback where supported           |
| `--help`, `-h`    | Print help message                                        |
| `--version`, `-v` | Print CLI version                                         |

---

## Commands

### `init`

Initialize Neurex in a project or scaffold a new Vite+React or Next.js App Router app.

```bash
neurex init
neurex init vite
neurex init vite my-app
neurex init next
neurex init next my-app
```

**`neurex init` (no arguments)**

Detects whether a supported project scaffold exists in the working directory.

- **Vite** — `vite.config.ts|.mts|.js|.mjs` or `vite` in `package.json` dependencies.
- **Next.js** — `next.config.ts|.mjs|.js` or `next` in `package.json` dependencies.

- **Scaffold detected:** runs the Neurex init sequence (see below).
- **No scaffold detected:** prompts to create a Vite+React or Next.js App Router starter.
  Declining prints guidance to run `neurex init vite` or `neurex init next`.

**Neurex init sequence** (runs after scaffold detection or scaffold command):

1. Creates `componentsPath`, `utilitiesPath`, `stylesPath` directories.
2. Installs Tailwind v4 dependencies (Vite: `tailwindcss`, `@tailwindcss/vite`; Next: `tailwindcss`, `@tailwindcss/postcss`).
3. Ensures `@import "tailwindcss";` at the top of the Tailwind CSS entrypoint (`src/style.css` for Vite; `app/globals.css` for Next).
4. **Vite only:** ensures `tailwindcss()` plugin and `"@": fileURLToPath(...)` resolve alias in `vite.config.*`.
5. **Next only:** ensures `postcss.config.mjs` with `@tailwindcss/postcss` when missing.
6. Ensures `"@/*": ["./src/*"]` in `tsconfig.app.json` or `tsconfig.json`.
7. Writes `neurex.config.json` with default values (Next sets `tailwind.css` to `app/globals.css`).

**`neurex init vite [directory]`**

Scaffolds a full Vite+React+TypeScript project at `directory` (defaults to
current directory), then runs the Neurex init sequence above.

Installs:

- `react`, `react-dom`
- `@types/react`, `@types/react-dom`, `@types/node`, `@vitejs/plugin-react`,
  `prettier`, `typescript`, `vite` (dev)

**`neurex init next [directory]`**

Scaffolds a minimal Next.js App Router + TypeScript project at `directory`
(defaults to current directory), then runs the Neurex init sequence above.

Installs:

- `react`, `react-dom`, `next@15.3.3` (pinned semver)
- `@types/node`, `@types/react`, `@types/react-dom`, `prettier`, `typescript` (dev)

Scaffold files include `app/layout.tsx`, `app/page.tsx`, `app/globals.css`,
`next.config.ts`, and `postcss.config.mjs`.

> Unsupported framework names throw `CliError: Unsupported init target: <name>`.

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

| Flag            | Description                                                                        |
| --------------- | ---------------------------------------------------------------------------------- |
| `--dry-run`     | Preview components, dependencies, utilities, styles, and install paths — no writes |
| `--no-fallback` | Fail if remote registry is configured and unavailable (no local fallback)          |

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

| State        | Meaning                                       |
| ------------ | --------------------------------------------- |
| `created`    | File was new; written                         |
| `skipped`    | File exists and is identical; no action       |
| `conflicted` | File exists and differs; left untouched       |
| `updated`    | File was auto-updated (generated styles only) |

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
neurex update --utilities
neurex update --all --sync --utilities --styles
neurex update button --dry-run
neurex update --all --force
neurex update --all --sync --force
neurex update --all --yes
```

| Flag            | Description                                                               |
| --------------- | ------------------------------------------------------------------------- |
| `--all`         | Update all components tracked in `neurex.config.json`                     |
| `--styles`      | Update token/theme CSS files (generated output auto-updates when stale)   |
| `--utilities`   | Update shared utility files such as `utils.ts` from installed components  |
| `--sync`        | Refresh tracked component templates even when installed version matches   |
| `--dry-run`     | Preview what would change; no writes; reports conflict/identical per file |
| `--force`       | Write conflicted files after creating `.bak` timestamped backups          |
| `--yes`         | Auto-confirm safe prompts                                                 |
| `--no-fallback` | Fail if remote registry unavailable                                       |

**Version check:** an update is available when the registry item version is
semver-greater than the installed version recorded in `neurex.config.json`.
Use **`--sync`** when the installed version already matches but registry
templates changed (for example after a Neurex patch that did not bump item
versions).

**Per-file update logic:**

- Missing file → restored.
- Identical file → skipped.
- Differs, no `--force` → reported as conflict; installed version unchanged.
- Differs, `--force` → backup created as `<file>.<ISO-timestamp>.bak`; file overwritten.

Components that complete without conflicts have their version updated in config.

**`--styles`** updates token/theme CSS files (the `theme` style manifest) using
the same generated-file auto-update path as `add`.

**`--utilities`** collects utilities referenced by installed components (for
example `cn` → `utilitiesPath/utils.ts`) and applies the same safe-update
rules as component files. Use **`--force`** to overwrite user-modified utility
files after creating backups.

**Combined refresh** (common after upgrading Neurex in a consumer project):

```bash
neurex update --all --sync --utilities --styles
```

---

### `list`

List available registry items from the resolved registry source.

```bash
neurex list
neurex list --json
```

| Flag            | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `--json`        | Output as JSON array with `name`, `canonicalName`, `version`, `category` |
| `--no-fallback` | Fail if remote registry unavailable                                      |

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

| Flag            | Description                         |
| --------------- | ----------------------------------- |
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

| Flag                       | Description                                     |
| -------------------------- | ----------------------------------------------- |
| `--path`, `-p`             | Print the resolved path to `neurex.config.json` |
| `--exists`, `-e`           | Print whether the config file is present        |
| `--set-registry-url <url>` | Persist a remote registry URL                   |
| `--clear-registry-url`     | Set `registryUrl` to `null`                     |

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

| Flag            | Description                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------- |
| `--summary`     | Human-readable output (source, fallback, items with type/category/remote file count)        |
| `--source`      | Print the effective source string (includes `(fallback: local)` note when fallback is used) |
| `--local`       | Read only the bundled `@neurex/registry` package; ignore remote URL                         |
| `--remote`      | Read only the remote URL from config; error if none configured                              |
| `--no-fallback` | Disable local fallback for the default resolution path                                      |

---

### `uninstall`

Removes registry-owned component files when they still match install templates.
Shared utilities and styles are removed only when no remaining installed
component still references them. Modified files are left in place and reported
as conflicts; the component stays tracked in `neurex.config.json`.

```bash
neurex uninstall button
neurex uninstall button --dry-run
```

**Behavior:**

- `--dry-run` — print targets without deleting files or updating config
- Removes component files only when content matches the registry template
- Skips the whole component when any file differs (atomic per component)
- Orphaned utilities/styles removed only after successful component uninstall
- npm dependencies are **not** removed automatically

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
  paths: {
    primitives: string
    blocks: string
    templates: string
    utilities: string
    styles: string
  }
  aliases: {
    primitives: string
    blocks: string
    templates: string
    utils: string
    lib: string
    hooks: string
  }
  tailwind: {
    version: "v4"
    css: string
  }
  installed?: Record<string, string>
  registryUrl?: string | null
}
```

Legacy configs with `componentsPath` / `aliases.ui` are merged into `paths.primitives` on load.

### Defaults

| Field                | Default                       |
| -------------------- | ----------------------------- |
| `style`              | `"default"`                   |
| `paths.primitives`   | `"src/components/primitives"` |
| `paths.blocks`       | `"src/components/blocks"`     |
| `paths.templates`    | `"src/components/templates"`  |
| `paths.utilities`    | `"src/lib"`                   |
| `paths.styles`       | `"styles"`                    |
| `aliases.primitives` | `"@/components/primitives"`   |
| `aliases.blocks`     | `"@/components/blocks"`       |
| `aliases.templates`  | `"@/components/templates"`    |
| `aliases.utils`      | `"@/lib/utils"`               |
| `aliases.lib`        | `"@/lib"`                     |
| `aliases.hooks`      | `"@/hooks"`                   |
| `tailwind.version`   | `"v4"`                        |
| `tailwind.css`       | `"src/style.css"`             |
| `installed`          | `{}`                          |
| `registryUrl`        | `null`                        |

`tailwind.version` is a type literal locked to `"v4"`. Tailwind v3 is not
supported.

---

## Registry source resolution

The CLI resolves registry items from one of two sources:

| Source     | When active                                                                       |
| ---------- | --------------------------------------------------------------------------------- |
| **Local**  | `registryUrl` is `null` or absent; uses `@neurex/registry` bundled with the CLI   |
| **Remote** | `registryUrl` is a URL string; fetches the manifest JSON, validates, then uses it |

When a remote URL is configured and the fetch fails, the CLI falls back to the
local bundled registry (unless `--no-fallback` is passed). The registry is
cached in-memory for the duration of a single CLI invocation.

### Remote registry manifest contract

Remote manifests MUST be JSON fetched over HTTPS. The CLI parses payloads with
`parseRemoteRegistry`:

| Shape           | Fields                                                 | Notes                                   |
| --------------- | ------------------------------------------------------ | --------------------------------------- |
| Manifest object | `version` (string), `items` (array), `styles?` (array) | Preferred contract                      |
| Legacy array    | bare `RegistryItem[]`                                  | Accepted; `version` becomes `"unknown"` |

Each `items[]` entry MUST match the local registry item shape (`name`,
`canonicalName`, `version`, `type`, `category`, `aliases`, `files`,
`dependencies`, `registryDependencies`, `utilities`, `styles`, `target`).
Optional `styles[]` entries follow the local style manifest shape (`name`,
`version`, `files[]` with `path` + `target`).

Malformed manifests throw descriptive errors (invalid item/style index, missing
`version`/`items`, non-array `styles`). Remote optional styles are validated
with the same registry validator options as local styles where applicable.

**Trust model (current):** the CLI trusts the configured URL. There is no
signature verification, checksum enforcement, or host allowlist yet — configure
`registryUrl` only for sources you control. Use `--no-fallback` when remote
unavailability must fail the command instead of using the bundled registry.

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
