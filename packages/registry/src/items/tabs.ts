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
    "components/Tabs/Tabs.tsx",
    "components/Tabs/Tabs.types.ts",
    "components/Tabs/Tabs.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Tabs/Tabs.tsx",
    },
    {
      path: "components/Tabs/Tabs.types.ts",
    },
    {
      path: "components/Tabs/Tabs.variants.ts",
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
  target: "src/components/ui/Tabs",
}
