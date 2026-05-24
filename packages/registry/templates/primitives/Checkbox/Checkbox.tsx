/**
 * Checkbox.tsx
 *
 * Reference Checkbox component implementation.
 */

import { createContext, useContext } from "react"
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import type {
  CheckboxIndicatorProps,
  CheckboxProps,
  CheckboxSize,
} from "./Checkbox.types"
import {
  checkboxIndicatorVariants,
  checkboxVariants,
} from "./Checkbox.variants"
import { mergeClassName } from "@/lib/utils"

interface CheckboxContextValue {
  size: CheckboxSize
  indeterminate?: boolean
}

const CheckboxContext = createContext<CheckboxContextValue>({ size: "md" })

const useCheckboxContext = () => useContext(CheckboxContext)

const Checkbox = ({
  ref,
  size = "md",
  className,
  children,
  indeterminate,
  ...props
}: CheckboxProps) => {
  return (
    <CheckboxContext.Provider value={{ size, indeterminate }}>
      <BaseCheckbox.Root
        ref={ref}
        className={mergeClassName(checkboxVariants({ size }), className)}
        indeterminate={indeterminate}
        {...props}
      >
        {children}
      </BaseCheckbox.Root>
    </CheckboxContext.Provider>
  )
}

Checkbox.displayName = "Checkbox"

const CheckboxIndicator = ({
  className,
  children,
  ...props
}: CheckboxIndicatorProps) => {
  const { indeterminate } = useCheckboxContext()

  return (
    <BaseCheckbox.Indicator
      className={mergeClassName(checkboxIndicatorVariants(), className)}
      {...props}
    >
      {children ?? (indeterminate ? "-" : "✓")}
    </BaseCheckbox.Indicator>
  )
}

CheckboxIndicator.displayName = "CheckboxIndicator"

export { Checkbox, CheckboxIndicator }
