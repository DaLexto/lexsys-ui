/**
 * field.ts
 *
 * Registry metadata for the Field component.
 */

import type { RegistryItem } from "../registry.types.js"

export const fieldRegistryItem: RegistryItem = {
  name: "field",
  canonicalName: "Field",
  version: "0.0.1",
  type: "component",
  category: "forms",
  aliases: [],
  files: [
    "components/Field/Field.tsx",
    "components/Field/Field.types.ts",
    "components/Field/Field.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Field/Field.tsx",
    },
    {
      path: "components/Field/Field.types.ts",
    },
    {
      path: "components/Field/Field.variants.ts",
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
