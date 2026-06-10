import type { AnchorHTMLAttributes, HTMLAttributes, Ref } from "react";
/**
 * Pagination.types.ts
 *
 * Public and internal types for Pagination component.
 */

export type PaginationSize = "sm" | "md";

export interface PaginationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "className"
> {
  ref?: Ref<HTMLElement>;
  className?: string;
}

export interface PaginationContentProps extends Omit<
  HTMLAttributes<HTMLUListElement>,
  "className"
> {
  ref?: Ref<HTMLUListElement>;
  className?: string;
}

export interface PaginationItemProps extends Omit<
  HTMLAttributes<HTMLLIElement>,
  "className"
> {
  ref?: Ref<HTMLLIElement>;
  className?: string;
}

export interface PaginationLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className"
> {
  ref?: Ref<HTMLAnchorElement>;
  className?: string;
  isActive?: boolean;
  size?: PaginationSize;
}

export type PaginationPreviousProps = PaginationLinkProps;

export type PaginationNextProps = PaginationLinkProps;

export interface PaginationEllipsisProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "className"
> {
  ref?: Ref<HTMLSpanElement>;
  className?: string;
}
