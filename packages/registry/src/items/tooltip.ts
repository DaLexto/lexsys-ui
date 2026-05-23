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
    "primitives/Tooltip/Tooltip.tsx",
    "primitives/Tooltip/Tooltip.types.ts",
    "primitives/Tooltip/Tooltip.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Tooltip/Tooltip.tsx",
    },
    {
      path: "primitives/Tooltip/Tooltip.types.ts",
    },
    {
      path: "primitives/Tooltip/Tooltip.variants.ts",
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
  target: "src/components/primitives/Tooltip",
}
