/**
 * PageHeader.tsx
 *
 * Reference PageHeader block — compound page title surface with breadcrumb and actions.
 */

import { Button } from "@/components/primitives/Button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/primitives/Breadcrumb"
import type {
  PageHeaderActionProps,
  PageHeaderActionsProps,
  PageHeaderBreadcrumbItemProps,
  PageHeaderBreadcrumbLinkProps,
  PageHeaderBreadcrumbListProps,
  PageHeaderBreadcrumbPageProps,
  PageHeaderBreadcrumbProps,
  PageHeaderBreadcrumbSeparatorProps,
  PageHeaderDescriptionProps,
  PageHeaderHeadingProps,
  PageHeaderProps,
  PageHeaderTitleProps,
  PageHeaderTopProps,
} from "./PageHeader.types"
import {
  pageHeaderActionsClasses,
  pageHeaderBreadcrumbClasses,
  pageHeaderClasses,
  pageHeaderDescriptionClasses,
  pageHeaderHeadingClasses,
  pageHeaderTitleClasses,
  pageHeaderTopClasses,
} from "./PageHeader.variants"
import { cn } from "@/lib/utils"

const PageHeader = ({ ref, className, ...props }: PageHeaderProps) => {
  return (
    <header
      ref={ref}
      className={cn(pageHeaderClasses(), className)}
      {...props}
    />
  )
}

PageHeader.displayName = "PageHeader"

const PageHeaderTop = ({ ref, className, ...props }: PageHeaderTopProps) => {
  return (
    <div
      ref={ref}
      className={cn(pageHeaderTopClasses(), className)}
      {...props}
    />
  )
}

PageHeaderTop.displayName = "PageHeaderTop"

const PageHeaderBreadcrumb = ({
  ref,
  className,
  ...props
}: PageHeaderBreadcrumbProps) => {
  return (
    <Breadcrumb
      ref={ref}
      className={cn(pageHeaderBreadcrumbClasses(), className)}
      {...props}
    />
  )
}

PageHeaderBreadcrumb.displayName = "PageHeaderBreadcrumb"

const PageHeaderBreadcrumbList = ({
  className,
  ...props
}: PageHeaderBreadcrumbListProps) => {
  return <BreadcrumbList className={className} {...props} />
}

PageHeaderBreadcrumbList.displayName = "PageHeaderBreadcrumbList"

const PageHeaderBreadcrumbItem = ({
  className,
  ...props
}: PageHeaderBreadcrumbItemProps) => {
  return <BreadcrumbItem className={className} {...props} />
}

PageHeaderBreadcrumbItem.displayName = "PageHeaderBreadcrumbItem"

const PageHeaderBreadcrumbLink = ({
  className,
  ...props
}: PageHeaderBreadcrumbLinkProps) => {
  return <BreadcrumbLink className={className} {...props} />
}

PageHeaderBreadcrumbLink.displayName = "PageHeaderBreadcrumbLink"

const PageHeaderBreadcrumbPage = ({
  className,
  ...props
}: PageHeaderBreadcrumbPageProps) => {
  return <BreadcrumbPage className={className} {...props} />
}

PageHeaderBreadcrumbPage.displayName = "PageHeaderBreadcrumbPage"

const PageHeaderBreadcrumbSeparator = ({
  className,
  ...props
}: PageHeaderBreadcrumbSeparatorProps) => {
  return <BreadcrumbSeparator className={className} {...props} />
}

PageHeaderBreadcrumbSeparator.displayName = "PageHeaderBreadcrumbSeparator"

const PageHeaderHeading = ({
  ref,
  className,
  ...props
}: PageHeaderHeadingProps) => {
  return (
    <div
      ref={ref}
      className={cn(pageHeaderHeadingClasses(), className)}
      {...props}
    />
  )
}

PageHeaderHeading.displayName = "PageHeaderHeading"

const PageHeaderTitle = ({
  ref,
  className,
  ...props
}: PageHeaderTitleProps) => {
  return (
    <h1
      ref={ref}
      className={cn(pageHeaderTitleClasses(), className)}
      {...props}
    />
  )
}

PageHeaderTitle.displayName = "PageHeaderTitle"

const PageHeaderDescription = ({
  ref,
  className,
  ...props
}: PageHeaderDescriptionProps) => {
  return (
    <p
      ref={ref}
      className={cn(pageHeaderDescriptionClasses(), className)}
      {...props}
    />
  )
}

PageHeaderDescription.displayName = "PageHeaderDescription"

const PageHeaderActions = ({
  ref,
  className,
  ...props
}: PageHeaderActionsProps) => {
  return (
    <div
      ref={ref}
      className={cn(pageHeaderActionsClasses(), className)}
      {...props}
    />
  )
}

PageHeaderActions.displayName = "PageHeaderActions"

const PageHeaderAction = ({
  ref,
  className,
  ...props
}: PageHeaderActionProps) => {
  return <Button ref={ref} className={className} {...props} />
}

PageHeaderAction.displayName = "PageHeaderAction"

export {
  PageHeader,
  PageHeaderTop,
  PageHeaderBreadcrumb,
  PageHeaderBreadcrumbList,
  PageHeaderBreadcrumbItem,
  PageHeaderBreadcrumbLink,
  PageHeaderBreadcrumbPage,
  PageHeaderBreadcrumbSeparator,
  PageHeaderHeading,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
  PageHeaderAction,
}
