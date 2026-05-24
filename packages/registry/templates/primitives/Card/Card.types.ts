import type { Ref } from "react"
/**
 * Card.types.ts
 *
 * Public and internal types for Card component.
 */

import type { HTMLAttributes } from "react"

export type CardVariant =
  | "surface"
  | "muted"
  | "default"
  | "outlined"
  | "elevated"
  | "ghost"

export interface CardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "className"
> {
  ref?: Ref<HTMLDivElement>
  variant?: CardVariant
  className?: string
}

export interface CardSectionProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "className"
> {
  ref?: Ref<HTMLDivElement>
  className?: string
}

export type CardHeaderProps = CardSectionProps

export interface CardTitleProps extends Omit<
  HTMLAttributes<HTMLHeadingElement>,
  "className"
> {
  ref?: Ref<HTMLHeadingElement>
  className?: string
}

export interface CardDescriptionProps extends Omit<
  HTMLAttributes<HTMLParagraphElement>,
  "className"
> {
  ref?: Ref<HTMLParagraphElement>
  className?: string
}

export type CardContentProps = CardSectionProps
export type CardFooterProps = CardSectionProps
