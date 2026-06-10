/**
 * StatsCard.types.ts
 *
 * Public types for the StatsCard block.
 */

import type { HTMLAttributes, ReactNode, Ref } from "react";
import type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from "../../primitives/Card/Card.types";

export interface StatsCardProps extends Omit<CardProps, "children"> {
  ref?: Ref<HTMLDivElement>;
  className?: CardProps["className"];
  children?: ReactNode;
}

export type StatsCardHeaderProps = CardHeaderProps;

export type StatsCardTitleProps = CardTitleProps;

export type StatsCardDescriptionProps = CardDescriptionProps;

export type StatsCardContentProps = CardContentProps;

export interface StatsCardValueProps extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
  className?: string;
  children?: ReactNode;
}

export interface StatsCardTrendProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  className?: string;
  children?: ReactNode;
}

export type StatsCardFooterProps = CardFooterProps;
