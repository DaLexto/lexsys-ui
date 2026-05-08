/**
 * meter.ts
 *
 * Registry metadata for the Meter component.
 */

import type { RegistryItem } from "../registry.types.js"

export const meterRegistryItem: RegistryItem = {
  name: "meter",
  canonicalName: "Meter",
  version: "0.0.1",
  type: "component",
  category: "data-display",
  aliases: [],
  files: [
    "components/Meter/Meter.tsx",
    "components/Meter/Meter.types.ts",
    "components/Meter/Meter.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Meter/Meter.tsx",
    },
    {
      path: "components/Meter/Meter.types.ts",
    },
    {
      path: "components/Meter/Meter.variants.ts",
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
