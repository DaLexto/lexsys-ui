/**
 * table.ts
 *
 * Registry metadata for the Table component.
 */

import type { RegistryItem } from "../registry.types.js"

export const tableRegistryItem: RegistryItem = {
  name: "table",
  canonicalName: "Table",
  type: "component",
  category: "data-display",
  aliases: [],
  files: [
    "primitives/Table/Table.tsx",
    "primitives/Table/Table.types.ts",
    "primitives/Table/Table.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Table/Table.tsx",
    },
    {
      path: "primitives/Table/Table.types.ts",
    },
    {
      path: "primitives/Table/Table.variants.ts",
    },
  ],
  dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Table",
}
