/**
 * Card.tsx
 *
 * Reference Card component implementation.
 */

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

const Card = ({ ref, variant, className, ...props }: CardProps) => {
  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

Card.displayName = "Card"

const CardHeader = ({ ref, className, ...props }: CardHeaderProps) => {
  return (
    <div ref={ref} className={cn(cardHeaderClassName, className)} {...props} />
  )
}

CardHeader.displayName = "CardHeader"

const CardTitle = ({ ref, className, ...props }: CardTitleProps) => {
  return (
    <h3 ref={ref} className={cn(cardTitleClassName, className)} {...props} />
  )
}

CardTitle.displayName = "CardTitle"

const CardDescription = ({
  ref,
  className,
  ...props
}: CardDescriptionProps) => {
  return (
    <p
      ref={ref}
      className={cn(cardDescriptionClassName, className)}
      {...props}
    />
  )
}

CardDescription.displayName = "CardDescription"

const CardContent = ({ ref, className, ...props }: CardContentProps) => {
  return (
    <div ref={ref} className={cn(cardContentClassName, className)} {...props} />
  )
}

CardContent.displayName = "CardContent"

const CardFooter = ({ ref, className, ...props }: CardFooterProps) => {
  return (
    <div ref={ref} className={cn(cardFooterClassName, className)} {...props} />
  )
}

CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
