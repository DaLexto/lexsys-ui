/**
 * Collapsible.tsx
 *
 * Reference Collapsible component implementation.
 */

import { forwardRef } from "react"
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible"
import { Plus } from "lucide-react"
import type {
  CollapsiblePanelProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
} from "./Collapsible.types"
import {
  collapsiblePanelVariants,
  collapsibleTriggerVariants,
  collapsibleVariants,
} from "./Collapsible.variants"
import { cn } from "../../utils/cn"

const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ variant, className, ...props }, ref) => {
    const collapsibleClassName: CollapsibleProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(collapsibleVariants({ variant }), userClassName)
    }

    return (
      <BaseCollapsible.Root
        ref={ref}
        className={collapsibleClassName}
        {...props}
      />
    )
  },
)

Collapsible.displayName = "Collapsible"

const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ className, children, ...props }, ref) => {
  const triggerClassName: CollapsibleTriggerProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(collapsibleTriggerVariants(), userClassName)
  }

  return (
    <BaseCollapsible.Trigger ref={ref} className={triggerClassName} {...props}>
      <span>{children}</span>
      <Plus aria-hidden="true" />
    </BaseCollapsible.Trigger>
  )
})

CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsiblePanel = forwardRef<HTMLDivElement, CollapsiblePanelProps>(
  ({ className, ...props }, ref) => {
    const panelClassName: CollapsiblePanelProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(collapsiblePanelVariants(), userClassName)
    }

    return (
      <BaseCollapsible.Panel ref={ref} className={panelClassName} {...props} />
    )
  },
)

CollapsiblePanel.displayName = "CollapsiblePanel"

export { Collapsible, CollapsibleTrigger, CollapsiblePanel }
