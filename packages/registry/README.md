# @neurex/registry

**Audience:** Maintainers, contributors, and agents
**Type:** Package README
**Source of truth for:** Package role, public exports, item structure, template sync
**Verified against:** `packages/registry/src/`

---

## Package Role

`packages/registry` is the install source of truth for the Neurex CLI.

This package owns:

- registry item metadata (what gets installed, where, with which dependencies)
- installable template files (the actual files copied into consumer projects)
- registry styles and utility metadata
- registry validation logic
- the registry manifest consumed by the CLI

This package does not own:

- component reference implementations (owned by `@neurex/ui`)
- CLI install behavior (owned by `packages/cli`)
- design token source or generated CSS (owned by `@neurex/tokens`)

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
import.meta.resolve("@neurex/registry/templates/components/Button/Button.tsx")
```

---

## Registry Item Structure

Each item in `src/items/` declares the full install contract (required fields, optional `remoteFiles`, category values, and what makes an item complete). Full contract: [docs/REGISTRY.md](../../docs/REGISTRY.md).

---

## Templates

Installable templates live under `packages/registry/templates/` — component files, shared utilities, and token CSS styles. Templates are synced from `packages/ui/src/components` and MUST NOT be manually edited.

Template sync rules, the `cn` import transform, and drift validation: [docs/REGISTRY.md](../../docs/REGISTRY.md).

---

## Validation

Two validation functions are exported:

- `validateRegistryItem(item)` — validates a single item against the `RegistryItem` schema
- `validateRegistry(manifest)` — validates the full registry manifest

Tests live in `test/validate-registry.test.ts`.

---

## Development

```sh
pnpm --filter @neurex/registry build
pnpm --filter @neurex/registry typecheck
pnpm --filter @neurex/registry lint
pnpm --filter @neurex/registry test
pnpm registry:sync    # sync UI components → templates (from repo root)
pnpm registry:check   # verify templates are in sync (from repo root)
pnpm registry:build   # build package (from repo root)
```
