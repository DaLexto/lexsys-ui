/**
 * Empty.tsx
 *
 * Reference Empty block implementation.
 * Used for zero-data surfaces: no results, no items, unauthenticated views.
 */

import { cn } from "@/lib/utils"
import type {
  EmptyContentProps,
  EmptyDescriptionProps,
  EmptyHeaderProps,
  EmptyMediaProps,
  EmptyProps,
  EmptyTitleProps,
} from "./Empty.types"
import {
  emptyClasses,
  emptyContentClasses,
  emptyDescriptionClasses,
  emptyHeaderClasses,
  emptyMediaClasses,
  emptyTitleClasses,
} from "./Empty.variants"

const Empty = ({ ref, className, ...props }: EmptyProps) => {
  return <div ref={ref} className={cn(emptyClasses(), className)} {...props} />
}

Empty.displayName = "Empty"

const EmptyHeader = ({ ref, className, ...props }: EmptyHeaderProps) => {
  return (
    <div ref={ref} className={cn(emptyHeaderClasses(), className)} {...props} />
  )
}

EmptyHeader.displayName = "EmptyHeader"

const EmptyMedia = ({ ref, className, ...props }: EmptyMediaProps) => {
  return (
    <div ref={ref} className={cn(emptyMediaClasses(), className)} {...props} />
  )
}

EmptyMedia.displayName = "EmptyMedia"

const EmptyTitle = ({ ref, className, ...props }: EmptyTitleProps) => {
  return (
    <h3 ref={ref} className={cn(emptyTitleClasses(), className)} {...props} />
  )
}

EmptyTitle.displayName = "EmptyTitle"

const EmptyDescription = ({
  ref,
  className,
  ...props
}: EmptyDescriptionProps) => {
  return (
    <p
      ref={ref}
      className={cn(emptyDescriptionClasses(), className)}
      {...props}
    />
  )
}

EmptyDescription.displayName = "EmptyDescription"

const EmptyContent = ({ ref, className, ...props }: EmptyContentProps) => {
  return (
    <div
      ref={ref}
      className={cn(emptyContentClasses(), className)}
      {...props}
    />
  )
}

EmptyContent.displayName = "EmptyContent"

export {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
}
