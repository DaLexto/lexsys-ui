/**
 * popover.ts
 *
 * Registry metadata for the Popover component.
 */

import type { RegistryItem } from "../registry.types.js"

export const popoverRegistryItem: RegistryItem = {
  name: "popover",
  canonicalName: "Popover",
  type: "component",
  category: "overlays",
  aliases: [],
  files: [
    "primitives/Popover/Popover.tsx",
    "primitives/Popover/Popover.types.ts",
    "primitives/Popover/Popover.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Popover/Popover.tsx",
    },
    {
      path: "primitives/Popover/Popover.types.ts",
    },
    {
      path: "primitives/Popover/Popover.variants.ts",
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
  target: "src/components/ui/Popover",
}
