/**
 * Switch.tsx
 *
 * Reference Switch component implementation.
 */

import { createContext, useContext } from "react"
import { Switch as BaseSwitch } from "@base-ui/react/switch"
import type { SwitchProps, SwitchSize, SwitchThumbProps } from "./Switch.types"
import { switchThumbVariants, switchVariants } from "./Switch.variants"
import { mergeClassName } from "@/lib/utils"

interface SwitchContextValue {
  size: SwitchSize
}

const SwitchContext = createContext<SwitchContextValue>({ size: "md" })

const useSwitchContext = () => useContext(SwitchContext)

const Switch = ({
  ref,
  size = "md",
  className,
  children,
  ...props
}: SwitchProps) => {
  return (
    <SwitchContext.Provider value={{ size }}>
      <BaseSwitch.Root
        ref={ref}
        className={mergeClassName(switchVariants({ size }), className)}
        {...props}
      >
        {children}
      </BaseSwitch.Root>
    </SwitchContext.Provider>
  )
}

Switch.displayName = "Switch"

const SwitchThumb = ({ ref, size, className, ...props }: SwitchThumbProps) => {
  const context = useSwitchContext()
  const resolvedSize = size ?? context.size

  return (
    <BaseSwitch.Thumb
      ref={ref}
      className={mergeClassName(
        switchThumbVariants({ size: resolvedSize }),
        className,
      )}
      {...props}
    />
  )
}

SwitchThumb.displayName = "SwitchThumb"

export { Switch, SwitchThumb }
