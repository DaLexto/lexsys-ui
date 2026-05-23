# Neurex — Architecture

**Audience:** Maintainers  
**Type:** Architecture overview  
**Source of truth for:** System shape, package boundaries, install flow, major constraints

Domain specifications own their canonical rules. This document links to them.

---

## System model

Neurex is a **registry-first UI framework**. Components are not imported as
library dependencies — they are installed as user-owned source files.

Install flow:

```txt
packages/tokens  →  generated CSS (tokens.css, theme.css)
packages/ui      →  source/reference components
packages/registry →  installable templates + metadata
packages/cli     →  reads registry, installs into consumer project
                         ↓
                 consumer project (user-owned code)
```

Core invariants:

- The CLI MUST read registry metadata to drive installs; no per-component
  install logic is hardcoded in the CLI.
- Installed files become user-owned. The CLI MUST NOT overwrite them silently.
- Installs MUST be idempotent.

---

## Monorepo packages

| Package             | npm name             | Role                                                                                                                           |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `packages/tokens`   | `@neurex/tokens`     | Design token source of truth; resolver; CSS + DTCG generators                                                                  |
| `packages/ui`       | `@neurex/ui`         | Source/reference React components (not the final distributed form)                                                             |
| `packages/registry` | `@neurex/registry`   | Registry items, templates, utilities, styles, and metadata validator                                                           |
| `packages/cli`      | `neurex` (bin)       | CLI installer; reads `@neurex/registry`; orchestrates install into consumer projects                                           |
| `apps/playground`   | `@neurex/playground` | Monorepo smoke app — workspace `@neurex/ui`; not the consumer install path. See [TESTING.md](TESTING.md#verification-surfaces) |

Consumer validation (CLI install path, real layouts, brand/theme UX) happens outside the monorepo — sandbox or SaaS — not in playground.

Package boundaries MUST be respected. See [AGENTS.md](../AGENTS.md) for package
contracts and `package.json` exports for each package's public API.

Build toolchain: pnpm workspaces, Turborepo, tsup, TypeScript 6, Vitest,
ESLint, Prettier. See [DEPLOY.md](DEPLOY.md) for build and publish rules.

---

## Component file contract

Every component in `packages/ui/src/components/` and every installed template
in `packages/registry/templates/components/` follows this layout:

```txt
ComponentName/
├── ComponentName.tsx          — implementation
├── ComponentName.types.ts     — props interfaces
└── ComponentName.variants.ts  — CVA variant definitions
```

Components support structured `variant` props and `className` overrides.
Interactive components use `@base-ui/react` primitives internally.
Base UI is an implementation detail — it MUST NOT define the public API shape.

See [STYLEGUIDE.md](STYLEGUIDE.md) and [STYLE.md](STYLE.md) for naming and
coding conventions.

---

## Design token system

Token dependency chain:

```txt
primitives → brand → semantics → component tokens
                 ↑
           themes override semantics per mode (light / dark)
           presets are configuration, not a token layer
```

CSS output uses generated CSS variables as `--nx-<token-path>`. Component
variants in `*.variants.ts` reference them through Tailwind v4 canonical syntax
(for example `bg-(--nx-button-primary-background)`,
`ring-(length:--nx-button-focus-ring-width)`). They MUST NOT use raw Tailwind
palette values or the legacy `[var(--nx-*)]` arbitrary form.

The current preset is `neurex` (`Neurex Default`), brand `neurex`, with
`light` (`:root`) and `dark` (`.dark`) theme modes.

Tailwind v4 is the user-facing styling layer. No runtime theme provider is
required; theme switching is left to the consumer application via class toggling.

Canonical token rules are owned by [TOKENS.md](TOKENS.md).

---

## Registry metadata

Every installable item is declared as a `RegistryItem` in
`packages/registry/src/items/`. Required fields:

| Field                    | Purpose                                                      |
| ------------------------ | ------------------------------------------------------------ |
| `name` / `canonicalName` | Registry key + PascalCase folder name                        |
| `version`                | Item version (tracked in `neurex.config.json` after install) |
| `type` / `category`      | `component`, `utility`, or `style`; one of 8 categories      |
| `files`                  | Template paths relative to `packages/registry/templates/`    |
| `dependencies`           | npm packages the CLI installs into the consumer project      |
| `registryDependencies`   | Other registry items that must be installed first            |
| `utilities`              | Shared utilities (e.g. `cn`)                                 |
| `styles`                 | Style manifests (e.g. `theme`)                               |
| `target`                 | Default install path in the consumer project                 |

Registry items MAY declare `remoteFiles` for fetching from a remote source.
The registry validator checks for missing references and unknown manifests at
build time.

---

## CLI behavior

### Supported commands

| Command                             | Description                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------- |
| `neurex init`                       | Initialize Neurex in an existing project or scaffold Vite+React or Next.js App Router |
| `neurex add [items...]`             | Install one or more registry items; interactive multiselect when no args              |
| `neurex update [items...] \| --all` | Update tracked components; supports `--dry-run`, `--force`, `--yes`                   |
| `neurex update styles`              | Update theme/token CSS files only                                                     |
| `neurex list [--json]`              | List available registry items                                                         |
| `neurex status`                     | Show installed component versions                                                     |
| `neurex doctor`                     | Check project health (config, paths, registry connectivity)                           |
| `neurex uninstall [items...]`       | Remove tracked components from config                                                 |
| `neurex registry`                   | Inspect the active registry source                                                    |
| `neurex version`                    | Print CLI version                                                                     |
| `neurex help`                       | Show usage                                                                            |

### Registry source

The CLI resolves registry items from:

1. **Local** (`@neurex/registry` bundled with the CLI) — default when
   `registryUrl` is `null` in `neurex.config.json`.
2. **Remote** — when `registryUrl` is set, the CLI fetches a remote manifest
   JSON over HTTPS, validates item (and optional style) shape, and falls back to
   local if the fetch fails (unless `--no-fallback` is used).

**Trust model:** remote manifests are trusted as configured — no signature,
checksum, or host allowlist enforcement yet. See [CLI.md](./CLI.md) § Remote
registry manifest contract.

### Install idempotency

Each resource reports one of four states:

```txt
created    — file or dependency was new
updated    — file changed and was safe to overwrite (generated content)
skipped    — already identical; no action taken
conflicted — file differs and is user-modified; left untouched, requires review
```

Conflicts are reported clearly. The CLI MUST NOT proceed silently past a conflict
on user-owned files.

Update operations create `.bak` backup files before overwriting.

### Framework support (current)

The `init` command detects an existing **Vite** or **Next.js App Router**
project and wires Tailwind v4 accordingly.

**Vite** detection wires:

- `@import "tailwindcss"` in the CSS entrypoint (`src/style.css` by default)
- `@tailwindcss/vite` plugin in `vite.config.*`
- `@/*` TypeScript path alias in `tsconfig.app.json` or `tsconfig.json`
- Matching Vite runtime alias

Scaffolding a new Vite+React app: `neurex init vite [app-name]`.

**Next.js App Router** detection wires:

- `@import "tailwindcss"` in `app/globals.css` (config `tailwind.css`)
- `@tailwindcss/postcss` in `postcss.config.mjs` when missing
- `@/*` TypeScript path alias in `tsconfig.json`

Scaffolding a new Next.js App Router app: `neurex init next [app-name]` (pinned
Next.js 15.3.3).

> **Note:** Pages Router, middleware presets, and additional framework scaffolds
> are not implemented yet.

Tailwind v4 is the only supported Tailwind version. The config schema has
`tailwind.version: "v4"` hardcoded.

See [CLI.md](CLI.md) for the full command reference.

---

## Consumer project layout

Default paths after `neurex init` and component installs:

```txt
project/
├── src/
│   ├── components/ui/<ComponentName>/   ← installed components
│   └── lib/                             ← shared utilities (cn.ts)
├── styles/
│   ├── tokens.css                       ← generated token variables
│   └── theme.css                        ← generated theme overrides
└── neurex.config.json                   ← Neurex project config
```

Paths are configurable via `neurex.config.json` (`componentsPath`,
`utilitiesPath`, `stylesPath`). Import aliases default to `@/components/ui`,
`@/lib/utils`, `@/lib`, `@/hooks`.

---

## Configuration

`neurex.config.json` is read and written by the CLI. Shape:

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
  "tailwind": { "version": "v4", "css": "src/style.css" },
  "installed": { "button": "0.0.1" },
  "registryUrl": null
}
```

If the file is missing, the CLI falls back to built-in defaults.

---

## End-to-end install flow

```txt
neurex add button
  1. Load neurex.config.json (or apply defaults)
  2. Detect registry source (local | remote URL)
  3. Resolve "button" to Button registry item (by name, alias, or case-insensitive match)
  4. Collect transitive registryDependencies, utilities, styles
  5. Install missing npm dependencies (npm / pnpm / yarn detected from lockfile)
  6. Install shared utilities (skip if identical, conflict if user-modified)
  7. Install token/theme CSS files (skip generated-file header check)
  8. Copy component template files to componentsPath/Button/
  9. Record item version in installed map; save config
 10. Print created / updated / skipped / conflicted summary
```

---

## Package manager detection

The CLI detects `pnpm-lock.yaml`, `yarn.lock`, or `package-lock.json` to pick
the correct install invocation. Unrecognized package managers default to npm.
Dependency names are validated against a safe-name regex before any shell
invocation.

---

## Related documents

| Document                                       | Owns                                                        |
| ---------------------------------------------- | ----------------------------------------------------------- |
| [TOKENS.md](TOKENS.md)                         | Token layer rules, resolver, CSS generation, validation     |
| [RESOLVER_EVOLUTION.md](RESOLVER_EVOLUTION.md) | Post–Phase 10 resolver direction, deferred speculative work |
| [CLI.md](CLI.md)                               | Full CLI command reference, flags, config options           |
| [STYLEGUIDE.md](STYLEGUIDE.md)                 | Component naming, file layout, CSS class conventions        |
| [STYLE.md](STYLE.md)                           | Coding style, TypeScript, React, import/export rules        |
| [DEPLOY.md](DEPLOY.md)                         | Build pipeline, publish-readiness, artifact contract        |
| [AGENTS.md](../AGENTS.md)                      | Package contracts, architectural invariants, agent guidance |
