/**
 * card.ts
 *
 * Registry metadata for the Card component.
 */

import type { RegistryItem } from "../registry.types.js"

export const cardRegistryItem: RegistryItem = {
  name: "card",
  canonicalName: "Card",
  version: "0.0.1",
  type: "component",
  category: "layout",
  aliases: ["panel", "surface"],
  files: [
    "components/Card/Card.tsx",
    "components/Card/Card.types.ts",
    "components/Card/Card.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Card/Card.tsx",
    },
    {
      path: "components/Card/Card.types.ts",
    },
    {
      path: "components/Card/Card.variants.ts",
    },
  ],
  dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Card",
}
