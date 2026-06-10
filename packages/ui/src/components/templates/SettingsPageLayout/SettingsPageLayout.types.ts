/**
 * SettingsPageLayout.types.ts
 *
 * Public types for the SettingsPageLayout template.
 */

import type { HTMLAttributes, ReactNode, Ref } from "react";
import type { PageHeaderProps } from "../../blocks/PageHeader/PageHeader.types";
import type {
  SettingsPanelContentProps,
  SettingsPanelDescriptionProps,
  SettingsPanelFooterProps,
  SettingsPanelHeaderProps,
  SettingsPanelProps,
  SettingsPanelTitleProps,
} from "../../blocks/SettingsPanel/SettingsPanel.types";

export interface SettingsPageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  children?: ReactNode;
}

export type SettingsPageLayoutHeaderProps = PageHeaderProps;

export interface SettingsPageLayoutBodyProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  children?: ReactNode;
}

export interface SettingsPageLayoutNavProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  children?: ReactNode;
}

export interface SettingsPageLayoutMainProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  children?: ReactNode;
}

export type SettingsPageLayoutPanelProps = SettingsPanelProps;

export type SettingsPageLayoutPanelHeaderProps = SettingsPanelHeaderProps;

export type SettingsPageLayoutPanelTitleProps = SettingsPanelTitleProps;

export type SettingsPageLayoutPanelDescriptionProps =
  SettingsPanelDescriptionProps;

export type SettingsPageLayoutPanelContentProps = SettingsPanelContentProps;

export type SettingsPageLayoutPanelFooterProps = SettingsPanelFooterProps;
