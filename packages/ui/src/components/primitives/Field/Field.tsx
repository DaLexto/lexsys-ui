/**
 * Field.tsx
 *
 * Reference Field component implementation.
 */

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
import { mergeClassName } from "../../../utils/merge-class-name"

const Field = ({ ref, className, ...props }: FieldProps) => {
  return (
    <BaseField.Root
      ref={ref}
      className={mergeClassName(fieldVariants(), className)}
      {...props}
    />
  )
}

Field.displayName = "Field"

const FieldLabel = ({ ref, className, ...props }: FieldLabelProps) => {
  return (
    <BaseField.Label
      ref={ref}
      className={mergeClassName(fieldLabelVariants(), className)}
      {...props}
    />
  )
}

FieldLabel.displayName = "FieldLabel"

const FieldControl = ({
  ref,
  variant,
  size,
  className,
  isInvalid,
  ...props
}: FieldControlProps) => {
  const baseControlProps: Omit<
    FieldControlProps,
    "className" | "isInvalid" | "size" | "variant"
  > = isInvalid ? { ...props, "aria-invalid": true } : props

  return (
    <BaseField.Control
      ref={ref}
      className={mergeClassName(
        fieldControlVariants({ variant, size }),
        className,
      )}
      {...baseControlProps}
    />
  )
}

FieldControl.displayName = "FieldControl"

const FieldDescription = ({
  ref,
  className,
  ...props
}: FieldDescriptionProps) => {
  return (
    <BaseField.Description
      ref={ref}
      className={mergeClassName(fieldDescriptionVariants(), className)}
      {...props}
    />
  )
}

FieldDescription.displayName = "FieldDescription"

const FieldItem = ({ ref, className, ...props }: FieldItemProps) => {
  return (
    <BaseField.Item
      ref={ref}
      className={mergeClassName(fieldItemVariants(), className)}
      {...props}
    />
  )
}

FieldItem.displayName = "FieldItem"

const FieldError = ({ ref, className, ...props }: FieldErrorProps) => {
  return (
    <BaseField.Error
      ref={ref}
      className={mergeClassName(fieldErrorVariants(), className)}
      {...props}
    />
  )
}

FieldError.displayName = "FieldError"

const FieldValidity = (props: FieldValidityProps) => {
  return <BaseField.Validity {...props} />
}

FieldValidity.displayName = "FieldValidity"

export {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldItem,
  FieldError,
  FieldValidity,
}
