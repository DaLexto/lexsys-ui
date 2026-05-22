/**
 * Tooltip.tsx
 *
 * Reference Tooltip component implementation.
 */

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
import type {
  TooltipArrowProps,
  TooltipPopupProps,
  TooltipPositionerProps,
  TooltipPortalProps,
  TooltipProps,
  TooltipTriggerProps,
} from "./Tooltip.types"
import {
  tooltipArrowVariants,
  tooltipPopupVariants,
  tooltipPositionerVariants,
  tooltipTriggerVariants,
} from "./Tooltip.variants"
import { mergeClassName } from "../../utils/merge-class-name"

const Tooltip = (props: TooltipProps) => {
  return <BaseTooltip.Root {...props} />
}

Tooltip.displayName = "Tooltip"

const TooltipTrigger = ({ ref, className, ...props }: TooltipTriggerProps) => {
  return (
    <BaseTooltip.Trigger
      ref={ref}
      className={mergeClassName(tooltipTriggerVariants(), className)}
      {...props}
    />
  )
}

TooltipTrigger.displayName = "TooltipTrigger"

const TooltipPortal = (props: TooltipPortalProps) => {
  return <BaseTooltip.Portal {...props} />
}

TooltipPortal.displayName = "TooltipPortal"

const TooltipPositioner = ({
  ref,
  className,
  ...props
}: TooltipPositionerProps) => {
  return (
    <BaseTooltip.Positioner
      ref={ref}
      className={mergeClassName(tooltipPositionerVariants(), className)}
      {...props}
    />
  )
}

TooltipPositioner.displayName = "TooltipPositioner"

const TooltipPopup = ({ ref, className, ...props }: TooltipPopupProps) => {
  return (
    <BaseTooltip.Popup
      ref={ref}
      className={mergeClassName(tooltipPopupVariants(), className)}
      {...props}
    />
  )
}

TooltipPopup.displayName = "TooltipPopup"

const TooltipArrow = ({ ref, className, ...props }: TooltipArrowProps) => {
  return (
    <BaseTooltip.Arrow
      ref={ref}
      className={mergeClassName(tooltipArrowVariants(), className)}
      {...props}
    />
  )
}

TooltipArrow.displayName = "TooltipArrow"

export {
  Tooltip,
  TooltipTrigger,
  TooltipPortal,
  TooltipPositioner,
  TooltipPopup,
  TooltipArrow,
}
