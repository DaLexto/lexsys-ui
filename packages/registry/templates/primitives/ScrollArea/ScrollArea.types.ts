import type { Ref } from "react"
/**
 * ScrollArea.types.ts
 *
 * Public and internal types for ScrollArea component.
 */

import type { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area"

export type ScrollAreaProps = BaseScrollArea.Root.Props & {
  ref?: Ref<HTMLDivElement>
}

export type ScrollAreaViewportProps = BaseScrollArea.Viewport.Props & {
  ref?: Ref<HTMLDivElement>
}

export type ScrollAreaContentProps = BaseScrollArea.Content.Props & {
  ref?: Ref<HTMLDivElement>
}

export type ScrollAreaScrollbarProps = BaseScrollArea.Scrollbar.Props & {
  ref?: Ref<HTMLDivElement>
}

export type ScrollBarProps = ScrollAreaScrollbarProps

export type ScrollAreaThumbProps = BaseScrollArea.Thumb.Props & {
  ref?: Ref<HTMLDivElement>
}

export type ScrollAreaCornerProps = BaseScrollArea.Corner.Props & {
  ref?: Ref<HTMLDivElement>
}
