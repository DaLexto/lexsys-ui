/**
 * Pagination.tsx
 *
 * Reference Pagination component implementation.
 */

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import type {
  PaginationContentProps,
  PaginationEllipsisProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationNextProps,
  PaginationPreviousProps,
  PaginationProps,
} from "./Pagination.types";
import {
  paginationContentVariants,
  paginationEllipsisVariants,
  paginationItemVariants,
  paginationLinkVariants,
  paginationRootVariants,
} from "./Pagination.variants";
import { cn } from "@/lib/utils";

const Pagination = ({ ref, className, ...props }: PaginationProps) => {
  return (
    <nav
      ref={ref}
      aria-label="pagination"
      className={cn(paginationRootVariants(), className)}
      {...props}
    />
  );
};

Pagination.displayName = "Pagination";

const PaginationContent = ({
  ref,
  className,
  ...props
}: PaginationContentProps) => {
  return (
    <ul
      ref={ref}
      className={cn(paginationContentVariants(), className)}
      {...props}
    />
  );
};

PaginationContent.displayName = "PaginationContent";

const PaginationItem = ({ ref, className, ...props }: PaginationItemProps) => {
  return (
    <li
      ref={ref}
      className={cn(paginationItemVariants(), className)}
      {...props}
    />
  );
};

PaginationItem.displayName = "PaginationItem";

const PaginationLink = ({
  ref,
  className,
  isActive,
  size,
  ...props
}: PaginationLinkProps) => {
  return (
    <a
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      className={cn(paginationLinkVariants({ isActive, size }), className)}
      {...props}
    />
  );
};

PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  ref,
  className,
  children,
  size = "md",
  ...props
}: PaginationPreviousProps) => {
  return (
    <PaginationLink
      ref={ref}
      aria-label="Go to previous page"
      size={size}
      className={cn("gap-(--lex-space-1) px-(--lex-space-2)", className)}
      {...props}
    >
      <ChevronLeft aria-hidden="true" size={16} />
      {children ?? <span>Previous</span>}
    </PaginationLink>
  );
};

PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  ref,
  className,
  children,
  size = "md",
  ...props
}: PaginationNextProps) => {
  return (
    <PaginationLink
      ref={ref}
      aria-label="Go to next page"
      size={size}
      className={cn("gap-(--lex-space-1) px-(--lex-space-2)", className)}
      {...props}
    >
      {children ?? <span>Next</span>}
      <ChevronRight aria-hidden="true" size={16} />
    </PaginationLink>
  );
};

PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  ref,
  className,
  ...props
}: PaginationEllipsisProps) => {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(paginationEllipsisVariants(), className)}
      {...props}
    >
      <MoreHorizontal size={16} />
      <span className="sr-only">More pages</span>
    </span>
  );
};

PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
