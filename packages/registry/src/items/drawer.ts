/**
 * drawer.ts
 *
 * Registry metadata for the Drawer component.
 */

import type { RegistryItem } from "../registry.types.js"

export const drawerRegistryItem: RegistryItem = {
  name: "drawer",
  canonicalName: "Drawer",
  version: "0.0.1",
  type: "component",
  category: "overlays",
  aliases: [],
  files: [
    "components/Drawer/Drawer.tsx",
    "components/Drawer/Drawer.types.ts",
    "components/Drawer/Drawer.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Drawer/Drawer.tsx",
    },
    {
      path: "components/Drawer/Drawer.types.ts",
    },
    {
      path: "components/Drawer/Drawer.variants.ts",
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
  target: "src/components/ui/Drawer",
}
