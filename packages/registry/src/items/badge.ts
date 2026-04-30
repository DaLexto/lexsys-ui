/**
 * badge.ts
 *
 * Registry metadata for the Badge component.
 */

import type { RegistryItem } from "../registry.types.js"

export const badgeRegistryItem: RegistryItem = {
  name: "badge",
  canonicalName: "Badge",
  version: "0.0.1",
  type: "component",
  category: "data-display",
  aliases: ["tag", "label"],
  files: [
    "components/Badge/Badge.tsx",
    "components/Badge/Badge.types.ts",
    "components/Badge/Badge.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Badge/Badge.tsx",
    },
    {
      path: "components/Badge/Badge.types.ts",
    },
    {
      path: "components/Badge/Badge.variants.ts",
    },
  ],
  dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Badge",
}
