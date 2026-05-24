/**
 * FormField.tsx
 *
 * Reference FormField block — compound re-export of Field primitives with block styling.
 */

import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
} from "../../primitives/Field/Field"
import type {
  FormFieldControlProps,
  FormFieldDescriptionProps,
  FormFieldErrorProps,
  FormFieldItemProps,
  FormFieldLabelProps,
  FormFieldProps,
} from "./FormField.types"
import { formFieldVariants } from "./FormField.variants"
import { cn } from "@/lib/utils"

const FormField = ({ ref, className, ...props }: FormFieldProps) => {
  return (
    <Field
      ref={ref}
      className={cn(formFieldVariants(), className)}
      {...props}
    />
  )
}

FormField.displayName = "FormField"

const FormFieldItem = ({ ref, className, ...props }: FormFieldItemProps) => {
  return <FieldItem ref={ref} className={className} {...props} />
}

FormFieldItem.displayName = "FormFieldItem"

const FormFieldLabel = ({
  ref,
  className,
  ...props
}: FormFieldLabelProps) => {
  return <FieldLabel ref={ref} className={className} {...props} />
}

FormFieldLabel.displayName = "FormFieldLabel"

const FormFieldControl = ({
  ref,
  className,
  ...props
}: FormFieldControlProps) => {
  return <FieldControl ref={ref} className={className} {...props} />
}

FormFieldControl.displayName = "FormFieldControl"

const FormFieldDescription = ({
  ref,
  className,
  ...props
}: FormFieldDescriptionProps) => {
  return <FieldDescription ref={ref} className={className} {...props} />
}

FormFieldDescription.displayName = "FormFieldDescription"

const FormFieldError = ({ ref, className, ...props }: FormFieldErrorProps) => {
  return <FieldError ref={ref} className={className} {...props} />
}

FormFieldError.displayName = "FormFieldError"

export {
  FormField,
  FormFieldItem,
  FormFieldLabel,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
}
