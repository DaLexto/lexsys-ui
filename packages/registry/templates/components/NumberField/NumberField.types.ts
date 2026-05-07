/**
 * NumberField.types.ts
 *
 * Public and internal types for NumberField component.
 */

import type { NumberField as BaseNumberField } from "@base-ui/react/number-field"

export interface NumberFieldProps extends Omit<
  BaseNumberField.Root.Props,
  "className"
> {
  className?: BaseNumberField.Root.Props["className"]
}

export interface NumberFieldGroupProps extends Omit<
  BaseNumberField.Group.Props,
  "className"
> {
  size?: "sm" | "md" | "lg"
  className?: BaseNumberField.Group.Props["className"]
}

export interface NumberFieldInputProps extends Omit<
  BaseNumberField.Input.Props,
  "aria-invalid" | "className" | "size"
> {
  size?: "sm" | "md" | "lg"
  isInvalid?: boolean
  "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling"
  className?: BaseNumberField.Input.Props["className"]
}

export interface NumberFieldButtonProps extends Omit<
  BaseNumberField.Increment.Props,
  "className" | "size"
> {
  size?: "sm" | "md" | "lg"
  className?: BaseNumberField.Increment.Props["className"]
}

export type NumberFieldIncrementProps = NumberFieldButtonProps
export type NumberFieldDecrementProps = NumberFieldButtonProps

export interface NumberFieldScrubAreaProps extends Omit<
  BaseNumberField.ScrubArea.Props,
  "className"
> {
  className?: BaseNumberField.ScrubArea.Props["className"]
}

export interface NumberFieldScrubAreaCursorProps extends Omit<
  BaseNumberField.ScrubAreaCursor.Props,
  "className"
> {
  className?: BaseNumberField.ScrubAreaCursor.Props["className"]
}
