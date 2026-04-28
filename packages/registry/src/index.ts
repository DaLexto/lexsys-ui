/**
 * Public entry point for @neurex-ui/registry.
 *
 * This package contains registry metadata used by the Neurex CLI.
 */

export type {
  RegistryFile,
  RegistryItem,
  RegistryItemCategory,
  RegistryItemType,
} from "./registry.types.js"

export { buttonRegistryItem } from "./items/button.js"

import { buttonRegistryItem } from "./items/button.js"

export const registryVersion = "0.0.1"

export const registryItems = [buttonRegistryItem]

export const registryManifest = {
  version: registryVersion,
  items: registryItems,
}

export { validateRegistryItem } from "./validate-registry-item.js"
export { validateRegistry } from "./validate-registry.js"
