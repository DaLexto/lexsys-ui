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
    "components/Toast/Toast.tsx",
    "components/Toast/Toast.types.ts",
    "components/Toast/Toast.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Toast/Toast.tsx",
    },
    {
      path: "components/Toast/Toast.types.ts",
    },
    {
      path: "components/Toast/Toast.variants.ts",
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
  target: "src/components/ui/Toast",
}
