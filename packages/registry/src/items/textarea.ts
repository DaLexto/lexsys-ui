/**
 * textarea.ts
 *
 * Registry metadata for the Textarea component.
 */

import type { RegistryItem } from "../registry.types.js"

export const textareaRegistryItem: RegistryItem = {
  name: "textarea",
  canonicalName: "Textarea",
  version: "0.0.1",
  type: "component",
  category: "forms",
  aliases: [],
  files: [
    "primitives/Textarea/Textarea.tsx",
    "primitives/Textarea/Textarea.types.ts",
    "primitives/Textarea/Textarea.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Textarea/Textarea.tsx",
    },
    {
      path: "primitives/Textarea/Textarea.types.ts",
    },
    {
      path: "primitives/Textarea/Textarea.variants.ts",
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
  target: "src/components/primitives/Textarea",
}
