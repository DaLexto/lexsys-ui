/**
 * Textarea.types.ts
 *
 * Public and internal types for Textarea component.
 */

import type { Field as BaseField } from "@base-ui/react/field"

type TextareaAriaInvalid = boolean | "true" | "false" | "grammar" | "spelling"
type TextareaClassName = BaseField.Control.Props["className"]

export interface TextareaProps extends Omit<
  BaseField.Control.Props,
  "aria-invalid" | "className" | "render" | "size" | "type"
> {
  variant?: "default" | "ghost"
  size?: "sm" | "md" | "lg"
  resize?: "none" | "vertical" | "both"
  rows?: number
  isInvalid?: boolean
  "aria-invalid"?: TextareaAriaInvalid
  className?: TextareaClassName
}
