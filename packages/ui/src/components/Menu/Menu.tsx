/**
 * Menu.tsx
 *
 * Reference Menu component implementation.
 */

import { Check, ChevronRight } from "lucide-react"
import { Menu as BaseMenu } from "@base-ui/react/menu"
import type {
  MenuArrowProps,
  MenuBackdropProps,
  MenuCheckboxItemIndicatorProps,
  MenuCheckboxItemProps,
  MenuGroupLabelProps,
  MenuGroupProps,
  MenuItemProps,
  MenuLinkItemProps,
  MenuPopupProps,
  MenuPortalProps,
  MenuPositionerProps,
  MenuProps,
  MenuRadioGroupProps,
  MenuRadioItemIndicatorProps,
  MenuRadioItemProps,
  MenuSeparatorProps,
  MenuSubmenuRootProps,
  MenuSubmenuTriggerProps,
  MenuTriggerProps,
  MenuViewportProps,
} from "./Menu.types"
import {
  menuArrowVariants,
  menuBackdropVariants,
  menuGroupLabelVariants,
  menuGroupVariants,
  menuItemIndicatorVariants,
  menuItemTextVariants,
  menuItemVariants,
  menuPopupVariants,
  menuPositionerVariants,
  menuSeparatorVariants,
  menuSubmenuTriggerIconVariants,
  menuTriggerVariants,
  menuViewportVariants,
} from "./Menu.variants"
import { mergeClassName } from "../../utils/merge-class-name"
import { overlayPositionerSideOffset } from "../../utils/overlay-positioner"

const Menu = <Payload = unknown,>(props: MenuProps<Payload>) => {
  return <BaseMenu.Root {...props} />
}

Menu.displayName = "Menu"

const MenuTrigger = ({ ref, className, ...props }: MenuTriggerProps) => {
  return (
    <BaseMenu.Trigger
      ref={ref}
      className={mergeClassName(menuTriggerVariants(), className)}
      {...props}
    />
  )
}

MenuTrigger.displayName = "MenuTrigger"

const MenuPortal = (props: MenuPortalProps) => {
  return <BaseMenu.Portal {...props} />
}

MenuPortal.displayName = "MenuPortal"

const MenuBackdrop = ({ ref, className, ...props }: MenuBackdropProps) => {
  return (
    <BaseMenu.Backdrop
      ref={ref}
      className={mergeClassName(menuBackdropVariants(), className)}
      {...props}
    />
  )
}

MenuBackdrop.displayName = "MenuBackdrop"

const MenuPositioner = ({
  ref,
  className,
  sideOffset = overlayPositionerSideOffset,
  ...props
}: MenuPositionerProps) => {
  return (
    <BaseMenu.Positioner
      ref={ref}
      sideOffset={sideOffset}
      className={mergeClassName(menuPositionerVariants(), className)}
      {...props}
    />
  )
}

MenuPositioner.displayName = "MenuPositioner"

const MenuPopup = ({ ref, className, ...props }: MenuPopupProps) => {
  return (
    <BaseMenu.Popup
      ref={ref}
      className={mergeClassName(menuPopupVariants(), className)}
      {...props}
    />
  )
}

MenuPopup.displayName = "MenuPopup"

const MenuArrow = ({ ref, className, ...props }: MenuArrowProps) => {
  return (
    <BaseMenu.Arrow
      ref={ref}
      className={mergeClassName(menuArrowVariants(), className)}
      {...props}
    />
  )
}

MenuArrow.displayName = "MenuArrow"

const MenuViewport = ({ ref, className, ...props }: MenuViewportProps) => {
  return (
    <BaseMenu.Viewport
      ref={ref}
      className={mergeClassName(menuViewportVariants(), className)}
      {...props}
    />
  )
}

MenuViewport.displayName = "MenuViewport"

const MenuItem = ({ ref, className, ...props }: MenuItemProps) => {
  return (
    <BaseMenu.Item
      ref={ref}
      className={mergeClassName(menuItemVariants(), className)}
      {...props}
    />
  )
}

MenuItem.displayName = "MenuItem"

const MenuLinkItem = ({ ref, className, ...props }: MenuLinkItemProps) => {
  return (
    <BaseMenu.LinkItem
      ref={ref}
      className={mergeClassName(menuItemVariants(), className)}
      {...props}
    />
  )
}

