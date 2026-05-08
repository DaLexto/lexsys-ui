/**
 * menu.ts
 *
 * Registry metadata for the Menu component.
 */

import type { RegistryItem } from "../registry.types.js"

export const menuRegistryItem: RegistryItem = {
  name: "menu",
  canonicalName: "Menu",
  version: "0.0.1",
  type: "component",
  category: "overlays",
  aliases: [],
  files: [
    "components/Menu/Menu.tsx",
    "components/Menu/Menu.types.ts",
    "components/Menu/Menu.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Menu/Menu.tsx",
    },
    {
      path: "components/Menu/Menu.types.ts",
    },
    {
      path: "components/Menu/Menu.variants.ts",
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
