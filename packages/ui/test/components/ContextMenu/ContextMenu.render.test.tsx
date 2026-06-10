import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuTrigger,
} from "../../../src/components/primitives/ContextMenu/ContextMenu.js";

describe("ContextMenu render", () => {
  it("renders context menu item when defaultOpen", () => {
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>Canvas</ContextMenuTrigger>
        <ContextMenuPortal>
          <ContextMenuPositioner>
            <ContextMenuPopup className="custom-context-menu">
              <ContextMenuItem>Copy</ContextMenuItem>
            </ContextMenuPopup>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenu>,
    );

    expect(screen.getByRole("menuitem", { name: "Copy" })).toBeInTheDocument();
    expect(
      screen
        .getByRole("menuitem", { name: "Copy" })
        .closest(".custom-context-menu"),
    ).not.toBeNull();
  });
});
