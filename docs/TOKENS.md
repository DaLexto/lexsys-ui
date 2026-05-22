# Neurex Token Rules

**Audience:** Maintainers and token domain owners
**Type:** Domain specification
**Source of truth for:** Token layer rules, reference rules, resolution behavior, validation status, package exports
**Verified against:** `packages/tokens/src/` (all layers, resolver, generator inputs)
**Related docs:** `docs/DESIGN_SYSTEM.md` (token authoring guide, CSS output), `docs/ARCHITECTURE.md`

If there is a conflict between this document and other documentation for any
token-system decision, this document wins.

---

## Token Layer Order

```
primitives → brand → semantics → components
                ↑
          themes override semantics per mode
```

Presets are configuration. They are not a layer in this chain.

---

## Layer Rules

### Primitives

- Raw values only. No references.
- No product meaning.
- Never consumed directly by component tokens.
- Source palette for brand tokens and non-brand semantic values.

### Brand

- References primitive tokens only.
- Holds brand-level palette decisions (which colors represent the brand).
- Never holds usage intent.
- MUST NOT contain component-specific names such as `buttonBackground` or `headerText`.
- Brand color sets SHOULD remain small — typically 6–8 tokens per brand color.
- Expanding a brand color set requires repeated semantic need.
- Use one file per brand.

### Semantics

- References brand tokens for brand-specific values.
- References primitive tokens for non-brand values such as neutrals, feedback, and foundation scales.
- Assigns product meaning and role to values.
- MUST NOT reference component tokens.
- Semantic tokens must represent reusable product meaning. One-off visual decisions belong in component tokens.
- Organized by top-level group. **11 active groups:**

  | Group        | Role                                                                                                 |
  | ------------ | ---------------------------------------------------------------------------------------------------- |
  | `color`      | Nested surface/text/feedback roles: `background.*`, `text.*`, `feedback.*`                           |
  | `action`     | Interactive state colors: `primary`, `secondary`, `danger` × base/hover/active/disabled              |
  | `border`     | Reusable border color roles: `default`, `strong`, `focus`, `accent`                                  |
  | `elevation`  | Overlay stacking and shadow roles: `backdrop`, `layer`, `floating`, `toast`, `tooltip`, `shadow`     |
  | `motion`     | Duration and easing roles: `control`, `surface`                                                      |
  | `radius`     | Border-radius roles: `control`, `selection`, `surface`, `pill`                                       |
  | `size`       | Reusable sizing roles: `control`, `selectionControl`, `selectionIndicator`, `area`, `track`, `thumb` |
  | `spacing`    | Spacing roles: `control.gap`, `control.x`, `control.y`, `surface.*`                                  |
  | `typography` | Font family, body, label, heading, code composite roles                                              |
  | `outline`    | Focus ring roles: `width` (focus, inset, zero), `offset` (focus, zero)                                |
  | `layout`     | Viewport (`sm`–`2xl`) and `aspectRatio` roles (square, standard, photo, portrait, video, ultrawide)  |

- `color`, `action`, `border`, `elevation`, `outline`, and `layout` are separate top-level groups. Do not document them as `color.action.*`, `color.border.*`, or nested elevation under `color`.
- `outline.*` supplies component `focus.ringWidth` / `focus.ringOffset` decisions. Do not hardcode Tailwind `ring-2` / `ring-offset-2` in component variants.
- `layout.*` maps from primitive `breakpoint.*` and `aspect-ratio.*`. Consumers use generated `--nx-layout-*` CSS variables directly; layout is not remapped into Tailwind `breakpoint` or `aspect` namespaces.

#### Semantic organization rules

1. **Top-level group = product domain**, not a CSS property shorthand alone.
2. **Within `color`, use sub-roles only** — `background`, `text`, `feedback`. Never component names (`button`, `alert`).
3. **Keep `action` and `border` as top-level paths** — components reference `{border.default}` and `{action.primary.base}`, not `{color.border.default}`.
4. **Theme overrides must use the same paths as semantics** — e.g. `border.focus`, not `color.border.focus`.
5. **Feedback pairs use full words** — `background` / `foreground`, not `bg` / `text`.
6. **File layout** — one group per file minimum; optional subfolder when a group has distinct sub-roles (see `semantics/color/`).
7. **Forbidden in semantics** — component names, one-off variant names, slot-specific decisions.
8. **Component-specific dimensions** belong in component tokens. Reusable size and spacing roles belong in semantic `size.*` and `spacing.*` groups first.

### Components

