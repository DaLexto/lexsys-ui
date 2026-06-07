import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  CommandPalette,
  CommandPaletteContent,
  CommandPaletteGroup,
  CommandPaletteGroupLabel,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
  CommandPaletteSeparator,
  CommandPaletteTitle,
} from "../../../src/components/blocks/CommandPalette/CommandPalette.js"

describe("CommandPalette render", () => {
  it("renders compound command palette dialog", () => {
    render(
      <CommandPalette open onOpenChange={() => undefined}>
        <CommandPaletteContent>
          <CommandPaletteTitle>Command palette</CommandPaletteTitle>
          <CommandPaletteInput placeholder="Search commands…" />
          <CommandPaletteSeparator />
          <CommandPaletteList>
            <CommandPaletteGroup>
              <CommandPaletteGroupLabel>Navigation</CommandPaletteGroupLabel>
              <CommandPaletteItem description="Open the main dashboard">
                Go to dashboard
              </CommandPaletteItem>
              <CommandPaletteItem>Open settings</CommandPaletteItem>
            </CommandPaletteGroup>
          </CommandPaletteList>
        </CommandPaletteContent>
      </CommandPalette>,
    )

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText("Go to dashboard")).toBeInTheDocument()
    expect(screen.getByText("Open settings")).toBeInTheDocument()
    expect(screen.getByLabelText("Search commands")).toBeInTheDocument()
  })
})
