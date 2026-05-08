/**
 * Menu.tsx
 *
 * Reference Menu component implementation.
 */

import { forwardRef } from "react"
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
import { cn } from "@/lib/utils"

const Menu = <Payload = unknown,>(props: MenuProps<Payload>) => {
  return <BaseMenu.Root {...props} />
}

Menu.displayName = "Menu"

const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ className, ...props }, ref) => {
    const triggerClassName: MenuTriggerProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuTriggerVariants(), userClassName)
    }

    return (
      <BaseMenu.Trigger ref={ref} className={triggerClassName} {...props} />
    )
  },
)

MenuTrigger.displayName = "MenuTrigger"

const MenuPortal = (props: MenuPortalProps) => {
  return <BaseMenu.Portal {...props} />
}

MenuPortal.displayName = "MenuPortal"

const MenuBackdrop = forwardRef<HTMLDivElement, MenuBackdropProps>(
  ({ className, ...props }, ref) => {
    const backdropClassName: MenuBackdropProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuBackdropVariants(), userClassName)
    }

    return (
      <BaseMenu.Backdrop ref={ref} className={backdropClassName} {...props} />
    )
  },
)

MenuBackdrop.displayName = "MenuBackdrop"

const MenuPositioner = forwardRef<HTMLDivElement, MenuPositionerProps>(
  ({ className, ...props }, ref) => {
    const positionerClassName: MenuPositionerProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuPositionerVariants(), userClassName)
    }

    return (
      <BaseMenu.Positioner
        ref={ref}
        className={positionerClassName}
        {...props}
      />
    )
  },
)

MenuPositioner.displayName = "MenuPositioner"

const MenuPopup = forwardRef<HTMLDivElement, MenuPopupProps>(
  ({ className, ...props }, ref) => {
    const popupClassName: MenuPopupProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuPopupVariants(), userClassName)
    }

    return <BaseMenu.Popup ref={ref} className={popupClassName} {...props} />
  },
)

MenuPopup.displayName = "MenuPopup"

const MenuArrow = forwardRef<HTMLDivElement, MenuArrowProps>(
  ({ className, ...props }, ref) => {
    const arrowClassName: MenuArrowProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuArrowVariants(), userClassName)
    }

    return <BaseMenu.Arrow ref={ref} className={arrowClassName} {...props} />
  },
)

MenuArrow.displayName = "MenuArrow"

const MenuViewport = forwardRef<HTMLDivElement, MenuViewportProps>(
  ({ className, ...props }, ref) => {
    const viewportClassName: MenuViewportProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuViewportVariants(), userClassName)
    }

    return (
      <BaseMenu.Viewport ref={ref} className={viewportClassName} {...props} />
    )
  },
)

MenuViewport.displayName = "MenuViewport"

const MenuItem = forwardRef<HTMLElement, MenuItemProps>(
  ({ className, ...props }, ref) => {
    const itemClassName: MenuItemProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuItemVariants(), userClassName)
    }

    return <BaseMenu.Item ref={ref} className={itemClassName} {...props} />
  },
)

MenuItem.displayName = "MenuItem"

const MenuLinkItem = forwardRef<Element, MenuLinkItemProps>(
  ({ className, ...props }, ref) => {
    const itemClassName: MenuLinkItemProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuItemVariants(), menuItemTextVariants(), userClassName)
    }

    return <BaseMenu.LinkItem ref={ref} className={itemClassName} {...props} />
  },
)

MenuLinkItem.displayName = "MenuLinkItem"

const MenuCheckboxItem = forwardRef<HTMLElement, MenuCheckboxItemProps>(
  ({ className, ...props }, ref) => {
    const itemClassName: MenuCheckboxItemProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuItemVariants(), userClassName)
    }

    return (
      <BaseMenu.CheckboxItem ref={ref} className={itemClassName} {...props} />
    )
  },
)

MenuCheckboxItem.displayName = "MenuCheckboxItem"

