/**
 * separator.ts
 *
 * Registry metadata for the Separator component.
 */

import type { RegistryItem } from "../registry.types.js"

export const separatorRegistryItem: RegistryItem = {
  name: "separator",
  canonicalName: "Separator",
  type: "component",
  category: "layout",
  aliases: ["divider"],
  files: [
    "primitives/Separator/Separator.tsx",
    "primitives/Separator/Separator.types.ts",
    "primitives/Separator/Separator.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Separator/Separator.tsx",
    },
    {
      path: "primitives/Separator/Separator.types.ts",
    },
    {
      path: "primitives/Separator/Separator.variants.ts",
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
  target: "src/components/ui/Separator",
}
