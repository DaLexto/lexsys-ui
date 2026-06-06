import { describe, expect, it } from "vitest"
import {
  paginationEllipsisVariants,
  paginationLinkVariants,
} from "../../../src/components/primitives/Pagination/Pagination.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("Pagination variants", () => {
  it("uses token-backed link styling", () => {
    const className = paginationLinkVariants()

    expect(className).toContain(`bg-(--${p}-pagination-link-background)`)
    expect(className).toContain(`text-(--${p}-pagination-link-foreground)`)
    expect(className).toContain(`h-(--${p}-pagination-link-height-md)`)
  })

  it("maps active and size variants through component tokens", () => {
    const activeClassName = paginationLinkVariants({
      isActive: true,
      size: "sm",
    })

    expect(activeClassName).toContain(
      `bg-(--${p}-pagination-link-active-background)`,
    )
    expect(activeClassName).toContain(
      `text-(--${p}-pagination-link-active-foreground)`,
    )
    expect(activeClassName).toContain(`h-(--${p}-pagination-link-height-sm)`)
  })

  it("uses token-backed ellipsis styling", () => {
    expect(paginationEllipsisVariants()).toContain(
      `text-(--${p}-pagination-ellipsis-foreground)`,
    )
  })
})
