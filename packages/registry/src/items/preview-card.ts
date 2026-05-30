/**
 * preview-card.ts
 *
 * Registry metadata for the PreviewCard component.
 */

import type { RegistryItem } from "../registry.types.js"

export const previewCardRegistryItem: RegistryItem = {
  name: "preview-card",
  canonicalName: "PreviewCard",
  type: "component",
  category: "overlays",
  aliases: [],
  files: [
    "primitives/PreviewCard/PreviewCard.tsx",
    "primitives/PreviewCard/PreviewCard.types.ts",
    "primitives/PreviewCard/PreviewCard.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/PreviewCard/PreviewCard.tsx",
    },
    {
      path: "primitives/PreviewCard/PreviewCard.types.ts",
    },
    {
      path: "primitives/PreviewCard/PreviewCard.variants.ts",
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
  target: "src/components/ui/PreviewCard",
}
