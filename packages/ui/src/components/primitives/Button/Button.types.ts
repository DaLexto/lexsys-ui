import type { Ref } from "react"
/**
 * Button.types.ts
 *
 * Public and internal types for Button component.
 */

import type { Button as BaseButton } from "@base-ui/react/button"

export interface ButtonProps extends Omit<BaseButton.Props, "className"> {
  ref?: Ref<HTMLButtonElement>
  variant?: "primary" | "secondary" | "danger"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  isLoading?: boolean
  className?: BaseButton.Props["className"]
}
