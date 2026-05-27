# Lexsys CLI Reference

**Audience:** Users and maintainers  
**Type:** CLI/API reference  
**Source of truth for:** Command surface, flags, config schema, install behavior, error handling  
**Verified against:** `packages/cli/src/` (all commands and core modules)

---

## Usage

```bash
lexsys <command> [options]
# or via npx (early preview dist-tag):
npx lexsys@next <command> [options]
```

The binary is `lexsys`. It reads `lexsys.config.json` from the working directory
or applies built-in defaults when the file is absent.

Every command accepts `--help` / `-h` for per-command usage:

```bash
lexsys add --help
lexsys update --help
```

### Command aliases

| Full command | Alias    |
| ------------ | -------- |
| `init`       | `create` |
| `add`        | `a`      |
| `update`     | `up`     |
| `list`       | `ls`     |
| `status`     | `st`     |
| `doctor`     | `dr`     |
| `uninstall`  | `rm`     |
| `registry`   | `reg`    |
| `config`     | `cfg`    |

### Global options

| Flag            | Alias | Description                                               |
| --------------- | ----- | --------------------------------------------------------- |
| `--cwd <path>`  | `-C`  | Run from a different directory instead of `process.cwd()` |
| `--yes`         |       | Auto-confirm safe prompts where supported                 |
| `--no-fallback` |       | Disable local registry fallback where supported           |
| `--help`        | `-h`  | Print help message                                        |
| `--version`     | `-v`  | Print CLI version                                         |

---

## Commands

### `init`

Initialize Lexsys in a project or scaffold a new Vite+React or Next.js App Router app.

```bash
lexsys init
lexsys init vite
lexsys init vite my-app
lexsys init next
lexsys init next my-app
```

**`lexsys init` (no arguments)**

Detects whether a supported project scaffold exists in the working directory.

- **Vite** — `vite.config.ts|.mts|.js|.mjs` or `vite` in `package.json` dependencies.
- **Next.js** — `next.config.ts|.mjs|.js` or `next` in `package.json` dependencies.

- **Scaffold detected:** runs the Lexsys init sequence (see below).
- **No scaffold detected:** prompts to create a Vite+React or Next.js App Router starter.
  Declining prints guidance to run `lexsys init vite` or `lexsys init next`.

**Lexsys init sequence** (runs after scaffold detection or scaffold command):

1. Creates `paths.components`, `paths.utilities`, and `paths.styles` directories.
2. Installs Tailwind v4 dependencies (Vite: `tailwindcss`, `@tailwindcss/vite`; Next: `tailwindcss`, `@tailwindcss/postcss`).
3. Ensures `@import "tailwindcss";` at the top of the Tailwind CSS entrypoint (`src/style.css` for Vite; `app/globals.css` for Next).
4. **Vite only:** ensures `tailwindcss()` plugin and `"@": fileURLToPath(...)` resolve alias in `vite.config.*`.
5. **Next only:** ensures `postcss.config.mjs` with `@tailwindcss/postcss` when missing.
6. Ensures `"@/*": ["./src/*"]` in `tsconfig.app.json` or `tsconfig.json`.
7. Writes `lexsys.config.json` with default values (Next sets `tailwind.css` to `app/globals.css`).

**`lexsys init vite [directory]`**

Scaffolds a full Vite+React+TypeScript project at `directory` (defaults to
current directory), then runs the Lexsys init sequence above.

Installs:

- `react`, `react-dom`
- `@types/react`, `@types/react-dom`, `@types/node`, `@vitejs/plugin-react`,
  `prettier`, `typescript`, `vite` (dev)

**`lexsys init next [directory]`**

Scaffolds a minimal Next.js App Router + TypeScript project at `directory`
(defaults to current directory), then runs the Lexsys init sequence above.

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
lexsys add <component...>
lexsys add button dialog input
lexsys add button --dry-run
lexsys add button --cwd ./apps/web
lexsys add                          # interactive multiselect
```

| Flag            | Alias | Description                                                                        |
| --------------- | ----- | ---------------------------------------------------------------------------------- |
| `--dry-run`     | `-d`  | Preview components, dependencies, utilities, styles, and install paths — no writes |
| `--no-fallback` |       | Fail if remote registry is configured and unavailable (no local fallback)          |

**Without component arguments**, shows an interactive multiselect of all
available registry items (format: `CanonicalName (category)`).

**Install sequence per `add` run:**

1. Resolve component names (case-insensitive; matches `name`, `canonicalName`,
   or `aliases`). On unknown name, suggests closest match via Levenshtein
   distance ≤ 3.
2. Collect transitive `registryDependencies` (deduped).
3. Collect npm `dependencies`, `utilities`, and `styles` across all items.
4. Install missing npm dependencies.
5. Install utilities to `paths.utilities` (skip if identical; conflict if differs).
6. Install style files to `paths.styles` (skip if identical; auto-update if both
   source and target are generated Lexsys files; conflict otherwise).
7. Wire style `@import` statements into the Tailwind CSS entrypoint.
8. Copy template files to `paths.components/<CanonicalName>/` (all layers — primitives, blocks, templates). Rewrite cross-layer imports to sibling paths on install.
9. Track successfully installed items (no conflicts) in `lexsys.config.json`.
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
lexsys update button
lexsys update button dialog
lexsys update --all
lexsys update --styles
lexsys update --utilities
lexsys update --all --sync --utilities --styles
lexsys update button --dry-run
lexsys update --all --force
lexsys update --all --sync --force
lexsys update --all --yes
```

