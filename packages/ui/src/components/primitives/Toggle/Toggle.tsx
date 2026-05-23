/**
 * Toggle.tsx
 *
 * Reference Toggle component implementation.
 */

import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import type { ToggleProps } from "./Toggle.types"
import { toggleVariants } from "./Toggle.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

const Toggle = ({ ref, size, className, ...props }: ToggleProps) => {
  return (
    <BaseToggle
      ref={ref}
      className={mergeClassName(toggleVariants({ size }), className)}
      {...props}
    />
  )
}

Toggle.displayName = "Toggle"

export { Toggle }
