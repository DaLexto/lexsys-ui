# @lexsys/registry

**Audience:** Maintainers, contributors, and agents
**Type:** Package README
**Source of truth for:** Package role, public exports, item structure, template sync
**Verified against:** `packages/registry/src/`

---

## Package Role

`packages/registry` is the install source of truth for the Lexsys CLI.

This package owns:

- registry item metadata (what gets installed, where, with which dependencies)
- installable template files (the actual files copied into consumer projects)
- registry styles and utility metadata
- registry validation logic
- the registry manifest consumed by the CLI

This package does not own:

- component reference implementations (owned by `@lexsys/ui`)
- CLI install behavior (owned by `packages/cli`)
- design token source or generated CSS (owned by `@lexsys/tokens`)

---

## Public Exports

From the package root (`.`):

| Export                  | Type                | Purpose                                          |
| ----------------------- | ------------------- | ------------------------------------------------ |
| `registryManifest`      | `RegistryManifest`  | Full registry: items, styles, utilities, version |
| `registryItems`         | `RegistryItem[]`    | All installable component/utility/style items    |
| `registryStyles`        | `RegistryStyle[]`   | All style descriptors (`theme`)                  |
| `registryUtilities`     | `RegistryUtility[]` | All shared utility descriptors (`cn`)            |
| `registryVersion`       | `string`            | Package version string                           |
| `themeRegistryStyle`    | `RegistryStyle`     | Theme style metadata                             |
| `cnRegistryUtility`     | `RegistryUtility`   | `cn` utility metadata                            |
| `validateRegistry`      | `function`          | Validate the full registry manifest              |
| `validateRegistryItem`  | `function`          | Validate a single registry item                  |
| Individual item exports | `RegistryItem`      | e.g. `buttonRegistryItem`, `badgeRegistryItem`   |

Types exported: `RegistryFile`, `RegistryItem`, `RegistryItemCategory`,
`RegistryItemType`, `RegistryStyle`, `RegistryStyleFile`, `RegistryUtility`.

Templates are resolved via the `./templates/*` export path, not the `.` entry:

```ts
import.meta.resolve("@lexsys/registry/templates/components/Button/Button.tsx")
```

---

## Registry Item Structure

Each item in `src/items/` declares the full install contract (required fields, optional `remoteFiles`, category values, and what makes an item complete). Full contract: [docs/REGISTRY.md](../../docs/REGISTRY.md).

---

## Templates

Installable templates live under `packages/registry/templates/` — component files, shared utilities, and token CSS styles. Component templates are synced from `packages/ui/src/components`; style templates from `@lexsys/tokens` via `generate:styles`. Templates MUST NOT be manually edited.

Template sync rules, the `cn` import transform, and drift validation: [docs/REGISTRY.md](../../docs/REGISTRY.md).

---

## Validation

Two validation functions are exported:

- `validateRegistryItem(item)` — validates a single item against the `RegistryItem` schema
- `validateRegistry(manifest)` — validates the full registry manifest

Tests live in `packages/registry/test/`:

- `validate-registry.test.ts` — manifest and template validation
- `registry-styles-sync.test.ts` — style template drift compare helpers

Full inventory: [docs/TESTING.md](../../docs/TESTING.md).

---

## Development

```sh
pnpm registry:build
pnpm registry:check
pnpm registry:sync
pnpm tokens:generate:styles
```

Full script reference: [docs/SCRIPTS.md](../../docs/SCRIPTS.md).
