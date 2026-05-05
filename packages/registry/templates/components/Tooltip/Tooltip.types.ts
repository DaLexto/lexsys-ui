/**
 * Tooltip.types.ts
 *
 * Public and internal types for Tooltip component.
 */

import type { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"

export type TooltipProps = BaseTooltip.Root.Props

export interface TooltipTriggerProps extends Omit<
  BaseTooltip.Trigger.Props,
  "className"
> {
  className?: BaseTooltip.Trigger.Props["className"]
}

export interface TooltipPositionerProps extends Omit<
  BaseTooltip.Positioner.Props,
  "className"
> {
  className?: BaseTooltip.Positioner.Props["className"]
}

export interface TooltipPopupProps extends Omit<
  BaseTooltip.Popup.Props,
  "className"
> {
  className?: BaseTooltip.Popup.Props["className"]
}

export interface TooltipArrowProps extends Omit<
  BaseTooltip.Arrow.Props,
  "className"
> {
  className?: BaseTooltip.Arrow.Props["className"]
}
