/**
 * Button.tsx
 *
 * Reference Button component implementation.
 */

import { forwardRef } from "react"
import { Button as BaseButton } from "@base-ui/react/button"
import type { ButtonProps } from "./Button.types"
import { buttonVariants } from "./Button.variants"
import { cn } from "@/lib/utils"

export const Button = forwardRef<HTMLElement, ButtonProps>(
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
    const buttonClassName: ButtonProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(buttonVariants({ variant, size }), userClassName)
    }

    return (
      <BaseButton
        ref={ref}
        type={type ?? "button"}
        className={buttonClassName}
        disabled={Boolean(isDisabled)}
        focusableWhenDisabled={
          isLoading ? true : Boolean(focusableWhenDisabled)
        }
        aria-busy={isLoading ? true : undefined}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </BaseButton>
    )
  },
)

Button.displayName = "Button"
