/**
 * input.ts
 *
 * Registry metadata for the Input component.
 */

import type { RegistryItem } from "../registry.types.js"

export const inputRegistryItem: RegistryItem = {
  name: "input",
  canonicalName: "Input",
  type: "component",
  category: "forms",
  aliases: ["ipt"],
  files: [
    "primitives/Input/Input.tsx",
    "primitives/Input/Input.types.ts",
    "primitives/Input/Input.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Input/Input.tsx",
    },
    {
      path: "primitives/Input/Input.types.ts",
    },
    {
      path: "primitives/Input/Input.variants.ts",
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
  target: "src/components/ui/Input",
}
