/**
 * Card.tsx
 *
 * Reference Card component implementation.
 */

import { forwardRef } from "react"
import type {
  CardDescriptionProps,
  CardProps,
  CardSectionProps,
  CardTitleProps,
} from "./Card.types"
import {
  cardContentClassName,
  cardDescriptionClassName,
  cardFooterClassName,
  cardHeaderClassName,
  cardTitleClassName,
  cardVariants,
} from "./Card.variants"
import { cn } from "../../utils/cn"

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant }), className)}
        {...props}
      />
    )
  },
)

Card.displayName = "Card"

export const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardHeaderClassName, className)}
        {...props}
      />
    )
  },
)

CardHeader.displayName = "CardHeader"

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3 ref={ref} className={cn(cardTitleClassName, className)} {...props} />
    )
  },
)

CardTitle.displayName = "CardTitle"

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(cardDescriptionClassName, className)}
      {...props}
    />
  )
})

CardDescription.displayName = "CardDescription"

export const CardContent = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardContentClassName, className)}
        {...props}
      />
    )
  },
)

CardContent.displayName = "CardContent"

export const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardFooterClassName, className)}
        {...props}
      />
    )
  },
)

CardFooter.displayName = "CardFooter"
