/**
 * DataTable.variants.ts
 *
 * Variant classes for the DataTable block.
 */

export const dataTableClasses = (): string => {
  return [
    "lex-data-table",
    "flex w-full flex-col gap-(--lex-data-table-root-gap)",
  ].join(" ")
}

export const dataTableFooterClasses = (): string => {
  return [
    "lex-data-table__footer",
    "flex flex-col gap-(--lex-data-table-footer-gap)",
    "sm:flex-row sm:items-center sm:justify-between",
  ].join(" ")
}

export const dataTablePaginationClasses = (): string => {
  return "lex-data-table__pagination"
}
