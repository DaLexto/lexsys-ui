import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Sidebar,
  SidebarCollapseTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarItem,
  SidebarItemLink,
  SidebarList,
  SidebarProvider,
  SidebarTrigger,
} from "../../../src/components/blocks/Sidebar/Sidebar.js"

describe("Sidebar render", () => {
  it("composes compound navigation with consumer-placed trigger", () => {
    render(
      <Sidebar>
        <SidebarHeader>
          PulseDesk
          <SidebarTrigger>Open navigation</SidebarTrigger>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarList>
                <SidebarItem>
                  <SidebarItemLink href="#overview" active>
                    Overview
                  </SidebarItemLink>
                </SidebarItem>
                <SidebarItem>
                  <SidebarItemLink href="#settings">Settings</SidebarItemLink>
                </SidebarItem>
              </SidebarList>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>,
    )

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
      <Sidebar className="custom-sidebar">
        <SidebarHeader>PulseDesk</SidebarHeader>
        <SidebarContent>
          <SidebarList>
            <SidebarItem>
              <SidebarItemLink href="#overview">Overview</SidebarItemLink>
            </SidebarItem>
          </SidebarList>
        </SidebarContent>
      </Sidebar>,
    )

    expect(container.querySelector("aside")).toHaveClass("custom-sidebar")
  })

  it("applies collapsed shell state from SidebarProvider", () => {
    const { container } = render(
      <SidebarProvider collapsible="icon" defaultCollapsed>
        <Sidebar>
          <SidebarHeader>
            PulseDesk
            <SidebarCollapseTrigger>Expand sidebar</SidebarCollapseTrigger>
          </SidebarHeader>
          <SidebarContent>
            <SidebarList>
              <SidebarItem>
                <SidebarItemLink href="#overview">Overview</SidebarItemLink>
              </SidebarItem>
            </SidebarList>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    )

    const aside = container.querySelector("aside")

    expect(aside).toHaveAttribute("data-collapsed", "true")
    expect(aside).toHaveClass("lex-sidebar--collapsed")
    expect(
      screen.getByRole("button", { name: "Expand sidebar" }),
    ).toBeInTheDocument()
  })
})