- **Rule:** reference semantic tokens only (enforced by layer validation).
- MUST NOT reference primitive color, brand, or theme tokens directly.
- MUST NOT reference primitive `size.*` or `spacing.*` scale tokens directly.
- MUST NOT reference other component token namespaces.
- Scoped to one component. Use one token file per component.
- Component tokens describe slot/property decisions, not global product meaning.
- Namespaced by component name in the merged token tree (e.g. `button.*`, `badge.*`).

### Themes

- Override semantic token values per mode.
- Themes are not a fifth token layer.
- Reference brand tokens for brand-specific overrides.
- Reference primitive tokens for non-brand overrides (neutrals, feedback, foundation scales).
- MUST NOT reference component tokens.
- MUST NOT introduce component-specific intent.
- Use one folder per brand and one file per mode.
- Currently active: `neurex/light` and `neurex/dark`.

### Presets

- Configuration only. Not a token layer.
- Never hold token values.
- Describe which brand, theme modes, and selector/color-scheme combinations to build.
- Consumed by the generator to filter theme inputs.
- Never participate in the token reference resolution chain.
- Currently active preset: `neurex` (default).

---

## Resolution Chain

The resolver is output-agnostic. It operates on merged `TokenTree` objects and
does not know about CSS variables, Tailwind, or any output format.

### How merging works

At build time, `createStyleTokenInput` assembles the full tree:

1. **Foundation tree** = `primitiveTokens` + `brandTokens` + `semanticTokens` (deep-merged under their respective names)
2. **Component tree** = all component token groups, each namespaced under their component name
3. **Full token tree** = `foundationTokens` + `componentTokens`
4. **Themed tree** (per theme mode) = `foundationTokens` + `theme.tokens` + `componentTokens`

Theme tokens overlay the foundation, then components are applied on top. This
ensures semantic overrides in a theme mode propagate through to component tokens
when they reference semantics.

### Reference resolution paths

Brand-specific path:

```
component token
  → semantic token
    → brand token
      → primitive token
        → concrete value
```

Non-brand / foundation path:

```
component token
  → semantic token
    → primitive token
      → concrete value
```

### Reference format

Only strict full-string references are supported:

```
{dotted.path.to.token}
```

Partial references, string interpolations, and bare paths are not supported.

### Max resolution depth

The resolver enforces a maximum chain depth of **50 hops** before reporting a
`MAX_DEPTH_EXCEEDED` error. This catches runaway chains before circular
detection would trigger.

---

## Resolver Error Codes

| Code                         | Meaning                                                 |
| ---------------------------- | ------------------------------------------------------- |
| `MISSING_REFERENCE`          | Reference path does not exist in the token tree         |
| `INVALID_REFERENCE_FORMAT`   | Reference string is not a valid `{dotted.path}`         |
| `REFERENCE_POINTS_TO_BRANCH` | Reference resolves to a branch node, not a leaf         |
| `CIRCULAR_REFERENCE`         | Reference chain forms a cycle                           |
| `MAX_DEPTH_EXCEEDED`         | Reference chain exceeds 50 hops                         |
| `INVALID_TOKEN_LEAF`         | Token node has a `$value` key but an invalid value type |

Strict mode (default at build time) treats all of the above as build-failing
errors. Safe mode (`resolveTokenTreeSafe`) downgrades unresolved references to
warnings.

---

## Token Authoring

### Token leaf shape (DTCG)

All token leaves use W3C DTCG-style shape:

```ts
{
  $value: "..." | number,
  $type?: "color" | "dimension" | "duration" | "fontFamily" | "cubicBezier" | "typography" | ...,
  $description?: string,
  $deprecated?: boolean | string,
}
```

`$value` is required. All other fields are optional.

### Branch metadata keys

These keys are allowed on branch nodes (non-leaf objects):

| Key            | Purpose                                               |
| -------------- | ----------------------------------------------------- |
| `$type`        | Inherited type hint for all leaves in this branch     |
| `$description` | Human-readable description of the branch              |
| `$deprecated`  | Deprecation flag or message                           |
| `$extensions`  | Tool-specific extensions (Neurex uses `x-neurex` key) |

No other `$`-prefixed keys are valid on branches.

### Scalar token types

A token `$value` MUST be a `string` or `number`. Arrays and objects are reserved
for composite types (e.g. `typography`).

---

## Validation Status

### Currently build-failing

The following are caught by `validateStyleTokenInput` and `validatePresetThemeCoverage`
at build time and will throw, preventing CSS output from being generated:

- A reference path does not exist in the token tree
- A reference string is malformed (not `{dotted.path}`)
- A reference resolves to a branch, not a leaf
- A reference chain is circular
- A reference chain exceeds 50 hops
- A token leaf has an invalid shape (no `$value`, or non-scalar `$value`)
- A theme is missing a mode required by its preset
- A component token references a primitive, brand, or theme-only token directly
- A semantic token references a component token
- A theme token references a component token
- A brand token branch uses component-specific intent

