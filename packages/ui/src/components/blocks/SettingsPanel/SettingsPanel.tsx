/**
 * SettingsPanel.tsx
 *
 * Reference SettingsPanel block — composes Card primitives into a settings section.
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../primitives/Card/Card"
import type { SettingsPanelProps } from "./SettingsPanel.types"
import { settingsPanelVariants } from "./SettingsPanel.variants"
import { cn } from "../../../utils/cn"

const SettingsPanel = ({
  ref,
  title,
  description,
  footer,
  children,
  variant,
  className,
  headerClassName,
  titleClassName,
  descriptionClassName,
  contentClassName,
  footerClassName,
  ...cardProps
}: SettingsPanelProps) => {
  return (
    <Card
      ref={ref}
      variant={variant}
      className={cn(settingsPanelVariants(), className)}
      {...cardProps}
    >
      <CardHeader className={headerClassName}>
        <CardTitle className={titleClassName}>{title}</CardTitle>
        {description ? (
          <CardDescription className={descriptionClassName}>
            {description}
          </CardDescription>
        ) : null}
      </CardHeader>
      {children ? (
        <CardContent className={contentClassName}>{children}</CardContent>
      ) : null}
      {footer ? (
        <CardFooter className={footerClassName}>{footer}</CardFooter>
      ) : null}
    </Card>
  )
}

SettingsPanel.displayName = "SettingsPanel"

export { SettingsPanel }
