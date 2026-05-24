import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { DashboardShell } from "../../../src/components/templates/DashboardShell/DashboardShell.js"

const navItems = [{ id: "home", label: "Home", href: "#home", active: true }]

describe("DashboardShell render", () => {
  it("composes Sidebar block with header and main content", () => {
    render(
      <DashboardShell
        brand="PulseDesk"
        sidebarItems={navItems}
        header="Dashboard"
        className="custom-shell"
      >
        Page content
      </DashboardShell>,
    )

    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByText("Page content")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()

    const shell = screen.getByText("Page content").closest(".custom-shell")
    expect(shell).not.toBeNull()
  })
})
