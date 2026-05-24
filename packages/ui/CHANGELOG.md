# Changelog — @lexsys/ui

Pre-0.1.0 breaking changes from the UI package polish pass.

## Unreleased

### Breaking API

- **Alert:** `tone` prop renamed to `variant`. Value `destructive` renamed to `danger`.
- **Badge:** `tone` prop renamed to `variant`. Fill style prop renamed from `variant` to `appearance` (`solid` | `outline`). Value `destructive` renamed to `danger`.
- **Button:** new `variant="danger"` option.

### Token / CSS variable renames

- Component branches `*.destructive.*` renamed to `*.danger.*` (Alert, Badge, Button, Toast).
- CSS variables follow: `--lsys-*-destructive-*` → `--lsys-*-danger-*`.
- Semantic source remains `action.danger`.

### Non-breaking notes

- Toast still uses Base UI `type: "destructive"` on the DOM (`data-[type=destructive]`); Lexsys tokens use `danger` naming.
- Shared disabled/busy opacity uses `--lsys-opacity-disabled` and `--lsys-opacity-busy`.

See [docs/reference/ui/UI_VARIANTS.md](../../docs/reference/ui/UI_VARIANTS.md) for the canonical variant contract.
