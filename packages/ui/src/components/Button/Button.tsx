/**
 * Button.tsx
 *
 * Reference Button component implementation.
 */

import { Button as BaseButton } from "@base-ui/react/button"
import type { ButtonProps } from "./Button.types"
import { buttonVariants } from "./Button.variants"
import { mergeClassName } from "../../utils/merge-class-name"

const Button = ({
  ref,
  variant,
  size,
  className,
  isLoading,
  children,
  disabled,
  focusableWhenDisabled,
  type,
  ...props
}: ButtonProps) => {
  const isDisabled = isLoading || disabled

  return (
    <BaseButton
      ref={ref}
      type={type ?? "button"}
      className={mergeClassName(buttonVariants({ variant, size }), className)}
      disabled={Boolean(isDisabled)}
      focusableWhenDisabled={isLoading ? true : Boolean(focusableWhenDisabled)}
      aria-busy={isLoading ? true : undefined}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </BaseButton>
  )
}

Button.displayName = "Button"

export { Button }
