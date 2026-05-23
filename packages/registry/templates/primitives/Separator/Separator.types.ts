import type { Ref } from "react"
/**
 * Separator.types.ts
 *
 * Public and internal types for Separator component.
 */

import type { Separator as BaseSeparator } from "@base-ui/react/separator"

export interface SeparatorProps extends Omit<BaseSeparator.Props, "className"> {
  ref?: Ref<HTMLDivElement>
  className?: BaseSeparator.Props["className"]
}
