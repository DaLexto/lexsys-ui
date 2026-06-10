import type { AnchorHTMLAttributes, HTMLAttributes, Ref } from "react";
/**
 * Breadcrumb.types.ts
 *
 * Public and internal types for Breadcrumb component.
 */

export interface BreadcrumbProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "className"
> {
  ref?: Ref<HTMLElement>;
  className?: string;
}

export interface BreadcrumbListProps extends Omit<
  HTMLAttributes<HTMLOListElement>,
  "className"
> {
  ref?: Ref<HTMLOListElement>;
  className?: string;
}

export interface BreadcrumbItemProps extends Omit<
  HTMLAttributes<HTMLLIElement>,
  "className"
> {
  ref?: Ref<HTMLLIElement>;
  className?: string;
}

export interface BreadcrumbLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className"
> {
  ref?: Ref<HTMLAnchorElement>;
  className?: string;
}

export interface BreadcrumbPageProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "className"
> {
  ref?: Ref<HTMLSpanElement>;
  className?: string;
}

export interface BreadcrumbSeparatorProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "className"
> {
  ref?: Ref<HTMLSpanElement>;
  className?: string;
}

export interface BreadcrumbEllipsisProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "className"
> {
  ref?: Ref<HTMLSpanElement>;
  className?: string;
}
