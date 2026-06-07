/**
 * sidebar.ts
 *
 * Registry metadata for the Sidebar block.
 */

import type { RegistryItem } from "../registry.types.js"

export const sidebarRegistryItem: RegistryItem = {
  name: "sidebar",
  canonicalName: "Sidebar",
  type: "block",
  category: "blocks",
  aliases: [],
  files: [
    "blocks/Sidebar/Sidebar.tsx",
    "blocks/Sidebar/Sidebar.types.ts",
    "blocks/Sidebar/Sidebar.variants.ts",
    "blocks/Sidebar/Sidebar.utils.ts",
  ],
  dependencies: ["@base-ui/react", "clsx", "lucide-react", "tailwind-merge"],
  registryDependencies: [
    "badge",
    "button",
    "collapsible",
    "drawer",
    "input",
    "scroll-area",
    "separator",
  ],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Sidebar",
}
