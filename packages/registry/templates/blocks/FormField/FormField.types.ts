/**
 * FormField.types.ts
 *
 * Public types for the FormField block.
 */

import type { Ref } from "react"
import type { InputProps } from "../../primitives/Input/Input.types"

export interface FormFieldProps extends Omit<InputProps, "ref"> {
  ref?: Ref<HTMLInputElement>
  label: string
  description?: string
  errorMessage?: string
  fieldClassName?: string
  labelClassName?: string
  descriptionClassName?: string
  errorClassName?: string
}
