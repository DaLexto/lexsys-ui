import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuTrigger,
} from "../../../src/components/Menu/Menu.js"

describe("Menu render", () => {
  it("renders menu item when defaultOpen", () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuPortal>
          <MenuPositioner>
            <MenuPopup className="custom-menu">
              <MenuItem>Edit profile</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>,
    )

    expect(
      screen.getByRole("menuitem", { name: "Edit profile" }),
    ).toBeInTheDocument()
    expect(
      screen
        .getByRole("menuitem", { name: "Edit profile" })
        .closest(".custom-menu"),
    ).not.toBeNull()
  })
})
