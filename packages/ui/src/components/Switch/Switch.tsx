/**
 * Switch.tsx
 *
 * Reference Switch component implementation.
 */

import { forwardRef } from "react"
import { Switch as BaseSwitch } from "@base-ui/react/switch"
import type { SwitchProps } from "./Switch.types"
import { switchThumbVariants, switchVariants } from "./Switch.variants"
import { cn } from "../../utils/cn"

export const Switch = forwardRef<HTMLElement, SwitchProps>(
  ({ size, className, thumbClassName, ...props }, ref) => {
    const switchClassName: SwitchProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(switchVariants({ size }), userClassName)
    }

    const thumbClassNames: SwitchProps["thumbClassName"] = (state) => {
      const userClassName =
        typeof thumbClassName === "function"
          ? thumbClassName(state)
          : thumbClassName

      return cn(switchThumbVariants({ size }), userClassName)
    }

    return (
      <BaseSwitch.Root ref={ref} className={switchClassName} {...props}>
        <BaseSwitch.Thumb className={thumbClassNames} />
      </BaseSwitch.Root>
    )
  },
)

Switch.displayName = "Switch"
