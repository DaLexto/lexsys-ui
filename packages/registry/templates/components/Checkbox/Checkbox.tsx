/**
 * Checkbox.tsx
 *
 * Reference Checkbox component implementation.
 */

import { forwardRef } from "react"
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import type { CheckboxProps } from "./Checkbox.types"
import { checkboxLabelVariants, checkboxVariants } from "./Checkbox.variants"
import { cn } from "@/lib/utils"

const Checkbox = forwardRef<HTMLElement, CheckboxProps>(
  (
    { size, className, indicatorClassName, labelClassName, children, ...props },
    ref,
  ) => {
    const checkboxClassName: CheckboxProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(checkboxVariants({ size }), userClassName)
    }

    return (
      <label className={cn(checkboxLabelVariants(), labelClassName)}>
        <BaseCheckbox.Root ref={ref} className={checkboxClassName} {...props}>
          <BaseCheckbox.Indicator
            className={cn("leading-none", indicatorClassName)}
          >
            {props.indeterminate ? "-" : "✓"}
          </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
        {children === undefined ? null : <span>{children}</span>}
      </label>
    )
  },
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
