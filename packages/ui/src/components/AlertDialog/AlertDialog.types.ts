/**
 * AlertDialog.types.ts
 *
 * Public and internal types for AlertDialog component.
 */

import type { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog"

export type AlertDialogProps<Payload = unknown> =
  BaseAlertDialog.Root.Props<Payload>

export interface AlertDialogTriggerProps<Payload = unknown> extends Omit<
  BaseAlertDialog.Trigger.Props<Payload>,
  "className"
> {
  className?: BaseAlertDialog.Trigger.Props<Payload>["className"]
}

export type AlertDialogPortalProps = BaseAlertDialog.Portal.Props

export interface AlertDialogBackdropProps extends Omit<
  BaseAlertDialog.Backdrop.Props,
  "className"
> {
  className?: BaseAlertDialog.Backdrop.Props["className"]
}

export interface AlertDialogViewportProps extends Omit<
  BaseAlertDialog.Viewport.Props,
  "className"
> {
  className?: BaseAlertDialog.Viewport.Props["className"]
}

export interface AlertDialogPopupProps extends Omit<
  BaseAlertDialog.Popup.Props,
  "className"
> {
  className?: BaseAlertDialog.Popup.Props["className"]
}

export interface AlertDialogTitleProps extends Omit<
  BaseAlertDialog.Title.Props,
  "className"
> {
  className?: BaseAlertDialog.Title.Props["className"]
}

export interface AlertDialogDescriptionProps extends Omit<
  BaseAlertDialog.Description.Props,
  "className"
> {
  className?: BaseAlertDialog.Description.Props["className"]
}

export interface AlertDialogCloseProps extends Omit<
  BaseAlertDialog.Close.Props,
  "className"
> {
  className?: BaseAlertDialog.Close.Props["className"]
}
