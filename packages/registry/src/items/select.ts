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
    "primitives/Select/Select.tsx",
    "primitives/Select/Select.types.ts",
    "primitives/Select/Select.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Select/Select.tsx",
    },
    {
      path: "primitives/Select/Select.types.ts",
    },
    {
      path: "primitives/Select/Select.variants.ts",
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
  target: "src/components/primitives/Select",
}
