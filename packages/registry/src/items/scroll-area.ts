/**
 * scroll-area.ts
 *
 * Registry metadata for the ScrollArea component.
 */

import type { RegistryItem } from "../registry.types.js"

export const scrollAreaRegistryItem: RegistryItem = {
  name: "scroll-area",
  canonicalName: "ScrollArea",
  version: "0.0.1",
  type: "component",
  category: "layout",
  aliases: ["scroll"],
  files: [
    "components/ScrollArea/ScrollArea.tsx",
    "components/ScrollArea/ScrollArea.types.ts",
    "components/ScrollArea/ScrollArea.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/ScrollArea/ScrollArea.tsx",
    },
    {
      path: "components/ScrollArea/ScrollArea.types.ts",
    },
    {
      path: "components/ScrollArea/ScrollArea.variants.ts",
    },
  ],
  dependencies: [
    "@base-ui/react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ],
  registryDependencies: [],
  utilities: [
    "cn",
  ],
  styles: ["theme"],
  target: "src/components/ui/ScrollArea",
}
