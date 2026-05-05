/**
 * Checkbox.types.ts
 *
 * Public and internal types for Checkbox component.
 */

import type { ReactNode } from "react"
import type { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"

export interface CheckboxProps extends Omit<
  BaseCheckbox.Root.Props,
  "className" | "children"
> {
  size?: "sm" | "md" | "lg"
  children?: ReactNode
  className?: BaseCheckbox.Root.Props["className"]
  indicatorClassName?: BaseCheckbox.Indicator.Props["className"]
  labelClassName?: string
}
