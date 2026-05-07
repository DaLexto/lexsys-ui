/**
 * Dialog.types.ts
 *
 * Public and internal types for Dialog component.
 */

import type { Dialog as BaseDialog } from "@base-ui/react/dialog"

export type DialogProps<Payload = unknown> = BaseDialog.Root.Props<Payload>

export interface DialogTriggerProps<Payload = unknown> extends Omit<
  BaseDialog.Trigger.Props<Payload>,
  "className"
> {
  className?: BaseDialog.Trigger.Props<Payload>["className"]
}

export type DialogPortalProps = BaseDialog.Portal.Props

export interface DialogBackdropProps extends Omit<
  BaseDialog.Backdrop.Props,
  "className"
> {
  className?: BaseDialog.Backdrop.Props["className"]
}

export interface DialogViewportProps extends Omit<
  BaseDialog.Viewport.Props,
  "className"
> {
  className?: BaseDialog.Viewport.Props["className"]
}

export interface DialogPopupProps extends Omit<
  BaseDialog.Popup.Props,
  "className"
> {
  className?: BaseDialog.Popup.Props["className"]
}

export interface DialogTitleProps extends Omit<
  BaseDialog.Title.Props,
  "className"
> {
  className?: BaseDialog.Title.Props["className"]
}

export interface DialogDescriptionProps extends Omit<
  BaseDialog.Description.Props,
  "className"
> {
  className?: BaseDialog.Description.Props["className"]
}

export interface DialogCloseProps extends Omit<
  BaseDialog.Close.Props,
  "className"
> {
  className?: BaseDialog.Close.Props["className"]
}
