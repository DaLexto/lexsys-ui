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
    "components/Textarea/Textarea.tsx",
    "components/Textarea/Textarea.types.ts",
    "components/Textarea/Textarea.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Textarea/Textarea.tsx",
    },
    {
      path: "components/Textarea/Textarea.types.ts",
    },
    {
      path: "components/Textarea/Textarea.variants.ts",
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
  target: "src/components/ui/Textarea",
}
