import type { Ref } from "react"
/**
 * RadioGroup.types.ts
 *
 * Public and internal types for RadioGroup component.
 */

import type { ReactNode } from "react"
import type { Radio as BaseRadio } from "@base-ui/react/radio"
import type { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"

export type RadioGroupOrientation = "horizontal" | "vertical"

export type RadioGroupItemSize = "sm" | "md" | "lg"

export interface RadioGroupProps<Value = string> extends Omit<
  BaseRadioGroup.Props<Value>,
  "className"
> {
  ref?: Ref<HTMLDivElement>
  orientation?: RadioGroupOrientation
  className?: BaseRadioGroup.Props<Value>["className"]
}

export interface RadioGroupItemProps<Value = string> extends Omit<
  BaseRadio.Root.Props<Value>,
  "className" | "children"
> {
  size?: RadioGroupItemSize
  children?: ReactNode
  className?: BaseRadio.Root.Props<Value>["className"]
  indicatorClassName?: BaseRadio.Indicator.Props["className"]
  labelClassName?: string
}
