/**
 * data-table.ts
 *
 * Registry metadata for the DataTable block.
 */

import type { RegistryItem } from "../registry.types.js"

export const dataTableRegistryItem: RegistryItem = {
  name: "data-table",
  canonicalName: "DataTable",
  type: "block",
  category: "blocks",
  aliases: ["table-view"],
  files: [
    "blocks/DataTable/DataTable.tsx",
    "blocks/DataTable/DataTable.types.ts",
    "blocks/DataTable/DataTable.variants.ts",
  ],
  dependencies: ["clsx", "tailwind-merge"],
  registryDependencies: ["pagination", "table"],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/DataTable",
}
