/**
 * NavigationMenu.tsx
 *
 * Reference NavigationMenu component implementation.
 */

import { ChevronDown } from "lucide-react"
import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu"
import type {
  NavigationMenuArrowProps,
  NavigationMenuBackdropProps,
  NavigationMenuContentProps,
  NavigationMenuIconProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuPopupProps,
  NavigationMenuPortalProps,
  NavigationMenuPositionerProps,
  NavigationMenuProps,
  NavigationMenuTriggerProps,
  NavigationMenuViewportProps,
} from "./NavigationMenu.types"
import {
  navigationMenuArrowVariants,
  navigationMenuBackdropVariants,
  navigationMenuContentVariants,
  navigationMenuIconVariants,
  navigationMenuItemVariants,
  navigationMenuLinkVariants,
  navigationMenuListVariants,
  navigationMenuPopupVariants,
  navigationMenuPositionerVariants,
  navigationMenuRootVariants,
  navigationMenuTriggerVariants,
  navigationMenuViewportVariants,
} from "./NavigationMenu.variants"
import { mergeClassName } from "@/lib/utils"
import { overlayPositionerSideOffset } from "@/lib/utils"

const NavigationMenu = <Value = unknown,>({
  className,
  ...props
}: NavigationMenuProps<Value>) => {
  return (
    <BaseNavigationMenu.Root
      className={mergeClassName(navigationMenuRootVariants(), className)}
      {...props}
    />
  )
}

NavigationMenu.displayName = "NavigationMenu"

const NavigationMenuList = ({
  ref,
  className,
  ...props
}: NavigationMenuListProps) => {
  return (
    <BaseNavigationMenu.List
      ref={ref}
      className={mergeClassName(navigationMenuListVariants(), className)}
      {...props}
    />
  )
}

NavigationMenuList.displayName = "NavigationMenuList"

const NavigationMenuItem = ({
  ref,
  className,
  ...props
}: NavigationMenuItemProps) => {
  return (
    <BaseNavigationMenu.Item
      ref={ref}
      className={mergeClassName(navigationMenuItemVariants(), className)}
      {...props}
    />
  )
}

NavigationMenuItem.displayName = "NavigationMenuItem"

const NavigationMenuContent = ({
  ref,
  className,
  ...props
}: NavigationMenuContentProps) => {
  return (
    <BaseNavigationMenu.Content
      ref={ref}
      className={mergeClassName(navigationMenuContentVariants(), className)}
      {...props}
    />
  )
}

NavigationMenuContent.displayName = "NavigationMenuContent"

const NavigationMenuTrigger = ({
  ref,
  className,
  ...props
}: NavigationMenuTriggerProps) => {
  return (
    <BaseNavigationMenu.Trigger
      ref={ref}
      className={mergeClassName(navigationMenuTriggerVariants(), className)}
      {...props}
    />
  )
}

NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

const NavigationMenuPortal = (props: NavigationMenuPortalProps) => {
  return <BaseNavigationMenu.Portal {...props} />
}

NavigationMenuPortal.displayName = "NavigationMenuPortal"

const NavigationMenuPositioner = ({
  ref,
  className,
  sideOffset = overlayPositionerSideOffset,
  ...props
}: NavigationMenuPositionerProps) => {
  return (
    <BaseNavigationMenu.Positioner
      ref={ref}
      sideOffset={sideOffset}
      className={mergeClassName(navigationMenuPositionerVariants(), className)}
      {...props}
    />
  )
}

NavigationMenuPositioner.displayName = "NavigationMenuPositioner"

const NavigationMenuViewport = ({
  ref,
  className,
  ...props
}: NavigationMenuViewportProps) => {
  return (
    <BaseNavigationMenu.Viewport
      ref={ref}
      className={mergeClassName(navigationMenuViewportVariants(), className)}
      {...props}
    />
  )
}

NavigationMenuViewport.displayName = "NavigationMenuViewport"

const NavigationMenuBackdrop = ({
  ref,
  className,
  ...props
}: NavigationMenuBackdropProps) => {
  return (
    <BaseNavigationMenu.Backdrop
      ref={ref}
      className={mergeClassName(navigationMenuBackdropVariants(), className)}
      {...props}
    />
  )
}

NavigationMenuBackdrop.displayName = "NavigationMenuBackdrop"

const NavigationMenuPopup = ({
  ref,
  className,
  ...props
}: NavigationMenuPopupProps) => {
  return (
    <BaseNavigationMenu.Popup
      ref={ref}
      className={mergeClassName(navigationMenuPopupVariants(), className)}
      {...props}
    />
  )
}

NavigationMenuPopup.displayName = "NavigationMenuPopup"

const NavigationMenuArrow = ({
  ref,
  className,
  ...props
}: NavigationMenuArrowProps) => {
  return (
    <BaseNavigationMenu.Arrow
      ref={ref}
      className={mergeClassName(navigationMenuArrowVariants(), className)}
      {...props}
    />
  )
}

NavigationMenuArrow.displayName = "NavigationMenuArrow"

const NavigationMenuLink = ({
  ref,
  className,
  ...props
}: NavigationMenuLinkProps) => {
  return (
    <BaseNavigationMenu.Link
      ref={ref}
      className={mergeClassName(navigationMenuLinkVariants(), className)}
      {...props}
    />
  )
}

NavigationMenuLink.displayName = "NavigationMenuLink"

const NavigationMenuIcon = ({
  ref,
  className,
  children,
  ...props
}: NavigationMenuIconProps) => {
  return (
    <BaseNavigationMenu.Icon
      ref={ref}
      className={mergeClassName(navigationMenuIconVariants(), className)}
      {...props}
    >
      {children ?? <ChevronDown aria-hidden="true" size={14} />}
    </BaseNavigationMenu.Icon>
  )
}

NavigationMenuIcon.displayName = "NavigationMenuIcon"

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuViewport,
  NavigationMenuBackdrop,
  NavigationMenuPopup,
  NavigationMenuArrow,
  NavigationMenuLink,
  NavigationMenuIcon,
}
