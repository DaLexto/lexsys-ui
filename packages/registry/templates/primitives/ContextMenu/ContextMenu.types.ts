import type { Ref } from "react"
/**
 * ContextMenu.types.ts
 *
 * Public and internal types for ContextMenu component.
 */

import type { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu"
import type { Menu as BaseMenu } from "@base-ui/react/menu"

export type ContextMenuProps = BaseContextMenu.Root.Props

export type ContextMenuTriggerProps = BaseContextMenu.Trigger.Props & {
  ref?: Ref<HTMLDivElement>
}

export type ContextMenuPortalProps = BaseContextMenu.Portal.Props

export type ContextMenuBackdropProps = BaseContextMenu.Backdrop.Props

export type ContextMenuPositionerProps = BaseContextMenu.Positioner.Props

export type ContextMenuPopupProps = BaseContextMenu.Popup.Props

export type ContextMenuArrowProps = BaseContextMenu.Arrow.Props

export type ContextMenuGroupProps = BaseContextMenu.Group.Props

export type ContextMenuGroupLabelProps = BaseContextMenu.GroupLabel.Props

export interface ContextMenuItemProps extends Omit<
  BaseContextMenu.Item.Props,
  "className"
> {
  className?: BaseContextMenu.Item.Props["className"]
}

export type ContextMenuLinkItemProps = BaseContextMenu.LinkItem.Props

export type ContextMenuCheckboxItemProps = BaseContextMenu.CheckboxItem.Props

export type ContextMenuCheckboxItemIndicatorProps =
  BaseContextMenu.CheckboxItemIndicator.Props

export type ContextMenuRadioGroupProps = BaseContextMenu.RadioGroup.Props

export type ContextMenuRadioItemProps = BaseContextMenu.RadioItem.Props

export type ContextMenuRadioItemIndicatorProps =
  BaseContextMenu.RadioItemIndicator.Props

export type ContextMenuSubmenuRootProps = BaseContextMenu.SubmenuRoot.Props

export type ContextMenuSubmenuTriggerProps =
  BaseContextMenu.SubmenuTrigger.Props

export type ContextMenuSeparatorProps = BaseMenu.Separator.Props
