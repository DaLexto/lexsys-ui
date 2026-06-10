/**
 * ButtonLink.tsx
 *
 * Reference ButtonLink — button styling on an anchor or framework link host.
 */

import { Button as BaseButton } from "@base-ui/react/button";
import type { ButtonLinkProps } from "./ButtonLink.types";
import { buttonVariants } from "../Button/Button.variants";
import { mergeClassName } from "@/lib/utils";

const ButtonLink = ({
  ref,
  href,
  variant,
  size,
  className,
  isLoading,
  children,
  disabled,
  focusableWhenDisabled,
  render,
  ...props
}: ButtonLinkProps) => {
  const isDisabled = isLoading || disabled;

  return (
    <BaseButton
      nativeButton={false}
      className={mergeClassName(buttonVariants({ variant, size }), className)}
      disabled={Boolean(isDisabled)}
      focusableWhenDisabled={isLoading ? true : Boolean(focusableWhenDisabled)}
      aria-busy={isLoading ? true : undefined}
      render={render ?? <a href={href} ref={ref} />}
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
  );
};

ButtonLink.displayName = "ButtonLink";

export { ButtonLink };
