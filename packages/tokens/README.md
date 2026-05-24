# @lexsys/tokens

Design token source, validation, resolution, and generated style output package for Lexsys.

This package owns the token system implementation. It does not own component rendering, CLI install behavior, or registry metadata.

## Purpose

`@lexsys/tokens` is responsible for:

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

This package is the source package for Lexsys design tokens.

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
  engine/             # token engine (read/transform, validate, report)
    shared/           # tree utils, metadata keys, color-string.parse.ts
    resolver/         # reference + graph traversal
      reference/
      graph/
      shared/
      values/         # resolved leaf value pipeline (Phase 9)
    composite/        # typography + shadow/border composite type registry and slot schemas
    validator/        # build-failing layer contracts
      layers/
      contrast/       # WCAG contrast report + CI policy gate
    governance/       # non-blocking reports and audits
      report/
      audit/
  generators/       # CSS/DTCG modules (library API)
  types/
scripts/            # CLI entrypoints (parallel to src/, not inside src/)
  write-style-outputs.ts
  governance-report.ts
  clean-imports.ts
test/
```

**Package layout rule:** `src/` holds publishable library code and generator modules; `scripts/` holds all Node entrypoints (`tsup` bundles or `tsx` dev tools). Same pattern as `packages/registry/scripts/`.

**Token engine naming:** subfolders use `{role}/{role}.{domain}.ts` (for example `graph/graph.resolver.ts`, `report/report.governance.ts`).

**Active semantic groups (11):** `color`, `action`, `border`, `elevation`, `radius`, `spacing`, `size`, `motion`, `typography`, `outline`, `layout`.

**Staged stubs only (not registered in token collections):** `primitives/asset.ts`.

**Elevation chain:** primitive `z-index.*` / `shadow.*` → semantic `elevation.*` → component tokens → CSS vars (`--lsys-*`).

**Outline chain:** primitive `outline.width.*` / `outline.offset.*` → semantic `outline.*` → component `focus.ringWidth` / `focus.ringOffset` → CSS vars (`--lsys-*-focus-ring-width`, `--lsys-*-focus-ring-offset`).

**Layout chain:** primitive `breakpoint.*` / `aspect-ratio.*` → semantic `layout.*` → CSS vars (`--lsys-layout-viewport-*`, `--lsys-layout-aspect-ratio-*`). Consumers reference semantic layout vars directly; layout is not mapped into Tailwind `@theme` namespaces.

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

CSS variables should use the configured Lexsys prefix:

```text
--lsys-*
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

### Resolved value pipeline (`engine/resolver/values/`)

On-demand leaf resolution for governance, contrast prep, and tooling — **does not**
change default CSS/DTCG output (generators still preserve references).

| Export                                                   | Purpose                                                                               |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `resolveLeafValue(tree, path, options?)`                 | Resolve one leaf through alias chains                                                 |
| `resolveLeafValues(tree, paths?, options?)`              | Batch resolve all or selected leaf paths                                              |
| `resolveLeafValueForTheme(input, theme, path, options?)` | Themed merge then resolve                                                             |
| `isResolvedColorValue` / `toContrastReadyColor`          | Color normalization for contrast math (OKLCH; `oklch()` / `#hex` / `rgb()` / `hsl()`) |

Build-time validation continues to use `resolveTokenTree` via `validateStyleTokenInput`.
Leaf resolution in `resolveTokenTree` delegates to `resolveLeafValue` for a single code path.

Import from `packages/tokens/src/engine/` (or `./engine` within the package). Not exported from the package root `.` entrypoint.

### Accessibility contrast guard (`engine/validator/contrast/`)

WCAG AA report on registered semantic foreground/background pairs (15 pairs in
`contrast.pairs.ts`). CI enforcement via `contrast.policy.ts` and
`evaluateContrastPolicy` (default `ci` tier; local override
`NEUREX_CONTRAST_POLICY=report`).

| Export                                    | Purpose                                          |
| ----------------------------------------- | ------------------------------------------------ |
| `createContrastValidationReport(input)`   | Themed contrast ratio checks per registered pair |
| `formatContrastValidationReport(report)`  | Format report for CLI output                     |
| `evaluateContrastPolicy(report, policy?)` | Pass/fail for CI/build tiers                     |
| `SEMANTIC_CONTRAST_PAIRS`                 | Explicit pair registry                           |

Semi-transparent backgrounds composite over `color.background.base` before ratio
checks. Color strings are parsed via `engine/shared/color-string.parse.ts`
(`rgb()`, `hsl()`, plus OKLCH/hex in `values.normalize.ts`).

Runs as part of `pnpm tokens:governance:report`. Failures exit
with code 1 in CI (`tokens-governance` workflow). Also enforced in
`validateStyleTokenInput` via `validateContrastPolicyStrict` unless
`NEUREX_CONTRAST_POLICY=report`.

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

Useful commands (full reference: [docs/SCRIPTS.md](../../docs/SCRIPTS.md)):

```bash
pnpm tokens:build
pnpm tokens:check
pnpm tokens:generate:styles
pnpm tokens:governance:report
pnpm tokens:imports:clean
# Optional dead-primitive stripping (omits unreached primitives from CSS/DTCG):
pnpm --filter @lexsys/tokens exec node dist/scripts/write-style-outputs.js --package --strip-dead-primitives
```

Repository-level checks:

```bash
pnpm check
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
