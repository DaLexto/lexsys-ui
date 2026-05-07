/**
 * popover.ts
 *
 * Registry metadata for the Popover component.
 */

import type { RegistryItem } from "../registry.types.js"

export const popoverRegistryItem: RegistryItem = {
  name: "popover",
  canonicalName: "Popover",
  version: "0.0.1",
  type: "component",
  category: "overlays",
  aliases: [],
  files: [
    "components/Popover/Popover.tsx",
    "components/Popover/Popover.types.ts",
    "components/Popover/Popover.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Popover/Popover.tsx",
    },
    {
      path: "components/Popover/Popover.types.ts",
    },
    {
      path: "components/Popover/Popover.variants.ts",
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
