import type { Ref } from "react"
/**
 * Checkbox.types.ts
 *
 * Public and internal types for Checkbox component.
 */

import type { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"

export type CheckboxSize = "sm" | "md" | "lg"

export interface CheckboxProps extends Omit<
  BaseCheckbox.Root.Props,
  "className" | "children"
> {
  ref?: Ref<HTMLElement>
  size?: CheckboxSize
  className?: BaseCheckbox.Root.Props["className"]
  children?: BaseCheckbox.Root.Props["children"]
}

export interface CheckboxIndicatorProps extends Omit<
  BaseCheckbox.Indicator.Props,
  "className" | "children"
> {
  className?: BaseCheckbox.Indicator.Props["className"]
  children?: BaseCheckbox.Indicator.Props["children"]
}
