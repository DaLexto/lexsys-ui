/**
 * Collapsible.tsx
 *
 * Reference Collapsible component implementation.
 */

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
import { mergeClassName } from "@/lib/utils"

const Collapsible = ({
  ref,
  variant,
  className,
  ...props
}: CollapsibleProps) => {
  return (
    <BaseCollapsible.Root
      ref={ref}
      className={mergeClassName(collapsibleVariants({ variant }), className)}
      {...props}
    />
  )
}

Collapsible.displayName = "Collapsible"

const CollapsibleTrigger = ({
  ref,
  className,
  children,
  ...props
}: CollapsibleTriggerProps) => {
  return (
    <BaseCollapsible.Trigger
      ref={ref}
      className={mergeClassName(collapsibleTriggerVariants(), className)}
      {...props}
    >
      <span>{children}</span>
      <Plus aria-hidden="true" />
    </BaseCollapsible.Trigger>
  )
}

CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsiblePanel = ({
  ref,
  className,
  ...props
}: CollapsiblePanelProps) => {
  return (
    <BaseCollapsible.Panel
      ref={ref}
      className={mergeClassName(collapsiblePanelVariants(), className)}
      {...props}
    />
  )
}

CollapsiblePanel.displayName = "CollapsiblePanel"

export { Collapsible, CollapsibleTrigger, CollapsiblePanel }
