/**
 * date-picker.ts
 *
 * Registry metadata for the DatePicker component.
 */

import type { RegistryItem } from "../registry.types.js";

export const datePickerRegistryItem: RegistryItem = {
  name: "date-picker",
  canonicalName: "DatePicker",
  type: "component",
  category: "forms",
  aliases: [],
  files: [
    "primitives/DatePicker/DatePicker.tsx",
    "primitives/DatePicker/DatePicker.types.ts",
    "primitives/DatePicker/DatePicker.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/DatePicker/DatePicker.tsx",
    },
    {
      path: "primitives/DatePicker/DatePicker.types.ts",
    },
    {
      path: "primitives/DatePicker/DatePicker.variants.ts",
    },
  ],
  dependencies: [
    "class-variance-authority",
    "clsx",
    "lucide-react",
    "tailwind-merge",
  ],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/DatePicker",
};
