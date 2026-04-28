/**
 * Button.tsx
 *
 * Reference Button component implementation.
 */

import { forwardRef } from "react"
import { Button as BaseButton } from "@base-ui/react/button"
import type { ButtonProps } from "./Button.types"
import { buttonVariants } from "./Button.variants"
import { cn } from "../../../lib/neurex/cn"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      className,
      isLoading,
      children,
      disabled,
      focusableWhenDisabled,
      type,
      ...props
    },
    ref,
  ) => {
    const isDisabled = isLoading || disabled

    return (
      <BaseButton
        ref={ref}
        type={(type as "button" | "submit" | "reset" | undefined) ?? "button"}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={Boolean(isDisabled)}
        focusableWhenDisabled={isLoading ? true : focusableWhenDisabled}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </BaseButton>
    )
  },
)

Button.displayName = "Button"
