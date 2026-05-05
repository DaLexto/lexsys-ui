/**
 * slider.ts
 *
 * Registry metadata for the Slider component.
 */

import type { RegistryItem } from "../registry.types.js"

export const sliderRegistryItem: RegistryItem = {
  name: "slider",
  canonicalName: "Slider",
  version: "0.0.1",
  type: "component",
  category: "forms",
  aliases: ["range"],
  files: [
    "components/Slider/Slider.tsx",
    "components/Slider/Slider.types.ts",
    "components/Slider/Slider.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Slider/Slider.tsx",
    },
    {
      path: "components/Slider/Slider.types.ts",
    },
    {
      path: "components/Slider/Slider.variants.ts",
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
