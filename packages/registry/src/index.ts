/**
 * Public entry point for @neurex-ui/registry.
 *
 * This package contains registry metadata used by the Neurex CLI.
 */

export type {
  RegistryItem,
  RegistryItemCategory,
  RegistryItemType,
} from "./registry.types"

export { buttonRegistryItem } from "./items/button"

import { buttonRegistryItem } from "./items/button"

export const registryItems = [buttonRegistryItem]