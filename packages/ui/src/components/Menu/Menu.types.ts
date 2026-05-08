/**
 * Menu.types.ts
 *
 * Public and internal types for Menu component.
 */

import type { Menu as BaseMenu } from "@base-ui/react/menu"

export type MenuProps<Payload = unknown> = BaseMenu.Root.Props<Payload>

export interface MenuTriggerProps<Payload = unknown> extends Omit<
  BaseMenu.Trigger.Props<Payload>,
  "className"
> {
  className?: BaseMenu.Trigger.Props<Payload>["className"]
}

export type MenuPortalProps = BaseMenu.Portal.Props

export interface MenuBackdropProps extends Omit<
  BaseMenu.Backdrop.Props,
  "className"
> {
  className?: BaseMenu.Backdrop.Props["className"]
}

export interface MenuPositionerProps extends Omit<
  BaseMenu.Positioner.Props,
  "className"
> {
  className?: BaseMenu.Positioner.Props["className"]
}

export interface MenuPopupProps extends Omit<
  BaseMenu.Popup.Props,
  "className"
> {
  className?: BaseMenu.Popup.Props["className"]
}

export interface MenuArrowProps extends Omit<
  BaseMenu.Arrow.Props,
  "className"
> {
  className?: BaseMenu.Arrow.Props["className"]
}

export interface MenuViewportProps extends Omit<
  BaseMenu.Viewport.Props,
  "className"
> {
  className?: BaseMenu.Viewport.Props["className"]
}

export interface MenuItemProps extends Omit<BaseMenu.Item.Props, "className"> {
  className?: BaseMenu.Item.Props["className"]
}

export interface MenuLinkItemProps extends Omit<
  BaseMenu.LinkItem.Props,
  "className"
> {
  className?: BaseMenu.LinkItem.Props["className"]
}

export interface MenuCheckboxItemProps extends Omit<
  BaseMenu.CheckboxItem.Props,
  "className"
> {
  className?: BaseMenu.CheckboxItem.Props["className"]
}

export interface MenuCheckboxItemIndicatorProps extends Omit<
  BaseMenu.CheckboxItemIndicator.Props,
  "className"
> {
  className?: BaseMenu.CheckboxItemIndicator.Props["className"]
}

export interface MenuRadioGroupProps extends Omit<
  BaseMenu.RadioGroup.Props,
  "className"
> {
  className?: BaseMenu.RadioGroup.Props["className"]
}

export interface MenuRadioItemProps extends Omit<
  BaseMenu.RadioItem.Props,
  "className"
> {
  className?: BaseMenu.RadioItem.Props["className"]
}

export interface MenuRadioItemIndicatorProps extends Omit<
  BaseMenu.RadioItemIndicator.Props,
  "className"
> {
  className?: BaseMenu.RadioItemIndicator.Props["className"]
}

export interface MenuGroupProps extends Omit<
  BaseMenu.Group.Props,
  "className"
> {
  className?: BaseMenu.Group.Props["className"]
}

export interface MenuGroupLabelProps extends Omit<
  BaseMenu.GroupLabel.Props,
  "className"
> {
  className?: BaseMenu.GroupLabel.Props["className"]
}

export interface MenuSeparatorProps extends Omit<
  BaseMenu.Separator.Props,
  "className"
> {
  className?: BaseMenu.Separator.Props["className"]
}

export type MenuSubmenuRootProps = BaseMenu.SubmenuRoot.Props

export interface MenuSubmenuTriggerProps extends Omit<
  BaseMenu.SubmenuTrigger.Props,
  "className"
> {
  className?: BaseMenu.SubmenuTrigger.Props["className"]
}
