/**
 * Sidebar.tsx
 *
 * Reference Sidebar block — composes Drawer, ScrollArea, and Button primitives.
 */

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
import type { SidebarNavItem, SidebarProps } from "./Sidebar.types"
import {
  sidebarBrandVariants,
  sidebarDesktopVariants,
  sidebarDrawerFooterVariants,
  sidebarMainVariants,
  sidebarMobileHeaderVariants,
  sidebarMobileTriggerVariants,
  sidebarNavItemVariants,
  sidebarNavListVariants,
  sidebarNavVariants,
  sidebarRootVariants,
} from "./Sidebar.variants"
import { cn } from "@/lib/utils"

interface SidebarNavListProps {
  items: SidebarNavItem[]
  closeOnSelect?: boolean
}

const SidebarNavLink = ({
  item,
  closeOnSelect,
}: {
  item: SidebarNavItem
  closeOnSelect: boolean
}) => {
  const className = sidebarNavItemVariants(item.active)

  if (item.href) {
    if (!closeOnSelect) {
      return (
        <a href={item.href} className={className}>
          {item.label}
        </a>
      )
    }

    return (
      <DrawerClose render={<a href={item.href} className={className} />}>
        {item.label}
      </DrawerClose>
    )
  }

  if (!closeOnSelect) {
    return (
      <button type="button" className={className} onClick={item.onSelect}>
        {item.label}
      </button>
    )
  }

  return (
    <DrawerClose
      render={
        <button type="button" className={className} onClick={item.onSelect} />
      }
    >
      {item.label}
    </DrawerClose>
  )
}

const SidebarNavList = ({
  items,
  closeOnSelect = false,
}: SidebarNavListProps) => {
  return (
    <nav aria-label="Application navigation">
      <ul className={sidebarNavListVariants()}>
        {items.map((item) => (
          <li key={item.id}>
            <SidebarNavLink item={item} closeOnSelect={closeOnSelect} />
          </li>
        ))}
      </ul>
    </nav>
  )
}

const Sidebar = ({
  ref,
  className,
  brand,
  items,
  mobileTriggerLabel = "Open navigation",
  mobileHeader,
}: SidebarProps) => {
  return (
    <aside ref={ref} className={cn(sidebarRootVariants(), className)}>
      <div className={sidebarDesktopVariants()}>
        {brand ? <div className={sidebarBrandVariants()}>{brand}</div> : null}
        <ScrollArea className={sidebarNavVariants()}>
          <ScrollAreaViewport>
            <ScrollAreaContent>
              <SidebarNavList items={items} />
            </ScrollAreaContent>
          </ScrollAreaViewport>
        </ScrollArea>
      </div>

      <div className={sidebarMobileTriggerVariants()}>
        <Drawer swipeDirection="left">
          <DrawerTrigger render={<Button variant="secondary" size="sm" />}>
            {mobileTriggerLabel}
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerBackdrop />
            <DrawerViewport side="left">
              <DrawerPopup side="left" size="sm">
                <DrawerClose aria-label="Close navigation" />
                <DrawerContent className={sidebarMainVariants()}>
                  <DrawerTitle className="sr-only">Navigation</DrawerTitle>
                  <DrawerDescription className="sr-only">
                    Application navigation links
                  </DrawerDescription>
                  {brand ? (
                    <div className={sidebarBrandVariants()}>{brand}</div>
                  ) : null}
                  <ScrollArea className={sidebarNavVariants()}>
                    <ScrollAreaViewport>
                      <ScrollAreaContent>
                        <SidebarNavList items={items} closeOnSelect />
                      </ScrollAreaContent>
                    </ScrollAreaViewport>
                  </ScrollArea>
                  <div className={sidebarDrawerFooterVariants()}>
                    <DrawerClose
                      render={<Button variant="secondary" size="sm" />}
                    >
                      Close
                    </DrawerClose>
                  </div>
                </DrawerContent>
              </DrawerPopup>
            </DrawerViewport>
          </DrawerPortal>
        </Drawer>
        {mobileHeader ? (
          <div className={sidebarMobileHeaderVariants()}>{mobileHeader}</div>
        ) : null}
      </div>
    </aside>
  )
}

Sidebar.displayName = "Sidebar"

export { Sidebar }
