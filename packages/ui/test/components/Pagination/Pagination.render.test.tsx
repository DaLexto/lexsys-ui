import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../../../src/components/primitives/Pagination/Pagination.js"

describe("Pagination render", () => {
  it("renders pagination navigation with custom className", () => {
    render(
      <Pagination className="custom-pagination">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    )

    expect(screen.getByRole("navigation")).toHaveClass("custom-pagination")
    expect(screen.getByRole("link", { name: "1" })).toHaveAttribute(
      "aria-current",
      "page",
    )
  })
})
