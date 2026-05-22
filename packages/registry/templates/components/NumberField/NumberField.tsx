/**
 * NumberField.tsx
 *
 * Reference NumberField component implementation.
 */

import { NumberField as BaseNumberField } from "@base-ui/react/number-field"
import type {
  NumberFieldDecrementProps,
  NumberFieldGroupProps,
  NumberFieldIncrementProps,
  NumberFieldInputProps,
  NumberFieldProps,
  NumberFieldScrubAreaCursorProps,
  NumberFieldScrubAreaProps,
} from "./NumberField.types"
import {
  numberFieldButtonVariants,
  numberFieldGroupVariants,
  numberFieldInputVariants,
  numberFieldScrubAreaCursorVariants,
  numberFieldScrubAreaVariants,
  numberFieldVariants,
} from "./NumberField.variants"
import { mergeClassName } from "@/lib/utils"

const NumberField = ({ ref, className, ...props }: NumberFieldProps) => {
  return (
    <BaseNumberField.Root
      ref={ref}
      className={mergeClassName(numberFieldVariants(), className)}
      {...props}
    />
  )
}

NumberField.displayName = "NumberField"

const NumberFieldGroup = ({
  ref,
  size,
  className,
  ...props
}: NumberFieldGroupProps) => {
  return (
    <BaseNumberField.Group
      ref={ref}
      className={mergeClassName(numberFieldGroupVariants({ size }), className)}
      {...props}
    />
  )
}

NumberFieldGroup.displayName = "NumberFieldGroup"

const NumberFieldInput = ({
  ref,
  size,
  className,
  isInvalid,
  ...props
}: NumberFieldInputProps) => {
  const baseInputProps: Omit<
    NumberFieldInputProps,
    "className" | "isInvalid" | "size"
  > = isInvalid ? { ...props, "aria-invalid": true } : props

  return (
    <BaseNumberField.Input
      ref={ref}
      className={mergeClassName(numberFieldInputVariants({ size }), className)}
      {...baseInputProps}
    />
  )
}

NumberFieldInput.displayName = "NumberFieldInput"

const NumberFieldIncrement = ({
  ref,
  size,
  className,
  children,
  ...props
}: NumberFieldIncrementProps) => {
  return (
    <BaseNumberField.Increment
      ref={ref}
      className={mergeClassName(
        numberFieldButtonVariants({ position: "increment", size }),
        className,
      )}
      {...props}
    >
      {children ?? "+"}
    </BaseNumberField.Increment>
  )
}

NumberFieldIncrement.displayName = "NumberFieldIncrement"

const NumberFieldDecrement = ({
  ref,
  size,
  className,
  children,
  ...props
}: NumberFieldDecrementProps) => {
  return (
    <BaseNumberField.Decrement
      ref={ref}
      className={mergeClassName(
        numberFieldButtonVariants({ position: "decrement", size }),
        className,
      )}
      {...props}
    >
      {children ?? "-"}
    </BaseNumberField.Decrement>
  )
}

NumberFieldDecrement.displayName = "NumberFieldDecrement"

const NumberFieldScrubArea = ({
  ref,
  className,
  ...props
}: NumberFieldScrubAreaProps) => {
  return (
    <BaseNumberField.ScrubArea
      ref={ref}
      className={mergeClassName(numberFieldScrubAreaVariants(), className)}
      {...props}
    />
  )
}

NumberFieldScrubArea.displayName = "NumberFieldScrubArea"

const NumberFieldScrubAreaCursor = ({
  ref,
  className,
  ...props
}: NumberFieldScrubAreaCursorProps) => {
  return (
    <BaseNumberField.ScrubAreaCursor
      ref={ref}
      className={mergeClassName(
        numberFieldScrubAreaCursorVariants(),
        className,
      )}
      {...props}
    />
  )
}

NumberFieldScrubAreaCursor.displayName = "NumberFieldScrubAreaCursor"

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
}
