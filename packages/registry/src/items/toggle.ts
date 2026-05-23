/**
 * toggle.ts
 *
 * Registry metadata for the Toggle component.
 */

import type { RegistryItem } from "../registry.types.js"

export const toggleRegistryItem: RegistryItem = {
  name: "toggle",
  canonicalName: "Toggle",
  version: "0.0.1",
  type: "component",
  category: "actions",
  aliases: ["toggle-button"],
  files: [
    "primitives/Toggle/Toggle.tsx",
    "primitives/Toggle/Toggle.types.ts",
    "primitives/Toggle/Toggle.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Toggle/Toggle.tsx",
    },
    {
      path: "primitives/Toggle/Toggle.types.ts",
    },
    {
      path: "primitives/Toggle/Toggle.variants.ts",
    },
  ],
  dependencies: [
    "@base-ui/react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/primitives/Toggle",
}
