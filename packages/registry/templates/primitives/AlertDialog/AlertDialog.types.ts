import type { Ref } from "react"
/**
 * AlertDialog.types.ts
 *
 * Public and internal types for AlertDialog component.
 */

import type { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog"

export type AlertDialogProps<Payload = unknown> =
  BaseAlertDialog.Root.Props<Payload>

export type AlertDialogTriggerProps<Payload = unknown> =
  BaseAlertDialog.Trigger.Props<Payload> & {
    ref?: Ref<HTMLButtonElement>
  }

export type AlertDialogPortalProps = BaseAlertDialog.Portal.Props

export type AlertDialogBackdropProps = BaseAlertDialog.Backdrop.Props

export type AlertDialogViewportProps = BaseAlertDialog.Viewport.Props

export type AlertDialogPopupProps = BaseAlertDialog.Popup.Props

export type AlertDialogTitleProps = BaseAlertDialog.Title.Props

export type AlertDialogDescriptionProps = BaseAlertDialog.Description.Props

export type AlertDialogCloseProps = BaseAlertDialog.Close.Props
