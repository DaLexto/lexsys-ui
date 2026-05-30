/**
 * alert-dialog.ts
 *
 * Registry metadata for the AlertDialog component.
 */

import type { RegistryItem } from "../registry.types.js"

export const alertDialogRegistryItem: RegistryItem = {
  name: "alert-dialog",
  canonicalName: "AlertDialog",
  type: "component",
  category: "overlays",
  aliases: [],
  files: [
    "primitives/AlertDialog/AlertDialog.tsx",
    "primitives/AlertDialog/AlertDialog.types.ts",
    "primitives/AlertDialog/AlertDialog.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/AlertDialog/AlertDialog.tsx",
    },
    {
      path: "primitives/AlertDialog/AlertDialog.types.ts",
    },
    {
      path: "primitives/AlertDialog/AlertDialog.variants.ts",
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
  target: "src/components/ui/AlertDialog",
}
