/**
 * menu.ts
 *
 * Registry metadata for the Menu component.
 */

import type { RegistryItem } from "../registry.types.js"

export const menuRegistryItem: RegistryItem = {
  name: "menu",
  canonicalName: "Menu",
  type: "component",
  category: "overlays",
  aliases: [],
  files: [
    "primitives/Menu/Menu.tsx",
    "primitives/Menu/Menu.types.ts",
    "primitives/Menu/Menu.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Menu/Menu.tsx",
    },
    {
      path: "primitives/Menu/Menu.types.ts",
    },
    {
      path: "primitives/Menu/Menu.variants.ts",
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
  target: "src/components/ui/Menu",
}
