import { describe, expect, it } from "vitest"
import {
  drawerBackdropVariants,
  drawerPopupVariants,
  drawerSwipeAreaVariants,
  drawerViewportVariants,
} from "../../../src/components/Drawer/Drawer.variants.js"

describe("drawerVariants", () => {
  it("includes token-backed side, size, swipe, and transition classes", () => {
    expect(drawerViewportVariants({ side: "right" })).toContain("justify-end")
    expect(drawerPopupVariants({ side: "right", size: "lg" })).toContain(
      "w-[var(--nx-drawer-popup-width-lg)]",
    )
    expect(drawerPopupVariants({ side: "bottom", size: "md" })).toContain(
      "var(--drawer-swipe-movement-y,0px)",
    )
    expect(drawerSwipeAreaVariants({ side: "bottom" })).toContain(
      "h-[var(--nx-drawer-swipe-area-size)]",
    )
    expect(drawerBackdropVariants()).toContain(
      "bg-[var(--nx-drawer-backdrop-background)]",
    )
  })
})
