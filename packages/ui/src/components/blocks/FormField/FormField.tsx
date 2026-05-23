/**
 * FormField.tsx
 *
 * Reference FormField block — composes Field + Input primitives.
 */

import {
  Field,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
} from "../../primitives/Field/Field"
import { Input } from "../../primitives/Input/Input"
import type { FormFieldProps } from "./FormField.types"
import { formFieldVariants } from "./FormField.variants"
import { cn } from "../../../utils/cn"

const FormField = ({
  ref,
  label,
  description,
  errorMessage,
  fieldClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
  className,
  isInvalid,
  ...inputProps
}: FormFieldProps) => {
  const invalid = isInvalid ?? Boolean(errorMessage)

  return (
    <Field className={cn(formFieldVariants(), fieldClassName)}>
      <FieldItem>
        <FieldLabel className={labelClassName}>{label}</FieldLabel>
        <Input
          ref={ref}
          className={className}
          isInvalid={invalid}
          {...inputProps}
        />
      </FieldItem>
      {description ? (
        <FieldDescription className={descriptionClassName}>
          {description}
        </FieldDescription>
      ) : null}
      {errorMessage ? (
        <FieldError className={errorClassName}>{errorMessage}</FieldError>
      ) : null}
    </Field>
  )
}

FormField.displayName = "FormField"

export { FormField }
