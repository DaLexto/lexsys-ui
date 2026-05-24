import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Sidebar } from "../../../src/components/blocks/Sidebar/Sidebar.js"

const navItems = [
  { id: "overview", label: "Overview", href: "#overview", active: true },
  { id: "settings", label: "Settings", href: "#settings" },
]

describe("Sidebar render", () => {
  it("composes Drawer, ScrollArea, and Button with desktop navigation", () => {
    render(<Sidebar brand="PulseDesk" items={navItems} />)

    expect(
      screen.getByRole("navigation", { name: "Application navigation" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Overview" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Settings" })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toBeInTheDocument()
  })

  it("merges custom className on root", () => {
    const { container } = render(
      <Sidebar brand="PulseDesk" items={navItems} className="custom-sidebar" />,
    )

    expect(container.querySelector("aside")).toHaveClass("custom-sidebar")
  })
})
