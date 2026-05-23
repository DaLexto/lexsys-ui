import type { Ref } from "react"
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
export type ToastPortalProps = BaseToast.Portal.Props & {
  ref?: Ref<HTMLDivElement>
}
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

export type ToastContentProps = BaseToast.Content.Props

export type ToastArrowProps = BaseToast.Arrow.Props

export type ToastTitleProps = BaseToast.Title.Props

export type ToastDescriptionProps = BaseToast.Description.Props

export type ToastActionProps = BaseToast.Action.Props

export type ToastCloseProps = BaseToast.Close.Props
