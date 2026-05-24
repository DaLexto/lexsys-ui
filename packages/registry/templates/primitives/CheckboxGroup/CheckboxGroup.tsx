/**
 * CheckboxGroup.tsx
 *
 * Reference CheckboxGroup component implementation.
 */

import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group"
import type { CheckboxGroupProps } from "./CheckboxGroup.types"
import { checkboxGroupVariants } from "./CheckboxGroup.variants"
import { mergeClassName } from "@/lib/utils"

const CheckboxGroup = ({
  ref,
  orientation = "vertical",
  className,
  ...props
}: CheckboxGroupProps) => {
  return (
    <BaseCheckboxGroup
      ref={ref}
      className={mergeClassName(
        checkboxGroupVariants({ orientation }),
        className,
      )}
      {...props}
    />
  )
}

CheckboxGroup.displayName = "CheckboxGroup"

export { CheckboxGroup }
