/**
 * Public entry point for @neurex/registry.
 *
 * This package contains registry metadata used by the Neurex CLI.
 */

export type {
  RegistryFile,
  RegistryItem,
  RegistryItemCategory,
  RegistryItemType,
  RegistryStyle,
  RegistryStyleFile,
  RegistryUtility,
} from "./registry.types.js"
import type {
  RegistryItem,
  RegistryStyle,
  RegistryUtility,
} from "./registry.types.js"

export { alertRegistryItem } from "./items/alert.js"
export { buttonRegistryItem } from "./items/button.js"
export { cardRegistryItem } from "./items/card.js"
export { badgeRegistryItem } from "./items/badge.js"
export { inputRegistryItem } from "./items/input.js"
export { accordionRegistryItem } from "./items/accordion.js"
export { checkboxRegistryItem } from "./items/checkbox.js"
export { progressRegistryItem } from "./items/progress.js"
export { radioGroupRegistryItem } from "./items/radio-group.js"
export { separatorRegistryItem } from "./items/separator.js"
export { sliderRegistryItem } from "./items/slider.js"
export { switchRegistryItem } from "./items/switch.js"
export { tabsRegistryItem } from "./items/tabs.js"
export { toggleRegistryItem } from "./items/toggle.js"
export { tooltipRegistryItem } from "./items/tooltip.js"
export { fieldRegistryItem } from "./items/field.js"
export { formRegistryItem } from "./items/form.js"
export { fieldsetRegistryItem } from "./items/fieldset.js"
export { textareaRegistryItem } from "./items/textarea.js"
export { numberFieldRegistryItem } from "./items/number-field.js"
export { selectRegistryItem } from "./items/select.js"
export { themeRegistryStyle } from "./styles/theme.js"
export { cnRegistryUtility } from "./utilities/cn.js"

import { alertRegistryItem } from "./items/alert.js"
import { badgeRegistryItem } from "./items/badge.js"
import { buttonRegistryItem } from "./items/button.js"
import { cardRegistryItem } from "./items/card.js"
import { inputRegistryItem } from "./items/input.js"
import { accordionRegistryItem } from "./items/accordion.js"
import { checkboxRegistryItem } from "./items/checkbox.js"
import { progressRegistryItem } from "./items/progress.js"
import { radioGroupRegistryItem } from "./items/radio-group.js"
import { separatorRegistryItem } from "./items/separator.js"
import { sliderRegistryItem } from "./items/slider.js"
import { switchRegistryItem } from "./items/switch.js"
import { tabsRegistryItem } from "./items/tabs.js"
import { toggleRegistryItem } from "./items/toggle.js"
import { tooltipRegistryItem } from "./items/tooltip.js"
import { fieldRegistryItem } from "./items/field.js"
import { formRegistryItem } from "./items/form.js"
import { fieldsetRegistryItem } from "./items/fieldset.js"
import { textareaRegistryItem } from "./items/textarea.js"
import { numberFieldRegistryItem } from "./items/number-field.js"
import { selectRegistryItem } from "./items/select.js"
import { themeRegistryStyle } from "./styles/theme.js"
import { cnRegistryUtility } from "./utilities/cn.js"

export const registryVersion = "0.0.1"

export interface RegistryManifest {
  version: string
  items: RegistryItem[]
  styles: RegistryStyle[]
  utilities: RegistryUtility[]
}

export const registryItems: RegistryItem[] = [
  alertRegistryItem,
  badgeRegistryItem,
  buttonRegistryItem,
  cardRegistryItem,
  inputRegistryItem,
  accordionRegistryItem,
  checkboxRegistryItem,
  progressRegistryItem,
  radioGroupRegistryItem,
  separatorRegistryItem,
  sliderRegistryItem,
  switchRegistryItem,
  tabsRegistryItem,
  toggleRegistryItem,
  tooltipRegistryItem,
  fieldRegistryItem,
  formRegistryItem,
  fieldsetRegistryItem,
  textareaRegistryItem,
  numberFieldRegistryItem,
  selectRegistryItem,
]
export const registryStyles: RegistryStyle[] = [themeRegistryStyle]
export const registryUtilities: RegistryUtility[] = [cnRegistryUtility]

export const registryManifest: RegistryManifest = {
  version: registryVersion,
  items: registryItems,
  styles: registryStyles,
  utilities: registryUtilities,
}

export { validateRegistryItem } from "./validate-registry-item.js"
export { validateRegistry } from "./validate-registry.js"
