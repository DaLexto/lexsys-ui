/**
 * NumberField.tsx
 *
 * Reference NumberField component implementation.
 */

import { forwardRef } from "react"
import { NumberField as BaseNumberField } from "@base-ui/react/number-field"
import type {
  NumberFieldButtonProps,
  NumberFieldGroupProps,
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

export const NumberField = forwardRef<HTMLDivElement, NumberFieldProps>(
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

export const NumberFieldGroup = forwardRef<
  HTMLDivElement,
  NumberFieldGroupProps
>(({ size, className, ...props }, ref) => {
  const groupClassName: NumberFieldGroupProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(numberFieldGroupVariants({ size }), userClassName)
  }

  return (
    <BaseNumberField.Group ref={ref} className={groupClassName} {...props} />
  )
})

NumberFieldGroup.displayName = "NumberFieldGroup"

export const NumberFieldInput = forwardRef<
  HTMLInputElement,
  NumberFieldInputProps
>(({ size, className, isInvalid, ...props }, ref) => {
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
})

NumberFieldInput.displayName = "NumberFieldInput"

export const NumberFieldIncrement = forwardRef<
  HTMLButtonElement,
  NumberFieldButtonProps
>(({ size, className, children, ...props }, ref) => {
  const buttonClassName: NumberFieldButtonProps["className"] = (state) => {
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

export const NumberFieldDecrement = forwardRef<
  HTMLButtonElement,
  NumberFieldButtonProps
>(({ size, className, children, ...props }, ref) => {
  const buttonClassName: NumberFieldButtonProps["className"] = (state) => {
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

export const NumberFieldScrubArea = forwardRef<
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

export const NumberFieldScrubAreaCursor = forwardRef<
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
