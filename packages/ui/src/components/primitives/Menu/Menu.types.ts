import type { Ref } from "react"
/**
 * Menu.types.ts
 *
 * Public and internal types for Menu component.
 */

import type { Menu as BaseMenu } from "@base-ui/react/menu"

export type MenuProps<Payload = unknown> = BaseMenu.Root.Props<Payload>

export type MenuHandle<Payload = unknown> = BaseMenu.Handle<Payload>

export type MenuTriggerProps<Payload = unknown> =
  BaseMenu.Trigger.Props<Payload> & {
    ref?: Ref<HTMLButtonElement>
  }

export type MenuPortalProps = BaseMenu.Portal.Props

export type MenuBackdropProps = BaseMenu.Backdrop.Props

export type MenuPositionerProps = BaseMenu.Positioner.Props

export type MenuPopupProps = BaseMenu.Popup.Props

export type MenuArrowProps = BaseMenu.Arrow.Props

export type MenuViewportProps = BaseMenu.Viewport.Props

export interface MenuItemProps extends Omit<BaseMenu.Item.Props, "className"> {
  className?: BaseMenu.Item.Props["className"]
}

export type MenuLinkItemProps = BaseMenu.LinkItem.Props

export type MenuCheckboxItemProps = BaseMenu.CheckboxItem.Props

export type MenuCheckboxItemIndicatorProps =
  BaseMenu.CheckboxItemIndicator.Props

export type MenuRadioGroupProps = BaseMenu.RadioGroup.Props

export type MenuRadioItemProps = BaseMenu.RadioItem.Props

export type MenuRadioItemIndicatorProps = BaseMenu.RadioItemIndicator.Props

export type MenuGroupProps = BaseMenu.Group.Props

export type MenuGroupLabelProps = BaseMenu.GroupLabel.Props

export type MenuSeparatorProps = BaseMenu.Separator.Props

export type MenuSubmenuRootProps = BaseMenu.SubmenuRoot.Props

export type MenuSubmenuTriggerProps = BaseMenu.SubmenuTrigger.Props
