/**
 * Switch.tsx
 *
 * Reference Switch component implementation.
 */

import { Switch as BaseSwitch } from "@base-ui/react/switch"
import type { SwitchProps } from "./Switch.types"
import { switchThumbVariants, switchVariants } from "./Switch.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

const Switch = ({
  ref,
  size,
  className,
  thumbClassName,
  ...props
}: SwitchProps) => {
  return (
    <BaseSwitch.Root
      ref={ref}
      className={mergeClassName(switchVariants({ size }), className)}
      {...props}
    >
      <BaseSwitch.Thumb
        className={mergeClassName(
          switchThumbVariants({ size }),
          thumbClassName,
        )}
      />
    </BaseSwitch.Root>
  )
}

Switch.displayName = "Switch"

export { Switch }
