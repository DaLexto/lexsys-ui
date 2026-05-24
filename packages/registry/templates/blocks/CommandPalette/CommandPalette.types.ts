/**
 * CommandPalette.types.ts
 *
 * Public types for the CommandPalette block.
 */

export interface CommandPaletteItem {
  id: string
  label: string
  description?: string
  group?: string
  keywords?: string[]
}

export interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CommandPaletteItem[]
  onSelect: (item: CommandPaletteItem) => void
  placeholder?: string
  emptyMessage?: string
  title?: string
  description?: string
}
