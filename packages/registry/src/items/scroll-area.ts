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
    "primitives/ScrollArea/ScrollArea.tsx",
    "primitives/ScrollArea/ScrollArea.types.ts",
    "primitives/ScrollArea/ScrollArea.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/ScrollArea/ScrollArea.tsx",
    },
    {
      path: "primitives/ScrollArea/ScrollArea.types.ts",
    },
    {
      path: "primitives/ScrollArea/ScrollArea.variants.ts",
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
  target: "src/components/ui/ScrollArea",
}
