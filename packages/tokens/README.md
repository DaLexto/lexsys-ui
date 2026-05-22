# @neurex/tokens

Design token source, validation, resolution, and generated style output package for Neurex.

This package owns the token system implementation. It does not own component rendering, CLI install behavior, or registry metadata.

## Purpose

`@neurex/tokens` is responsible for:

- defining token authoring files
- validating token structure and references
- resolving token references
- generating CSS custom properties
- generating Tailwind `@theme` mappings
- generating DTCG-compatible token JSON
- preparing style outputs consumed by the registry and CLI

Canonical token architecture rules are defined in [docs/TOKENS.md](../../docs/TOKENS.md).

Design-system flow is defined in [docs/DESIGN_SYSTEM.md](../../docs/DESIGN_SYSTEM.md).

If this package README conflicts with the root token rules, [docs/TOKENS.md](../../docs/TOKENS.md) wins.

---

## Package Role

This package is the source package for Neurex design tokens.

It provides:

```text
TypeScript token authoring
        ↓
validation and resolution
        ↓
generated outputs
        ↓
registry/CLI-consumable style artifacts
```

Generated output files are artifacts. They must not become the source of truth.

---

## Token Dependency Model

```text
primitives -> brand -> semantics -> components
                ↑
              themes override semantics per mode
```

Themes are not a fifth token layer. Presets are configuration, not token layers.

Full layer rules, reference rules, and resolution behavior: [docs/TOKENS.md](../../docs/TOKENS.md).

---

## Source of Truth

The implementation source of truth is the TypeScript token authoring files.

Expected source areas:

```text
src/
  primitives/
  brand/
  semantics/
    color/          # optional subfolder; merges into color.* namespace
  components/
  themes/
  presets/
  resolver/         # includes layer-validation.ts
  governance/       # metadata, deprecation, semantic audit
  generators/
  types/
  scripts/          # clean-imports, governance-report
```

**Active semantic groups (11):** `color`, `action`, `border`, `elevation`, `radius`, `spacing`, `size`, `motion`, `typography`, `outline`, `layout`.

**Staged stubs only (not registered in token collections):** `primitives/asset.ts`.

**Elevation chain:** primitive `z-index.*` / `shadow.*` → semantic `elevation.*` → component tokens → CSS vars (`--nx-*`).

**Outline chain:** primitive `outline.width.*` / `outline.offset.*` → semantic `outline.*` → component `focus.ringWidth` / `focus.ringOffset` → CSS vars (`--nx-*-focus-ring-width`, `--nx-*-focus-ring-offset`).

**Layout chain:** primitive `breakpoint.*` / `aspect-ratio.*` → semantic `layout.*` → CSS vars (`--nx-layout-viewport-*`, `--nx-layout-aspect-ratio-*`). Consumers reference semantic layout vars directly; layout is not mapped into Tailwind `@theme` namespaces.

The exact internal structure may evolve, but package boundaries must remain clear.

Do not treat generated CSS or JSON as editable source.

---

## Authoring Rules

Token authoring follows the canonical rules in [docs/TOKENS.md](../../docs/TOKENS.md). That document is the source of truth. If this README conflicts with it, TOKENS.md wins.

Key package-level constraints: use `$value` leaves (DTCG shape), primitives hold raw values only, components reference semantic tokens only.

---

## Generated Outputs

This package may generate:

```text
dist/
  tokens.css
  theme.css
  tokens/
    dtcg/
      primitives/
      brand/
      semantics/
      components/
      themes/
      tokens.tokens.json
```

Current required style outputs:

```text
dist/tokens.css
dist/theme.css
```

These outputs are consumed by registry templates and installed into consumer projects as:

```text
styles/tokens.css
styles/theme.css
```

---

## CSS Output Rules

CSS output should be deterministic and generated from token source.

CSS variables should use the configured Neurex prefix:

```text
--nx-*
```

Generated CSS must remain compatible with Tailwind-first consumer styling.

Do not handwrite generated token CSS as the design source of truth.

---

## DTCG Output Rules

DTCG JSON output should preserve token meaning and metadata for design-tool and interchange workflows.

Expected rules:

- use `.tokens.json` file naming
- include root schema metadata where applicable
- preserve references where the target output requires unresolved references
- serialize structured values into DTCG-compatible shapes
- keep per-layer output available for inspection and tool integration

---

## Validation, Resolver, and Generator Rules

Current build-failing validation, target violations, resolver error codes, and generator behavior are documented in [docs/TOKENS.md](../../docs/TOKENS.md) and [docs/DESIGN_SYSTEM.md](../../docs/DESIGN_SYSTEM.md).

---

## Registry Relationship

The registry may consume generated style outputs from this package.

The registry owns installable templates and metadata.

This package owns token source and generated style artifacts.

Do not move registry install behavior into this package.

---

## CLI Relationship

The CLI installs style outputs into consumer projects through registry metadata.

The CLI must not hardcode token package internals.

This package should expose stable generated artifacts and public entrypoints for the CLI/registry workflow.

---

## Public API

Public exports should be explicit through `package.json` exports.

Do not rely on deep imports into this package's `src` or `dist`.

Consumers and sibling packages should only use supported entrypoints.

---

## Development

Common commands should be run from the repository root unless a package-specific script is intentionally provided.

Useful commands:

```bash
pnpm --filter @neurex/tokens build
pnpm --filter @neurex/tokens check
pnpm --filter @neurex/tokens typecheck
pnpm --filter @neurex/tokens test
pnpm --filter @neurex/tokens lint
pnpm --filter @neurex/tokens governance:report
pnpm --filter @neurex/tokens imports:clean
```

Repository-level checks:

```bash
pnpm build
pnpm typecheck
pnpm lint
pnpm test
```

If a script is a placeholder, say so explicitly in review notes or handoff.

---

## Implementation Notes

Prefer small, reviewable changes.

When changing token architecture:

1. update the root contract docs first when the rule changes
2. update token types
3. update authoring helpers
4. update source tokens
5. update resolver validation
6. update generators
7. update output tests and snapshots
8. verify registry and CLI style installation still works

Do not change source tokens and generated outputs without validating the pipeline.

---

## Related Documentation

- [docs/TOKENS.md](../../docs/TOKENS.md)
- [docs/DESIGN_SYSTEM.md](../../docs/DESIGN_SYSTEM.md)
- [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)
- [docs/STYLEGUIDE.md](../../docs/STYLEGUIDE.md)
- [docs/DEPLOY.md](../../docs/DEPLOY.md)
- [AGENTS.md](../../AGENTS.md)

## Status

This package is still evolving.

The token architecture is being locked progressively. Implementation details may change, but they must continue to respect the canonical token rules and package boundaries.
