import type { Ref } from "react"
/**
 * Drawer.types.ts
 *
 * Public and internal types for Drawer component.
 */

import type { HTMLAttributes } from "react"
import type { Drawer as BaseDrawer } from "@base-ui/react/drawer"

export type DrawerSide = "bottom" | "top" | "right" | "left"
export type DrawerSize = "sm" | "md" | "lg" | "full"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawerProps<Payload = unknown> extends BaseDrawer.Root
  .Props<Payload> {}
export type DrawerProviderProps = BaseDrawer.Provider.Props
export type DrawerPortalProps = BaseDrawer.Portal.Props
export type DrawerHandle<Payload = unknown> = BaseDrawer.Handle<Payload>

export type DrawerTriggerProps<Payload = unknown> =
  BaseDrawer.Trigger.Props<Payload> & {
    ref?: Ref<HTMLButtonElement>
  }

export type DrawerIndentBackgroundProps = BaseDrawer.IndentBackground.Props

export type DrawerIndentProps = BaseDrawer.Indent.Props

export type DrawerBackdropProps = BaseDrawer.Backdrop.Props

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

export type DrawerDescriptionProps = BaseDrawer.Description.Props

export type DrawerCloseAppearance = "icon" | "inline"

export interface DrawerCloseProps extends BaseDrawer.Close.Props {
  appearance?: DrawerCloseAppearance
}
