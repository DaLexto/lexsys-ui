/**
 * context-menu.ts
 *
 * Registry metadata for the ContextMenu component.
 */

import type { RegistryItem } from "../registry.types.js"

export const contextMenuRegistryItem: RegistryItem = {
  name: "context-menu",
  canonicalName: "ContextMenu",
  version: "0.0.1",
  type: "component",
  category: "overlays",
  aliases: [],
  files: [
    "primitives/ContextMenu/ContextMenu.tsx",
    "primitives/ContextMenu/ContextMenu.types.ts",
    "primitives/ContextMenu/ContextMenu.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/ContextMenu/ContextMenu.tsx",
    },
    {
      path: "primitives/ContextMenu/ContextMenu.types.ts",
    },
    {
      path: "primitives/ContextMenu/ContextMenu.variants.ts",
    },
  ],
  dependencies: [
    "@base-ui/react",
    "class-variance-authority",
    "lucide-react",
    "clsx",
    "tailwind-merge",
  ],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/ContextMenu",
}
