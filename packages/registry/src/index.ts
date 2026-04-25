/**
 * Public entry point for @neurex-ui/registry.
 *
 * This package contains registry metadata used by the Neurex CLI.
 */

export type {
  RegistryItem,
  RegistryItemCategory,
  RegistryItemType,
} from "./registry.types.js"

export { buttonRegistryItem } from "./items/button.js"

import { buttonRegistryItem } from "./items/button.js"

export const registryItems = [buttonRegistryItem]