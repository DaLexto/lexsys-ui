/**
 * SettingsPageLayout.tsx
 *
 * Reference SettingsPageLayout template — settings page shell with header and panels.
 */

import { PageHeader } from "@/components/blocks/PageHeader"
import {
  SettingsPanel,
  SettingsPanelContent,
  SettingsPanelDescription,
  SettingsPanelFooter,
  SettingsPanelHeader,
  SettingsPanelTitle,
} from "@/components/blocks/SettingsPanel"
import type {
  SettingsPageLayoutBodyProps,
  SettingsPageLayoutHeaderProps,
  SettingsPageLayoutMainProps,
  SettingsPageLayoutNavProps,
  SettingsPageLayoutPanelContentProps,
  SettingsPageLayoutPanelDescriptionProps,
  SettingsPageLayoutPanelFooterProps,
  SettingsPageLayoutPanelHeaderProps,
  SettingsPageLayoutPanelProps,
  SettingsPageLayoutPanelTitleProps,
  SettingsPageLayoutProps,
} from "./SettingsPageLayout.types"
import {
  settingsPageLayoutBodyClasses,
  settingsPageLayoutClasses,
  settingsPageLayoutHeaderClasses,
  settingsPageLayoutMainClasses,
  settingsPageLayoutNavClasses,
  settingsPageLayoutPanelClasses,
} from "./SettingsPageLayout.variants"
import { cn } from "@/lib/utils"

const SettingsPageLayout = ({
  ref,
  className,
  ...props
}: SettingsPageLayoutProps) => {
  return (
    <div
      ref={ref}
      className={cn(settingsPageLayoutClasses(), className)}
      {...props}
    />
  )
}

SettingsPageLayout.displayName = "SettingsPageLayout"

const SettingsPageLayoutHeader = ({
  ref,
  className,
  ...props
}: SettingsPageLayoutHeaderProps) => {
  return (
    <PageHeader
      ref={ref}
      className={cn(settingsPageLayoutHeaderClasses(), className)}
      {...props}
    />
  )
}

SettingsPageLayoutHeader.displayName = "SettingsPageLayoutHeader"

const SettingsPageLayoutBody = ({
  ref,
  className,
  ...props
}: SettingsPageLayoutBodyProps) => {
  return (
    <div
      ref={ref}
      className={cn(settingsPageLayoutBodyClasses(), className)}
      {...props}
    />
  )
}

SettingsPageLayoutBody.displayName = "SettingsPageLayoutBody"

const SettingsPageLayoutNav = ({
  ref,
  className,
  ...props
}: SettingsPageLayoutNavProps) => {
  return (
    <aside
      ref={ref}
      className={cn(settingsPageLayoutNavClasses(), className)}
      {...props}
    />
  )
}

SettingsPageLayoutNav.displayName = "SettingsPageLayoutNav"

const SettingsPageLayoutMain = ({
  ref,
  className,
  ...props
}: SettingsPageLayoutMainProps) => {
  return (
    <main
      ref={ref}
      className={cn(settingsPageLayoutMainClasses(), className)}
      {...props}
    />
  )
}

SettingsPageLayoutMain.displayName = "SettingsPageLayoutMain"

const SettingsPageLayoutPanel = ({
  ref,
  className,
  ...props
}: SettingsPageLayoutPanelProps) => {
  return (
    <SettingsPanel
      ref={ref}
      className={cn(settingsPageLayoutPanelClasses(), className)}
      {...props}
    />
  )
}

SettingsPageLayoutPanel.displayName = "SettingsPageLayoutPanel"

const SettingsPageLayoutPanelHeader = ({
  ref,
  className,
  ...props
}: SettingsPageLayoutPanelHeaderProps) => {
  return <SettingsPanelHeader ref={ref} className={className} {...props} />
}

SettingsPageLayoutPanelHeader.displayName = "SettingsPageLayoutPanelHeader"

const SettingsPageLayoutPanelTitle = ({
  ref,
  className,
  ...props
}: SettingsPageLayoutPanelTitleProps) => {
  return <SettingsPanelTitle ref={ref} className={className} {...props} />
}

SettingsPageLayoutPanelTitle.displayName = "SettingsPageLayoutPanelTitle"

const SettingsPageLayoutPanelDescription = ({
  ref,
  className,
  ...props
}: SettingsPageLayoutPanelDescriptionProps) => {
  return <SettingsPanelDescription ref={ref} className={className} {...props} />
}

SettingsPageLayoutPanelDescription.displayName =
  "SettingsPageLayoutPanelDescription"

const SettingsPageLayoutPanelContent = ({
  ref,
  className,
  ...props
}: SettingsPageLayoutPanelContentProps) => {
  return <SettingsPanelContent ref={ref} className={className} {...props} />
}

SettingsPageLayoutPanelContent.displayName = "SettingsPageLayoutPanelContent"

const SettingsPageLayoutPanelFooter = ({
  ref,
  className,
  ...props
}: SettingsPageLayoutPanelFooterProps) => {
  return <SettingsPanelFooter ref={ref} className={className} {...props} />
}

SettingsPageLayoutPanelFooter.displayName = "SettingsPageLayoutPanelFooter"

export {
  SettingsPageLayout,
  SettingsPageLayoutHeader,
  SettingsPageLayoutBody,
  SettingsPageLayoutNav,
  SettingsPageLayoutMain,
  SettingsPageLayoutPanel,
  SettingsPageLayoutPanelHeader,
  SettingsPageLayoutPanelTitle,
  SettingsPageLayoutPanelDescription,
  SettingsPageLayoutPanelContent,
  SettingsPageLayoutPanelFooter,
}
