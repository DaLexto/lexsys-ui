/**
 * Accordion.tsx
 *
 * Reference Accordion component implementation.
 */

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
import { mergeClassName } from "@/lib/utils"

const Accordion = ({ ref, className, ...props }: AccordionProps) => {
  return (
    <BaseAccordion.Root
      ref={ref}
      className={mergeClassName(accordionVariants(), className)}
      {...props}
    />
  )
}

Accordion.displayName = "Accordion"

const AccordionItem = ({ ref, className, ...props }: AccordionItemProps) => {
  return (
    <BaseAccordion.Item
      ref={ref}
      className={mergeClassName(accordionItemVariants(), className)}
      {...props}
    />
  )
}

AccordionItem.displayName = "AccordionItem"

const AccordionHeader = ({
  ref,
  className,
  ...props
}: AccordionHeaderProps) => {
  return (
    <BaseAccordion.Header
      ref={ref}
      className={mergeClassName(accordionHeaderVariants(), className)}
      {...props}
    />
  )
}

AccordionHeader.displayName = "AccordionHeader"

const AccordionTrigger = ({
  ref,
  className,
  children,
  ...props
}: AccordionTriggerProps) => {
  return (
    <BaseAccordion.Trigger
      ref={ref}
      className={mergeClassName(accordionTriggerVariants(), className)}
      {...props}
    >
      <span>{children}</span>
      <span aria-hidden="true">+</span>
    </BaseAccordion.Trigger>
  )
}

AccordionTrigger.displayName = "AccordionTrigger"

const AccordionPanel = ({ ref, className, ...props }: AccordionPanelProps) => {
  return (
    <BaseAccordion.Panel
      ref={ref}
      className={mergeClassName(accordionPanelVariants(), className)}
      {...props}
    />
  )
}

AccordionPanel.displayName = "AccordionPanel"

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
}
