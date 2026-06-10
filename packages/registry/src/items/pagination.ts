/**
 * pagination.ts
 *
 * Registry metadata for the Pagination component.
 */

import type { RegistryItem } from "../registry.types.js";

export const paginationRegistryItem: RegistryItem = {
  name: "pagination",
  canonicalName: "Pagination",
  type: "component",
  category: "navigation",
  aliases: [],
  files: [
    "primitives/Pagination/Pagination.tsx",
    "primitives/Pagination/Pagination.types.ts",
    "primitives/Pagination/Pagination.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Pagination/Pagination.tsx",
    },
    {
      path: "primitives/Pagination/Pagination.types.ts",
    },
    {
      path: "primitives/Pagination/Pagination.variants.ts",
    },
  ],
  dependencies: [
    "class-variance-authority",
    "clsx",
    "lucide-react",
    "tailwind-merge",
  ],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Pagination",
};
