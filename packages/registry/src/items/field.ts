/**
 * field.ts
 *
 * Registry metadata for the Field component.
 */

import type { RegistryItem } from "../registry.types.js"

export const fieldRegistryItem: RegistryItem = {
  name: "field",
  canonicalName: "Field",
  type: "component",
  category: "forms",
  aliases: [],
  files: [
    "primitives/Field/Field.tsx",
    "primitives/Field/Field.types.ts",
    "primitives/Field/Field.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Field/Field.tsx",
    },
    {
      path: "primitives/Field/Field.types.ts",
    },
    {
      path: "primitives/Field/Field.variants.ts",
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
  target: "src/components/ui/Field",
}
