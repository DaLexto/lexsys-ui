/**
 * accordion.ts
 *
 * Registry metadata for the Accordion component.
 */

import type { RegistryItem } from "../registry.types.js"

export const accordionRegistryItem: RegistryItem = {
  name: "accordion",
  canonicalName: "Accordion",
  version: "0.0.1",
  type: "component",
  category: "data-display",
  aliases: ["collapse"],
  files: [
    "components/Accordion/Accordion.tsx",
    "components/Accordion/Accordion.types.ts",
    "components/Accordion/Accordion.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Accordion/Accordion.tsx",
    },
    {
      path: "components/Accordion/Accordion.types.ts",
    },
    {
      path: "components/Accordion/Accordion.variants.ts",
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
  target: "src/components/ui/Accordion",
}
