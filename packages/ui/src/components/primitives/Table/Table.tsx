/**
 * Table.tsx
 *
 * Reference Table component implementation.
 */

import type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
} from "./Table.types"
import {
  tableBodyClassName,
  tableCaptionClassName,
  tableCellClassName,
  tableFooterClassName,
  tableHeadClassName,
  tableHeaderClassName,
  tableRowClassName,
  tableVariants,
  tableWrapperClassName,
} from "./Table.variants"
import { cn } from "../../../utils/cn"

const Table = ({ ref, variant, className, ...props }: TableProps) => {
  return (
    <div className={tableWrapperClassName}>
      <table
        ref={ref}
        className={cn(tableVariants({ variant }), className)}
        {...props}
      />
    </div>
  )
}

Table.displayName = "Table"

const TableHeader = ({ ref, className, ...props }: TableHeaderProps) => {
  return (
    <thead
      ref={ref}
      className={cn(tableHeaderClassName, className)}
      {...props}
    />
  )
}

TableHeader.displayName = "TableHeader"

const TableBody = ({ ref, className, ...props }: TableBodyProps) => {
  return (
    <tbody ref={ref} className={cn(tableBodyClassName, className)} {...props} />
  )
}

TableBody.displayName = "TableBody"

const TableFooter = ({ ref, className, ...props }: TableFooterProps) => {
  return (
    <tfoot
      ref={ref}
      className={cn(tableFooterClassName, className)}
      {...props}
    />
  )
}

TableFooter.displayName = "TableFooter"

const TableRow = ({ ref, className, ...props }: TableRowProps) => {
  return (
    <tr ref={ref} className={cn(tableRowClassName, className)} {...props} />
  )
}

TableRow.displayName = "TableRow"

const TableHead = ({ ref, className, ...props }: TableHeadProps) => {
  return (
    <th ref={ref} className={cn(tableHeadClassName, className)} {...props} />
  )
}

TableHead.displayName = "TableHead"

const TableCell = ({ ref, className, ...props }: TableCellProps) => {
  return (
    <td ref={ref} className={cn(tableCellClassName, className)} {...props} />
  )
}

TableCell.displayName = "TableCell"

const TableCaption = ({ ref, className, ...props }: TableCaptionProps) => {
  return (
    <caption
      ref={ref}
      className={cn(tableCaptionClassName, className)}
      {...props}
    />
  )
}

TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
