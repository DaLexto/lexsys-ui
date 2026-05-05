/**
 * Accordion.types.ts
 *
 * Public and internal types for Accordion component.
 */

import type { Accordion as BaseAccordion } from "@base-ui/react/accordion"

export interface AccordionProps extends Omit<
  BaseAccordion.Root.Props,
  "className"
> {
  className?: BaseAccordion.Root.Props["className"]
}

export interface AccordionItemProps extends Omit<
  BaseAccordion.Item.Props,
  "className"
> {
  className?: BaseAccordion.Item.Props["className"]
}

export interface AccordionHeaderProps extends Omit<
  BaseAccordion.Header.Props,
  "className"
> {
  className?: BaseAccordion.Header.Props["className"]
}

export interface AccordionTriggerProps extends Omit<
  BaseAccordion.Trigger.Props,
  "className"
> {
  className?: BaseAccordion.Trigger.Props["className"]
}

export interface AccordionPanelProps extends Omit<
  BaseAccordion.Panel.Props,
  "className"
> {
  className?: BaseAccordion.Panel.Props["className"]
}
