/**
 * button-link.ts
 *
 * Registry metadata for the ButtonLink component.
 */

import type { RegistryItem } from "../registry.types.js";

export const buttonLinkRegistryItem: RegistryItem = {
  name: "button-link",
  canonicalName: "ButtonLink",
  type: "component",
  category: "actions",
  aliases: ["btn-link", "link-button"],
  files: [
    "primitives/ButtonLink/ButtonLink.tsx",
    "primitives/ButtonLink/ButtonLink.types.ts",
    "primitives/ButtonLink/ButtonLink.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/ButtonLink/ButtonLink.tsx",
    },
    {
      path: "primitives/ButtonLink/ButtonLink.types.ts",
    },
    {
      path: "primitives/ButtonLink/ButtonLink.variants.ts",
    },
  ],
  dependencies: ["@base-ui/react", "clsx", "tailwind-merge"],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/ButtonLink",
};
