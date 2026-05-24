import type { Ref } from "react"
/**
 * Input.types.ts
 *
 * Public and internal types for Input component.
 */

import type { Input as BaseInput } from "@base-ui/react/input"

type InputAriaInvalid = boolean | "true" | "false" | "grammar" | "spelling"
type InputClassName = BaseInput.Props["className"]

export type InputVariant = "default" | "ghost"

export type InputSize = "sm" | "md" | "lg"

export interface InputProps extends Omit<
  BaseInput.Props,
  "aria-invalid" | "className" | "size"
> {
  ref?: Ref<HTMLInputElement>
  variant?: InputVariant
  size?: InputSize
  isInvalid?: boolean
  "aria-invalid"?: InputAriaInvalid
  className?: InputClassName
}
