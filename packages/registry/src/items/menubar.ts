/**
 * menubar.ts
 *
 * Registry metadata for the Menubar component.
 */

import type { RegistryItem } from "../registry.types.js"

export const menubarRegistryItem: RegistryItem = {
  name: "menubar",
  canonicalName: "Menubar",
  type: "component",
  category: "overlays",
  aliases: [],
  files: [
    "primitives/Menubar/Menubar.tsx",
    "primitives/Menubar/Menubar.types.ts",
    "primitives/Menubar/Menubar.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Menubar/Menubar.tsx",
    },
    {
      path: "primitives/Menubar/Menubar.types.ts",
    },
    {
      path: "primitives/Menubar/Menubar.variants.ts",
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
  target: "src/components/ui/Menubar",
}
