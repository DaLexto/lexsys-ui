/**
 * SettingsPanel.types.ts
 *
 * Public types for the SettingsPanel block.
 */

import type { ReactNode, Ref } from "react"
import type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from "../../primitives/Card/Card.types"

export interface SettingsPanelProps extends Omit<CardProps, "children"> {
  ref?: Ref<HTMLDivElement>
  className?: CardProps["className"]
  children?: ReactNode
}

export type SettingsPanelHeaderProps = CardHeaderProps

export type SettingsPanelTitleProps = CardTitleProps

export type SettingsPanelDescriptionProps = CardDescriptionProps

export type SettingsPanelContentProps = CardContentProps

export type SettingsPanelFooterProps = CardFooterProps
