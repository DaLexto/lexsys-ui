/**
 * input.ts
 *
 * Registry metadata for the Input component.
 */

import type { RegistryItem } from "../registry.types.js"

export const inputRegistryItem: RegistryItem = {
  name: "input",
  canonicalName: "Input",
  version: "0.0.1",
  type: "component",
  category: "forms",
  aliases: ["ipt"],
  files: [
    "components/Input/Input.tsx",
    "components/Input/Input.types.ts",
    "components/Input/Input.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Input/Input.tsx",
    },
    {
      path: "components/Input/Input.types.ts",
    },
    {
      path: "components/Input/Input.variants.ts",
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
