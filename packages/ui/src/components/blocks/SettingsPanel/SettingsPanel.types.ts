/**
 * SettingsPanel.types.ts
 *
 * Public types for the SettingsPanel block.
 */

import type { ReactNode, Ref } from "react"
import type { CardProps } from "../../primitives/Card/Card.types"

export interface SettingsPanelProps extends Omit<CardProps, "children"> {
  ref?: Ref<HTMLDivElement>
  title: string
  description?: string
  footer?: ReactNode
  children?: ReactNode
  headerClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  contentClassName?: string
  footerClassName?: string
}
