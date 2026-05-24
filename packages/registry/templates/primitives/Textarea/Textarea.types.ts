import type { Ref } from "react"
/**
 * Textarea.types.ts
 *
 * Public and internal types for Textarea component.
 */

import type { Field as BaseField } from "@base-ui/react/field"

type TextareaAriaInvalid = boolean | "true" | "false" | "grammar" | "spelling"
type TextareaClassName = BaseField.Control.Props["className"]

export type TextareaVariant = "default" | "ghost"

export type TextareaSize = "sm" | "md" | "lg"

export type TextareaResize = "none" | "vertical" | "both"

export interface TextareaProps extends Omit<
  BaseField.Control.Props,
  "aria-invalid" | "className" | "ref" | "render" | "size" | "type"
> {
  ref?: Ref<HTMLTextAreaElement>
  variant?: TextareaVariant
  size?: TextareaSize
  resize?: TextareaResize
  rows?: number
  isInvalid?: boolean
  "aria-invalid"?: TextareaAriaInvalid
  className?: TextareaClassName
}
