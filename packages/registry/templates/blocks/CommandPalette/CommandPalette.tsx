/**
 * CommandPalette.tsx
 *
 * Reference CommandPalette block — compound Dialog command surface.
 */

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
  CommandPaletteContentProps,
  CommandPaletteDescriptionProps,
  CommandPaletteEmptyProps,
  CommandPaletteGroupLabelProps,
  CommandPaletteGroupProps,
  CommandPaletteInputProps,
  CommandPaletteItemProps,
  CommandPaletteListProps,
  CommandPaletteProps,
  CommandPaletteTitleProps,
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
import { cn } from "@/lib/utils"

const CommandPalette = ({ children, ...props }: CommandPaletteProps) => {
  return <Dialog {...props}>{children}</Dialog>
}

CommandPalette.displayName = "CommandPalette"

const CommandPaletteContent = ({
  ref,
  className,
  children,
  ...props
}: CommandPaletteContentProps) => {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogViewport>
        <DialogPopup
          ref={ref}
          className={cn(commandPaletteRootVariants(), className)}
          {...props}
        >
          {children}
        </DialogPopup>
      </DialogViewport>
    </DialogPortal>
  )
}

CommandPaletteContent.displayName = "CommandPaletteContent"

const CommandPaletteTitle = ({
  ref,
  className,
  children,
  ...props
}: CommandPaletteTitleProps) => {
  return (
    <DialogTitle ref={ref} className={className} {...props}>
      {children}
    </DialogTitle>
  )
}

CommandPaletteTitle.displayName = "CommandPaletteTitle"

const CommandPaletteDescription = ({
  ref,
  className,
  children,
  ...props
}: CommandPaletteDescriptionProps) => {
  return (
    <DialogDescription
      ref={ref}
      className={cn("sr-only", className)}
      {...props}
    >
      {children}
    </DialogDescription>
  )
}

CommandPaletteDescription.displayName = "CommandPaletteDescription"

const CommandPaletteInput = ({
  ref,
  className,
  ...props
}: CommandPaletteInputProps) => {
  return (
    <Input
      ref={ref}
      autoFocus
      className={cn(commandPaletteInputClassName, className)}
      aria-label="Search commands"
      {...props}
    />
  )
}

CommandPaletteInput.displayName = "CommandPaletteInput"

const CommandPaletteSeparator = () => {
  return <Separator />
}

CommandPaletteSeparator.displayName = "CommandPaletteSeparator"

const CommandPaletteList = ({
  ref,
  className,
  children,
  ...props
}: CommandPaletteListProps) => {
  return (
    <ScrollArea className={cn(commandPaletteListClassName, className)}>
      <ScrollAreaViewport>
        <ScrollAreaContent ref={ref} {...props}>
          {children}
        </ScrollAreaContent>
      </ScrollAreaViewport>
    </ScrollArea>
  )
}

CommandPaletteList.displayName = "CommandPaletteList"

const CommandPaletteGroup = ({
  ref,
  className,
  children,
  ...props
}: CommandPaletteGroupProps) => {
  return (
    <section ref={ref} className={className} {...props}>
      {children}
    </section>
  )
}

CommandPaletteGroup.displayName = "CommandPaletteGroup"

const CommandPaletteGroupLabel = ({
  ref,
  className,
  children,
  ...props
}: CommandPaletteGroupLabelProps) => {
  return (
    <h3
      ref={ref}
      className={cn(commandPaletteGroupLabelClassName, className)}
      {...props}
    >
      {children}
    </h3>
  )
}

CommandPaletteGroupLabel.displayName = "CommandPaletteGroupLabel"

const CommandPaletteItem = ({
  ref,
  description,
  className,
  children,
  type = "button",
  ...props
}: CommandPaletteItemProps) => {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(commandPaletteItemClassName, className)}
      {...props}
    >
      <span>{children}</span>
      {description ? (
        <span className={commandPaletteItemDescriptionClassName}>
          {description}
        </span>
      ) : null}
    </button>
  )
}

CommandPaletteItem.displayName = "CommandPaletteItem"

const CommandPaletteEmpty = ({
  ref,
  className,
  children = "No commands found.",
  ...props
}: CommandPaletteEmptyProps) => {
  return (
    <p
      ref={ref}
      className={cn(commandPaletteEmptyClassName, className)}
      {...props}
    >
      {children}
    </p>
  )
}

CommandPaletteEmpty.displayName = "CommandPaletteEmpty"

export {
  CommandPalette,
  CommandPaletteContent,
  CommandPaletteTitle,
  CommandPaletteDescription,
  CommandPaletteInput,
  CommandPaletteSeparator,
  CommandPaletteList,
  CommandPaletteGroup,
  CommandPaletteGroupLabel,
  CommandPaletteItem,
  CommandPaletteEmpty,
}
