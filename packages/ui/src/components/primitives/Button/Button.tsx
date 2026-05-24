/**
 * Button.tsx
 *
 * Reference Button component implementation.
 */

import { Button as BaseButton } from "@base-ui/react/button"
import type { ButtonProps } from "./Button.types"
import { buttonVariants } from "./Button.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

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
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
          {children ?? "Loading"}
        </span>
      ) : (
        children
      )}
    </BaseButton>
  )
}

Button.displayName = "Button"

export { Button }
