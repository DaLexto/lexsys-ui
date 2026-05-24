# Lexsys Registry

**Audience:** Maintainers and agents
**Type:** Domain specification
**Source of truth for:** Registry item contract, template sync rules, validation requirements, local/remote resolution
**Verified against:** `packages/registry/src/`
**Related docs:** `docs/CLI.md` (install behavior), `docs/ARCHITECTURE.md` (package boundaries), `packages/registry/README.md` (package internals)

---

## What the Registry Is

The registry is the install contract layer between Lexsys components and consumer
projects. It defines everything the CLI needs to install a component safely and
completely.

The registry does not contain component implementations. It contains metadata
about what to install, and templates to copy.

---

## Registry Item Contract

Every installable item MUST declare all of the following fields:

| Field                  | Type                                             | Contract                                                     |
| ---------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `name`                 | `string`                                         | Lowercase lookup key; unique across the registry             |
| `canonicalName`        | `string`                                         | PascalCase display name; matches component folder name       |
| `version`              | `string`                                         | Semver string; used by `status` and `update` to detect drift |
| `type`                 | `"component" \| "block" \| "utility" \| "style"` | Determines install behavior and path conventions             |
| `category`             | `RegistryItemCategory`                           | Groups items in `list` output                                |
| `aliases`              | `string[]`                                       | Alternative lookup names; MAY be empty                       |
| `files`                | `string[]`                                       | Template-relative paths of files to copy                     |
| `dependencies`         | `string[]`                                       | npm packages the CLI MUST install                            |
| `registryDependencies` | `string[]`                                       | Other registry items that MUST be installed first            |
| `utilities`            | `string[]`                                       | Shared utility names the CLI MUST resolve and install        |
| `styles`               | `string[]`                                       | Style names the CLI MUST resolve and install                 |
| `target`               | `string`                                         | Default consumer project install path                        |

### Primitives (`type: "component"`)

Layer model: [UI_COMPOSITION.md](./UI_COMPOSITION.md).

- Template paths MUST start with `primitives/<CanonicalName>/`
- `target` MUST be `src/components/ui/<CanonicalName>`
- `registryDependencies` MUST be `[]`

### Blocks (`type: "block"`, install layer: blocks)

Composed UI patterns. Layer is registry metadata; consumer install path is flat `ui/`.

- Template paths MUST start with `blocks/<CanonicalName>/`
- `target` MUST be `src/components/ui/<CanonicalName>`
- `category` MUST be `blocks`
- `registryDependencies` MAY reference primitives and other blocks (not templates)

### Templates (`type: "block"`, install layer: templates)

Page/layout shells.

- Template paths MUST start with `templates/<CanonicalName>/`
- `target` MUST be `src/components/ui/<CanonicalName>`
- `category` MUST be `blocks` (CLI grouping) or `layout` when added
- `registryDependencies` MAY reference primitives, blocks, and other templates

**Composition (`registryDependencies`)** — enforced by `validateRegistryComposition` at `pnpm registry:check`:

| Install layer (from template prefix) | MAY depend on                           |
| ------------------------------------ | --------------------------------------- |
| `primitives/`                        | _(none — `registryDependencies` empty)_ |
| `blocks/`                            | primitives + blocks                     |
| `templates/`                         | primitives + blocks + templates         |

Rules:

- Declare **direct** imports only — CLI installs the transitive closure
- No circular `registryDependencies`
- Blocks MUST NOT depend on templates

Example block metadata (from `packages/registry/src/items/sidebar.ts`):

```typescript
export const sidebarRegistryItem: RegistryItem = {
  name: "sidebar",
  canonicalName: "Sidebar",
  version: "0.0.1",
  type: "block",
  category: "blocks",
  aliases: [],
  files: [
    "blocks/Sidebar/Sidebar.tsx",
    "blocks/Sidebar/Sidebar.types.ts",
    "blocks/Sidebar/Sidebar.variants.ts",
  ],
  dependencies: [
    "class-variance-authority",
    "clsx",
    "lucide-react",
    "tailwind-merge",
  ],
  registryDependencies: ["button", "drawer", "menu", "scroll-area"],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Sidebar",
}
```

Example template metadata (from `packages/registry/src/items/dashboard-shell.ts`):

```typescript
export const dashboardShellRegistryItem: RegistryItem = {
  name: "dashboard-shell",
  canonicalName: "DashboardShell",
  version: "0.0.1",
  type: "block",
  category: "layout",
  aliases: ["dashboard-template"],
  files: [
    "templates/DashboardShell/DashboardShell.tsx",
    "templates/DashboardShell/DashboardShell.types.ts",
    "templates/DashboardShell/DashboardShell.variants.ts",
  ],
  dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  registryDependencies: ["sidebar"],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/DashboardShell",
}
```

