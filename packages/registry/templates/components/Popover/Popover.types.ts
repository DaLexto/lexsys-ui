import type { Ref } from "react"
/**
 * Popover.types.ts
 *
 * Public and internal types for Popover component.
 */

import type { Popover as BasePopover } from "@base-ui/react/popover"

export type PopoverProps<Payload = unknown> = BasePopover.Root.Props<Payload>

export type PopoverTriggerProps<Payload = unknown> =
  BasePopover.Trigger.Props<Payload> & {
    ref?: Ref<HTMLButtonElement>
  }

export type PopoverPortalProps = BasePopover.Portal.Props & {
  ref?: Ref<HTMLDivElement>
}

export type PopoverBackdropProps = BasePopover.Backdrop.Props

export type PopoverPositionerProps = BasePopover.Positioner.Props

export type PopoverPopupProps = BasePopover.Popup.Props

export type PopoverArrowProps = BasePopover.Arrow.Props

export type PopoverTitleProps = BasePopover.Title.Props

export type PopoverDescriptionProps = BasePopover.Description.Props

export type PopoverCloseProps = BasePopover.Close.Props

export type PopoverViewportProps = BasePopover.Viewport.Props
