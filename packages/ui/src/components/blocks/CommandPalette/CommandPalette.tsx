/**
 * CommandPalette.tsx
 *
 * Reference CommandPalette block — composes Dialog, Input, ScrollArea, and Separator primitives.
 */

import { useMemo, useState } from "react"
import {
  Dialog,
  DialogBackdrop,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogViewport,
} from "../../primitives/Dialog/Dialog"
import { Input } from "../../primitives/Input/Input"
import { Separator } from "../../primitives/Separator/Separator"
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaViewport,
} from "../../primitives/ScrollArea/ScrollArea"
import type {
  CommandPaletteItem,
  CommandPaletteProps,
} from "./CommandPalette.types"
import {
  commandPaletteEmptyClassName,
  commandPaletteGroupLabelClassName,
  commandPaletteInputClassName,
  commandPaletteItemClassName,
  commandPaletteItemDescriptionClassName,
  commandPaletteListClassName,
  commandPaletteRootVariants,
} from "./CommandPalette.variants"
import { cn } from "../../../utils/cn"

const matchesQuery = (item: CommandPaletteItem, query: string): boolean => {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return true

  const haystack = [
    item.label,
    item.description,
    item.group,
    ...(item.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()

  return haystack.includes(normalized)
}

const groupItems = (
  items: CommandPaletteItem[],
): Array<{ group: string; items: CommandPaletteItem[] }> => {
  const groups = new Map<string, CommandPaletteItem[]>()

  for (const item of items) {
    const group = item.group ?? "Results"
    const current = groups.get(group) ?? []
    current.push(item)
    groups.set(group, current)
  }

  return Array.from(groups.entries()).map(([group, groupedItems]) => ({
    group,
    items: groupedItems,
  }))
}

const CommandPalette = ({
  open,
  onOpenChange,
  items,
  onSelect,
  placeholder = "Search commands…",
  emptyMessage = "No commands found.",
  title = "Command palette",
  description = "Search and run commands.",
}: CommandPaletteProps) => {
  const [query, setQuery] = useState("")

  const filteredItems = useMemo(
    () => items.filter((item) => matchesQuery(item, query)),
    [items, query],
  )

  const groupedItems = useMemo(() => groupItems(filteredItems), [filteredItems])

  const handleSelect = (item: CommandPaletteItem) => {
    onSelect(item)
    onOpenChange(false)
    setQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup className={cn(commandPaletteRootVariants())}>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="sr-only">
              {description}
            </DialogDescription>

            <Input
              autoFocus
              placeholder={placeholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className={commandPaletteInputClassName}
              aria-label="Search commands"
            />

            <Separator />

            <ScrollArea className={commandPaletteListClassName}>
              <ScrollAreaViewport>
                <ScrollAreaContent>
                  {groupedItems.length === 0 ? (
                    <p className={commandPaletteEmptyClassName}>
                      {emptyMessage}
                    </p>
                  ) : (
                    groupedItems.map(({ group, items: groupItemsList }) => (
                      <section key={group}>
                        <h3 className={commandPaletteGroupLabelClassName}>
                          {group}
                        </h3>
                        <ul className="m-0 list-none p-0">
                          {groupItemsList.map((item) => (
                            <li key={item.id}>
                              <button
                                type="button"
                                className={commandPaletteItemClassName}
                                onClick={() => handleSelect(item)}
                              >
                                <span>{item.label}</span>
                                {item.description ? (
                                  <span
                                    className={
                                      commandPaletteItemDescriptionClassName
                                    }
                                  >
                                    {item.description}
                                  </span>
                                ) : null}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))
                  )}
                </ScrollAreaContent>
              </ScrollAreaViewport>
            </ScrollArea>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  )
}

CommandPalette.displayName = "CommandPalette"

export { CommandPalette }