Block/primitive/template reference source lives under
`packages/ui/src/components/{primitives,blocks,templates}/`. Install templates
mirror that layout under `packages/registry/templates/{primitives,blocks,templates}/`.

**Consumer install path vs monorepo layout:** `target` is always flat
`src/components/ui/<CanonicalName>/` regardless of registry layer. The CLI
rewrites cross-layer imports in block/template files at install time
(`../../primitives/` → `../`, etc.) so consumers do not mirror monorepo folder
depth. See [CLI.md](./CLI.md) and `packages/cli/src/core/import-rewriter.ts`.

If the CLI needs any knowledge not declared in the registry item, the item is
incomplete.

### Optional fields

| Field         | Type             | Contract                                                          |
| ------------- | ---------------- | ----------------------------------------------------------------- |
| `remoteFiles` | `RegistryFile[]` | Remote source descriptors used when the remote registry is active |

---

## Template Rules

Templates are the files copied into consumer projects. They live under
`packages/registry/templates/`.

```
templates/
  primitives/<ComponentName>/   ← primitive templates
  blocks/<BlockName>/           ← block templates
  templates/<TemplateName>/     ← template-layer templates
  shared/utils/                 ← shared utilities (cn.ts)
  styles/                       ← tokens.css, theme.css
```

Rules:

- Primitive, block, and template files are generated copies of
  `packages/ui/src/components/{primitives,blocks,templates}/` via
  `pnpm registry:sync` (`sync-all-templates.mjs`).
- Style templates (`tokens.css`, `theme.css`) are generated copies of
  `@lexsys/tokens` output.
- Templates MUST NOT be hand-edited. Overwrite via sync scripts only.
- **Sync transforms (registry templates):**
  - `cn` / `mergeClassName` import paths → `@/lib/utils`
  - Block/template sync may rewrite monorepo-relative cross-layer imports for
    template storage; see `scripts/sync-block-templates.mjs`
- **Install transforms (consumer project):** CLI rewrites cross-layer imports in
  block/template installs for flat `paths.components` layout. Sync does not
  apply consumer paths — that happens in `packages/cli` at install/update time.
- Template drift is a validation error. `pnpm registry:check` fails if templates
  are out of sync with UI source or if style templates differ from token output.

Registry item metadata files (in `src/items/`) are manually authored because
they define the install contract, not the component implementation.

---

## Registry Validation

Two validators are exported from the package:

- `validateRegistryItem(item)` — validates a single item against the schema
- `validateRegistry(manifest)` — validates the full registry manifest
- `validateRegistryComposition(items)` — enforces layer dependency rules for
  blocks and templates (see composition table above)

These are run in `test/validate-registry.test.ts`. Style template sync helpers
are covered in `test/registry-styles-sync.test.ts`. Full inventory:
[TESTING.md](./TESTING.md). Registry checks MUST pass before publishing the
registry package.

Sync commands: [SCRIPTS.md](./SCRIPTS.md) (`registry:sync`, `registry:check`).

---

## Local vs Remote Registry

The CLI resolves registry sources in this order:

1. If `registryUrl` is set in `lexsys.config.json`, use the remote registry.
2. Otherwise, use the local `@lexsys/registry` package (installed as a dependency).
3. If `--no-fallback` is passed, only the explicitly selected source is used.

The `lexsys registry --source` flag reports which source is active.

The remote registry MUST expose the same shape as the local registry manifest.
The CLI MUST NOT require format differences between local and remote sources.

---

## Categories

Valid `RegistryItemCategory` values:

| Category       | Description                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------- |
| `actions`      | Buttons, toggles, interactive triggers                                                         |
| `forms`        | Inputs, checkboxes, selects, form primitives                                                   |
| `overlays`     | Dialogs, drawers, popovers, tooltips                                                           |
| `navigation`   | Menus, tabs, pagination                                                                        |
| `feedback`     | Alerts, toasts, progress, meters                                                               |
| `layout`       | Separators, containers, layout helpers                                                         |
| `data-display` | Avatars, badges, cards, data visualization                                                     |
| `utilities`    | Shared utility code                                                                            |
| `blocks`       | Composed patterns (FormField, SettingsPanel, Sidebar, AuthForm, CommandPalette, layout shells) |

---

## Ownership Boundaries

| Concern                            | Owner                          |
| ---------------------------------- | ------------------------------ |
| Install metadata (what to install) | `packages/registry/src/items/` |
| Install templates (files to copy)  | `packages/registry/templates/` |
| Install behavior (how to install)  | `packages/cli/src/`            |
| Component implementations          | `packages/ui/src/components/`  |
| Token CSS artifacts                | `@lexsys/tokens` build output  |

Do not add install logic to registry metadata. Do not add registry metadata
rules to CLI code. Do not manually maintain templates.
