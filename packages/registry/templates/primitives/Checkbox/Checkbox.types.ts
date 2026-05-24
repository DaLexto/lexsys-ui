import type { Ref } from "react"
/**
 * Checkbox.types.ts
 *
 * Public and internal types for Checkbox component.
 */

import type { ReactNode } from "react"
import type { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"

export type CheckboxSize = "sm" | "md" | "lg"

export interface CheckboxProps extends Omit<
  BaseCheckbox.Root.Props,
  "className" | "children"
> {
  ref?: Ref<HTMLElement>
  size?: CheckboxSize
  children?: ReactNode
  className?: BaseCheckbox.Root.Props["className"]
  indicatorClassName?: BaseCheckbox.Indicator.Props["className"]
  labelClassName?: string
}
