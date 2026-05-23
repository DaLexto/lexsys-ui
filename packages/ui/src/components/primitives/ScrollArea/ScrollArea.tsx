/**
 * ScrollArea.tsx
 *
 * Reference ScrollArea component implementation.
 */

import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area"
import type {
  ScrollAreaContentProps,
  ScrollAreaCornerProps,
  ScrollAreaProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaViewportProps,
} from "./ScrollArea.types"
import {
  scrollAreaContentVariants,
  scrollAreaCornerVariants,
  scrollAreaRootVariants,
  scrollAreaScrollbarVariants,
  scrollAreaThumbVariants,
  scrollAreaViewportVariants,
} from "./ScrollArea.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

const ScrollArea = ({ ref, className, ...props }: ScrollAreaProps) => {
  return (
    <BaseScrollArea.Root
      ref={ref}
      className={mergeClassName(scrollAreaRootVariants(), className)}
      {...props}
    />
  )
}

ScrollArea.displayName = "ScrollArea"

const ScrollAreaViewport = ({
  ref,
  className,
  ...props
}: ScrollAreaViewportProps) => {
  return (
    <BaseScrollArea.Viewport
      ref={ref}
      className={mergeClassName(scrollAreaViewportVariants(), className)}
      {...props}
    />
  )
}

ScrollAreaViewport.displayName = "ScrollAreaViewport"

const ScrollAreaContent = ({
  ref,
  className,
  ...props
}: ScrollAreaContentProps) => {
  return (
    <BaseScrollArea.Content
      ref={ref}
      className={mergeClassName(scrollAreaContentVariants(), className)}
      {...props}
    />
  )
}

ScrollAreaContent.displayName = "ScrollAreaContent"

const ScrollAreaScrollbar = ({
  ref,
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaScrollbarProps) => {
  return (
    <BaseScrollArea.Scrollbar
      ref={ref}
      orientation={orientation}
      className={mergeClassName(
        scrollAreaScrollbarVariants({ orientation }),
        className,
      )}
      {...props}
    />
  )
}

ScrollAreaScrollbar.displayName = "ScrollAreaScrollbar"

const ScrollBar = ScrollAreaScrollbar

ScrollBar.displayName = "ScrollBar"

const ScrollAreaThumb = ({
  ref,
  className,
  ...props
}: ScrollAreaThumbProps) => {
  return (
    <BaseScrollArea.Thumb
      ref={ref}
      className={mergeClassName(scrollAreaThumbVariants(), className)}
      {...props}
    />
  )
}

ScrollAreaThumb.displayName = "ScrollAreaThumb"

const ScrollAreaCorner = ({
  ref,
  className,
  ...props
}: ScrollAreaCornerProps) => {
  return (
    <BaseScrollArea.Corner
      ref={ref}
      className={mergeClassName(scrollAreaCornerVariants(), className)}
      {...props}
    />
  )
}

ScrollAreaCorner.displayName = "ScrollAreaCorner"

export {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollBar,
  ScrollAreaThumb,
  ScrollAreaCorner,
}
