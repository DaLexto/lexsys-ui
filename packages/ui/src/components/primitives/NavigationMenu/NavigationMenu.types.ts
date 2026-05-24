import type { Ref } from "react"
/**
 * NavigationMenu.types.ts
 *
 * Public and internal types for NavigationMenu component.
 */

import type { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu"

export type NavigationMenuProps<Value = unknown> =
  BaseNavigationMenu.Root.Props<Value>

export type NavigationMenuListProps = BaseNavigationMenu.List.Props & {
  ref?: Ref<HTMLUListElement>
}

export type NavigationMenuItemProps = BaseNavigationMenu.Item.Props & {
  ref?: Ref<HTMLLIElement>
}

export type NavigationMenuContentProps = BaseNavigationMenu.Content.Props & {
  ref?: Ref<HTMLDivElement>
}

export type NavigationMenuTriggerProps = BaseNavigationMenu.Trigger.Props & {
  ref?: Ref<HTMLButtonElement>
}

export type NavigationMenuPortalProps = BaseNavigationMenu.Portal.Props

export type NavigationMenuPositionerProps =
  BaseNavigationMenu.Positioner.Props & {
    ref?: Ref<HTMLDivElement>
  }

export type NavigationMenuViewportProps = BaseNavigationMenu.Viewport.Props & {
  ref?: Ref<HTMLDivElement>
}

export type NavigationMenuBackdropProps = BaseNavigationMenu.Backdrop.Props & {
  ref?: Ref<HTMLDivElement>
}

export type NavigationMenuPopupProps = BaseNavigationMenu.Popup.Props & {
  ref?: Ref<HTMLDivElement>
}

export type NavigationMenuArrowProps = BaseNavigationMenu.Arrow.Props & {
  ref?: Ref<HTMLDivElement>
}

export type NavigationMenuLinkProps = BaseNavigationMenu.Link.Props & {
  ref?: Ref<HTMLAnchorElement>
}

export type NavigationMenuIconProps = BaseNavigationMenu.Icon.Props & {
  ref?: Ref<HTMLSpanElement>
}
