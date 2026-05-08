/**
 * Toast.types.ts
 *
 * Public and internal types for Toast component.
 */

import type { Toast as BaseToast } from "@base-ui/react/toast"

export type ToastPlacement =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"

export type ToastProviderProps = BaseToast.Provider.Props
export type ToastPortalProps = BaseToast.Portal.Props
export type ToastObject<Data extends object = object> =
  BaseToast.Root.ToastObject<Data>

export interface ToastProps extends Omit<BaseToast.Root.Props, "className"> {
  className?: BaseToast.Root.Props["className"]
}

export interface ToastViewportProps extends Omit<
  BaseToast.Viewport.Props,
  "className"
> {
  placement?: ToastPlacement
  className?: BaseToast.Viewport.Props["className"]
}

export interface ToastPositionerProps extends Omit<
  BaseToast.Positioner.Props,
  "className"
> {
  className?: BaseToast.Positioner.Props["className"]
}

export interface ToastContentProps extends Omit<
  BaseToast.Content.Props,
  "className"
> {
  className?: BaseToast.Content.Props["className"]
}

export interface ToastArrowProps extends Omit<
  BaseToast.Arrow.Props,
  "className"
> {
  className?: BaseToast.Arrow.Props["className"]
}

export interface ToastTitleProps extends Omit<
  BaseToast.Title.Props,
  "className"
> {
  className?: BaseToast.Title.Props["className"]
}

export interface ToastDescriptionProps extends Omit<
  BaseToast.Description.Props,
  "className"
> {
  className?: BaseToast.Description.Props["className"]
}

export interface ToastActionProps extends Omit<
  BaseToast.Action.Props,
  "className"
> {
  className?: BaseToast.Action.Props["className"]
}

export interface ToastCloseProps extends Omit<
  BaseToast.Close.Props,
  "className"
> {
  className?: BaseToast.Close.Props["className"]
}
