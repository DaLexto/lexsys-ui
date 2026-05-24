/**
 * Drawer.tsx
 *
 * Reference Drawer component implementation.
 */

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
  drawerCloseInlineVariants,
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
import { cn } from "../../../utils/cn"
import { mergeClassName } from "../../../utils/merge-class-name"

const Drawer = <Payload = unknown,>(props: DrawerProps<Payload>) => {
  return <BaseDrawer.Root {...props} />
}

Drawer.displayName = "Drawer"

const DrawerProvider = (props: DrawerProviderProps) => {
  return <BaseDrawer.Provider {...props} />
}

DrawerProvider.displayName = "DrawerProvider"

const DrawerTrigger = ({ ref, className, ...props }: DrawerTriggerProps) => {
  return (
    <BaseDrawer.Trigger
      ref={ref}
      className={mergeClassName(drawerTriggerVariants(), className)}
      {...props}
    />
  )
}

DrawerTrigger.displayName = "DrawerTrigger"

const DrawerPortal = (props: DrawerPortalProps) => {
  return <BaseDrawer.Portal {...props} />
}

DrawerPortal.displayName = "DrawerPortal"

const DrawerIndentBackground = ({
  ref,
  className,
  ...props
}: DrawerIndentBackgroundProps) => {
  return (
    <BaseDrawer.IndentBackground
      ref={ref}
      className={mergeClassName(drawerIndentBackgroundVariants(), className)}
      {...props}
    />
  )
}

DrawerIndentBackground.displayName = "DrawerIndentBackground"

const DrawerIndent = ({ ref, className, ...props }: DrawerIndentProps) => {
  return (
    <BaseDrawer.Indent
      ref={ref}
      className={mergeClassName(drawerIndentVariants(), className)}
      {...props}
    />
  )
}

DrawerIndent.displayName = "DrawerIndent"

const DrawerBackdrop = ({ ref, className, ...props }: DrawerBackdropProps) => {
  return (
    <BaseDrawer.Backdrop
      ref={ref}
      className={mergeClassName(drawerBackdropVariants(), className)}
      {...props}
    />
  )
}

DrawerBackdrop.displayName = "DrawerBackdrop"

const DrawerViewport = ({
  ref,
  side,
  className,
  ...props
}: DrawerViewportProps) => {
  return (
    <BaseDrawer.Viewport
      ref={ref}
      className={mergeClassName(drawerViewportVariants({ side }), className)}
      {...props}
    />
  )
}

DrawerViewport.displayName = "DrawerViewport"

const DrawerPopup = ({
  ref,
  side,
  size,
  className,
  ...props
}: DrawerPopupProps) => {
  return (
    <BaseDrawer.Popup
      ref={ref}
      className={mergeClassName(drawerPopupVariants({ side, size }), className)}
      {...props}
    />
  )
}

DrawerPopup.displayName = "DrawerPopup"

const DrawerContent = ({ ref, className, ...props }: DrawerContentProps) => {
  return (
    <BaseDrawer.Content
      ref={ref}
      className={mergeClassName(drawerContentVariants(), className)}
      {...props}
    />
  )
}

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

const DrawerSwipeArea = ({
  ref,
  side,
  className,
  ...props
}: DrawerSwipeAreaProps) => {
  return (
    <BaseDrawer.SwipeArea
      ref={ref}
      className={mergeClassName(drawerSwipeAreaVariants({ side }), className)}
      {...props}
    />
  )
}

DrawerSwipeArea.displayName = "DrawerSwipeArea"

const DrawerTitle = ({ ref, className, ...props }: DrawerTitleProps) => {
  return (
    <BaseDrawer.Title
      ref={ref}
      className={mergeClassName(drawerTitleVariants(), className)}
      {...props}
    />
  )
}

DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = ({
  ref,
  className,
  ...props
}: DrawerDescriptionProps) => {
  return (
    <BaseDrawer.Description
      ref={ref}
      className={mergeClassName(drawerDescriptionVariants(), className)}
      {...props}
    />
  )
}

DrawerDescription.displayName = "DrawerDescription"

const DrawerClose = ({
  ref,
  appearance = "icon",
  className,
  children,
  ...props
}: DrawerCloseProps) => {
  return (
    <BaseDrawer.Close
      ref={ref}
      className={mergeClassName(
        appearance === "inline"
          ? drawerCloseInlineVariants()
          : drawerCloseVariants(),
        className,
      )}
      {...props}
    >
      {children ??
        (appearance === "icon" ? <X aria-hidden="true" size={16} /> : null)}
    </BaseDrawer.Close>
  )
}

DrawerClose.displayName = "DrawerClose"

const createDrawerHandle = BaseDrawer.createHandle

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
  createDrawerHandle,
}
