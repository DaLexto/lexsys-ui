import type { ComponentProps, ReactNode } from "react"
import type { Button, Input } from "@dalexto/lexsys-ui"

export const brandSwatches = [
  {
    label: "Primary base",
    token: "--lsys-action-primary-base",
  },
  {
    label: "Primary hover",
    token: "--lsys-action-primary-hover",
  },
  {
    label: "Primary active",
    token: "--lsys-action-primary-active",
  },
  {
    label: "Accent base",
    token: "--lsys-brand-color-accent-base",
  },
  {
    label: "Accent hover",
    token: "--lsys-brand-color-accent-hover",
  },
  {
    label: "Accent active",
    token: "--lsys-brand-color-accent-active",
  },
  {
    label: "Focus ring",
    token: "--lsys-border-focus",
  },
  {
    label: "Link text",
    token: "--lsys-color-text-link",
  },
] as const

export const semanticColorExamples: Array<{
  label: string
  className: string
  content: ReactNode
}> = [
  {
    label: "Primary CTA",
    className: "brand-demo-primary",
    content: "Orange maps through action.primary and brand.color.primary.",
  },
  {
    label: "Accent text",
    className: "brand-demo-accent-text",
    content: "Space indigo accent copy for highlights and links.",
  },
  {
    label: "Accent link",
    className: "brand-demo-link",
    content: "Read the Lexsys token contract",
  },
  {
    label: "Accent border",
    className: "brand-demo-accent-border",
    content: "border.accent uses brand.color.accent.base.",
  },
]

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
    label: "Disabled primary",
    props: {
      children: "Unavailable",
      disabled: true,
    },
  },
  {
    label: "Disabled secondary",
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
