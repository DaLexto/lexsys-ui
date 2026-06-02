/**
 * CommandPalette.types.ts
 *
 * Public types for the CommandPalette block.
 */

import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  Ref,
} from "react"
import type { DialogProps } from "@/components/primitives/Dialog"
import type { InputProps } from "@/components/primitives/Input"

export interface CommandPaletteProps extends DialogProps {
  children?: ReactNode
}

export interface CommandPaletteContentProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}

export type CommandPaletteInputProps = InputProps

export type CommandPaletteSeparatorProps = Record<string, never>

export interface CommandPaletteListProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}

export interface CommandPaletteGroupProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>
  className?: string
  children?: ReactNode
}

export interface CommandPaletteGroupLabelProps extends HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>
  className?: string
  children?: ReactNode
}

export interface CommandPaletteItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>
  description?: ReactNode
  className?: string
  children?: ReactNode
}

export interface CommandPaletteEmptyProps extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>
  className?: string
  children?: ReactNode
}

export interface CommandPaletteTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>
}

export interface CommandPaletteDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>
}
