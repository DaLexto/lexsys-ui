/**
 * PageHeader.types.ts
 *
 * Public types for the PageHeader block.
 */

import type { HTMLAttributes, ReactNode, Ref } from "react";
import type { ButtonProps } from "../../primitives/Button/Button.types";
import type {
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
} from "../../primitives/Breadcrumb/Breadcrumb.types";

export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  className?: string;
  children?: ReactNode;
}

export interface PageHeaderTopProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  children?: ReactNode;
}

export type PageHeaderBreadcrumbProps = BreadcrumbProps;

export type PageHeaderBreadcrumbListProps = BreadcrumbListProps;

export type PageHeaderBreadcrumbItemProps = BreadcrumbItemProps;

export type PageHeaderBreadcrumbLinkProps = BreadcrumbLinkProps;

export type PageHeaderBreadcrumbPageProps = BreadcrumbPageProps;

export type PageHeaderBreadcrumbSeparatorProps = BreadcrumbSeparatorProps;

export interface PageHeaderHeadingProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  children?: ReactNode;
}

export interface PageHeaderTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>;
  className?: string;
  children?: ReactNode;
}

export interface PageHeaderDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
  className?: string;
  children?: ReactNode;
}

export interface PageHeaderActionsProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  children?: ReactNode;
}

export type PageHeaderActionProps = ButtonProps;
