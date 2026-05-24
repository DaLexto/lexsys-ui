import type { Ref } from "react"
/**
 * Button.types.ts
 *
 * Public and internal types for Button component.
 */

import type { Button as BaseButton } from "@base-ui/react/button"

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger"

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

export interface ButtonProps extends Omit<BaseButton.Props, "className"> {
  ref?: Ref<HTMLButtonElement>
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  className?: BaseButton.Props["className"]
}