Layer validation is implemented in `packages/tokens/src/resolver/layer-validation.ts`
and runs before reference resolution during `validateStyleTokenInput`.

### Governance tooling (non-blocking)

The following are available via `createTokenGovernanceReport`, `createSemanticAuditReport`, and
`pnpm --filter @neurex/tokens governance:report`. They analyze the token graph
but do not change CSS or DTCG output:

- Deprecation reports for tokens marked `$deprecated` with direct dependents
- Metadata inventory reports
- Dead primitive token detection (primitive leaves not referenced by upper layers)
- Semantic audit reports (forbidden paths, missing groups, theme path drift)

**Planned (not build-failing):** contrast validation, metadata propagation
through full resolution chains, and optional stripping of dead tokens from
generated output. See `docs/RESOLVER_EVOLUTION.md`.

---

## Package Public API

`packages/tokens` exports via `package.json` `exports`:

| Export path    | Content                                                                        |
| -------------- | ------------------------------------------------------------------------------ |
| `.`            | Package root API — token trees, presets, themes, generator outputs, governance |
| `./tokens.css` | Generated CSS — base token variables (`:root` scope)                           |
| `./theme.css`  | Generated CSS — theme mode overrides (`:root` light, `.dark` dark) and Tailwind `@theme inline` block |

Key named exports from `.`:

| Export                                         | Purpose                                             |
| ---------------------------------------------- | --------------------------------------------------- |
| `primitiveTokens`                              | Flat array of all primitive token groups            |
| `semanticTokens`                               | Flat array of all semantic token groups             |
| `componentTokens`                              | Flat array of all component token groups            |
| `themes`                                       | Array of all theme definitions                      |
| `presets` / `neurexPreset` / `defaultPresetId` | Preset definitions and default ID                   |
| `createStyleOutputs`                           | Run the full CSS generator pipeline                 |
| `createTokensCssFromDtcgJson`                  | Generate base token CSS from DTCG JSON input        |
| `createThemeCssFromDtcgJson`                   | Generate theme CSS from DTCG JSON input             |
| `createTokenGovernanceReport`                  | Build deprecation, metadata, and dead-token reports |
| `formatTokenGovernanceReport`                  | Format a governance report for CLI output           |
| `createSemanticAuditReport`                    | Build semantic organization audit issues            |
| `formatSemanticAuditReport`                    | Format a semantic audit report for CLI output       |

Resolver helpers (`resolveReference`, `resolveTokenTreeStrict`,
`createStyleTokenInput`, and related types) live under
`packages/tokens/src/resolver/` and `packages/tokens/src/generators/inputs/`.
They are used internally by the build pipeline and tests but are not exported
from the package root entrypoint.

Governance reports are optional tooling. They do not change CSS or DTCG output.

```sh
pnpm --filter @neurex/tokens governance:report
pnpm --filter @neurex/tokens governance:report -- --json
```

---

## Build Commands

From the repo root:

```sh
pnpm --filter @neurex/tokens build            # generate dist CSS + DTCG JSON (--package)
pnpm --filter @neurex/tokens generate:styles  # dist + registry template CSS sync (--package --registry)
pnpm --filter @neurex/tokens test             # run resolver and generator tests
pnpm --filter @neurex/tokens governance:report
```

Use `generate:styles` after token generator changes that affect `packages/registry/templates/styles/`.

Generated output lives at:

| File                                              | Description                                        |
| ------------------------------------------------- | -------------------------------------------------- |
| `packages/tokens/dist/tokens.css`                 | Base token variables (`:root`)                     |
| `packages/tokens/dist/theme.css`                    | Theme mode overrides and Tailwind `@theme inline`  |
| `packages/tokens/dist/tokens/dtcg/tokens.tokens.json` | Full merged DTCG JSON with unresolved references |
| `packages/tokens/dist/tokens/dtcg/primitives/*.tokens.json` | Per-group primitive DTCG JSON              |
| `packages/tokens/dist/tokens/dtcg/brand/*.tokens.json`      | Per-brand DTCG JSON                        |
| `packages/tokens/dist/tokens/dtcg/semantics/*.tokens.json`  | Per-group semantic DTCG JSON               |
| `packages/tokens/dist/tokens/dtcg/components/*.tokens.json` | Per-component DTCG JSON                    |
| `packages/tokens/dist/tokens/dtcg/themes/*.tokens.json`     | Per-theme DTCG JSON                        |
