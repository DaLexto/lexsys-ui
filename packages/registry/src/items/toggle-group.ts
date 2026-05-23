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
    "primitives/ToggleGroup/ToggleGroup.tsx",
    "primitives/ToggleGroup/ToggleGroup.types.ts",
    "primitives/ToggleGroup/ToggleGroup.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/ToggleGroup/ToggleGroup.tsx",
    },
    {
      path: "primitives/ToggleGroup/ToggleGroup.types.ts",
    },
    {
      path: "primitives/ToggleGroup/ToggleGroup.variants.ts",
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
  target: "src/components/primitives/ToggleGroup",
}
