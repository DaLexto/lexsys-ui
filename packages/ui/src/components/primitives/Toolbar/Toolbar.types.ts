import type { Ref } from "react"
/**
 * Toolbar.types.ts
 *
 * Public and internal types for Toolbar component.
 */

import type { Toolbar as BaseToolbar } from "@base-ui/react/toolbar"

export type ToolbarProps = BaseToolbar.Root.Props & {
  ref?: Ref<HTMLDivElement>
}

export type ToolbarGroupProps = BaseToolbar.Group.Props & {
  ref?: Ref<HTMLDivElement>
}

export type ToolbarButtonProps = BaseToolbar.Button.Props & {
  ref?: Ref<HTMLButtonElement>
}

export type ToolbarLinkProps = BaseToolbar.Link.Props & {
  ref?: Ref<HTMLAnchorElement>
}

export type ToolbarInputProps = BaseToolbar.Input.Props & {
  ref?: Ref<HTMLInputElement>
}

export type ToolbarSeparatorProps = BaseToolbar.Separator.Props & {
  ref?: Ref<HTMLDivElement>
}
