/**
 * Sidebar.tsx
 *
 * Reference Sidebar block — compound navigation shell with desktop and mobile drawer.
 */

import { createContext, useContext } from "react"
import { Button } from "../../primitives/Button/Button"
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "../../primitives/Drawer/Drawer"
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaViewport,
} from "../../primitives/ScrollArea/ScrollArea"
import type {
  SidebarContentProps,
  SidebarFooterProps,
  SidebarGroupContentProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarItemButtonProps,
  SidebarItemLinkProps,
  SidebarItemProps,
  SidebarListProps,
  SidebarMobileHeaderProps,
  SidebarProps,
  SidebarTriggerProps,
} from "./Sidebar.types"
import {
  sidebarBrandClasses,
  sidebarDesktopClasses,
  sidebarDrawerFooterClasses,
  sidebarFooterClasses,
  sidebarGroupContentClasses,
  sidebarGroupLabelClasses,
  sidebarGroupClasses,
  sidebarMainClasses,
  sidebarMobileHeaderClasses,
  sidebarNavItemClasses,
  sidebarNavListClasses,
  sidebarNavClasses,
  sidebarRootClasses,
} from "./Sidebar.variants"
import { cn } from "../../../utils/cn"

interface SidebarMobileContextValue {
  closeOnSelect: boolean
}

const SidebarMobileContext = createContext<SidebarMobileContextValue>({
  closeOnSelect: false,
})

const useSidebarMobileContext = () => useContext(SidebarMobileContext)

const Sidebar = ({ ref, className, children, ...props }: SidebarProps) => {
  const sidebarBody = (
    <SidebarMobileContext.Provider value={{ closeOnSelect: false }}>
      {children}
    </SidebarMobileContext.Provider>
  )

  const drawerBody = (
    <SidebarMobileContext.Provider value={{ closeOnSelect: true }}>
      {children}
      <div className={sidebarDrawerFooterClasses()}>
        <DrawerClose render={<Button variant="secondary" size="sm" />}>
          Close
        </DrawerClose>
      </div>
    </SidebarMobileContext.Provider>
  )

  return (
    <aside ref={ref} className={cn(sidebarRootClasses(), className)} {...props}>
      <Drawer swipeDirection="left">
        <div className={sidebarDesktopClasses()}>{sidebarBody}</div>
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerViewport side="left">
            <DrawerPopup side="left" size="sm">
              <DrawerClose aria-label="Close navigation" />
              <DrawerContent className={sidebarMainClasses()}>
                <DrawerTitle className="sr-only">Navigation</DrawerTitle>
                <DrawerDescription className="sr-only">
                  Application navigation links
                </DrawerDescription>
                {drawerBody}
              </DrawerContent>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </Drawer>
    </aside>
  )
}

Sidebar.displayName = "Sidebar"

const SidebarHeader = ({
  ref,
  className,
  children,
  ...props
}: SidebarHeaderProps) => {
  return (
    <div ref={ref} className={cn(sidebarBrandClasses(), className)} {...props}>
      {children}
    </div>
  )
}

SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = ({
  ref,
  className,
  children,
  ...props
}: SidebarContentProps) => {
  return (
    <ScrollArea className={sidebarNavClasses()}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <nav
            ref={ref}
            aria-label="Application navigation"
            className={className}
            {...props}
          >
            {children}
          </nav>
        </ScrollAreaContent>
      </ScrollAreaViewport>
    </ScrollArea>
  )
}

SidebarContent.displayName = "SidebarContent"

const SidebarFooter = ({
  ref,
  className,
  children,
  ...props
}: SidebarFooterProps) => {
  return (
    <div ref={ref} className={cn(sidebarFooterClasses(), className)} {...props}>
      {children}
    </div>
  )
}

SidebarFooter.displayName = "SidebarFooter"

const SidebarTrigger = ({
  ref,
  children = "Open navigation",
  variant = "secondary",
  size = "sm",
  className,
  ...props
}: SidebarTriggerProps) => {
  return (
    <DrawerTrigger
      render={
        <Button
          ref={ref}
          variant={variant}
          size={size}
          className={className}
          {...props}
        />
      }
    >
      {children}
    </DrawerTrigger>
  )
}

SidebarTrigger.displayName = "SidebarTrigger"

const SidebarMobileHeader = ({
  ref,
  className,
  children,
  ...props
}: SidebarMobileHeaderProps) => {
  return (
    <div
      ref={ref}
      className={cn(sidebarMobileHeaderClasses(), className)}
      {...props}
    >
      {children}
    </div>
  )
}

SidebarMobileHeader.displayName = "SidebarMobileHeader"

const SidebarGroup = ({
  ref,
  className,
  children,
  ...props
}: SidebarGroupProps) => {
  return (
    <div ref={ref} className={cn(sidebarGroupClasses(), className)} {...props}>
      {children}
    </div>
  )
}

SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = ({
  ref,
  className,
  children,
  ...props
}: SidebarGroupLabelProps) => {
  return (
    <div
      ref={ref}
      className={cn(sidebarGroupLabelClasses(), className)}
      {...props}
    >
      {children}
    </div>
  )
}

SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = ({
  ref,
  className,
  children,
  ...props
}: SidebarGroupContentProps) => {
  return (
    <div
      ref={ref}
      className={cn(sidebarGroupContentClasses(), className)}
      {...props}
    >
      {children}
    </div>
  )
}

SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarList = ({
  ref,
  className,
  children,
  ...props
}: SidebarListProps) => {
  return (
    <ul ref={ref} className={cn(sidebarNavListClasses(), className)} {...props}>
      {children}
    </ul>
  )
}

SidebarList.displayName = "SidebarList"

const SidebarItem = ({
  ref,
  className,
  children,
  ...props
}: SidebarItemProps) => {
  return (
    <li ref={ref} className={className} {...props}>
      {children}
    </li>
  )
}

SidebarItem.displayName = "SidebarItem"

const SidebarItemLink = ({
  ref,
  active,
  className,
  children,
  ...props
}: SidebarItemLinkProps) => {
  const { closeOnSelect } = useSidebarMobileContext()
  const linkClassName = cn(sidebarNavItemClasses(active), className)

  if (!closeOnSelect) {
    return (
      <a ref={ref} className={linkClassName} {...props}>
        {children}
      </a>
    )
  }

  return (
    <DrawerClose
      appearance="inline"
      render={<a ref={ref} className={linkClassName} {...props} />}
    >
      {children}
    </DrawerClose>
  )
}

SidebarItemLink.displayName = "SidebarItemLink"

const SidebarItemButton = ({
  ref,
  active,
  className,
  children,
  type = "button",
  ...props
}: SidebarItemButtonProps) => {
  const { closeOnSelect } = useSidebarMobileContext()
  const buttonClassName = cn(sidebarNavItemClasses(active), className)

  if (!closeOnSelect) {
    return (
      <button ref={ref} type={type} className={buttonClassName} {...props}>
        {children}
      </button>
    )
  }

  return (
    <DrawerClose
      appearance="inline"
      render={
        <button ref={ref} type={type} className={buttonClassName} {...props} />
      }
    >
      {children}
    </DrawerClose>
  )
}

SidebarItemButton.displayName = "SidebarItemButton"

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarList,
  SidebarItem,
  SidebarItemLink,
  SidebarItemButton,
  SidebarTrigger,
  SidebarMobileHeader,
}
