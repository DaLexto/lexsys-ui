/**
 * Accordion.tsx
 *
 * Reference Accordion component implementation.
 */

import { forwardRef } from "react"
import { Accordion as BaseAccordion } from "@base-ui/react/accordion"
import type {
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionPanelProps,
  AccordionProps,
  AccordionTriggerProps,
} from "./Accordion.types"
import {
  accordionHeaderVariants,
  accordionItemVariants,
  accordionPanelVariants,
  accordionTriggerVariants,
  accordionVariants,
} from "./Accordion.variants"
import { cn } from "@/lib/utils"

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, ...props }, ref) => {
    const rootClassName: AccordionProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(accordionVariants(), userClassName)
    }

    return <BaseAccordion.Root ref={ref} className={rootClassName} {...props} />
  },
)

Accordion.displayName = "Accordion"

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, ...props }, ref) => {
    const itemClassName: AccordionItemProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(accordionItemVariants(), userClassName)
    }

    return <BaseAccordion.Item ref={ref} className={itemClassName} {...props} />
  },
)

AccordionItem.displayName = "AccordionItem"

const AccordionHeader = forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  ({ className, ...props }, ref) => {
    const headerClassName: AccordionHeaderProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(accordionHeaderVariants(), userClassName)
    }

    return (
      <BaseAccordion.Header ref={ref} className={headerClassName} {...props} />
    )
  },
)

AccordionHeader.displayName = "AccordionHeader"

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const triggerClassName: AccordionTriggerProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(accordionTriggerVariants(), userClassName)
    }

    return (
      <BaseAccordion.Trigger ref={ref} className={triggerClassName} {...props}>
        <span>{children}</span>
        <span aria-hidden="true">+</span>
      </BaseAccordion.Trigger>
    )
  },
)

AccordionTrigger.displayName = "AccordionTrigger"

const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(
  ({ className, ...props }, ref) => {
    const panelClassName: AccordionPanelProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(accordionPanelVariants(), userClassName)
    }

    return (
      <BaseAccordion.Panel ref={ref} className={panelClassName} {...props} />
    )
  },
)

AccordionPanel.displayName = "AccordionPanel"

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
}
