import type { ThemeDefinition } from "../types/index.js"

export const darkTheme: ThemeDefinition = {
  name: "dark",
  selector: ".dark",
  colorScheme: "dark",
  color: {
    background: { value: "{color.neutral.950}" },
    foreground: { value: "{color.neutral.50}" },
    muted: {
      DEFAULT: { value: "{color.neutral.900}" },
      foreground: { value: "{color.neutral.300}" },
    },
    surface: {
      DEFAULT: { value: "{color.neutral.900}" },
      foreground: { value: "{color.neutral.50}" },
    },
    border: { value: "{color.neutral.700}" },
    ring: { value: "{color.blue.500}" },
    primary: {
      DEFAULT: { value: "{color.blue.500}" },
      foreground: { value: "{color.white}" },
      hover: { value: "{color.blue.600}" },
    },
    destructive: {
      DEFAULT: { value: "{color.red.500}" },
      foreground: { value: "{color.white}" },
    },
  },
}
