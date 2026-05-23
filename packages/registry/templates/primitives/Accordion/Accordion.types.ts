import type { Ref } from "react"
/**
 * Accordion.types.ts
 *
 * Public and internal types for Accordion component.
 */

import type { Accordion as BaseAccordion } from "@base-ui/react/accordion"

export type AccordionProps = BaseAccordion.Root.Props & {
  ref?: Ref<HTMLDivElement>
}

export type AccordionItemProps = BaseAccordion.Item.Props

export type AccordionHeaderProps = BaseAccordion.Header.Props

export type AccordionTriggerProps = BaseAccordion.Trigger.Props

export type AccordionPanelProps = BaseAccordion.Panel.Props
