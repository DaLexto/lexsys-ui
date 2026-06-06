import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "../../../src/components/primitives/Breadcrumb/Breadcrumb.js"

describe("Breadcrumb render", () => {
  it("renders breadcrumb navigation with current page", () => {
    render(
      <Breadcrumb className="custom-breadcrumb">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )

    expect(screen.getByRole("navigation")).toHaveClass("custom-breadcrumb")
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()
    expect(screen.getByText("Settings")).toHaveAttribute("aria-current", "page")
  })
})
