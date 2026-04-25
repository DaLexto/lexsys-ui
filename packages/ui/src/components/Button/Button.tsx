/**
 * Button.tsx
 *
 * Reference Button component implementation.
 */

import { forwardRef } from "react"
import type { ButtonProps } from "./Button.types"
import { buttonVariants } from "./Button.variants"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    )
  }
)

Button.displayName = "Button"