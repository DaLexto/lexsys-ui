# Lexsys — Architecture

**Audience:** Maintainers  
**Type:** Architecture overview  
**Source of truth for:** System shape, package boundaries, install flow, major constraints
**Last reviewed:** 2026-05-30

---

Domain specifications own their canonical rules. This document links to them.

## System model

Lexsys is a **registry-first UI framework**. Components are not imported as
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

| Package             | npm name                             | Role                                                                                                                                     |
| ------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/tokens`   | `@dalexto/lexsys-tokens`             | Design token source of truth; resolver; CSS + DTCG generators                                                                            |
| `packages/ui`       | `@dalexto/lexsys-ui`                 | Source/reference React components (not the final distributed form)                                                                       |
| `packages/registry` | `@dalexto/lexsys-registry`           | Registry items, templates, utilities, styles, and metadata validator                                                                     |
| `packages/cli`      | `@dalexto/lexsys-cli` (`lexsys` bin) | CLI installer; reads `@dalexto/lexsys-registry`; orchestrates install into consumer projects                                             |
| `apps/playground`   | `@dalexto/lexsys-playground`         | Monorepo smoke app — workspace `@dalexto/lexsys-ui`; not the consumer install path. See [Testing docs](TESTING.md#verification-surfaces) |

Consumer validation (CLI install path, real layouts, brand/theme UX) happens outside the monorepo — sandbox or SaaS — not in playground.

Package boundaries MUST be respected. Domain contracts live in this document
and linked specs in [Doc index](INDEX.md). [AGENTS.md](../AGENTS.md) is the
agent routing layer — not a duplicate of token/UI/registry rules.

Build toolchain: pnpm workspaces, Turborepo, tsup, TypeScript 6, Vitest,
ESLint, Prettier. See [Deploy guide](DEPLOY.md) for build and publish rules.

---

## Component file contract

Reference components in `packages/ui/src/components/` and install templates in
`packages/registry/templates/` follow this layout. Monorepo folders use three
layers (`primitives/`, `blocks/`, `templates/`); consumer installs flatten to
`src/components/ui/<CanonicalName>/`. See [UI composition](UI_COMPOSITION.md).

```txt
ComponentName/
├── ComponentName.tsx          — implementation
├── ComponentName.types.ts     — props interfaces
└── ComponentName.variants.ts  — CVA variant definitions
```

Components support structured `variant` props and `className` overrides.
Interactive components use `@base-ui/react` primitives internally.
Base UI is an implementation detail — it MUST NOT define the public API shape.

See [Component style guide](STYLEGUIDE.md) and [Style guide](STYLE.md) for naming and
coding conventions.

### UI composition layers

Lexsys uses a **three-layer** reference model in the monorepo:

| Layer      | Monorepo path                            | Consumer install path       |
| ---------- | ---------------------------------------- | --------------------------- |
| Primitives | `packages/ui/src/components/primitives/` | `src/components/ui/<Name>/` |
| Blocks     | `packages/ui/src/components/blocks/`     | `src/components/ui/<Name>/` |
| Templates  | `packages/ui/src/components/templates/`  | `src/components/ui/<Name>/` |

**Shipped today:** 41 primitives; blocks (FormField, SettingsPanel, Sidebar, AuthForm, CommandPalette, Empty); pilot template (DashboardShell). **Pages** remain consumer-owned.

The CLI installs from `item.target` (flat `src/components/ui/`) and rewrites
cross-layer imports at install time so consumer projects do not mirror monorepo
folder depth. `registryDependencies` resolve transitively.

Full layer rules, composition validator, and optimization backlog:
[UI composition](UI_COMPOSITION.md), [Registry reference](REGISTRY.md),
[Backlog § Blocks/templates optimization](REVIEW_TODO.md#blocks--templates-optimization-backlog).

---

## Design token system

Token dependency chain:

```txt
primitives → brand → semantics → component tokens
                 ↑
           themes override semantics per mode (light / dark)
           presets are configuration, not a token layer
