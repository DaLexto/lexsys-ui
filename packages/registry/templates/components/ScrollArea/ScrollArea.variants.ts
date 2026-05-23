/**
 * ScrollArea.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const scrollAreaRootVariants = cva("relative overflow-hidden")

export const scrollAreaViewportVariants = cva(
  "size-full rounded-[inherit] outline-none",
)

export const scrollAreaContentVariants = cva("")

export const scrollAreaScrollbarVariants = cva(
  "flex touch-none select-none transition-colors",
  {
    variants: {
      orientation: {
        vertical:
          "h-full w-(--nx-scroll-area-scrollbar-size) border-l border-l-transparent p-(--nx-scroll-area-scrollbar-padding)",
        horizontal:
          "h-(--nx-scroll-area-scrollbar-size) flex-col border-t border-t-transparent p-(--nx-scroll-area-scrollbar-padding)",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
)

export const scrollAreaThumbVariants = cva(
  "relative flex-1 rounded-(--nx-scroll-area-thumb-radius) bg-(--nx-scroll-area-thumb-background)",
)

export const scrollAreaCornerVariants = cva("bg-transparent")
