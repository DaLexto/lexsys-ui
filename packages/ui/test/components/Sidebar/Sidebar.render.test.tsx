import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarItem,
  SidebarItemLink,
  SidebarList,
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
})
