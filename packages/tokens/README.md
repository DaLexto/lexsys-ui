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

Neurex token dependencies follow this canonical model:

```text
primitives -> brand -> semantics -> components
                ↑
              themes override semantics per mode
```

Layer summary:

- primitives contain raw values only
- brand tokens define brand-level palette decisions
- semantic tokens assign reusable product meaning
- component tokens map semantic values to component slot/property decisions
- themes override semantic values per mode
- presets select which brand/theme combinations are built

Themes are not a fifth token layer.

Presets are configuration, not token layers.

---

## Source of Truth

The implementation source of truth is the TypeScript token authoring files.

Expected source areas:

```text
src/
  primitives/
  brand/
  semantics/
  components/
  themes/
  presets/
  resolver/
  generators/
  types/
```

The exact internal structure may evolve, but package boundaries must remain clear.

Do not treat generated CSS or JSON as editable source.

---

## Authoring Rules

Token authoring must follow the canonical rules from [docs/TOKENS.md](../../docs/TOKENS.md).

Important package-level rules:

- use DTCG-compatible `$value` authoring
- do not use legacy `value` leaves
- primitives must not reference other tokens
- components must reference semantic tokens only
- components must never reference primitives directly
- components must never reference brand tokens directly
- components must never reference theme tokens directly
- themes override semantics per mode
- presets never participate in token resolution

Brand-specific semantic values should reference brand tokens.

Non-brand semantic values, such as neutrals, feedback, and foundation values, may reference primitive tokens directly.

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

## Validation Rules

Token validation should fail for architecture violations that can break the system.

Build-failing violations include:

- missing reference paths
- circular references
- component tokens referencing primitives directly
- component tokens referencing brand tokens directly
- component tokens referencing theme tokens directly
- semantic tokens referencing component tokens
- theme tokens referencing component tokens
- missing theme modes required by a preset
- brand tokens containing component-specific intent

Warnings may be used for governance issues that should not block early development, such as naming quality, missing non-critical descriptions, or suspicious one-off semantic tokens.

---

## Resolver Rules

The resolver is responsible for reference validation and value resolution.

It should:

- detect missing references
- detect circular references
- preserve token tree shape where required
- support strict mode for build-failing validation
- avoid silently swallowing invalid token states

The resolver should not encode package-specific output formatting. Formatting belongs in generators.

---

## Generator Rules

Generators are responsible for converting validated token data into output formats.

Generators should be output-specific:

```text
CSS generator
DTCG JSON generator
Tailwind @theme generator
future platform generators
```

Authoring format must not change when a new output target is added.

A new platform should add a generator or serializer, not rewrite token source.

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
pnpm --filter @neurex/tokens typecheck
pnpm --filter @neurex/tokens test
pnpm --filter @neurex/tokens lint
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
