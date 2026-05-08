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
    "components/Collapsible/Collapsible.tsx",
    "components/Collapsible/Collapsible.types.ts",
    "components/Collapsible/Collapsible.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Collapsible/Collapsible.tsx",
    },
    {
      path: "components/Collapsible/Collapsible.types.ts",
    },
    {
      path: "components/Collapsible/Collapsible.variants.ts",
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