MenuLinkItem.displayName = "MenuLinkItem"

const MenuCheckboxItem = ({
  ref,
  className,
  ...props
}: MenuCheckboxItemProps) => {
  return (
    <BaseMenu.CheckboxItem
      ref={ref}
      className={mergeClassName(menuItemVariants(), className)}
      {...props}
    />
  )
}

MenuCheckboxItem.displayName = "MenuCheckboxItem"

const MenuCheckboxItemIndicator = ({
  ref,
  className,
  children,
  ...props
}: MenuCheckboxItemIndicatorProps) => {
  return (
    <BaseMenu.CheckboxItemIndicator
      ref={ref}
      className={mergeClassName(menuItemIndicatorVariants(), className)}
      {...props}
    >
      {children ?? <Check aria-hidden="true" size={14} />}
    </BaseMenu.CheckboxItemIndicator>
  )
}

MenuCheckboxItemIndicator.displayName = "MenuCheckboxItemIndicator"

const MenuRadioGroup = ({ ref, className, ...props }: MenuRadioGroupProps) => {
  return (
    <BaseMenu.RadioGroup
      ref={ref}
      className={mergeClassName(menuGroupVariants(), className)}
      {...props}
    />
  )
}

MenuRadioGroup.displayName = "MenuRadioGroup"

const MenuRadioItem = ({ ref, className, ...props }: MenuRadioItemProps) => {
  return (
    <BaseMenu.RadioItem
      ref={ref}
      className={mergeClassName(menuItemVariants(), className)}
      {...props}
    />
  )
}

MenuRadioItem.displayName = "MenuRadioItem"

const MenuRadioItemIndicator = ({
  ref,
  className,
  children,
  ...props
}: MenuRadioItemIndicatorProps) => {
  return (
    <BaseMenu.RadioItemIndicator
      ref={ref}
      className={mergeClassName(menuItemIndicatorVariants(), className)}
      {...props}
    >
      {children ?? <Check aria-hidden="true" size={14} />}
    </BaseMenu.RadioItemIndicator>
  )
}

MenuRadioItemIndicator.displayName = "MenuRadioItemIndicator"

const MenuGroup = ({ ref, className, ...props }: MenuGroupProps) => {
  return (
    <BaseMenu.Group
      ref={ref}
      className={mergeClassName(menuGroupVariants(), className)}
      {...props}
    />
  )
}

MenuGroup.displayName = "MenuGroup"

const MenuGroupLabel = ({ ref, className, ...props }: MenuGroupLabelProps) => {
  return (
    <BaseMenu.GroupLabel
      ref={ref}
      className={mergeClassName(menuGroupLabelVariants(), className)}
      {...props}
    />
  )
}

MenuGroupLabel.displayName = "MenuGroupLabel"

const MenuSeparator = ({ ref, className, ...props }: MenuSeparatorProps) => {
  return (
    <BaseMenu.Separator
      ref={ref}
      className={mergeClassName(menuSeparatorVariants(), className)}
      {...props}
    />
  )
}

MenuSeparator.displayName = "MenuSeparator"

const MenuSubmenuRoot = (props: MenuSubmenuRootProps) => {
  return <BaseMenu.SubmenuRoot {...props} />
}

MenuSubmenuRoot.displayName = "MenuSubmenuRoot"

const MenuSubmenuTrigger = ({
  ref,
  className,
  children,
  ...props
}: MenuSubmenuTriggerProps) => {
  return (
    <BaseMenu.SubmenuTrigger
      ref={ref}
      className={mergeClassName(menuTriggerVariants(), className)}
      {...props}
    >
      <span className={menuItemTextVariants()}>{children}</span>
      <span className={menuSubmenuTriggerIconVariants()}>
        <ChevronRight aria-hidden="true" size={14} />
      </span>
    </BaseMenu.SubmenuTrigger>
  )
}

MenuSubmenuTrigger.displayName = "MenuSubmenuTrigger"

export {
  Menu,
  MenuTrigger,
  MenuPortal,
  MenuBackdrop,
  MenuPositioner,
  MenuPopup,
  MenuArrow,
  MenuViewport,
  MenuItem,
  MenuLinkItem,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
}
