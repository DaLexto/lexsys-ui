/**
 * NumberField.tsx
 *
 * Reference NumberField component implementation.
 */

import { forwardRef } from "react"
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
import { cn } from "@/lib/utils"

const NumberField = forwardRef<HTMLDivElement, NumberFieldProps>(
  ({ className, ...props }, ref) => {
    const rootClassName: NumberFieldProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(numberFieldVariants(), userClassName)
    }

    return (
      <BaseNumberField.Root ref={ref} className={rootClassName} {...props} />
    )
  },
)

NumberField.displayName = "NumberField"

const NumberFieldGroup = forwardRef<HTMLDivElement, NumberFieldGroupProps>(
  ({ size, className, ...props }, ref) => {
    const groupClassName: NumberFieldGroupProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(numberFieldGroupVariants({ size }), userClassName)
    }

    return (
      <BaseNumberField.Group ref={ref} className={groupClassName} {...props} />
    )
  },
)

NumberFieldGroup.displayName = "NumberFieldGroup"

const NumberFieldInput = forwardRef<HTMLInputElement, NumberFieldInputProps>(
  ({ size, className, isInvalid, ...props }, ref) => {
    const baseInputProps: Omit<
      NumberFieldInputProps,
      "className" | "isInvalid" | "size"
    > = isInvalid ? { ...props, "aria-invalid": true } : props
    const inputClassName: NumberFieldInputProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(numberFieldInputVariants({ size }), userClassName)
    }

    return (
      <BaseNumberField.Input
        ref={ref}
        className={inputClassName}
        {...baseInputProps}
      />
    )
  },
)

NumberFieldInput.displayName = "NumberFieldInput"

const NumberFieldIncrement = forwardRef<
  HTMLButtonElement,
  NumberFieldIncrementProps
>(({ size, className, children, ...props }, ref) => {
  const buttonClassName: NumberFieldIncrementProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(
      numberFieldButtonVariants({ position: "increment", size }),
      userClassName,
    )
  }

  return (
    <BaseNumberField.Increment ref={ref} className={buttonClassName} {...props}>
      {children ?? "+"}
    </BaseNumberField.Increment>
  )
})

NumberFieldIncrement.displayName = "NumberFieldIncrement"

const NumberFieldDecrement = forwardRef<
  HTMLButtonElement,
  NumberFieldDecrementProps
>(({ size, className, children, ...props }, ref) => {
  const buttonClassName: NumberFieldDecrementProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(
      numberFieldButtonVariants({ position: "decrement", size }),
      userClassName,
    )
  }

  return (
    <BaseNumberField.Decrement ref={ref} className={buttonClassName} {...props}>
      {children ?? "-"}
    </BaseNumberField.Decrement>
  )
})

NumberFieldDecrement.displayName = "NumberFieldDecrement"

const NumberFieldScrubArea = forwardRef<
  HTMLSpanElement,
  NumberFieldScrubAreaProps
>(({ className, ...props }, ref) => {
  const scrubClassName: NumberFieldScrubAreaProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(numberFieldScrubAreaVariants(), userClassName)
  }

  return (
    <BaseNumberField.ScrubArea
      ref={ref}
      className={scrubClassName}
      {...props}
    />
  )
})

NumberFieldScrubArea.displayName = "NumberFieldScrubArea"

const NumberFieldScrubAreaCursor = forwardRef<
  HTMLSpanElement,
  NumberFieldScrubAreaCursorProps
>(({ className, ...props }, ref) => {
  const cursorClassName: NumberFieldScrubAreaCursorProps["className"] = (
    state,
  ) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(numberFieldScrubAreaCursorVariants(), userClassName)
  }

  return (
    <BaseNumberField.ScrubAreaCursor
      ref={ref}
      className={cursorClassName}
      {...props}
    />
  )
})

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
