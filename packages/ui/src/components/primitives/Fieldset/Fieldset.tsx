/**
 * Fieldset.tsx
 *
 * Reference Fieldset component implementation.
 */

import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset"
import type { FieldsetLegendProps, FieldsetProps } from "./Fieldset.types"
import { fieldsetLegendVariants, fieldsetVariants } from "./Fieldset.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

const Fieldset = ({ ref, variant, className, ...props }: FieldsetProps) => {
  return (
    <BaseFieldset.Root
      ref={ref}
      className={mergeClassName(fieldsetVariants({ variant }), className)}
      {...props}
    />
  )
}

Fieldset.displayName = "Fieldset"

const FieldsetLegend = ({ ref, className, ...props }: FieldsetLegendProps) => {
  return (
    <BaseFieldset.Legend
      ref={ref}
      className={mergeClassName(fieldsetLegendVariants(), className)}
      {...props}
    />
  )
}

FieldsetLegend.displayName = "FieldsetLegend"

export { Fieldset, FieldsetLegend }
