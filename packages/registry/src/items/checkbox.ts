/**
 * checkbox.ts
 *
 * Registry metadata for the Checkbox component.
 */

import type { RegistryItem } from "../registry.types.js"

export const checkboxRegistryItem: RegistryItem = {
  name: "checkbox",
  canonicalName: "Checkbox",
  type: "component",
  category: "forms",
  aliases: ["check"],
  files: [
    "primitives/Checkbox/Checkbox.tsx",
    "primitives/Checkbox/Checkbox.types.ts",
    "primitives/Checkbox/Checkbox.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Checkbox/Checkbox.tsx",
    },
    {
      path: "primitives/Checkbox/Checkbox.types.ts",
    },
    {
      path: "primitives/Checkbox/Checkbox.variants.ts",
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
  target: "src/components/ui/Checkbox",
}
