import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Sidebar,
  SidebarCollapseTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  SidebarItemLink,
  SidebarList,
  SidebarProvider,
  SidebarSeparator,
} from "../../../src/components/blocks/Sidebar/Sidebar.js";
import {
  DashboardShell,
  DashboardShellBody,
  DashboardShellHeader,
  DashboardShellMain,
  DashboardShellSidebar,
} from "../../../src/components/templates/DashboardShell/DashboardShell.js";

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
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();

    const shell = screen.getByText("Page content").closest(".custom-shell");
    expect(shell).not.toBeNull();
  });

  it("composes enterprise SidebarProvider shell with separators and collapse", () => {
    const { container } = render(
      <SidebarProvider collapsible="icon">
        <DashboardShell>
          <DashboardShellSidebar>
            <Sidebar>
              <SidebarHeader>
                PulseDesk
                <SidebarCollapseTrigger>Toggle sidebar</SidebarCollapseTrigger>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Main</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarList>
                      <SidebarItem>
                        <SidebarItemLink href="#home" active>
                          Home
                        </SidebarItemLink>
                      </SidebarItem>
                    </SidebarList>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator data-testid="shell-separator" />
                <SidebarGroup>
                  <SidebarGroupLabel>Account</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarList>
                      <SidebarItem>
                        <SidebarItemLink href="#settings">
                          Settings
                        </SidebarItemLink>
                      </SidebarItem>
                    </SidebarList>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </DashboardShellSidebar>
          <DashboardShellBody>
            <DashboardShellHeader>Dashboard</DashboardShellHeader>
            <DashboardShellMain>Enterprise layout</DashboardShellMain>
          </DashboardShellBody>
        </DashboardShell>
      </SidebarProvider>,
    );

    expect(screen.getByText("Enterprise layout")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Collapse sidebar" }),
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-testid='shell-separator']"),
    ).toHaveClass("lex-sidebar__separator");
  });
});
