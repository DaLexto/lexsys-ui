/**
 * DataTable.variants.ts
 *
 * Variant classes for the DataTable block.
 */

export const dataTableClasses = (): string => {
  return ["lex-data-table", "flex w-full flex-col gap-(--lex-space-4)"].join(
    " ",
  )
}

export const dataTableFooterClasses = (): string => {
  return [
    "lex-data-table__footer",
    "flex flex-col gap-(--lex-space-3)",
    "sm:flex-row sm:items-center sm:justify-between",
  ].join(" ")
}

export const dataTablePaginationClasses = (): string => {
  return "lex-data-table__pagination"
}
