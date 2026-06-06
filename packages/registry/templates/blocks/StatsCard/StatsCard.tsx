/**
 * StatsCard.tsx
 *
 * Reference StatsCard block — compound Card metric summary.
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/primitives/Card"
import type {
  StatsCardContentProps,
  StatsCardDescriptionProps,
  StatsCardFooterProps,
  StatsCardHeaderProps,
  StatsCardProps,
  StatsCardTitleProps,
  StatsCardTrendProps,
  StatsCardValueProps,
} from "./StatsCard.types"
import {
  statsCardClasses,
  statsCardTrendClasses,
  statsCardValueClasses,
} from "./StatsCard.variants"
import { cn } from "@/lib/utils"

const StatsCard = ({
  ref,
  variant,
  className,
  children,
  ...cardProps
}: StatsCardProps) => {
  return (
    <Card
      ref={ref}
      variant={variant}
      className={cn(statsCardClasses(), className)}
      {...cardProps}
    >
      {children}
    </Card>
  )
}

StatsCard.displayName = "StatsCard"

const StatsCardHeader = ({
  ref,
  className,
  ...props
}: StatsCardHeaderProps) => {
  return <CardHeader ref={ref} className={className} {...props} />
}

StatsCardHeader.displayName = "StatsCardHeader"

const StatsCardTitle = ({ ref, className, ...props }: StatsCardTitleProps) => {
  return <CardTitle ref={ref} className={className} {...props} />
}

StatsCardTitle.displayName = "StatsCardTitle"

const StatsCardDescription = ({
  ref,
  className,
  ...props
}: StatsCardDescriptionProps) => {
  return <CardDescription ref={ref} className={className} {...props} />
}

StatsCardDescription.displayName = "StatsCardDescription"

const StatsCardContent = ({
  ref,
  className,
  ...props
}: StatsCardContentProps) => {
  return <CardContent ref={ref} className={className} {...props} />
}

StatsCardContent.displayName = "StatsCardContent"

const StatsCardValue = ({ ref, className, ...props }: StatsCardValueProps) => {
  return (
    <p
      ref={ref}
      className={cn(statsCardValueClasses(), className)}
      {...props}
    />
  )
}

StatsCardValue.displayName = "StatsCardValue"

const StatsCardTrend = ({ ref, className, ...props }: StatsCardTrendProps) => {
  return (
    <span
      ref={ref}
      className={cn(statsCardTrendClasses(), className)}
      {...props}
    />
  )
}

StatsCardTrend.displayName = "StatsCardTrend"

const StatsCardFooter = ({
  ref,
  className,
  ...props
}: StatsCardFooterProps) => {
  return <CardFooter ref={ref} className={className} {...props} />
}

StatsCardFooter.displayName = "StatsCardFooter"

export {
  StatsCard,
  StatsCardHeader,
  StatsCardTitle,
  StatsCardDescription,
  StatsCardContent,
  StatsCardValue,
  StatsCardTrend,
  StatsCardFooter,
}
