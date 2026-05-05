/**
 * RadioGroup.types.ts
 *
 * Public and internal types for RadioGroup component.
 */

import type { ReactNode } from "react"
import type { Radio as BaseRadio } from "@base-ui/react/radio"
import type { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"

export interface RadioGroupProps<Value = string> extends Omit<
  BaseRadioGroup.Props<Value>,
  "className"
> {
  orientation?: "horizontal" | "vertical"
  className?: BaseRadioGroup.Props<Value>["className"]
}

export interface RadioGroupItemProps<Value = string> extends Omit<
  BaseRadio.Root.Props<Value>,
  "className" | "children"
> {
  size?: "sm" | "md" | "lg"
  children?: ReactNode
  className?: BaseRadio.Root.Props<Value>["className"]
  indicatorClassName?: BaseRadio.Indicator.Props["className"]
  labelClassName?: string
}
