/**
 * DataTable.types.ts
 *
 * Public types for the DataTable block.
 */

import type { HTMLAttributes, ReactNode, Ref } from "react"
import type {
  PaginationContentProps,
  PaginationEllipsisProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationNextProps,
  PaginationPreviousProps,
  PaginationProps,
} from "@/components/primitives/Pagination/Pagination.types"
import type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
} from "@/components/primitives/Table/Table.types"

export interface DataTableProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}

export type DataTableTableProps = TableProps

export type DataTableHeaderProps = TableHeaderProps

export type DataTableBodyProps = TableBodyProps

export type DataTableFooterProps = TableFooterProps

export type DataTableRowProps = TableRowProps

export type DataTableHeadProps = TableHeadProps

export type DataTableCellProps = TableCellProps

export type DataTableCaptionProps = TableCaptionProps

export interface DataTableToolbarProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}

export interface DataTablePaginationBarProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}

export type DataTablePaginationProps = PaginationProps

export type DataTablePaginationContentProps = PaginationContentProps

export type DataTablePaginationItemProps = PaginationItemProps

export type DataTablePaginationLinkProps = PaginationLinkProps

export type DataTablePaginationPreviousProps = PaginationPreviousProps

export type DataTablePaginationNextProps = PaginationNextProps

export type DataTablePaginationEllipsisProps = PaginationEllipsisProps
