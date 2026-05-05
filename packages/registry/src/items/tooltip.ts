/**
 * tooltip.ts
 *
 * Registry metadata for the Tooltip component.
 */

import type { RegistryItem } from "../registry.types.js"

export const tooltipRegistryItem: RegistryItem = {
  name: "tooltip",
  canonicalName: "Tooltip",
  version: "0.0.1",
  type: "component",
  category: "overlays",
  aliases: ["hint"],
  files: [
    "components/Tooltip/Tooltip.tsx",
    "components/Tooltip/Tooltip.types.ts",
    "components/Tooltip/Tooltip.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Tooltip/Tooltip.tsx",
    },
    {
      path: "components/Tooltip/Tooltip.types.ts",
    },
    {
      path: "components/Tooltip/Tooltip.variants.ts",
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
  target: "src/components/ui/Tooltip",
}
