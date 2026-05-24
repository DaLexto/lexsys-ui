import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
  SidebarItemLink,
  SidebarList,
} from "../../../src/components/blocks/Sidebar/Sidebar.js"
import {
  DashboardShell,
  DashboardShellBody,
  DashboardShellHeader,
  DashboardShellMain,
  DashboardShellSidebar,
} from "../../../src/components/templates/DashboardShell/DashboardShell.js"

describe("DashboardShell render", () => {
  it("composes Sidebar block with header and main content", () => {
    render(
      <DashboardShell className="custom-shell">
        <DashboardShellSidebar>
          <Sidebar>
            <SidebarHeader>PulseDesk</SidebarHeader>
            <SidebarContent>
              <SidebarList>
                <SidebarItem>
                  <SidebarItemLink href="#home" active>
                    Home
                  </SidebarItemLink>
                </SidebarItem>
              </SidebarList>
            </SidebarContent>
          </Sidebar>
        </DashboardShellSidebar>
        <DashboardShellBody>
          <DashboardShellHeader>Dashboard</DashboardShellHeader>
          <DashboardShellMain>Page content</DashboardShellMain>
        </DashboardShellBody>
      </DashboardShell>,
    )

    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByText("Page content")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()

    const shell = screen.getByText("Page content").closest(".custom-shell")
    expect(shell).not.toBeNull()
  })
})
