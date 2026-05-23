/**
 * toast.ts
 *
 * Registry metadata for the Toast component.
 */

import type { RegistryItem } from "../registry.types.js"

export const toastRegistryItem: RegistryItem = {
  name: "toast",
  canonicalName: "Toast",
  version: "0.0.1",
  type: "component",
  category: "feedback",
  aliases: [],
  files: [
    "primitives/Toast/Toast.tsx",
    "primitives/Toast/Toast.types.ts",
    "primitives/Toast/Toast.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Toast/Toast.tsx",
    },
    {
      path: "primitives/Toast/Toast.types.ts",
    },
    {
      path: "primitives/Toast/Toast.variants.ts",
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
  target: "src/components/primitives/Toast",
}
