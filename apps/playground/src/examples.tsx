import type { ComponentProps } from "react"
import type { Button, Input } from "@neurex/ui"

export const buttonExamples: Array<{
  label: string
  props: ComponentProps<typeof Button>
}> = [
  {
    label: "Primary xs",
    props: { children: "Extra Small", size: "xs" },
  },
  {
    label: "Primary sm",
    props: { children: "Small", size: "sm" },
  },
  {
    label: "Primary md",
    props: { children: "Medium", size: "md" },
  },
  {
    label: "Primary lg loading",
    props: { children: "Generating", isLoading: true, size: "lg" },
  },
  {
    label: "Primary xl",
    props: { children: "Create Extra Large", size: "xl" },
  },
  {
    label: "Secondary",
    props: { children: "Preview", variant: "secondary" },
  },
  {
    label: "Custom class",
    props: {
      children: "Tailwind override",
      className: "bg-green-600 text-white hover:bg-green-700",
    },
  },
  {
    label: "Disabled",
    props: {
      children: "Unavailable",
      disabled: true,
      variant: "secondary",
    },
  },
]

export const inputExamples: Array<{
  label: string
  props: ComponentProps<typeof Input>
}> = [
  {
    label: "Default / sm",
    props: {
      "aria-label": "Small input",
      defaultValue: "Small input",
      size: "sm",
    },
  },
  {
    label: "Default / md",
    props: {
      "aria-label": "Project name",
      placeholder: "Project name",
    },
  },
  {
    label: "Default / lg",
    props: {
      "aria-label": "Large input",
      defaultValue: "Large input",
      size: "lg",
    },
  },
  {
    label: "Ghost",
    props: {
      "aria-label": "Ghost input",
      defaultValue: "Ghost surface",
      variant: "ghost",
    },
  },
  {
    label: "Invalid",
    props: {
      "aria-label": "Invalid input",
      defaultValue: "Invalid value",
      isInvalid: true,
    },
  },
  {
    label: "Disabled",
    props: {
      "aria-label": "Disabled input",
      defaultValue: "Unavailable",
      disabled: true,
    },
  },
]
