import type { Ref } from "react"
/**
 * Menubar.types.ts
 *
 * Public and internal types for Menubar component.
 */

import type { MenubarProps as BaseMenubarProps } from "@base-ui/react/menubar"

export type MenubarProps = BaseMenubarProps & {
  ref?: Ref<HTMLDivElement>
}
