/**
 * number-field.ts
 *
 * Registry metadata for the NumberField component.
 */

import type { RegistryItem } from "../registry.types.js"

export const numberFieldRegistryItem: RegistryItem = {
  name: "number-field",
  canonicalName: "NumberField",
  type: "component",
  category: "forms",
  aliases: [],
  files: [
    "primitives/NumberField/NumberField.tsx",
    "primitives/NumberField/NumberField.types.ts",
    "primitives/NumberField/NumberField.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/NumberField/NumberField.tsx",
    },
    {
      path: "primitives/NumberField/NumberField.types.ts",
    },
    {
      path: "primitives/NumberField/NumberField.variants.ts",
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
  target: "src/components/ui/NumberField",
}
