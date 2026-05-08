/**
 * Drawer.types.ts
 *
 * Public and internal types for Drawer component.
 */

import type { HTMLAttributes } from "react"
import type { Drawer as BaseDrawer } from "@base-ui/react/drawer"

export type DrawerSide = "bottom" | "top" | "right" | "left"
export type DrawerSize = "sm" | "md" | "lg" | "full"

export type DrawerProps<Payload = unknown> = BaseDrawer.Root.Props<Payload>
export type DrawerProviderProps = BaseDrawer.Provider.Props
export type DrawerPortalProps = BaseDrawer.Portal.Props
export type DrawerHandle<Payload = unknown> = BaseDrawer.Handle<Payload>

export interface DrawerTriggerProps<Payload = unknown> extends Omit<
  BaseDrawer.Trigger.Props<Payload>,
  "className"
> {
  className?: BaseDrawer.Trigger.Props<Payload>["className"]
}

export interface DrawerIndentBackgroundProps extends Omit<
  BaseDrawer.IndentBackground.Props,
  "className"
> {
  className?: BaseDrawer.IndentBackground.Props["className"]
}

export interface DrawerIndentProps extends Omit<
  BaseDrawer.Indent.Props,
  "className"
> {
  className?: BaseDrawer.Indent.Props["className"]
}

export interface DrawerBackdropProps extends Omit<
  BaseDrawer.Backdrop.Props,
  "className"
> {
  className?: BaseDrawer.Backdrop.Props["className"]
}

export interface DrawerViewportProps extends Omit<
  BaseDrawer.Viewport.Props,
  "className"
> {
  side?: DrawerSide
  className?: BaseDrawer.Viewport.Props["className"]
}

export interface DrawerPopupProps extends Omit<
  BaseDrawer.Popup.Props,
  "className" | "size"
> {
  side?: DrawerSide
  size?: DrawerSize
  className?: BaseDrawer.Popup.Props["className"]
}

export interface DrawerContentProps extends Omit<
  BaseDrawer.Content.Props,
  "className"
> {
  className?: BaseDrawer.Content.Props["className"]
}

export type DrawerHandleIndicatorProps = HTMLAttributes<HTMLDivElement>

export interface DrawerSwipeAreaProps extends Omit<
  BaseDrawer.SwipeArea.Props,
  "className"
> {
  side?: DrawerSide
  className?: BaseDrawer.SwipeArea.Props["className"]
}

export interface DrawerTitleProps extends Omit<
  BaseDrawer.Title.Props,
  "className"
> {
  className?: BaseDrawer.Title.Props["className"]
}

export interface DrawerDescriptionProps extends Omit<
  BaseDrawer.Description.Props,
  "className"
> {
  className?: BaseDrawer.Description.Props["className"]
}

export interface DrawerCloseProps extends Omit<
  BaseDrawer.Close.Props,
  "className"
> {
  className?: BaseDrawer.Close.Props["className"]
}
