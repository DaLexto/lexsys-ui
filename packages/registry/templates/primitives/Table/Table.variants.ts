/**
 * Table.variants.ts
 *
 * Defines Table visual slots using class composition.
 */

import { cva } from "class-variance-authority"

export const tableVariants = cva(
  [
    "w-full caption-bottom border-collapse text-(length:--lex-table-cell-font-size)",
    "text-(--lex-table-foreground)",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        striped:
          "[&_tbody_tr:nth-child(even)]:bg-(--lex-table-row-striped-background)",
        bordered:
          "border border-(--lex-table-border-color) [&_th]:border [&_td]:border [&_th]:border-(--lex-table-border-color) [&_td]:border-(--lex-table-border-color)",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export const tableWrapperClassName = "relative w-full overflow-x-auto"

export const tableCaptionClassName =
  "mt-(--lex-table-cell-padding-y) text-(length:--lex-table-caption-font-size) leading-(--lex-table-caption-font-line-height) text-(--lex-table-caption-foreground)"

export const tableHeaderClassName =
  "[&_tr]:border-b [&_tr]:border-(--lex-table-border-color)"

export const tableBodyClassName =
  "[&_tr:last-child]:border-0 [&_tr]:border-b [&_tr]:border-(--lex-table-border-color)"

export const tableFooterClassName =
  "border-t border-(--lex-table-border-color) bg-(--lex-table-footer-background) font-medium [&_tr]:last:border-b-0"

export const tableRowClassName =
  "border-b border-(--lex-table-border-color) transition-colors hover:bg-(--lex-table-head-background)/50 data-[state=selected]:bg-(--lex-table-head-background)"

export const tableHeadClassName =
  "h-10 px-(--lex-table-cell-padding-x) py-(--lex-table-cell-padding-y) text-left align-middle font-(--lex-table-head-font-weight) text-(length:--lex-table-head-font-size) leading-(--lex-table-head-font-line-height) text-(--lex-table-head-foreground) [&:has([role=checkbox])]:pr-0"

export const tableCellClassName =
  "px-(--lex-table-cell-padding-x) py-(--lex-table-cell-padding-y) align-middle leading-(--lex-table-cell-font-line-height) [&:has([role=checkbox])]:pr-0"
