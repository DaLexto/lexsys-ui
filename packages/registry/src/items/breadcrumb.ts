/**
 * breadcrumb.ts
 *
 * Registry metadata for the Breadcrumb component.
 */

import type { RegistryItem } from "../registry.types.js";

export const breadcrumbRegistryItem: RegistryItem = {
  name: "breadcrumb",
  canonicalName: "Breadcrumb",
  type: "component",
  category: "navigation",
  aliases: [],
  files: [
    "primitives/Breadcrumb/Breadcrumb.tsx",
    "primitives/Breadcrumb/Breadcrumb.types.ts",
    "primitives/Breadcrumb/Breadcrumb.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Breadcrumb/Breadcrumb.tsx",
    },
    {
      path: "primitives/Breadcrumb/Breadcrumb.types.ts",
    },
    {
      path: "primitives/Breadcrumb/Breadcrumb.variants.ts",
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
  target: "src/components/ui/Breadcrumb",
};
