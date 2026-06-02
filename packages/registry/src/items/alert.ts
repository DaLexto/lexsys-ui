/**
 * alert.ts
 *
 * Registry metadata for the Alert component.
 */

import type { RegistryItem } from "../registry.types.js"

export const alertRegistryItem: RegistryItem = {
  name: "alert",
  canonicalName: "Alert",
  type: "component",
  category: "feedback",
  aliases: ["notice", "message"],
  files: [
    "primitives/Alert/Alert.tsx",
    "primitives/Alert/Alert.types.ts",
    "primitives/Alert/Alert.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Alert/Alert.tsx",
    },
    {
      path: "primitives/Alert/Alert.types.ts",
    },
    {
      path: "primitives/Alert/Alert.variants.ts",
    },
  ],
  dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Alert",
}
