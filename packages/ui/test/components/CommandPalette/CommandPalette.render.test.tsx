import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { useState } from "react"
import { CommandPalette } from "../../../src/components/blocks/CommandPalette/CommandPalette.js"
import type { CommandPaletteItem } from "../../../src/components/blocks/CommandPalette/CommandPalette.types.js"

const items: CommandPaletteItem[] = [
  {
    id: "dashboard",
    label: "Go to dashboard",
    description: "Open the main dashboard",
    group: "Navigation",
  },
  {
    id: "settings",
    label: "Open settings",
    group: "Navigation",
  },
]

const CommandPaletteHarness = () => {
  const [open, setOpen] = useState(true)

  return (
    <CommandPalette
      open={open}
      onOpenChange={setOpen}
      items={items}
      onSelect={() => setOpen(false)}
    />
  )
}

describe("CommandPalette render", () => {
  it("filters commands by search query", () => {
    render(<CommandPaletteHarness />)

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText("Go to dashboard")).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText("Search commands"), {
      target: { value: "settings" },
    })

    expect(screen.queryByText("Go to dashboard")).not.toBeInTheDocument()
    expect(screen.getByText("Open settings")).toBeInTheDocument()
  })
})
