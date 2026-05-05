/**
 * separator.ts
 *
 * Registry metadata for the Separator component.
 */

import type { RegistryItem } from "../registry.types.js"

export const separatorRegistryItem: RegistryItem = {
  name: "separator",
  canonicalName: "Separator",
  version: "0.0.1",
  type: "component",
  category: "layout",
  aliases: ["divider"],
  files: [
    "components/Separator/Separator.tsx",
    "components/Separator/Separator.types.ts",
    "components/Separator/Separator.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Separator/Separator.tsx",
    },
    {
      path: "components/Separator/Separator.types.ts",
    },
    {
      path: "components/Separator/Separator.variants.ts",
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
