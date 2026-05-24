/**
 * SettingsPanel.tsx
 *
 * Reference SettingsPanel block — compound Card settings section.
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../primitives/Card/Card"
import type {
  SettingsPanelContentProps,
  SettingsPanelDescriptionProps,
  SettingsPanelFooterProps,
  SettingsPanelHeaderProps,
  SettingsPanelProps,
  SettingsPanelTitleProps,
} from "./SettingsPanel.types"
import { settingsPanelVariants } from "./SettingsPanel.variants"
import { cn } from "../../../utils/cn"

const SettingsPanel = ({
  ref,
  variant,
  className,
  children,
  ...cardProps
}: SettingsPanelProps) => {
  return (
    <Card
      ref={ref}
      variant={variant}
      className={cn(settingsPanelVariants(), className)}
      {...cardProps}
    >
      {children}
    </Card>
  )
}

SettingsPanel.displayName = "SettingsPanel"

const SettingsPanelHeader = ({
  ref,
  className,
  ...props
}: SettingsPanelHeaderProps) => {
  return <CardHeader ref={ref} className={className} {...props} />
}

SettingsPanelHeader.displayName = "SettingsPanelHeader"

const SettingsPanelTitle = ({
  ref,
  className,
  ...props
}: SettingsPanelTitleProps) => {
  return <CardTitle ref={ref} className={className} {...props} />
}

SettingsPanelTitle.displayName = "SettingsPanelTitle"

const SettingsPanelDescription = ({
  ref,
  className,
  ...props
}: SettingsPanelDescriptionProps) => {
  return <CardDescription ref={ref} className={className} {...props} />
}

SettingsPanelDescription.displayName = "SettingsPanelDescription"

const SettingsPanelContent = ({
  ref,
  className,
  ...props
}: SettingsPanelContentProps) => {
  return <CardContent ref={ref} className={className} {...props} />
}

SettingsPanelContent.displayName = "SettingsPanelContent"

const SettingsPanelFooter = ({
  ref,
  className,
  ...props
}: SettingsPanelFooterProps) => {
  return <CardFooter ref={ref} className={className} {...props} />
}

SettingsPanelFooter.displayName = "SettingsPanelFooter"

export {
  SettingsPanel,
  SettingsPanelHeader,
  SettingsPanelTitle,
  SettingsPanelDescription,
  SettingsPanelContent,
  SettingsPanelFooter,
}
