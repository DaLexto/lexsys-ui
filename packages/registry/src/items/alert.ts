/**
 * alert.ts
 *
 * Registry metadata for the Alert component.
 */

import type { RegistryItem } from "../registry.types.js"

export const alertRegistryItem: RegistryItem = {
  name: "alert",
  canonicalName: "Alert",
  version: "0.0.1",
  type: "component",
  category: "feedback",
  aliases: ["notice", "message"],
  files: [
    "components/Alert/Alert.tsx",
    "components/Alert/Alert.types.ts",
    "components/Alert/Alert.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Alert/Alert.tsx",
    },
    {
      path: "components/Alert/Alert.types.ts",
    },
    {
      path: "components/Alert/Alert.variants.ts",
    },
  ],
  dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Alert",
}
