/**
 * slider.ts
 *
 * Registry metadata for the Slider component.
 */

import type { RegistryItem } from "../registry.types.js"

export const sliderRegistryItem: RegistryItem = {
  name: "slider",
  canonicalName: "Slider",
  version: "0.0.2",
  type: "component",
  category: "forms",
  aliases: ["range"],
  files: [
    "primitives/Slider/Slider.tsx",
    "primitives/Slider/Slider.types.ts",
    "primitives/Slider/Slider.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Slider/Slider.tsx",
    },
    {
      path: "primitives/Slider/Slider.types.ts",
    },
    {
      path: "primitives/Slider/Slider.variants.ts",
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
  target: "src/components/ui/Slider",
}
