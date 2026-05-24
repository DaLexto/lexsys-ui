/**
 * combobox.ts
 *
 * Registry metadata for the Combobox component.
 */

import type { RegistryItem } from "../registry.types.js"

export const comboboxRegistryItem: RegistryItem = {
  name: "combobox",
  canonicalName: "Combobox",
  version: "0.0.2",
  type: "component",
  category: "forms",
  aliases: [],
  files: [
    "primitives/Combobox/Combobox.tsx",
    "primitives/Combobox/Combobox.types.ts",
    "primitives/Combobox/Combobox.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Combobox/Combobox.tsx",
    },
    {
      path: "primitives/Combobox/Combobox.types.ts",
    },
    {
      path: "primitives/Combobox/Combobox.variants.ts",
    },
  ],
  dependencies: [
    "@base-ui/react",
    "class-variance-authority",
    "lucide-react",
    "clsx",
    "tailwind-merge",
  ],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Combobox",
}
