/**
 * Card.tsx
 *
 * Reference Card component implementation.
 */

import { forwardRef } from "react"
import type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
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

const Card = forwardRef<HTMLDivElement, CardProps>(
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

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
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

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3 ref={ref} className={cn(cardTitleClassName, className)} {...props} />
    )
  },
)

CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(cardDescriptionClassName, className)}
        {...props}
      />
    )
  },
)

CardDescription.displayName = "CardDescription"

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
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

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
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

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
