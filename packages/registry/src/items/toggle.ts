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
    "components/Toggle/Toggle.tsx",
    "components/Toggle/Toggle.types.ts",
    "components/Toggle/Toggle.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Toggle/Toggle.tsx",
    },
    {
      path: "components/Toggle/Toggle.types.ts",
    },
    {
      path: "components/Toggle/Toggle.variants.ts",
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
  target: "src/components/ui/Toggle",
}
