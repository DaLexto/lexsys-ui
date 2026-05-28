import { describe, expect, it } from "vitest"
import {
  drawerBackdropVariants,
  drawerCloseInlineVariants,
  drawerCloseVariants,
  drawerPopupVariants,
  drawerSwipeAreaVariants,
  drawerViewportVariants,
} from "../../../src/components/primitives/Drawer/Drawer.variants.js"

describe("drawerVariants", () => {
  it("includes token-backed side, size, swipe, and transition classes", () => {
    expect(drawerViewportVariants({ side: "right" })).toContain("justify-end")
    expect(drawerPopupVariants({ side: "right", size: "lg" })).toContain(
      "w-(--lex-drawer-popup-width-lg)",
    )
    expect(drawerPopupVariants({ side: "bottom", size: "md" })).toContain(
      "var(--drawer-swipe-movement-y,0px)",
    )
    expect(drawerSwipeAreaVariants({ side: "bottom" })).toContain(
      "h-(--lex-drawer-swipe-area-size)",
    )
    expect(drawerBackdropVariants()).toContain(
      "bg-(--lex-drawer-backdrop-background)",
    )
  })

  it("keeps icon and inline close variants separate", () => {
    expect(drawerCloseVariants()).toContain("absolute")
    expect(drawerCloseInlineVariants()).not.toContain("absolute")
    expect(drawerCloseInlineVariants()).toContain("relative")
  })
})
