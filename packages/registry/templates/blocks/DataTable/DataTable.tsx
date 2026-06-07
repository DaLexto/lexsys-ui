/**
 * DataTable.tsx
 *
 * Reference DataTable block — compound Table with pagination footer.
 */

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/primitives/Pagination/Pagination"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/primitives/Table/Table"
import type {
  DataTableBodyProps,
  DataTableCaptionProps,
  DataTableCellProps,
  DataTableFooterProps,
  DataTableHeadProps,
  DataTableHeaderProps,
  DataTablePaginationBarProps,
  DataTablePaginationContentProps,
  DataTablePaginationEllipsisProps,
  DataTablePaginationItemProps,
  DataTablePaginationLinkProps,
  DataTablePaginationNextProps,
  DataTablePaginationPreviousProps,
  DataTablePaginationProps,
  DataTableProps,
  DataTableRowProps,
  DataTableTableProps,
  DataTableToolbarProps,
} from "./DataTable.types"
import {
  dataTableClasses,
  dataTableFooterClasses,
  dataTablePaginationClasses,
} from "./DataTable.variants"
import { cn } from "@/lib/utils"

const DataTable = ({ ref, className, ...props }: DataTableProps) => {
  return (
    <div ref={ref} className={cn(dataTableClasses(), className)} {...props} />
  )
}

DataTable.displayName = "DataTable"

const DataTableToolbar = ({
  ref,
  className,
  ...props
}: DataTableToolbarProps) => {
  return <div ref={ref} className={className} {...props} />
}

DataTableToolbar.displayName = "DataTableToolbar"

const DataTableTable = ({ ref, className, ...props }: DataTableTableProps) => {
  return <Table ref={ref} className={className} {...props} />
}

DataTableTable.displayName = "DataTableTable"

const DataTableHeader = ({
  ref,
  className,
  ...props
}: DataTableHeaderProps) => {
  return <TableHeader ref={ref} className={className} {...props} />
}

DataTableHeader.displayName = "DataTableHeader"

const DataTableBody = ({ ref, className, ...props }: DataTableBodyProps) => {
  return <TableBody ref={ref} className={className} {...props} />
}

DataTableBody.displayName = "DataTableBody"

const DataTableFooter = ({
  ref,
  className,
  ...props
}: DataTableFooterProps) => {
  return <TableFooter ref={ref} className={className} {...props} />
}

DataTableFooter.displayName = "DataTableFooter"

const DataTableRow = ({ ref, className, ...props }: DataTableRowProps) => {
  return <TableRow ref={ref} className={className} {...props} />
}

DataTableRow.displayName = "DataTableRow"

const DataTableHead = ({ ref, className, ...props }: DataTableHeadProps) => {
  return <TableHead ref={ref} className={className} {...props} />
}

DataTableHead.displayName = "DataTableHead"

const DataTableCell = ({ ref, className, ...props }: DataTableCellProps) => {
  return <TableCell ref={ref} className={className} {...props} />
}

DataTableCell.displayName = "DataTableCell"

const DataTableCaption = ({
  ref,
  className,
  ...props
}: DataTableCaptionProps) => {
  return <TableCaption ref={ref} className={className} {...props} />
}

DataTableCaption.displayName = "DataTableCaption"

const DataTablePaginationBar = ({
  ref,
  className,
  ...props
}: DataTablePaginationBarProps) => {
  return (
    <div
      ref={ref}
      className={cn(dataTableFooterClasses(), className)}
      {...props}
    />
  )
}

DataTablePaginationBar.displayName = "DataTablePaginationBar"

const DataTablePagination = ({
  ref,
  className,
  ...props
}: DataTablePaginationProps) => {
  return (
    <Pagination
      ref={ref}
      className={cn(dataTablePaginationClasses(), className)}
      {...props}
    />
  )
}

DataTablePagination.displayName = "DataTablePagination"

const DataTablePaginationContent = ({
  className,
  ...props
}: DataTablePaginationContentProps) => {
  return <PaginationContent className={className} {...props} />
}

DataTablePaginationContent.displayName = "DataTablePaginationContent"

const DataTablePaginationItem = ({
  className,
  ...props
}: DataTablePaginationItemProps) => {
  return <PaginationItem className={className} {...props} />
}

DataTablePaginationItem.displayName = "DataTablePaginationItem"

const DataTablePaginationLink = ({
  className,
  ...props
}: DataTablePaginationLinkProps) => {
  return <PaginationLink className={className} {...props} />
}

DataTablePaginationLink.displayName = "DataTablePaginationLink"

const DataTablePaginationPrevious = ({
  className,
  ...props
}: DataTablePaginationPreviousProps) => {
  return <PaginationPrevious className={className} {...props} />
}

DataTablePaginationPrevious.displayName = "DataTablePaginationPrevious"

const DataTablePaginationNext = ({
  className,
  ...props
}: DataTablePaginationNextProps) => {
  return <PaginationNext className={className} {...props} />
}

DataTablePaginationNext.displayName = "DataTablePaginationNext"

const DataTablePaginationEllipsis = ({
  className,
  ...props
}: DataTablePaginationEllipsisProps) => {
  return <PaginationEllipsis className={className} {...props} />
}

DataTablePaginationEllipsis.displayName = "DataTablePaginationEllipsis"

export {
  DataTable,
  DataTableToolbar,
  DataTableTable,
  DataTableHeader,
  DataTableBody,
  DataTableFooter,
  DataTableRow,
  DataTableHead,
  DataTableCell,
  DataTableCaption,
  DataTablePaginationBar,
  DataTablePagination,
  DataTablePaginationContent,
  DataTablePaginationItem,
  DataTablePaginationLink,
  DataTablePaginationPrevious,
  DataTablePaginationNext,
  DataTablePaginationEllipsis,
}
