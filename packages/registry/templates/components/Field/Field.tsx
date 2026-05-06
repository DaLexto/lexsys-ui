/**
 * Field.tsx
 *
 * Reference Field component implementation.
 */

import { forwardRef } from "react"
import { Field as BaseField } from "@base-ui/react/field"
import type {
  FieldControlProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldItemProps,
  FieldLabelProps,
  FieldProps,
  FieldValidityProps,
} from "./Field.types"
import {
  fieldControlVariants,
  fieldDescriptionVariants,
  fieldErrorVariants,
  fieldItemVariants,
  fieldLabelVariants,
  fieldVariants,
} from "./Field.variants"
import { cn } from "@/lib/utils"

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  ({ className, ...props }, ref) => {
    const fieldClassName: FieldProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(fieldVariants(), userClassName)
    }

    return <BaseField.Root ref={ref} className={fieldClassName} {...props} />
  },
)

Field.displayName = "Field"

export const FieldLabel = forwardRef<HTMLElement, FieldLabelProps>(
  ({ className, ...props }, ref) => {
    const labelClassName: FieldLabelProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(fieldLabelVariants(), userClassName)
    }

    return <BaseField.Label ref={ref} className={labelClassName} {...props} />
  },
)

FieldLabel.displayName = "FieldLabel"

export const FieldControl = forwardRef<HTMLElement, FieldControlProps>(
  ({ variant, size, className, isInvalid, ...props }, ref) => {
    const baseControlProps: Omit<
      FieldControlProps,
      "className" | "isInvalid" | "size" | "variant"
    > = isInvalid ? { ...props, "aria-invalid": true } : props
    const controlClassName: FieldControlProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(fieldControlVariants({ variant, size }), userClassName)
    }

    return (
      <BaseField.Control
        ref={ref}
        className={controlClassName}
        {...baseControlProps}
      />
    )
  },
)

FieldControl.displayName = "FieldControl"

export const FieldDescription = forwardRef<
  HTMLParagraphElement,
  FieldDescriptionProps
>(({ className, ...props }, ref) => {
  const descriptionClassName: FieldDescriptionProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(fieldDescriptionVariants(), userClassName)
  }

  return (
    <BaseField.Description
      ref={ref}
      className={descriptionClassName}
      {...props}
    />
  )
})

FieldDescription.displayName = "FieldDescription"

export const FieldItem = forwardRef<HTMLDivElement, FieldItemProps>(
  ({ className, ...props }, ref) => {
    const itemClassName: FieldItemProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(fieldItemVariants(), userClassName)
    }

    return <BaseField.Item ref={ref} className={itemClassName} {...props} />
  },
)

FieldItem.displayName = "FieldItem"

export const FieldError = forwardRef<HTMLDivElement, FieldErrorProps>(
  ({ className, ...props }, ref) => {
    const errorClassName: FieldErrorProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(fieldErrorVariants(), userClassName)
    }

    return <BaseField.Error ref={ref} className={errorClassName} {...props} />
  },
)

FieldError.displayName = "FieldError"

export const FieldValidity = (props: FieldValidityProps) => {
  return <BaseField.Validity {...props} />
}

FieldValidity.displayName = "FieldValidity"
