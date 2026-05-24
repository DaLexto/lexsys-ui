/**
 * auth-form.ts
 *
 * Registry metadata for the AuthForm block.
 */

import type { RegistryItem } from "../registry.types.js"

export const authFormRegistryItem: RegistryItem = {
  name: "auth-form",
  canonicalName: "AuthForm",
  version: "0.0.2",
  type: "block",
  category: "blocks",
  aliases: ["login-form"],
  files: [
    "blocks/AuthForm/AuthForm.tsx",
    "blocks/AuthForm/AuthForm.types.ts",
    "blocks/AuthForm/AuthForm.variants.ts",
  ],
  dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  registryDependencies: ["card", "button", "form-field", "field"],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/AuthForm",
}
