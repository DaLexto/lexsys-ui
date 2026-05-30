/**
 * toolbar.ts
 *
 * Registry metadata for the Toolbar component.
 */

import type { RegistryItem } from "../registry.types.js"

export const toolbarRegistryItem: RegistryItem = {
  name: "toolbar",
  canonicalName: "Toolbar",
  type: "component",
  category: "layout",
  aliases: [],
  files: [
    "primitives/Toolbar/Toolbar.tsx",
    "primitives/Toolbar/Toolbar.types.ts",
    "primitives/Toolbar/Toolbar.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Toolbar/Toolbar.tsx",
    },
    {
      path: "primitives/Toolbar/Toolbar.types.ts",
    },
    {
      path: "primitives/Toolbar/Toolbar.variants.ts",
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
  target: "src/components/ui/Toolbar",
}
