import type { Ref } from "react"
/**
 * PreviewCard.types.ts
 *
 * Public and internal types for PreviewCard component.
 */

import type { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card"

export type PreviewCardProps<Payload = unknown> =
  BasePreviewCard.Root.Props<Payload>

export type PreviewCardTriggerProps<Payload = unknown> =
  BasePreviewCard.Trigger.Props<Payload> & {
    ref?: Ref<HTMLElement>
  }

export type PreviewCardPortalProps = BasePreviewCard.Portal.Props

export type PreviewCardPositionerProps = BasePreviewCard.Positioner.Props & {
  ref?: Ref<HTMLDivElement>
}

export type PreviewCardPopupProps = BasePreviewCard.Popup.Props & {
  ref?: Ref<HTMLDivElement>
}

export type PreviewCardArrowProps = BasePreviewCard.Arrow.Props & {
  ref?: Ref<HTMLDivElement>
}

export type PreviewCardBackdropProps = BasePreviewCard.Backdrop.Props & {
  ref?: Ref<HTMLDivElement>
}

export type PreviewCardViewportProps = BasePreviewCard.Viewport.Props & {
  ref?: Ref<HTMLDivElement>
}

export type PreviewCardHandle<Payload = unknown> = ReturnType<
  typeof BasePreviewCard.createHandle<Payload>
>