const MenuCheckboxItemIndicator = forwardRef<
  HTMLSpanElement,
  MenuCheckboxItemIndicatorProps
>(({ className, children, ...props }, ref) => {
  const indicatorClassName: MenuCheckboxItemIndicatorProps["className"] = (
    state,
  ) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(menuItemIndicatorVariants(), userClassName)
  }

  return (
    <BaseMenu.CheckboxItemIndicator
      ref={ref}
      className={indicatorClassName}
      {...props}
    >
      {children ?? <Check aria-hidden="true" size={14} />}
    </BaseMenu.CheckboxItemIndicator>
  )
})

MenuCheckboxItemIndicator.displayName = "MenuCheckboxItemIndicator"

const MenuRadioGroup = forwardRef<HTMLDivElement, MenuRadioGroupProps>(
  ({ className, ...props }, ref) => {
    const groupClassName: MenuRadioGroupProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuGroupVariants(), userClassName)
    }

    return (
      <BaseMenu.RadioGroup ref={ref} className={groupClassName} {...props} />
    )
  },
)

MenuRadioGroup.displayName = "MenuRadioGroup"

const MenuRadioItem = forwardRef<HTMLElement, MenuRadioItemProps>(
  ({ className, ...props }, ref) => {
    const itemClassName: MenuRadioItemProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuItemVariants(), userClassName)
    }

    return <BaseMenu.RadioItem ref={ref} className={itemClassName} {...props} />
  },
)

MenuRadioItem.displayName = "MenuRadioItem"

const MenuRadioItemIndicator = forwardRef<
  HTMLSpanElement,
  MenuRadioItemIndicatorProps
>(({ className, children, ...props }, ref) => {
  const indicatorClassName: MenuRadioItemIndicatorProps["className"] = (
    state,
  ) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(menuItemIndicatorVariants(), userClassName)
  }

  return (
    <BaseMenu.RadioItemIndicator
      ref={ref}
      className={indicatorClassName}
      {...props}
    >
      {children ?? <Check aria-hidden="true" size={14} />}
    </BaseMenu.RadioItemIndicator>
  )
})

MenuRadioItemIndicator.displayName = "MenuRadioItemIndicator"

const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ className, ...props }, ref) => {
    const groupClassName: MenuGroupProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuGroupVariants(), userClassName)
    }

    return <BaseMenu.Group ref={ref} className={groupClassName} {...props} />
  },
)

MenuGroup.displayName = "MenuGroup"

const MenuGroupLabel = forwardRef<HTMLDivElement, MenuGroupLabelProps>(
  ({ className, ...props }, ref) => {
    const labelClassName: MenuGroupLabelProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuGroupLabelVariants(), userClassName)
    }

    return (
      <BaseMenu.GroupLabel ref={ref} className={labelClassName} {...props} />
    )
  },
)

MenuGroupLabel.displayName = "MenuGroupLabel"

const MenuSeparator = forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className, ...props }, ref) => {
    const separatorClassName: MenuSeparatorProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuSeparatorVariants(), userClassName)
    }

    return (
      <BaseMenu.Separator ref={ref} className={separatorClassName} {...props} />
    )
  },
)

MenuSeparator.displayName = "MenuSeparator"

const MenuSubmenuRoot = (props: MenuSubmenuRootProps) => {
  return <BaseMenu.SubmenuRoot {...props} />
}

MenuSubmenuRoot.displayName = "MenuSubmenuRoot"

const MenuSubmenuTrigger = forwardRef<HTMLElement, MenuSubmenuTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const triggerClassName: MenuSubmenuTriggerProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(menuItemVariants(), userClassName)
    }

    return (
      <BaseMenu.SubmenuTrigger
        ref={ref}
        className={triggerClassName}
        {...props}
      >
        <span className={menuItemTextVariants()}>{children}</span>
        <span className={menuSubmenuTriggerIconVariants()}>
          <ChevronRight aria-hidden="true" size={14} />
        </span>
      </BaseMenu.SubmenuTrigger>
    )
  },
)

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
