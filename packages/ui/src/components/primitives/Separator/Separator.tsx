/**
 * Separator.tsx
 *
 * Reference Separator component implementation.
 */

import { Separator as BaseSeparator } from "@base-ui/react/separator"
import type { SeparatorProps } from "./Separator.types"
import { separatorVariants } from "./Separator.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

const Separator = ({
  ref,
  orientation = "horizontal",
  className,
  ...props
}: SeparatorProps) => {
  return (
    <BaseSeparator
      ref={ref}
      orientation={orientation}
      className={mergeClassName(separatorVariants({ orientation }), className)}
      {...props}
    />
  )
}

Separator.displayName = "Separator"

export { Separator }
