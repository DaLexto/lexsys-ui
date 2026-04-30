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
- `Button` and `Card` as the first registry components
- conflict-aware installs with no silent overwrites
- local playground for package/export/style verification

More components, framework starters, remote registry flows, richer update
automation, and Creator-facing output are planned but not complete yet.

## Quick Start

Create or prepare a Vite consumer:

```bash
neurex init vite my-app
```

Or initialize Neurex inside an existing supported Vite app:

```bash
neurex init
```

Then add the first component:

```bash
neurex add button
neurex add card
```

Generated files use the current Vite defaults:

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
  --nx-color-primary: #16a34a;
}
```

## Architecture

The locked design-system flow is:

```txt
TOKENS -> STYLE PRESETS -> THEME MODES -> OUTPUTS -> COMPONENTS -> REGISTRY -> DELIVERY -> USER
```

The first style preset is `default` / `Neurex Default`. Style presets define
the design personality; theme modes define mappings like light and dark.

Runtime package responsibilities:

- `packages/tokens` owns token source and generated CSS outputs.
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
install flow is working, and the project is now building the foundation before
expanding the component catalog.

## Inspiration

- shadcn/ui
- Base UI
- Radix UI
- Material UI
- modern design-system architectures

## License

MIT
