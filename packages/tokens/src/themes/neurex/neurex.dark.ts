// themes/dark.ts
import type { ThemeDefinition } from "../../types/index.js"

export const neurexDarkTheme: ThemeDefinition = {
  name: "dark",
  brand: "neurex",
  selector: ".dark",
  colorScheme: "dark",
  color: {
    background: {
      base: { value: "{color.neutral.950}" },
      surface: { value: "{color.neutral.900}" },
      subtle: { value: "{color.neutral.800}" },
      overlay: { value: "oklch(0 0 0 / 60%)" },
    },
    text: {
      primary: { value: "{color.neutral.50}" },
      secondary: { value: "{color.neutral.400}" },
      disabled: { value: "{color.neutral.600}" },
      inverse: { value: "{color.neutral.950}" },
      link: { value: "{color.blue.300}" },
      accent: { value: "{color.purple.300}" },
    },
    border: {
      default: { value: "{color.neutral.700}" },
      strong: { value: "{color.neutral.500}" },
      focus: { value: "{color.blue.400}" },
      accent: { value: "{color.purple.400}" },
    },
    feedback: {
      info: {
        bg: { value: "{color.blue.950}" },
        text: { value: "{color.blue.200}" },
      },
      success: {
        bg: { value: "{color.green.950}" },
        text: { value: "{color.green.200}" },
      },
      warning: {
        bg: { value: "{color.yellow.950}" },
        text: { value: "{color.yellow.200}" },
      },
      danger: {
        bg: { value: "{color.red.950}" },
        text: { value: "{color.red.200}" },
      },
    },
    action: {
      primary: {
        base: { value: "{color.purple.400}" },
        hover: { value: "{color.purple.300}" },
        active: { value: "{color.purple.200}" },
        disabled: { value: "{color.purple.700}" },
      },
      secondary: {
        base: { value: "{color.neutral.800}" },
        hover: { value: "{color.neutral.700}" },
        active: { value: "{color.neutral.600}" },
      },
      danger: {
        base: { value: "{color.red.400}" },
        hover: { value: "{color.red.300}" },
        active: { value: "{color.red.200}" },
        disabled: { value: "{color.red.700}" },
      },
    },
  },
}
