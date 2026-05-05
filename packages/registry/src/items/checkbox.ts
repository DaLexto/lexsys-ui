/**
 * checkbox.ts
 *
 * Registry metadata for the Checkbox component.
 */

import type { RegistryItem } from "../registry.types.js"

export const checkboxRegistryItem: RegistryItem = {
  name: "checkbox",
  canonicalName: "Checkbox",
  version: "0.0.1",
  type: "component",
  category: "forms",
  aliases: ["check"],
  files: [
    "components/Checkbox/Checkbox.tsx",
    "components/Checkbox/Checkbox.types.ts",
    "components/Checkbox/Checkbox.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Checkbox/Checkbox.tsx",
    },
    {
      path: "components/Checkbox/Checkbox.types.ts",
    },
    {
      path: "components/Checkbox/Checkbox.variants.ts",
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