| Flag            | Alias | Description                                                               |
| --------------- | ----- | ------------------------------------------------------------------------- |
| `--all`         |       | Update all components tracked in `lexsys.config.json`                     |
| `--styles`      |       | Update token/theme CSS files (generated output auto-updates when stale)   |
| `--utilities`   |       | Update shared utility files such as `utils.ts` from installed components  |
| `--sync`        |       | Refresh tracked component templates even when installed version matches   |
| `--dry-run`     | `-d`  | Preview what would change; no writes; reports conflict/identical per file |
| `--force`       |       | Write conflicted files after creating `.bak` timestamped backups          |
| `--yes`         |       | Auto-confirm safe prompts                                                 |
| `--no-fallback` |       | Fail if remote registry unavailable                                       |

**Version check:** an update is available when the registry item version is
semver-greater than the installed version recorded in `lexsys.config.json`.
Use **`--sync`** when the installed version already matches but registry
templates changed (for example after a Lexsys patch that did not bump item
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
example `cn` → `paths.utilities/utils.ts`) and applies the same safe-update
rules as component files. Use **`--force`** to overwrite user-modified utility
files after creating backups.

**Combined refresh** (common after upgrading Lexsys in a consumer project):

```bash
lexsys update --all --sync --utilities --styles
```

---

### `list`

List available registry items from the resolved registry source.

```bash
lexsys list
lexsys list --json
```

| Flag            | Alias | Description                                                                       |
| --------------- | ----- | --------------------------------------------------------------------------------- |
| `--json`        | `-j`  | Output as JSON array with `name`, `canonicalName`, `version`, `category`, `layer` |
| `--no-fallback` |       | Fail if remote registry unavailable                                               |

Default output groups items by install layer (`Primitives`, `Blocks`, `Templates`):

```txt
Available Lexsys registry items:

Primitives:
- Button v… (actions)
…

Blocks:
- Sidebar v… (blocks)
…
```

---

### `status`

Show installed component versions and update availability.

```bash
lexsys status
```

Reads the `installed` map from `lexsys.config.json` and compares each recorded
version against the active registry. Output per component:

```txt
- Button v0.0.1 (up to date)
- Dialog v0.0.1 (update available: v0.0.1 → v0.0.2)
- Input v0.0.1 (missing from registry)
```

If no components are tracked: `"No Lexsys components are currently tracked."`

---

### `doctor`

Check project health against the current config.

```bash
lexsys doctor
lexsys doctor --no-fallback
```

| Flag            | Description                         |
| --------------- | ----------------------------------- |
| `--no-fallback` | Fail if remote registry unavailable |

Checks and prints `✓` / `×` for:

- `package.json` — present in working directory
- `paths.components` — directory exists
- `paths.utilities` — directory exists
- `paths.styles` — directory exists
- `tailwind.css` — entrypoint file exists
- Registry connectivity — source URL, fallback used, item count
- Each tracked component — directory exists; reports `missing from registry` if
  the item was removed from the active registry

---

### `config`

Print or modify `lexsys.config.json`.

```bash
lexsys config                                           # print full config as JSON
lexsys config --path                                    # print config file path
lexsys config --exists                                  # print "Config exists." or "Config does not exist."
lexsys config --set-registry-url https://example.com/registry.json
lexsys config --clear-registry-url
```

| Flag                       | Alias | Description                                     |
| -------------------------- | ----- | ----------------------------------------------- |
| `--path`                   | `-p`  | Print the resolved path to `lexsys.config.json` |
| `--exists`                 | `-e`  | Print whether the config file is present        |
| `--set-registry-url <url>` |       | Persist a remote registry URL                   |
| `--clear-registry-url`     |       | Set `registryUrl` to `null`                     |

