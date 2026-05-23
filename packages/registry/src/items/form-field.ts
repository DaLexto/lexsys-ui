/**
 * form-field.ts
 *
 * Registry metadata for the FormField block.
 */

import type { RegistryItem } from "../registry.types.js"

export const formFieldRegistryItem: RegistryItem = {
  name: "form-field",
  canonicalName: "FormField",
  version: "0.0.1",
  type: "block",
  category: "blocks",
  aliases: [],
  files: [
    "blocks/FormField/FormField.tsx",
    "blocks/FormField/FormField.types.ts",
    "blocks/FormField/FormField.variants.ts",
  ],
  dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  registryDependencies: ["field", "input"],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/FormField",
}
