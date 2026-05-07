/**
 * number-field.ts
 *
 * Registry metadata for the NumberField component.
 */

import type { RegistryItem } from "../registry.types.js"

export const numberFieldRegistryItem: RegistryItem = {
  name: "number-field",
  canonicalName: "NumberField",
  version: "0.0.1",
  type: "component",
  category: "forms",
  aliases: [],
  files: [
    "components/NumberField/NumberField.tsx",
    "components/NumberField/NumberField.types.ts",
    "components/NumberField/NumberField.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/NumberField/NumberField.tsx",
    },
    {
      path: "components/NumberField/NumberField.types.ts",
    },
    {
      path: "components/NumberField/NumberField.variants.ts",
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
