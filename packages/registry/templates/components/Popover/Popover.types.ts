/**
 * Popover.types.ts
 *
 * Public and internal types for Popover component.
 */

import type { Popover as BasePopover } from "@base-ui/react/popover"

export type PopoverProps<Payload = unknown> = BasePopover.Root.Props<Payload>

export interface PopoverTriggerProps<Payload = unknown> extends Omit<
  BasePopover.Trigger.Props<Payload>,
  "className"
> {
  className?: BasePopover.Trigger.Props<Payload>["className"]
}

export type PopoverPortalProps = BasePopover.Portal.Props

export interface PopoverBackdropProps extends Omit<
  BasePopover.Backdrop.Props,
  "className"
> {
  className?: BasePopover.Backdrop.Props["className"]
}

export interface PopoverPositionerProps extends Omit<
  BasePopover.Positioner.Props,
  "className"
> {
  className?: BasePopover.Positioner.Props["className"]
}

export interface PopoverPopupProps extends Omit<
  BasePopover.Popup.Props,
  "className"
> {
  className?: BasePopover.Popup.Props["className"]
}

export interface PopoverArrowProps extends Omit<
  BasePopover.Arrow.Props,
  "className"
> {
  className?: BasePopover.Arrow.Props["className"]
}

export interface PopoverTitleProps extends Omit<
  BasePopover.Title.Props,
  "className"
> {
  className?: BasePopover.Title.Props["className"]
}

export interface PopoverDescriptionProps extends Omit<
  BasePopover.Description.Props,
  "className"
> {
  className?: BasePopover.Description.Props["className"]
}

export interface PopoverCloseProps extends Omit<
  BasePopover.Close.Props,
  "className"
> {
  className?: BasePopover.Close.Props["className"]
}

export interface PopoverViewportProps extends Omit<
  BasePopover.Viewport.Props,
  "className"
> {
  className?: BasePopover.Viewport.Props["className"]
}
