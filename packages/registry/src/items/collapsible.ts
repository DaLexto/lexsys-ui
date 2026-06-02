/**
 * collapsible.ts
 *
 * Registry metadata for the Collapsible component.
 */

import type { RegistryItem } from "../registry.types.js"

export const collapsibleRegistryItem: RegistryItem = {
  name: "collapsible",
  canonicalName: "Collapsible",
  type: "component",
  category: "layout",
  aliases: [],
  files: [
    "primitives/Collapsible/Collapsible.tsx",
    "primitives/Collapsible/Collapsible.types.ts",
    "primitives/Collapsible/Collapsible.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Collapsible/Collapsible.tsx",
    },
    {
      path: "primitives/Collapsible/Collapsible.types.ts",
    },
    {
      path: "primitives/Collapsible/Collapsible.variants.ts",
    },
  ],
  dependencies: [
    "@base-ui/react",
    "class-variance-authority",
    "clsx",
    "lucide-react",
    "tailwind-merge",
  ],
  registryDependencies: [],
  utilities: [
    "cn",
  ],
  styles: ["theme"],
  target: "src/components/ui/Collapsible",
}
