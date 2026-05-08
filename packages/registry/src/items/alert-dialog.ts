/**
 * alert-dialog.ts
 *
 * Registry metadata for the AlertDialog component.
 */

import type { RegistryItem } from "../registry.types.js"

export const alertDialogRegistryItem: RegistryItem = {
  name: "alert-dialog",
  canonicalName: "AlertDialog",
  version: "0.0.1",
  type: "component",
  category: "overlays",
  aliases: [],
  files: [
    "components/AlertDialog/AlertDialog.tsx",
    "components/AlertDialog/AlertDialog.types.ts",
    "components/AlertDialog/AlertDialog.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/AlertDialog/AlertDialog.tsx",
    },
    {
      path: "components/AlertDialog/AlertDialog.types.ts",
    },
    {
      path: "components/AlertDialog/AlertDialog.variants.ts",
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
