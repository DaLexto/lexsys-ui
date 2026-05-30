/**
 * meter.ts
 *
 * Registry metadata for the Meter component.
 */

import type { RegistryItem } from "../registry.types.js"

export const meterRegistryItem: RegistryItem = {
  name: "meter",
  canonicalName: "Meter",
  type: "component",
  category: "data-display",
  aliases: [],
  files: [
    "primitives/Meter/Meter.tsx",
    "primitives/Meter/Meter.types.ts",
    "primitives/Meter/Meter.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Meter/Meter.tsx",
    },
    {
      path: "primitives/Meter/Meter.types.ts",
    },
    {
      path: "primitives/Meter/Meter.variants.ts",
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
  target: "src/components/ui/Meter",
}
