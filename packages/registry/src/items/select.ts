/**
 * select.ts
 *
 * Registry metadata for the Select component.
 */

import type { RegistryItem } from "../registry.types.js"

export const selectRegistryItem: RegistryItem = {
  name: "select",
  canonicalName: "Select",
  version: "0.0.1",
  type: "component",
  category: "forms",
  aliases: [],
  files: [
    "components/Select/Select.tsx",
    "components/Select/Select.types.ts",
    "components/Select/Select.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Select/Select.tsx",
    },
    {
      path: "components/Select/Select.types.ts",
    },
    {
      path: "components/Select/Select.variants.ts",
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
  target: "src/components/ui/Select",
}
