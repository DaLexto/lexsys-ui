/**
 * navigation-menu.ts
 *
 * Registry metadata for the NavigationMenu component.
 */

import type { RegistryItem } from "../registry.types.js"

export const navigationMenuRegistryItem: RegistryItem = {
  name: "navigation-menu",
  canonicalName: "NavigationMenu",
  type: "component",
  category: "overlays",
  aliases: [],
  files: [
    "primitives/NavigationMenu/NavigationMenu.tsx",
    "primitives/NavigationMenu/NavigationMenu.types.ts",
    "primitives/NavigationMenu/NavigationMenu.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/NavigationMenu/NavigationMenu.tsx",
    },
    {
      path: "primitives/NavigationMenu/NavigationMenu.types.ts",
    },
    {
      path: "primitives/NavigationMenu/NavigationMenu.variants.ts",
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
  target: "src/components/ui/NavigationMenu",
}
