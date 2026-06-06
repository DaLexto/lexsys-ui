import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  FilterToolbar,
  FilterToolbarButton,
  FilterToolbarGroup,
  FilterToolbarSearch,
} from "../../../src/components/blocks/FilterToolbar/FilterToolbar.js"

describe("FilterToolbar render", () => {
  it("renders search input and filter actions", () => {
    render(
      <FilterToolbar
        aria-label="Table filters"
        className="custom-filter-toolbar"
      >
        <FilterToolbarGroup>
          <FilterToolbarSearch placeholder="Search rows…" />
          <FilterToolbarButton>Reset</FilterToolbarButton>
        </FilterToolbarGroup>
      </FilterToolbar>,
    )

    expect(screen.getByRole("toolbar")).toHaveClass("custom-filter-toolbar")
    expect(screen.getByPlaceholderText("Search rows…")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument()
  })
})
