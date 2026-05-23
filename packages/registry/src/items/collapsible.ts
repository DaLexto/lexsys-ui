/**
 * collapsible.ts
 *
 * Registry metadata for the Collapsible component.
 */

import type { RegistryItem } from "../registry.types.js"

export const collapsibleRegistryItem: RegistryItem = {
  name: "collapsible",
  canonicalName: "Collapsible",
  version: "0.0.1",
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
    "lucide-react",
    "clsx",
    "tailwind-merge",
  ],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Collapsible",
}
