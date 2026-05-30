/**
 * otp-field.ts
 *
 * Registry metadata for the OtpField component.
 */

import type { RegistryItem } from "../registry.types.js"

export const otpFieldRegistryItem: RegistryItem = {
  name: "otp-field",
  canonicalName: "OtpField",
  type: "component",
  category: "forms",
  aliases: [],
  files: [
    "primitives/OtpField/OtpField.tsx",
    "primitives/OtpField/OtpField.types.ts",
    "primitives/OtpField/OtpField.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/OtpField/OtpField.tsx",
    },
    {
      path: "primitives/OtpField/OtpField.types.ts",
    },
    {
      path: "primitives/OtpField/OtpField.variants.ts",
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
  target: "src/components/ui/OtpField",
}
