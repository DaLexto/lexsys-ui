/**
 * Breadcrumb.tsx
 *
 * Reference Breadcrumb component implementation.
 */

import { ChevronRight, MoreHorizontal } from "lucide-react"
import type {
  BreadcrumbEllipsisProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
} from "./Breadcrumb.types"
import {
  breadcrumbEllipsisVariants,
  breadcrumbItemVariants,
  breadcrumbLinkVariants,
  breadcrumbListVariants,
  breadcrumbPageVariants,
  breadcrumbRootVariants,
  breadcrumbSeparatorVariants,
} from "./Breadcrumb.variants"
import { cn } from "../../../utils/cn"

const Breadcrumb = ({ ref, className, ...props }: BreadcrumbProps) => {
  return (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cn(breadcrumbRootVariants(), className)}
      {...props}
    />
  )
}

Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = ({ ref, className, ...props }: BreadcrumbListProps) => {
  return (
    <ol
      ref={ref}
      className={cn(breadcrumbListVariants(), className)}
      {...props}
    />
  )
}

BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = ({ ref, className, ...props }: BreadcrumbItemProps) => {
  return (
    <li
      ref={ref}
      className={cn(breadcrumbItemVariants(), className)}
      {...props}
    />
  )
}

BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = ({ ref, className, ...props }: BreadcrumbLinkProps) => {
  return (
    <a
      ref={ref}
      className={cn(breadcrumbLinkVariants(), className)}
      {...props}
    />
  )
}

BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = ({ ref, className, ...props }: BreadcrumbPageProps) => {
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(breadcrumbPageVariants(), className)}
      {...props}
    />
  )
}

BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  ref,
  className,
  children,
  ...props
}: BreadcrumbSeparatorProps) => {
  return (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn(breadcrumbSeparatorVariants(), className)}
      {...props}
    >
      {children ?? <ChevronRight size={14} />}
    </span>
  )
}

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  ref,
  className,
  ...props
}: BreadcrumbEllipsisProps) => {
  return (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn(breadcrumbEllipsisVariants(), className)}
      {...props}
    >
      <MoreHorizontal size={14} />
      <span className="sr-only">More</span>
    </span>
  )
}

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