With no flags: reads config (merging defaults) and prints as indented JSON.

---

### `registry`

Inspect the registry source and manifest.

```bash
lexsys registry                      # JSON manifest from resolved source
lexsys registry --summary            # human-readable: source, item count, per-item details
lexsys registry --source             # print active registry source string
lexsys registry --local              # inspect the bundled local registry
lexsys registry --local --summary
lexsys registry --remote             # inspect the configured remote registry
lexsys registry --remote --source
lexsys registry --no-fallback
```

| Flag            | Alias | Description                                                                                 |
| --------------- | ----- | ------------------------------------------------------------------------------------------- |
| `--summary`     | `-s`  | Human-readable output (source, fallback, items with type/category/remote file count)        |
| `--source`      |       | Print the effective source string (includes `(fallback: local)` note when fallback is used) |
| `--local`       | `-l`  | Read only the bundled `@dalexto/lexsys-registry` package; ignore remote URL                 |
| `--remote`      | `-r`  | Read only the remote URL from config; error if none configured                              |
| `--no-fallback` |       | Disable local fallback for the default resolution path                                      |

---

### `uninstall`

Removes registry-owned component files when they still match install templates.
Shared utilities and styles are removed only when no remaining installed
component still references them. Modified files are left in place and reported
as conflicts; the component stays tracked in `lexsys.config.json`.

```bash
lexsys uninstall button
lexsys uninstall button --dry-run
```

**Behavior:**

- `--dry-run` / `-d` — print targets without deleting files or updating config
- Removes component files only when content matches the registry template
- Skips the whole component when any file differs (atomic per component)
- Orphaned utilities/styles removed only after successful component uninstall
- npm dependencies are **not** removed automatically

---

### `version`

Print the CLI version read from the installed package's `package.json`.

```bash
lexsys version
lexsys -v
lexsys --version
```

---

### `help`

Print the full usage message.

```bash
lexsys help
lexsys -h
lexsys --help
```

---

## Configuration

`lexsys.config.json` in the project root. Created by `init`; read and updated
by all commands. The CLI merges persisted values with built-in defaults on every
load — missing fields fall back to defaults without error.

### Schema

```ts
interface LexsysConfig {
  style: "default"
  paths: {
    components: string
    utilities: string
    styles: string
  }
  aliases: {
    components: string
    ui: string
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

All installable items (primitives, blocks, templates) copy into
`paths.components/<CanonicalName>/`. The CLI rewrites cross-layer template
imports to sibling paths on install (for example `../Button/Button`).

### Defaults

| Field                | Default               |
| -------------------- | --------------------- |
| `style`              | `"default"`           |
| `paths.components`   | `"src/components/ui"` |
| `paths.utilities`    | `"src/lib"`           |
| `paths.styles`       | `"styles"`            |
| `aliases.components` | `"@/components/ui"`   |
| `aliases.ui`         | `"@/components/ui"`   |
| `aliases.utils`      | `"@/lib/utils"`       |
| `aliases.lib`        | `"@/lib"`             |
| `aliases.hooks`      | `"@/hooks"`           |
| `tailwind.version`   | `"v4"`                |
| `tailwind.css`       | `"src/style.css"`     |
| `installed`          | `{}`                  |
| `registryUrl`        | `null`                |

`tailwind.version` is a type literal locked to `"v4"`. Tailwind v3 is not
supported.

---

## Registry source resolution

The CLI resolves registry items from one of two sources:

| Source     | When active                                                                             |
| ---------- | --------------------------------------------------------------------------------------- |
| **Local**  | `registryUrl` is `null` or absent; uses `@dalexto/lexsys-registry` bundled with the CLI |
| **Remote** | `registryUrl` is a URL string; fetches the manifest JSON, validates, then uses it       |

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

`CliError` messages are printed as:

```
✗ <message>
  → <suggestion>      (when available)

Run `lexsys <command> --help` for usage.
```

Unexpected errors print `Unexpected error: <message>` and exit with code 1.
Unknown commands throw `CliError: Unknown command: <name>` and the help message
is printed. All errors exit with code 1.

---

## Install safety rules

- The CLI MUST NOT overwrite user-modified files silently.
- Conflicts are reported and left untouched unless `--force` is specified.
- `--force` MUST create a timestamped `.bak` backup before overwriting.
- Style files starting with `/* Generated by @dalexto/lexsys-tokens. Do not edit directly. */`
  are auto-updated without conflict because they are not user-owned.
- Items with any conflict during `add` are not recorded in the installed map.
- Items with conflicts during `update` do not have their version bumped.
