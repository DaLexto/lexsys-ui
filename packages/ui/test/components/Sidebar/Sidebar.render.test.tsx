import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import {
  Sidebar,
  SidebarCollapseTrigger,
  SidebarContent,
  SidebarExpandable,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupCollapsible,
  SidebarGroupCollapsiblePanel,
  SidebarGroupCollapsibleTrigger,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarItem,
  SidebarItemAction,
  SidebarItemBadge,
  SidebarItemIcon,
  SidebarItemButton,
  SidebarItemLink,
  SidebarItemSkeleton,
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
                  <SidebarSubItemLink href="#billing">
                    Billing
                  </SidebarSubItemLink>
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
    expect(subList).toHaveClass("border-s")
    expect(subList.className).toContain("ms-[calc")
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
                    <SidebarSubItemLink href="#profile">
                      Profile
                    </SidebarSubItemLink>
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

  it("sets aria-current on active SidebarItemLink and SidebarSubItemLink", () => {
    render(
      <Sidebar>
        <SidebarContent>
          <SidebarList>
            <SidebarItem>
              <SidebarItemLink href="#overview" active>
                Overview
              </SidebarItemLink>
            </SidebarItem>
            <SidebarItem>
              <SidebarItemLink href="#settings">Settings</SidebarItemLink>
              <SidebarSubList>
                <SidebarItem>
                  <SidebarSubItemLink href="#profile" active>
                    Profile
                  </SidebarSubItemLink>
                </SidebarItem>
              </SidebarSubList>
            </SidebarItem>
          </SidebarList>
        </SidebarContent>
      </Sidebar>,
    )

    const [overviewLink] = screen.getAllByRole("link", { name: "Overview" })
    const [settingsLink] = screen.getAllByRole("link", { name: "Settings" })
    const [profileLink] = screen.getAllByRole("link", { name: "Profile" })

    expect(overviewLink).toHaveAttribute("aria-current", "page")
    expect(settingsLink).not.toHaveAttribute("aria-current")
    expect(profileLink).toHaveAttribute("aria-current", "page")
  })

  it("moves focus between nav items with arrow keys", () => {
    render(
      <Sidebar>
        <SidebarContent>
          <SidebarList>
            <SidebarItem>
              <SidebarItemLink href="#overview">Overview</SidebarItemLink>
            </SidebarItem>
            <SidebarItem>
              <SidebarItemLink href="#settings">Settings</SidebarItemLink>
            </SidebarItem>
            <SidebarItem>
              <SidebarItemButton type="button">Sign out</SidebarItemButton>
            </SidebarItem>
          </SidebarList>
        </SidebarContent>
      </Sidebar>,
    )

    const [nav] = screen.getAllByRole("navigation", {
      name: "Application navigation",
    })
    const navQueries = within(nav)
    const overviewLink = navQueries.getByRole("link", { name: "Overview" })
    const settingsLink = navQueries.getByRole("link", { name: "Settings" })
    const signOutButton = navQueries.getByRole("button", { name: "Sign out" })

    overviewLink.focus()
    fireEvent.keyDown(nav, { key: "ArrowDown" })
    expect(settingsLink).toHaveFocus()

    fireEvent.keyDown(nav, { key: "End" })
    expect(signOutButton).toHaveFocus()

    fireEvent.keyDown(nav, { key: "Home" })
    expect(overviewLink).toHaveFocus()
  })

  it("marks disabled SidebarItemLink with aria-disabled and skips arrow focus", () => {
    render(
      <Sidebar>
        <SidebarContent>
          <SidebarList>
            <SidebarItem>
              <SidebarItemLink href="#overview">Overview</SidebarItemLink>
            </SidebarItem>
            <SidebarItem disabled>
              <SidebarItemLink href="#settings">Settings</SidebarItemLink>
            </SidebarItem>
            <SidebarItem>
              <SidebarItemButton type="button">Sign out</SidebarItemButton>
            </SidebarItem>
          </SidebarList>
        </SidebarContent>
      </Sidebar>,
    )

    const [nav] = screen.getAllByRole("navigation", {
      name: "Application navigation",
    })
    const navQueries = within(nav)
    const overviewLink = navQueries.getByRole("link", { name: "Overview" })
    const settingsLink = navQueries.getByRole("link", { name: "Settings" })
    const signOutButton = navQueries.getByRole("button", { name: "Sign out" })

    expect(settingsLink).toHaveAttribute("aria-disabled", "true")
    expect(settingsLink).toHaveAttribute("tabindex", "-1")

    overviewLink.focus()
    fireEvent.keyDown(nav, { key: "ArrowDown" })
    expect(signOutButton).toHaveFocus()
  })

  it("renders SidebarItemSkeleton with icon and label pulse blocks", () => {
    render(
      <SidebarProvider defaultCollapsed>
        <Sidebar>
          <SidebarContent>
            <SidebarList>
              <SidebarItem>
                <SidebarItemSkeleton data-testid="nav-skeleton" />
              </SidebarItem>
            </SidebarList>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    )

    const [skeleton] = screen.getAllByTestId("nav-skeleton")

    expect(skeleton).toHaveClass("lex-sidebar__item-skeleton")
    expect(
      skeleton.querySelector(".lex-sidebar__item-skeleton-icon"),
    ).toBeTruthy()
    expect(
      skeleton.querySelector(".lex-sidebar__item-skeleton-label"),
    ).toHaveClass("md:group-data-[collapsed=true]/sidebar:hidden")
  })

  it("applies right-side shell and active accent on inline end", () => {
    const { container } = render(
      <SidebarProvider side="right">
        <Sidebar>
          <SidebarContent>
            <SidebarList>
              <SidebarItem>
                <SidebarItemLink href="#billing" active>
                  Billing
                </SidebarItemLink>
              </SidebarItem>
            </SidebarList>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    )

    const aside = container.querySelector("aside")

    expect(aside).toHaveAttribute("data-side", "right")
    expect(aside).toHaveClass("lex-sidebar--right")

    const [billingLink] = screen.getAllByRole("link", { name: "Billing" })

    expect(billingLink.className).toContain("before:start-0")
    expect(billingLink.className).toContain(
      "group-data-[side=right]/sidebar:before:end-0",
    )
  })

  it("uses logical sub-list chrome under rtl", () => {
    const { container } = render(
      <div dir="rtl">
        <Sidebar>
          <SidebarContent>
            <SidebarSubList>
              <SidebarItem>
                <SidebarSubItemLink href="#profile">Profile</SidebarSubItemLink>
              </SidebarItem>
            </SidebarSubList>
          </SidebarContent>
        </Sidebar>
      </div>,
    )

    const [subList] = container.querySelectorAll(".lex-sidebar__sub-list")

    expect(subList).toHaveClass("border-s")
    expect(subList.className).toContain("ms-[calc")
    expect(subList.className).toContain("ps-(--lex-sidebar-item-sub-indent)")
  })

  it("renders SidebarInput as compact search field", () => {
    render(
      <Sidebar>
        <SidebarContent>
          <SidebarInput aria-label="Filter navigation" placeholder="Filter…" />
          <SidebarList>
            <SidebarItem>
              <SidebarItemLink href="#overview">Overview</SidebarItemLink>
            </SidebarItem>
          </SidebarList>
        </SidebarContent>
      </Sidebar>,
    )

    const [filterInput] = screen.getAllByRole("searchbox", {
      name: "Filter navigation",
    })

    expect(filterInput).toHaveClass("lex-sidebar__input")
    expect(filterInput).toHaveAttribute("placeholder", "Filter…")
  })

  it("hides SidebarInput when icon-collapsed", () => {
    render(
      <SidebarProvider collapsible="icon" defaultCollapsed>
        <Sidebar>
          <SidebarContent>
            <SidebarInput
              aria-label="Filter navigation"
              data-testid="sidebar-filter"
            />
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    )

    const [filterInput] = screen.getAllByTestId("sidebar-filter")

    expect(filterInput).toHaveClass(
      "md:group-data-[collapsed=true]/sidebar:hidden",
    )
  })

  it("folds SidebarGroup sections with SidebarGroupCollapsible", () => {
    render(
      <Sidebar>
        <SidebarContent>
          <SidebarGroupCollapsible defaultOpen={false}>
            <SidebarGroup>
              <SidebarGroupLabel>
                <SidebarGroupCollapsibleTrigger>
                  Developer
                </SidebarGroupCollapsibleTrigger>
                <SidebarGroupAction aria-label="Add developer tool">
                  +
                </SidebarGroupAction>
              </SidebarGroupLabel>
              <SidebarGroupCollapsiblePanel>
                <SidebarGroupContent>
                  <SidebarList>
                    <SidebarItem>
                      <SidebarItemLink href="#api-keys">
                        API keys
                      </SidebarItemLink>
                    </SidebarItem>
                  </SidebarList>
                </SidebarGroupContent>
              </SidebarGroupCollapsiblePanel>
            </SidebarGroup>
          </SidebarGroupCollapsible>
        </SidebarContent>
      </Sidebar>,
    )

    const [nav] = screen.getAllByRole("navigation", {
      name: "Application navigation",
    })
    const navQueries = within(nav)
    const trigger = navQueries.getByRole("button", { name: "Developer" })
    const apiKeysLink = navQueries.queryByRole("link", { name: "API keys" })

    expect(trigger).toHaveClass("lex-sidebar__group-collapsible-trigger")
    expect(apiKeysLink).not.toBeInTheDocument()

    fireEvent.click(trigger)
    expect(
      navQueries.getByRole("link", { name: "API keys" }),
    ).toBeInTheDocument()
  })

  it("renders indented SidebarItemSkeleton for nested rows", () => {
    render(
      <Sidebar>
        <SidebarContent>
          <SidebarSubList>
            <SidebarItem>
              <SidebarItemSkeleton indent data-testid="sub-skeleton" />
            </SidebarItem>
          </SidebarSubList>
        </SidebarContent>
      </Sidebar>,
    )

    const [indentedSkeleton] = screen.getAllByTestId("sub-skeleton")

    expect(indentedSkeleton.className).toContain(
      "--lex-sidebar-item-sub-indent",
    )
  })
})
