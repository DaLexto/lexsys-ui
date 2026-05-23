/**
 * switch.ts
 *
 * Registry metadata for the Switch component.
 */

import type { RegistryItem } from "../registry.types.js"

export const switchRegistryItem: RegistryItem = {
  name: "switch",
  canonicalName: "Switch",
  version: "0.0.1",
  type: "component",
  category: "forms",
  aliases: ["toggle-switch"],
  files: [
    "primitives/Switch/Switch.tsx",
    "primitives/Switch/Switch.types.ts",
    "primitives/Switch/Switch.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Switch/Switch.tsx",
    },
    {
      path: "primitives/Switch/Switch.types.ts",
    },
    {
      path: "primitives/Switch/Switch.variants.ts",
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
  target: "src/components/primitives/Switch",
}
