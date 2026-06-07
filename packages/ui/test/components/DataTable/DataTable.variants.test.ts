import { describe, expect, it } from "vitest"
import {
  dataTableClasses,
  dataTableFooterClasses,
} from "../../../src/components/blocks/DataTable/DataTable.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("DataTable variants", () => {
  it("uses data-table component tokens for root and footer rhythm", () => {
    expect(dataTableClasses()).toContain(`gap-(--${p}-data-table-root-gap)`)
    expect(dataTableFooterClasses()).toContain(
      `gap-(--${p}-data-table-footer-gap)`,
    )
    expect(dataTableClasses()).not.toContain(`--${p}-space-`)
    expect(dataTableFooterClasses()).not.toContain(`--${p}-space-`)
  })
})
