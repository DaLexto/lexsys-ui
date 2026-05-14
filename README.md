# Neurex

Neurex is an early-stage registry-first React UI framework built on Base UI,
Tailwind CSS, and a design-token system.

The goal is shadcn-style ownership with a stronger token/theme foundation:
Neurex installs editable component source code into your project instead of
forcing you to import black-box runtime components.

## Current MVP

The current implementation focuses on the first supported path:

- Vite React setup through `neurex init vite`
- Tailwind v4 wiring for Vite consumers
- token and theme CSS installation
- a growing Base UI-backed component catalog, including actions, forms,
  overlays, feedback, and layout primitives
- conflict-aware installs with no silent overwrites
- local playground for package/export/style verification

Additional framework starters, remote registry flows, richer update automation,
and Creator-facing output are planned but not complete yet.

## Quick Start

Create a new Vite consumer:

```bash
neurex init vite my-app
cd my-app
```

Or initialize Neurex inside an existing supported Vite app from that app's
root:

```bash
neurex init
```

Then add components:

```bash
neurex add button
neurex add input
neurex add card
neurex add select
neurex add dialog
```

Generated files use the current Vite defaults. Component files are installed as
editable source code, shared utilities go under `src/lib`, and token/theme CSS
goes under `styles`:

```txt
src/components/ui/Button/
├── Button.tsx
├── Button.types.ts
└── Button.variants.ts

src/lib/utils.ts
styles/tokens.css
styles/theme.css
neurex.config.json
```

The generated config tracks paths, aliases, Tailwind v4 entrypoint, selected
style preset, installed component versions, and an optional remote registry URL:

```json
{
  "style": "default",
  "componentsPath": "src/components/ui",
  "utilitiesPath": "src/lib",
  "stylesPath": "styles",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "tailwind": {
    "version": "v4",
    "css": "src/style.css"
  }
}
```

## Styling Model

Neurex is Tailwind-native for day-to-day usage:

```tsx
import { Button } from "@/components/ui/Button/Button"

export function App() {
  return (
    <Button className="w-full bg-green-600 hover:bg-green-700">Save</Button>
  )
}
```

The default component variants consume semantic Neurex tokens under the hood:

```tsx
<Button variant="primary" size="md">
  Create
</Button>
```

Users can style locally with Tailwind classes or theme globally through CSS
variables:

```css
:root {
  --nx-color-action-primary-base: #16a34a;
  --nx-color-action-primary-hover: #15803d;
  --nx-color-action-primary-active: #166534;
}
```

## Architecture

The locked design-system flow is:

```txt
TOKENS -> STYLE PRESETS -> THEME MODES -> OUTPUTS -> COMPONENTS -> REGISTRY -> DELIVERY -> USER
```

The consumer-facing style key is currently `default`, and it represents
`Neurex Default`. Inside `@neurex/tokens`, the same implemented preset is
exposed as token preset id `neurex` with brand `neurex`. Until arbitrary preset
selection is wired through the CLI, treat `default` as the install/config alias
and `neurex` as the token package preset id.

Runtime package responsibilities:

- `packages/tokens` owns token source and generated CSS plus JSON outputs.
- `packages/ui` owns source/reference components.
- `packages/registry` owns installable templates and metadata.
- `packages/cli` installs registry items into user projects.
- `apps/playground` verifies public package exports and rendered states.

## CLI

Common commands:

```bash
neurex init
neurex init vite [directory]
neurex add button
neurex list
neurex status
neurex doctor
neurex registry --summary
```

See [docs/CLI.md](./docs/CLI.md) for the command contract.

## Stability

Stable enough to build against in the MVP:

- `neurex init vite [directory]`
- `neurex init` inside supported Vite apps
- `neurex add <component>` for bundled local registry items
- default config paths and aliases
- Tailwind v4 CSS entrypoint wiring
- installed component ownership under `src/components/ui`
- token/theme CSS install under `styles/tokens.css` and `styles/theme.css`

Internal or still evolving:

- token authoring internals in `packages/tokens`
- DTCG-compatible `tokens/dtcg/**/*.tokens.json` package output policy; the
  files are generated today, but explicit JSON package
  exports are intentionally deferred until the public contract is finalized
- `@neurex/ui` CSS `sideEffects` policy; no UI CSS file is currently emitted,
  so the package metadata should stay under review before publish
- registry item generation internals
- update/uninstall automation
- remote registry hosting and version policy
- additional style presets beyond `default`
- Creator output and visual builder flows

Planned but not promised as current API:

- Next.js, Laravel, and custom project starters
- predefined theme/style preset marketplace
- Creator-generated registry items
- richer update and migration workflows

## Development

Install dependencies:

```bash
pnpm install
```

Run the main checks:

```bash
pnpm build
pnpm test
pnpm typecheck
pnpm lint
pnpm exec prettier --check .
```

Run the playground:

```bash
pnpm playground:dev
```

## Status

Neurex is not production-ready yet. The architecture is locked, the first Vite
install flow is working, and the project is expanding the Base UI-backed
component foundation.

## Inspiration

- shadcn/ui
- Base UI
- Radix UI
- Material UI
- modern design-system architectures

## License

MIT
