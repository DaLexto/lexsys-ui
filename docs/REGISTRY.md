# Neurex Registry

**Audience:** Maintainers and agents
**Type:** Domain specification
**Source of truth for:** Registry item contract, template sync rules, validation requirements, local/remote resolution
**Verified against:** `packages/registry/src/`
**Related docs:** `docs/CLI.md` (install behavior), `docs/ARCHITECTURE.md` (package boundaries), `packages/registry/README.md` (package internals)

---

## What the Registry Is

The registry is the install contract layer between Neurex components and consumer
projects. It defines everything the CLI needs to install a component safely and
completely.

The registry does not contain component implementations. It contains metadata
about what to install, and templates to copy.

---

## Registry Item Contract

Every installable item MUST declare all of the following fields:

| Field                  | Type                                  | Contract                                                     |
| ---------------------- | ------------------------------------- | ------------------------------------------------------------ |
| `name`                 | `string`                              | Lowercase lookup key; unique across the registry             |
| `canonicalName`        | `string`                              | PascalCase display name; matches component folder name       |
| `version`              | `string`                              | Semver string; used by `status` and `update` to detect drift |
| `type`                 | `"component" \| "utility" \| "style"` | Determines install behavior                                  |
| `category`             | `RegistryItemCategory`                | Groups items in `list` output                                |
| `aliases`              | `string[]`                            | Alternative lookup names; MAY be empty                       |
| `files`                | `string[]`                            | Template-relative paths of files to copy                     |
| `dependencies`         | `string[]`                            | npm packages the CLI MUST install                            |
| `registryDependencies` | `string[]`                            | Other registry items that MUST be installed first            |
| `utilities`            | `string[]`                            | Shared utility names the CLI MUST resolve and install        |
| `styles`               | `string[]`                            | Style names the CLI MUST resolve and install                 |
| `target`               | `string`                              | Default consumer project install path                        |

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
  components/<ComponentName>/   ← component files
  shared/utils/                 ← shared utilities (cn.ts)
  styles/                       ← tokens.css, theme.css
```

Rules:

- Component templates are generated copies of `packages/ui/src/components`.
- Style templates (`tokens.css`, `theme.css`) are generated copies of `@neurex/tokens` output.
- Templates MUST NOT be manually edited. Component templates are overwritten by `pnpm registry:sync`; style templates by `pnpm --filter @neurex/tokens generate:styles`.
- The only transform applied during sync is the `cn` import path rewrite:
  `import { cn } from "../../utils/cn"` → `import { cn } from "@/lib/utils"`
- Any other template-specific transform MUST be added to `scripts/sync-component-templates.mjs`, not applied by hand.
- Template drift is a validation error. `pnpm registry:check` will fail if component templates are out of sync with the UI source or if style templates differ from the current token generator output.

Registry item metadata files (in `src/items/`) are manually authored because
they define the install contract, not the component implementation.

---

## Registry Validation

Two validators are exported from the package:

- `validateRegistryItem(item)` — validates a single item against the schema
- `validateRegistry(manifest)` — validates the full registry manifest

These are run in `test/validate-registry.test.ts`. This test MUST pass before
publishing the registry package.

---

## Local vs Remote Registry

The CLI resolves registry sources in this order:

1. If `registryUrl` is set in `neurex.config.json`, use the remote registry.
2. Otherwise, use the local `@neurex/registry` package (installed as a dependency).
3. If `--no-fallback` is passed, only the explicitly selected source is used.

The `neurex registry --source` flag reports which source is active.

The remote registry MUST expose the same shape as the local registry manifest.
The CLI MUST NOT require format differences between local and remote sources.

---

## Categories

Valid `RegistryItemCategory` values:

| Category       | Description                                  |
| -------------- | -------------------------------------------- |
| `actions`      | Buttons, toggles, interactive triggers       |
| `forms`        | Inputs, checkboxes, selects, form primitives |
| `overlays`     | Dialogs, drawers, popovers, tooltips         |
| `navigation`   | Menus, tabs, pagination                      |
| `feedback`     | Alerts, toasts, progress, meters             |
| `layout`       | Separators, containers, layout helpers       |
| `data-display` | Avatars, badges, cards, data visualization   |
| `utilities`    | Shared utility code                          |

---

## Ownership Boundaries

| Concern                            | Owner                          |
| ---------------------------------- | ------------------------------ |
| Install metadata (what to install) | `packages/registry/src/items/` |
| Install templates (files to copy)  | `packages/registry/templates/` |
| Install behavior (how to install)  | `packages/cli/src/`            |
| Component implementations          | `packages/ui/src/components/`  |
| Token CSS artifacts                | `@neurex/tokens` build output  |

Do not add install logic to registry metadata. Do not add registry metadata
rules to CLI code. Do not manually maintain templates.
