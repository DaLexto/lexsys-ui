import type { Ref } from "react"
/**
 * Table.types.ts
 *
 * Public and internal types for Table component.
 */

import type {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react"

export type TableVariant = "default" | "striped" | "bordered"

export interface TableProps extends Omit<
  TableHTMLAttributes<HTMLTableElement>,
  "className"
> {
  ref?: Ref<HTMLTableElement>
  variant?: TableVariant
  className?: string
}

export interface TableSectionProps extends Omit<
  HTMLAttributes<HTMLTableSectionElement>,
  "className"
> {
  ref?: Ref<HTMLTableSectionElement>
  className?: string
}

export type TableHeaderProps = TableSectionProps
export type TableBodyProps = TableSectionProps
export type TableFooterProps = TableSectionProps

export interface TableRowProps extends Omit<
  HTMLAttributes<HTMLTableRowElement>,
  "className"
> {
  ref?: Ref<HTMLTableRowElement>
  className?: string
}

export interface TableHeadProps extends Omit<
  ThHTMLAttributes<HTMLTableCellElement>,
  "className"
> {
  ref?: Ref<HTMLTableCellElement>
  className?: string
}

export interface TableCellProps extends Omit<
  TdHTMLAttributes<HTMLTableCellElement>,
  "className"
> {
  ref?: Ref<HTMLTableCellElement>
  className?: string
}

export interface TableCaptionProps extends Omit<
  HTMLAttributes<HTMLTableCaptionElement>,
  "className"
> {
  ref?: Ref<HTMLTableCaptionElement>
  className?: string
}
