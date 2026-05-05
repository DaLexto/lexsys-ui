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
    "components/Switch/Switch.tsx",
    "components/Switch/Switch.types.ts",
    "components/Switch/Switch.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Switch/Switch.tsx",
    },
    {
      path: "components/Switch/Switch.types.ts",
    },
    {
      path: "components/Switch/Switch.variants.ts",
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
  target: "src/components/ui/Switch",
}
