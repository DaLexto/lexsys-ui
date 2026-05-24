/**
 * Toolbar.tsx
 *
 * Reference Toolbar component implementation.
 */

import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar"
import type {
  ToolbarButtonProps,
  ToolbarGroupProps,
  ToolbarInputProps,
  ToolbarLinkProps,
  ToolbarProps,
  ToolbarSeparatorProps,
} from "./Toolbar.types"
import {
  toolbarButtonVariants,
  toolbarGroupVariants,
  toolbarInputVariants,
  toolbarLinkVariants,
  toolbarRootVariants,
  toolbarSeparatorVariants,
} from "./Toolbar.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

const Toolbar = ({ ref, className, orientation, ...props }: ToolbarProps) => {
  return (
    <BaseToolbar.Root
      ref={ref}
      orientation={orientation}
      className={mergeClassName(
        toolbarRootVariants({ orientation }),
        className,
      )}
      {...props}
    />
  )
}

Toolbar.displayName = "Toolbar"

const ToolbarGroup = ({
  ref,
  className,
  ...props
}: ToolbarGroupProps) => {
  return (
    <BaseToolbar.Group
      ref={ref}
      className={mergeClassName(toolbarGroupVariants(), className)}
      {...props}
    />
  )
}

ToolbarGroup.displayName = "ToolbarGroup"

const ToolbarButton = ({
  ref,
  className,
  ...props
}: ToolbarButtonProps) => {
  return (
    <BaseToolbar.Button
      ref={ref}
      className={mergeClassName(toolbarButtonVariants(), className)}
      {...props}
    />
  )
}

ToolbarButton.displayName = "ToolbarButton"

const ToolbarLink = ({ ref, className, ...props }: ToolbarLinkProps) => {
  return (
    <BaseToolbar.Link
      ref={ref}
      className={mergeClassName(toolbarLinkVariants(), className)}
      {...props}
    />
  )
}

ToolbarLink.displayName = "ToolbarLink"

const ToolbarInput = ({ ref, className, ...props }: ToolbarInputProps) => {
  return (
    <BaseToolbar.Input
      ref={ref}
      className={mergeClassName(toolbarInputVariants(), className)}
      {...props}
    />
  )
}

ToolbarInput.displayName = "ToolbarInput"

const ToolbarSeparator = ({
  ref,
  className,
  orientation = "vertical",
  ...props
}: ToolbarSeparatorProps) => {
  return (
    <BaseToolbar.Separator
      ref={ref}
      orientation={orientation}
      className={mergeClassName(
        toolbarSeparatorVariants({ orientation }),
        className,
      )}
      {...props}
    />
  )
}

ToolbarSeparator.displayName = "ToolbarSeparator"

export {
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  ToolbarLink,
  ToolbarInput,
  ToolbarSeparator,
}
