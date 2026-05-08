/**
 * Drawer.tsx
 *
 * Reference Drawer component implementation.
 */

import { forwardRef } from "react"
import { X } from "lucide-react"
import { Drawer as BaseDrawer } from "@base-ui/react/drawer"
import type {
  DrawerBackdropProps,
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerHandleIndicatorProps,
  DrawerIndentBackgroundProps,
  DrawerIndentProps,
  DrawerPopupProps,
  DrawerPortalProps,
  DrawerProps,
  DrawerProviderProps,
  DrawerSwipeAreaProps,
  DrawerTitleProps,
  DrawerTriggerProps,
  DrawerViewportProps,
} from "./Drawer.types"
import {
  drawerBackdropVariants,
  drawerCloseVariants,
  drawerContentVariants,
  drawerDescriptionVariants,
  drawerHandleVariants,
  drawerIndentBackgroundVariants,
  drawerIndentVariants,
  drawerPopupVariants,
  drawerSwipeAreaVariants,
  drawerTitleVariants,
  drawerTriggerVariants,
  drawerViewportVariants,
} from "./Drawer.variants"
import { cn } from "../../utils/cn"

const Drawer = <Payload = unknown,>(props: DrawerProps<Payload>) => {
  return <BaseDrawer.Root {...props} />
}

Drawer.displayName = "Drawer"

const DrawerProvider = (props: DrawerProviderProps) => {
  return <BaseDrawer.Provider {...props} />
}

DrawerProvider.displayName = "DrawerProvider"

const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ className, ...props }, ref) => {
    const triggerClassName: DrawerTriggerProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(drawerTriggerVariants(), userClassName)
    }

    return (
      <BaseDrawer.Trigger ref={ref} className={triggerClassName} {...props} />
    )
  },
)

DrawerTrigger.displayName = "DrawerTrigger"

const DrawerPortal = (props: DrawerPortalProps) => {
  return <BaseDrawer.Portal {...props} />
}

DrawerPortal.displayName = "DrawerPortal"

const DrawerIndentBackground = forwardRef<
  HTMLDivElement,
  DrawerIndentBackgroundProps
>(({ className, ...props }, ref) => {
  const backgroundClassName: DrawerIndentBackgroundProps["className"] = (
    state,
  ) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(drawerIndentBackgroundVariants(), userClassName)
  }

  return (
    <BaseDrawer.IndentBackground
      ref={ref}
      className={backgroundClassName}
      {...props}
    />
  )
})

DrawerIndentBackground.displayName = "DrawerIndentBackground"

const DrawerIndent = forwardRef<HTMLDivElement, DrawerIndentProps>(
  ({ className, ...props }, ref) => {
    const indentClassName: DrawerIndentProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(drawerIndentVariants(), userClassName)
    }

    return (
      <BaseDrawer.Indent ref={ref} className={indentClassName} {...props} />
    )
  },
)

DrawerIndent.displayName = "DrawerIndent"

const DrawerBackdrop = forwardRef<HTMLDivElement, DrawerBackdropProps>(
  ({ className, ...props }, ref) => {
    const backdropClassName: DrawerBackdropProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(drawerBackdropVariants(), userClassName)
    }

    return (
      <BaseDrawer.Backdrop ref={ref} className={backdropClassName} {...props} />
    )
  },
)

DrawerBackdrop.displayName = "DrawerBackdrop"

const DrawerViewport = forwardRef<HTMLDivElement, DrawerViewportProps>(
  ({ side, className, ...props }, ref) => {
    const viewportClassName: DrawerViewportProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(drawerViewportVariants({ side }), userClassName)
    }

    return (
      <BaseDrawer.Viewport ref={ref} className={viewportClassName} {...props} />
    )
  },
)

DrawerViewport.displayName = "DrawerViewport"

const DrawerPopup = forwardRef<HTMLDivElement, DrawerPopupProps>(
  ({ side, size, className, ...props }, ref) => {
    const popupClassName: DrawerPopupProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(drawerPopupVariants({ side, size }), userClassName)
    }

    return <BaseDrawer.Popup ref={ref} className={popupClassName} {...props} />
  },
)

DrawerPopup.displayName = "DrawerPopup"

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, ...props }, ref) => {
    const contentClassName: DrawerContentProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(drawerContentVariants(), userClassName)
    }

    return (
      <BaseDrawer.Content ref={ref} className={contentClassName} {...props} />
    )
  },
)

DrawerContent.displayName = "DrawerContent"

const DrawerHandleIndicator = ({
  className,
  ...props
}: DrawerHandleIndicatorProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn(drawerHandleVariants(), className)}
      {...props}
    />
  )
}

DrawerHandleIndicator.displayName = "DrawerHandleIndicator"

const DrawerSwipeArea = forwardRef<HTMLDivElement, DrawerSwipeAreaProps>(
  ({ side, className, ...props }, ref) => {
    const swipeAreaClassName: DrawerSwipeAreaProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(drawerSwipeAreaVariants({ side }), userClassName)
    }

    return (
      <BaseDrawer.SwipeArea
        ref={ref}
        className={swipeAreaClassName}
        {...props}
      />
    )
  },
)

DrawerSwipeArea.displayName = "DrawerSwipeArea"

const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, ...props }, ref) => {
    const titleClassName: DrawerTitleProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(drawerTitleVariants(), userClassName)
    }

    return <BaseDrawer.Title ref={ref} className={titleClassName} {...props} />
  },
)

DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => {
  const descriptionClassName: DrawerDescriptionProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(drawerDescriptionVariants(), userClassName)
  }

  return (
    <BaseDrawer.Description
      ref={ref}
      className={descriptionClassName}
      {...props}
    />
  )
})

DrawerDescription.displayName = "DrawerDescription"

const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ className, children, ...props }, ref) => {
    const closeClassName: DrawerCloseProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(drawerCloseVariants(), userClassName)
    }

    return (
      <BaseDrawer.Close ref={ref} className={closeClassName} {...props}>
        {children ?? <X aria-hidden="true" size={16} />}
      </BaseDrawer.Close>
    )
  },
)

DrawerClose.displayName = "DrawerClose"

export {
  Drawer,
  DrawerProvider,
  DrawerIndentBackground,
  DrawerIndent,
  DrawerTrigger,
  DrawerPortal,
  DrawerBackdrop,
  DrawerViewport,
  DrawerPopup,
  DrawerContent,
  DrawerHandleIndicator,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
}
