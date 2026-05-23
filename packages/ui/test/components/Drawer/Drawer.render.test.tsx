import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerViewport,
} from "../../../src/components/primitives/Drawer/Drawer.js"

describe("Drawer render", () => {
  it("renders drawer title when defaultOpen", () => {
    render(
      <Drawer defaultOpen>
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerViewport side="bottom">
            <DrawerPopup side="bottom" size="md" className="custom-drawer">
              <DrawerContent>
                <DrawerTitle>Drawer title</DrawerTitle>
              </DrawerContent>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </Drawer>,
    )

    expect(screen.getByText("Drawer title")).toBeInTheDocument()
    expect(
      screen.getByText("Drawer title").closest(".custom-drawer"),
    ).not.toBeNull()
  })
})
