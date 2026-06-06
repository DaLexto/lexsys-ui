import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import {
  Sidebar,
  SidebarCollapseTrigger,
  SidebarContent,
  SidebarExpandable,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  SidebarItemAction,
  SidebarItemBadge,
  SidebarItemIcon,
  SidebarItemLink,
  SidebarItemShortcut,
  SidebarList,
  SidebarSubItemLink,
  SidebarSubList,
  SidebarProvider,
  SidebarTrigger,
} from "../../../src/components/blocks/Sidebar/Sidebar.js"

describe("Sidebar render", () => {
  afterEach(() => {
    cleanup()
  })

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

  it("renders SidebarItemBadge count when expanded", () => {
    render(
      <Sidebar>
        <SidebarContent>
          <SidebarList>
            <SidebarItem>
              <SidebarItemLink href="#inbox">Inbox</SidebarItemLink>
              <SidebarItemBadge variant="primary">24</SidebarItemBadge>
            </SidebarItem>
          </SidebarList>
        </SidebarContent>
      </Sidebar>,
    )

    const [badgeLabel] = screen.getAllByText("24")

    expect(badgeLabel).toBeInTheDocument()
    expect(badgeLabel).not.toHaveClass("sr-only")
    expect(badgeLabel.closest(".lex-sidebar__item-badge")).toBeInTheDocument()
  })

  it("morphs SidebarItemBadge into dot shell when icon-collapsed", () => {
    const { container } = render(
      <SidebarProvider collapsible="icon" defaultCollapsed>
        <Sidebar>
          <SidebarContent>
            <SidebarList>
              <SidebarItem>
                <SidebarItemLink href="#inbox">Inbox</SidebarItemLink>
                <SidebarItemBadge variant="primary">24</SidebarItemBadge>
              </SidebarItem>
            </SidebarList>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    )

    const [badge] = container.querySelectorAll(".lex-sidebar__item-badge")
    const [badgeLabel] = screen.getAllByText("24")

    expect(badge).toHaveClass("md:group-data-[collapsed=true]/sidebar:h-2")
    expect(badgeLabel).toHaveClass(
      "md:group-data-[collapsed=true]/sidebar:sr-only",
    )
  })

  it("renders forced dot mode via dot prop", () => {
    render(
      <Sidebar>
        <SidebarContent>
          <SidebarList>
            <SidebarItem>
              <SidebarItemLink href="#inbox">Inbox</SidebarItemLink>
              <SidebarItemBadge dot={true} variant="primary">
                24
              </SidebarItemBadge>
            </SidebarItem>
          </SidebarList>
        </SidebarContent>
      </Sidebar>,
    )

    const dotBadges = screen.getAllByRole("status", { name: "24" })

    expect(dotBadges.length).toBeGreaterThanOrEqual(1)
    expect(dotBadges[0]).toHaveClass("lex-sidebar__item-badge")
  })

  it("renders item chrome exports on nav rows", () => {
    const { container } = render(
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              Workspace
              <SidebarGroupAction aria-label="Add workspace">
                +
              </SidebarGroupAction>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarList>
                <SidebarItem>
                  <SidebarItemLink href="#inbox">
                    <SidebarItemIcon aria-hidden="true">
                      <svg />
                    </SidebarItemIcon>
                    <SidebarExpandable>Inbox</SidebarExpandable>
                    <SidebarItemShortcut>⌘I</SidebarItemShortcut>
                  </SidebarItemLink>
                  <SidebarItemAction aria-label="Inbox actions">
                    ⋯
                  </SidebarItemAction>
                </SidebarItem>
              </SidebarList>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>,
    )

    const [icon] = container.querySelectorAll(".lex-sidebar__item-icon")
    const [shortcut] = container.querySelectorAll(".lex-sidebar__item-shortcut")
    const [action] = container.querySelectorAll(".lex-sidebar__item-action")
    const [groupAction] = container.querySelectorAll(
      ".lex-sidebar__group-action",
    )

    expect(icon).toBeInTheDocument()
    expect(shortcut).toHaveTextContent("⌘I")
    expect(action).toHaveAttribute("aria-label", "Inbox actions")
    expect(groupAction).toHaveAttribute("aria-label", "Add workspace")
  })

  it("hides shortcut and group action classes when icon-collapsed", () => {
    const { container } = render(
      <SidebarProvider collapsible="icon" defaultCollapsed>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                Workspace
                <SidebarGroupAction aria-label="Add workspace">
                  +
                </SidebarGroupAction>
              </SidebarGroupLabel>
              <SidebarList>
                <SidebarItem>
                  <SidebarItemLink href="#inbox">
                    <SidebarExpandable>Inbox</SidebarExpandable>
                    <SidebarItemShortcut>⌘I</SidebarItemShortcut>
                  </SidebarItemLink>
                </SidebarItem>
              </SidebarList>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    )

    const [shortcut] = container.querySelectorAll(".lex-sidebar__item-shortcut")
    const [groupAction] = container.querySelectorAll(
      ".lex-sidebar__group-action",
    )

    expect(shortcut).toHaveClass(
      "md:group-data-[collapsed=true]/sidebar:hidden",
    )
    expect(groupAction).toHaveClass(
      "md:group-data-[collapsed=true]/sidebar:hidden",
    )
  })

  it("renders nested SidebarSubList with indented links", () => {
    const { container } = render(
      <Sidebar>
        <SidebarContent>
          <SidebarList>
            <SidebarItem>
              <SidebarItemLink href="#settings">Settings</SidebarItemLink>
              <SidebarSubList>
                <SidebarItem>
                  <SidebarSubItemLink href="#profile" active>
                    Profile
                  </SidebarSubItemLink>
                </SidebarItem>
                <SidebarItem>
                  <SidebarSubItemLink href="#billing">Billing</SidebarSubItemLink>
                </SidebarItem>
              </SidebarSubList>
            </SidebarItem>
          </SidebarList>
        </SidebarContent>
      </Sidebar>,
    )

    const [subList] = container.querySelectorAll(".lex-sidebar__sub-list")
    const [profileLink] = screen.getAllByRole("link", { name: "Profile" })

    expect(subList).toBeInTheDocument()
    expect(subList).toHaveClass("border-l")
    expect(profileLink).toHaveClass("lex-sidebar__item--active")
    expect(profileLink.className).toContain(
      "var(--lex-sidebar-item-sub-indent)",
    )
  })

  it("hides SidebarSubList when icon-collapsed", () => {
    const { container } = render(
      <SidebarProvider collapsible="icon" defaultCollapsed>
        <Sidebar>
          <SidebarContent>
            <SidebarList>
              <SidebarItem>
                <SidebarItemLink href="#settings">Settings</SidebarItemLink>
                <SidebarSubList>
                  <SidebarItem>
                    <SidebarSubItemLink href="#profile">Profile</SidebarSubItemLink>
                  </SidebarItem>
                </SidebarSubList>
              </SidebarItem>
            </SidebarList>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    )

    const [subList] = container.querySelectorAll(".lex-sidebar__sub-list")

    expect(subList).toHaveClass("md:group-data-[collapsed=true]/sidebar:hidden")
  })
})
