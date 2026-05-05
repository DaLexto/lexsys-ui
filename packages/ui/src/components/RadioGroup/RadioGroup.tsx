/**
 * RadioGroup.tsx
 *
 * Reference RadioGroup component implementation.
 */

import { forwardRef } from "react"
import { Radio } from "@base-ui/react/radio"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import type { RadioGroupItemProps, RadioGroupProps } from "./RadioGroup.types"
import {
  radioGroupItemVariants,
  radioGroupLabelVariants,
  radioGroupVariants,
} from "./RadioGroup.variants"
import { cn } from "../../utils/cn"

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ orientation = "vertical", className, ...props }, ref) => {
    const radioGroupClassName: RadioGroupProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(radioGroupVariants({ orientation }), userClassName)
    }

    return (
      <BaseRadioGroup ref={ref} className={radioGroupClassName} {...props} />
    )
  },
)

RadioGroup.displayName = "RadioGroup"

export const RadioGroupItem = forwardRef<HTMLElement, RadioGroupItemProps>(
  (
    { size, className, indicatorClassName, labelClassName, children, ...props },
    ref,
  ) => {
    const radioClassName: RadioGroupItemProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(radioGroupItemVariants({ size }), userClassName)
    }

    return (
      <label className={cn(radioGroupLabelVariants(), labelClassName)}>
        <Radio.Root ref={ref} className={radioClassName} {...props}>
          <Radio.Indicator
            className={cn("size-2 rounded-full bg-current", indicatorClassName)}
          />
        </Radio.Root>
        {children === undefined ? null : <span>{children}</span>}
      </label>
    )
  },
)

RadioGroupItem.displayName = "RadioGroupItem"
