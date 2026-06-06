import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../src/components/primitives/NavigationMenu/NavigationMenu.js"

describe("NavigationMenu render", () => {
  it("renders navigation link with custom className on root", () => {
    render(
      <NavigationMenu className="custom-navigation-menu">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    )

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()
    expect(screen.getByRole("navigation")).toHaveClass("custom-navigation-menu")
  })
})
