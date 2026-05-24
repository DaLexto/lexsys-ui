/**
 * Menubar.tsx
 *
 * Reference Menubar component implementation.
 */

import { Menubar as BaseMenubar } from "@base-ui/react/menubar"
import type { MenubarProps } from "./Menubar.types"
import { menubarVariants } from "./Menubar.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

const Menubar = ({ ref, className, orientation, ...props }: MenubarProps) => {
  return (
    <BaseMenubar
      ref={ref}
      orientation={orientation}
      className={mergeClassName(menubarVariants({ orientation }), className)}
      {...props}
    />
  )
}

Menubar.displayName = "Menubar"

export { Menubar }
