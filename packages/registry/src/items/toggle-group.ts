/**
 * toggle-group.ts
 *
 * Registry metadata for the ToggleGroup component.
 */

import type { RegistryItem } from "../registry.types.js"

export const toggleGroupRegistryItem: RegistryItem = {
  name: "toggle-group",
  canonicalName: "ToggleGroup",
  version: "0.0.1",
  type: "component",
  category: "actions",
  aliases: [],
  files: [
    "components/ToggleGroup/ToggleGroup.tsx",
    "components/ToggleGroup/ToggleGroup.types.ts",
    "components/ToggleGroup/ToggleGroup.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/ToggleGroup/ToggleGroup.tsx",
    },
    {
      path: "components/ToggleGroup/ToggleGroup.types.ts",
    },
    {
      path: "components/ToggleGroup/ToggleGroup.variants.ts",
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
  target: "src/components/ui/ToggleGroup",
}
