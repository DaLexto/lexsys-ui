import { describe, expect, test } from "vitest"
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
} from "../../../src/components/primitives/Table/Table.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("tableVariants", () => {
  test("uses token-backed classes for visual styling", () => {
    const className = tableVariants()

    expect(className).toContain(`text-(--${p}-table-foreground)`)
    expect(className).toContain(`text-(length:--${p}-table-cell-font-size)`)
  })

  test("defines token-backed slot classes", () => {
    expect(tableWrapperClassName).toContain("overflow-x-auto")
    expect(tableCaptionClassName).toContain(
      `text-(--${p}-table-caption-foreground)`,
    )
    expect(tableHeaderClassName).toContain(`border-(--${p}-table-border-color)`)
    expect(tableBodyClassName).toContain(`border-(--${p}-table-border-color)`)
    expect(tableFooterClassName).toContain(
      `bg-(--${p}-table-footer-background)`,
    )
    expect(tableHeadClassName).toContain(`text-(--${p}-table-head-foreground)`)
    expect(tableCellClassName).toContain(`px-(--${p}-table-cell-padding-x)`)
    expect(tableRowClassName).toContain(`border-(--${p}-table-border-color)`)
  })

  test("supports striped and bordered variants", () => {
    expect(tableVariants({ variant: "striped" })).toContain(
      `[&_tbody_tr:nth-child(even)]:bg-(--${p}-table-row-striped-background)`,
    )
    expect(tableVariants({ variant: "bordered" })).toContain(
      `border-(--${p}-table-border-color)`,
    )
  })
})
