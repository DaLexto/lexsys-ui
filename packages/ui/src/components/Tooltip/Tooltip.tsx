/**
 * Tooltip.tsx
 *
 * Reference Tooltip component implementation.
 */

import { forwardRef } from "react"
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
import { cn } from "../../utils/cn"

const Tooltip = (props: TooltipProps) => {
  return <BaseTooltip.Root {...props} />
}

Tooltip.displayName = "Tooltip"

const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ className, ...props }, ref) => {
    const triggerClassName: TooltipTriggerProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(tooltipTriggerVariants(), userClassName)
    }

    return (
      <BaseTooltip.Trigger ref={ref} className={triggerClassName} {...props} />
    )
  },
)

TooltipTrigger.displayName = "TooltipTrigger"

const TooltipPortal = (props: TooltipPortalProps) => {
  return <BaseTooltip.Portal {...props} />
}

TooltipPortal.displayName = "TooltipPortal"

const TooltipPositioner = forwardRef<HTMLDivElement, TooltipPositionerProps>(
  ({ className, ...props }, ref) => {
    const positionerClassName: TooltipPositionerProps["className"] = (
      state,
    ) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(tooltipPositionerVariants(), userClassName)
    }

    return (
      <BaseTooltip.Positioner
        ref={ref}
        className={positionerClassName}
        {...props}
      />
    )
  },
)

TooltipPositioner.displayName = "TooltipPositioner"

const TooltipPopup = forwardRef<HTMLDivElement, TooltipPopupProps>(
  ({ className, ...props }, ref) => {
    const popupClassName: TooltipPopupProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(tooltipPopupVariants(), userClassName)
    }

    return <BaseTooltip.Popup ref={ref} className={popupClassName} {...props} />
  },
)

TooltipPopup.displayName = "TooltipPopup"

const TooltipArrow = forwardRef<HTMLDivElement, TooltipArrowProps>(
  ({ className, ...props }, ref) => {
    const arrowClassName: TooltipArrowProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(tooltipArrowVariants(), userClassName)
    }

    return <BaseTooltip.Arrow ref={ref} className={arrowClassName} {...props} />
  },
)

TooltipArrow.displayName = "TooltipArrow"

export {
  Tooltip,
  TooltipTrigger,
  TooltipPortal,
  TooltipPositioner,
  TooltipPopup,
  TooltipArrow,
}
