import type { SemanticTokenGroup } from "../types"

export const colorSemantics: SemanticTokenGroup = {
  name: "color",

  background: {
    $type: "color",
    base: { $value: "{color.white}" },
    surface: { $value: "{color.white}" },
    subtle: { $value: "{color.neutral.50}" },
    overlay: { $value: "{color.neutral.800}" },
  },
  text: {
    $type: "color",
    primary: { $value: "{color.neutral.900}" },
    secondary: { $value: "{color.neutral.600}" },
    disabled: { $value: "{color.neutral.400}" },
    inverse: { $value: "{color.white}" },
    link: { $value: "{color.blue.600}" },
    accent: { $value: "{color.purple.600}" },
  },
  feedback: {
    info: {
      $type: "color",
      bg: { $value: "{color.blue.50}" },
      text: { $value: "{color.blue.700}" },
    },
    success: {
      $type: "color",
      bg: { $value: "{color.green.50}" },
      text: { $value: "{color.green.700}" },
    },
    warning: {
      $type: "color",
      bg: { $value: "{color.yellow.50}" },
      text: { $value: "{color.yellow.700}" },
    },
    danger: {
      $type: "color",
      bg: { $value: "{color.red.50}" },
      text: { $value: "{color.red.700}" },
    },
  },
}
