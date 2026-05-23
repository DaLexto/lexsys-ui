import type { Ref } from "react"
/**
 * Dialog.types.ts
 *
 * Public and internal types for Dialog component.
 */

import type { Dialog as BaseDialog } from "@base-ui/react/dialog"

export type DialogProps<Payload = unknown> = BaseDialog.Root.Props<Payload>

export type DialogTriggerProps<Payload = unknown> =
  BaseDialog.Trigger.Props<Payload> & {
    ref?: Ref<HTMLButtonElement>
  }

export type DialogPortalProps = BaseDialog.Portal.Props

export type DialogBackdropProps = BaseDialog.Backdrop.Props

export type DialogViewportProps = BaseDialog.Viewport.Props

export type DialogPopupProps = BaseDialog.Popup.Props

export type DialogTitleProps = BaseDialog.Title.Props

export type DialogDescriptionProps = BaseDialog.Description.Props

export type DialogCloseProps = BaseDialog.Close.Props
