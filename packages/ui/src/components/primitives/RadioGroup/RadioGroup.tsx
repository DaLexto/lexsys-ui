/**
 * RadioGroup.tsx
 *
 * Reference RadioGroup component implementation.
 */

import { Radio } from "@base-ui/react/radio"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import type { RadioGroupItemProps, RadioGroupProps } from "./RadioGroup.types"
import {
  radioGroupItemVariants,
  radioGroupIndicatorVariants,
  radioGroupLabelVariants,
  radioGroupVariants,
} from "./RadioGroup.variants"
import { cn } from "../../../utils/cn"
import { mergeClassName } from "../../../utils/merge-class-name"

const RadioGroup = ({
  ref,
  orientation = "vertical",
  className,
  ...props
}: RadioGroupProps) => {
  return (
    <BaseRadioGroup
      ref={ref}
      className={mergeClassName(radioGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = ({
  ref,
  size,
  className,
  indicatorClassName,
  labelClassName,
  children,
  ...props
}: RadioGroupItemProps) => {
  return (
    <label className={cn(radioGroupLabelVariants(), labelClassName)}>
      <Radio.Root
        ref={ref}
        className={mergeClassName(radioGroupItemVariants({ size }), className)}
        {...props}
      >
        <Radio.Indicator
          className={cn(
            radioGroupIndicatorVariants({ size }),
            indicatorClassName,
          )}
        />
      </Radio.Root>
      {children === undefined ? null : <span>{children}</span>}
    </label>
  )
}

RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
