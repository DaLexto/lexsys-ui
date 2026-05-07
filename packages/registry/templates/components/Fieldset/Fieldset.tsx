/**
 * Fieldset.tsx
 *
 * Reference Fieldset component implementation.
 */

import { forwardRef } from "react"
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset"
import type { FieldsetLegendProps, FieldsetProps } from "./Fieldset.types"
import { fieldsetLegendVariants, fieldsetVariants } from "./Fieldset.variants"
import { cn } from "@/lib/utils"

export const Fieldset = forwardRef<HTMLElement, FieldsetProps>(
  ({ variant, className, ...props }, ref) => {
    const fieldsetClassName: FieldsetProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(fieldsetVariants({ variant }), userClassName)
    }

    return (
      <BaseFieldset.Root ref={ref} className={fieldsetClassName} {...props} />
    )
  },
)

Fieldset.displayName = "Fieldset"

export const FieldsetLegend = forwardRef<HTMLDivElement, FieldsetLegendProps>(
  ({ className, ...props }, ref) => {
    const legendClassName: FieldsetLegendProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(fieldsetLegendVariants(), userClassName)
    }

    return (
      <BaseFieldset.Legend ref={ref} className={legendClassName} {...props} />
    )
  },
)

FieldsetLegend.displayName = "FieldsetLegend"
