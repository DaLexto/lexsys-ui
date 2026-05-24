/**
 * autocomplete.ts
 *
 * Registry metadata for the Autocomplete component.
 */

import type { RegistryItem } from "../registry.types.js"

export const autocompleteRegistryItem: RegistryItem = {
  name: "autocomplete",
  canonicalName: "Autocomplete",
  version: "0.0.1",
  type: "component",
  category: "forms",
  aliases: [],
  files: [
    "primitives/Autocomplete/Autocomplete.tsx",
    "primitives/Autocomplete/Autocomplete.types.ts",
    "primitives/Autocomplete/Autocomplete.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Autocomplete/Autocomplete.tsx",
    },
    {
      path: "primitives/Autocomplete/Autocomplete.types.ts",
    },
    {
      path: "primitives/Autocomplete/Autocomplete.variants.ts",
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
  utilities: [
    "cn",
  ],
  styles: ["theme"],
  target: "src/components/ui/Autocomplete",
}
