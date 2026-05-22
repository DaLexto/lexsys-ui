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
- Organized by top-level group. Active groups:

  | Group | Role |
  |---|---|
  | `color` | Global background, text, and feedback `bg`/`text` roles |
  | `action` | Interactive state colors: `primary`, `secondary`, `danger` |
  | `border` | Reusable border color roles: `default`, `strong`, `focus`, `accent` |
  | `motion` | Duration and easing roles: `control`, `surface` |
  | `radius` | Border-radius roles: `control`, `surface` |
  | `size` | Component sizing roles: `control`, `dialog`, `drawer`, `icon`, `indicator`, `sidebar`, `thumb` |
  | `spacing` | Spacing roles: `control.gap`, `control.x`, `control.y` |
  | `typography` | Font family, body, label, heading, code composite roles |

- `color`, `action`, and `border` are separate top-level groups. Do not document them as `color.action.*` or `color.border.*` — those are not current paths.

### Components

- **Target rule:** reference semantic tokens only.
- MUST NOT reference primitive color, brand, or theme tokens directly.
- MUST NOT reference other component token namespaces.
- Temporary exception: component tokens may reference `size.*` or `spacing.*`
  scale tokens only when no semantic role exists. Do not add new raw scale
  references when a semantic role can be named first.
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

| Code | Meaning |
|---|---|
| `MISSING_REFERENCE` | Reference path does not exist in the token tree |
| `INVALID_REFERENCE_FORMAT` | Reference string is not a valid `{dotted.path}` |
| `REFERENCE_POINTS_TO_BRANCH` | Reference resolves to a branch node, not a leaf |
| `CIRCULAR_REFERENCE` | Reference chain forms a cycle |
| `MAX_DEPTH_EXCEEDED` | Reference chain exceeds 50 hops |
| `INVALID_TOKEN_LEAF` | Token node has a `$value` key but an invalid value type |

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

| Key | Purpose |
|---|---|
| `$type` | Inherited type hint for all leaves in this branch |
| `$description` | Human-readable description of the branch |
| `$deprecated` | Deprecation flag or message |
| `$extensions` | Tool-specific extensions (Neurex uses `x-neurex` key) |

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

### Target violations (not yet build-failing)

The token contract is considered stable once layer validation above is enforced.
Remaining planned governance checks (contrast, dead tokens, deprecation reports)
live in `docs/ROADMAP.md` Phase 5 and `docs/RESOLVER_EVOLUTION.md`.

---

## Package Public API

`packages/tokens` exports via `package.json` `exports`:

| Export path | Content |
|---|---|
| `.` | TypeScript source API (resolver, types, generator inputs, token trees) |
| `./tokens.css` | Generated CSS — base token variables (`:root` scope) |
| `./theme.css` | Generated CSS — theme mode overrides (`[data-theme]` scope) |

Key named exports from `.`:

| Export | Purpose |
|---|---|
| `primitiveTokens` | Flat array of all primitive token groups |
| `semanticTokens` | Flat array of all semantic token groups |
| `componentTokens` | Flat array of all component token groups |
| `themes` | Array of all theme definitions |
| `presets` / `neurexPreset` / `defaultPresetId` | Preset definitions and default ID |
| `resolveReference` | Resolve a single `{reference}` string in a token tree |
| `resolveTokenTreeStrict` | Resolve all references in a tree; throws on any error |
| `resolveTokenTreeSafe` | Resolve all references in a tree; returns warnings instead of throwing |
| `createStyleTokenInput` | Assemble the generator input contract from all layers |
| `createStyleOutputs` | Run the full CSS generator pipeline |

---

## Build Commands

From the repo root:

```sh
pnpm --filter @neurex/tokens build    # generate CSS + DTCG JSON outputs
pnpm --filter @neurex/tokens test     # run resolver and generator tests
```

Generated output lives at:

| File | Description |
|---|---|
| `packages/tokens/dist/tokens.css` | Base token variables (`:root`) |
| `packages/tokens/dist/theme.css` | Theme mode overrides |
| `packages/tokens/dist/tokens.json` | DTCG JSON with unresolved references (for tooling) |
