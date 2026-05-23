/**
 * tabs.ts
 *
 * Registry metadata for the Tabs component.
 */

import type { RegistryItem } from "../registry.types.js"

export const tabsRegistryItem: RegistryItem = {
  name: "tabs",
  canonicalName: "Tabs",
  version: "0.0.1",
  type: "component",
  category: "navigation",
  aliases: ["tab"],
  files: [
    "primitives/Tabs/Tabs.tsx",
    "primitives/Tabs/Tabs.types.ts",
    "primitives/Tabs/Tabs.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Tabs/Tabs.tsx",
    },
    {
      path: "primitives/Tabs/Tabs.types.ts",
    },
    {
      path: "primitives/Tabs/Tabs.variants.ts",
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
  target: "src/components/primitives/Tabs",
}