```

CSS output uses generated CSS variables as `--lex-<token-path>`. Component
variants in `*.variants.ts` reference them through Tailwind v4 canonical syntax
(for example `bg-(--lex-button-primary-background)`,
`ring-(length:--lex-button-focus-ring-width)`). They MUST NOT use raw Tailwind
palette values or the legacy `[var(--lex-*)]` arbitrary form.

The current preset is `lexsys` (`Lexsys Default`), brand `lexsys`, with
`light` (`:root`) and `dark` (`.dark`) theme modes.

Tailwind v4 is the user-facing styling layer. No runtime theme provider is
required; theme switching is left to the consumer application via class toggling.

Canonical token rules are owned by [Tokens reference](TOKENS.md).

---

## Registry metadata

Every installable item is declared as a `RegistryItem` in
`packages/registry/src/items/`. Required fields:

| Field                    | Purpose                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `name` / `canonicalName` | Registry key + PascalCase folder name                                                   |
| `type` / `category`      | `component`, `block`, `utility`, or `style`; category includes `blocks`, `layout`, etc. |
| `files`                  | Template paths relative to `packages/registry/templates/`                               |
| `dependencies`           | npm packages the CLI installs into the consumer project                                 |
| `registryDependencies`   | Other registry items that must be installed first                                       |
| `utilities`              | Shared utilities (e.g. `cn`)                                                            |
| `styles`                 | Style manifests (e.g. `theme`)                                                          |
| `target`                 | Default install path in the consumer project                                            |

Registry items MAY declare `remoteFiles` for fetching from a remote source.
The registry validator checks for missing references and unknown manifests at
build time.

---

## CLI behavior

### Supported commands

| Command                             | Description                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------- |
| `lexsys init`                       | Initialize Lexsys in an existing project or scaffold Vite+React or Next.js App Router |
| `lexsys add [items...]`             | Install one or more registry items; interactive multiselect when no args              |
| `lexsys update [items...] \| --all` | Update tracked components; supports `--dry-run`, `--force`, `--yes`                   |
| `lexsys update styles`              | Update theme/token CSS files only                                                     |
| `lexsys list [--json]`              | List available registry items                                                         |
| `lexsys status`                     | Show installed components and template drift                                          |
| `lexsys reset`                      | Restore installed components from registry templates (with backup)                    |
| `lexsys doctor`                     | Check project health (config, paths, registry connectivity)                           |
| `lexsys uninstall [items...]`       | Remove tracked components from config                                                 |
| `lexsys registry`                   | Inspect the active registry source                                                    |
| `lexsys version`                    | Print CLI version                                                                     |
| `lexsys help`                       | Show usage                                                                            |

### Registry source

The CLI resolves registry items from:

1. **Local** (`@dalexto/lexsys-registry` bundled with the CLI) — default when
   `registryUrl` is `null` in `lexsys.config.json`.
2. **Remote** — when `registryUrl` is set, the CLI fetches a remote manifest
   JSON over HTTPS, validates item (and optional style) shape, and falls back to
   local if the fetch fails (unless `--no-fallback` is used).

**Trust model:** remote manifests are trusted as configured — no signature,
checksum, or host allowlist enforcement yet. See [CLI reference](./reference/cli/CLI.md) § Remote
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

Scaffolding a new Vite+React app: `lexsys init vite [app-name]`.

**Next.js App Router** detection wires:

- `@import "tailwindcss"` in `app/globals.css` (config `tailwind.css`)
- `@tailwindcss/postcss` in `postcss.config.mjs` when missing
- `@/*` TypeScript path alias in `tsconfig.json`

Scaffolding a new Next.js App Router app: `lexsys init next [app-name]` (pinned
Next.js 15.3.3).

> **Note:** Pages Router, middleware presets, and additional framework scaffolds
> are not implemented yet.

Tailwind v4 is the only supported Tailwind version. The config schema has
`tailwind.version: "v4"` hardcoded.

See [CLI reference](CLI.md) for the full command reference.

---

## Consumer project layout

Default paths after `lexsys init` and component installs:

```txt
project/
├── src/
│   ├── components/ui/<ComponentName>/   ← installed components
│   └── lib/                             ← shared utilities (installed as utils.ts)
├── styles/
│   ├── tokens.css                       ← generated token variables
│   └── theme.css                        ← generated theme overrides
└── lexsys.config.json                   ← Lexsys project config
```

Paths are configurable via `lexsys.config.json` (`paths.components`,
`paths.utilities`, `paths.styles`). Import aliases default to `@/components/ui`,
`@/lib/utils`, `@/lib`, `@/hooks`.

---

## Configuration

`lexsys.config.json` is read and written by the CLI. Shape:

```json
{
  "style": "default",
  "paths": {
    "components": "src/components/ui",
    "utilities": "src/lib",
    "styles": "styles"
  },
  "aliases": {
    "components": "@/components/ui",
    "ui": "@/components/ui",
    "utils": "@/lib/utils",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "tailwind": { "version": "v4", "css": "src/style.css" },
  "installed": ["button"],
  "registryUrl": null
}
```

If the file is missing, the CLI falls back to built-in defaults.

---

## End-to-end install flow

```txt
lexsys add button
  1. Load lexsys.config.json (or apply defaults)
  2. Detect registry source (local | remote URL)
  3. Resolve "button" to Button registry item (by name, alias, or case-insensitive match)
  4. Collect transitive registryDependencies, utilities, styles
  5. Install missing npm dependencies (npm / pnpm / yarn detected from lockfile)
  6. Install shared utilities (skip if identical, conflict if user-modified)
  7. Install token/theme CSS files (skip generated-file header check)
  8. Copy template files to paths.components/<CanonicalName>/
  9. Rewrite cross-layer imports for flat consumer layout (blocks/templates)
 10. Record item name in `installed` array; save config
 11. Print created / updated / skipped / conflicted summary
```

---

## Package manager detection

The CLI detects `pnpm-lock.yaml`, `yarn.lock`, or `package-lock.json` to pick
the correct install invocation. Unrecognized package managers default to npm.
Dependency names are validated against a safe-name regex before any shell
invocation.

---

## Related documentation

- [Documentation index](INDEX.md) — which doc owns which topic
- [Tokens reference](reference/tokens/TOKENS.md) — token layers and CSS generation
- [Registry reference](reference/registry/REGISTRY.md) — install metadata and templates
- [CLI reference](reference/cli/CLI.md) — `lexsys` commands and config
- [Deploy guide](operations/DEPLOY.md) — build and publish contract
