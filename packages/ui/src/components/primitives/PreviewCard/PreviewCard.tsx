/**
 * PreviewCard.tsx
 *
 * Reference PreviewCard component implementation.
 */

import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card"
import type {
  PreviewCardArrowProps,
  PreviewCardBackdropProps,
  PreviewCardPopupProps,
  PreviewCardPortalProps,
  PreviewCardPositionerProps,
  PreviewCardProps,
  PreviewCardTriggerProps,
  PreviewCardViewportProps,
} from "./PreviewCard.types"
import {
  previewCardArrowVariants,
  previewCardBackdropVariants,
  previewCardPopupVariants,
  previewCardPositionerVariants,
  previewCardTriggerVariants,
  previewCardViewportVariants,
} from "./PreviewCard.variants"
import { mergeClassName } from "../../../utils/merge-class-name"
import { overlayPositionerSideOffset } from "../../../utils/cn"

const PreviewCard = <Payload = unknown,>(
  props: PreviewCardProps<Payload>,
) => {
  return <BasePreviewCard.Root {...props} />
}

PreviewCard.displayName = "PreviewCard"

const PreviewCardTrigger = <Payload = unknown,>({
  ref,
  className,
  ...props
}: PreviewCardTriggerProps<Payload>) => {
  return (
    <BasePreviewCard.Trigger
      ref={ref}
      className={mergeClassName(previewCardTriggerVariants(), className)}
      {...props}
    />
  )
}

PreviewCardTrigger.displayName = "PreviewCardTrigger"

const PreviewCardPortal = (props: PreviewCardPortalProps) => {
  return <BasePreviewCard.Portal {...props} />
}

PreviewCardPortal.displayName = "PreviewCardPortal"

const PreviewCardPositioner = ({
  ref,
  className,
  sideOffset = overlayPositionerSideOffset,
  ...props
}: PreviewCardPositionerProps) => {
  return (
    <BasePreviewCard.Positioner
      ref={ref}
      sideOffset={sideOffset}
      className={mergeClassName(previewCardPositionerVariants(), className)}
      {...props}
    />
  )
}

PreviewCardPositioner.displayName = "PreviewCardPositioner"

const PreviewCardPopup = ({ ref, className, ...props }: PreviewCardPopupProps) => {
  return (
    <BasePreviewCard.Popup
      ref={ref}
      className={mergeClassName(previewCardPopupVariants(), className)}
      {...props}
    />
  )
}

PreviewCardPopup.displayName = "PreviewCardPopup"

const PreviewCardArrow = ({ ref, className, ...props }: PreviewCardArrowProps) => {
  return (
    <BasePreviewCard.Arrow
      ref={ref}
      className={mergeClassName(previewCardArrowVariants(), className)}
      {...props}
    />
  )
}

PreviewCardArrow.displayName = "PreviewCardArrow"

const PreviewCardBackdrop = ({
  ref,
  className,
  ...props
}: PreviewCardBackdropProps) => {
  return (
    <BasePreviewCard.Backdrop
      ref={ref}
      className={mergeClassName(previewCardBackdropVariants(), className)}
      {...props}
    />
  )
}

PreviewCardBackdrop.displayName = "PreviewCardBackdrop"

const PreviewCardViewport = ({
  ref,
  className,
  ...props
}: PreviewCardViewportProps) => {
  return (
    <BasePreviewCard.Viewport
      ref={ref}
      className={mergeClassName(previewCardViewportVariants(), className)}
      {...props}
    />
  )
}

PreviewCardViewport.displayName = "PreviewCardViewport"

const createPreviewCardHandle = BasePreviewCard.createHandle

export {
  PreviewCard,
  PreviewCardTrigger,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardPopup,
  PreviewCardArrow,
  PreviewCardBackdrop,
  PreviewCardViewport,
  createPreviewCardHandle,
}

export type { PreviewCardHandle } from "./PreviewCard.types"
