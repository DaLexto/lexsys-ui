/**
 * sidebar.ts
 *
 * Registry metadata for the Sidebar block.
 */

import type { RegistryItem } from "../registry.types.js"

export const sidebarRegistryItem: RegistryItem = {
  name: "sidebar",
  canonicalName: "Sidebar",
  version: "0.0.1",
  type: "block",
  category: "blocks",
  aliases: [],
  files: [
    "blocks/Sidebar/Sidebar.tsx",
    "blocks/Sidebar/Sidebar.types.ts",
    "blocks/Sidebar/Sidebar.variants.ts",
  ],
  dependencies: [
    "class-variance-authority",
    "clsx",
    "lucide-react",
    "tailwind-merge",
  ],
  registryDependencies: ["button", "drawer", "scroll-area"],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Sidebar",
}
