/**
 * Checkbox.tsx
 *
 * Reference Checkbox component implementation.
 */

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import type { CheckboxProps } from "./Checkbox.types"
import { checkboxLabelVariants, checkboxVariants } from "./Checkbox.variants"
import { cn } from "../../utils/cn"
import { mergeClassName } from "../../utils/merge-class-name"

const Checkbox = ({
  ref,
  size,
  className,
  indicatorClassName,
  labelClassName,
  children,
  ...props
}: CheckboxProps) => {
  return (
    <label className={cn(checkboxLabelVariants(), labelClassName)}>
      <BaseCheckbox.Root
        ref={ref}
        className={mergeClassName(checkboxVariants({ size }), className)}
        {...props}
      >
        <BaseCheckbox.Indicator
          className={cn("leading-none", indicatorClassName)}
        >
          {props.indeterminate ? "-" : "✓"}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {children === undefined ? null : <span>{children}</span>}
    </label>
  )
}

Checkbox.displayName = "Checkbox"

export { Checkbox }
