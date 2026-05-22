import type { Ref } from "react"
/**
 * Tooltip.types.ts
 *
 * Public and internal types for Tooltip component.
 */

import type { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"

export type TooltipProps = BaseTooltip.Root.Props

export type TooltipTriggerProps = BaseTooltip.Trigger.Props & {
  ref?: Ref<HTMLButtonElement>
}

export type TooltipPortalProps = BaseTooltip.Portal.Props

export type TooltipPositionerProps = BaseTooltip.Positioner.Props

export type TooltipPopupProps = BaseTooltip.Popup.Props

export type TooltipArrowProps = BaseTooltip.Arrow.Props
